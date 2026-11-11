import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Pandora//Adsor a Pollendina: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1H: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Pandora//Adsor',
    page: 238,
    summary:
      'Parasita pré-histórico reconstruído por bioengenheiros: uma aberração cnidária gelatinosa que se funde a hospedeiros e traz um apêndice com garras e um hospedeiro torturado.',
    body: 'Encontrado nas profundezas derretidas da Fenda do Carpinteiro, esse ser antigo foi reconstruído artificialmente, a temperatura congelante, por uma equipe de bioengenheiros. Recebeu o nome “Pandora” pelos muitos presentes que supostamente traria, mas se revelou um horror parasita. Saltando de hospedeiro em hospedeiro, essa monstruosidade pré-histórica reúne matéria celular enquanto se prepara para evoluir: um organismo que eclipsará todos os outros.\n\n## Táticas\n\nEm batalha, Pandora//Adsor é representada pela aberração cnidária, acompanhada de um apêndice com garras e de um hospedeiro torturado, criatura incomum sem ataques básicos (sinta-se à vontade para mudar a espécie do hospedeiro conforme quem ou o que Pandora//Adsor tenta fundir a si). Se a aberração cnidária for derrotada, o apêndice some e o hospedeiro é libertado.\n\nRotina: Aberração: Convulsões Horríveis (se puder e o hospedeiro torturado estiver presente) ou Tentáculos Chicoteantes ➔ Apêndice: Varredura Errática (se estiver em crise) ou Dilacerar ➔ Aberração: Compressão de Alma (se puder) ou Contração Mesoglea (se tiver menos de 50 PM) ou Tentáculos Farpados ➔ Hospedeiro: Transferência de Biomassa (se a aberração estiver em crise) ou Contorção Espasmódica ➔ Aberração: Regenerar Apêndice (se estiver em crise e não houver apêndice com garras) ou Lamentos Guturais (se puder e estiver em crise) ou Raio de Pestilência ↺',
  }),
  creature({
    name: 'Pandora//Adsor: Aberração Cnidária',
    page: 241,
    summary:
      'Parasita gelatinoso e alienígena, campeão que se cura por meio do hospedeiro e do apêndice, comprime almas e ruge em ondas de ar.',
    body: '**Abordagens favoráveis:** raio, trevas, fogo, veneno, atordoado, enfurecido, Resistência (ar, luz, veneno), imunidades ou recuperação de condições, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** ar, gelo, luz, fraco, abalado.',
    originalName: 'Pandora//Adsor (Cnidarian Aberration)',
    groupSlug: 'pandora-adsor',
    level: 40,
    species: 'monster',
    rank: 'champion',
    championX: 3,
    role: 'saboteur',
    flags: ['unique'],
    villain: true,
    traits: ['alienígena', 'deformado', 'gelatinoso', 'parasita'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 10 },
    hp: 360,
    crisis: 180,
    mp: 200,
    initiative: 12,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'immune',
      bolt: 'vulnerable',
      dark: 'vulnerable',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'immune',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Tentáculos Farpados',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'physical',
        effect: 'O dano deste ataque ignora Resistências.',
      },
      {
        name: 'Tentáculos Chicoteantes',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'poison',
        effect:
          'Se o alvo sofrer duas ou mais condições, ele não pode fazer ataques livres até o fim do próximo turno dele.',
      },
      {
        name: 'Raio de Pestilência',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'light',
        effect:
          'O alvo fica envenenado. Este ataque trata a Defesa do alvo como igual ao tamanho atual do dado de Vigor dele.',
      },
    ],
    spells: [
      {
        name: 'Lamentos Guturais',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'A aberração causa 30 de dano de ar a todo inimigo que veja. Inimigos que perdem 30 PV ou mais por esse dano ficam atordoados.',
      },
      {
        name: 'Convulsões Horríveis',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que a aberração veja fica abalado.',
      },
      {
        name: 'Compressão de Alma',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        effect:
          'Se o alvo estiver em crise, ele faz 1 ação a menos no próximo turno dele (mínimo de 0 ações). Caso contrário, perde PV iguais ao nível dele.',
      },
    ],
    otherActions: [
      {
        name: 'Contração Mesoglea',
        effect:
          'A aberração pode usar uma ação e gastar 1 Ponto de Ultima para contrair as membranas gelatinosas da parte superior. Se fizer isso, recupera 50 PM, se recupera de todas as condições, destrói todos os símbolos presentes nela e ganha Resistência a dano físico e Vulnerabilidade a dano de terra até o início do próximo turno dela.',
      },
      {
        name: 'Regenerar Apêndice',
        effect:
          'A aberração pode usar uma ação e gastar 1 Ponto de Ultima para fazer um novo apêndice com garras entrar na cena, com 80 PV atuais.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições fraco e abalado.' },
    ],
  }),
  creature({
    name: 'Pandora//Adsor: Apêndice com Garras',
    page: 240,
    summary:
      'Apêndice de garras da aberração cnidária: varre e dilacera, e atrai o ataque de quem já sofre condições.',
    body: '**Abordagens favoráveis:** terra, fogo, Resistência (físico), lento, fraco, recuperação de condições.\n\n**Abordagens desfavoráveis:** físico, raio, trevas, veneno, atordoado, enfurecido, abalado.',
    originalName: 'Pandora//Adsor (Clawed Appendix)',
    groupSlug: 'pandora-adsor',
    level: 40,
    species: 'monster',
    rank: 'soldier',
    role: 'sentinel',
    flags: ['part'],
    villain: false,
    traits: ['grotesco', 'sem mente', 'afiado', 'viscoso'],
    attributes: { DES: 10, AST: 8, VIG: 10, VON: 8 },
    hp: 150,
    crisis: 75,
    mp: 80,
    initiative: 9,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      physical: 'resistant',
      bolt: 'resistant',
      dark: 'resistant',
      earth: 'vulnerable',
      fire: 'vulnerable',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Varredura Errática',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (3). Depois que ele é resolvido, tenha acertado ou não, o apêndice fica Vulnerável a todos os tipos de dano até perder qualquer quantidade de PV (isso substitui as Afinidades básicas dele).',
      },
      {
        name: 'Dilacerar',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'physical',
        effect: 'O alvo fica lento.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Intimidante',
        effect:
          'Inimigos que sofram uma ou mais condições devem incluir o apêndice entre os alvos de seus ataques e feitiços ofensivos (O), se puderem.',
      },
    ],
  }),
  creature({
    name: 'Pandora//Adsor: Hospedeiro Torturado',
    page: 240,
    summary:
      'Humanoide quase morto, engolfado pela aberração, sem ataques básicos: sua biomassa cura a aberração, mas ele pode ser absorvido de vez.',
    originalName: 'Pandora//Adsor (Tortured Host)',
    groupSlug: 'pandora-adsor',
    level: 40,
    species: 'humanoid',
    rank: 'soldier',
    role: 'support',
    villain: false,
    traits: ['quase morto', 'envolto', 'grotesco', 'parasitado'],
    attributes: { DES: 8, AST: 8, VIG: 12, VON: 8 },
    hp: 150,
    crisis: 75,
    mp: 90,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'resistant',
      bolt: 'resistant',
      dark: 'resistant',
      earth: 'resistant',
      fire: 'resistant',
      ice: 'resistant',
      light: 'resistant',
      poison: 'resistant',
    },
    attacks: [],
    spells: [],
    otherActions: [
      {
        name: 'Transferência de Biomassa',
        effect:
          'O hospedeiro pode usar uma ação para fazer a aberração cnidária recuperar 100 PV e se recuperar de envenenado e lento. Em seguida, o hospedeiro perde 30 PV; se chegar a 0 PV assim, é absorvido de vez pela aberração cnidária e não pode mais ser salvo.',
      },
      {
        name: 'Contorção Espasmódica',
        effect:
          'O hospedeiro pode usar uma ação para se contorcer horrivelmente.',
      },
    ],
    specialRules: [],
  }),
  creature({
    name: 'Falange',
    page: 243,
    summary:
      'Tartaruga colossal de casco mineral cravejado de armas quebradas: quase imune a armas comuns, cura a si e aos aliados e fere quem a ataca corpo a corpo.',
    body: '**Rotina:** Cauda Cortante ➔ Brilho de Testudo (se puder e a falange e/ou aliados estiverem em crise) ou Sopro de Cristal (em rodadas ímpares) ou Armas Cravadas ↺\n\n**Abordagens favoráveis:** ar, trevas, veneno, Resistência (físico, terra), condições, perda de PM, armas pesadas e de fogo.\n\n**Abordagens desfavoráveis:** físico, raio, terra, gelo, ataques corpo a corpo, armas que não sejam pesadas nem de fogo.',
    originalName: 'Phalanx',
    level: 20,
    species: 'monster',
    rank: 'elite',
    role: 'support',
    villain: false,
    traits: ['rochoso', 'de movimentos lentos', 'teimoso', 'duro'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 180,
    crisis: 90,
    mp: 70,
    initiative: 10,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      physical: 'resistant',
      air: 'vulnerable',
      bolt: 'resistant',
      dark: 'vulnerable',
      earth: 'resistant',
      ice: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Cauda Cortante',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (2). Depois que um inimigo perde PV assim, se estiver em crise, fica lento.',
      },
      {
        name: 'Armas Cravadas',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
      },
      {
        name: 'Sopro de Cristal',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'earth',
        effect:
          'Enquanto um ou mais aliados que a falange veja estiverem em crise, este ataque causa 5 de dano extra.',
      },
    ],
    spells: [
      {
        name: 'Brilho de Testudo',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'A falange e todo aliado que ela veja recuperam 30 PV. Esse valor sobe para 40 PV se a falange for de nível 40 ou mais.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Adamantina',
        effect:
          'Enquanto a falange não estiver atordoada, enfurecida e/ou lenta, ataques feitos com armas que não pertençam às Categorias pesada e/ou arma de fogo não lhe causam dano.',
      },
      {
        name: 'Resmungo Teimoso',
        effect:
          'Quando a falange entra em crise pela primeira vez numa cena, ela recupera 20 PM e se recupera de envenenado e fraco.',
      },
      {
        name: 'Casco Cravejado de Armas',
        effect:
          'Depois que um inimigo acerta a falange com um ataque corpo a corpo, a falange faz um ataque livre com Armas Cravadas contra esse inimigo (depois que esse ataque for resolvido). Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
    ],
  }),
  creature({
    name: 'Fênix',
    page: 245,
    summary:
      'Guardiã Cardeal do Vulcão do Norte, que encarna a dualidade do fogo, aniquilador e revitalizante; renasce das cinzas uma vez por dia com 200 PV e PM.',
    body: '**Rotina:** Chama Verdadeira (se puder) ou Nuvem de Brasas ➔ Garras em Mergulho ➔ Chama Purificadora (se sofrer duas ou mais condições, tenha ela símbolos ou não) ou Garras em Mergulho ➔ Voo Flamejante (se puder) ou Ascender ↺\n\n**Abordagens favoráveis:** trevas, gelo, Resistência (físico, fogo), enfurecido, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** fogo, luz, veneno, envenenado, ataques corpo a corpo, feitiços de duração Cena, símbolos, abusar de condições.',
    originalName: 'Phoenix',
    level: 40,
    species: 'elemental',
    rank: 'champion',
    championX: 4,
    role: 'mage',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['eterno', 'curioso', 'indecifrável', 'sábio'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 12 },
    hp: 440,
    crisis: 220,
    mp: 200,
    initiative: 13,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      dark: 'vulnerable',
      fire: 'absorbs',
      ice: 'vulnerable',
      light: 'immune',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Garras em Mergulho',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'physical',
      },
      {
        name: 'Nuvem de Brasas',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'fire',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Voo Flamejante',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Fênix causa 35 de dano de fogo a todo inimigo que veja. Todo inimigo que perder 35 PV ou mais por esse dano também fica atordoado.',
      },
      {
        name: 'Chama Verdadeira',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        effect:
          'Fênix causa (RA + 30) de dano de fogo ao alvo. Esse dano não pode ser reduzido por nenhum efeito e também ignora Resistências e Imunidades.',
      },
    ],
    otherActions: [
      {
        name: 'Ascender',
        effect:
          'Fênix pode usar uma ação para subir ao céu. Se fizer isso, não pode ser alvo de ataques corpo a corpo até fazer Garras em Mergulho (independentemente de o Poder Voo estar ativo) e seu próximo ataque com Garras em Mergulho causa 5 de dano extra.',
      },
      {
        name: 'Chama Purificadora',
        effect:
          'Se sofrer duas ou mais condições, Fênix pode usar uma ação para se recuperar de todas as condições e remover todos os símbolos presentes nela. Se estiver em chamas, também recupera 30 PM.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Das Cinzas',
        effect:
          'Quando Fênix chega a 0 PV pela primeira vez a cada dia, em vez disso ela se recupera de todas as condições, destrói todos os símbolos presentes nela, deixa de ser afetada por todos os feitiços de duração Cena que a afetavam, e seus PV e PM atuais passam a ser iguais a 200. Em seguida, fica em chamas até o fim da cena.',
      },
    ],
  }),
  creature({
    name: 'Pollendina',
    page: 247,
    summary:
      'Fungo senciente e gigantesco que reanima cadáveres como fantoches de esporos; cura os mortos-vivos aliados e enfurece quem o ataca corpo a corpo.',
    body: '**Rotina:** Fantoche Fúngico (se puder e ao menos um inimigo estiver enfurecido, mirando um desses inimigos aleatoriamente) ou Fantoche Fúngico (se puder e houver ao menos um aliado morto-vivo, mirando um desses aliados aleatoriamente) ou Tentáculos de Esporos ➔ Tentáculos de Esporos ➔ Esporos Necromânticos (se puder e houver menos de dois aliados na cena) ou Tentáculos de Esporos ↺\n\n**Abordagens favoráveis:** raio, terra, recuperação de condições, perda de PM.\n\n**Abordagens desfavoráveis:** ar, veneno, atordoado, enfurecido, abalado, ataques corpo a corpo.',
    originalName: 'Pollendina',
    level: 10,
    species: 'plant',
    rank: 'champion',
    championX: 3,
    role: 'support',
    villain: true,
    traits: ['sem coração', 'enraizado', 'fedido', 'molenga'],
    attributes: { DES: 6, AST: 8, VIG: 8, VON: 10 },
    hp: 180,
    crisis: 90,
    mp: 140,
    initiative: 10,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      earth: 'vulnerable',
      ice: 'resistant',
    },
    attacks: [
      {
        name: 'Tentáculos de Esporos',
        range: 'melee',
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'poison',
        effect:
          'Se o resultado alto (RA) do teste de Precisão foi 8 ou mais, o alvo fica envenenado.',
      },
    ],
    spells: [
      {
        name: 'Fantoche Fúngico',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Se o alvo for um aliado, ele pode fazer um ataque livre com uma arma equipada (ou com um ataque básico, se for NPC). Se o alvo for um inimigo enfurecido, ele deve fazer um ataque livre com uma arma equipada (ou com um ataque básico, se for NPC) contra um de seus aliados, escolhido aleatoriamente; esse ataque só pode mirar esse aliado.',
      },
    ],
    otherActions: [
      {
        name: 'Esporos Necromânticos',
        effect:
          'A pollendina pode usar uma ação e gastar 20 PM para fazer um morto-vivo soldado de nível 10 entrar na batalha no fim da rodada, com PV atuais iguais ao valor de Crise dele. Criaturas recomendadas: o draugr, o shamblebones e o soldado esquelético (veja o Livro Básico).',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Esporos Enfurecedores',
        effect:
          'Depois que um inimigo acerta a pollendina com um ataque corpo a corpo, esse inimigo fica enfurecido (depois que o ataque for resolvido).',
      },
      {
        name: 'Esporos Mumificantes',
        effect:
          'No fim de cada turno da pollendina, todo aliado morto-vivo presente na cena recupera 10 PV.',
      },
    ],
  }),
]);
