import {
  creatureDetailsFromStats,
  creatureSummaryFromStats,
  statsFromCreatureDetails,
} from './creature-stats.mapper';
import { CreatureStats } from './entities/creature-stats.entity';
import { CreatureDetails } from './entry-types';

const details: CreatureDetails = {
  level: 15,
  species: 'plant',
  rank: 'soldier',
  villain: false,
  traits: ['assustador'],
  attributes: { DES: 8, AST: 6, VIG: 12, VON: 6 },
  hp: 90,
  crisis: 45,
  mp: 55,
  initiative: 7,
  defense: { value: 0, fixed: false },
  magicDefense: 0,
  affinities: { ice: 'vulnerable' },
  attacks: [],
  spells: [
    {
      name: 'Drenar Umidade',
      mpCost: '10',
      target: 'Uma criatura',
      duration: 'Instantânea',
      offensive: true,
      effect: 'x',
    },
  ],
  otherActions: [],
  specialRules: [],
};

describe('statsFromCreatureDetails', () => {
  it('spreads the stat block over the columns of creature_stats', () => {
    expect(statsFromCreatureDetails(details)).toEqual({
      level: 15,
      species: 'plant',
      rank: 'soldier',
      role: null,
      villain: false,
      originalName: null,
      groupSlug: null,
      groupOrder: null,
      championX: null,
      flags: [],
      traits: ['assustador'],
      des: 8,
      ast: 6,
      vig: 12,
      von: 6,
      hp: 90,
      crisis: 45,
      mp: 55,
      initiative: 7,
      defense: 0,
      defenseFixed: false,
      magicDefense: 0,
      hasSpells: true,
      affinities: { ice: 'vulnerable' },
      attacks: [],
      spells: details.spells,
      otherActions: [],
      specialRules: [],
    });
  });

  it('keeps the Role and the English name of a Bestiary Vol. I Creature', () => {
    const row = statsFromCreatureDetails({
      ...details,
      role: 'brute',
      originalName: 'Cactoid',
      spells: [],
    });
    expect(row).toMatchObject({
      role: 'brute',
      originalName: 'Cactoid',
      hasSpells: false,
    });
  });

  it('keeps the Creature Group and the place in it', () => {
    const row = statsFromCreatureDetails(
      { ...details, groupSlug: 'fantasmas' },
      2,
    );
    expect(row).toMatchObject({ groupSlug: 'fantasmas', groupOrder: 2 });
  });
});

describe('Bestiary Vol. I extras', () => {
  it('keeps how many soldiers a champion replaces and the Solo, Unique and Part marks', () => {
    const row = statsFromCreatureDetails({
      ...details,
      rank: 'champion',
      championX: 4,
      flags: ['solo', 'unique'],
    });
    expect(row).toMatchObject({
      championX: 4,
      flags: ['solo', 'unique'],
    });
  });

  it('serves them in the list and in the entry, and leaves them out when there are none', () => {
    const base = {
      ...statsFromCreatureDetails(details),
      entryId: 'e1',
    } as CreatureStats;
    expect(creatureSummaryFromStats(base)).not.toHaveProperty('championX');
    expect(creatureSummaryFromStats(base)).not.toHaveProperty('flags');
    const marked = { ...base, championX: 3, flags: ['part'] } as CreatureStats;
    expect(creatureSummaryFromStats(marked)).toMatchObject({
      championX: 3,
      flags: ['part'],
    });
    expect(creatureDetailsFromStats(marked)).toMatchObject({
      championX: 3,
      flags: ['part'],
    });
  });
});

describe('creature summaries and details', () => {
  const row = {
    ...statsFromCreatureDetails({ ...details, groupSlug: 'fantasmas' }, 1),
    entryId: 'e1',
  } as CreatureStats;

  it('tells the Group of a member in the list and in the entry', () => {
    expect(creatureSummaryFromStats(row)).toMatchObject({
      groupSlug: 'fantasmas',
    });
    expect(creatureDetailsFromStats(row)).toMatchObject({
      groupSlug: 'fantasmas',
    });
  });

  it('leaves groupSlug out for a Creature with no Group', () => {
    const alone = {
      ...row,
      groupSlug: null,
      groupOrder: null,
    } as CreatureStats;
    expect(creatureSummaryFromStats(alone)).not.toHaveProperty('groupSlug');
  });
});
