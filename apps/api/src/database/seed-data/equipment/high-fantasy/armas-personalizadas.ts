import { SeedEntry } from '../../types';
import { rareWeapon } from '../rare-helpers';

const B = 'high-fantasy' as const;

const NOTE =
  'Exemplo de arma personalizada do Atlas: as personalizações (veja [[armas-personalizadas]]) não contam como características da arma.';

export const armasPersonalizadasHighFantasy: SeedEntry[] = [
  // Correntes com Adagas (p. 109)
  rareWeapon(B, {
    name: 'Adagas Dançarinas',
    page: 109,
    cost: 400,
    category: 'adaga',
    accuracy: 'DES + VIG',
    damage: 5,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect:
      'Sem características. Personalizações da Forma I: rápida e mutável. Duas Formas, ambas marciais.',
    formII:
      'Malho, duas mãos, à distância, Precisão (DES + VIG) +2, dano (RA + 10) físico, sem características. Personalizações: certeira, mutável e poderosa. Esta Forma também é marcial: para empunhar a arma o personagem precisa poder usar armas marciais corpo a corpo e à distância.',
    body: NOTE,
  }),
  rareWeapon(B, {
    name: 'Correntes Ardentes',
    page: 109,
    cost: 1200,
    category: 'adaga',
    accuracy: 'DES + VIG',
    damage: 9,
    damageType: 'fogo',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'adagas-dancarinas',
    effect:
      'Causa 5 de dano adicional contra demônios e mortos-vivos. Personalizações da Forma I: rápida e mutável. Duas Formas, ambas marciais.',
    formII:
      'Malho, duas mãos, à distância, Precisão (DES + VIG) +2, dano (RA + 14) fogo, também causa 5 de dano adicional contra demônios e mortos-vivos. Personalizações: certeira, mutável e poderosa. Esta Forma também é marcial: a arma exige poder usar armas marciais corpo a corpo e à distância.',
  }),

  // Grimórios de Combate (p. 110)
  rareWeapon(B, {
    name: 'Grimório da Força',
    page: 110,
    cost: 300,
    category: 'arcana',
    accuracy: 'DES + AST',
    damage: 5,
    damageType: 'físico',
    hands: 2,
    range: 'ranged',
    martial: true,
    custom: true,
    effect:
      'Sem características. Personalizações: rápida e com aumento na Defesa Mágica.',
    body: NOTE,
  }),
  rareWeapon(B, {
    name: 'Grimório do Vento',
    page: 110,
    cost: 1200,
    category: 'arcana',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 9,
    damageType: 'ar',
    hands: 2,
    range: 'ranged',
    martial: true,
    evolutionOf: 'grimorio-da-forca',
    effect:
      'Concede imunidade à condição lento (veja [[condicoes]]). Personalizações: rápida e com aumento na Defesa Mágica.',
  }),

  // Luvas do Trovão (p. 110)
  rareWeapon(B, {
    name: 'Luvas do Trovão',
    page: 110,
    cost: 400,
    category: 'luta',
    accuracy: 'DES + VIG',
    damage: 5,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect:
      'Sem características. Personalizações da Forma I: rápida e mutável. Duas Formas, ambas marciais.',
    formII:
      'Arma de fogo, duas mãos, corpo a corpo, Precisão (DES + VIG) +2, dano (RA + 10) físico, sem características. Personalizações: certeira, mutável e poderosa. Esta Forma também é marcial.',
    body: NOTE,
  }),
  rareWeapon(B, {
    name: 'Terremoto',
    page: 111,
    cost: 2000,
    category: 'luta',
    accuracy: 'DES + VIG',
    damage: 5,
    damageType: 'terra',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'luvas-do-trovao',
    effect:
      'Criaturas atingidas ficam atordoadas. Personalizações da Forma I: mutável e rápida. Duas Formas, ambas marciais.',
    formII:
      'Arma de fogo, duas mãos, corpo a corpo, Precisão (DES + VIG) +2, dano (RA + 10) terra, e as criaturas atingidas também ficam atordoadas. Personalizações: certeira, mutável e poderosa. Esta Forma também é marcial.',
  }),

  // Meta-Lanças (p. 111)
  rareWeapon(B, {
    name: 'Machado Hoplita',
    page: 111,
    cost: 400,
    category: 'lanca',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 5,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect:
      'Sem características. Personalizações da Forma I: certeira, mutável e com aumento na Defesa. A Forma I não é marcial, mas a Forma II é, então a arma como um todo é marcial.',
    formII:
      'Pesada, duas mãos, corpo a corpo, Precisão (DES + VIG), dano (RA + 14) raio, sem características. Personalizações: elemental (raio), mutável e poderosa. Esta Forma é marcial.',
    body: NOTE,
  }),
  rareWeapon(B, {
    name: 'Coluna Dracônica',
    page: 111,
    cost: 1600,
    category: 'lanca',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 9,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'machado-hoplita',
    effect:
      'Quem a empunha tem Resistência a fogo e gelo. Personalizações da Forma I: certeira, mutável e com aumento na Defesa. A Forma I não é marcial, mas a Forma II é, então a arma como um todo é marcial.',
    formII:
      'Pesada, duas mãos, corpo a corpo, Precisão (DES + VIG), dano (RA + 18) raio, e quem a empunha também tem Resistência a fogo e gelo. Personalizações: elemental (raio), mutável e poderosa. Esta Forma é marcial.',
  }),

  // Montantes do Protetor (p. 112)
  rareWeapon(B, {
    name: 'Claymore Guardiã',
    page: 112,
    cost: 300,
    category: 'espada',
    accuracy: 'DES + VIG',
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    custom: true,
    effect:
      'Sem características. Personalizações: poderosa, com aumento na Defesa e com aumento na Defesa Mágica.',
    body: NOTE,
  }),
  rareWeapon(B, {
    name: 'Sentinela da Rainha',
    page: 112,
    cost: 2700,
    category: 'espada',
    accuracy: 'DES + VIG',
    accuracyBonus: 1,
    damage: 14,
    damageType: 'luz',
    hands: 2,
    range: 'melee',
    martial: true,
    evolutionOf: 'claymore-guardia',
    effect:
      'Confere um bônus adicional de +1 em Defesa e Defesa Mágica. Com as personalizações (poderosa, aumento na Defesa e aumento na Defesa Mágica), o bônus total fica em +3 na Defesa e +3 na Def. Mágica.',
  }),

  // Shuriken de Duas Mãos (p. 112-113)
  rareWeapon(B, {
    name: 'Shuriken Gigante',
    page: 112,
    cost: 300,
    category: 'arremessavel',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'ranged',
    martial: true,
    custom: true,
    effect:
      'Sem características. Personalizações: certeira, poderosa e com aumento na Defesa.',
    body: NOTE,
  }),
  rareWeapon(B, {
    name: 'Presença Sutil',
    page: 113,
    cost: 1600,
    category: 'arremessavel',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 14,
    damageType: 'gelo',
    hands: 2,
    range: 'ranged',
    martial: true,
    evolutionOf: 'shuriken-gigante',
    effect:
      'Ataques feitos com ela têm a propriedade multi (2). Personalizações: certeira, poderosa e com aumento na Defesa.',
  }),

  // Vingadoras (p. 113)
  rareWeapon(B, {
    name: 'Memória Sombria',
    page: 113,
    cost: 300,
    category: 'arco',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'ranged',
    martial: true,
    custom: true,
    effect:
      'Sem características. Personalizações: certeira, poderosa e com aumento na Defesa Mágica.',
    body: NOTE,
  }),
  rareWeapon(B, {
    name: 'Destruidora de Anjos',
    page: 113,
    cost: 1600,
    category: 'arco',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 14,
    damageType: 'trevas',
    hands: 2,
    range: 'ranged',
    martial: true,
    evolutionOf: 'memoria-sombria',
    effect:
      'Ao atingir um alvo em voo, é possível forçá-lo a pousar na hora. Personalizações: certeira, poderosa e com aumento na Defesa Mágica.',
  }),
];
