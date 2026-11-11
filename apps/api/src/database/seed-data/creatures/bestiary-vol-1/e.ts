import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Jellies a Magnatoad: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1E: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Geleias',
    page: 172,
    summary:
      'Massas gelatinosas semiconscientes, nascidas de material elementar em decomposição, que devoram tudo e se dividem em geleias menores; vão do nível 5 ao 30.',
    body: 'Perigosas apesar da aparência meio boba, as geleias surgem quando grandes quantidades de material com carga elemental apodrecem e se aglutinam, formando uma massa de substância gelatinosa semiconsciente, com pouco pensamento ou motivação além de se alimentar e crescer. Se ninguém as detiver, consomem toda matéria orgânica e elemental que encontram, virando uma massa borbulhante que acaba colapsando e se dividindo em várias geleias menores: começa então um novo ciclo, só que muito mais perigoso.\n\n## Táticas\n\n- Chantilly: Muro de Espuma (se puder e ao menos um aliado não estiver sob Muro de Espuma, mirando um desses aliados aleatoriamente) ou Tapa Cremoso ➔ Cereja do Bolo (se puder e ao menos um aliado não estiver sob Cereja do Bolo, mirando um desses aliados aleatoriamente) ou Tapa Cremoso ➔ Tapa Cremoso ↺\n- Aspicante: Sopro de Pimenta (em rodadas ímpares, se puder, priorizando inimigos não atordoados) ou Dilúvio Picante ➔ Pancada Coçante ↺\n- Geleia Quântica: Ômicron (em rodadas pares, se puder) ou Mordida Paradoxal ➔ Ômega (se puder) ou Mordida Paradoxal ↺\n- Pudim Geiger: Sopro Sulfuroso (se puder e os PV atuais forem pares) ou Pancada Corrosiva ➔ Amorfose (se sofrer três ou mais condições) ou Aumentar Fissão (se não estiver sob Aumentar Fissão) ou Sobrecarga Atômica (se não estiver brilhando) ou Deflagração Radioativa (se puder) ou Pancada Corrosiva ↺',
  }),
  creature({
    name: 'Chantilly',
    page: 174,
    summary:
      'Geleia de chantilly rabugenta e leve, que ergue muros de espuma e dá aos aliados um reforço com cereja no topo.',
    originalName: 'Whipped Cream',
    groupSlug: 'geleias',
    level: 5,
    species: 'elemental',
    rank: 'soldier',
    role: 'support',
    villain: false,
    traits: ['rabugento', 'leve', 'mutável', 'rodopiante'],
    attributes: { DES: 8, AST: 8, VIG: 6, VON: 10 },
    hp: 50,
    crisis: 25,
    mp: 55,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'absorbs',
      bolt: 'vulnerable',
      fire: 'vulnerable',
      ice: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Tapa Cremoso',
        range: 'melee',
        accuracy: 'AST + VON',
        accuracyBonus: 0,
        damage: 5,
        damageType: 'air',
      },
    ],
    spells: [
      {
        name: 'Cereja do Bolo',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, o alvo trata a Vontade como um dado maior (até o máximo de d12) e ganha Resistência a dano de trevas.',
      },
      {
        name: 'Muro de Espuma',
        mpCost: '5 × A',
        target: 'Até três criaturas',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, cada alvo pode tratar a própria Defesa como igual a 12 contra quaisquer efeitos que o mirem. Esse valor sobe para 13 se a chantilly for de nível 20 ou mais, e para 14 se for de nível 40 ou mais.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
    ],
  }),
  creature({
    name: 'Aspicante',
    page: 175,
    summary:
      'Geleia ardente e urticante que queima e atordoa com pimenta, e explode numa chuva de fogo gelatinoso se for derrotada enfurecida.',
    body: '**Abordagens favoráveis:** trevas, terra, gelo, Resistência (fogo), enfurecido, abalado, lento, imunidade (atordoado).\n\n**Abordagens desfavoráveis:** físico, raio, fogo, veneno, envenenado.',
    originalName: 'Aspicante',
    groupSlug: 'geleias',
    level: 10,
    species: 'elemental',
    rank: 'elite',
    role: 'saboteur',
    villain: false,
    traits: ['agressivo', 'escaldante', 'urticante', 'volátil'],
    attributes: { DES: 10, AST: 8, VIG: 6, VON: 8 },
    hp: 100,
    crisis: 50,
    mp: 60,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'resistant',
      bolt: 'resistant',
      dark: 'vulnerable',
      earth: 'vulnerable',
      fire: 'absorbs',
      ice: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Pancada Coçante',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect: 'O alvo perde 10 PM.',
      },
      {
        name: 'Dilúvio Picante',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'fire',
        effect:
          'Enquanto o aspicante estiver enfurecido, este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Sopro de Pimenta',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        effect:
          'O aspicante causa (RA + 15) de dano de fogo ao alvo, que fica atordoado.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Pudim Irritado',
        effect:
          'Depois que o aspicante perde PV por dano de um tipo a que era Vulnerável, ele fica enfurecido.',
      },
      {
        name: 'Explosão Furiosa',
        effect:
          'Depois que o aspicante chega a 0 PV, se estava enfurecido, ele explode numa chuva de fogo gelatinoso, causando 10 de dano de fogo a cada inimigo atordoado presente na cena.',
      },
      {
        name: 'Superfície Pegajosa Escaldante',
        effect:
          'Depois que um inimigo faz um teste resistido contra o aspicante, se esse teste dependeu de contato físico com ele, esse inimigo fica fraco (depois que o teste for resolvido).',
      },
    ],
  }),
  creature({
    name: 'Geleia Quântica',
    page: 176,
    summary:
      'Geleia alienígena e paradoxal, que morde para se recuperar e tira PV ou PM do alvo conforme o nível dele.',
    body: '**Abordagens favoráveis:** luz, Resistência (trevas), atordoado, enfurecido, abalado, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** físico, trevas, gelo, veneno, envenenado, Resistências, Imunidades, Absorções.',
    originalName: 'Quantum Jelly',
    groupSlug: 'geleias',
    level: 20,
    species: 'elemental',
    rank: 'soldier',
    role: 'mage',
    villain: false,
    traits: ['alienígena', 'pesado', 'paradoxal', 'voraz'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 70,
    crisis: 35,
    mp: 70,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      dark: 'immune',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Mordida Paradoxal',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'dark',
        effect:
          'Se os PM atuais da geleia quântica forem menores que 70, ela recupera 10 PM; caso contrário, recupera 10 PV. Este ataque mira a Defesa Mágica.',
      },
    ],
    spells: [
      {
        name: 'Ômega',
        mpCost: '15',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect: 'O alvo perde PV iguais a (20 + metade do nível dele).',
      },
      {
        name: 'Ômicron',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect: 'O alvo perde PM iguais a (20 + metade do nível dele).',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
    ],
  }),
  creature({
    name: 'Pudim Geiger',
    page: 177,
    summary:
      'Pudim gigante e radioativo que se divide sem parar: esquenta o núcleo até brilhar e libera uma deflagração radioativa em área.',
    body: '**Abordagens favoráveis:** trevas, terra, gelo, Resistência (luz, veneno), atordoado, enfurecido, abalado, recuperação de condições, dissipar efeitos, perda de PM.\n\n**Abordagens desfavoráveis:** físico, raio, fogo, luz, veneno, envenenado, lento, fraco, ataques corpo a corpo.',
    originalName: 'Geiger Pudding',
    groupSlug: 'geleias',
    level: 30,
    species: 'elemental',
    rank: 'champion',
    championX: 4,
    role: 'saboteur',
    flags: ['solo'],
    villain: false,
    traits: ['enorme', 'sempre em expansão', 'radioativo', 'lento'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 400,
    crisis: 200,
    mp: 180,
    initiative: 12,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'resistant',
      bolt: 'resistant',
      dark: 'vulnerable',
      earth: 'vulnerable',
      ice: 'vulnerable',
      light: 'immune',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Pancada Corrosiva',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 6,
        damage: 10,
        damageType: 'physical',
        effect:
          'O alvo fica lento. Se já estava lento, em vez disso perde 1 Ponto de Inventário.',
      },
    ],
    spells: [
      {
        name: 'Aumentar Fissão',
        mpCost: '10',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, o pudim trata a Vontade como um dado maior (até o máximo de d12) e ganha Resistência a dano de fogo.',
      },
      {
        name: 'Deflagração Radioativa',
        mpCost: '40',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O pudim causa dano igual a (5 + o tamanho atual do dado de Vontade dele multiplicado por quatro) a todos os inimigos que veja. O tipo desse dano é luz se o pudim não estiver em crise, ou veneno se estiver.',
      },
      {
        name: 'Sopro Sulfuroso',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect: 'O alvo fica atordoado e fraco.',
      },
    ],
    otherActions: [
      {
        name: 'Amorfose',
        effect:
          'O pudim pode usar uma ação para se recuperar de todas as condições.',
      },
      {
        name: 'Sobrecarga Atômica',
        effect:
          'O pudim pode usar uma ação para extrair as barras de contenção e intensificar o calor e a atividade de partículas no núcleo. Se fizer isso, fica brilhando até lançar Deflagração Radioativa.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições envenenado, lento e fraco.',
      },
      {
        name: 'Contador Geiger',
        effect:
          'Depois que um ataque corpo a corpo contra o pudim é resolvido, se o pudim estiver brilhando e o ataque o acertou, o pudim faz um ataque livre com Pancada Corrosiva contra o atacante, tratando o resultado alto (RA) como 0 ao determinar o dano.',
      },
      {
        name: 'Fissão Autodecadente',
        effect:
          'O pudim pode lançar Deflagração Radioativa mesmo sem os PM exigidos. Se fizer isso, perde 50 PV depois que o feitiço for resolvido.',
      },
    ],
  }),
  creatureGroup({
    name: 'Cérbero',
    page: 182,
    summary:
      'Cão de três cabeças que surge onde a morte é iminente: a mandíbula sombria comanda a gélida e a flamejante, que se levantam depois de caídas.',
    body: 'Inúmeras lendas cercam o misterioso Cérbero, quase sempre ligado à morte e ao luto, pintado como arauto da ruína ou guardião do submundo. Os detalhes variam, mas todos concordam: o cão de três cabeças aparece onde a morte é iminente ou persiste. Ele ronda os locais de batalhas ferozes e barra com firmeza a entrada de antigos cemitérios, sejam quais forem as intenções dos intrusos.\n\n## Táticas\n\nEm conjunto, as mandíbulas do Cérbero seguem esta rotina: Mandíbula Sombria: Proteção do Portal da Morte (se puder) ou Mordida Sombria ➔ Mandíbula Gélida: Sopro Glacial (se puder) ou Mordida Gélida ➔ Mandíbula Flamejante: Mordida Flamejante ➔ Mandíbula Sombria: Mordida Sombria ➔ Mandíbula Sombria: Uivo Ecoante (se puder) ou Onda Umbral ↺',
  }),
  creature({
    name: 'Cérbero: Mandíbula Sombria',
    page: 184,
    summary:
      'Mandíbula central e líder do Cérbero: protege o trio com resistências, uiva para abalar e fica vulnerável quando as outras cabeças estão aturdidas.',
    body: '**Abordagens favoráveis:** fogo, gelo, Resistência (trevas), condições, imunidade (abalado, fraco), perda de PM.\n\n**Abordagens desfavoráveis:** físico, ar, trevas.',
    originalName: 'Kerberos (Darkmaw)',
    groupSlug: 'cerbero',
    level: 10,
    species: 'monster',
    rank: 'champion',
    championX: 3,
    role: 'support',
    flags: ['unique'],
    villain: false,
    traits: ['ancestral', 'lúgubre', 'ameaçador', 'firme'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 180,
    crisis: 90,
    mp: 140,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { air: 'resistant', dark: 'resistant', light: 'vulnerable' },
    attacks: [
      {
        name: 'Mordida Sombria',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'dark',
        effect:
          'O alvo fica fraco. Depois que o ataque é resolvido, se errou todos os alvos, a mandíbula gélida e a mandíbula flamejante recuperam 10 PV.',
      },
      {
        name: 'Onda Umbral',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'dark',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Proteção do Portal da Morte',
        mpCost: '10',
        target: 'Especial',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, a mandíbula sombria e todo aliado que ela veja ganham Resistência a dano físico e de trevas. No início do turno da mandíbula sombria, este feitiço termina.',
      },
      {
        name: 'Uivo Ecoante',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Todo inimigo que consiga ouvir a mandíbula sombria fica abalado; os que já estavam abalados perdem 10 PV em vez disso. A mandíbula sombria só pode lançar este feitiço se houver dois ou mais aliados não aturdidos presentes na cena.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Fraqueza Exposta',
        effect:
          'Enquanto a mandíbula gélida estiver aturdida, a mandíbula sombria ganha Vulnerabilidade a dano de gelo; enquanto a mandíbula flamejante estiver aturdida, ganha Vulnerabilidade a dano de fogo.',
      },
      {
        name: 'Cão de Três Cabeças',
        effect:
          'Quando uma ou mais mandíbulas do Cérbero chegam a 0 PV, se pelo menos outra mandíbula tiver PV atuais iguais ou superiores a 2, essas mandíbulas ficam com exatamente 1 PV e aturdidas. Mandíbulas aturdidas não podem recuperar PV, fazer ações nem ataques livres. No fim de cada rodada, cada mandíbula aturdida deixa de estar aturdida e recupera 30 PV.',
      },
    ],
  }),
  creature({
    name: 'Cérbero: Mandíbula Gélida',
    page: 185,
    summary:
      'Cabeça de gelo do Cérbero, faminta de almas: morde com frio e dispara sopros glaciais em até três alvos.',
    originalName: 'Kerberos (Frostmaw)',
    groupSlug: 'cerbero',
    level: 10,
    species: 'monster',
    rank: 'soldier',
    role: 'mage',
    flags: ['part'],
    villain: false,
    traits: ['ancestral', 'frio', 'ameaçador', 'faminto de almas'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 8 },
    hp: 50,
    crisis: 25,
    mp: 60,
    initiative: 9,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: { fire: 'vulnerable', ice: 'absorbs', poison: 'vulnerable' },
    attacks: [
      {
        name: 'Mordida Gélida',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'ice',
        effect:
          'Enquanto a mandíbula sombria estiver em crise, este ataque causa 5 de dano extra. Quando um inimigo perde PV assim, a mandíbula gélida recupera 10 PM.',
      },
    ],
    spells: [
      {
        name: 'Sopro Glacial',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        effect:
          'A mandíbula gélida causa (RA + 15) de dano de gelo a cada alvo atingido por este feitiço.',
      },
    ],
    otherActions: [],
    specialRules: [],
  }),
  creature({
    name: 'Cérbero: Mandíbula Flamejante',
    page: 185,
    summary:
      'Cabeça de fogo do Cérbero, agressiva: morde com chamas e retalia automaticamente quem a ataca corpo a corpo.',
    originalName: 'Kerberos (Pyremaw)',
    groupSlug: 'cerbero',
    level: 10,
    species: 'monster',
    rank: 'soldier',
    role: 'hunter',
    flags: ['part'],
    villain: false,
    traits: ['agressivo', 'ancestral', 'flamejante', 'ameaçador'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 60,
    crisis: 30,
    mp: 40,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { fire: 'absorbs', ice: 'vulnerable', poison: 'vulnerable' },
    attacks: [
      {
        name: 'Mordida Flamejante',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 10,
        damageType: 'fire',
        effect:
          'Enquanto a mandíbula sombria estiver em crise, este ataque causa 5 de dano extra durante o turno da mandíbula flamejante.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Retaliação Flamejante',
        effect:
          'Depois que um inimigo acerta ou erra a mandíbula flamejante com um ataque corpo a corpo, ela faz um ataque livre com Mordida Flamejante (depois que esse ataque for resolvido), mirando um inimigo aleatório (mas priorizando inimigos que não estejam em crise). Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
    ],
  }),
  creatureGroup({
    name: 'Kraken',
    page: 186,
    summary:
      'Monstro marinho de nomes temíveis: uma cabeça inchada e tentáculos viscosos que disparam jatos elementais e esmagam navios.',
    body: 'De Ruína dos Marinheiros a Cria do Abismo, o Kraken tem muitos nomes pelo mundo, e todos inspiram pavor em quem navega. Abundam relatos de tentáculos colossais que sobem das águas escuras, estalando de energia elemental e capazes de esmagar até o galeão mais majestoso. Magos se intrigam com o cérebro dividido em três partes da criatura, e alguns creem que ele faz a magia circular pelo corpo, o que explicaria os jatos de luz abrasadora.\n\n## Táticas\n\nEm batalha, o Kraken surge como uma cabeça inchada e três tentáculos viscosos. Para decidir qual tentáculo age a cada vez na rodada, dê prioridade ao de menos PV atuais; em empate, ao que sofre menos condições.\n- Rodadas ímpares: Cabeça: Spray Gélido (se puder) ou Jato de Tinta ➔ Primeiro tentáculo: Jato Elemental (raio, abalado) ➔ Segundo tentáculo: Pancada Esmagadora ➔ Cabeça: Jato de Tinta ➔ Terceiro tentáculo: Jato Elemental (gelo, lento).\n- Rodadas pares: Cabeça: Retirada Aquática (se estiver em crise) ou Jato de Tinta ➔ Primeiro tentáculo: Pancada Esmagadora ➔ Segundo tentáculo: Jato Elemental (fogo, fraco) ➔ Terceiro tentáculo: Pancada Esmagadora ➔ Cabeça: Canhão Ctônico (se puder e houver dois ou mais alvos válidos, mirando o máximo de inimigos) ou Spray Gélido (se puder) ou Jato de Tinta.',
  }),
  creature({
    name: 'Kraken: Cabeça Inchada',
    page: 189,
    summary:
      'Cabeça gigantesca e sobrenatural do Kraken: borrifa tinta que atordoa, dispara luz ctônica e chama novos tentáculos gastando Pontos de Ultima.',
    body: '**Abordagens favoráveis:** raio, fogo, gelo, Resistência (trevas, gelo, luz), condições, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** trevas, luz, ataques, feitiços ofensivos, focar na cabeça e ignorar os tentáculos.',
    originalName: 'Kraken (Bloated Head)',
    groupSlug: 'kraken',
    level: 20,
    species: 'beast',
    rank: 'champion',
    championX: 2,
    role: 'mage',
    flags: ['unique'],
    villain: true,
    traits: ['aquático', 'sobrenatural', 'maciço', 'voraz'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 140,
    crisis: 70,
    mp: 140,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      bolt: 'vulnerable',
      dark: 'resistant',
      fire: 'vulnerable',
      ice: 'vulnerable',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Jato de Tinta',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'dark',
        effect:
          'Cada alvo atingido fica atordoado. O dano deste ataque ignora Resistências em rodadas ímpares, e o ataque tem multi (2) em rodadas pares.',
      },
    ],
    spells: [
      {
        name: 'Spray Gélido',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'A cabeça causa (RA + 20) de dano de gelo ao alvo, que fica lento.',
      },
      {
        name: 'Canhão Ctônico',
        mpCost: '10 × A',
        target: 'Até quatro criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'A cabeça causa (RA + 15) de dano de luz a cada alvo atingido por este feitiço. Se dois ou mais aliados da cabeça estiverem presentes na cena, o feitiço causa 5 de dano extra.',
      },
    ],
    otherActions: [
      {
        name: 'Retirada Aquática',
        effect:
          'A cabeça pode usar uma ação para mergulhar fundo. Enquanto estiver submersa, não pode ser alvo de ataques nem de feitiços ofensivos (O). A cabeça emerge no início do próximo turno dela, ou se não houver tentáculos na cena.',
      },
    ],
    specialRules: [
      {
        name: 'Sanguessuga Sobrenatural',
        effect:
          'Quando a cabeça perde PV por dano, se esse dano tem tipo e o tipo não é físico nem veneno, ela recupera metade desse valor em PM.',
      },
      {
        name: 'Mais Tentáculos??!!',
        effect:
          'No fim de cada rodada, se a cabeça estiver em crise e/ou houver menos de dois tentáculos na cena, ela deve gastar 1 Ponto de Ultima. Se gastar, novos tentáculos entram na cena até haver exatamente dois.',
      },
    ],
  }),
  creature({
    name: 'Kraken: Tentáculo Viscoso',
    page: 188,
    summary:
      'Tentáculo viscoso do Kraken: esmaga ou dispara jatos elementais que mudam conforme a ordem de ação, e protege a cabeça.',
    body: '**Abordagens favoráveis:** ar, terra, veneno, Resistência (físico, raio, fogo, gelo), lento, fraco, recuperação de condições.\n\n**Abordagens desfavoráveis:** raio, fogo, gelo.',
    originalName: 'Kraken (Slimy Tentacle)',
    groupSlug: 'kraken',
    level: 20,
    species: 'beast',
    rank: 'soldier',
    role: 'sentinel',
    flags: ['part'],
    villain: false,
    traits: ['membro', 'sondador', 'viscoso', 'cruel'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 100,
    crisis: 50,
    mp: 60,
    initiative: 8,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'vulnerable',
      bolt: 'resistant',
      earth: 'vulnerable',
      fire: 'resistant',
      ice: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Pancada Esmagadora',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 15,
        damageType: 'physical',
      },
      {
        name: 'Jato Elemental',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: null,
        effect:
          'O alvo sofre uma condição. O tipo do dano deste ataque e a condição sofrida mudam conforme ele seja feito pelo primeiro, segundo ou terceiro tentáculo a agir na rodada: primeiro (raio, abalado), segundo (fogo, fraco), terceiro (gelo, lento).',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Tentáculos Agarradores',
        effect:
          'Quando o tentáculo faz um teste resistido durante o turno de um inimigo, se estiver tentando impedir que alguém ou algo se liberte do aperto do Kraken, ele ganha +1 para cada tentáculo presente na cena.',
      },
      {
        name: 'Labirinto Viscoso',
        effect:
          'É idêntico ao Poder Proteger do Guardião, mas com usos ilimitados e só pode proteger a cabeça inchada. Apenas um tentáculo por vez pode proteger a cabeça do mesmo perigo.',
      },
    ],
  }),
  creature({
    name: 'Kaiserwurm',
    page: 179,
    summary:
      'Verme-de-areia colossal e territorial, que emerge como uma duna, fede a ponto de enfraquecer quem está perto e invoca tempestades de areia.',
    body: '**Rotina:** Tempestade de Areia (se puder) ou Mandíbulas Babantes ➔ Regurgitação de Souldreg (em rodadas pares, se puder e ao menos dois inimigos estiverem em crise) ou Mandíbulas Babantes ➔ Verme Escavador ➔ Areias Envolventes (se puder) ou Pancada Violenta ↺\n\n**Abordagens favoráveis:** ar, trevas, terra, gelo, Resistência (físico, terra), fraco, imunidade (lento, fraco), perda de PM.\n\n**Abordagens desfavoráveis:** raio, fogo, envenenado, lento, ataques livres, feitiços de duração Cena, símbolos.',
    originalName: 'Kaiserwurm',
    level: 10,
    species: 'beast',
    rank: 'champion',
    championX: 4,
    role: 'saboteur',
    flags: ['solo'],
    villain: true,
    traits: ['veloz', 'gigantesco', 'fedorento', 'territorial'],
    attributes: { DES: 8, AST: 6, VIG: 10, VON: 8 },
    hp: 280,
    crisis: 140,
    mp: 100,
    initiative: 11,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'vulnerable',
      bolt: 'resistant',
      fire: 'resistant',
      ice: 'vulnerable',
    },
    attacks: [
      {
        name: 'Mandíbulas Babantes',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'physical',
        effect: 'O alvo fica fraco.',
      },
      {
        name: 'Pancada Violenta',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Tempestade de Areia',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que o kaiserwurm veja fica lento.',
      },
      {
        name: 'Regurgitação de Souldreg',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Todo inimigo que o kaiserwurm veja e esteja em crise deixa de ser afetado por todos os feitiços de duração Cena que o afetavam. Em seguida, todos os símbolos presentes nesses inimigos são destruídos.',
      },
    ],
    otherActions: [
      {
        name: 'Verme Escavador',
        effect:
          'O kaiserwurm pode usar uma ação para se enterrar parcialmente. Se fizer isso, ganha Resistência a dano físico, perde a Vulnerabilidade a ar e ganha Vulnerabilidade a dano de trevas e de terra. O efeito dura até o kaiserwurm fazer Mandíbulas Babantes ou perder PV por dano de um tipo a que era Vulnerável.',
      },
      {
        name: 'Areias Envolventes',
        effect:
          'O kaiserwurm pode usar uma ação e gastar 20 PM para criar um redemoinho de areia e poeira. Se fizer isso, causa 20 de dano de terra a todo inimigo que veja e esteja lento e/ou fraco. Então, se metade ou mais dos inimigos do kaiserwurm estiverem em crise, ele apaga 1 seção de cada Relógio ligado a escapar da cena ou a atravessar a área.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições envenenado e lento.' },
      {
        name: 'Fluidos Fétidos',
        effect:
          'Enquanto o kaiserwurm estiver presente na cena, inimigos que sofram duas ou mais condições não podem fazer ataques livres.',
      },
    ],
  }),
  creature({
    name: 'Kelpie',
    page: 181,
    summary:
      'Criatura maliciosa de água e plantas com forma de cavalo, que atrai viajantes e os arrasta para a água; o verdadeiro núcleo é pequeno e cristalizado.',
    body: '**Rotina:** Rajada Salobra (se puder) ou Investida Aquática ➔ Correnteza (priorizando inimigos lentos) ↺\n\n**Abordagens favoráveis:** ar, raio, veneno, Resistência (gelo), lento, fraco, imunidade (lento), perda de PM.\n\n**Abordagens desfavoráveis:** gelo, atordoado, enfurecido, abalado, ataques, feitiços.',
    originalName: 'Kelpie',
    level: 10,
    species: 'plant',
    rank: 'soldier',
    role: 'hunter',
    villain: false,
    traits: ['cruel', 'enganoso', 'oportunista', 'isolador'],
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
      ice: 'absorbs',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Investida Aquática',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 5,
        damageType: 'physical',
      },
      {
        name: 'Correnteza',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 10,
        damageType: 'ice',
        effect:
          'Se o alvo estiver lento, ele se recupera de lento; se isso acontecer, o ataque causa 5 de dano extra e o alvo é varrido dos pés e passa a montar o kelpie. Uma criatura deixa de montar o kelpie no fim da cena, quando o kelpie chega a 0 PV ou sai da cena, ou se outra criatura começar a montar o mesmo kelpie.',
      },
    ],
    spells: [
      {
        name: 'Rajada Salobra',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        effect:
          'O kelpie causa (RA + 5) de dano de gelo ao alvo, que fica lento.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Correntes Estranhas',
        effect:
          'Enquanto o kelpie não estiver em crise, inimigos que não o estejam montando não podem mirá-lo com ataques nem feitiços.',
      },
      {
        name: 'Arrastado pelo Kelpie',
        effect:
          'Quando um Personagem Jogador se rende enquanto monta o kelpie, o kelpie e esse Personagem saem da cena: o herói é arrastado e depois se vê sozinho numa caverna semissubmersa (isso conta como a consequência dessa rendição). Apesar do perigo, pode ser uma oportunidade: dizem as lendas que grandes tesouros e segredos perdidos vão parar nos viveiros dos kelpies e são muito difíceis de alcançar sem a “ajuda” deles.',
      },
    ],
  }),
  creature({
    name: 'Magnasapo',
    page: 191,
    summary:
      'Sapo gigante, preguiçoso e barulhento, de língua pegajosa que engole quem chega perto e acaba com indigestão.',
    body: '**Rotina:** Coaxar Pomposo (em rodadas pares, se puder, mirando só um inimigo, a menos que esteja em crise) ou Magnassalto ➔ Língua Pegajosa ↺\n\n**Abordagens favoráveis:** raio, trevas, fogo, Resistência (físico, gelo), condições, briga e armas pesadas.\n\n**Abordagens desfavoráveis:** terra, gelo, lutar perto de água.',
    originalName: 'Magnatoad',
    level: 10,
    species: 'beast',
    rank: 'elite',
    role: 'brute',
    villain: false,
    traits: ['imenso', 'faminto', 'preguiçoso', 'ruidoso'],
    attributes: { DES: 8, AST: 6, VIG: 10, VON: 8 },
    hp: 160,
    crisis: 80,
    mp: 70,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      bolt: 'vulnerable',
      dark: 'vulnerable',
      earth: 'resistant',
      fire: 'vulnerable',
      ice: 'resistant',
    },
    attacks: [
      {
        name: 'Magnassalto',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (2). Depois que ele é resolvido, tenha acertado ou não, se houver água por perto, o magnasapo recupera 10 PM e deixa de estar seco (veja abaixo).',
      },
      {
        name: 'Língua Pegajosa',
        range: 'ranged',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'ice',
        effect:
          'Depois que uma criatura perde PV por este dano, ela é engolida pelo magnasapo até o fim da cena, até o magnasapo ser atingido por um ataque de arma de briga ou pesada, ou até ele perder PV por dano de um tipo a que era Vulnerável.',
      },
    ],
    spells: [
      {
        name: 'Coaxar Pomposo',
        mpCost: '5 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        effect:
          'O magnasapo causa (RA + 5) de dano de terra a cada alvo atingido por este feitiço, e cada alvo atingido também fica abalado.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Pele Úmida',
        effect:
          'Quando o magnasapo sofre dano de fogo, se não estiver seco, esse dano é reduzido em 5 (antes de aplicar as Afinidades) e ele fica seco.',
      },
      {
        name: 'Bochechas Extralargas',
        effect:
          'Criaturas engolidas pelo magnasapo só ouvem e veem o próprio magnasapo e as criaturas que ele engoliu. Em contrapartida, criaturas não engolidas (inclusive o próprio magnasapo) não ouvem nem veem as engolidas.',
      },
      {
        name: 'Indigestão',
        effect:
          'No fim do turno do magnasapo, se todos os Personagens Jogadores estiverem engolidos por ele, cada um deles deixa de ser engolido imediatamente, perde metade dos PV e PM atuais e fica envenenado.',
      },
    ],
  }),
]);
