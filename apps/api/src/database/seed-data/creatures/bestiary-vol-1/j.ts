import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Skeletons a Turrets: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1J: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Esqueletos',
    page: 266,
    summary:
      'Tropas, guardiões e abominações de osso que existem fora do ciclo de vida e morte; incluem a ossada trôpega, o guardião da necrópole e o gigante Gashadokuro.',
    body: 'Sejam tropas implacáveis do exército de um rei morto-vivo, abominações ressecadas que sobem de fendas glaciais ou guardiões soturnos de eras passadas, os esqueletos existem fora do ciclo natural de vida e morte. Alguns são criados por necromancia sombria; outros são animados pela dor e pela raiva persistentes de almas atormentadas. Em geral sem inteligência além de instinto cruel e obediência total, são frios e eficientes: máquinas ruidosas e sinistras feitas de osso em vez de aço.\n\n## Táticas\n\n- Ossada Trôpega: Arremesso de Osso (se estiver em crise) ou Mordida Necrótica ↺\n- Guardião da Necrópole: Espada Desafiadora (se estiver em crise) ou Escudo do Repouso Quieto ➔ Selo de Purificação (se puder e um ou mais inimigos estiverem sob feitiços benéficos e/ou símbolos) ou Sussurros do Gelo Mortal ↺\n- Gashadokuro (cabeça e dois braços; o braço com menos PV atuais age primeiro a cada rodada, e em empate decide-se aleatoriamente): Cabeça: Miasma Ressentido (se puder) ou Dentes Matraqueantes ➔ Braço: Incontáveis Lâminas de Exércitos Caídos ➔ Braço: Aperto do Gigante (se ao menos um inimigo não estiver agarrado) ou Garra Enferrujada ➔ Cabeça: Devorar Ressentimento (se puder e ao menos um inimigo estiver agarrado) ou Miríade de Ossos (se puder) ou Dentes Matraqueantes ↺',
  }),
  creature({
    name: 'Ossada Trôpega',
    page: 268,
    summary:
      'Esqueleto sanguinário e improvisado, que remenda os próprios ossos com os de outros mortos-vivos caídos.',
    body: '**Abordagens favoráveis:** físico, ar, luz, Resistência (físico, trevas), enfurecido, lento.\n\n**Abordagens desfavoráveis:** raio, trevas, gelo, veneno, envenenado.',
    originalName: 'Shamblebones',
    groupSlug: 'esqueletos',
    level: 10,
    species: 'undead',
    rank: 'soldier',
    role: 'saboteur',
    villain: false,
    traits: ['sanguinário', 'estrepitoso', 'instintivo', 'improvisado'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 60,
    crisis: 30,
    mp: 50,
    initiative: 8,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'vulnerable',
      air: 'vulnerable',
      bolt: 'resistant',
      dark: 'immune',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Mordida Necrótica',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'dark',
        effect: 'Inimigos que perdem PV por este dano também perdem 10 PM.',
      },
      {
        name: 'Arremesso de Osso',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Remendo de Ossos',
        effect:
          'Depois que outro morto-vivo presente na cena chega a 0 PV e se rende, a ossada trôpega recupera 20 PV.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Guardião da Necrópole',
    page: 269,
    summary:
      'Esqueleto antigo preso ao lugar que guarda, que silencia os feitiços inimigos e impede os vivos de se recuperarem do medo.',
    body: '**Abordagens favoráveis:** raio, fogo, luz, Resistência (físico, trevas, gelo), condições, imunidade (fraco).\n\n**Abordagens desfavoráveis:** físico, trevas, gelo, veneno, envenenado, feitiços de duração Cena, símbolos, versos.',
    originalName: 'Necropolis Guardian',
    groupSlug: 'esqueletos',
    level: 20,
    species: 'undead',
    rank: 'elite',
    role: 'sentinel',
    villain: false,
    traits: ['ancestral', 'preso ao local', 'imponente', 'silencioso'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 180,
    crisis: 90,
    mp: 70,
    initiative: 10,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      physical: 'resistant',
      bolt: 'vulnerable',
      dark: 'immune',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Espada Desafiadora',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 15,
        damageType: 'physical',
      },
      {
        name: 'Escudo do Repouso Quieto',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect: 'O alvo fica fraco.',
      },
      {
        name: 'Sussurros do Gelo Mortal',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'ice',
        effect:
          'Este ataque trata a Defesa do alvo como igual ao tamanho atual do dado de Vontade dele.',
      },
    ],
    spells: [
      {
        name: 'Selo de Purificação',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'O guardião causa (RA + 10) de dano de trevas ao alvo. Criaturas que perdem PV assim e estão fracas deixam de ser afetadas por todos os feitiços de duração Cena que as afetavam, e todos os símbolos presentes nelas também são destruídos.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Selo do Silêncio',
        effect:
          'Enquanto o guardião estiver presente na cena e não estiver em crise, inimigos que ele veja não podem lançar feitiços ofensivos (O) nem cantar versos, a menos que esses feitiços ou versos tenham o guardião como único alvo.',
      },
      {
        name: 'Repelir os Vivos',
        effect:
          'Enquanto o guardião estiver presente na cena, criaturas que não sejam mortos-vivos não podem se recuperar de abalado. Também perdem a imunidade a abalado e não podem ganhá-la.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Gashadokuro: Cabeça',
    page: 271,
    summary:
      'Cabeça do gigante esquelético Gashadokuro: dispara miasma ressentido, devora o ressentimento dos agarrados e mantém a criatura de pé gastando Pontos de Ultima.',
    body: '**Abordagens favoráveis:** físico, terra, gelo, Resistência (físico, trevas, fogo), condições, imunidade (enfurecido), perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** trevas, fogo, veneno, envenenado, focar na cabeça e ignorar os braços.',
    originalName: 'Gashadokuro (Head)',
    groupSlug: 'esqueletos',
    level: 30,
    species: 'undead',
    rank: 'champion',
    championX: 2,
    role: 'mage',
    villain: false,
    traits: ['colossal', 'corruptor', 'voraz', 'vingativo'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 180,
    crisis: 90,
    mp: 200,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'vulnerable',
      dark: 'immune',
      earth: 'vulnerable',
      fire: 'immune',
      ice: 'vulnerable',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Dentes Matraqueantes',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'dark',
        effect: 'Este ataque mira a Defesa Mágica em vez da Defesa.',
      },
    ],
    spells: [
      {
        name: 'Miasma Ressentido',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'A cabeça causa (RA + 15) de dano de fogo a cada alvo atingido por este feitiço. Criaturas que perdem PV por esse dano também ficam enfurecidas.',
      },
      {
        name: 'Miríade de Ossos',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'A cabeça causa 30 de dano físico a todo inimigo que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Devorar Ressentimento',
        effect:
          'A cabeça pode usar uma ação para escolher um inimigo aleatório agarrado por um braço. Se fizer isso, esse inimigo perde 40 PV e deixa de estar agarrado. Se um inimigo chegar a 0 PV por essa perda, em vez disso fica de pé com exatamente 1 PV e o Gashadokuro recupera 1 Ponto de Ultima. Se isso levar os Pontos de Ultima atuais do Gashadokuro a 6 ou mais, em vez disso a cabeça e os braços se recuperam de todas as condições.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Escuridão Devoradora',
        effect:
          'Enquanto o Gashadokuro tiver 1 ou mais Pontos de Ultima, os PV atuais da cabeça não podem ser reduzidos abaixo de 1 e todas as fontes que causam dano de luz não causam dano.',
      },
      {
        name: 'Malícia Resistente',
        effect:
          'Quando um braço chega a 0 PV, o Gashadokuro deve gastar 1 Ponto de Ultima. Se gastar, o braço fica de pé com exatamente 1 PV. Se o Gashadokuro não tiver mais Pontos de Ultima, o braço é simplesmente destruído (se os dois braços chegarem a 0 PV ao mesmo tempo, resolva este efeito separadamente para cada um).',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Gashadokuro: Braço',
    page: 270,
    summary:
      'Braço colossal do gigante esquelético Gashadokuro: agarra inimigos e é imune a dano físico enquanto não está em crise.',
    body: '**Abordagens favoráveis:** ar, raio, luz, Resistência (físico, trevas), lento, fraco, causar dano a vários alvos.\n\n**Abordagens desfavoráveis:** físico, trevas, gelo, veneno, atordoado, enfurecido, envenenado, abalado.',
    originalName: 'Gashadokuro (Arm)',
    groupSlug: 'esqueletos',
    level: 30,
    species: 'undead',
    rank: 'soldier',
    role: 'brute',
    flags: ['part'],
    villain: false,
    traits: ['blindado', 'colossal', 'sem mente', 'poderoso'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 120,
    crisis: 60,
    mp: 70,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'vulnerable',
      bolt: 'vulnerable',
      dark: 'immune',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Incontáveis Lâminas de Exércitos Caídos',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Aperto do Gigante',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'dark',
        effect:
          'O alvo fica agarrado até o fim da cena, até o braço fazer Aperto do Gigante de novo, ou até o braço perder PV por dano de um tipo a que era Vulnerável. Enquanto o braço não estiver em crise, este ataque pode mirar criaturas que normalmente não poderiam ser alvo de ataques corpo a corpo.',
      },
      {
        name: 'Garra Enferrujada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect:
          'Imune às condições atordoado, enfurecido, envenenado e abalado.',
      },
      {
        name: 'Camadas de Armadura Antiga',
        effect:
          'Enquanto o braço não estiver em crise, ele ganha Imunidade a dano físico.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creatureGroup({
    name: 'Feiticeiros',
    page: 272,
    summary:
      'Mestres de várias formas de magia, que semeiam o caos em campos de batalha ou tramam em cortes e academias; vão do nível 10 ao 40.',
    body: 'Armados de poderes arcanos e de conhecimento antigo e proibido, os feiticeiros dominam várias formas de magia. Usam essas artes com habilidade, seja para semear o caos num campo de batalha, seja para avançar seus objetivos numa corte ou academia. Alguns preferem a sutileza, tecendo maldições mortais e escondendo a verdadeira natureza sob camadas de ilusões. Outros veem todo obstáculo como prego e usam a magia como martelo. Todos, porém, têm algo em comum: subestimá-los ou enfrentá-los despreparado pode significar um destino pior que a morte.\n\n## Táticas\n\n- Ocultista: Mau-olhado Fatídico (se puder) ou Sorriso Cortante ➔ Sorriso Cortante ➔ Mau-olhado Gélido (se puder) ou Sorriso Cortante ↺\n- Cientista Magitec: Recalibração (se puder e ao menos um aliado construto não estiver sob ela) ou Pequeno Ajudante ➔ Remendo Rápido (se puder e ao menos um aliado construto estiver em crise) ou Eletroluva ↺\n- Astróloga: Adivinhação (se puder e não estiver sob ela) ou Destino Previsto ➔ Destino Previsto ➔ Clareza da Roda Celeste (se houver ao menos duas condições diferentes entre as que ela e os aliados sofrem) ou Destino Previsto ↺\n- Arquimago: Casca Superior (se puder e não estiver sob ela) ou Chama da Alma ➔ Chama da Alma ➔ Corrente de Raios (se puder) ou Chama da Alma ➔ Chama da Alma ➔ Bola de Fogo (se puder, em rodadas pares) ou Praga (se puder) ou Chama da Alma ↺',
  }),
  creature({
    name: 'Ocultista',
    page: 274,
    summary:
      'Feiticeira elegante e fria, que amaldiçoa quem fere com feitiços e encarece a magia dos amaldiçoados.',
    body: '**Abordagens favoráveis:** fogo, luz, veneno, Resistência (trevas, gelo), envenenado, abalado, perda de PM.\n\n**Abordagens desfavoráveis:** ar, trevas, gelo, atordoado, enfurecido, ataques corpo a corpo.',
    originalName: 'Occultist',
    groupSlug: 'feiticeiros',
    level: 10,
    species: 'humanoid',
    rank: 'champion',
    championX: 3,
    role: 'mage',
    villain: true,
    traits: ['frio', 'confiante', 'impecavelmente vestido', 'instruído'],
    attributes: { DES: 8, AST: 8, VIG: 6, VON: 10 },
    hp: 150,
    crisis: 75,
    mp: 160,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'resistant',
      dark: 'resistant',
      fire: 'vulnerable',
      ice: 'immune',
      light: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Sorriso Cortante',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'ice',
        effect:
          'Se o alvo estiver amaldiçoado, ele deixa de estar amaldiçoado e a ocultista recupera 20 PM. Este ataque mira a Defesa Mágica.',
      },
    ],
    spells: [
      {
        name: 'Mau-olhado Gélido',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        effect:
          'A ocultista causa (RA + 15) de dano de gelo a cada alvo atingido por este feitiço.',
      },
      {
        name: 'Mau-olhado Fatídico',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        effect: 'A ocultista causa (RA + 20) de dano de trevas ao alvo.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado e enfurecido.',
      },
      {
        name: 'Antema',
        effect:
          'Quando a ocultista faz um ou mais inimigos perderem PV por dano de um feitiço que lançou, cada um desses inimigos fica amaldiçoado até o fim da cena. O custo em PM dos feitiços lançados por inimigos amaldiçoados aumenta em 5.',
      },
      {
        name: 'Encanto Sinistro',
        effect:
          'Quando a ocultista é bem-sucedida em um teste resistido ligado a diplomacia, persuasão ou conhecimento oculto, se esse teste permitir preencher ou apagar uma ou mais seções de um Relógio, ela pode preencher ou apagar 1 seção adicional desse Relógio.',
      },
      {
        name: 'Mau-olhado do Zéfiro',
        effect: 'Igual ao poder de NPC Voo (Livro Básico, p. 309).',
      },
    ],
  }),
  creature({
    name: 'Cientista Magitec',
    page: 275,
    summary:
      'Cientista exuberante que conserta e aprimora os construtos aliados com ajudantes mecânicos e remendos rápidos.',
    originalName: 'Magitech Scientist',
    groupSlug: 'feiticeiros',
    level: 20,
    species: 'humanoid',
    rank: 'champion',
    championX: 2,
    role: 'support',
    villain: true,
    traits: ['distante', 'brilhante', 'exuberante', 'introvertido'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 160,
    crisis: 80,
    mp: 180,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      bolt: 'resistant',
      dark: 'vulnerable',
      earth: 'vulnerable',
      fire: 'resistant',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Eletroluva',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'bolt',
        effect: 'O alvo fica fraco.',
      },
    ],
    spells: [
      {
        name: 'Remendo Rápido',
        mpCost: '10 × A',
        target: 'Até dois construtos',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Cada alvo se recupera de lento e fraco e também recupera 40 PV. Esse valor sobe para 50 PV se o cientista for de nível 40 ou mais.',
      },
      {
        name: 'Recalibração',
        mpCost: '5 × A',
        target: 'Até dois construtos',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, cada alvo ganha +2 nos testes de Precisão.',
      },
    ],
    otherActions: [
      {
        name: 'Pequeno Ajudante',
        effect:
          'O cientista pode usar uma ação para acionar um pequeno ajudante aleatório. Os efeitos de cada ajudante duram até o fim da cena ou até ele acionar outro. Betty: quando um ou mais aliados construtos que o cientista veja sofrem dano de um tipo a que são Vulneráveis, em vez disso são tratados como Resistentes a esse dano e o efeito deste ajudante termina. Greg: aliados construtos que o cientista veja ganham +1 na Defesa. Jo: aliados construtos que o cientista veja ganham +2 em testes resistidos.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições envenenado e lento.' },
      {
        name: 'A Marcha do Progresso',
        effect:
          'No fim de cada rodada, o cientista pode preencher 1 seção de um Relógio ligado a máquinas ou tecnologia.',
      },
    ],
  }),
  creature({
    name: 'Astróloga',
    page: 276,
    summary:
      'Vidente reservada que força o reroll dos testes alheios e alterna Absorção e Vulnerabilidade entre luz e trevas a cada rodada.',
    body: '**Abordagens favoráveis:** trevas, luz, Resistência (trevas, luz), envenenado, abalado, perda de PM, dissipar efeitos.\n\n**Abordagens desfavoráveis:** fogo, gelo, atordoado, lento, ataques corpo a corpo.',
    originalName: 'Astrologer',
    groupSlug: 'feiticeiros',
    level: 30,
    species: 'humanoid',
    rank: 'champion',
    championX: 3,
    role: 'support',
    villain: true,
    traits: ['ansioso', 'sereno', 'misterioso', 'reservado'],
    attributes: { DES: 6, AST: 10, VIG: 8, VON: 10 },
    hp: 330,
    crisis: 165,
    mp: 200,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: { fire: 'immune', ice: 'immune' },
    attacks: [
      {
        name: 'Destino Previsto',
        range: 'ranged',
        accuracy: 'VON + VON',
        accuracyBonus: 6,
        damage: 10,
        damageType: null,
        effect:
          'Este ataque causa dano de luz em rodadas ímpares e de trevas em rodadas pares. Também tem multi (2) no segundo turno da astróloga a cada rodada e causa 5 de dano extra nos outros turnos dela.',
      },
    ],
    spells: [
      {
        name: 'Clareza da Roda Celeste',
        mpCost: '10',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Cada criatura que a astróloga veja se recupera de todas as condições.',
      },
      {
        name: 'Adivinhação',
        mpCost: '10',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, depois que uma criatura que a astróloga veja rola dados para um teste, se o resultado não foi falha crítica nem sucesso crítico, a astróloga pode forçá-la a rolar de novo os dois dados. Depois de duas rolagens forçadas assim, o feitiço termina.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições atordoado e lento.' },
      {
        name: 'Mistérios do Sol e da Lua',
        effect:
          'Em rodadas ímpares, a astróloga ganha Absorção a dano de luz e Vulnerabilidade a dano de trevas. Em rodadas pares, ganha Absorção a dano de trevas e Vulnerabilidade a dano de luz.',
      },
    ],
  }),
  creature({
    name: 'Arquimago',
    page: 277,
    summary:
      'Mago frágil, arrogante e sedento de poder, campeão solitário que reflete feitiços em rodadas ímpares e dobra o custo dos rituais inimigos.',
    body: '**Abordagens favoráveis:** veneno, Resistência (raio, fogo), atordoado, dissipar efeitos, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** dano de tipo diferente de veneno, feitiços.',
    originalName: 'Archmage',
    groupSlug: 'feiticeiros',
    level: 40,
    species: 'humanoid',
    rank: 'champion',
    championX: 5,
    role: 'mage',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['arrogante', 'frágil', 'sedento de poder', 'de pavio curto'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 12 },
    hp: 550,
    crisis: 275,
    mp: 280,
    initiative: 14,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'vulnerable',
      air: 'resistant',
      bolt: 'absorbs',
      dark: 'vulnerable',
      earth: 'resistant',
      fire: 'absorbs',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Chama da Alma',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'fire',
        effect:
          'Este ataque mira a Defesa Mágica e ganha multi (2) no último turno do Arquimago a cada rodada.',
      },
    ],
    spells: [
      {
        name: 'Praga',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Todo inimigo que o Arquimago veja fica envenenado, lento e fraco.',
      },
      {
        name: 'Corrente de Raios',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 7,
        effect:
          'O Arquimago causa (RA + 20) de dano de raio ao alvo. Depois que um inimigo perde 30 PV ou mais assim, o Arquimago causa 20 de dano de raio a todo outro inimigo que veja.',
      },
      {
        name: 'Bola de Fogo',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'O Arquimago causa 40 de dano de fogo a todo inimigo que veja.',
      },
      {
        name: 'Casca Superior',
        mpCost: '20',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, o Arquimago ganha Imunidade a dano físico.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Reflexo Arcano',
        effect:
          'Em rodadas ímpares, o Arquimago é visivelmente cercado por uma barreira cintilante. Quando um feitiço causa dano a ele, se estiver cercado pela barreira, em vez disso o feitiço não lhe causa dano e, depois que o feitiço é resolvido, quem o lançou perde PV iguais à metade do dano total que o feitiço causaria.',
      },
      {
        name: 'Vigor Elemental',
        effect:
          'Depois que o Arquimago perde PV por dano de ar, raio, trevas, terra, fogo, gelo ou luz, ele recupera metade desse valor em PM e se recupera de todas as condições.',
      },
      {
        name: 'Domínio Ritual',
        effect:
          'Enquanto o Arquimago estiver presente na cena, o custo em PM dos Rituais feitos por inimigos é dobrado.',
      },
    ],
  }),
  creatureGroup({
    name: 'Torretas',
    page: 282,
    summary:
      'Sistemas automáticos de defesa ou ataque de cenários tecnológicos, cada um com um papel especializado; do nível 5 ao 10.',
    body: 'Sistemas automáticos de defesa ou ataque são comuns em qualquer cenário tecnologicamente avançado. Em geral empregados pelo exército ou por pessoas muito ricas, cada um cumpre um papel especializado. Mesmo sendo previsíveis e fáceis de evitar, acrescentam uma camada extra de complexidade ao enfrentar os inimigos de uma área. Algumas torretas são montadas sobre rodas ou pernas de aranha, o que lhes dá mobilidade para acompanhar soldados em patrulhas.',
  }),
  creature({
    name: 'Torreta de Comunicação',
    page: 284,
    summary:
      'Torreta de comunicação, frágil e fixa: motiva os aliados e dá a um deles informação tática para ignorar Resistências.',
    originalName: 'Comm Turret',
    groupSlug: 'torretas',
    level: 5,
    species: 'construct',
    rank: 'soldier',
    role: 'support',
    villain: false,
    traits: ['automatizado', 'delicado', 'fixo', 'sem mente'],
    attributes: { DES: 6, AST: 8, VIG: 8, VON: 10 },
    hp: 50,
    crisis: 25,
    mp: 55,
    initiative: 7,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'vulnerable',
      bolt: 'vulnerable',
      earth: 'resistant',
      ice: 'vulnerable',
      light: 'immune',
      poison: 'immune',
    },
    attacks: [],
    spells: [],
    otherActions: [
      {
        name: 'Transmissão Motivacional',
        effect:
          'A torreta pode usar uma ação para fazer cada aliado presente na cena recuperar 20 PM e se recuperar de atordoado e abalado.',
      },
      {
        name: 'Informação Tática',
        effect:
          'A torreta pode usar uma ação para escolher um aliado aleatório presente na cena. Esse aliado fica preparado até o fim do próximo turno dele ou até a torreta fazer esta ação de novo. Criaturas preparadas ganham +3 em todos os testes e todo dano que causam ignora Resistências.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido, envenenado e abalado.',
      },
    ],
  }),
  creature({
    name: 'Torreta Gatling',
    page: 284,
    summary:
      'Torreta de metralhadora fixa, que dispara em rajada e precisa se recompor no turno seguinte.',
    body: '**Abordagens favoráveis:** raio, Resistência (físico), atordoado, lento.\n\n**Abordagens desfavoráveis:** físico, terra, gelo, veneno, enfurecido, envenenado, abalado.',
    originalName: 'Gatling Turret',
    groupSlug: 'torretas',
    level: 5,
    species: 'construct',
    rank: 'soldier',
    role: 'hunter',
    villain: false,
    traits: ['automatizado', 'fixo', 'sem mente', 'precisa de muita energia'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 6 },
    hp: 50,
    crisis: 25,
    mp: 35,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      bolt: 'vulnerable',
      earth: 'resistant',
      fire: 'vulnerable',
      ice: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Fogo Repetido',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (2). Depois que ele é resolvido, tenha acertado ou não, a torreta não pode fazer ações nem ataques livres até o fim do próximo turno dela.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido, envenenado e abalado.',
      },
    ],
  }),
  creature({
    name: 'Torreta de Mísseis',
    page: 285,
    summary:
      'Torreta volátil que trava a mira a laser num inimigo e dispara um míssil explosivo.',
    originalName: 'Missile Turret',
    groupSlug: 'torretas',
    level: 10,
    species: 'construct',
    rank: 'soldier',
    role: 'hunter',
    villain: false,
    traits: ['automatizado', 'fixo', 'sem mente', 'volátil'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 6 },
    hp: 60,
    crisis: 30,
    mp: 40,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      dark: 'vulnerable',
      earth: 'resistant',
      fire: 'vulnerable',
      ice: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Míssil Explosivo',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 4,
        damage: 10,
        damageType: 'fire',
        effect:
          'Se a torreta estiver travada num inimigo, este ataque deve mirar esse inimigo e, se acertar, causa 10 de dano extra.',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Mira a Laser',
        effect:
          'A torreta pode usar uma ação para travar a mira em um inimigo aleatório. Este efeito termina depois que a torreta faz Míssil Explosivo, faz esta ação de novo ou perde PV por dano de um tipo a que é Vulnerável.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido, envenenado e abalado.',
      },
    ],
  }),
  creature({
    name: 'Torreta de Escudo',
    page: 285,
    summary:
      'Torreta que gasta PM para anular o dano causado aos aliados com um campo de energia.',
    originalName: 'Shield Turret',
    groupSlug: 'torretas',
    level: 10,
    species: 'construct',
    rank: 'soldier',
    role: 'sentinel',
    villain: false,
    traits: ['automatizado', 'fixo', 'sem mente', 'precisa de muita energia'],
    attributes: { DES: 8, AST: 6, VIG: 8, VON: 10 },
    hp: 60,
    crisis: 30,
    mp: 60,
    initiative: 7,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      dark: 'resistant',
      earth: 'resistant',
      ice: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Descarga Estática',
        range: 'melee',
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'bolt',
        effect: 'Se este ataque acertar, a torreta recupera 20 PM.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido, envenenado e abalado.',
      },
      {
        name: 'Campo de Energia Defensivo',
        effect:
          'Quando uma fonte causa dano a um ou mais aliados da torreta, se os PM atuais da torreta forem iguais ou maiores que o dano total causado a esses aliados, a torreta perde essa quantidade de PM e a fonte não causa dano a esses aliados.',
      },
    ],
  }),
  creature({
    name: 'Esfinge',
    page: 279,
    summary:
      'Criatura de provação e julgamento de uma era esquecida: voa, atordoa com enigmas e troca de Afinidades a cada um dos seus três turnos.',
    body: '**Rotina:** Pergunta Intrigante (se puder e ao menos dois inimigos não estiverem atordoados) ou Luz Rugidora (se puder e estiver em crise) ou Olhar Varredor ➔ Olhar Varredor ➔ Provação da Esfinge (se puder) ou Olhar Varredor ↺\n\n**Abordagens favoráveis:** ar, raio, trevas, terra, veneno, Resistência (fogo, luz), atordoado, imunidade (atordoado, fraco), perda de PM.\n\n**Abordagens desfavoráveis:** fogo, gelo, luz, enfurecido, abalado, ataques corpo a corpo.',
    originalName: 'Sphinx',
    level: 30,
    species: 'monster',
    rank: 'champion',
    championX: 3,
    role: 'mage',
    villain: true,
    traits: ['enigmático', 'leal', 'resplandecente', 'atemporal'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 270,
    crisis: 135,
    mp: 180,
    initiative: 12,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      dark: 'vulnerable',
      fire: 'immune',
      ice: 'immune',
      light: 'immune',
    },
    attacks: [
      {
        name: 'Olhar Varredor',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'light',
        effect:
          'O alvo fica fraco. Enquanto a esfinge não estiver em crise, este ataque mira a Defesa Mágica; enquanto estiver em crise, tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Pergunta Intrigante',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que consiga ouvir a esfinge fica atordoado.',
      },
      {
        name: 'Luz Rugidora',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'A esfinge causa (RA + 30) de dano de luz ao alvo. Esse dano ignora Resistências.',
      },
      {
        name: 'Provação da Esfinge',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'A esfinge causa dano de fogo igual a (10 multiplicado pelo número de condições diferentes entre os inimigos que ela veja) a todo inimigo que veja e sofra uma ou mais condições.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido e abalado.',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Bênção Prima',
        effect:
          'Enquanto a esfinge estiver presente na cena, o resultado de qualquer teste que não seja aberto e cujo resultado alto seja um número primo (2, 3, 5, 7, 11, 13, 17, 19...) é automaticamente tratado como sucesso.',
      },
      {
        name: 'Enigma da Esfinge',
        effect:
          'Quando a esfinge termina o primeiro turno de cada rodada, ela ganha Vulnerabilidade a ar e Resistência a raio, terra e veneno até o início do segundo turno dela nessa rodada. Quando termina o segundo turno, ganha Vulnerabilidade a raio e Imunidade a ar até o início do terceiro turno dela nessa rodada. Quando termina o terceiro turno, ganha Vulnerabilidade a terra e veneno e Resistência a ar e raio até o início do primeiro turno dela na rodada seguinte.',
      },
    ],
  }),
  creature({
    name: 'Treant',
    page: 281,
    summary:
      'Árvore senciente, majestosa e antiga, guardiã da floresta: invoca raízes e redemoinhos e, se queimada, retalia com galhos em chamas.',
    body: '**Rotina:** Folhagens Sacudidas (se puder) ou Galhos Espancadores ➔ Lâminas de Flor Tênues ➔ Raízes Agarradoras (se puder) ou Galhos Espancadores ↺\n\n**Abordagens favoráveis:** ar, trevas, terra, fogo, Resistência (físico, ar, terra), envenenado, perda de PM.\n\n**Abordagens desfavoráveis:** raio, luz, atordoado, enfurecido, abalado.',
    originalName: 'Treant',
    level: 20,
    species: 'plant',
    rank: 'champion',
    championX: 3,
    role: 'mage',
    villain: true,
    traits: ['implacável quando irritado', 'paciente', 'forte', 'altíssimo'],
    attributes: { DES: 6, AST: 10, VIG: 8, VON: 10 },
    hp: 270,
    crisis: 135,
    mp: 180,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      bolt: 'resistant',
      dark: 'vulnerable',
      fire: 'vulnerable',
      light: 'absorbs',
    },
    attacks: [
      {
        name: 'Galhos Espancadores',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (2). Se for feito por Vingança Flamejante, causa dano de fogo em vez de físico, perde multi (2) e o dano dele ignora Resistências.',
      },
      {
        name: 'Lâminas de Flor Tênues',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'light',
      },
    ],
    spells: [
      {
        name: 'Raízes Agarradoras',
        mpCost: '10 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'O treant causa (RA + 15) de dano de terra a cada alvo atingido por este feitiço, e cada alvo que perde 20 PV ou mais por esse dano fica lento. Este feitiço não pode mirar criaturas que estejam voando, flutuando, caindo ou de outro modo no ar.',
      },
      {
        name: 'Folhagens Sacudidas',
        mpCost: '10 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'O treant causa (RA + 15) de dano de ar a cada alvo atingido por este feitiço, e cada alvo voador que perde 20 PV ou mais por esse dano é forçado a pousar imediatamente.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Vingança Flamejante',
        effect:
          'No fim de cada turno de inimigo, se esse inimigo causou dano de fogo ao treant durante o turno, o treant faz um ataque livre com Galhos Espancadores contra esse inimigo. Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
      {
        name: 'Raízes Fundas, Raízes Rasas',
        effect:
          'Quando o treant lança Raízes Agarradoras, ele ganha Vulnerabilidade a terra e Imunidade a ar até o fim da cena ou até lançar Folhagens Sacudidas. Quando lança Folhagens Sacudidas, ganha Vulnerabilidade a ar e Imunidade a terra até o fim da cena ou até lançar Raízes Agarradoras.',
      },
      {
        name: 'Fotossíntese',
        effect:
          'Quando o treant sofre dano de luz, perde PM iguais a esse dano. Quando sofre dano de trevas, recupera PM iguais a esse dano.',
      },
    ],
  }),
]);
