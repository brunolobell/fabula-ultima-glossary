import { creatureSearchTerms } from './creature-search';
import { CreatureDetails } from './entry-types';

const cactonto: CreatureDetails = {
  level: 15,
  species: 'plant',
  rank: 'soldier',
  villain: false,
  traits: ['assustador', 'sensível à água'],
  attributes: { DES: 8, AST: 6, VIG: 12, VON: 6 },
  hp: 90,
  crisis: 45,
  mp: 55,
  initiative: 7,
  defense: { value: 0, fixed: false },
  magicDefense: 0,
  affinities: {},
  attacks: [
    {
      name: 'Barragem de Espinhos',
      range: 'ranged',
      accuracy: 'DES + VIG',
      accuracyBonus: 1,
      damage: 5,
      damageType: 'physical',
    },
  ],
  spells: [
    {
      name: 'Drenar Umidade',
      mpCost: '10',
      target: 'Uma criatura',
      duration: 'Instantânea',
      offensive: true,
      effect: 'Drena a água do alvo.',
    },
  ],
  otherActions: [{ name: 'Seiva de Cactonto', effect: 'Se recupera.' }],
  specialRules: [{ name: 'Planta', effect: 'Imune a abalado.' }],
};

describe('creatureSearchTerms', () => {
  it('lets a Reader find a Creature by Species, Traits and ability names', () => {
    expect(creatureSearchTerms(cactonto)).toEqual(
      expect.arrayContaining([
        'Planta',
        'soldado',
        'assustador',
        'sensível à água',
        'Barragem de Espinhos',
        'Drenar Umidade',
        'Seiva de Cactonto',
      ]),
    );
  });

  it('adds the English name of a Bestiary Vol. I Creature', () => {
    const terms = creatureSearchTerms({ ...cactonto, originalName: 'Cactoid' });
    expect(terms).toContain('Cactoid');
    expect(creatureSearchTerms(cactonto)).not.toContain(undefined);
  });

  it('marks a Villain as "vilão" and a champion as "campeão"', () => {
    const terms = creatureSearchTerms({
      ...cactonto,
      villain: true,
      rank: 'champion',
    });
    expect(terms).toEqual(expect.arrayContaining(['vilão', 'campeão']));
    expect(creatureSearchTerms(cactonto)).not.toContain('vilão');
  });
});
