import { statsFromCreatureDetails } from './creature-stats.mapper';
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
});
