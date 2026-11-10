import { CreatureDetails } from '../entries/entry-types';
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
  describe('creatures', () => {
    // A small Livro Básico soldier, in the shape of a bestiary stat block (p. 320).
    const creature = (
      details: Partial<CreatureDetails> = {},
      entry: Partial<SeedEntry> = {},
    ): SeedEntry =>
      ({
        type: 'creature',
        name: 'Cactonto',
        page: 319,
        summary: 'Cacto imponente que vaga pelas dunas.',
        details: {
          level: 15,
          species: 'plant',
          rank: 'soldier',
          villain: false,
          traits: ['assustador', 'territorial'],
          attributes: { DES: 8, AST: 6, VIG: 12, VON: 6 },
          hp: 90,
          crisis: 45,
          mp: 55,
          initiative: 7,
          defense: { value: 0, fixed: false },
          magicDefense: 0,
          affinities: { fire: 'resistant', ice: 'vulnerable' },
          attacks: [],
          spells: [],
          otherActions: [],
          specialRules: [],
          ...details,
        },
        ...entry,
      }) as SeedEntry;

    const bestiary = seedEntries.filter(
      (e): e is Extract<SeedEntry, { type: 'creature' }> =>
        e.type === 'creature',
    );
    const ofSpecies = (species: string) =>
      bestiary.filter((e) => e.details.species === species);

    it('seeds the 56 creatures of the Livro Básico Bestiário (p. 324-353)', () => {
      expect(bestiary).toHaveLength(56);
      expect(
        Object.fromEntries(
          [
            'construct',
            'demon',
            'elemental',
            'beast',
            'humanoid',
            'monster',
            'undead',
            'plant',
          ].map((species) => [species, ofSpecies(species).length]),
        ),
      ).toEqual({
        construct: 7,
        demon: 4,
        elemental: 7,
        beast: 8,
        humanoid: 8,
        monster: 8,
        undead: 8,
        plant: 6,
      });
      for (const e of bestiary) {
        expect(e.source ?? 'livro-basico').toBe('livro-basico');
        expect(e.details.rank).toBe('soldier');
        expect(e.page).toBeGreaterThanOrEqual(324);
        expect(e.page).toBeLessThanOrEqual(353);
        // "organizadas em aumentos de cinco em cinco níveis" (p. 292): 5 to 20.
        expect([5, 10, 15, 20]).toContain(e.details.level);
        expect(e.details.attacks.length).toBeGreaterThan(0);
      }
    });

    it('gives every Species the Affinities its rule demands (p. 303-305)', () => {
      for (const e of ofSpecies('construct')) {
        expect(e.details.affinities).toMatchObject({
          poison: 'immune',
          earth: 'resistant',
        });
      }
      for (const e of ofSpecies('elemental')) {
        expect(e.details.affinities.poison).toBe('immune');
      }
      for (const e of ofSpecies('undead')) {
        expect(e.details.affinities).toMatchObject({
          dark: 'immune',
          poison: 'immune',
          light: 'vulnerable',
        });
      }
      for (const e of ofSpecies('plant')) {
        const weak = ['air', 'fire', 'ice', 'bolt'].filter(
          (type) =>
            e.details.affinities[type as keyof typeof e.details.affinities] ===
            'vulnerable',
        );
        expect(weak.length).toBeGreaterThanOrEqual(1);
      }
    });

    it('prints a fixed Defesa, not a bonus, for the six creatures that have one', () => {
      const fixed = bestiary
        .filter((e) => e.details.defense.fixed)
        .map((e) => [e.name, e.details.defense.value]);
      expect(fixed).toEqual([
        ['Soldado Tecnomágico', 11],
        ['Guarda', 11],
        ['Mercenário', 11],
        ['Mago de Batalha', 11],
        ['Soldado Esqueleto', 12],
        ['Vinha-daninha', 12],
      ]);
    });

    it('seeds the Cactonto with the numbers printed on p. 352', () => {
      const cactonto = seedEntries.find((e) => e.name === 'Cactonto');
      expect(cactonto).toMatchObject({ type: 'creature', page: 352 });
      expect(cactonto?.details).toMatchObject({
        level: 15,
        species: 'plant',
        rank: 'soldier',
        attributes: { DES: 8, AST: 6, VIG: 12, VON: 6 },
        hp: 90,
        crisis: 45,
        mp: 55,
        initiative: 7,
        defense: { value: 0, fixed: false },
        magicDefense: 0,
        affinities: {
          air: 'resistant',
          earth: 'resistant',
          fire: 'resistant',
          ice: 'vulnerable',
          light: 'resistant',
        },
      });
      const { attacks, spells } = cactonto?.details as CreatureDetails;
      expect(attacks.map((a) => [a.name, a.accuracy, a.damage])).toEqual([
        ['Abraço Perfurador', 'VIG + VIG', 10],
        ['Barragem de Espinhos', 'DES + VIG', 5],
      ]);
      expect(spells).toMatchObject([
        { name: 'Drenar Umidade', mpCost: '10', offensive: true },
      ]);
    });

    it('accepts a valid Livro Básico Creature', () => {
      expect(validateSeed([creature()])).toEqual([]);
    });

    it('gives a Livro Básico Creature no Role and never a champion Rank', () => {
      expect(validateSeed([creature({ role: 'brute' })])).toEqual([
        expect.stringContaining('only the Bestiary Vol. I has a role'),
      ]);
      expect(validateSeed([creature({ rank: 'champion' })])).toEqual([
        expect.stringContaining('only the Bestiary Vol. I has champions'),
      ]);
    });

    it('requires the English name of a Bestiary Vol. I Creature', () => {
      const volumeOne = (details: Partial<CreatureDetails> = {}) =>
        creature(
          { role: 'brute', rank: 'champion', ...details },
          { source: 'bestiary-vol-1', page: 120 },
        );
      expect(validateSeed([volumeOne()])).toEqual([
        expect.stringContaining('originalName'),
      ]);
      expect(
        validateSeed([volumeOne({ originalName: 'Cactus Brute' })]),
      ).toEqual([]);
    });

    it('rejects an unknown Species, Rank, damage type or Affinity', () => {
      expect(validateSeed([creature({ species: 'dragon' as never })])).toEqual([
        expect.stringContaining('details.species'),
      ]);
      expect(validateSeed([creature({ rank: 'boss' as never })])).toEqual([
        expect.stringContaining('details.rank'),
      ]);
      expect(
        validateSeed([creature({ affinities: { sound: 'immune' } as never })]),
      ).toEqual([expect.stringContaining('damage type "sound"')]);
      expect(
        validateSeed([creature({ affinities: { fire: 'weak' } as never })]),
      ).toEqual([expect.stringContaining('affinity "weak"')]);
    });

    it('rejects an Attribute die outside d6 to d12', () => {
      for (const VIG of [4, 7, 14]) {
        const attributes = { DES: 8, AST: 6, VIG, VON: 6 } as never;
        expect(validateSeed([creature({ attributes })])).toEqual([
          expect.stringContaining('details.attributes.VIG'),
        ]);
      }
    });

    it('rejects a level that is not a multiple of 5 between 5 and 60', () => {
      for (const level of [0, 7, 15.5, 65]) {
        expect(validateSeed([creature({ level })])).toEqual([
          expect.stringContaining('details.level'),
        ]);
      }
      for (const level of [5, 10, 15, 60]) {
        expect(validateSeed([creature({ level })])).toEqual([]);
      }
    });

    it('rejects a Crisis that is not half the PV, rounded down', () => {
      expect(validateSeed([creature({ hp: 90, crisis: 40 })])).toEqual([
        expect.stringContaining('crisis'),
      ]);
      expect(validateSeed([creature({ hp: 91, crisis: 45 })])).toEqual([]);
    });
  });

  describe('quick assembly', () => {
    const rules = seedEntries.filter(
      (e) => e.type === 'rule' && e.source === 'bestiary-vol-1',
    );
    const role = (name: string) =>
      rules.find((e) => e.name === `Montagem Rápida: ${name}`);

    it('seeds the process Rule and one Rule per Role, from the Bestiary Vol. I', () => {
      expect(rules.map((e) => [e.name, e.page])).toEqual([
        ['Montagem Rápida', 25],
        ['Montagem Rápida: Bruto', 30],
        ['Montagem Rápida: Caçador', 34],
        ['Montagem Rápida: Mago', 38],
        ['Montagem Rápida: Sabotador', 42],
        ['Montagem Rápida: Sentinela', 46],
        ['Montagem Rápida: Apoio', 50],
      ]);
      // The English names stay searchable.
      expect(role('Bruto')?.tags).toEqual(
        expect.arrayContaining(['quick assembly', 'brute']),
      );
    });

    it('keeps the book numbers of the level tables (p. 32-52)', () => {
      const row = (name: string, level: number) => {
        const d = role(name)?.details as { progression: { level: number }[] };
        return d.progression.find((r) => r.level === level);
      };
      expect(row('Bruto', 60)).toEqual({
        level: 60,
        attributes: { AST: 8, VIG: 12, VON: 10 },
        hp: 200,
        mp: 110,
        accuracy: 6,
        extraDamage: 15,
      });
      expect(row('Caçador', 40)).toEqual({
        level: 40,
        attributes: { DES: 12, VON: 8 },
        hp: 120,
        mp: 80,
        accuracy: 4,
        extraDamage: 10,
      });
      expect(row('Mago', 20)).toMatchObject({ hp: 70, mp: 70, extraDamage: 5 });
      expect(row('Sabotador', 10)).toMatchObject({
        hp: 60,
        mp: 50,
        accuracy: 1,
      });
      expect(row('Sentinela', 60)).toMatchObject({ hp: 170, mp: 110 });
      expect(row('Apoio', 60)).toMatchObject({
        attributes: { AST: 12, VIG: 8 },
        hp: 170,
      });
    });

    it('keeps the level 5 profile of each Role', () => {
      const base = (name: string) =>
        (role(name)?.details as { base: Record<string, unknown> }).base;
      expect(base('Bruto')).toMatchObject({
        attributes: { DES: 8, AST: 6, VIG: 10, VON: 8 },
        hp: 70,
        mp: 45,
        initiative: 7,
        vulnerabilities: 2,
      });
      expect(base('Mago')).toMatchObject({
        hp: 40,
        mp: 55,
        defense: 1,
        magicDefense: 2,
      });
      expect(base('Sentinela')).toMatchObject({
        vulnerabilities: 2,
        defense: 2,
      });
    });

    /** A Role Rule on its own: no body links, and no spell references (their targets are not in the list). */
    const aloneWithoutSpells = (name: string) => {
      const clone = structuredClone(role(name)) as SeedEntry & {
        details: { skills: { spells?: unknown }[]; baseSpells?: unknown };
      };
      clone.body = '';
      clone.details.skills = clone.details.skills.filter(
        (skill) => !skill.spells,
      );
      delete clone.details.baseSpells;
      return clone;
    };

    const withRole = (change: (d: Record<string, unknown>) => void) => {
      const brute = aloneWithoutSpells('Bruto') as SeedEntry & {
        details: Record<string, unknown>;
      };
      change(brute.details);
      return validateSeed([brute]);
    };

    it('rejects a base Initiative that is not (DES + AST) / 2 rounded down', () => {
      const errors = withRole((d) => {
        (d.base as { initiative: number }).initiative = 9;
      });
      expect(errors).toEqual([expect.stringContaining('initiative')]);
    });

    it('rejects a progression that skips a level', () => {
      const errors = withRole((d) => {
        // Level 50: no grant of the brute points at it.
        (d.progression as unknown[]).splice(4, 1);
      });
      expect(errors).toEqual([expect.stringContaining('progression')]);
    });

    it('rejects a text that names a choice the entry does not offer', () => {
      const errors = withRole((d) => {
        const attacks = d.attacks as { effect?: string }[];
        attacks[0].effect = 'Causa dano e o alvo fica {status}.';
      });
      expect(errors).toEqual([expect.stringContaining('{status}')]);
    });

    it('lists the Skills and customizations in the page of each Role, naming the choices', () => {
      const body = (name: string) => role(name)?.body ?? '';
      expect(body('Bruto')).toContain('## Poderes de função');
      expect(body('Bruto')).toContain('## Personalização');
      expect(body('Bruto')).toContain('**Esmagar**');
      expect(body('Bruto')).toContain('perder 20 PV');
      expect(body('Bruto')).toContain('**Mau Humor**');
      expect(body('Caçador')).toContain('**Mira Fixa**');
      // A choice reads as "(escolha: …)", an amount as the three values of the table.
      expect(body('Bruto')).toContain('(escolha: tipo de dano)');
      expect(body('Bruto')).toContain('pequena (10/20/30)');
      expect(body('Bruto')).not.toMatch(/\{\w+\}/);
      // Who may take it.
      expect(body('Bruto')).toContain(
        '**Relógio de Colapso** (só elite e campeão)',
      );
    });

    describe('spells', () => {
      type Ref = { kind: string; id: string; name: string; minLevel?: number };
      type Grant = {
        from: Ref[];
        options: { id: string; label: string; count: number; mp: number }[];
      };
      const details = (roleName: string) =>
        role(roleName)?.details as unknown as {
          skills: { id: string; ranks?: string[]; spells?: Grant }[];
          baseSpells?: Grant;
        };
      const names = (grant?: Grant) => grant?.from.map((r) => r.name);
      const spellSkill = (roleName: string) =>
        details(roleName).skills.find((skill) => skill.spells);

      const npc = seedEntries.find(
        (e) => e.type === 'rule' && e.name === 'Feitiços de NPC',
      );

      it('seeds the 15 spells of the Livro Básico NPC list (p. 310-311)', () => {
        expect(npc).toMatchObject({ page: 310 });
        expect(npc?.source ?? 'livro-basico').toBe('livro-basico');
        const spells = (
          npc?.details as unknown as {
            spells: {
              name: string;
              mpCost: string;
              target: string;
              duration: string;
              offensive: boolean;
            }[];
          }
        ).spells;
        expect(
          spells.map((s) => [
            s.name,
            s.mpCost,
            s.target,
            s.duration,
            s.offensive,
          ]),
        ).toEqual([
          ['Acelerar', '20', 'Uma criatura', 'Instantânea', false],
          ['Brado de Guerra', '10 × A', 'Até três criaturas', 'Cena', false],
          ['Concha', '10', 'Pessoal', 'Cena', false],
          ['Condição em Área', '20', 'Especial', 'Instantânea', false],
          ['Devastação', '30', 'Especial', 'Instantânea', false],
          ['Enfraquecer', '10', 'Uma criatura', 'Cena', true],
          ['Envenenar', '10 × A', 'Até três criaturas', 'Instantânea', true],
          ['Fúria', '10 × A', 'Até três criaturas', 'Instantânea', true],
          ['Lamber Feridas', '5', 'Pessoal', 'Instantânea', false],
          ['Maldição', '5', 'Uma criatura', 'Instantânea', true],
          ['Roubo de Mana', '10', 'Uma criatura', 'Instantânea', true],
          ['Roubo de Vida', '10', 'Uma criatura', 'Instantânea', true],
          ['Sopro', '5', 'Uma criatura', 'Instantânea', true],
          ['Sopro Amaldiçoado', '10', 'Uma criatura', 'Instantânea', true],
          ['Ultramaldição', '10', 'Uma criatura', 'Instantânea', true],
        ]);
      });

      it('lists the NPC spells in a page that the Role pages link to', () => {
        expect(npc?.body).toContain('**Sopro Amaldiçoado**');
        expect(npc?.body).toContain('(escolha: tipo de dano)');
        expect(npc?.tags).toEqual(expect.arrayContaining(['npc spells']));
        expect(role('Sentinela')?.body).toContain('[[feiticos-de-npc]]');
      });

      it('gives each Role the spells the book lists, by their Portuguese names', () => {
        expect(names(spellSkill('Bruto')?.spells)).toEqual([
          'Condição em Área',
          'Ultramaldição',
          'Sopro Amaldiçoado',
          'Fúria',
          'Lamber Feridas',
          'Roubo de Vida',
          'Envenenar',
          'Reforçar',
        ]);
        expect(names(spellSkill('Caçador')?.spells)).toEqual([
          'Sopro',
          'Sopro Amaldiçoado',
          'Lamber Feridas',
          'Roubo de Vida',
          'Espelhar',
        ]);
        expect(names(spellSkill('Sabotador')?.spells)).toEqual([
          'Condição em Área',
          'Ultramaldição',
          'Dissipar',
          'Drenar Espírito',
          'Envenenar',
          'Fúria',
          'Parar',
          'Enfraquecer',
        ]);
        expect(names(spellSkill('Sentinela')?.spells)).toEqual([
          'Sopro',
          'Lamber Feridas',
          'Concha',
          'Brado de Guerra',
        ]);
      });

      it('gives the mage and the support a base choice of spells, and the mage a second list', () => {
        expect(names(details('Mago').baseSpells)).toEqual([
          'Sopro',
          'Sopro Amaldiçoado',
          'Clarão',
          'Fulgur',
          'Glacies',
          'Iceberg',
          'Ignis',
          'Lux',
          'Ômega',
          'Terra',
          'Raio',
          'Umbra',
          'Ventus',
        ]);
        expect(names(spellSkill('Mago')?.spells)).toEqual([
          'Sopro Amaldiçoado',
          'Devastação',
          'Drenar Espírito',
          'Clarão',
          'Iceberg',
          'Roubo de Vida',
          'Roubo de Mana',
          'Ômega',
          'Raio',
        ]);
        expect(names(details('Apoio').baseSpells)).toEqual([
          'Aura',
          'Despertar',
          'Barreira',
          'Purificar',
          'Divinação',
          'Mortalha Elemental',
          'Curar',
          'Espelhar',
          'Acelerar',
          'Reforçar',
          'Bastião Espiritual',
          'Brado de Guerra',
        ]);
        expect(details('Bruto').baseSpells).toBeUndefined();
      });

      it('says how many spells a grant gives and what it costs in PM', () => {
        const options = (grant?: Grant) =>
          grant?.options.map((o) => [o.id, o.count, o.mp]);
        expect(options(spellSkill('Bruto')?.spells)).toEqual([['two', 2, 0]]);
        expect(options(spellSkill('Sabotador')?.spells)).toEqual([
          ['one', 1, 10],
        ]);
        expect(options(spellSkill('Sentinela')?.spells)).toEqual([
          ['one', 1, 10],
        ]);
        expect(options(details('Mago').baseSpells)).toEqual([
          ['two', 2, 0],
          ['one', 1, 10],
        ]);
        expect(options(spellSkill('Mago')?.spells)).toEqual([
          ['two', 2, 0],
          ['one', 1, 10],
        ]);
      });

      it('keeps the strongest spells for level 30 and up, as the book does', () => {
        const level = (grant: Grant | undefined, name: string) =>
          grant?.from.find((r) => r.name === name)?.minLevel;
        const base = details('Mago').baseSpells;
        expect(
          ['Clarão', 'Iceberg', 'Raio'].map((n) => level(base, n)),
        ).toEqual([30, 30, 30]);
        expect(level(base, 'Fulgur')).toBeUndefined();
        expect(level(spellSkill('Mago')?.spells, 'Devastação')).toBe(30);
      });

      it('keeps the elite and champion limit of the brute spells', () => {
        expect(spellSkill('Bruto')?.ranks).toEqual(['elite', 'champion']);
      });

      const withGrant = (change: (grant: Grant) => void) => {
        const mage = aloneWithoutSpells('Mago') as SeedEntry & {
          details: { baseSpells?: Grant };
        };
        // Only NPC spells can be resolved here (the NPC rule is in the list).
        const grant: Grant = {
          from: (
            role('Mago')?.details as unknown as { baseSpells: Grant }
          ).baseSpells.from.filter((ref) => ref.kind === 'npc'),
          options: [{ id: 'two', label: 'Dois feitiços', count: 2, mp: 0 }],
        };
        mage.details.baseSpells = grant;
        change(grant);
        return validateSeed([{ ...npc!, body: '' } as SeedEntry, mage]);
      };

      it('rejects a spell of the NPC list that does not exist', () => {
        const errors = withGrant((grant) => {
          grant.from[0] = { kind: 'npc', id: 'fantasma', name: 'Fantasma' };
        });
        expect(errors).toEqual([expect.stringContaining('"fantasma"')]);
      });

      it('rejects a class spell that is not a spell Entry', () => {
        const errors = withGrant((grant) => {
          grant.from[1] = { kind: 'class', id: 'nada', name: 'Nada' };
        });
        expect(errors).toEqual([
          expect.stringContaining('"nada" is not a spell'),
        ]);
      });
    });

    describe('role skills and customizations', () => {
      type Skill = {
        id: string;
        name: string;
        effects: { to: string; name?: string; text: string }[];
        slots?: {
          id: string;
          count: number;
          min?: number;
          options: unknown[];
        }[];
        ranks?: string[];
        addsAttack?: { id: string };
        resistances?: number;
        extraVulnerabilities?: number;
      };
      const skillsOf = (roleName: string) => {
        const d = role(roleName)?.details as unknown as {
          skills: Skill[];
          customizations: Skill[];
          extra: string;
        };
        return d;
      };

      it('lists the Role Skills and customizations of every Role', () => {
        const counts = Object.fromEntries(
          ['Bruto', 'Caçador', 'Mago', 'Sabotador', 'Sentinela', 'Apoio'].map(
            (name) => [
              name,
              [
                skillsOf(name).skills.length,
                skillsOf(name).customizations.length,
              ],
            ],
          ),
        );
        expect(counts).toEqual({
          Bruto: [9, 5],
          Caçador: [9, 4],
          Mago: [8, 3],
          Sabotador: [9, 5],
          Sentinela: [9, 4],
          Apoio: [11, 3],
        });
      });

      it('says what the customization slot gives instead of a customization', () => {
        expect(
          Object.fromEntries(
            ['Bruto', 'Caçador', 'Mago', 'Sabotador', 'Sentinela', 'Apoio'].map(
              (name) => [name, skillsOf(name).extra],
            ),
          ),
        ).toEqual({
          Bruto: 'hp',
          Caçador: 'skill',
          Mago: 'immunity',
          Sabotador: 'skill',
          Sentinela: 'skill',
          Apoio: 'skill',
        });
      });

      it("keeps the book's limits: some Skills are for elites and champions only", () => {
        const restricted = (name: string) =>
          skillsOf(name)
            .skills.filter((skill) => skill.ranks)
            .map((skill) => [skill.name, skill.ranks]);
        expect(restricted('Bruto')).toEqual([
          ['Relógio de Colapso', ['elite', 'champion']],
          ['Feitiços', ['elite', 'champion']],
        ]);
        expect(restricted('Sentinela')).toEqual([
          ['Ataque normal múltiplo', ['elite', 'champion']],
          ['Vingança', ['elite', 'champion']],
        ]);
        expect(restricted('Apoio')).toEqual([
          ['Aconselhar e Inspirar', ['champion']],
        ]);
      });

      it('has the Barricada choose one or two damage types', () => {
        const barricade = skillsOf('Sentinela').skills.find(
          (skill) => skill.name === 'Barricada',
        );
        expect(barricade?.effects[0].to).toBe('action');
        expect(barricade?.slots?.[0]).toMatchObject({ count: 2, min: 1 });
        expect(barricade?.slots?.[0].options).toHaveLength(9);
      });

      it('makes the support champion Skill add both actions and one Vulnerability', () => {
        const both = skillsOf('Apoio').skills.find(
          (skill) => skill.name === 'Aconselhar e Inspirar',
        );
        expect(both?.effects.map((e) => [e.to, e.name])).toEqual([
          ['action', 'Aconselhar'],
          ['action', 'Inspirar'],
        ]);
        expect(both?.extraVulnerabilities).toBe(1);
      });

      it('lets the hunter and the saboteur add a strong attack', () => {
        for (const name of ['Caçador', 'Sabotador']) {
          const strongAttack = skillsOf(name).skills.filter(
            (skill) => skill.addsAttack?.id === 'strong',
          );
          expect(strongAttack).toHaveLength(1);
        }
      });

      const withSkill = (change: (skill: Skill) => void) => {
        const brute = aloneWithoutSpells('Bruto') as SeedEntry & {
          details: { skills: Skill[] };
        };
        change(brute.details.skills[0]);
        return validateSeed([brute]);
      };

      it('rejects a Skill text that names a choice it does not offer', () => {
        const errors = withSkill((skill) => {
          skill.effects[0].text = 'Imune a {inexistente}.';
        });
        expect(errors).toEqual([expect.stringContaining('{inexistente}')]);
      });

      it('rejects a Skill effect that goes nowhere', () => {
        const errors = withSkill((skill) => {
          skill.effects[0].to = 'nowhere';
        });
        expect(errors).toEqual([expect.stringContaining('nowhere')]);
      });

      it('rejects two Skills with the same id', () => {
        const errors = withSkill((skill) => {
          skill.id = 'estrutura-repetida';
        });
        // The first Skill now has a fresh id: no error. Repeat it on the second one too.
        expect(errors).toEqual([]);
        const brute = aloneWithoutSpells('Bruto') as SeedEntry & {
          details: { skills: Skill[] };
        };
        brute.details.skills[1].id = brute.details.skills[0].id;
        expect(validateSeed([brute])).toEqual([
          expect.stringContaining('repeated'),
        ]);
      });
    });
  });
  describe('services and transport', () => {
    const named = (type: 'service' | 'transport', name: string) =>
      seedEntries.find((e) => e.type === type && e.name === name);
    const ofType = (type: 'service' | 'transport', source: string) =>
      seedEntries.filter(
        (e) => e.type === type && (e.source ?? 'livro-basico') === source,
      );

    it('seeds the Livro Básico table (p. 125) and the Techno Fantasy one (p. 79)', () => {
      expect(ofType('service', 'livro-basico')).toHaveLength(7);
      expect(ofType('transport', 'livro-basico')).toHaveLength(8);
      expect(ofType('service', 'techno-fantasy')).toHaveLength(2);
      expect(ofType('transport', 'techno-fantasy')).toHaveLength(4);
      for (const e of ofType('service', 'livro-basico'))
        expect(e.page).toBe(125);
      for (const e of ofType('transport', 'techno-fantasy'))
        expect(e.page).toBe(79);
    });

    it('keeps the book numbers for a Service', () => {
      expect(named('service', 'Recarga de PI')?.details).toEqual({
        group: 'settlement',
        cost: 10,
      });
      expect(named('service', 'Descanso (cidade)')?.details).toMatchObject({
        cost: 20,
      });
      expect(named('service', 'Viagem aérea')?.details).toEqual({
        group: 'travel',
        medium: 'air',
        cost: 40,
      });
      expect(named('service', 'Viagem interestelar')?.details).toMatchObject({
        cost: 100,
      });
    });

    it('keeps the book numbers for a Transport', () => {
      expect(named('transport', 'Montaria terrestre')?.details).toEqual({
        transportClass: 'mount',
        medium: 'land',
        cost: 200,
        passengers: 2,
        distance: { planetary: 2, interplanetary: null, interstellar: null },
      });
      expect(named('transport', 'Veículo voador')?.details).toMatchObject({
        cost: 8000,
        passengers: 20,
        distance: { planetary: 3 },
      });
      expect(named('transport', 'Veículo planetário')?.details).toEqual({
        transportClass: 'vehicle',
        medium: 'planetary',
        cost: 20000,
        passengers: 50,
        approximate: true,
        distance: { planetary: 4, interplanetary: 2, interstellar: 1 },
      });
      expect(
        named('transport', 'Montaria interplanetária')?.details,
      ).toMatchObject({
        distance: { planetary: 3, interplanetary: 1, interstellar: null },
      });
    });

    it('explains the shared rules in a Rule per book that every row links to', () => {
      const core = seedEntries.find((e) => e.name === 'Serviços e Transporte');
      const space = seedEntries.find(
        (e) => e.name === 'Serviços e Transporte (viagem espacial)',
      );
      expect(core).toMatchObject({ type: 'rule', page: 124 });
      expect(space).toMatchObject({
        type: 'rule',
        page: 79,
        source: 'techno-fantasy',
      });
      for (const e of seedEntries.filter(
        (x) => x.type === 'service' || x.type === 'transport',
      )) {
        const rule = e.source === 'techno-fantasy' ? space : core;
        expect(e.body).toContain(`[[${resolveSlug(rule!)}]]`);
      }
    });

    it('points the equipment steps of two guides at the Rule', () => {
      for (const name of ['Criar um personagem', 'Como jogar']) {
        const guide = seedEntries.find((e) => e.name === name);
        const entries =
          guide?.type === 'guide'
            ? guide.details.steps.flatMap((s) => s.entries)
            : [];
        expect(entries).toContain('servicos-e-transporte');
      }
    });

    const service = (details: object): SeedEntry =>
      ({
        type: 'service',
        name: 'Descanso',
        page: 125,
        summary: 'a',
        details,
      }) as SeedEntry;
    const transport = (details: object): SeedEntry =>
      ({
        type: 'transport',
        name: 'Carroça',
        page: 125,
        summary: 'a',
        details,
      }) as SeedEntry;
    const ok = {
      transportClass: 'vehicle',
      medium: 'land',
      cost: 600,
      passengers: 6,
      distance: { planetary: 2, interplanetary: null, interstellar: null },
    };

    it('rejects a Service with a bad group, cost or medium', () => {
      expect(validateSeed([service({ group: 'x', cost: 5 })])).toEqual([
        expect.stringContaining('details.group'),
      ]);
      expect(
        validateSeed([service({ group: 'settlement', cost: -1 })]),
      ).toEqual([expect.stringContaining('details.cost')]);
      expect(validateSeed([service({ group: 'travel', cost: 10 })])).toEqual([
        expect.stringContaining('travel fare needs details.medium'),
      ]);
      expect(
        validateSeed([
          service({ group: 'settlement', cost: 5, medium: 'air' }),
        ]),
      ).toEqual([expect.stringContaining('only a travel fare')]);
    });

    it('rejects a Transport with a bad class, medium, passengers or distance', () => {
      expect(validateSeed([transport(ok)])).toEqual([]);
      expect(validateSeed([transport({ ...ok, transportClass: 'x' })])).toEqual(
        [expect.stringContaining('details.transportClass')],
      );
      expect(validateSeed([transport({ ...ok, medium: 'x' })])).toEqual([
        expect.stringContaining('details.medium'),
      ]);
      expect(validateSeed([transport({ ...ok, passengers: 0 })])).toEqual([
        expect.stringContaining('details.passengers'),
      ]);
      expect(
        validateSeed([
          transport({
            ...ok,
            distance: {
              planetary: null,
              interplanetary: null,
              interstellar: null,
            },
          }),
        ]),
      ).toEqual([expect.stringContaining('at least one distance')]);
      expect(
        validateSeed([
          transport({
            ...ok,
            distance: {
              planetary: 0,
              interplanetary: null,
              interstellar: null,
            },
          }),
        ]),
      ).toEqual([expect.stringContaining('distance.planetary')]);
    });
  });
});
