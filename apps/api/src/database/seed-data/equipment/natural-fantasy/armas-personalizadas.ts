import { SeedEntry } from '../../types';
import { rareWeapon } from '../rare-helpers';

const NF = 'natural-fantasy' as const;

/**
 * "Armas personalizadas Natural Fantasy" (Atlas Natural Fantasy, p. 115-119): seven
 * families, each with a basic Custom Weapon example and a possible Rare Evolution.
 * Every weapon is two-handed. Two-Form (mutável) weapons keep Form I in the stat line
 * and Form II in `formII`; they are martial if either Form is.
 */
export const armasPersonalizadasNaturalFantasy: SeedEntry[] = [
  // Arbaletas pesadas (p. 115)
  rareWeapon(NF, {
    name: 'Gastrafeta',
    page: 115,
    cost: 300,
    custom: true,
    category: 'arco',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'ranged',
    martial: true,
    effect:
      'Sem característica própria. Qualidades: certeira, poderosa e aumento na Defesa.',
  }),
  rareWeapon(NF, {
    name: 'Helépole',
    page: 115,
    cost: 1600,
    evolutionOf: 'gastrafeta',
    category: 'arco',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 14,
    damageType: 'fogo',
    hands: 2,
    range: 'ranged',
    martial: true,
    effect:
      'Causa 5 pontos de dano adicional em criaturas lentas. Qualidades: certeira, poderosa e aumento na Defesa.',
    body: 'O dano adicional vale contra criaturas com a condição **lento** (veja [[condicoes]]).',
  }),

  // Britadeiras (p. 116)
  rareWeapon(NF, {
    name: 'Martelete',
    page: 116,
    cost: 300,
    custom: true,
    category: 'lanca',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Sem característica própria. Qualidades: certeira, poderosa e aumento na Defesa.',
  }),
  rareWeapon(NF, {
    name: 'Autodestruidor',
    page: 116,
    cost: 1400,
    evolutionOf: 'martelete',
    category: 'lanca',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 14,
    damageType: 'terra',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Ao reduzir um inimigo a 0 PV com esta arma, você recebe um material escolhido pelo mestre, de valor até 100 zênites × seu nível de inventor. Qualidades: certeira, poderosa e aumento na Defesa.',
  }),

  // Chaves de corda (p. 116-117)
  rareWeapon(NF, {
    name: 'Chave de Latão',
    page: 116,
    cost: 300,
    custom: true,
    category: 'arcana',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 7,
    damageType: 'raio',
    hands: 2,
    range: 'ranged',
    effect:
      'Sem característica própria. Qualidades: certeira, elemental (raio) e aumento na Defesa.',
  }),
  rareWeapon(NF, {
    name: 'Chave Oxidada',
    page: 117,
    cost: 800,
    evolutionOf: 'chave-de-latao',
    category: 'arcana',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 7,
    damageType: 'raio',
    hands: 2,
    range: 'ranged',
    effect:
      'Todo o dano dos seus feitiços passa a ser de ar (esse tipo não pode ser mudado). Quando um aliado na cena faz a ação Guarda, você pode trocar esta chave de corda por outra da mochila. Qualidades: certeira, elemental (raio) e aumento na Defesa.',
    body: 'A troca de chave acontece quando um aliado presente na cena usa [[guarda-acao]].',
  }),

  // Dispara-chuvas (p. 117)
  rareWeapon(NF, {
    name: 'Eyre',
    page: 117,
    cost: 400,
    custom: true,
    category: 'adaga',
    accuracy: 'DES + AST',
    damage: 5,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Arma mutável com duas Formas (veja a Forma II). Sem característica própria. Qualidades da Forma I: mutável, aumento na Defesa e aumento na Defesa Mágica.',
    formII:
      'Arma de Fogo, duas mãos, à distância, marcial. Precisão (DES + AST) +2, dano (RA + 10) físico. Sem característica própria. Qualidades: certeira, mutável e poderosa.',
  }),
  rareWeapon(NF, {
    name: 'Earnshaw',
    page: 117,
    cost: 1000,
    evolutionOf: 'eyre',
    category: 'adaga',
    accuracy: 'DES + AST',
    damage: 9,
    damageType: 'trevas',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Arma mutável com duas Formas (veja a Forma II). Enquanto um aliado com quem você tem um Laço de afeição está na cena, todo dano causado por esta arma ignora Imunidades e Resistências. Qualidades da Forma I: mutável, aumento na Defesa e aumento na Defesa Mágica.',
    body: 'O efeito depende de um [[lacos]] de afeição com um aliado presente na cena e vale nas duas Formas.',
    formII:
      'Arma de Fogo, duas mãos, à distância, marcial. Precisão (DES + AST) +2, dano (RA + 14) trevas. Mesmo efeito da Forma I (ignora Imunidades e Resistências com o aliado do Laço de afeição na cena). Qualidades: certeira, mutável e poderosa.',
  }),

  // Tesouras florais (p. 118)
  rareWeapon(NF, {
    name: 'Rosenschwert',
    page: 118,
    cost: 300,
    custom: true,
    category: 'espada',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Sem característica própria. Qualidades: certeira, poderosa e aumento na Defesa Mágica.',
  }),
  rareWeapon(NF, {
    name: 'Tesouras Crescentes',
    page: 118,
    cost: 1000,
    evolutionOf: 'rosenschwert',
    category: 'espada',
    accuracy: 'DES + AST',
    accuracyBonus: 2,
    damage: 10,
    damageType: 'luz',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Ao usar Enxerto, você pode apagar 1 seção do seu relógio de germinação. Qualidades: certeira, poderosa e aumento na Defesa Mágica.',
    body: 'A seção apagada é do relógio de germinação do Floralista; o efeito vale ao usar [[enxerto]].',
  }),

  // Pás dos catadores de cristal (p. 118)
  rareWeapon(NF, {
    name: 'Picareta',
    page: 118,
    cost: 300,
    custom: true,
    category: 'pesada',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 12,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Sem característica própria. Qualidades: certeira, poderosa e aumento na Defesa.',
  }),
  rareWeapon(NF, {
    name: 'Pá do Prospector',
    page: 118,
    cost: 1300,
    evolutionOf: 'picareta',
    category: 'pesada',
    accuracy: 'DES + VIG',
    accuracyBonus: 2,
    damage: 16,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Você tem Resistência a dano de terra. Além disso, ao sofrer dano de terra, você recebe 50 zênites e recupera 1 PI. Qualidades: certeira, poderosa e aumento na Defesa.',
    body: 'Os PI são os Pontos de Inventário (veja [[pontos-de-inventario]]). Na linha de estatísticas o livro imprime o nome "Vanguard Spade"; o título da arma é "Pá do Prospector".',
  }),

  // Sinos-meteoro (p. 119)
  rareWeapon(NF, {
    name: 'Chocalhos de Cobre',
    page: 119,
    cost: 400,
    custom: true,
    category: 'luta',
    accuracy: 'DES + VIG',
    damage: 5,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Arma mutável com duas Formas (veja a Forma II). Sem característica própria. Qualidades da Forma I: mutável e rápida.',
    formII:
      'Malho, duas mãos, corpo a corpo, marcial. Precisão (DES + VIG), dano (RA + 12) gelo. Sem característica própria. Qualidades: elemental (gelo), mutável e poderosa.',
  }),
  rareWeapon(NF, {
    name: "Sino d'Água",
    page: 119,
    cost: 1500,
    evolutionOf: 'chocalhos-de-cobre',
    category: 'luta',
    accuracy: 'DES + VIG',
    damage: 9,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Arma mutável com duas Formas (veja a Forma II). Depois de resolver uma de suas invocações de água, você pode fazer um ataque livre com esta arma, com RA considerada 0 no cálculo do dano. Qualidades da Forma I: mutável e rápida.',
    body: 'O ataque livre vem depois de resolver uma [[invocacao]] de água e vale nas duas Formas.',
    formII:
      'Malho, duas mãos, corpo a corpo, marcial. Precisão (DES + VIG), dano (RA + 16) gelo. Mesmo efeito da Forma I (ataque livre após uma invocação de água, RA 0 no dano). Qualidades: elemental (gelo), mutável e poderosa.',
  }),
];
