import { creature } from '../../helpers';
import { SeedEntry } from '../../types';

/** Plantas of the Bestiário of the Livro Básico (p. 350-353), as printed; summaries and effects are our own words. */
export const criaturasLivroBasicoPlant: SeedEntry[] = [
  creature({
    name: 'Alraune',
    page: 350,
    summary:
      'Planta minúscula e maldosa, conhecida por trazer azar a quem a encontra; seu grito deixa o alvo abalado.',
    level: 5,
    species: 'plant',
    rank: 'soldier',
    villain: false,
    traits: ['malévola', 'minúscula', 'rápida', 'sinistra'],
    attributes: { DES: 10, AST: 8, VIG: 6, VON: 8 },
    hp: 50,
    crisis: 25,
    mp: 45,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      earth: 'resistant',
      ice: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Tapa de Videira',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 0,
        damage: 5,
        damageType: 'physical',
        effect: 'Causa 5 de dano adicional em alvos abalados.',
      },
      {
        name: 'Grito de Alraune',
        range: 'ranged',
        accuracy: 'VON + VON',
        accuracyBonus: 0,
        damage: null,
        damageType: null,
        effect:
          'Não causa dano e o alvo fica abalado. Atinge a Defesa Mágica e não tem efeito em alvos que não consigam escutar a alraune.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Planta',
        effect: 'Imune às condições abalado, atordoado e enfurecido.',
      },
    ],
  }),
  creature({
    name: 'Mabóbora',
    page: 350,
    summary:
      'Restos raivosos de abóboras esculpidas, descartados no fim de um festival de outono antigo, que protagonizam histórias de terror.',
    level: 5,
    species: 'plant',
    rank: 'soldier',
    villain: false,
    traits: ['apodrecida', 'furiosa', 'malcheirosa', 'pequena'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 50,
    crisis: 25,
    mp: 55,
    initiative: 8,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'vulnerable',
      dark: 'resistant',
      earth: 'vulnerable',
      fire: 'resistant',
    },
    attacks: [
      {
        name: 'Mordida Podre',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'poison',
      },
    ],
    spells: [
      {
        name: 'Vômito de Abóbora',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Cena',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 0,
        effect:
          'Enquanto durar, toda fonte de dano de veneno causa 5 de dano adicional ao alvo.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Planta',
        effect: 'Imune às condições abalado, atordoado e enfurecido.',
      },
    ],
  }),
  creature({
    name: 'Cogumeiro',
    page: 351,
    summary:
      'Criatura baixa, pesada e pacífica dos pântanos, que só fica agressiva se eles forem contaminados; lança esporos e protege aliados.',
    level: 10,
    species: 'plant',
    rank: 'soldier',
    villain: false,
    traits: ['ama a lama', 'lenta', 'pacífica', 'sem olhos'],
    attributes: { DES: 6, AST: 8, VIG: 10, VON: 8 },
    hp: 70,
    crisis: 35,
    mp: 60,
    initiative: 7,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: { dark: 'resistant', earth: 'resistant', ice: 'vulnerable' },
    attacks: [
      {
        name: 'Tapa de Cogumelo',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
      },
    ],
    spells: [
      {
        name: 'Arroto de Esporos',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        effect:
          'Causa (RA + 15) de dano de veneno ao alvo e o deixa atordoado.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Chapéu Largo',
        effect:
          'Ao fazer a ação Guarda, pode escolher outra criatura para receber Resistência a todos os tipos de dano até o início do próximo turno do cogumeiro.',
      },
      {
        name: 'Planta',
        effect: 'Imune às condições abalado, atordoado e enfurecido.',
      },
    ],
  }),
  creature({
    name: 'Vinha-daninha',
    page: 351,
    summary:
      'Emaranhado de vinhas com uma bocarra sem fundo sobre um núcleo espinhoso, talvez fruto de um experimento falho.',
    level: 10,
    species: 'plant',
    rank: 'soldier',
    villain: false,
    traits: ['agressiva', 'amaldiçoada', 'espinhosa', 'veloz'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 60,
    crisis: 30,
    mp: 40,
    initiative: 9,
    defense: { value: 12, fixed: true },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      dark: 'immune',
      earth: 'resistant',
      fire: 'vulnerable',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Mordida Sombria',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'dark',
      },
      {
        name: 'Vinhas Corruptivas',
        range: 'melee',
        accuracy: 'DES + DES',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect:
          'O alvo fica fraco e, enquanto estiver fraco por este efeito, não pode fazer a ação Guarda.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Planta',
        effect: 'Imune às condições abalado, atordoado e enfurecido.',
      },
    ],
  }),
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
        effect: 'Imune às condições abalado, atordoado e enfurecido.',
      },
    ],
  }),
  creature({
    name: 'Dracoardil',
    page: 353,
    summary:
      'Planta colossal enraizada, de bocarras grandes o bastante para engolir um dragão adulto, mas usadas para capturar e digerir animais e humanoides.',
    level: 20,
    species: 'plant',
    rank: 'soldier',
    villain: false,
    traits: ['colossal', 'enraizada', 'faminta', 'paciente'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 90,
    crisis: 45,
    mp: 60,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      earth: 'vulnerable',
      fire: 'resistant',
      light: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Devorador de Dragões',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'physical',
        effect:
          'Se um alvo atingido estiver fraco, é engolido pelo dracoardil. A criatura engolida sofre 20 de dano físico no início de cada turno do dracoardil e só pode fazer a ação Objetivo, com a intenção de se libertar. Libertá-la exige um relógio de quatro seções. Um dracoardil soldado só pode ter uma criatura de tamanho humano engolida por vez; um campeão que substitua três ou mais soldados pode ter até duas. Com todas as bocas ocupadas, deve soltar uma criatura antes de engolir outra.',
      },
      {
        name: 'Vinha-chicote',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'air',
        effect: 'O alvo fica fraco.',
      },
    ],
    spells: [
      {
        name: 'Gás Entorpecente',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect: 'Cada alvo perde metade dos PM atuais.',
      },
      {
        name: 'Pré-digestão',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Cena',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect:
          'Enquanto durar, toda fonte de dano físico causa 5 de dano adicional ao alvo.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Regurgitar',
        effect:
          'Quando o dracoardil perde PV, preenche 1 seção de cada relógio criado para libertar as criaturas engolidas.',
      },
      {
        name: 'Planta',
        effect: 'Imune às condições abalado, atordoado e enfurecido.',
      },
    ],
  }),
];
