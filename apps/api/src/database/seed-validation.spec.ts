import { seedEntries } from './seed-data';
import { classEntry, rule, skill, spell } from './seed-data/helpers';
import { SeedEntry } from './seed-data/types';
import { validateSeed } from './seed-validation';

const guardiao = classEntry({
  name: 'Guardião',
  page: 202,
  summary: 'Protetor.',
  body: '',
  otherNames: [],
  quote: null,
  freeBenefits: ['PV +5'],
});

describe('validateSeed', () => {
  it('accepts the real seed data', () => {
    expect(validateSeed(seedEntries)).toEqual([]);
  });

  it('rejects duplicate slugs', () => {
    const errors = validateSeed([
      rule('Crise', 84, 'a', ''),
      rule('Crise', 85, 'b', ''),
    ]);
    expect(errors).toEqual([expect.stringContaining('duplicate slug')]);
  });

  it('requires a printed page on everything except guides', () => {
    const noPage: SeedEntry = { ...rule('Crise', 84, 'a', ''), page: null };
    expect(validateSeed([noPage])).toEqual([
      expect.stringContaining('missing page reference'),
    ]);
  });

  it('rejects a page outside the printed book', () => {
    expect(validateSeed([rule('Crise', 361, 'a', '')])).toEqual([
      expect.stringContaining('not a printed page'),
    ]);
  });

  it('rejects a skill whose class does not exist', () => {
    const errors = validateSeed([skill('Ladino', 'Furtividade', 212, 1, 'a')]);
    expect(errors).toEqual([
      expect.stringContaining('"ladino" is not a class entry'),
    ]);
  });

  it('rejects a skill whose classSlug points at a non-class entry', () => {
    const errors = validateSeed([
      rule('Ladino', 10, 'a', ''),
      skill('Ladino', 'Furtividade', 212, 1, 'a'),
    ]);
    expect(errors).toEqual([expect.stringContaining('is not a class entry')]);
  });

  it('rejects a spell cost that is not "N" or "N × A"', () => {
    const errors = validateSeed([
      guardiao,
      spell('Guardião', {
        name: 'X',
        page: 1,
        mpCost: 'dez',
        target: 'a',
        duration: 'b',
        summary: 's',
      }),
    ]);
    expect(errors).toEqual([expect.stringContaining('mpCost')]);
  });

  it('rejects links to entries that do not exist', () => {
    const errors = validateSeed([
      rule('Crise', 84, 'a', 'veja [[inexistente]]'),
    ]);
    expect(errors).toEqual([
      expect.stringContaining('unknown entry "inexistente"'),
    ]);
  });

  it('rejects an accessory that is not rare', () => {
    const errors = validateSeed([
      {
        type: 'equipment',
        name: 'Elmo de crista',
        page: 285,
        summary: 'a',
        details: {
          kind: 'accessory',
          rarity: 'basic',
          martial: false,
          cost: 1000,
        },
      },
    ]);
    expect(errors).toEqual([expect.stringContaining('always rare')]);
  });

  it('rejects guide steps that link to unknown entries', () => {
    const errors = validateSeed([
      {
        type: 'guide',
        name: 'Criar um personagem',
        page: null,
        summary: 'a',
        details: {
          steps: [{ title: 'Traços', intro: 'x', entries: ['nada'] }],
        },
      },
    ]);
    expect(errors).toEqual([expect.stringContaining('unknown entry "nada"')]);
  });
});
