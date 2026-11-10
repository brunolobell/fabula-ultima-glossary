import { slugify } from '../entries/slug';
import {
  ATTRIBUTES,
  CustomWeaponRuleDetails,
  RareWeaponRuleDetails,
  ENTRY_SOURCES,
  ENTRY_TYPES,
  EQUIPMENT_KINDS,
  EntryType,
  MEDIUMS,
  SERVICE_GROUPS,
  TRANSPORT_CLASSES,
} from '../entries/entry-types';
import { SeedEntry } from './seed-data/types';

export const resolveSlug = (entry: Pick<SeedEntry, 'name' | 'slug'>) =>
  entry.slug ?? slugify(entry.name);

const LINK = /\[\[([^\]]+)\]\]/g;
const MAX_PAGE = 360;
const ACCURACY = new RegExp(
  `^(${ATTRIBUTES.join('|')}) \\+ (${ATTRIBUTES.join('|')})$`,
);

type Fail = (message: string) => void;

const isMoney = (n: unknown) => Number.isInteger(n) && (n as number) >= 0;

const duplicates = (ids: string[]) =>
  ids.filter((id, i) => ids.indexOf(id) !== i);

function validateCustomWeapon(d: CustomWeaponRuleDetails, fail: Fail) {
  const { base, categories, damageTypes, customizations } = d;
  if (!isMoney(base.cost))
    fail('forge base.cost must be a non-negative integer');
  if (!Number.isInteger(base.damage))
    fail('forge base.damage must be an integer');
  if (!Number.isInteger(base.slots) || base.slots < 1)
    fail('forge base.slots must be a positive integer');
  if (base.accuracies.length === 0) fail('forge needs base.accuracies');
  for (const accuracy of base.accuracies) {
    if (!ACCURACY.test(accuracy)) fail(`forge bad accuracy "${accuracy}"`);
  }
  if (damageTypes.length === 0) fail('forge needs damageTypes');
  if (categories.length === 0) fail('forge needs categories');
  for (const dup of duplicates(customizations.map((c) => c.id)))
    fail(`forge customization "${dup}" is repeated`);

  const ids = customizations.map((c) => c.id);
  for (const c of customizations) {
    if (!c.name || !c.summary)
      fail(`forge customization "${c.id}" needs a name and summary`);
    if (!Number.isInteger(c.slots) || c.slots < 1 || c.slots > base.slots)
      fail(`forge customization "${c.id}" has bad slots`);
    if (!isMoney(c.cost)) fail(`forge customization "${c.id}" has a bad cost`);
    for (const category of c.blockedCategories ?? []) {
      if (!categories.includes(category))
        fail(
          `forge customization "${c.id}" blocks unknown category "${category}"`,
        );
    }
    for (const other of c.blockedWith ?? []) {
      if (!ids.includes(other))
        fail(
          `forge customization "${c.id}" is blocked with unknown "${other}"`,
        );
    }
  }
  if (customizations.filter((c) => c.secondForm).length !== 1)
    fail('forge needs exactly one customization that adds a second form');
}

function validateRareWeapon(
  d: RareWeaponRuleDetails,
  fail: Fail,
  expectEquipment: (slug: string) => void,
) {
  if (!isMoney(d.damageTypeCost))
    fail('forge damageTypeCost must be a non-negative integer');
  if (!Number.isInteger(d.maxAlterations) || d.maxAlterations < 1)
    fail('forge maxAlterations must be a positive integer');
  if (!Number.isInteger(d.martialDamage))
    fail('forge martialDamage must be an integer');
  if (d.damageTypes.length === 0) fail('forge needs damageTypes');
  for (const dup of duplicates(d.alterations.map((a) => a.id)))
    fail(`forge alteration "${dup}" is repeated`);
  for (const a of d.alterations) {
    if (!isMoney(a.cost)) fail(`forge alteration "${a.id}" has a bad cost`);
  }
  for (const dup of duplicates(d.features.map((f) => f.id)))
    fail(`forge feature "${dup}" is repeated`);
  for (const f of d.features) {
    if (!f.name || !f.summary)
      fail(`forge feature "${f.id}" needs a name and summary`);
    if (!isMoney(f.cost)) fail(`forge feature "${f.id}" has a bad cost`);
    if (f.group !== 'defensive' && f.group !== 'offensive')
      fail(`forge feature "${f.id}" has an unknown group`);
  }
  for (const slug of d.excludedBases) expectEquipment(slug);
}

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
      case 'rule': {
        const details = entry.details;
        if (details.forge === 'custom-weapon') {
          validateCustomWeapon(details, fail);
        } else if (details.forge === 'rare-weapon') {
          validateRareWeapon(details, fail, (target) =>
            expectType(slug, target, 'equipment'),
          );
        } else if (details.forge !== undefined) {
          fail('unknown details.forge');
        }
        break;
      }
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
      case 'heroic-skill': {
        const { requirements, repeatable } = entry.details;
        const { classes, required, alsoRequires } = requirements;
        for (const target of classes) expectType(slug, target, 'class');
        if (new Set(classes).size !== classes.length)
          fail('requirements.classes has duplicates');
        if (
          !Number.isInteger(required) ||
          required < Math.min(1, classes.length) ||
          required > classes.length
        ) {
          fail(
            `requirements.required (${required}) must be between ${Math.min(1, classes.length)} and the number of classes (${classes.length})`,
          );
        }
        for (const target of alsoRequires) {
          if (!['skill', 'spell'].includes(typeBySlug.get(target) ?? '')) {
            fail(
              `requirements.alsoRequires "${target}" is not a skill or spell`,
            );
          }
        }
        if (typeof repeatable !== 'boolean')
          fail('details.repeatable must be a boolean');
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
      case 'service': {
        const { group, cost, medium } = entry.details;
        if (!SERVICE_GROUPS.includes(group))
          fail(`unknown details.group "${group}"`);
        if (!Number.isInteger(cost) || cost < 0)
          fail('details.cost must be a non-negative integer');
        if (medium !== undefined && !MEDIUMS.includes(medium))
          fail(`unknown details.medium "${medium}"`);
        if (group === 'travel' && !medium)
          fail('a travel fare needs details.medium');
        if (group === 'settlement' && medium)
          fail('only a travel fare has details.medium');
        break;
      }
      case 'transport': {
        const { transportClass, medium, cost, passengers, distance } =
          entry.details;
        if (!TRANSPORT_CLASSES.includes(transportClass))
          fail(`unknown details.transportClass "${transportClass}"`);
        if (!MEDIUMS.includes(medium))
          fail(`unknown details.medium "${medium}"`);
        if (!Number.isInteger(cost) || cost < 0)
          fail('details.cost must be a non-negative integer');
        if (!Number.isInteger(passengers) || passengers < 1)
          fail('details.passengers must be a positive integer');
        const scales = Object.entries(distance ?? {});
        for (const [scale, multiplier] of scales) {
          if (
            multiplier !== null &&
            !(Number.isInteger(multiplier) && multiplier >= 1)
          ) {
            fail(
              `details.distance.${scale} must be a positive integer or null`,
            );
          }
        }
        if (scales.every(([, multiplier]) => multiplier === null))
          fail('a Transport needs at least one distance multiplier');
        break;
      }
      case 'guide': {
        const { steps, order } = entry.details;
        if (typeof order !== 'number') fail('guide needs a numeric order');
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
