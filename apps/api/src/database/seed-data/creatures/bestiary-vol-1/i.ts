import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Raptors a Shroomblade: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1I: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Aves de Rapina',
    page: 248,
    summary:
      'Aves astutas de penas coloridas e bicos afiados, que veem os outros como presa ou ameaça; vão do nível 5 ao 40.',
    body: 'Com penas coloridas, bicos afiados e asas poderosas, as aves de rapina existem em todo o mundo, de cadeias de montanhas nevadas a florestas selvagens, selvas e campos de batalha nublados; já fizeram ninho até no topo dos mais imponentes arranha-céus. Astutas e perspicazes, costumam ver os outros como presa ou ameaça e interagem com relutância com criaturas de fora do seu grupo. Às vezes, porém, criam laços estreitos com pessoas cuja força e adaptabilidade admiram ou consideram úteis.\n\n## Táticas\n\n- Rarog: Grito Sônico ➔ Mergulho Flamejante ↺\n- Valravn: Vapores Proibidos (em rodadas ímpares, se puder e um ou mais inimigos não estiverem sob Vapores Proibidos, mirando um deles aleatoriamente) ou Voo Guia (em rodadas ímpares, se puder) ou Bicada de Essência ↺\n- Hresvelgr: Tetra-asas ➔ Descida do Imperador do Gelo (se estiver em voo) ou Tetra-asas ➔ nenhuma ação (se Descida do Imperador do Gelo foi usada) ou Tetra-asas ➔ Sopro Glacial ↺\n- Zu: Salto do Zu (em rodadas pares, se puder) ou Investida Espinhosa ➔ Pouso Catastrófico (se estiver no ar) ou Garras Naufragadoras ↺',
  }),
  creature({
    name: 'Rarog',
    page: 250,
    summary:
      'Ave de fogo corajosa e protetora, que dá aos aliados imunidade a fogo e a fraco enquanto voa.',
    body: '**Abordagens favoráveis:** raio, gelo, Resistência (ar, fogo), envenenado, abalado, lento.\n\n**Abordagens desfavoráveis:** ar, fogo, fraco, ataques corpo a corpo.',
    originalName: 'Rarog',
    groupSlug: 'aves-de-rapina',
    level: 5,
    species: 'beast',
    rank: 'elite',
    role: 'sentinel',
    villain: false,
    traits: ['corajoso', 'flamejante', 'imponente', 'protetor'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 100,
    crisis: 50,
    mp: 45,
    initiative: 10,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      fire: 'resistant',
      ice: 'vulnerable',
    },
    attacks: [
      {
        name: 'Mergulho Flamejante',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 0,
        damage: 10,
        damageType: 'fire',
        effect:
          'Enquanto o rarog não tiver aliados presentes na cena, este ataque tem multi (2).',
      },
      {
        name: 'Grito Sônico',
        range: 'ranged',
        accuracy: 'VIG + VON',
        accuracyBonus: 0,
        damage: 5,
        damageType: 'air',
        effect: 'O alvo fica atordoado.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Penas Flamejantes',
        effect:
          'Enquanto o rarog estiver presente na cena e em voo, os aliados dele ganham Imunidade a dano de fogo e imunidade a fraco.',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
    ],
  }),
  creature({
    name: 'Valravn',
    page: 251,
    summary:
      'Corvo pequeno e soturno, guia das almas: reduz pela metade a cura de uma vítima e atordoa com voo de luz.',
    body: '**Emissários do Senhor Harpia:** para elevar o valravn ao nível 30, como indicado na seção de aliados de Harpia: aumente a Vontade para d10, os PV máximos para 100 e os PM máximos para 100, e acrescente Vulnerabilidade a dano de fogo; aumente em 5 o dano de Bicada de Essência e de Voo Guia e melhore em +2 todas as fórmulas de testes de Precisão e de Magia; faça o dano de Bicada de Essência ignorar Resistências; e acrescente a regra especial “Asas do Além: enquanto o valravn estiver presente na cena, inimigos que sofram uma ou mais condições tratam custos em PM como aumentados em 5.”\n\n**Abordagens favoráveis:** trevas, Resistência (luz), enfurecido, abalado, imunidade (atordoado, fraco), perda de PM.\n\n**Abordagens desfavoráveis:** ar, luz, ataques corpo a corpo, recuperação de PV.',
    originalName: 'Valravn',
    groupSlug: 'aves-de-rapina',
    level: 10,
    species: 'beast',
    rank: 'soldier',
    role: 'saboteur',
    villain: false,
    traits: ['atencioso', 'ameaçador', 'pequeno', 'soturno'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 60,
    crisis: 30,
    mp: 50,
    initiative: 8,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: { air: 'resistant', dark: 'vulnerable', light: 'resistant' },
    attacks: [
      {
        name: 'Bicada de Essência',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 4,
        damage: 5,
        damageType: 'light',
        effect: 'O alvo fica fraco.',
      },
    ],
    spells: [
      {
        name: 'Vapores Proibidos',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, quando o alvo recupera PV, ele recupera apenas metade e este feitiço termina.',
      },
      {
        name: 'Voo Guia',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        effect:
          'O valravn causa (RA + 10) de dano de luz ao alvo, que fica atordoado.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
    ],
  }),
  creature({
    name: 'Hresvelgr',
    page: 252,
    summary:
      'Imperador do Gelo de quatro asas, campeão solitário que mergulha como avalanche e responde a ataques à distância quando está em crise.',
    body: '**Abordagens favoráveis:** fogo, veneno, Resistência (gelo), atordoado, enfurecido, envenenado, perda de PM, manipulação de Relógios.\n\n**Abordagens desfavoráveis:** ar, terra, gelo, abalado, lento, ataques corpo a corpo.',
    originalName: 'Hresvelgr',
    groupSlug: 'aves-de-rapina',
    level: 30,
    species: 'beast',
    rank: 'champion',
    championX: 4,
    role: 'hunter',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['frio', 'de quatro asas', 'majestoso', 'impiedoso'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 400,
    crisis: 200,
    mp: 160,
    initiative: 13,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      earth: 'resistant',
      fire: 'vulnerable',
      ice: 'immune',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Descida do Imperador do Gelo',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 6,
        damage: 20,
        damageType: 'ice',
        effect:
          'Este ataque tem multi (3). Depois que ele é resolvido, tenha acertado ou não, Hresvelgr perde os benefícios do voo até o fim do próximo turno dele e não pode fazer ações nem ataques livres até o fim desse turno.',
      },
      {
        name: 'Tetra-asas',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 6,
        damage: 15,
        damageType: 'air',
        effect:
          'Este ataque causa 5 de dano extra contra inimigos em crise, e o dano dele ignora as Resistências deles.',
      },
    ],
    spells: [
      {
        name: 'Sopro Glacial',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'Hresvelgr causa (RA + 20) de dano de gelo ao alvo. Criaturas que perdem PV assim também ficam lentas e fracas.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições abalado e lento.' },
      {
        name: 'Senhor da Avalanche',
        effect:
          'Hresvelgr entra em cada conflito com um Relógio de seis seções, vazio, chamado “Avalanche Torrencial”. Depois que Hresvelgr erra todos os alvos de um ataque, e no fim de cada turno em que ele perdeu 60 PV ou mais no total, preencha 1 seção desse Relógio. Quando o Relógio fica cheio, Hresvelgr causa 40 de dano de gelo a todo inimigo que veja e todas as seções são apagadas (ele pode ser preenchido de novo).',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Soberano Vingativo',
        effect:
          'Depois que um inimigo que Hresvelgr veja o acerta ou erra com um ataque à distância, se Hresvelgr estiver em crise, ele faz um ataque livre com Tetra-asas contra esse inimigo (depois que o ataque for resolvido).',
      },
    ],
  }),
  creature({
    name: 'Zu',
    page: 253,
    summary:
      'Ave gigante sem voo, astuta e brutal: salta para o ar e despenca num pouso catastrófico.',
    body: '**Abordagens favoráveis:** trevas, gelo, Resistência (físico, terra), fraco, perda de PM.\n\n**Abordagens desfavoráveis:** fogo, luz, envenenado, lento, ataques corpo a corpo.',
    originalName: 'Zu',
    groupSlug: 'aves-de-rapina',
    level: 40,
    species: 'beast',
    rank: 'elite',
    role: 'brute',
    villain: false,
    traits: ['brutal', 'astuto', 'sem voo', 'pesado'],
    attributes: { DES: 8, AST: 8, VIG: 12, VON: 8 },
    hp: 300,
    crisis: 150,
    mp: 70,
    initiative: 10,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      dark: 'vulnerable',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Pouso Catastrófico',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'earth',
        effect: 'Este ataque tem multi (qualquer número de alvos).',
      },
      {
        name: 'Garras Naufragadoras',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'physical',
        effect: 'O zu recupera 10 PM.',
      },
      {
        name: 'Investida Espinhosa',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Salto do Zu',
        effect:
          'O zu pode usar uma ação e gastar 20 PM para ficar no ar até o fim do próximo turno dele, até perder PV por dano de um tipo a que era Vulnerável, ou até fazer Pouso Catastrófico. Enquanto estiver no ar, não pode ser alvo de ataques corpo a corpo que não alcançariam criaturas voadoras. Se deixar de estar no ar durante o turno de outra criatura, perde 30 PV e faz uma ação a menos no próximo turno dele (mínimo de 0 ações).',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições envenenado e lento.' },
      {
        name: 'Plumagem Endurecida',
        effect:
          'Enquanto o zu não estiver em crise, ele reduz em 5 todo dano sofrido por ataques (antes de aplicar as Afinidades).',
      },
    ],
  }),
  creatureGroup({
    name: 'Serpentes',
    page: 260,
    summary:
      'Serpentes grandes e poderosas, que se adaptam às forças elementais da região; as maiores são tratadas como desastres vivos.',
    body: 'Serpentes são comuns em áreas de natureza vasta, longe de cidades e vilas. Em geral grandes e poderosas, todas têm o talento singular de se adaptar às forças elementais e ao ambiente da região. Muitas contam com veneno mortal e pequenas habilidades mágicas, além da força. As que crescem a proporções enormes costumam ser chamadas de “vermes” e tratadas como desastres vivos, capazes de causar tempestades marinhas, terremotos e até erupções vulcânicas.\n\n## Táticas\n\n- Cerastes: Espirais de Escamas de Lava (se nenhum aliado já estiver sob seus efeitos, priorizando aliados em crise) ou Veneno Abrasador ➔ Sopro de Fumaça (se puder) ou Tapa de Cauda ↺\n- Jormungandr: Onda Tóxica (se puder e estiver submerso) ou Sopro de Granizo (se puder) ou Afunda-barcos ➔ Profundezas Tranquilas (se estiver submerso) ou Devora-mundos ➔ Afunda-barcos (se estiver submerso) ou Turbilhão Abissal (se puder) ou Devora-mundos ➔ Espirais Infinitas ↺',
  }),
  creature({
    name: 'Cerastes',
    page: 262,
    summary:
      'Serpente blindada de escamas de lava, territorial e paciente: protege um aliado com suas espirais e sufoca quem ataca com fumaça.',
    originalName: 'Cerastes',
    groupSlug: 'serpentes',
    level: 20,
    species: 'beast',
    rank: 'elite',
    role: 'sentinel',
    villain: false,
    traits: ['blindado', 'escaldante', 'paciente', 'territorial'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 200,
    crisis: 100,
    mp: 70,
    initiative: 10,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      bolt: 'resistant',
      dark: 'vulnerable',
      earth: 'resistant',
      fire: 'resistant',
      ice: 'vulnerable',
    },
    attacks: [
      {
        name: 'Veneno Abrasador',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 15,
        damageType: 'fire',
      },
      {
        name: 'Tapa de Cauda',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect: 'O alvo fica lento.',
      },
    ],
    spells: [
      {
        name: 'Sopro de Fumaça',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect:
          'O cerastes causa (RA + 15) de dano de fogo ao alvo. Criaturas que perdem PV assim não podem fazer a ação Feitiço até o fim do próximo turno delas.',
      },
    ],
    otherActions: [
      {
        name: 'Espirais de Escamas de Lava',
        effect:
          'O cerastes pode usar uma ação para envolver um aliado que veja com suas espirais mágicas. Esse aliado ganha Imunidade a dano de terra e de fogo até o fim da cena, ou até o cerastes perder 20 PV ou mais de uma só vez.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado e envenenado.',
      },
    ],
  }),
  creature({
    name: 'Jormungandr',
    page: 263,
    summary:
      'Grande Serpente do mundo, campeã solitária que alterna entre emergir e submergir e esmaga os Personagens e seu navio com um Relógio de espirais.',
    body: '**Abordagens favoráveis:** raio, terra, fogo, Resistência (físico, gelo, veneno), condições, perda de PM.\n\n**Abordagens desfavoráveis:** ar, gelo, veneno, Defesa alta, ataques e feitiços (enquanto submerso).',
    originalName: 'Jormungandr',
    groupSlug: 'serpentes',
    level: 50,
    species: 'beast',
    rank: 'champion',
    championX: 4,
    role: 'hunter',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['colossal', 'destrutivo', 'obtuso', 'venenoso'],
    attributes: { DES: 12, AST: 8, VIG: 8, VON: 8 },
    hp: 560,
    crisis: 280,
    mp: 200,
    initiative: 14,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      earth: 'vulnerable',
      fire: 'vulnerable',
      ice: 'immune',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Devora-mundos',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 8,
        damage: 20,
        damageType: 'poison',
        effect:
          'Depois que um inimigo perde PV por este ataque, se não estiver em crise, ele também perde 10 PM e não pode fazer ataques livres até o fim do próximo turno dele.',
      },
      {
        name: 'Afunda-barcos',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 8,
        damage: 15,
        damageType: 'physical',
        effect:
          'Enquanto Jormungandr estiver submerso, este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Turbilhão Abissal',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Jormungandr causa 40 de dano de gelo a todo inimigo que veja.',
      },
      {
        name: 'Sopro de Granizo',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 5,
        effect: 'Jormungandr causa (RA + 20) de dano de gelo ao alvo.',
      },
      {
        name: 'Onda Tóxica',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Todo inimigo que Jormungandr veja e esteja em crise fica envenenado.',
      },
    ],
    otherActions: [
      {
        name: 'Espirais Infinitas',
        effect:
          'Jormungandr pode usar uma ação para apertar as espirais. Se estiver submerso, recupera 100 PV e deixa de estar submerso; caso contrário, preenche 1 seção do Relógio Espirais Esmagadoras (veja abaixo).',
      },
      {
        name: 'Profundezas Tranquilas',
        effect:
          'Jormungandr pode usar uma ação para se recuperar de atordoado e abalado; se não se recuperou de nenhum dos dois assim, se recupera de enfurecido; se também não se recuperou de enfurecido assim, recupera 50 PM.',
      },
    ],
    specialRules: [
      {
        name: 'Espirais Esmagadoras',
        effect:
          'Jormungandr entra no conflito com um Relógio de quatro seções, vazio, chamado “Espirais Esmagadoras”. Quando o Relógio fica cheio, Jormungandr causa 999 de dano físico a todo inimigo presente na cena e destrói a plataforma ou embarcação em que os Personagens estavam.',
      },
      {
        name: 'Serpente do Abismo',
        effect:
          'Depois que Jormungandr perde PV, se estiver em crise e não estiver submerso, ele fica submerso. Enquanto submerso, ganha Resistência a dano físico e não pode ser alvo de ataques nem de feitiços.',
      },
    ],
  }),
  creature({
    name: 'Remontador',
    page: 255,
    summary:
      'Máquina de reparo com defeito, que já não distingue máquinas de seres vivos e “conserta” todos à sua maneira.',
    body: '**Rotina:** Recarga Iniciada ➔ Depuração Iniciada ➔ Remontagem Iniciada ↺. Em todas as ações acima, o remontador prioriza aliados construtos, sobretudo os em crise; se não puder fazer a ação listada, faz ERRO!\n\n**Abordagens favoráveis:** raio, luz, Resistência (físico), enfurecido, abalado, perda de PM.\n\n**Abordagens desfavoráveis:** ar, terra, veneno, envenenado.',
    originalName: 'Reassembler',
    level: 30,
    species: 'construct',
    rank: 'soldier',
    role: 'support',
    villain: false,
    traits: ['ávido', 'de vários membros', 'obsessivo', 'imprevisível'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 100,
    crisis: 50,
    mp: 80,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      earth: 'resistant',
      fire: 'resistant',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'ERRO!',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Por Favor, Fique Parado',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'Se este ataque for feito por Remontagem Iniciada, causa 5 de dano extra.',
      },
      {
        name: 'Por Favor, Aguarde',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'bolt',
        effect:
          'Se este ataque foi feito por Depuração Iniciada, o alvo fica atordoado; se foi feito por Recarga Iniciada, o alvo fica lento e fraco.',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Depuração Iniciada',
        effect:
          'O remontador pode usar uma ação e gastar 5 PM para escolher um alvo que veja. Se o alvo for um construto aliado, ele se recupera de todas as condições; caso contrário, o remontador faz um ataque livre com Por Favor, Aguarde contra esse alvo.',
      },
      {
        name: 'Remontagem Iniciada',
        effect:
          'O remontador pode usar uma ação e gastar 10 PM para escolher um alvo que veja. Se o alvo for um construto aliado, ele recupera 50 PV; caso contrário, o remontador faz um ataque livre com Por Favor, Fique Parado contra esse alvo.',
      },
      {
        name: 'Recarga Iniciada',
        effect:
          'O remontador pode usar uma ação e gastar 20 PM para escolher um alvo que veja. Se o alvo for um construto aliado, ele trata a Destreza como um dado maior (até o máximo de d12) até o fim da cena, ou até o remontador fazer Recarga Iniciada de novo; caso contrário, o remontador faz um ataque livre com Por Favor, Aguarde contra esse alvo.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Descarga de Emergência',
        effect:
          'Depois que o remontador chega a 0 PV, ele faz imediatamente uma ação escolhida aleatoriamente entre Depuração Iniciada, Remontagem Iniciada e Recarga Iniciada, ignorando o custo em PM.',
      },
    ],
  }),
  creature({
    name: 'Escarabrutus',
    page: 257,
    summary:
      'Besouro guerreiro que busca a perfeição marcial: agarra adversários com ciclones, os esmaga num abraço de urso-besouro e se endurece com a postura machona.',
    body: '**Rotina:** Abraço de Urso-besouro (se estiver agarrando um ou mais inimigos) ou Postura Machona (se puder e sofrer atordoado, abalado e/ou fraco) ou Guarda (se estiver em crise) ou Ciclone Escaravelho ➔ Atordoador de Carapaça (se estiver agarrando um ou mais inimigos e os PV atuais forem pares) ou Peteleco ↺\n\n**Abordagens favoráveis:** ar, fogo, Resistência (físico, raio, terra), enfurecido, envenenado, lento.\n\n**Abordagens desfavoráveis:** físico, raio, terra, gelo, ataques, feitiços ofensivos.',
    originalName: 'Scarabrutus',
    level: 30,
    species: 'beast',
    rank: 'elite',
    role: 'brute',
    villain: false,
    traits: ['espalhafatoso', 'competitivo', 'machão', 'forte'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 240,
    crisis: 120,
    mp: 80,
    initiative: 10,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      bolt: 'immune',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Ciclone Escaravelho',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'Cada alvo atingido por este ataque fica agarrado pelo escarabrutus até ele fazer Ciclone Escaravelho de novo ou perder PV por dano de um tipo a que seja Vulnerável. Este ataque tem multi (2).',
      },
      {
        name: 'Atordoador de Carapaça',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'bolt',
        effect:
          'Cada alvo atingido por este ataque fica lento. Este ataque tem multi (3). Depois que ele é resolvido, tenha acertado ou não, criaturas agarradas pelo escarabrutus deixam de estar agarradas.',
      },
      {
        name: 'Peteleco',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'earth',
      },
    ],
    spells: [
      {
        name: 'Postura Machona',
        mpCost: '20',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'O escarabrutus se recupera de atordoado, abalado e fraco. Até o feitiço terminar, ele trata o Vigor como um dado maior (até o máximo de d12).',
      },
    ],
    otherActions: [
      {
        name: 'Abraço de Urso-besouro',
        effect:
          'O escarabrutus pode usar uma ação para causar 20 de dano físico a todo inimigo que esteja agarrado por ele.',
      },
    ],
    specialRules: [
      {
        name: 'Luta Limpa',
        effect:
          'O escarabrutus nunca mira com ataques inimigos agarrados (inclusive os agarrados por outros escarabrutus).',
      },
      {
        name: 'Contra-ataque de Mandíbula',
        effect:
          'Quando um inimigo acerta o escarabrutus com um ataque ou feitiço ofensivo (O), se o escarabrutus estiver em Guarda, esse ataque ou feitiço erra o escarabrutus, e ele causa 10 de dano físico a esse inimigo depois que o ataque ou feitiço for resolvido (os demais alvos são atingidos ou errados normalmente).',
      },
      {
        name: 'Carapaça Ondulante',
        effect:
          'Enquanto o escarabrutus não estiver em crise, ele reduz em 5 todo dano físico que sofre (antes de aplicar as Afinidades).',
      },
    ],
  }),
  creature({
    name: 'Sucatoide',
    page: 259,
    summary:
      'Máquina sucateada e fora de controle, que vaga perto de ferros-velhos; solta fumaça tóxica e arrisca a própria lataria para ficar mais ágil.',
    body: '**Rotina:** Autossucata (em rodadas pares, se puder e não estiver em crise) ou Soprador de Fumaça ➔ Raio Derretedor (se puder e estiver em crise) ou Pancada de Sucata ↺\n\n**Abordagens favoráveis:** ar, raio, Resistência (terra, fogo, veneno), condições, recuperação de condições, perda de PM.\n\n**Abordagens desfavoráveis:** terra, veneno, envenenado, ataques livres, feitiços.',
    originalName: 'Scraproid',
    level: 20,
    species: 'construct',
    rank: 'elite',
    role: 'saboteur',
    villain: false,
    traits: ['desajeitado', 'fora de controle', 'enferrujado', 'fedido'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 200,
    crisis: 100,
    mp: 70,
    initiative: 10,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'vulnerable',
      bolt: 'vulnerable',
      earth: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Pancada de Sucata',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'earth',
        effect:
          'Cada alvo atingido por este ataque fica atordoado. Enquanto o sucatoide estiver em crise, este ataque tem multi (2).',
      },
      {
        name: 'Soprador de Fumaça',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'poison',
        effect:
          'O alvo não pode fazer ataques livres nem a ação Feitiço até o fim do próximo turno dele. Este ataque trata a Defesa do alvo como igual ao tamanho atual do dado de Vigor dele.',
      },
    ],
    spells: [
      {
        name: 'Raio Derretedor',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect:
          'O sucatoide causa (RA + 25) de dano de fogo ao alvo, que fica fraco. Depois que o lançamento do feitiço é resolvido, tenha o feitiço acertado ou errado o alvo, o sucatoide causa 10 de dano de fogo a si mesmo.',
      },
    ],
    otherActions: [
      {
        name: 'Autossucata',
        effect:
          'O sucatoide pode usar uma ação e gastar 10 PV para se livrar de algumas peças defeituosas. Se fizer isso, se recupera de todas as condições e trata a Destreza como um dado maior (até o máximo de d12) até o fim do próximo turno dele.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Canos de Escape Frágeis',
        effect:
          'Quando o sucatoide entra em crise pela primeira vez num conflito, perde o bônus de +1 na Defesa e o de +2 na Defesa Mágica, mas toda outra criatura presente na cena fica envenenada.',
      },
    ],
  }),
  creature({
    name: 'Cogumelâmina',
    page: 265,
    summary:
      'Guerreiro fúngico silencioso, mestre da esgrima com espada de madeira endurecida: entra em postura para ignorar Resistências e contra-ataca quem fere seus aliados.',
    body: '**Rotina:** Kata Fúngico (se puder e ainda não estiver sob ele) ou Micélio Agarrador ➔ Lâmina de Madeira de Aço (priorizando inimigos lentos e, entre eles, os afetados por um ou mais feitiços de duração Cena) ↺\n\n**Abordagens favoráveis:** raio, fogo, gelo, Resistência (físico, terra), lento, dissipar efeitos, dano reativo.\n\n**Abordagens desfavoráveis:** ar, terra, atordoado, enfurecido, abalado, feitiços de duração Cena, atacar os aliados do cogumelâmina.',
    originalName: 'Shroomblade',
    level: 30,
    species: 'plant',
    rank: 'elite',
    role: 'sentinel',
    villain: false,
    traits: ['concentrado', 'perspicaz', 'rápido', 'vingativo'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 220,
    crisis: 110,
    mp: 80,
    initiative: 11,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      earth: 'resistant',
      fire: 'vulnerable',
      ice: 'vulnerable',
    },
    attacks: [
      {
        name: 'Lâmina de Madeira de Aço',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
        effect:
          'Se o inimigo estiver lento, ele deixa de ser afetado por todos os feitiços de duração Cena que o afetavam.',
      },
      {
        name: 'Micélio Agarrador',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'earth',
        effect:
          'Cada alvo atingido pelo ataque fica lento. Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Kata Fúngico',
        mpCost: '20',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, a cogumelâmina ganha +3 nos testes de Precisão de ataques corpo a corpo, e o dano desses ataques ignora Resistências.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Esgrimista Valente',
        effect:
          'Depois que um ou mais aliados que a cogumelâmina veja se rendem, ela recupera 10 PV e 10 PM.',
      },
      {
        name: 'Resposta Micelial',
        effect:
          'Depois que um inimigo acerta um aliado da cogumelâmina com um ataque ou feitiço ofensivo (O), se a cogumelâmina estiver sob Kata Fúngico, ela faz Lâmina de Madeira de Aço como ataque livre contra esse inimigo (depois que o ataque ou feitiço for resolvido). Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
      {
        name: 'Queda de Postura',
        effect:
          'No fim do turno da cogumelâmina, se ela perdeu PV durante o turno e estiver sob Kata Fúngico, deixa de estar sob ele.',
      },
    ],
  }),
]);
