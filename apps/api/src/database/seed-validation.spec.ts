import { slugify } from '../entries/slug';
import { seedEntries } from './seed-data';
import {
  classEntry,
  heroicSkill,
  rule,
  skill,
  spell,
} from './seed-data/helpers';
import { SeedEntry } from './seed-data/types';
import { resolveSlug, validateSeed } from './seed-validation';

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

  it('seeds all 15 classes of the Livro Básico, each with Poderes', () => {
    const classes = seedEntries.filter(
      (e) =>
        e.type === 'class' && (e.source ?? 'livro-basico') === 'livro-basico',
    );
    expect(classes.map((c) => c.name).sort()).toEqual(
      [
        'Andarilho',
        'Arcanista',
        'Atirador',
        'Elementalista',
        'Entropista',
        'Erudito',
        'Espiritualista',
        'Furioso',
        'Guardião',
        'Guerreiro Sombrio',
        'Inventor',
        'Ladino',
        'Mestre de Armas',
        'Orador',
        'Quimerista',
      ].sort(),
    );
  });

  const classesOf = (source: string) =>
    seedEntries
      .filter((e) => e.type === 'class' && e.source === source)
      .map((c) => c.name)
      .sort();

  it('seeds the Atlas High Fantasy classes', () => {
    expect(classesOf('high-fantasy')).toEqual(
      ['Comandante', 'Dançarino', 'Simbolista', 'Virtuoso'].sort(),
    );
  });

  it('seeds the Atlas Natural Fantasy classes', () => {
    expect(classesOf('natural-fantasy')).toEqual(
      ['Floralista', 'Gourmet', 'Invocador', 'Mercador'].sort(),
    );
  });

  it('seeds the Atlas Techno Fantasy classes', () => {
    expect(classesOf('techno-fantasy')).toEqual(
      ['Esper', 'Mutante', 'Piloto'].sort(),
    );
  });

  it('gives every class at least one Poder from the same book', () => {
    for (const cls of seedEntries.filter((e) => e.type === 'class')) {
      const slug = resolveSlug(cls);
      const skills = seedEntries.filter(
        (e) => e.type === 'skill' && e.details.classSlug === slug,
      );
      expect(skills.length).toBeGreaterThan(0);
      for (const s of skills) expect(s.source).toBe(cls.source);
    }
  });

  it('seeds rare items and artifacts from each Atlas, always from that book', () => {
    for (const book of ['high-fantasy', 'natural-fantasy', 'techno-fantasy']) {
      const items = seedEntries.filter(
        (e) => e.type === 'equipment' && e.source === book,
      );
      const kinds = new Set(
        items.map((e) => (e as { details: { kind: string } }).details.kind),
      );
      expect(kinds).toContain('weapon');
      expect(kinds).toContain('armor');
      expect(kinds).toContain('shield');
      expect(kinds).toContain('accessory');
      expect(kinds).toContain('artifact');
    }
  });

  it('rejects an armor without Defesa or Iniciativa', () => {
    const errors = validateSeed([
      {
        type: 'equipment',
        name: 'Peitoral',
        page: 80,
        summary: 'a',
        details: { kind: 'armor', rarity: 'rare', martial: false, cost: 100 },
      },
    ]);
    expect(errors).toEqual([
      expect.stringContaining('details.defense'),
      expect.stringContaining('details.initiative'),
    ]);
  });

  it('rejects an unknown source book', () => {
    const entry = { ...rule('Crise', 84, 'a', ''), source: 'outro' } as never;
    expect(validateSeed([entry])).toEqual([
      expect.stringContaining('unknown source'),
    ]);
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

  it('rejects a spell cost that is not "N", "N × A" or "até N"', () => {
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

  it('accepts "até N" as a spell cost', () => {
    const errors = validateSeed([
      guardiao,
      spell('Guardião', {
        name: 'Apostar',
        page: 1,
        mpCost: 'até 20',
        target: 'Especial',
        duration: 'Instantânea',
        summary: 's',
      }),
    ]);
    expect(errors).toEqual([]);
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
          order: 1,
          steps: [{ title: 'Traços', intro: 'x', entries: ['nada'] }],
        },
      },
    ]);
    expect(errors).toEqual([expect.stringContaining('unknown entry "nada"')]);
  });
  describe('game setup', () => {
    const bySlug = (slug: string) =>
      seedEntries.find((e) => slugify(e.name) === slug);

    it('seeds the world and party guides with the page of the book', () => {
      expect(bySlug('criar-um-mundo')?.page).toBe(148);
      expect(bySlug('criar-um-grupo')?.page).toBe(152);
    });

    it('orders the guides as the book does: world, party, character, play', () => {
      const ordered = seedEntries
        .filter((e) => e.type === 'guide')
        .sort(
          (a, b) =>
            (a.details as { order: number }).order -
            (b.details as { order: number }).order,
        )
        .map((e) => slugify(e.name));
      expect(ordered).toEqual([
        'criar-um-mundo',
        'criar-um-grupo',
        'criar-um-personagem',
        'como-jogar',
      ]);
    });

    it('names all five party types in the party guide', () => {
      const body = bySlug('criar-um-grupo')?.body ?? '';
      for (const type of [
        'Exploradores',
        'Guardiões',
        'Heróis da Resistência',
        'Revolucionários',
        'Unidos pelo Destino',
      ]) {
        expect(body).toContain(`## ${type}`);
      }
    });

    it('seeds the Eight Pillars and the Session Zero rules', () => {
      expect(bySlug('os-oito-pilares')?.type).toBe('rule');
      expect(bySlug('antes-de-comecar-sessao-zero')?.type).toBe('rule');
    });
  });

  describe('heroic skills', () => {
    const heroicBy = (source: string) =>
      seedEntries.filter(
        (e) =>
          e.type === 'heroic-skill' && (e.source ?? 'livro-basico') === source,
      );

    it('seeds the Heroic Skills of the Livro Básico and each Atlas', () => {
      expect(heroicBy('livro-basico')).toHaveLength(31);
      expect(heroicBy('high-fantasy')).toHaveLength(24);
      expect(heroicBy('natural-fantasy')).toHaveLength(21);
      expect(heroicBy('techno-fantasy')).toHaveLength(18);
    });

    it('lets only the five generic Heroic Skills be open to everyone', () => {
      const open = seedEntries.filter(
        (e) =>
          e.type === 'heroic-skill' &&
          e.details.requirements.classes.length === 0,
      );
      expect(open.map((e) => e.name).sort()).toEqual(
        [
          'Ambidestria',
          'Feitiços Extras',
          'PI Extras',
          'PM Extras',
          'PV Extras',
        ].sort(),
      );
    });

    it('rejects a Heroic Skill whose required class does not exist', () => {
      const errors = validateSeed([
        heroicSkill({
          name: 'Ataque',
          page: 234,
          summary: 'a',
          body: '',
          classes: ['Fantasma'],
        }),
      ]);
      expect(errors).toEqual([
        expect.stringContaining('"fantasma" is not a class'),
      ]);
    });

    it('rejects "required" larger than the number of classes', () => {
      const errors = validateSeed([
        guardiao,
        heroicSkill({
          name: 'Muralha',
          page: 238,
          summary: 'a',
          body: '',
          classes: ['Guardião'],
          required: 2,
        }),
      ]);
      expect(errors).toEqual([
        expect.stringContaining('requirements.required'),
      ]);
    });

    it('rejects an alsoRequires that is neither a skill nor a spell', () => {
      const errors = validateSeed([
        guardiao,
        heroicSkill({
          name: 'Muralha',
          page: 238,
          summary: 'a',
          body: '',
          classes: ['Guardião'],
          alsoRequires: ['Guardião'],
        }),
      ]);
      expect(errors).toEqual([
        expect.stringContaining('is not a skill or spell'),
      ]);
    });
  });
});
