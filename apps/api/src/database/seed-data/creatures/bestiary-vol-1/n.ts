import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Zombies: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1N: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Zumbis',
    page: 318,
    summary:
      'Mortos-vivos de pesadelo feitos de ciência ou magia sombria: cadáveres mancos, abominações sorridentes ou massas de membros costurados; do nível 10 ao 30.',
    body: 'Zumbis são mortos-vivos de pesadelo, produzidos pela ciência ou pela magia sombria. Podem ter a forma de cadáveres mancos, abominações de sorriso sinistro ou massas costuradas de membros pútridos. Quase universalmente desprezados junto com seus criadores, costumam ser vistos como a derradeira zombaria da vida, tornados irreconhecíveis pela decomposição e pela repetição obsessiva: o corpo de um ente querido transformado em mera matéria.\n\n## Táticas\n\n- Draugr: Assalto Estridente (se os PV atuais forem pares) ou Laceração Cruel ↺\n- Carcaça Explosiva: Pústulas Rompidas (se os PV atuais forem pares) ou Abraço Cáustico ↺\n- GogMagog: Gog e Magog são as duas metades de uma abominação morta-viva, corpos costurados e almas entrelaçadas por necromancia (se virarem Vilões, devem compartilhar o mesmo estoque de Pontos de Ultima e fugir juntos, mas não sem discutir). Rotina: Gog: Raspador de Gelo Sanguíneo ➔ Magog: Chama da Morte (se puder) ou Sussurro Profano ➔ Gog: Garra de Seringa ➔ Magog: Vento de Bolhas (se puder) ou Sussurro Profano ↺',
  }),
  creature({
    name: 'Draugr',
    page: 320,
    summary:
      'Zumbi lento, resistente e sem mente, que rasga a vítima até ela sangrar.',
    body: '**Abordagens favoráveis:** raio, fogo, luz, Resistência (físico), lento, fraco.\n\n**Abordagens desfavoráveis:** trevas, veneno, atordoado, envenenado, abalado.',
    originalName: 'Draugr',
    groupSlug: 'zumbis',
    level: 10,
    species: 'undead',
    rank: 'soldier',
    role: 'brute',
    villain: false,
    traits: ['em decomposição', 'cambaleante', 'sem mente', 'resiliente'],
    attributes: { DES: 8, AST: 6, VIG: 10, VON: 8 },
    hp: 80,
    crisis: 40,
    mp: 70,
    initiative: 7,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      bolt: 'vulnerable',
      dark: 'immune',
      fire: 'vulnerable',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Assalto Estridente',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect:
          'Enquanto o draugr estiver em crise, este ataque tem multi (2).',
      },
      {
        name: 'Laceração Cruel',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'physical',
        effect:
          'O alvo fica sangrando até o fim da cena. Quando uma criatura sangrando recupera PV, em vez disso ela recupera metade e deixa de sangrar.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, envenenado e abalado.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Carcaça Explosiva',
    page: 321,
    summary:
      'Zumbi inchado e instável, protegido por gordura, que explode em veneno ao ser derrotado.',
    body: '**Melhorias de elite:** a carcaça explosiva funciona muito bem como inimigo volumoso de patente elite, talvez junto de caçadores ou sabotadores soldados. Aumente os PV máximos para 200 e a Iniciativa para 10 e acrescente o feitiço Baba Pútrida (ofensivo; (VIG + VON) +1; 15 PM; Uma criatura; Instantânea): a carcaça causa (RA + 20) de dano de veneno ao alvo, que não pode se recuperar de condições até o fim do próximo turno dele. Criaturas que perdem 10 PV ou mais por dano de Fim Explosivo também ficam envenenadas. A rotina passa a ser: Baba Pútrida (em rodadas pares, se puder) ou Pústulas Rompidas ➔ Abraço Cáustico ↺\n\n**Abordagens favoráveis:** terra, gelo, luz, Resistência (fogo, veneno), fraco.\n\n**Abordagens desfavoráveis:** ar, trevas, fogo, veneno, enfurecido, envenenado, abalado, briga, mangual, armas pesadas.',
    originalName: 'Bursting Carcass',
    groupSlug: 'zumbis',
    level: 20,
    species: 'undead',
    rank: 'soldier',
    role: 'brute',
    villain: false,
    traits: ['inchado', 'grotesco', 'sem mente', 'instável'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 100,
    crisis: 50,
    mp: 60,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      dark: 'immune',
      earth: 'vulnerable',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Abraço Cáustico',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 2,
        damage: 15,
        damageType: 'fire',
        effect:
          'Este ataque trata a Defesa do alvo como igual ao tamanho atual do dado de Vigor dele.',
      },
      {
        name: 'Pústulas Rompidas',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'poison',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, envenenado e abalado.',
      },
      {
        name: 'Armadura Adiposa',
        effect:
          'Enquanto a carcaça não estiver em crise, ela reduz em 5 o dano causado por armas das Categorias briga, mangual e/ou pesada (antes das Afinidades).',
      },
      {
        name: 'Fim Explosivo',
        effect:
          'Quando a carcaça chega a 0 PV, ela explode e causa 10 de dano de veneno a toda outra criatura presente na cena. Se chegar a 0 PV por dano de gelo ou de luz, a carcaça não explode.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Gog',
    page: 322,
    summary:
      'Metade ágil e volumosa de GogMagog: congela e enfraquece com garras de seringa; as duas metades compartilham imunidades e PV mínimos.',
    body: '**Abordagens favoráveis:** ar, fogo, luz, Resistência (gelo), lento, fraco, imunidade (lento, fraco).\n\n**Abordagens desfavoráveis:** trevas, terra, veneno, envenenado, causar dano só a Gog.',
    originalName: 'Gog',
    groupSlug: 'zumbis',
    level: 30,
    species: 'undead',
    rank: 'elite',
    role: 'saboteur',
    flags: ['unique'],
    villain: true,
    traits: ['ágil', 'volumoso', 'costurado', 'não suporta Magog'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 200,
    crisis: 100,
    mp: 70,
    initiative: 11,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'vulnerable',
      dark: 'immune',
      earth: 'immune',
      fire: 'vulnerable',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Raspador de Gelo Sanguíneo',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 6,
        damage: 10,
        damageType: 'ice',
        effect: 'O alvo fica lento.',
      },
      {
        name: 'Garra de Seringa',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 6,
        damage: 10,
        damageType: 'dark',
        effect:
          'O alvo fica fraco. Enquanto Magog não estiver mais presente na cena, este ataque tem multi (2) e o dano dele ignora Resistências.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Corpos Unidos',
        effect:
          'Enquanto Magog não estiver em crise, os PV atuais de Gog não podem ser reduzidos abaixo de 100.',
      },
      {
        name: 'Imunidades Espelhadas',
        effect:
          'Gog é imune a todas as condições que Magog esteja sofrendo no momento (se os dois sofrerem a mesma condição ao mesmo tempo, ambos ficam imunes a ela, se recuperam dela e então deixam de ser imunes).',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
      {
        name: 'Imunidades',
        effect:
          'Imune à condição envenenado. Veja também Imunidades Espelhadas, abaixo.',
      },
    ],
  }),
  creature({
    name: 'Magog',
    page: 323,
    summary:
      'Metade arrogante e astuta de GogMagog: lança vento e fogo e recupera PM tomando como medida os de Gog.',
    body: '**Abordagens favoráveis:** terra, gelo, luz, Resistência (ar, fogo), atordoado, abalado, Defesa Mágica alta.\n\n**Abordagens desfavoráveis:** ar, trevas, veneno, envenenado, causar dano só a Magog.',
    originalName: 'Magog',
    groupSlug: 'zumbis',
    level: 30,
    species: 'undead',
    rank: 'elite',
    role: 'mage',
    flags: ['unique'],
    villain: true,
    traits: ['arrogante', 'astuto', 'costurado', 'despreza Gog'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 8 },
    hp: 200,
    crisis: 100,
    mp: 90,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'immune',
      dark: 'immune',
      earth: 'vulnerable',
      ice: 'vulnerable',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Sussurro Profano',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'dark',
        effect: 'Este ataque mira a Defesa Mágica em vez da Defesa.',
      },
    ],
    spells: [
      {
        name: 'Vento de Bolhas',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'Magog causa (RA + 20) de dano de ar a cada alvo atingido por este feitiço.',
      },
      {
        name: 'Chama da Morte',
        mpCost: '10 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'Magog causa (RA + 25) de dano de fogo a cada alvo atingido por este feitiço.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Corpos Unidos',
        effect:
          'Enquanto Gog não estiver em crise, os PV atuais de Magog não podem ser reduzidos abaixo de 100.',
      },
      {
        name: 'Ego Dominante',
        effect:
          'No início de cada turno de Magog, se Gog não estiver mais presente na cena, Magog recupera 90 PM. Caso contrário, se os PM atuais dele forem menores que os de Gog, Magog recupera PM iguais à diferença entre os dois valores.',
      },
      {
        name: 'Imunidades Espelhadas',
        effect:
          'Magog é imune a todas as condições que Gog esteja sofrendo no momento (se os dois sofrerem a mesma condição ao mesmo tempo, ambos ficam imunes a ela, se recuperam dela e então deixam de ser imunes).',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
      {
        name: 'Imunidades',
        effect:
          'Imune à condição envenenado. Veja também Imunidades Espelhadas, abaixo.',
      },
    ],
  }),
]);
