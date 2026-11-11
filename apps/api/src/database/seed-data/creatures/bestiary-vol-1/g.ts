import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Outlaws a Pandemonium 7: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1G: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Foras-da-lei',
    page: 210,
    summary:
      'Gente que vive além do alcance da lei e da coroa: ladrões, mercenários, assassinos e chefes de bandidos; vão do nível 5 ao 40.',
    body: 'Os foras-da-lei vivem além do alcance da lei e da coroa, sobrevivendo pela lâmina, pelo truque e pela astúcia. Vão de batedores de carteira desesperados e mercenários errantes a assassinos desiludidos e chefes de bandidos movidos a zênites. Muitos foram empurrados ao crime pela guerra, pela fome ou pela traição; uns lutam por dinheiro, outros por vingança, e alguns por ideais torcidos pelas dificuldades. Sejam emboscadores em estradas ermas ou mercenários escondidos em tavernas, encarnam a incerteza da confiança num mundo frágil.\n\n## Táticas\n\nO chefe dos bandidos foi pensado para vir com dois soldados ou um aliado elite, que alternam os turnos com ele durante o conflito.\n- Ladrão: Corte Debilitante (se estiver em crise) ou Lâmina de Gatuno ↺\n- Chefe dos Bandidos: Grande Erro! (se puder e ele e/ou algum aliado não estiver sob Grande Erro!, mirando o máximo deles e priorizando aliados) ou Problema em Dobro (se puder) ou Golpe Odioso (se estiver em crise) ou Pistola Explosiva ➔ Peguem-nos!!! (se puder e houver alvo válido) ou Guarda ➔ Adaga Curva (se o bandido fez a ação Guarda no turno anterior) ou Pistola Explosiva ↺\n- Assassino: Névoas Silenciadoras (se invisível) ou Adaga Esvaecente ➔ Glifo Doppler (se puder e ainda não estiver sob ele) ou Lâmina Envenenada ➔ Lâmina Envenenada ↺. No fim de cada turno dele, se estiver sob Glifo Doppler, o assassino faz Faca de Arremesso como ataque livre, priorizando o inimigo com mais PV atuais.\n- Rōnin Desiludida: Passo do Zéfiro (se sofrer três ou mais condições) ou Guarda ➔ Saque Sônico (se fez a ação Guarda no turno anterior) ou Ichimonji ↺',
  }),
  creature({
    name: 'Ladrão',
    page: 212,
    summary:
      'Batedor de carteira covarde e furtivo, que rouba Pontos de Inventário e some quando é ferido.',
    originalName: 'Thief',
    groupSlug: 'foras-da-lei',
    level: 5,
    species: 'humanoid',
    rank: 'soldier',
    role: 'saboteur',
    villain: false,
    traits: ['covarde', 'enganoso', 'furtivo', 'ligeiro'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 50,
    crisis: 25,
    mp: 35,
    initiative: 9,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      dark: 'resistant',
      earth: 'vulnerable',
      fire: 'vulnerable',
      ice: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Lâmina de Gatuno',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 0,
        damage: 5,
        damageType: 'physical',
        effect:
          'O alvo perde 1 Ponto de Inventário. Se não tiver mais Pontos de Inventário, perde 10 zênites.',
      },
      {
        name: 'Corte Debilitante',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 0,
        damage: 5,
        damageType: 'dark',
        effect:
          'O alvo fica fraco. Se já estava fraco, este ataque causa 5 de dano extra.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Ocultação de Emergência',
        effect:
          'Quando o ladrão entra em crise pela primeira vez numa cena, ele fica invisível para todos os inimigos até o início do próximo turno dele.',
      },
      {
        name: 'Talentos de Trapaceiro',
        effect:
          'O ladrão ganha +3 em testes resistidos ligados a acrobacia, enganação e furtividade.',
      },
    ],
  }),
  creature({
    name: 'Chefe dos Bandidos',
    page: 213,
    summary:
      'Líder carismático e cruel de bandidos: ataca em dupla, dá turnos extras aos aliados e odeia quem o fere em crise.',
    body: '**Abordagens favoráveis:** luz, veneno, Resistência (ar, fogo), condições, perda de PM, impedir a ação Poder.\n\n**Abordagens desfavoráveis:** fogo, gelo, ignorar os aliados do líder dos bandidos, falta de cura em vários alvos.',
    originalName: 'Bandit Leader',
    groupSlug: 'foras-da-lei',
    level: 10,
    species: 'humanoid',
    rank: 'champion',
    championX: 3,
    role: 'support',
    villain: true,
    traits: ['carismático', 'cruel', 'astuto', 'vingativo'],
    attributes: { DES: 10, AST: 8, VIG: 6, VON: 8 },
    hp: 180,
    crisis: 90,
    mp: 120,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      fire: 'resistant',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Adaga Curva',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
      },
      {
        name: 'Golpe Odioso',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'air',
        effect:
          'Se o alvo for odiado pelo bandido, este ataque causa 5 de dano extra e o alvo fica fraco; se já estava fraco, o bandido se recupera de todas as condições.',
      },
      {
        name: 'Pistola Explosiva',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'fire',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Grande Erro!',
        mpCost: '5 × A',
        target: 'Até três criaturas',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, cada alvo ganha +1 nos testes de Precisão.',
      },
    ],
    otherActions: [
      {
        name: 'Problema em Dobro',
        effect:
          'O bandido pode usar uma ação e gastar 10 PM para fazer um ataque livre com Adaga Curva. Depois que esse ataque é resolvido, se acertou, o bandido faz um ataque livre com Pistola Explosiva, priorizando inimigos diferentes do que mirou com a Adaga Curva. Nos dois ataques, considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano.',
      },
      {
        name: 'Peguem-nos!!!',
        effect:
          'O bandido pode usar uma ação e gastar 10 PM para escolher um aliado que consiga ouvi-lo e ainda tenha um ou mais turnos a fazer nesta rodada. Esse aliado fará o próximo turno imediatamente depois do bandido. Na primeira vez que esse aliado causar dano nesse turno, causa 10 de dano extra.',
      },
    ],
    specialRules: [
      {
        name: 'Capa e Adaga',
        effect:
          'Depois que o bandido faz a ação Guarda, ele usa a primeira ação disponível do próximo turno para fazer Adaga Curva, mas o ataque causa 5 de dano extra e seu dano ignora Resistências.',
      },
      {
        name: 'Temperamento Odioso',
        effect:
          'Depois que um inimigo que o bandido veja o faz perder PV, se o bandido estiver em crise, esse inimigo se torna odiado até o fim da cena.',
      },
      {
        name: 'Esperteza de Canalha',
        effect:
          'O bandido ganha +3 em testes resistidos ligados a charme e intimidação.',
      },
    ],
  }),
  creature({
    name: 'Assassino',
    page: 214,
    summary:
      'Assassino cauteloso e implacável, invisível enquanto o Relógio de sombras está quase vazio; envenena, silencia e ataca em sequência.',
    body: '**Abordagens favoráveis:** terra, luz, Resistência (físico, trevas, veneno), condições, perda de PM, dissipar efeitos.\n\n**Abordagens desfavoráveis:** trevas, veneno, ação Poder, ação Feitiço, efeitos que exigem visão.',
    originalName: 'Assassin',
    groupSlug: 'foras-da-lei',
    level: 20,
    species: 'humanoid',
    rank: 'champion',
    championX: 3,
    role: 'hunter',
    flags: ['solo'],
    villain: true,
    traits: ['cauteloso', 'ligeiro', 'implacável', 'injusto'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 240,
    crisis: 120,
    mp: 140,
    initiative: 12,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      dark: 'resistant',
      earth: 'vulnerable',
      light: 'vulnerable',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Lâmina Envenenada',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'poison',
        effect: 'Este ataque causa 5 de dano extra a inimigos em crise.',
      },
      {
        name: 'Adaga Esvaecente',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'dark',
        effect: 'O assassino apaga 1 seção do Relógio “Sombras Mortais”.',
      },
      {
        name: 'Névoas Silenciadoras',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 5,
        damage: null,
        damageType: null,
        effect:
          'O alvo não pode fazer as ações Poder e Feitiço até o fim do próximo turno dele.',
      },
      {
        name: 'Faca de Arremesso',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'physical',
        effect:
          'Este ataque causa 5 de dano extra a inimigos que não estejam em crise.',
      },
    ],
    spells: [
      {
        name: 'Glifo Doppler',
        mpCost: '10',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'No fim de cada turno dele, o assassino pode fazer um ataque livre com uma arma equipada ou ataque básico. Depois de dois ataques livres assim, o feitiço termina e o assassino perde 10 PV.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Plano de Contingência',
        effect:
          'Quando um inimigo do assassino preenche ou apaga duas ou mais seções de um Relógio, se o assassino não sofrer nenhuma condição, esse inimigo preenche ou apaga 1 seção a menos desse Relógio (no mínimo 1).',
      },
      {
        name: 'Sombras Mortais',
        effect:
          'O assassino entra em cada conflito com um Relógio de seis seções, vazio, chamado “Sombras Mortais”; enquanto duas ou menos seções desse Relógio estiverem preenchidas, o assassino é invisível para os inimigos.',
      },
    ],
  }),
  creature({
    name: 'Rōnin Desiludida',
    page: 215,
    summary:
      'Espadachim honesta e desiludida, que responde a cada ataque com um corte relâmpago e se livra das condições com um passo veloz.',
    body: '**Abordagens favoráveis:** raio, veneno, Resistência (ar), condições, dano que não vem de ataques nem de feitiços.\n\n**Abordagens desfavoráveis:** ar, luz, ataques, feitiços ofensivos, dano em um só alvo, impedir a ação Guarda.',
    originalName: 'Jaded Rōnin',
    groupSlug: 'foras-da-lei',
    level: 40,
    species: 'humanoid',
    rank: 'elite',
    role: 'hunter',
    villain: true,
    traits: ['honesto', 'desiludido', 'ligeiro', 'desconfiado'],
    attributes: { DES: 12, AST: 8, VIG: 8, VON: 8 },
    hp: 240,
    crisis: 120,
    mp: 80,
    initiative: 12,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      light: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Ichimonji',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 7,
        damage: 20,
        damageType: 'physical',
        effect:
          'Este ataque causa 5 de dano extra a inimigos sem armadura marcial e sem escudo equipado, e todo o dano dele ignora Resistências. Durante turnos de outras criaturas, este ataque pode mirar criaturas que normalmente não poderiam ser alvo de ataques corpo a corpo.',
      },
      {
        name: 'Passo do Zéfiro',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 7,
        damage: 15,
        damageType: 'air',
        effect: 'A rōnin se recupera de todas as condições.',
      },
      {
        name: 'Saque Sônico',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 7,
        damage: 15,
        damageType: 'air',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Raízes Dançantes',
        effect:
          'A rōnin ganha Resistência a dano de todos os tipos causado por fontes que só causam dano a ela.',
      },
      {
        name: 'Folhas Caindo',
        effect:
          'Depois que um inimigo acerta ou erra a rōnin com um ataque ou feitiço ofensivo (O), a rōnin faz um ataque livre com Ichimonji contra esse inimigo (depois que o ataque ou feitiço for resolvido). Se a rōnin sofrer duas ou mais condições, considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
    ],
  }),
  creatureGroup({
    name: 'Abadom e Leviatã',
    page: 224,
    summary:
      'As irmãs da Ira e da Inveja (números 2 e 3 do Pandemonium 7): Abadom monta em Leviatã como num trono e as duas agem em dupla.',
    body: 'Pandemonium 7, números 2 e 3.\n\nEntre os primeiros demônios a vagar pelo mundo, Abadom e Leviatã são irmãs forjadas na contradição: gelo e fogo, astúcia e brutalidade, provocação calculista e inveja violenta. A relação está longe de ser igual: Leviatã é o peão ideal, brutal e transbordando de frustrações, enquanto Abadom nada ama mais que endurecer corações e empurrar as pessoas à brutalidade desumana, a começar pela querida irmã. Por mais desprezível que seja esse laço, ele espelha a dinâmica demagógica que acendeu incontáveis guerras ao longo da história. É por essa ressonância que as irmãs da Ira e da Inveja prosperam há milênios, atiçando o ódio para prolongar a própria existência e ampliar sua influência demoníaca.\n\n## Táticas\n\nEm batalha, Leviatã serve de trono e montaria para Abadom. Juntas, seguem estas rotinas.\n- Rodadas ímpares: Leviatã: Barragem Serpentina ➔ Abadom: Espelho (se puder e Leviatã estiver presente e não sob Espelho, mirando Leviatã) ou Espelho (se puder e Leviatã não estiver presente, e só se a própria Abadom não estiver sob Espelho, mirando a si mesma) ou Ventos de Guerra ➔ Leviatã: Olho Rubro (se puder) ou Devorador Escancarado ➔ Abadom: Destino Estígio (se puder e estiver em crise) ou Onda Estígia (se puder) ou Gafanhotos Devoradores ➔ Leviatã: Devorador Escancarado ↺\n- Rodadas pares: Leviatã: Barragem Serpentina ➔ Abadom: Ódio Nublante (se puder e Leviatã e/ou dois ou mais inimigos não estiverem enfurecidos) ou Ventos de Guerra ➔ Leviatã: Olho Rubro (se puder) ou Devorador Escancarado ➔ Abadom: Destino Estígio (se puder e estiver em crise) ou Onda Estígia (se puder) ou Gafanhotos Devoradores ➔ Leviatã: Devorador Escancarado ↺',
  }),
  creature({
    name: 'Abadom da Ira',
    page: 226,
    summary:
      'Irmã da Ira (Pandemonium 7, nº 2): fria e calculista, enfurece a cena inteira para curar os raivosos e congelar os calmos.',
    body: '**Abordagens favoráveis:** raio, gelo, Resistência (ar, gelo), atordoado, lento, fraco, efeitos que removem enfurecido.\n\n**Abordagens desfavoráveis:** ar, luz, enfurecido, abalado, feitiços ofensivos.',
    originalName: 'Abaddon of Wrath',
    groupSlug: 'abadom-e-leviata',
    level: 40,
    species: 'demon',
    rank: 'champion',
    championX: 2,
    role: 'support',
    flags: ['unique'],
    villain: true,
    traits: ['cruel', 'manipulador', 'planejador', 'pragmático'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 10 },
    hp: 280,
    crisis: 140,
    mp: 200,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      ice: 'vulnerable',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Gafanhotos Devoradores',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'dark',
        effect:
          'Depois que um inimigo perde PV por este dano, se ele ficar em crise, Abadom recupera 200 PM e se recupera de todas as condições.',
      },
      {
        name: 'Ventos de Guerra',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'air',
        effect:
          'Este ataque mira a Defesa Mágica. Depois que ele é resolvido, tenha acertado ou não, se foi feito durante o turno de Abadom e Leviatã ainda tem um ou mais turnos a fazer nesta rodada, Leviatã fará o próximo turno imediatamente depois do fim deste.',
      },
    ],
    spells: [
      {
        name: 'Ódio Nublante',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Toda criatura presente na cena, exceto Abadom, fica enfurecida.',
      },
      {
        name: 'Espelho',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, quando o alvo é mirado por um feitiço ofensivo (O), a criatura que lançou esse feitiço será mirada no lugar dele (os demais alvos do feitiço ofensivo serão mirados normalmente). Quando isso acontece, este feitiço termina.',
      },
      {
        name: 'Destino Estígio',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Abadom causa 30 de dano de gelo a todo inimigo que veja e esteja enfurecido; depois, recupera PV iguais à metade da perda total de PV sofrida assim.',
      },
    ],
    otherActions: [
      {
        name: 'Onda Estígia',
        effect:
          'Abadom pode usar uma ação e gastar 30 PM para fazer toda criatura que veja e esteja enfurecida recuperar 40 PV. Depois, causa 40 de dano de gelo a todo inimigo que veja e não esteja enfurecido.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido e abalado.',
      },
      {
        name: 'Voz da Discórdia',
        effect:
          'Depois que um ou mais inimigos fazem um teste resistido ou um teste em grupo na presença de Abadom, o inimigo (ou inimigos) com o maior resultado alto fica enfurecido e não pode gastar Pontos de Fabula até se recuperar de enfurecido.',
      },
    ],
  }),
  creature({
    name: 'Leviatã da Inveja',
    page: 227,
    summary:
      'Irmã da Inveja (Pandemonium 7, nº 3): trono e montaria de Abadom, queima quem recebe ajuda dos aliados e age por inveja.',
    body: '**Abordagens favoráveis:** terra, fogo, Resistência (físico, fogo), atordoado, lento, fraco, imunidade (abalado).\n\n**Abordagens desfavoráveis:** físico, gelo, enfurecido, envenenado, abalado, ataques corpo a corpo, feitiços de duração Cena.',
    originalName: 'Leviathan of Envy',
    groupSlug: 'abadom-e-leviata',
    level: 40,
    species: 'demon',
    rank: 'champion',
    championX: 3,
    role: 'sentinel',
    flags: ['unique'],
    villain: true,
    traits: ['ingênuo', 'ciumento', 'ressentido', 'irracional'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 10 },
    hp: 390,
    crisis: 195,
    mp: 200,
    initiative: 11,
    defense: { value: 4, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'resistant',
      earth: 'vulnerable',
      fire: 'vulnerable',
      ice: 'resistant',
    },
    attacks: [
      {
        name: 'Devorador Escancarado',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'physical',
        effect:
          'Se o alvo estiver abalado e afetado por um ou mais feitiços de duração Cena, ele deixa de ser afetado por eles.',
      },
      {
        name: 'Barragem Serpentina',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'fire',
        effect: 'Cada alvo atingido fica abalado. Este ataque tem multi (2).',
      },
      {
        name: 'Orbe Flamejante',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: null,
        damageType: null,
        effect:
          'Causa 10 de dano de fogo. Se este ataque atingir um inimigo invejado, Leviatã se recupera de todas as condições exceto enfurecido.',
      },
    ],
    spells: [
      {
        name: 'Olho Rubro',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 4,
        effect: 'Leviatã causa (RA + 20) de dano de fogo ao alvo.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições envenenado e abalado.',
      },
      {
        name: 'Olhar Ciumento',
        effect:
          'Quando um Personagem Jogador lança um feitiço de duração Cena em um ou mais aliados dele, e/ou faz um ou mais aliados recuperarem PV, recuperarem PM e/ou se recuperarem de condições, cada um desses aliados se torna invejado até o fim da cena. Criaturas também deixam de ser invejadas ao perder qualquer quantidade de PV.',
      },
      {
        name: 'Inveja Abrasadora',
        effect:
          'No fim do turno de cada Personagem Jogador invejado, se Leviatã estiver enfurecida ou se Abadom não estiver presente na cena, ela faz um ataque livre com Orbe Flamejante contra esse Personagem (se puder).',
      },
      {
        name: 'Trono da Ira',
        effect:
          'Enquanto Leviatã não estiver em crise, Abadom não pode ser alvo de ataques corpo a corpo e os PV atuais dela não podem ser reduzidos abaixo de 1.',
      },
      {
        name: 'Emoção Incontrolada',
        effect:
          'Enquanto Abadom não estiver presente na cena, Leviatã sempre gasta Pontos de Ultima para rolar testes de novo de modo a atingir o máximo de alvos com ataques e feitiços ofensivos (O), e nunca os usa para fugir ou se recuperar.',
      },
    ],
  }),
  creatureGroup({
    name: 'Verdadeiro Demiurgo Samael (grupo)',
    slug: 'verdadeiro-demiurgo-samael-grupo',
    page: 230,
    summary:
      'O chefe final do Pandemonium 7: Samael fundiu os domínios dos outros demônios numa forma dourada e invoca, aos poucos, os seis mundos do Pandemonium; o combate foi feito para ser quebrado.',
    body: 'Pandemonium 7, Falso Deus do Pandemonium.\n\nSolitário e atormentado mesmo na ascensão à falsa divindade, Samael tomou as essências dos outros membros do Pandemonium e fundiu seus domínios metafísicos numa forma dourada. Cravando as garras no fluxo de almas, o Demiurgo anseia por um mundo de ordem e obediência absolutas, onde dúvidas e inseguranças não o assombrem mais... pois ninguém mais poderá pronunciá-las.\n\n## Táticas\n\nO Demiurgo entra na batalha sozinho, mas aos poucos invoca mundos do Pandemonium para a cena. A menos que os Personagens Jogadores derrubem os mundos com eficiência ou impeçam o Demiurgo de usar Genesis Mundi, a economia de ações pende sem piedade a favor dele. Ao mesmo tempo, os mundos impõem Vulnerabilidades exploráveis ao Demiurgo. Isso, somado aos PV e PM absurdos do chefe e às suas habilidades, faz deste um combate feito para ser quebrado: não há espaço para jogo justo diante do tirano supremo!\n\nA cada rodada, o Demiurgo faz seus três turnos o quanto antes; depois agem os mundos do Pandemonium presentes, numa ordem que espelha os números dos outros membros do Pandemonium 7: Ira, Inveja, Preguiça, Ganância, Gula e, por fim, Luxúria. Os mundos sempre fazem a ação “Pandemônica” se puderem; se não puderem, fazem “Delírios Condenados”. Na primeira rodada não há mundos presentes para agir.\n\nAs táticas do Demiurgo mudam ao longo do conflito, refletindo a ascensão delirante de Samael ao poder eterno: do inferno, passando pelo purgatório, até o paraíso.\n- Primeira rodada (Inferno): Correntes do Cocito (se puder) ou Olhar Indignado ➔ Tapa Ressentido ➔ Genesis Mundi (se puder, invocando Ira e Inveja) ou Olhar Indignado ↺\n- Segunda rodada (Purgatório): Agarre do Purgatório ➔ Tapa Ressentido ➔ Genesis Mundi (se puder, invocando Ganância e Luxúria) ou Olhar Indignado ↺\n- Terceira rodada em diante (Paraíso): Correntes do Cocito (se puder e os PV atuais forem ímpares) ou Agarre do Purgatório ➔ Celestia Colapsante (se puder) ou Tapa Ressentido ➔ Genesis Mundi (se puder e houver menos de cinco mundos do Pandemonium presentes, invocando dois mundos diferentes, escolhidos aleatoriamente entre os que não estão presentes) ou Olhar Indignado ↺\n\n## Ajustes\n\n- Comunique abertamente as mudanças de Afinidade do Demiurgo, como a mensagem de tutorial de um videogame: “O Mundo da Ira enche o Demiurgo de fraqueza a gelo!”\n- Se os heróis tiverem reunido artefatos feitos para proteger o fluxo de almas, ou o favor de aliados metafísicos poderosos, esses objetos e entidades podem ajudar de várias formas: impedir que Personagens Jogadores cheguem a 0 PV, destruir um Mundo antitético à sua natureza elemental, curar todos os heróis etc. Cada artefato ou aliado só deve ajudar uma vez, para não banalizar a experiência.\n- Regra opcional: “Quando o Demiurgo faz uma ou mais criaturas perderem PV, se estiver em crise, qualquer Personagem Jogador pode gastar todos os Pontos de Fabula restantes para que essas criaturas não percam PV.” Ela deve ser comunicada abertamente e, na prática, melhora as chances dos heróis desde que derrotem mundos.\n\n## Final ruim?\n\nSe todos os Personagens Jogadores caírem diante do Demiurgo, não entre em pânico: há muito potencial dramático. Primeiro, veja se alguém quer Sacrificar o personagem; como é o fim da campanha, é razoável que esse sacrifício restaure todos os aliados caídos a PV e PM máximos e os cure de todas as condições. Se ninguém restar de pé, é hora de um “falso final”: o grupo é banido para a Dimensão do Esquecimento, o Mundo Reverso ou uma paisagem de miragem onde está cercado de tudo o que deseja. Isso também revela que o Demiurgo ainda é relativamente impotente, já que não pôde destruí-los de verdade. Agora os heróis precisam descobrir como se libertar e enfrentá-lo de novo, com o que aprenderam na primeira tentativa. Se parecer difícil demais, ajuste a dificuldade como descrito acima.',
  }),
  creature({
    name: 'Samael, o Verdadeiro Demiurgo',
    page: 233,
    summary:
      'Falso deus do Pandemonium, com 999 PV e PM: três turnos por rodada, invoca mundos que lhe dão Vulnerabilidades e se recupera ao chegar a 666 PV.',
    originalName: 'True Demiurge Samael',
    groupSlug: 'verdadeiro-demiurgo-samael-grupo',
    level: 60,
    species: 'demon',
    rank: 'champion',
    championX: 3,
    flags: ['unique'],
    villain: true,
    traits: ['arrogante', 'iludido', 'dissimulado', 'egoísta'],
    attributes: { DES: 10, AST: 10, VIG: 10, VON: 10 },
    hp: 999,
    crisis: 499,
    mp: 999,
    initiative: 13,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'immune',
      bolt: 'immune',
      dark: 'immune',
      earth: 'immune',
      fire: 'immune',
      ice: 'immune',
      light: 'immune',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Agarre do Purgatório',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 6,
        damage: 20,
        damageType: 'physical',
        effect:
          'Depois que o ataque é resolvido, se acertou, tanto o alvo quanto o Demiurgo deixam de ser afetados por todos os feitiços de duração Cena que os afetavam, e todos os símbolos presentes no alvo e/ou no Demiurgo são destruídos. Este ataque pode mirar criaturas que normalmente não poderiam ser alvo de ataques corpo a corpo.',
      },
      {
        name: 'Tapa Ressentido',
        range: 'melee',
        accuracy: 'VIG + VON',
        accuracyBonus: 6,
        damage: 20,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Olhar Indignado',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 6,
        damage: null,
        damageType: null,
        effect:
          'O alvo fica atordoado, enfurecido, envenenado, abalado, lento e fraco. Este ataque mira a Defesa Mágica.',
      },
    ],
    spells: [
      {
        name: 'Correntes do Cocito',
        mpCost: '10 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 6,
        effect:
          'O Demiurgo causa (RA + 25) de dano de trevas a todo alvo atingido por este feitiço, e eles ficam lentos.',
      },
      {
        name: 'Celestia Colapsante',
        mpCost: '30',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 6,
        effect:
          'Se o alvo não for campeão nem Vilão, ele perde metade dos PV atuais.',
      },
    ],
    otherActions: [
      {
        name: 'Genesis Mundi',
        effect:
          'O Demiurgo pode usar uma ação e gastar 1 Ponto de Ultima para materializar dois mundos do Pandemonium (veja Táticas para saber quais). Esses mundos sempre entram na cena no fim da rodada atual.',
      },
    ],
    specialRules: [
      {
        name: 'Só Eu Sou Eterno',
        effect:
          'Quando os PV atuais do Demiurgo ficam iguais ou menores que 666 pela primeira vez num conflito, todos os mundos presentes na cena são destruídos. Em seguida, o Demiurgo se recupera de todas as condições e recupera 50 PV por mundo destruído assim.',
      },
      {
        name: 'Fraqueza Pecaminosa',
        effect:
          'Enquanto mundos específicos estiverem presentes na cena, algumas Imunidades básicas do Demiurgo são substituídas por Vulnerabilidades: Inveja (fogo), Gula (veneno), Ganância (terra), Luxúria (ar), Preguiça (trevas) e Ira (gelo).',
      },
      {
        name: 'Mundos Sem Futuro',
        effect:
          'Depois que um mundo é destruído por Só Eu Sou Eterno ou reduzido a 0 PV, ele deixa de existir. Então, toda criatura presente na cena que não seja um mundo recupera 50 PM, e cada Personagem Jogador ganha 1 Ponto de Fabula.',
      },
    ],
  }),
  creature({
    name: 'Demiurgo: Mundo da Ira',
    page: 236,
    summary:
      'Mundo do Pandemonium invocado pelo Demiurgo, imóvel e condenado: causa dano de gelo a todos os inimigos e dá ao Demiurgo uma Vulnerabilidade.',
    originalName: 'True Demiurge Samael (World of Wrath)',
    groupSlug: 'verdadeiro-demiurgo-samael-grupo',
    level: 60,
    species: 'demon',
    rank: 'soldier',
    villain: false,
    traits: ['azul-vivo', 'condenado', 'inanimado', 'passivo'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 12 },
    hp: 200,
    crisis: 100,
    mp: 130,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'vulnerable',
      bolt: 'resistant',
      dark: 'resistant',
      earth: 'vulnerable',
      fire: 'vulnerable',
      ice: 'absorbs',
      light: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [],
    spells: [
      {
        name: 'Pandemônica Ira',
        mpCost: '10',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O mundo da Ira causa 20 de dano de gelo a todo inimigo que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Delírios Condenados',
        effect: 'O mundo da Ira pode usar uma ação para perder 50 PV.',
      },
    ],
    specialRules: [],
  }),
  creature({
    name: 'Demiurgo: Mundo da Inveja',
    page: 234,
    summary:
      'Mundo do Pandemonium invocado pelo Demiurgo, imóvel e condenado: causa dano de fogo a todos os inimigos e dá ao Demiurgo uma Vulnerabilidade.',
    originalName: 'True Demiurge Samael (World of Envy)',
    groupSlug: 'verdadeiro-demiurgo-samael-grupo',
    level: 60,
    species: 'demon',
    rank: 'soldier',
    villain: false,
    traits: ['vermelho-vivo', 'condenado', 'inanimado', 'passivo'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 12 },
    hp: 200,
    crisis: 100,
    mp: 130,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'vulnerable',
      air: 'resistant',
      bolt: 'resistant',
      dark: 'resistant',
      earth: 'resistant',
      fire: 'absorbs',
      ice: 'vulnerable',
      light: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [],
    spells: [
      {
        name: 'Pandemônica Inveja',
        mpCost: '10',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O mundo da Inveja causa 20 de dano de fogo a todo inimigo que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Delírios Condenados',
        effect: 'O mundo da Inveja pode usar uma ação para perder 50 PV.',
      },
    ],
    specialRules: [],
  }),
  creature({
    name: 'Demiurgo: Mundo da Preguiça',
    page: 236,
    summary:
      'Mundo do Pandemonium invocado pelo Demiurgo, imóvel e condenado: causa dano de trevas a todos os inimigos e dá ao Demiurgo uma Vulnerabilidade.',
    originalName: 'True Demiurge Samael (World of Sloth)',
    groupSlug: 'verdadeiro-demiurgo-samael-grupo',
    level: 60,
    species: 'demon',
    rank: 'soldier',
    villain: false,
    traits: ['sem luz', 'condenado', 'inanimado', 'passivo'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 12 },
    hp: 200,
    crisis: 100,
    mp: 130,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'vulnerable',
      bolt: 'vulnerable',
      dark: 'absorbs',
      earth: 'resistant',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'resistant',
    },
    attacks: [],
    spells: [
      {
        name: 'Pandemônica Preguiça',
        mpCost: '10',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O mundo da Preguiça causa 20 de dano de trevas a todo inimigo que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Delírios Condenados',
        effect: 'O mundo da Preguiça pode usar uma ação para perder 50 PV.',
      },
    ],
    specialRules: [],
  }),
  creature({
    name: 'Demiurgo: Mundo da Ganância',
    page: 235,
    summary:
      'Mundo do Pandemonium invocado pelo Demiurgo, imóvel e condenado: causa dano de terra a todos os inimigos e dá ao Demiurgo uma Vulnerabilidade.',
    originalName: 'True Demiurge Samael (World of Greed)',
    groupSlug: 'verdadeiro-demiurgo-samael-grupo',
    level: 60,
    species: 'demon',
    rank: 'soldier',
    villain: false,
    traits: ['amarelo-vivo', 'condenado', 'inanimado', 'passivo'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 12 },
    hp: 200,
    crisis: 100,
    mp: 130,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'vulnerable',
      air: 'vulnerable',
      bolt: 'resistant',
      dark: 'resistant',
      earth: 'absorbs',
      fire: 'resistant',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [],
    spells: [
      {
        name: 'Pandemônica Ganância',
        mpCost: '10',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O mundo da Ganância causa 20 de dano de terra a todo inimigo que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Delírios Condenados',
        effect: 'O mundo da Ganância pode usar uma ação para perder 50 PV.',
      },
    ],
    specialRules: [],
  }),
  creature({
    name: 'Demiurgo: Mundo da Gula',
    page: 234,
    summary:
      'Mundo do Pandemonium invocado pelo Demiurgo, imóvel e condenado: causa dano de veneno a todos os inimigos e dá ao Demiurgo uma Vulnerabilidade.',
    originalName: 'True Demiurge Samael (World of Gluttony)',
    groupSlug: 'verdadeiro-demiurgo-samael-grupo',
    level: 60,
    species: 'demon',
    rank: 'soldier',
    villain: false,
    traits: ['roxo-vivo', 'condenado', 'inanimado', 'passivo'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 12 },
    hp: 200,
    crisis: 100,
    mp: 130,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'vulnerable',
      air: 'resistant',
      bolt: 'vulnerable',
      dark: 'vulnerable',
      earth: 'resistant',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'resistant',
      poison: 'absorbs',
    },
    attacks: [],
    spells: [
      {
        name: 'Pandemônica Gula',
        mpCost: '10',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O mundo da Gula causa 20 de dano de veneno a todo inimigo que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Delírios Condenados',
        effect: 'O mundo da Gula pode usar uma ação para perder 50 PV.',
      },
    ],
    specialRules: [],
  }),
  creature({
    name: 'Demiurgo: Mundo da Luxúria',
    page: 235,
    summary:
      'Mundo do Pandemonium invocado pelo Demiurgo, imóvel e condenado: causa dano de ar a todos os inimigos e dá ao Demiurgo uma Vulnerabilidade.',
    originalName: 'True Demiurge Samael (World of Lust)',
    groupSlug: 'verdadeiro-demiurgo-samael-grupo',
    level: 60,
    species: 'demon',
    rank: 'soldier',
    villain: false,
    traits: ['verde-vivo', 'condenado', 'inanimado', 'passivo'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 12 },
    hp: 200,
    crisis: 100,
    mp: 130,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'absorbs',
      bolt: 'vulnerable',
      dark: 'vulnerable',
      earth: 'vulnerable',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'resistant',
      poison: 'resistant',
    },
    attacks: [],
    spells: [
      {
        name: 'Pandemônica Luxúria',
        mpCost: '10',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O mundo da Luxúria causa 20 de dano de ar a todo inimigo que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Delírios Condenados',
        effect: 'O mundo da Luxúria pode usar uma ação para perder 50 PV.',
      },
    ],
    specialRules: [],
  }),
  creature({
    name: 'Asmodeu da Luxúria',
    page: 217,
    summary:
      'Sétimo e menor dos líderes do Pandemonium 7: teatral e vingativo, alterna a pose entre imune a ataques corpo a corpo e imune a tudo menos a eles.',
    body: '**Rotina:** Revele Seus Desejos ➔ A Luxúria Voa nas Asas da Turbulência! ➔ Arranque Seu Eu Interior ➔ Que Hipocrisia Patética! (se puder) ou A Luxúria Voa nas Asas da Turbulência! ↺\n\n**Abordagens favoráveis:** físico, ar, Resistência (físico, trevas, ar), enfurecido, lento.\n\n**Abordagens desfavoráveis:** raio, terra, Defesas altas, atordoado.',
    originalName: 'Asmodeus of Lust',
    level: 20,
    species: 'demon',
    rank: 'champion',
    championX: 4,
    role: 'hunter',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['cruel', 'inseguro', 'dramático demais', 'vingativo'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 320,
    crisis: 160,
    mp: 120,
    initiative: 13,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: { air: 'vulnerable', bolt: 'resistant', earth: 'resistant' },
    attacks: [
      {
        name: 'Revele Seus Desejos',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'dark',
        effect:
          'Toda criatura presente na cena por quem o alvo tenha um Laço perde 5 PV.',
      },
      {
        name: 'Arranque Seu Eu Interior',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'physical',
        effect:
          'Se o alvo perder PV por este ataque e Asmodeu estiver atordoado, ele recupera 10 PV e se recupera de todas as condições.',
      },
      {
        name: 'A Luxúria Voa nas Asas da Turbulência!',
        range: 'ranged',
        accuracy: 'DES + DES',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'air',
        effect:
          'Este ataque tem multi (2). Depois que ele é resolvido, tenha acertado ou não, Asmodeu ganha Vulnerabilidade a dano físico até o início do próximo turno dele.',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Que Hipocrisia Patética!',
        effect:
          'Asmodeu pode usar uma ação e gastar 20 PM para escolher aleatoriamente um Personagem Jogador desprezado presente na cena. Se fizer isso, esse personagem perde 30 PV e fica atordoado; se nenhum Personagem Jogador estiver desprezado, Asmodeu fica atordoado. Este efeito não pode reduzir os PV atuais de um Personagem Jogador abaixo de 1.',
      },
    ],
    specialRules: [
      {
        name: 'Desdém Caprichoso',
        effect:
          'Quando um inimigo evoca um Laço que inclua admiração, afeto e/ou lealdade, evoca um Tema de Esperança, Justiça ou Misericórdia, ou faz Asmodeu perder PV com dano de ar, esse inimigo se torna desprezado por Asmodeu. Inimigos deixam de ser desprezados no fim da cena ou depois de perderem PV.',
      },
      {
        name: 'Pose Dramática',
        effect:
          'Em rodadas ímpares, Asmodeu mantém as asas fechadas junto ao corpo e ataques corpo a corpo não lhe causam dano. Em rodadas pares, ele fica de braços e asas abertos e todas as fontes de dano que não sejam ataques corpo a corpo não lhe causam dano.',
      },
      {
        name: 'Olhar de Desprezo',
        effect:
          'Quando um inimigo desprezado preenche ou apaga duas ou mais seções de um Relógio, ele preenche ou apaga uma seção a menos desse Relógio e deixa de ser desprezado.',
      },
    ],
  }),
  creature({
    name: 'Belzebu da Gula',
    page: 219,
    summary:
      'Sexto líder do Pandemonium 7: senhor da gula, usa veneno, guerra química e necromancia; gera e devora draugr e escala todo conflito até o sangue.',
    body: '**Rotina:** Fermentação Sombria (se puder, só em rodadas pares e se houver um ou mais draugr) ou Forcajado ➔ Fome Súbita (se puder e ao menos um draugr puder fazer Laceração Cruel) ou Enxame de Moscas-da-carne ➔ Mastigar e Vomitar ↺\n\n**Abordagens favoráveis:** veneno, Resistência (físico, veneno), atordoado, fraco, imunidade (envenenado, fraco), impedir a recuperação de PV.\n\n**Abordagens desfavoráveis:** fogo, luz, envenenado, abalado.',
    originalName: 'Beelzebub of Gluttony',
    level: 20,
    species: 'demon',
    rank: 'champion',
    championX: 3,
    role: 'support',
    flags: ['unique'],
    villain: true,
    traits: ['nauseante', 'oportunista', 'pútrido', 'sádico'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 240,
    crisis: 120,
    mp: 160,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { fire: 'resistant', light: 'resistant', poison: 'vulnerable' },
    attacks: [
      {
        name: 'Forcajado',
        range: 'melee',
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect:
          'Depois que o ataque é resolvido, se uma ou mais criaturas que perderam PV por ele estiverem em crise, Belzebu recupera 20 PM. Enquanto Belzebu estiver em crise, este ataque tem multi (2).',
      },
      {
        name: 'Enxame de Moscas-da-carne',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'poison',
        effect:
          'O alvo fica fraco. Se dois ou mais draugr estiverem presentes na cena, o alvo fica envenenado em vez disso.',
      },
    ],
    spells: [
      {
        name: 'Fome Súbita',
        mpCost: '20',
        target: 'Um aliado',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O alvo pode fazer imediatamente um ataque livre com uma arma equipada (ou um ataque básico, se for NPC). Este ataque causa 5 de dano extra a alvos que sofram uma ou mais condições. Depois que o ataque é resolvido, o alvo deste feitiço perde 10 PV.',
      },
    ],
    otherActions: [
      {
        name: 'Mastigar e Vomitar',
        effect:
          'Belzebu pode usar uma ação para exibir suas artes sombrias nauseantes. Se três ou mais draugr estiverem presentes na cena, ou se Belzebu estiver em crise e ao menos um draugr estiver presente, um draugr aleatório é destruído (isso não ativa o dano de veneno de Fermentação Sombria) e Belzebu recupera 50 PV com a refeição pútrida. Caso contrário, um novo draugr surge do ventre dele numa cascata de líquidos horríveis, entrando na cena no fim da rodada.',
      },
      {
        name: 'Fermentação Sombria',
        effect:
          'Belzebu pode usar uma ação e gastar 20 PM para injetar energia sombria nos aliados, acelerando a decomposição deles. Se fizer isso, todos os draugr presentes na cena ficam fermentados. Draugr fermentados emitem uma luz roxa doentia e ganham Vulnerabilidade a dano físico. Quando um draugr fermentado chega a 0 PV, ele se desintegra e causa 10 de dano de veneno a toda outra criatura presente na cena (inclusive o próprio Belzebu, que é Vulnerável a esse dano; os draugr costumam ser Imunes).',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições envenenado e abalado.',
      },
    ],
  }),
  creature({
    name: 'Mamon da Ganância',
    page: 221,
    summary:
      'Quinta líder do Pandemonium 7: artificial e egoísta, cobre inimigos de ouro, drena PM e Pontos de Inventário e se deleita com o sofrimento alheio.',
    body: '**Rotina:** Toque Dourado (em rodadas pares, se puder) ou Lâminas Giratórias ➔ Ouro Endurecido (em rodadas ímpares, se puder) ou Cauda Cobiçosa ➔ Aperto de Midas (se estiver em crise) ou Estocada Cruel ➔ Ouro Estilhaçado (se puder) ou Lâminas Giratórias ↺\n\n**Abordagens favoráveis:** terra, Resistência (físico, terra), condições, imunidade (lento, fraco).\n\n**Abordagens desfavoráveis:** raio, trevas, fogo, gelo.',
    originalName: 'Mammon of Greed',
    level: 30,
    species: 'demon',
    rank: 'champion',
    championX: 4,
    role: 'saboteur',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['arrogante', 'decadente', 'sem previdência', 'rancoroso'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 400,
    crisis: 200,
    mp: 160,
    initiative: 12,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      bolt: 'resistant',
      dark: 'resistant',
      earth: 'vulnerable',
      fire: 'resistant',
      ice: 'resistant',
    },
    attacks: [
      {
        name: 'Estocada Cruel',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
        effect: 'O alvo fica fraco.',
      },
      {
        name: 'Aperto de Midas',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'earth',
        effect:
          'Se o alvo estiver dourado, ele faz uma ação a menos no próximo turno (mínimo de 0 ações).',
      },
      {
        name: 'Lâminas Giratórias',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Cauda Cobiçosa',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'dark',
        effect:
          'O alvo perde 1 Ponto de Inventário. Se perder, Mamon se recupera de todas as condições.',
      },
    ],
    spells: [
      {
        name: 'Toque Dourado',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 6,
        effect:
          'Mamon causa (RA + 20) de dano de terra ao alvo, que fica lento.',
      },
      {
        name: 'Ouro Endurecido',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que Mamon veja fica lento e fraco.',
      },
    ],
    otherActions: [
      {
        name: 'Ouro Estilhaçado',
        effect:
          'Mamon pode usar uma ação e gastar 20 PM para causar 20 de dano de terra a todo inimigo que veja; este efeito causa 10 de dano extra a inimigos dourados, e inimigos que perdem PV assim deixam de estar dourados.',
      },
    ],
    specialRules: [
      {
        name: 'Tudo Será Ouro',
        effect:
          'Sempre que um inimigo fosse sofrer uma condição que já sofre, em vez disso ele fica dourado até o fim da cena.',
      },
      {
        name: 'Tudo Será Meu',
        effect:
          'Quando um ou mais inimigos dourados recuperam PM, em vez disso esses inimigos deixam de estar dourados e Mamon recupera PM iguais ao total que eles recuperariam.',
      },
      {
        name: 'Tudo Será Silêncio',
        effect:
          'Inimigos que sofrem duas ou mais condições não podem gastar Pontos de Fabula para evocar Laços e Traços durante testes resistidos.',
      },
    ],
  }),
  creature({
    name: 'Belfegor da Preguiça',
    page: 223,
    summary:
      'Quarto líder do Pandemonium 7: sombra tentacular que se espalha por mentes desesperadas ou acomodadas; campeão 5 de reações instintivas.',
    body: '**Rotina:** Debater Violento (se estiver em crise e os PV atuais forem pares) ou Frio Entorpecente (se puder e estiver em crise) ou Contorção Perturbadora ↺\n\n**Abordagens favoráveis:** Resistência (trevas), envenenado, fraco, imunidade (abalado, lento).\n\n**Abordagens desfavoráveis:** atordoado, enfurecido, abalado, lento, falta de cura.',
    originalName: 'Belphegor of Sloth',
    level: 30,
    species: 'demon',
    rank: 'champion',
    championX: 5,
    role: 'brute',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['sempre em expansão', 'de outro mundo', 'amorfo', 'letárgico'],
    attributes: { DES: 8, AST: 6, VIG: 12, VON: 8 },
    hp: 600,
    crisis: 300,
    mp: 160,
    initiative: 0,
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
    attacks: [
      {
        name: 'Debater Violento',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (2), e seu tipo muda para o tipo do último dano que Belfegor sofreu nesta cena.',
      },
      {
        name: 'Ganchos Pungentes',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'dark',
      },
    ],
    spells: [
      {
        name: 'Frio Entorpecente',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        effect:
          'Belfegor causa (RA + 20) de dano de trevas ao alvo, que fica lento.',
      },
    ],
    otherActions: [
      {
        name: 'Contorção Perturbadora',
        effect:
          'Belfegor pode usar uma ação para se contorcer e debater sem força.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido, abalado e lento.',
      },
      {
        name: 'Da Ausência à Presença',
        effect:
          'Enquanto Belfegor não estiver em crise, os olhos dele vagam sem rumo em todas as direções, sem focar em nada nem ninguém. Enquanto estiver em crise, todas as Afinidades básicas dele são substituídas por Vulnerabilidades, e todos os olhos dele se fixam em qualquer Jogador (não personagem!) que esteja falando no momento.',
      },
      {
        name: 'Recuo Instintivo',
        effect:
          'No fim de cada turno de inimigo, se Belfegor perdeu PV durante o turno, role um d6 e aplique o efeito correspondente (se puder). 1-2: Belfegor recupera 10 PM. 3: faz a ação Feitiço de graça, lançando Frio Entorpecente (ainda deve gastar PM e fazer o teste de Magia normalmente); o feitiço deve mirar o inimigo cujo turno acabou de terminar, e Belfegor trata o resultado alto como 0 ao determinar o dano. 4-5: faz um ataque livre com Ganchos Pungentes, mirando só o inimigo cujo turno acabou de terminar e tratando o resultado alto como 0 ao determinar o dano. 6: emite um grito sem boca; quem puder ouvi-lo fica abalado.',
      },
    ],
  }),
  creature({
    name: 'Samael do Orgulho',
    page: 229,
    summary:
      'Líder do Pandemonium 7 (nº 1) e o mais antigo: belo e hipócrita, alterna a posição da espada entre dois conjuntos de imunidades e usa Armagedom e Clarão Profano.',
    body: '**Rotina:** Troca de Espada ➔ Clarão Profano (se puder e estiver em crise) ou Veneno Divino (se puder e a espada estiver abaixada) ou Gaiola de Penas ➔ Corte Lúmen ➔ Armagedom (se puder) ou Clarão Profano (se puder) ou Gaiola de Penas ↺\n\n**Abordagens favoráveis:** trevas, luz, Resistência (físico, luz, veneno), perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** tipos de dano além de trevas e luz, condições, feitiços de duração Cena.',
    originalName: 'Samael of Pride',
    level: 50,
    species: 'demon',
    rank: 'champion',
    championX: 4,
    role: 'mage',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['belo', 'hipócrita', 'manipulador', 'orgulhoso'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 12 },
    hp: 520,
    crisis: 260,
    mp: 250,
    initiative: 13,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'resistant',
      bolt: 'resistant',
      dark: 'absorbs',
      earth: 'resistant',
      fire: 'resistant',
      ice: 'resistant',
      light: 'absorbs',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Corte Lúmen',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'light',
        effect:
          'Se a espada de Samael estiver erguida, este ataque tem multi (2). Se estiver abaixada, o alvo fica atordoado. Se já estava atordoado e Samael estiver em crise, ele recupera 50 PV em vez disso.',
      },
      {
        name: 'Gaiola de Penas',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 20,
        damageType: 'physical',
        effect:
          'Samael recupera PM iguais ao dobro da perda total de PV sofrida pelo alvo.',
      },
    ],
    spells: [
      {
        name: 'Armagedom',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Samael causa 40 de dano de luz a todo inimigo que veja.',
      },
      {
        name: 'Veneno Divino',
        mpCost: '10 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 8,
        effect:
          'Samael causa (RA + 20) de dano de veneno a cada alvo. Alvos que perdem PV assim deixam de ser afetados por todos os feitiços de duração Cena que os afetavam.',
      },
      {
        name: 'Clarão Profano',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 8,
        effect:
          'Samael causa (RA + 35) de dano de trevas ao alvo. Esse dano ignora Resistências.',
      },
    ],
    otherActions: [
      {
        name: 'Troca de Espada',
        effect:
          'Samael pode usar uma ação para mudar a posição da espada. Se fizer isso e a espada estiver erguida, ela fica abaixada; se estiver abaixada, ou se for a primeira vez que Samael faz esta ação no conflito, ela fica erguida.',
      },
    ],
    specialRules: [
      {
        name: 'Desafio do Orgulho',
        effect:
          'Enquanto a espada de Samael estiver erguida, ele é imune a envenenado, lento e fraco; enquanto estiver abaixada, é imune a atordoado, enfurecido e abalado.',
      },
      {
        name: 'Orgulho Antes da Queda',
        effect:
          'Enquanto Samael estiver em crise e/ou sofrendo duas ou mais condições, as Afinidades básicas dele a dano de trevas e de luz são substituídas por Vulnerabilidades.',
      },
    ],
  }),
]);
