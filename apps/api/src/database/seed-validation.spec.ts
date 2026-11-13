import {
  ClassTrait,
  CreatureDetails,
  isCreatureGroup,
} from '../entries/entry-types';
import { slugify } from '../entries/slug';
import { seedEntries } from './seed-data';
import {
  classEntry,
  creatureGroup,
  heroicSkill,
  peculiarity,
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
  traits: ['hp'],
});

describe('validateSeed', () => {
  describe('class traits', () => {
    const classWith = (traits: string[]) =>
      classEntry({
        name: 'Guardião',
        page: 202,
        summary: 'Protetor.',
        body: '',
        otherNames: [],
        quote: null,
        freeBenefits: ['PV +5'],
        traits: traits as ClassTrait[],
      });
    const messagesFor = (traits: string[]) =>
      validateSeed([classWith(traits)]).join('\n');

    it('rejects a class with no traits', () => {
      expect(messagesFor([])).toContain(
        'details.traits must be a non-empty list',
      );
    });

    it('rejects a class with an unknown trait', () => {
      expect(messagesFor(['flying'])).toContain('unknown trait "flying"');
    });

    it('rejects a class with a repeated trait', () => {
      expect(messagesFor(['hp', 'hp'])).toContain(
        'details.traits has duplicates',
      );
    });

    it('gives every seeded class traits that are consistent with its freeBenefits', () => {
      const wording: [string, RegExp][] = [
        ['hp', /\bPV\b/],
        ['mp', /\bPM\b/],
        ['ip', /\bPI\b|Pontos de Inventário/],
        ['melee-weapon', /corpo a corpo/],
        ['ranged-weapon', /à distância/],
        ['armor', /armaduras/],
        ['shield', /escudos/],
        ['rituals', /rituais/],
        ['projects', /projetos/i],
      ];
      const classes = seedEntries.filter((e) => e.type === 'class');
      expect(classes.length).toBeGreaterThan(0);
      for (const c of classes) {
        const { traits, freeBenefits } = c.details as {
          traits: string[];
          freeBenefits: string[];
        };
        const text = freeBenefits.join(' ');
        for (const [trait, pattern] of wording) {
          expect([c.name, trait, traits.includes(trait)]).toEqual([
            c.name,
            trait,
            pattern.test(text),
          ]);
        }
      }
    });
  });

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

    // The Livro Básico Creatures with a stat block (Creature Groups have none).
    const bestiary = seedEntries.filter(
      (
        e,
      ): e is Extract<SeedEntry, { type: 'creature' }> & {
        details: CreatureDetails;
      } =>
        e.type === 'creature' &&
        (e.source ?? 'livro-basico') === 'livro-basico' &&
        !isCreatureGroup(e.details),
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

    describe('Creature Groups', () => {
      // A Group is a Creature Entry with no stat block; its members point to it.
      const group = (name = 'Fantasmas'): SeedEntry =>
        ({
          type: 'creature',
          name,
          page: 330,
          summary: 'Almas que não encontraram descanso.',
          details: { group: true },
        }) as SeedEntry;
      const member = (name: string, groupSlug: string): SeedEntry =>
        creature({ groupSlug }, { name });

      it('builds a Group with creatureGroup(), tagged and without stats', () => {
        const built = creatureGroup({
          name: 'Fantasmas',
          page: 330,
          summary: 'Almas inquietas.',
        });
        expect(built).toMatchObject({
          type: 'creature',
          details: { group: true },
          tags: ['criatura', 'grupo'],
        });
        expect(validateSeed([built, member('Espectro', 'fantasmas')])).toEqual(
          [],
        );
      });

      it('accepts a Group whose members point to it', () => {
        expect(
          validateSeed([
            group(),
            member('Espectro', 'fantasmas'),
            member('Aparição', 'fantasmas'),
          ]),
        ).toEqual([]);
      });

      it('rejects a member of a Group that does not exist', () => {
        expect(validateSeed([member('Espectro', 'fantasmas')])).toEqual([
          'espectro: "fantasmas" is not a creature group',
        ]);
      });

      it('rejects a member of an Entry that is not a Creature', () => {
        const rule = {
          type: 'rule',
          name: 'Fantasmas',
          page: 10,
          summary: 'Regra.',
          details: {},
        } as SeedEntry;
        expect(validateSeed([rule, member('Espectro', 'fantasmas')])).toEqual([
          'espectro: "fantasmas" is not a creature group',
        ]);
      });

      it('rejects a member of a Creature that has a stat block of its own', () => {
        expect(
          validateSeed([
            creature({}, { name: 'Chefe' }),
            member('Espectro', 'chefe'),
          ]),
        ).toEqual(['espectro: "chefe" is not a creature group']);
      });

      it('rejects a Group with no members', () => {
        expect(validateSeed([group()])).toEqual([
          'fantasmas: a creature group needs at least one member',
        ]);
      });
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

    describe('Bestiary Vol. I extras', () => {
      const volumeOne = (
        details: Partial<CreatureDetails> = {},
        entry: Partial<SeedEntry> = {},
      ) =>
        creature(
          { role: 'brute', originalName: 'Cactus Brute', ...details },
          { source: 'bestiary-vol-1', page: 120, ...entry },
        );

      it('may have no Role (the final boss and its worlds have none)', () => {
        expect(validateSeed([volumeOne({ role: undefined })])).toEqual([]);
      });

      it('gives a champion the number of soldiers it replaces, from 1 to 6, and nobody else', () => {
        const champion = (championX?: number) =>
          volumeOne({ rank: 'champion', championX });
        expect(validateSeed([champion(4)])).toEqual([]);
        expect(validateSeed([champion()])).toEqual([
          'cactonto: a champion needs details.championX',
        ]);
        expect(validateSeed([champion(7)])).toEqual([
          'cactonto: details.championX (7) must be an integer from 1 to 6',
        ]);
        expect(validateSeed([volumeOne({ championX: 3 })])).toEqual([
          'cactonto: only a champion has details.championX',
        ]);
      });

      it('accepts the Solo, Unique and Part marks, and Part needs a Group', () => {
        expect(
          validateSeed([volumeOne({ flags: ['solo', 'unique'] })]),
        ).toEqual([]);
        expect(validateSeed([volumeOne({ flags: ['huge' as never] })])).toEqual(
          ['cactonto: unknown details.flags "huge"'],
        );
        expect(validateSeed([volumeOne({ flags: ['part'] })])).toEqual([
          'cactonto: a Part must belong to a creature group',
        ]);
      });
    });

    it('requires the English name of a Bestiary Vol. I Creature', () => {
      const volumeOne = (details: Partial<CreatureDetails> = {}) =>
        creature(
          { role: 'brute', rank: 'champion', championX: 3, ...details },
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

    /** The NPC spell Rule without its body links: what the process Rule's spell references need. */
    const npcAlone = () =>
      ({
        ...seedEntries.find(
          (e) => e.type === 'rule' && e.name === 'Feitiços de NPC',
        )!,
        body: '',
      }) as SeedEntry;

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

    it('names the tool the Rules link to, the Laboratório Oroboros', () => {
      const link = '[Laboratório Oroboros](/laboratorio-oroboros)';
      for (const name of [
        'Montagem Rápida',
        'Montagem Rápida: Bruto',
        'Feitiços de NPC',
      ]) {
        const entry = seedEntries.find((e) => e.name === name);
        expect(entry?.body).toContain(link);
      }
      expect(JSON.stringify(seedEntries)).not.toContain(
        'Montagem de Criaturas',
      );
    });

    describe('species', () => {
      type Option = {
        id: string;
        label: string;
        kind: string;
        max?: number;
        amount?: number;
        spells?: { from: { name: string }[]; options: { mp: number }[] };
        swaps?: string;
        swapType?: string;
        slots?: { id: string }[];
        rule?: { name: string; text: string };
      };
      type SpeciesRule = {
        species: string;
        affinities: Record<string, string>;
        statusImmunities: string[];
        resistances?: number;
        immunities?: number;
        vulnerability?: string[];
        picks: number;
        extra?: { vulnerability: string[]; picks: number };
        note?: string;
        options: Option[];
      };
      const process = seedEntries.find(
        (e) => e.type === 'rule' && e.name === 'Montagem Rápida',
      );
      const all = () =>
        (process?.details as unknown as { species: SpeciesRule[] }).species;
      const of = (species: string) => all().find((r) => r.species === species)!;
      const ids = (species: string) => of(species).options.map((o) => o.id);

      it('has a rule for each of the eight Species, in the book order (p. 70-73)', () => {
        expect(all().map((r) => r.species)).toEqual([
          'beast',
          'construct',
          'demon',
          'elemental',
          'humanoid',
          'monster',
          'plant',
          'undead',
        ]);
      });

      it('keeps what each Species always has', () => {
        expect(of('construct').affinities).toEqual({
          earth: 'resistant',
          poison: 'immune',
        });
        expect(of('construct').statusImmunities).toEqual(['poisoned']);
        expect(of('elemental').affinities).toEqual({ poison: 'immune' });
        expect(of('elemental').immunities).toBe(1);
        expect(of('elemental').statusImmunities).toEqual(['poisoned']);
        expect(of('demon').resistances).toBe(2);
        expect(of('plant').statusImmunities).toEqual([
          'dazed',
          'enraged',
          'shaken',
        ]);
        expect(of('undead').affinities).toEqual({
          light: 'vulnerable',
          dark: 'immune',
          poison: 'immune',
        });
        expect(of('undead').statusImmunities).toEqual(['poisoned']);
        expect(of('undead').note).toContain('PV');
        expect(of('beast').affinities).toEqual({});
        expect(of('monster').statusImmunities).toEqual([]);
      });

      it('restricts the Vulnerability a Species asks for, as the book does', () => {
        expect(of('humanoid').vulnerability).toEqual([
          'dark',
          'light',
          'physical',
          'poison',
        ]);
        expect(of('plant').vulnerability).toEqual([
          'air',
          'bolt',
          'fire',
          'ice',
        ]);
        expect(of('beast').vulnerability).toBeUndefined();
        // The optional extra Vulnerability, and what it buys.
        expect(of('construct').extra).toEqual({
          vulnerability: ['air', 'bolt', 'fire', 'ice'],
          picks: 1,
        });
        expect(of('undead').extra?.vulnerability).toEqual([
          'air',
          'bolt',
          'earth',
          'fire',
          'ice',
        ]);
        expect(of('elemental').extra?.picks).toBe(1);
        expect(of('monster').extra).toBeUndefined();
      });

      it('says how many options each Species takes', () => {
        expect(
          Object.fromEntries(all().map((r) => [r.species, r.picks])),
        ).toEqual({
          beast: 2,
          construct: 0,
          demon: 1,
          elemental: 0,
          humanoid: 3,
          monster: 2,
          plant: 1,
          undead: 0,
        });
      });

      it('lists the options of each Species', () => {
        expect(ids('beast')).toEqual([
          'hp',
          'spell',
          'opposed',
          'flying',
          'role-skill',
        ]);
        expect(ids('construct')).toEqual([
          'status-immunity',
          'opposed',
          'flying',
          'role-skill',
        ]);
        expect(ids('demon')).toEqual([
          'absorb',
          'spell',
          'flying',
          'role-skill',
        ]);
        expect(ids('elemental')).toEqual([
          'absorb',
          'spell',
          'flying',
          'role-skill',
        ]);
        expect(ids('humanoid')).toEqual([
          'resistances',
          'spell',
          'opposed',
          'flying',
          'role-skill',
        ]);
        expect(ids('monster')).toEqual([
          'hp',
          'resistances',
          'spell',
          'flying',
          'role-skill',
        ]);
        expect(ids('plant')).toEqual([
          'hp',
          'resistances',
          'spell',
          'thorns',
          'flying',
          'role-skill',
        ]);
        expect(ids('undead')).toEqual([
          'absorb',
          'spell',
          'flying',
          'role-skill',
        ]);
      });

      it('lets the Role Skill be taken twice by the Species that may', () => {
        const max = (species: string) =>
          of(species).options.find((o) => o.id === 'role-skill')?.max;
        expect([max('beast'), max('humanoid'), max('monster')]).toEqual([
          2, 2, 2,
        ]);
        expect([max('construct'), max('demon'), max('plant')]).toEqual([
          undefined,
          undefined,
          undefined,
        ]);
      });

      it('names the spells each Species may learn, with +10 PM', () => {
        const names = (species: string) =>
          of(species)
            .options.find((o) => o.id === 'spell')
            ?.spells?.from.map((r) => r.name);
        expect(names('beast')).toEqual([
          'Lamber Feridas',
          'Concha',
          'Brado de Guerra',
        ]);
        expect(names('demon')).toEqual([
          'Sopro',
          'Ultramaldição',
          'Roubo de Mana',
          'Enfraquecer',
        ]);
        expect(names('elemental')).toEqual([
          'Sopro',
          'Sopro Amaldiçoado',
          'Lamber Feridas',
        ]);
        expect(names('humanoid')).toEqual([
          'Lamber Feridas',
          'Concha',
          'Brado de Guerra',
        ]);
        expect(names('plant')).toEqual([
          'Sopro',
          'Sopro Amaldiçoado',
          'Roubo de Vida',
          'Envenenar',
        ]);
        expect(names('undead')).toEqual([
          'Sopro',
          'Maldição',
          'Roubo de Vida',
          'Envenenar',
        ]);
        for (const species of ['beast', 'demon', 'plant']) {
          expect(
            of(species).options.find((o) => o.id === 'spell')?.spells
              ?.options[0].mp,
          ).toBe(10);
        }
      });

      it('keeps the +10 Hit Points in the data, and lets the Reader pick the type an Absorption swaps', () => {
        const opt = (species: string, id: string) =>
          of(species).options.find((o) => o.id === id) as Option & {
            amount?: number;
          };
        for (const species of ['beast', 'monster', 'plant']) {
          expect(opt(species, 'hp').amount).toBe(10);
        }
        // The book fixes the type for the undead (dark) and leaves it open for the others.
        expect(opt('demon', 'absorb').slots?.map((sl) => sl.id)).toEqual([
          'type',
        ]);
        expect(opt('elemental', 'absorb').slots?.map((sl) => sl.id)).toEqual([
          'type',
        ]);
        expect(opt('undead', 'absorb').slots).toBeUndefined();
      });

      it('keeps the Absorption swaps and the Plant thorns', () => {
        const opt = (species: string, id: string) =>
          of(species).options.find((o) => o.id === id)!;
        expect(opt('demon', 'absorb').swaps).toBe('resistant');
        expect(opt('elemental', 'absorb').swaps).toBe('immune');
        expect(opt('undead', 'absorb')).toMatchObject({
          swaps: 'immune',
          swapType: 'dark',
        });
        expect(opt('plant', 'thorns').rule?.text).toContain('5 de dano físico');
        expect(opt('plant', 'thorns').rule?.text).toContain('10');
      });

      it('lists the Species in the page of the process Rule', () => {
        expect(process?.body).toContain('## Espécies');
        expect(process?.body).toContain('### Construto');
        expect(process?.body).toContain('### Morto-vivo');
        expect(process?.body).toContain('Resistência a dano de terra');
        expect(process?.body).not.toMatch(/\{\w+\}/);
      });

      const withSpecies = (change: (r: SpeciesRule[]) => void) => {
        const rule = structuredClone(process) as SeedEntry & {
          details: { species: SpeciesRule[] };
        };
        rule.body = '';
        change(rule.details.species);
        return validateSeed([
          {
            ...(seedEntries.find(
              (e) => e.name === 'Feitiços de NPC',
            ) as SeedEntry),
            body: '',
          },
          rule,
        ]);
      };

      it('rejects a missing or repeated Species', () => {
        const errors = withSpecies((r) => {
          r.pop();
        });
        expect(errors).toEqual([expect.stringContaining('species')]);
      });

      it('says how many Resistances the Resistances option buys, and rejects it without a count', () => {
        const amounts = all()
          .flatMap((rule) => rule.options)
          .filter((o) => o.kind === 'resistances')
          .map((o) => o.amount);
        expect(amounts.length).toBeGreaterThan(0);
        expect(new Set(amounts)).toEqual(new Set([2]));
        const errors = withSpecies((r) => {
          const option = r
            .flatMap((rule) => rule.options)
            .find((o) => o.kind === 'resistances')!;
          delete option.amount;
        });
        // The option object is shared by the Species that offer it.
        expect(errors.length).toBeGreaterThan(0);
        for (const error of errors) {
          expect(error).toContain(
            'option "resistances" needs a positive amount',
          );
        }
      });

      it('rejects a Species option whose text names a choice it does not offer', () => {
        const errors = withSpecies((r) => {
          const rule = r[1].options.find((o) => o.id === 'status-immunity')!;
          rule.rule!.text = 'Imune a {nada}.';
        });
        expect(errors).toEqual([expect.stringContaining('{nada}')]);
      });
    });

    describe('boss skills', () => {
      type Boss = {
        id: string;
        name: string;
        group: string;
        effects: { to: string; text: string }[];
        slots?: {
          id: string;
          count: number;
          min?: number;
          options: unknown[];
        }[];
        spells?: { from: { id: string; minLevel?: number }[] };
      };
      type Group = { id: string; name: string; summary: string };
      const process = seedEntries.find(
        (e) => e.type === 'rule' && e.name === 'Montagem Rápida',
      );
      const details = () =>
        process?.details as unknown as {
          bossSkills: Boss[];
          bossGroups: Group[];
        };
      const inGroup = (group: string) =>
        details()
          .bossSkills.filter((b) => b.group === group)
          .map((b) => b.name);

      it('lists the 40 Boss Skills of the book (p. 54-67) in their 7 groups', () => {
        expect(details().bossSkills).toHaveLength(40);
        expect(details().bossGroups.map((g) => g.name)).toEqual([
          'Campo de batalha',
          'Controle',
          'Destrutivos',
          'Elementais',
          'Objetivo',
          'Invocação',
          'Sobrevivência',
        ]);
        expect(inGroup('battlefield')).toEqual([
          'Aura de Sofrimento',
          'Vida e Morte',
          'Perto e Longe',
          'Zumbificação',
        ]);
        expect(inGroup('control')).toEqual([
          'Contra-ataque Automático',
          'Condição na Crise',
          'Marca da Dor Compartilhada',
          'Observar e Punir',
          'Decreto do Tirano',
          'Você Acabou de Provar Meu Ponto',
        ]);
        expect(inGroup('destructive')).toEqual([
          'Carregador de Catástrofe',
          'Condição Corrosiva',
          'Formação Destrutiva',
          'Devastação',
          'Condenação',
          'Aposta Infernal',
          'Nihilo',
        ]);
        expect(inGroup('elemental')).toEqual([
          'Elementos Binários',
          'Crise Elemental',
          'Postura Elemental',
        ]);
        expect(inGroup('objective')).toEqual([
          'Desgaste',
          'Contagem Regressiva',
          'Reviravolta Cruel',
          'Vantagem Esmagadora',
          'Eu Conheço Vocês',
          'Influência Ruinosa',
        ]);
        expect(inGroup('summoner')).toEqual([
          'Chamar Reforços',
          'Contra-invocação',
          'Reforços de Emergência',
          'Regeneração de Partes',
          'Coordenação Perfeita',
        ]);
        expect(inGroup('survival')).toEqual([
          'Afinidades Adaptativas',
          'Camuflagem',
          'Pegue-me se Puder',
          'Postura Defensiva',
          'Regeneração',
          'Segundo Fôlego',
          'Defesas Temporárias',
          'Desfazer',
          'Formação Vampírica',
        ]);
      });

      it('keeps the choices the book asks for', () => {
        const by = (name: string) =>
          details().bossSkills.find((b) => b.name === name);
        // "Choose two to five stances", then one change trigger.
        expect(
          by('Postura Elemental')?.slots?.map((s) => [
            s.id,
            s.count,
            s.min,
            s.options.length,
          ]),
        ).toEqual([
          ['stances', 5, 2, 7],
          ['trigger', 1, undefined, 4],
          ['twist', 1, undefined, 5],
        ]);
        // "Choose one, two, or three" forbidden actions.
        expect(by('Decreto do Tirano')?.slots?.[0]).toMatchObject({
          count: 3,
          min: 1,
        });
        expect(by('Decreto do Tirano')?.slots?.[0].options).toHaveLength(7);
        // "Choose one or both: Hit Points, Mind Points".
        expect(by('Regeneração')?.slots?.[0]).toMatchObject({
          count: 2,
          min: 1,
        });
        expect(by('Defesas Temporárias')?.slots?.[0].options).toHaveLength(2);
      });

      it('makes Devastação teach the spell, for level 30 and up', () => {
        const spell = details().bossSkills.find((b) => b.name === 'Devastação');
        expect(spell?.spells?.from).toEqual([
          expect.objectContaining({ id: 'devastation', minLevel: 30 }),
        ]);
      });

      it('lists them by group in the page of the process Rule, naming the choices', () => {
        expect(process?.body).toContain('## Poderes de chefe');
        expect(process?.body).toContain('### Campo de batalha');
        expect(process?.body).toContain('**Aura de Sofrimento**');
        expect(process?.body).toContain('**Postura Elemental**');
        expect(process?.body).toContain('(escolha: condição)');
        expect(process?.body).not.toMatch(/\{\w+\}/);
      });

      const withBoss = (
        change: (b: Boss, d: { bossGroups: Group[] }) => void,
      ) => {
        const rule = structuredClone(process) as SeedEntry & {
          details: { bossSkills: Boss[]; bossGroups: Group[] };
        };
        rule.body = '';
        change(rule.details.bossSkills[0], rule.details);
        return validateSeed([npcAlone(), rule]);
      };

      it('rejects a Boss Skill of a group that does not exist', () => {
        const errors = withBoss((b) => {
          b.group = 'fantasma';
        });
        expect(errors).toEqual([expect.stringContaining('"fantasma"')]);
      });

      it('rejects a Boss Skill text that names a choice it does not offer', () => {
        const errors = withBoss((b) => {
          b.effects[0].text = 'Sofre {nada}.';
        });
        expect(errors).toEqual([expect.stringContaining('{nada}')]);
      });
    });

    describe('negative skills', () => {
      type Negative = {
        id: string;
        name: string;
        advice?: string;
        effects: { to: string; text: string }[];
        slots?: { id: string; count: number; options: unknown[] }[];
      };
      const process = seedEntries.find(
        (e) => e.type === 'rule' && e.name === 'Montagem Rápida',
      );
      const negatives = () =>
        (process?.details as unknown as { negativeSkills: Negative[] })
          .negativeSkills;

      it('lists the 8 Negative Skills of the book (p. 68-69)', () => {
        expect(negatives().map((n) => n.name)).toEqual([
          'Atraso Final',
          'Detonação Final',
          'Restauração Final',
          'Condição Final',
          'Enfraquecimento Final',
          'Pouso Forçado',
          'Erro Doloroso',
          'Amarras de Condição',
        ]);
        // Each says what it is meant for, as the book does.
        for (const negative of negatives()) {
          expect(negative.advice).toBeTruthy();
        }
      });

      it('keeps the choices of the Skills that have them', () => {
        const by = (name: string) => negatives().find((n) => n.name === name);
        expect(
          by('Detonação Final')?.slots?.map((s) => [s.id, s.options.length]),
        ).toEqual([['type', 9]]);
        expect(by('Restauração Final')?.slots?.[0].options).toHaveLength(2);
        expect(by('Condição Final')?.slots?.[0].options).toHaveLength(4);
        expect(by('Erro Doloroso')?.slots?.map((s) => s.id)).toEqual([
          'attack',
          'victim',
        ]);
        // Each of the four actions is tied to a different condition.
        expect(by('Amarras de Condição')?.slots?.map((s) => s.id)).toEqual([
          'normal',
          'strong',
          'skill',
          'spell',
        ]);
        expect(by('Pouso Forçado')?.slots).toBeUndefined();
      });

      it('lists them in the page of the process Rule', () => {
        expect(process?.body).toContain('## Poderes negativos');
        expect(process?.body).toContain('**Detonação Final**');
        expect(process?.body).toContain('quantidade grande (30/40/50)');
        expect(process?.body).not.toMatch(/\{\w+\}/);
      });

      const withNegative = (change: (n: Negative) => void) => {
        const rule = structuredClone(process) as SeedEntry & {
          details: { negativeSkills: Negative[] };
        };
        rule.body = '';
        change(rule.details.negativeSkills[0]);
        return validateSeed([npcAlone(), rule]);
      };

      it('rejects a Negative Skill text that names a choice it does not offer', () => {
        const errors = withNegative((n) => {
          n.effects[0].text = 'Sofre {nada}.';
        });
        expect(errors).toEqual([expect.stringContaining('{nada}')]);
      });

      it('rejects two Negative Skills with the same id', () => {
        const errors = (() => {
          const rule = structuredClone(process) as SeedEntry & {
            details: { negativeSkills: Negative[] };
          };
          rule.body = '';
          rule.details.negativeSkills[1].id = rule.details.negativeSkills[0].id;
          return validateSeed([npcAlone(), rule]);
        })();
        expect(errors).toEqual([expect.stringContaining('repeated')]);
      });
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
  describe('peculiarities', () => {
    const all = seedEntries.filter((e) => e.type === 'peculiarity');
    const inBookOf = (source: string) => all.filter((e) => e.source === source);
    const bySlug = (slug: string) => all.find((e) => resolveSlug(e) === slug);

    it('seeds the 46 Peculiarities of the three Atlases, each in its own book', () => {
      expect(inBookOf('high-fantasy')).toHaveLength(15);
      expect(inBookOf('natural-fantasy')).toHaveLength(15);
      expect(inBookOf('techno-fantasy')).toHaveLength(16);
      expect(all).toHaveLength(46);
    });

    it('keeps the book page of each one, inside the Peculiarities chapter', () => {
      const pages = (source: string) => inBookOf(source).map((e) => e.page);
      expect(Math.min(...(pages('high-fantasy') as number[]))).toBe(114);
      expect(Math.max(...(pages('high-fantasy') as number[]))).toBe(122);
      expect(Math.min(...(pages('natural-fantasy') as number[]))).toBe(120);
      expect(Math.max(...(pages('natural-fantasy') as number[]))).toBe(128);
      expect(Math.min(...(pages('techno-fantasy') as number[]))).toBe(120);
      expect(Math.max(...(pages('techno-fantasy') as number[]))).toBe(128);
    });

    it('gives a repeated name its own Entry, the earliest book keeping the plain slug', () => {
      expect(bySlug('robo')?.source).toBe('high-fantasy');
      expect(bySlug('robo-natural-fantasy')?.source).toBe('natural-fantasy');
      expect(bySlug('robo-techno-fantasy')?.source).toBe('techno-fantasy');
      expect(bySlug('fera-falante')?.source).toBe('natural-fantasy');
      expect(bySlug('fera-falante-techno-fantasy')?.source).toBe(
        'techno-fantasy',
      );
      expect(bySlug('voo-natural-fantasy')?.page).toBe(128);
    });

    it('points each repeated Peculiarity to its other versions', () => {
      expect(bySlug('robo')?.body).toContain('[[robo-natural-fantasy]]');
      expect(bySlug('robo')?.body).toContain('[[robo-techno-fantasy]]');
      expect(bySlug('robo-techno-fantasy')?.body).toContain('[[robo]]');
      expect(bySlug('fera-falante')?.body).toContain(
        '[[fera-falante-techno-fantasy]]',
      );
      expect(bySlug('almas-entrelacadas')?.body).not.toContain('Também em');
    });

    it('records the requirement of the three that restrict who can take them', () => {
      const required = all.filter(
        (e) => e.type === 'peculiarity' && e.details.requirement,
      );
      expect(required.map(resolveSlug).sort()).toEqual([
        'grilhoes-do-coracao',
        'oficial-arrependido',
        'oficina-itinerante',
      ]);
    });

    it('seeds the optional rule once and links the Guide to it', () => {
      const rules = seedEntries.filter(
        (e) => resolveSlug(e) === 'peculiaridades',
      );
      expect(rules).toHaveLength(1);
      expect(rules[0]).toMatchObject({
        type: 'rule',
        page: 113,
        source: 'high-fantasy',
      });
      const guide = seedEntries.find(
        (e) => e.type === 'guide' && e.name === 'Criar um personagem',
      );
      const last = guide?.type === 'guide' ? guide.details.steps.at(-1) : null;
      expect(last?.title).toBe('Descrição e nome');
      expect(last?.entries).toContain('peculiaridades');
    });

    it('rejects a requirement that is empty text', () => {
      expect(
        validateSeed([peculiarity({ ...base, requirement: '  ' })]),
      ).toEqual([expect.stringContaining('details.requirement')]);
      expect(validateSeed([peculiarity(base)])).toEqual([]);
    });

    const base = {
      name: 'Voo de Teste',
      page: 10,
      summary: 'Voa.',
      body: 'Você voa.',
    };
  });
});
