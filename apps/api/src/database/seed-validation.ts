import { slugify } from '../entries/slug';
import {
  ATTRIBUTES,
  ENTRY_SOURCES,
  ENTRY_TYPES,
  EQUIPMENT_KINDS,
  EntryType,
} from '../entries/entry-types';
import { SeedEntry } from './seed-data/types';

export const resolveSlug = (entry: Pick<SeedEntry, 'name' | 'slug'>) =>
  entry.slug ?? slugify(entry.name);

const LINK = /\[\[([^\]]+)\]\]/g;
const MAX_PAGE = 360;
const ACCURACY = new RegExp(
  `^(${ATTRIBUTES.join('|')}) \\+ (${ATTRIBUTES.join('|')})$`,
);

/** Returns every problem found in the seed data; empty means it is valid. */
export function validateSeed(entries: SeedEntry[]): string[] {
  const errors: string[] = [];
  const typeBySlug = new Map<string, EntryType>();

  for (const entry of entries) {
    const slug = resolveSlug(entry);
    if (typeBySlug.has(slug)) {
      errors.push(
        `${slug}: duplicate slug; set an explicit "slug" on one of them`,
      );
    }
    typeBySlug.set(slug, entry.type);
  }

  const expectType = (from: string, slug: string, type: EntryType) => {
    if (typeBySlug.get(slug) !== type) {
      errors.push(`${from}: "${slug}" is not a ${type} entry`);
    }
  };

  for (const entry of entries) {
    const slug = resolveSlug(entry);
    const fail = (message: string) => errors.push(`${slug}: ${message}`);

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail('invalid slug');
    if (!ENTRY_TYPES.includes(entry.type)) fail(`unknown type "${entry.type}"`);
    if (entry.source && !ENTRY_SOURCES.includes(entry.source))
      fail(`unknown source "${entry.source}"`);
    if (!entry.name.trim()) fail('empty name');
    if (!entry.summary.trim()) fail('empty summary');

    if (entry.page === null) {
      if (entry.type !== 'guide') fail('missing page reference');
    } else if (
      !Number.isInteger(entry.page) ||
      entry.page < 1 ||
      entry.page > MAX_PAGE
    ) {
      fail(
        `page ${entry.page} is not a printed page between 1 and ${MAX_PAGE}`,
      );
    }

    for (const text of [entry.body ?? '', entry.summary]) {
      for (const [, target] of text.matchAll(LINK)) {
        if (!typeBySlug.has(target)) fail(`link to unknown entry "${target}"`);
      }
    }

    switch (entry.type) {
      case 'rule':
        break;
      case 'class': {
        const { otherNames, freeBenefits } = entry.details;
        if (!Array.isArray(otherNames))
          fail('details.otherNames must be a list');
        if (!Array.isArray(freeBenefits) || freeBenefits.length === 0) {
          fail('details.freeBenefits must be a non-empty list');
        }
        break;
      }
      case 'skill': {
        const { classSlug, maxLevel } = entry.details;
        expectType(slug, classSlug, 'class');
        if (!Number.isInteger(maxLevel) || maxLevel < 1) {
          fail('details.maxLevel must be a positive integer');
        }
        break;
      }
      case 'spell': {
        const { classSlug, mpCost, target, duration, offensive } =
          entry.details;
        expectType(slug, classSlug, 'class');
        if (!/^(até )?\d+( × A)?$/.test(mpCost))
          fail(`details.mpCost "${mpCost}" is not "N", "N × A" or "até N"`);
        if (!target) fail('details.target is required');
        if (!duration) fail('details.duration is required');
        if (typeof offensive !== 'boolean')
          fail('details.offensive must be a boolean');
        break;
      }
      case 'equipment': {
        const d = entry.details;
        if (!EQUIPMENT_KINDS.includes(d.kind)) fail(`unknown kind "${d.kind}"`);
        if (
          (d.kind === 'accessory' || d.kind === 'artifact') &&
          d.rarity !== 'rare'
        ) {
          fail('accessories and artifacts are always rare');
        }
        if (d.cost !== null && !(Number.isInteger(d.cost) && d.cost >= 0)) {
          fail('details.cost must be a non-negative integer or null');
        }
        if (d.kind === 'armor' || d.kind === 'shield') {
          if (!d.defense) fail('armor and shield need details.defense');
        }
        if (d.kind === 'armor' && !Number.isInteger(d.initiative)) {
          fail('armor needs integer details.initiative');
        }
        if (d.kind === 'weapon') {
          if (!d.category) fail('weapon needs details.category');
          if (!ACCURACY.test(d.accuracy ?? ''))
            fail(`bad details.accuracy "${d.accuracy}"`);
          if (!Number.isInteger(d.damage))
            fail('weapon needs integer details.damage');
          if (!d.damageType) fail('weapon needs details.damageType');
          if (d.hands !== 1 && d.hands !== 2)
            fail('weapon details.hands must be 1 or 2');
          if (d.range !== 'melee' && d.range !== 'ranged') {
            fail('weapon details.range must be melee or ranged');
          }
        }
        break;
      }
      case 'guide': {
        const { steps } = entry.details;
        if (!Array.isArray(steps) || steps.length === 0)
          fail('guide needs steps');
        for (const step of steps ?? []) {
          if (!step.title || !step.intro)
            fail('every guide step needs a title and intro');
          for (const target of step.entries) {
            if (!typeBySlug.has(target))
              fail(`step "${step.title}" links to unknown entry "${target}"`);
          }
        }
        break;
      }
    }
  }

  return errors;
}
