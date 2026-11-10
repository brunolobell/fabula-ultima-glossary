import { creature } from '../helpers';
import { SeedEntry } from '../types';

/** The Bestiário of the Livro Básico (p. 319-353), as printed; summaries are our own words. */
export const criaturasLivroBasico: SeedEntry[] = [
  creature({
    name: 'Cactonto',
    page: 352,
    summary:
      'Cacto imponente do deserto, mais ativo à noite: espeta de perto e de longe e drena a água das vítimas para se curar.',
    level: 15,
    species: 'plant',
    rank: 'soldier',
    villain: false,
    traits: ['assustador', 'enorme', 'sensível à água', 'territorial'],
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
    attacks: [
      {
        name: 'Abraço Perfurador',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'physical',
      },
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
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        effect:
          'Causa (RA + 15) de dano de veneno ao alvo e depois recupera PV iguais à metade dos PV que o alvo perdeu.',
      },
    ],
    otherActions: [
      {
        name: 'Seiva de Cactonto',
        effect:
          'Se recupera das condições fraco e lento e em seguida usa Barragem de Espinhos como um ataque livre.',
      },
    ],
    specialRules: [
      {
        name: 'Planta',
        effect: 'É imune às condições abalado, atordoado e enfurecido.',
      },
    ],
  }),
];
