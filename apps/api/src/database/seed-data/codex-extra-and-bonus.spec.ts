import { EntrySource } from '../../entries/entry-types';
import { slugify } from '../../entries/slug';
import { seedEntries } from '.';
import { heroicSkill } from './helpers';
import { SeedEntry } from './types';
import { resolveSlug, validateSeed } from '../seed-validation';

export const NEW_SOURCES = [
  'codex-extra',
  'bonus-ace-of-cards',
  'bonus-necromancer',
] as const;

const BONUS_SOURCES: EntrySource[] = [
  'bonus-ace-of-cards',
  'bonus-necromancer',
];

/**
 * English name (lower-case) of each Bonus class and heroic skill, keyed by the
 * entry's slug. Each task that seeds Bonus content adds its entries here.
 */
export const BONUS_ENGLISH_NAMES: Record<string, string> = {};

/** Skills ("Poderes") of a class: [name, maxLevel, page], sorted by name. */
export const skillsOf = (
  className: string,
): [name: string, maxLevel: number, page: number][] =>
  seedEntries
    .filter(
      (e) => e.type === 'skill' && e.details.classSlug === slugify(className),
    )
    .map((e): [string, number, number] => [
      e.name,
      (e.details as { maxLevel: number }).maxLevel,
      e.page ?? 0,
    ])
    .sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'));

/** Heroic skills of a source, with their requirement slugs sorted. */
export const heroicOf = (
  source: EntrySource,
): {
  name: string;
  page: number;
  classes: string[];
  alsoRequires: string[];
}[] =>
  seedEntries
    .filter((e) => e.type === 'heroic-skill' && e.source === source)
    .map((e) => {
      const req = (e.details as { requirements: SeedHeroicRequirements })
        .requirements;
      return {
        name: e.name,
        page: e.page ?? 0,
        classes: [...req.classes].sort(),
        alsoRequires: [...req.alsoRequires].sort(),
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));

interface SeedHeroicRequirements {
  classes: string[];
  alsoRequires: string[];
}

/** The class entry with that name, if it is seeded. */
export const classOf = (name: string): SeedEntry | undefined =>
  seedEntries.find((e) => e.type === 'class' && e.name === name);

const ENGLISH_WORDS =
  /\b(the|you|your|when|each|damage|spell|magic|card|cards|deck)\b/i;

const isBonus = (e: SeedEntry) =>
  e.source !== undefined && BONUS_SOURCES.includes(e.source);

/** Bonus classes and heroic skills must carry their English name as a tag. */
const missingEnglishTag = (e: SeedEntry): boolean => {
  if (!isBonus(e) || (e.type !== 'class' && e.type !== 'heroic-skill')) {
    return false;
  }
  const english = BONUS_ENGLISH_NAMES[resolveSlug(e)];
  return !english || !(e.tags ?? []).includes(english);
};

/** Bonus summaries and bodies must be Portuguese. */
const hasEnglishText = (e: SeedEntry): boolean =>
  isBonus(e) && ENGLISH_WORDS.test(`${e.summary}\n${e.body ?? ''}`);

/** The Codex's heroic skills must not depend on the Bonus classes. */
const codexHeroicNeedsBonusClass = (e: SeedEntry): boolean =>
  e.type === 'heroic-skill' &&
  e.source === 'codex-extra' &&
  e.details.requirements.classes.some((c) =>
    ['carteador', 'necromante'].includes(c),
  );

describe('Codex Extra and Bonus content', () => {
  it('lists the three new sources', () => {
    expect(NEW_SOURCES).toHaveLength(3);
  });

  it('gives every Bonus class and heroic skill its English name as a tag', () => {
    expect(seedEntries.filter(missingEnglishTag).map((e) => e.name)).toEqual(
      [],
    );
  });

  it('keeps Bonus summaries and bodies in Portuguese', () => {
    expect(seedEntries.filter(hasEnglishText).map((e) => e.name)).toEqual([]);
  });

  it('never lets a Codex heroic skill require Carteador or Necromante', () => {
    expect(
      seedEntries.filter(codexHeroicNeedsBonusClass).map((e) => e.name),
    ).toEqual([]);
  });

  it('validates the whole seed', () => {
    expect(validateSeed(seedEntries)).toEqual([]);
  });

  describe('the invariants can fail', () => {
    const bonusHeroic = (overrides: Partial<SeedEntry> = {}): SeedEntry =>
      ({
        ...heroicSkill({
          name: 'Golpe Falso',
          page: 3,
          summary: 'Um golpe.',
          body: 'Um golpe.',
        }),
        source: 'bonus-ace-of-cards',
        ...overrides,
      }) as SeedEntry;

    it('flags a Bonus entry with no English tag', () => {
      expect(missingEnglishTag(bonusHeroic())).toBe(true);
    });

    it('flags English text in a Bonus summary', () => {
      expect(
        hasEnglishText(bonusHeroic({ summary: 'Deal damage to the foe.' })),
      ).toBe(true);
      expect(hasEnglishText(bonusHeroic())).toBe(false);
    });

    it('flags a Codex heroic skill that requires Carteador', () => {
      const bad = {
        ...heroicSkill({
          name: 'Golpe Falso',
          page: 3,
          summary: 'Um golpe.',
          body: 'Um golpe.',
          classes: ['Carteador'],
        }),
        source: 'codex-extra',
      } as SeedEntry;
      expect(codexHeroicNeedsBonusClass(bad)).toBe(true);
    });
  });

  describe('helpers', () => {
    it('return nothing for a class that is not seeded', () => {
      expect(skillsOf('Classe Inexistente')).toEqual([]);
      expect(classOf('Classe Inexistente')).toBeUndefined();
    });
  });
});
