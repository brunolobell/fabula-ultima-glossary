import { EntrySource } from '../../entries/entry-types';
import { slugify } from '../../entries/slug';
import { seedEntries } from '.';
import { classEntry, heroicSkill, withTags } from './helpers';
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
export const BONUS_ENGLISH_NAMES: Record<string, string> = {
  carteador: 'ace of cards',
};

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

  it('seeds Astrólogo', () => {
    const astrologo = classOf('Astrólogo');
    expect(astrologo?.source).toBe('codex-extra');
    expect(astrologo?.page).toBe(40);
    expect(astrologo?.details).toMatchObject({ traits: ['mp'] });
    expect(skillsOf('Astrólogo')).toEqual([
      ['Constelação da Rasga-mortalha', 1, 41],
      ['Constelação do Boitatá', 3, 41],
      ['Constelação do Boto', 3, 41],
      ['Constelação do Cão Dourado', 3, 41],
      ['Constelação do Saci', 3, 41],
    ]);
  });

  it('seeds Bandoleiro', () => {
    const bandoleiro = classOf('Bandoleiro');
    expect(bandoleiro?.source).toBe('codex-extra');
    expect(bandoleiro?.page).toBe(42);
    expect(bandoleiro?.details).toMatchObject({
      traits: ['ip', 'melee-weapon', 'ranged-weapon'],
    });
    expect(skillsOf('Bandoleiro')).toEqual([
      ['Cabra da Peste', 5, 43],
      ['Líder de Bando', 1, 43],
      ['Redistribuir Riquezas', 3, 43],
      ['Sertanejo', 1, 43],
      ['Valhacouto', 3, 43],
    ]);
  });

  it('seeds Lâmina Carmesim', () => {
    const lamina = classOf('Lâmina Carmesim');
    expect(lamina?.source).toBe('codex-extra');
    expect(lamina?.page).toBe(56);
    expect(lamina?.details).toMatchObject({
      traits: ['hp', 'melee-weapon', 'shield'],
    });
    expect(skillsOf('Lâmina Carmesim')).toEqual([
      ['Arsenal Vermelho', 1, 57],
      ['Dobrar Sangue', 1, 57],
      ['Escudo Escarlate', 2, 57],
      ['Frenesi Sanguinolento', 4, 57],
      ['Hemofagia', 5, 57],
    ]);
  });

  it('seeds Malandro', () => {
    const malandro = classOf('Malandro');
    expect(malandro?.source).toBe('codex-extra');
    expect(malandro?.page).toBe(58);
    expect(malandro?.details).toMatchObject({
      traits: ['ip', 'ranged-weapon'],
    });
    expect(skillsOf('Malandro')).toEqual([
      ['Engabelar', 3, 59],
      ['Explorar Fraqueza', 1, 59],
      ['Gambiarra', 4, 59],
      ['Golpe Aproveitador', 3, 59],
      ['Jeitinho', 2, 59],
    ]);
  });

  it('seeds Cavaleiro Mágico', () => {
    const cavaleiro = classOf('Cavaleiro Mágico');
    expect(cavaleiro?.source).toBe('codex-extra');
    expect(cavaleiro?.page).toBe(48);
    expect(cavaleiro?.details).toMatchObject({
      traits: ['mp', 'armor', 'shield'],
    });
    expect(skillsOf('Cavaleiro Mágico')).toEqual([
      ['Alma Ferida', 5, 49],
      ['Coração Ardente', 3, 49],
      ['Impulso do Coração', 1, 49],
      ['Magitransformação', 3, 49],
      ['Transformação Aprimorada', 3, 49],
    ]);
    const body = cavaleiro?.body ?? '';
    for (const term of [
      'Afeto',
      'Raiva',
      'Fraqueza',
      'Coragem',
      'Tolice',
      'Zelo',
      'Ardente',
      'Brilhante',
      'Celeste',
      'Congelante',
      'Eletrizante',
      'Rochoso',
      'Sombrio',
    ]) {
      expect(body).toContain(term);
    }
  });

  it('seeds Forjador de Almas', () => {
    const forjador = classOf('Forjador de Almas');
    expect(forjador?.source).toBe('codex-extra');
    expect(forjador?.page).toBe(52);
    expect(forjador?.details).toMatchObject({ traits: ['ip'] });
    expect(skillsOf('Forjador de Almas')).toEqual([
      ['Animar Arma', 4, 53],
      ['Coletar Almas', 5, 53],
      ['Forjar Característica', 1, 53],
      ['Forjar Feitiço', 5, 53],
      ['Manifestar Arma', 1, 53],
    ]);
    const body = forjador?.body ?? '';
    expect(body).toContain('Pontos de Alma');
    for (const species of [
      'Construto',
      'Demônio',
      'Elemental',
      'Fera',
      'Humanoide',
      'Monstro',
      'Morto-vivo',
      'Planta',
    ]) {
      expect(body).toContain(species);
    }
  });

  it('seeds Carteador (Bonus Ace of Cards, translated)', () => {
    const carteador = classOf('Carteador');
    expect(carteador?.source).toBe('bonus-ace-of-cards');
    expect(carteador?.page).toBe(2);
    expect(carteador?.tags).toContain('ace of cards');
    expect(carteador?.details).toMatchObject({
      traits: ['hp', 'mp'],
      otherNames: ['Baralhomante', 'Duelista do Destino', 'Apostador'],
      quote: 'Não desvie o olhar!',
    });
    expect(skillsOf('Carteador')).toEqual([
      ['Altos e Baixos', 1, 3],
      ['Carta Armadilha', 4, 3],
      ['Cartas Mágicas', 3, 3],
      ['Dobro ou Nada', 1, 3],
      ['Mulligan', 5, 3],
    ]);
    const body = carteador?.body ?? '';
    for (const term of [
      'Gerenciando o Baralho',
      'Usando um conjunto',
      'Grande Prêmio',
      'Flush Mágico',
      'Flush Ofuscante',
      'Full Status',
      'Trinca de Suporte',
      'Encrenca em Dobro',
      'Par Mágico',
      '777',
      '30 cartas',
    ]) {
      expect(body).toContain(term);
    }
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
    it('withTags appends to the default tags without touching the entry', () => {
      const base = classEntry({
        name: 'Teste',
        page: 1,
        summary: 'Uma classe.',
        body: 'Uma classe.',
        otherNames: [],
        quote: null,
        freeBenefits: ['Aumenta seus PV máximos em 5.'],
        traits: ['hp'],
      });
      const tagged = withTags(base, 'extra', 'outra');
      expect(tagged.tags).toEqual(['classe', 'extra', 'outra']);
      expect(base.tags).toEqual(['classe']);
      expect(tagged.name).toBe('Teste');
    });

    it('return nothing for a class that is not seeded', () => {
      expect(skillsOf('Classe Inexistente')).toEqual([]);
      expect(classOf('Classe Inexistente')).toBeUndefined();
    });
  });
});
