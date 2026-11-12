import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, War Machines a Wolves: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1L: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Máquinas de Guerra',
    page: 296,
    summary:
      'Behemoths blindados de aço e fogo criados por reinos e impérios para dominar; vão do nível 10 ao 30.',
    body: 'Todo reino, império ou república, por mais pacífico e idílico que queira parecer, acaba cedendo ao medo ou ao desprezo pelos vizinhos e até pelos próprios cidadãos. Então busca força criando ferramentas de dominação: feras de aço e fogo, indiferentes e sem sentimentos. Behemoths blindados cujo único propósito é percorrer a terra e o céu, ameaçando destruição. Mas, quanto mais ardilosas as máquinas de guerra, mais os outros governantes sentem a necessidade de igualá-las (ou superá-las). Inevitavelmente, a dissuasão vira uma corrida coletiva rumo à aniquilação.\n\n## Táticas\n\n- Motociclo Flutuante: Amortecedor Arcano (se puder e não estiver sob ele) ou Rajada Perfurante ➔ Rajada Perfurante ↺\n- Tanque Quadrúpode: Salva de Tiro Automático ➔ Descarga Piro-gélida (se puder) ou Pneus Guinchantes ➔ Granadas de Luz (se puder e ao menos um inimigo não estiver atordoado) ou Salva de Tiro Automático ➔ Mudança de Pressão (se a pressão estiver alta ou baixa) ou Descarga Piro-gélida (se puder) ou Pneus Guinchantes ↺\n- Plataforma de mísseis móvel (MMP), rodadas ímpares: Corpo: Guarda ➔ Pernas: Chute de Aço ➔ Corpo: Varredura da Área ➔ Pernas: Estabilizar ➔ Corpo: Barragem de Zeus (se puder) ou Raio Laser\n- MMP, rodadas pares: Corpo: Raio Laser ➔ Pernas: Estabilizar ➔ Corpo: Varredura da Área ➔ Pernas: Explosão Atordoante ➔ Corpo: Perfurador de Céus de Hermes (se puder) ou Raio Laser',
  }),
  creature({
    name: 'Motociclo Flutuante',
    page: 298,
    summary:
      'Moto voadora ágil e leve, pilotada: dispara rajadas perfurantes e amortece feitiços; em voo, impede que os inimigos obtenham oportunidades.',
    body: '**Abordagens favoráveis:** ar, raio, Resistência (físico), atordoado, enfurecido, lento.\n\n**Abordagens desfavoráveis:** terra, veneno, envenenado, armadura marcial, feitiços.',
    originalName: 'Hovercycle',
    groupSlug: 'maquinas-de-guerra',
    level: 10,
    species: 'construct',
    rank: 'soldier',
    role: 'hunter',
    villain: false,
    traits: ['ágil', 'veloz', 'leve', 'pilotado'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 60,
    crisis: 30,
    mp: 50,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      bolt: 'vulnerable',
      earth: 'resistant',
      ice: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Rajada Perfurante',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 4,
        damage: 10,
        damageType: 'physical',
        effect:
          'Este ataque causa 5 de dano extra contra criaturas com armadura marcial equipada.',
      },
    ],
    spells: [
      {
        name: 'Amortecedor Arcano',
        mpCost: '10',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, quando um feitiço causa dano à moto, esse dano é reduzido à metade. Quando isso acontece, o feitiço termina.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Dissuasão Aérea',
        effect:
          'O motociclo flutuante é uma criatura voadora (veja o poder de NPC Voo, Livro Básico, p. 309). Enquanto estiver em voo, inimigos que consigam vê-lo não podem obter oportunidades em testes resistidos.',
      },
    ],
  }),
  creature({
    name: 'Tanque Quadrúpode',
    page: 299,
    summary:
      'Tanque de quatro patas pilotado, campeão solitário cuja pressão muda entre alta, média e baixa, alternando Resistências e Vulnerabilidades entre fogo e gelo.',
    body: '**Abordagens favoráveis:** raio, fogo, gelo, Resistência (físico, fogo, gelo), enfurecido, fraco, perda de PM.\n\n**Abordagens desfavoráveis:** físico, terra, veneno, envenenado.',
    originalName: 'Quadropod Tank',
    groupSlug: 'maquinas-de-guerra',
    level: 20,
    species: 'construct',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo'],
    villain: true,
    traits: ['blindado', 'veloz', 'pilotado', 'instável'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 400,
    crisis: 200,
    mp: 120,
    initiative: 12,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: { physical: 'resistant', earth: 'resistant', poison: 'immune' },
    attacks: [
      {
        name: 'Pneus Guinchantes',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 2,
        damage: 15,
        damageType: 'physical',
      },
      {
        name: 'Salva de Tiro Automático',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Granadas de Luz',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que o tanque veja fica atordoado.',
      },
      {
        name: 'Descarga Piro-gélida',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect:
          'O tanque causa (RA + 20) de dano ao alvo. O tipo desse dano é fogo se a pressão do tanque for alta ou média; caso contrário, é gelo.',
      },
    ],
    otherActions: [
      {
        name: 'Mudança de Pressão',
        effect:
          'O tanque pode usar uma ação para ajustar a pressão. Se fizer isso e a pressão estiver baixa ou alta, ela passa a média e o tanque se recupera de todas as condições.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Blindagem Rachada',
        effect:
          'Enquanto o tanque estiver em crise, ele ganha Vulnerabilidade a dano de raio.',
      },
      {
        name: 'Pressão Irregular',
        effect:
          'A pressão do tanque pode ser alta, média ou baixa. O tanque começa cada conflito com pressão média. Com pressão alta ou baixa, a tripulação reclama alto de que o motor está quente ou frio demais, e valem estes efeitos. Alta: o tanque ganha Resistência a gelo e Vulnerabilidade a fogo. Baixa: o tanque ganha Resistência a fogo e Vulnerabilidade a gelo.',
      },
      {
        name: 'Picos de Pressão',
        effect:
          'Depois que o tanque perde PV por dano de fogo, a pressão sobe um nível, mas, se já era alta, passa a baixa. Depois que perde PV por dano de gelo, a pressão desce um nível, mas, se já era baixa, passa a alta.',
      },
      {
        name: 'Corrida do Quadrúpode',
        effect:
          'Quando o tanque preenche uma ou mais seções de um Relógio ligado a velocidade ou perseguição, ele preenche uma seção adicional desse Relógio. Então, se preencheu três ou mais seções assim, fica atordoado e lento e sua pressão passa a baixa.',
      },
    ],
  }),
  creature({
    name: 'Plataforma de Mísseis Móvel: Corpo',
    page: 301,
    summary:
      'Corpo experimental e pilotado da plataforma de mísseis móvel: processa dados para lançar feitiços de ar e de raio que ignoram Resistências.',
    body: '**Abordagens favoráveis:** ar, raio, Resistência (ar, raio), atordoado, enfurecido, abalado, impedir a ação Feitiço, Espelho.\n\n**Abordagens desfavoráveis:** terra, veneno, envenenado, ataques corpo a corpo (se as pernas estiverem presentes).',
    originalName: 'Mobile Missile Platform (Body)',
    groupSlug: 'maquinas-de-guerra',
    level: 30,
    species: 'construct',
    rank: 'champion',
    championX: 3,
    role: 'mage',
    villain: true,
    traits: ['blindado', 'experimental', 'assomando', 'pilotado'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 300,
    crisis: 150,
    mp: 200,
    initiative: 12,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: { earth: 'resistant', poison: 'immune' },
    attacks: [
      {
        name: 'Raio Laser',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'light',
        effect: 'O dano deste ataque ignora Resistências.',
      },
    ],
    spells: [
      {
        name: 'Perfurador de Céus de Hermes',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'O corpo causa (RA + 30) de dano de ar ao alvo. Criaturas que perdem PV por esse dano também perdem metade desse valor em PM.',
      },
      {
        name: 'Barragem de Zeus',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'O corpo causa 35 de dano de raio a todo inimigo que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Varredura da Área',
        effect:
          'O corpo pode usar uma ação para analisar dados do entorno. Se fizer isso, começa a processar os dados obtidos. Quando o corpo lança Perfurador de Céus de Hermes ou Barragem de Zeus, se o processamento não tiver sido interrompido (veja Erro de Processamento de Dados, abaixo), ele para de processar e todo o dano do feitiço ignora Resistências.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Erro de Processamento de Dados',
        effect:
          'Quando o corpo perde PV por dano de um tipo a que é Vulnerável, se estava processando dados obtidos por Varredura da Área, ele para de processar.',
      },
      {
        name: 'Circuito Atmogalvânico Delicado',
        effect:
          'Quando o corpo lança Perfurador de Céus de Hermes, ele ganha Vulnerabilidade a dano de ar e Absorção a dano de raio até a próxima vez que lançar um feitiço. Quando lança Barragem de Zeus, ganha Vulnerabilidade a dano de raio e Absorção a dano de ar até a próxima vez que lançar um feitiço. Essas mudanças também terminam no fim da cena e devem ser indicadas explicitamente, descrevendo o circuito do corpo assumindo uma cor amarela ou verde brilhante. O Mestre deve informar a personagens com conhecimento tecnológico que a carga elemental do feitiço quase sobrecarregou a máquina.',
      },
      {
        name: 'Conversão de Energia',
        effect:
          'Quando o corpo perde PV, se estiver estabilizado (veja as pernas), ele recupera metade desse valor em PM.',
      },
    ],
  }),
  creature({
    name: 'Plataforma de Mísseis Móvel: Pernas',
    page: 300,
    summary:
      'Pernas da plataforma de mísseis móvel: chutam, estabilizam o corpo e o protegem de ataques corpo a corpo.',
    body: '**Abordagens favoráveis:** terra, fogo, Resistência (físico), lento, fraco.\n\n**Abordagens desfavoráveis:** físico, ar, raio, gelo, veneno, atordoado, enfurecido, envenenado, abalado.',
    originalName: 'Mobile Missile Platform (Legs)',
    groupSlug: 'maquinas-de-guerra',
    level: 30,
    species: 'construct',
    rank: 'elite',
    role: 'sentinel',
    flags: ['part'],
    villain: false,
    traits: ['blindado', 'automatizado', 'grande', 'previsível'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 240,
    crisis: 120,
    mp: 70,
    initiative: 10,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      physical: 'resistant',
      earth: 'resistant',
      fire: 'vulnerable',
      ice: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Chute de Aço',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Estabilizar',
        effect:
          'As pernas podem usar uma ação para fazer o corpo ficar estabilizado até o fim da rodada. Enquanto o corpo estiver estabilizado, as pernas ganham Resistência a dano de ar e de raio, e a Resistência básica delas a terra é substituída por Vulnerabilidade.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect:
          'Imune às condições atordoado, enfurecido, envenenado e abalado.',
      },
      {
        name: 'Sistema de Locomoção Defensivo',
        effect:
          'Enquanto as pernas estiverem presentes na cena e não estiverem em crise, o corpo ganha Resistência a dano de todos os tipos causado por ataques corpo a corpo.',
      },
    ],
  }),
  creatureGroup({
    name: 'Lobos',
    page: 302,
    summary:
      'Feras ferozes, inteligentes e leais, em sintonia com o caos primordial; vão do nível 10 ao 40.',
    body: 'Ferozes, inteligentes e leais, os lobos habitam algumas das regiões mais perigosas e remotas do mundo. Em profunda sintonia com os instintos e com a força do caos primordial, essas feras surgem em muitas formas, de lobos-atrozes imensos a canídeos ágeis. Têm pelagens felpudas de várias cores, olhos cintilantes e presas que rasgam armadura e carne. A maioria é gregária, mas os de vida extraordinariamente longa costumam desenvolver uma inclinação solitária, agindo como guardiões da região e, ao mesmo tempo, seus caçadores mais capazes.\n\n## Táticas\n\n- Garmr: Uivo Pavoroso (se puder, na primeira rodada) ou Guarda (se sofrer menos de duas condições) ou Garras Relampejantes ➔ Presas Sedentas de Sangue ↺\n- Bandersnatch: Fedor Debilitante (em rodadas ímpares, se puder e ao menos um inimigo não estiver sob ele, mirando o de mais PV atuais entre eles) ou Uivo Fétido (se puder) ou Mandíbulas Frumiosas ↺\n- Lícaon: Uivo Inspirador (em rodadas ímpares, se puder, se não estiver atordoado e/ou abalado e se ao menos um aliado não estiver sob Uivo Inspirador) ou Investida Crepitante ➔ Mordida Dominante ↺\n- Fenrir: Olhar Gélido (se puder e os PV atuais forem pares) ou Devorador de Sol (se o Relógio Devorador de Sol estiver presente) ou Salto do Caçador ➔ Mordida Roedora (se estiver roendo um inimigo) ou Salto do Caçador ↺',
  }),
  creature({
    name: 'Garmr',
    page: 304,
    summary:
      'Lobo feroz e furtivo, que escolhe uma presa depois de se proteger, uiva para abalar e caça em matilha.',
    originalName: 'Garmr',
    groupSlug: 'lobos',
    level: 10,
    species: 'beast',
    rank: 'elite',
    role: 'hunter',
    villain: false,
    traits: ['feroz', 'intimidador', 'discreto', 'selvagem'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 120,
    crisis: 60,
    mp: 50,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      bolt: 'resistant',
      earth: 'resistant',
      fire: 'vulnerable',
    },
    attacks: [
      {
        name: 'Presas Sedentas de Sangue',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 10,
        damageType: 'physical',
        effect:
          'Se o garmr estiver em crise, ele recupera PV iguais à metade da perda total de PV sofrida pelo alvo.',
      },
      {
        name: 'Garras Relampejantes',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 5,
        damageType: 'physical',
        effect:
          'Este ataque causa 5 de dano extra contra inimigos que sofram uma ou mais condições.',
      },
    ],
    spells: [
      {
        name: 'Uivo Pavoroso',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que consiga ouvir o garmr fica abalado.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Caçador de Matilha',
        effect:
          'Quando um aliado que o garmr veja erra todos os alvos de um ataque, o garmr ganha +3 no próximo teste que fizer nesta cena. Este efeito não é cumulativo.',
      },
      {
        name: 'Seguir a Presa',
        effect:
          'Quando o garmr faz a ação Guarda, ele começa a caçar um inimigo aleatório que veja. Quando faz Presas Sedentas de Sangue contra um inimigo caçado que consiga mirar, deve mirá-lo. Se fizer isso, o ataque causa 10 de dano extra e a caça termina (mesmo que o ataque erre). A caça também termina assim que o garmr faz a ação Guarda de novo ou sofre duas ou mais condições.',
      },
    ],
  }),
  creature({
    name: 'Bandersnatch',
    page: 305,
    summary:
      'Lobo sujo e oportunista, que enfraquece e envenena com fedor e uivos fétidos.',
    body: '**Abordagens favoráveis:** raio, luz, Resistência (físico, veneno), atordoado, abalado, imunidade (envenenado, fraco), perda de PM, dissipar efeitos.\n\n**Abordagens desfavoráveis:** trevas, veneno, envenenado, fraco, derrotar vários bandersnatches de uma vez.',
    originalName: 'Bandersnatch',
    groupSlug: 'lobos',
    level: 20,
    species: 'beast',
    rank: 'soldier',
    role: 'saboteur',
    villain: false,
    traits: ['agressivo', 'imundo', 'oportunista', 'ligeiro'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 80,
    crisis: 40,
    mp: 60,
    initiative: 9,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      bolt: 'vulnerable',
      dark: 'resistant',
      light: 'vulnerable',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Mandíbulas Frumiosas',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'physical',
        effect:
          'O alvo fica fraco. Se o bandersnatch obtiver sucesso crítico no teste de Precisão deste ataque, ele não gera oportunidade e o alvo fica envenenado em vez de fraco.',
      },
    ],
    spells: [
      {
        name: 'Fedor Debilitante',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Cena',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'Até o feitiço terminar, fontes que causam dano de veneno causam 5 de dano extra ao alvo.',
      },
      {
        name: 'Uivo Fétido',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'O bandersnatch causa (RA + 15) de dano de veneno ao alvo. Este feitiço trata a Defesa Mágica do alvo como igual ao tamanho atual do dado de Vigor dele.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições envenenado e fraco.' },
      {
        name: 'Sangue Podre',
        effect:
          'Depois que o bandersnatch chega a 0 PV ou sai da cena, cada inimigo afetado por um feitiço Fedor Debilitante perde imediatamente 10 PV.',
      },
    ],
  }),
  creature({
    name: 'Lícaon',
    page: 306,
    summary:
      'Lobo régio e astuto, que inspira a matilha com uivos e chama reforços ao entrar em crise.',
    originalName: 'Lycaon',
    groupSlug: 'lobos',
    level: 30,
    species: 'beast',
    rank: 'elite',
    role: 'support',
    villain: false,
    traits: ['corajoso', 'astuto', 'altivo', 'régio'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 220,
    crisis: 110,
    mp: 80,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      bolt: 'resistant',
      dark: 'vulnerable',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'immune',
    },
    attacks: [
      {
        name: 'Mordida Dominante',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'Se o lícaon não tiver mais aliados na cena, o alvo fica atordoado.',
      },
      {
        name: 'Investida Crepitante',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'bolt',
        effect:
          'Enquanto o lícaon tiver três ou mais aliados presentes na cena, este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Uivo Inspirador',
        mpCost: '10 × A',
        target: 'Até três aliados',
        duration: 'Cena',
        offensive: false,
        effect:
          'Cada alvo se recupera de atordoado e abalado. Além disso, até o feitiço terminar, cada alvo ganha +1 nos testes de Precisão. Quando o lícaon sofre atordoado e/ou abalado, este feitiço termina imediatamente.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Chamar a Matilha',
        effect:
          'No fim de cada rodada, se o lícaon estiver em crise e houver menos de dois aliados soldados presentes na cena, um aliado soldado de nível 20 entra no conflito. Esta regra só pode ser ativada uma vez por cena.',
      },
      {
        name: 'Emboscada da Matilha',
        effect:
          'Uma vez por turno, depois que um aliado acerta um ou mais inimigos com um ataque, se esse aliado estiver afetado por um feitiço Uivo Inspirador lançado pelo lícaon, o lícaon faz Mordida Dominante como ataque livre contra um desses inimigos, escolhido aleatoriamente (depois que o ataque do aliado for resolvido). Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano.',
      },
    ],
  }),
  creature({
    name: 'Fenrir',
    page: 307,
    summary:
      'Lobo colossal e silencioso, campeão solitário que rói a presa, cresce até devorar o sol e reduz todos os inimigos a 1 PV.',
    body: '**Abordagens favoráveis:** fogo, luz, Resistência (físico, trevas, gelo), fraco, curar Fenrir de enfurecido.\n\n**Abordagens desfavoráveis:** raio, trevas, gelo, enfurecido, envenenado, abalado, causar perdas pequenas de PV.',
    originalName: 'Fenrir',
    groupSlug: 'lobos',
    level: 40,
    species: 'beast',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['desiludido', 'maciço', 'forte', 'vingativo'],
    attributes: { DES: 8, AST: 8, VIG: 12, VON: 8 },
    hp: 600,
    crisis: 300,
    mp: 180,
    initiative: 12,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      bolt: 'immune',
      dark: 'resistant',
      fire: 'vulnerable',
      ice: 'absorbs',
      light: 'vulnerable',
    },
    attacks: [
      {
        name: 'Salto do Caçador',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'physical',
        effect:
          'Fenrir começa a roer o alvo. Ele para de roer o alvo no fim da cena, quando fizer Salto do Caçador de novo ou quando perder PV por dano de um tipo a que é Vulnerável. Este ataque pode mirar criaturas que normalmente não poderiam ser alvo de ataques corpo a corpo.',
      },
    ],
    spells: [
      {
        name: 'Olhar Gélido',
        mpCost: '15 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 4,
        effect:
          'Fenrir causa (RA + 20) de dano de gelo a cada alvo atingido por este feitiço, e os alvos atingidos ficam lentos.',
      },
    ],
    otherActions: [
      {
        name: 'Mordida Roedora',
        effect:
          'Fenrir pode usar uma ação para causar 30 de dano de trevas ao inimigo que está roendo. Então, se um inimigo perdeu PV assim e Fenrir não estiver em crise, ele se recupera de todas as condições.',
      },
      {
        name: 'Devorador de Sol',
        effect:
          'Fenrir entra em cada conflito com um Relógio de seis seções, vazio, chamado “Devorador de Sol”. Fenrir pode usar uma ação para crescer, preenchendo 1 seção desse Relógio; então, se o Relógio ficar cheio, ele é removido da cena e todo inimigo que Fenrir veja é reduzido a 1 PV.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições envenenado e abalado.',
      },
      {
        name: 'Retaliação Furiosa',
        effect:
          'No fim de cada turno de inimigo, se esse inimigo fez Fenrir perder PV durante o turno, Fenrir fica enfurecido. Se já estava enfurecido, em vez disso faz um ataque livre com Salto do Caçador contra esse inimigo. Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
    ],
  }),
]);
