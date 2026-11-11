import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Adamantherion a Arsenal Cobra: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1A: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Adamantherion',
    page: 84,
    summary:
      'Colosso errante do tamanho de uma colina ou montanha, enfrentado em três fases seguidas: patas em marcha, patas irritadas e, por fim, a cabeça furiosa.',
    body: 'Lendas e até crenças religiosas giram em torno do Adamantherion, fera titânica que caminha pelo mundo a passos de trovão. Some por séculos, rumo a outros continentes ou ao fundo do oceano, mas sempre reaparece, mesmo depois de algum herói supostamente derrubá-lo. Sábios o veem como uma espécie de “lavrador do mundo”: uma criatura a quem o próprio planeta deu imortalidade e poder espiritual para espalhar ondas de renovação. Para quem está no caminho dele, porém, a chegada significa morte e destruição.\n\n## Táticas\n\nO Adamantherion é enfrentado em três fases (ou “ciclos”) seguidas, todas no mesmo conflito.\n\n**Fase 1: ciclo de caminhada.** Aparecem duas patas dianteiras e duas traseiras (direita e esquerda). A criatura ainda não notou os Personagens Jogadores e só marcha rumo ao destino. Rotina: Pata Traseira (D): Sustentar Peso ➔ Pata Dianteira (D): Avanço Devastador ➔ Pata Traseira (E): Sustentar Peso ➔ Pata Dianteira (E): Avanço Devastador ↺. No fim de cada rodada, se uma ou mais patas traseiras foram derrotadas, ou se duas ou mais patas estão em crise, o conflito passa à fase 2.\n\n**Fase 2: ciclo irritado.** O Adamantherion reconhece a ameaça e fica mais agressivo. As patas ainda presentes seguem a rotina: Pata Traseira (D): Erguer Pata Dianteira ➔ Pata Dianteira (D): Pisão Esmagador (se erguida) ou Firmar-se ➔ Pata Traseira (E): Erguer Pata Dianteira ➔ Pata Dianteira (E): Pisão Esmagador (se erguida) ou Firmar-se ↺. No fim de cada rodada, se as duas patas traseiras foram derrotadas, o conflito passa à fase 3: a cabeça entra na batalha e todas as patas dianteiras presentes voltam a ter todos os PV e PM e se recuperam de todas as condições.\n\n**Fase 3: ciclo furioso.** A cabeça e as patas dianteiras seguem a rotina abaixo.\n- Rodadas ímpares: Cabeça: Rugido Retumbante (se puder e houver dois ou mais feitiços benéficos de duração Cena sobre inimigos) ou Bufada Sinistra ➔ Pata Dianteira (D): Firmar-se ➔ Pata Dianteira (E): Tremores Repentinos (se os PV atuais forem pares) ou Pisão Esmagador ➔ Cabeça: Terratremor (se puder) ou Mastigada.\n- Rodadas pares: Cabeça: Rugido Redemoinho ➔ Pata Dianteira (E): Firmar-se ➔ Pata Dianteira (D): Tremores Repentinos (se os PV atuais forem pares) ou Pisão Esmagador ➔ Cabeça: Terratremor (se puder) ou Mastigada.',
  }),
  creature({
    name: 'Adamantherion: Cabeça',
    page: 87,
    summary:
      'Cabeça colossal do Adamantherion: entra na terceira fase, ruge para dissipar feitiços e atordoar, e fica mais protegida quanto mais patas dianteiras restam.',
    body: '**Abordagens favoráveis:** fogo, luz, veneno, Resistência (físico, ar, terra), enfurecido, lento, atordoado, envenenado, recuperação de condições, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** ar, trevas, terra, gelo, feitiços de duração Cena.',
    originalName: 'Adamantherion (Head)',
    groupSlug: 'adamantherion',
    level: 50,
    species: 'beast',
    rank: 'elite',
    role: 'saboteur',
    flags: ['unique'],
    villain: true,
    traits: ['blindado', 'colossal', 'distraído', 'irritável'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 10 },
    hp: 280,
    crisis: 140,
    mp: 110,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      bolt: 'immune',
      dark: 'resistant',
      earth: 'resistant',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Mastigada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'physical',
        effect:
          'Se o alvo estiver lento, ele perde 20 PM. O dano ignora Resistências. O ataque pode atingir criaturas que normalmente não poderiam ser alvo de ataques corpo a corpo.',
      },
      {
        name: 'Rugido Redemoinho',
        range: 'ranged',
        accuracy: 'VIG + VON',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'air',
        effect: 'Cada alvo atingido fica lento. Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Terratremor',
        mpCost: '40',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'A cabeça causa 40 de dano de terra a todos os inimigos que consiga ver, com 5 de dano extra contra os atordoados e mais 5 contra os lentos.',
      },
    ],
    otherActions: [
      {
        name: 'Rugido Retumbante',
        effect:
          'A cabeça pode usar uma ação e gastar 20 PM para soltar um rugido grave. Se fizer isso, todo inimigo que consiga ouvi-la fica atordoado. Em seguida, todos os feitiços de duração Cena terminam.',
      },
      {
        name: 'Bufada Sinistra',
        effect:
          'A cabeça pode usar uma ação para bufar com raiva, mirando o Personagem Jogador com mais PV atuais (em empate, escolha aleatoriamente). Esse personagem perde todas as Resistências e Imunidades e não pode ganhar nenhuma até o fim do próximo turno dele.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições fraco e abalado.' },
      {
        name: 'Mordida Furiosa',
        effect:
          'No fim de cada turno de inimigo, se ele reduziu a 0 PV uma ou mais patas dianteiras durante o turno, a cabeça faz um ataque livre com Mastigada, que só pode ter esse inimigo como alvo.',
      },
      {
        name: 'Difícil de Alcançar',
        effect:
          'O dano sofrido pela cabeça é reduzido em 5 para cada pata dianteira ainda presente na cena (antes de aplicar as Afinidades).',
      },
    ],
  }),
  creature({
    name: 'Adamantherion: Pata Dianteira',
    page: 88,
    summary:
      'Pata dianteira do Adamantherion: pisoteia, fica erguida quando a traseira a sustenta e faz a terra tremer a cada avanço.',
    body: '**Abordagens favoráveis:** ar, raio, trevas, terra, Resistência (físico, terra), lento, envenenado, fraco, dano alto em um só alvo.\n\n**Abordagens desfavoráveis:** físico, fogo, gelo, luz, atordoado, enfurecido, abalado, atingir 3 ou mais inimigos.',
    originalName: 'Adamantherion (Foreleg)',
    groupSlug: 'adamantherion',
    level: 50,
    species: 'beast',
    rank: 'soldier',
    role: 'sentinel',
    flags: ['part'],
    villain: false,
    traits: ['blindado', 'colossal', 'pesadão', 'previsível'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 10 },
    hp: 150,
    crisis: 75,
    mp: 100,
    initiative: 8,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      physical: 'resistant',
      dark: 'vulnerable',
      earth: 'resistant',
      fire: 'resistant',
      ice: 'resistant',
      light: 'immune',
    },
    attacks: [
      {
        name: 'Pisão Esmagador',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 20,
        damageType: 'physical',
        effect:
          'Se a pata estava erguida (veja Pata Traseira), o ataque causa 30 de dano extra e a pata deixa de estar erguida.',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Firmar-se',
        effect:
          'A pata pode usar uma ação para fincar-se no chão. Se fizer isso, ela se recupera de todas as condições e ganha Imunidade a dano de ar, raio e físico até o início do próximo turno dela; porém, sua Afinidade básica a terra vira Vulnerabilidade até o início do próximo turno ou até ficar erguida.',
      },
      {
        name: 'Avanço Devastador',
        effect:
          'A pata pode usar uma ação para avançar pesadamente rumo ao destino, fazendo a terra tremer. Se fizer isso, causa 20 de dano de terra a todos os inimigos presentes na cena. Além disso, se a cena tiver um Relógio que represente a contagem até o Adamantherion chegar a um destino, preencha 1 seção dele.',
      },
      {
        name: 'Tremores Repentinos',
        effect:
          'A pata pode usar uma ação para pisotear o chão sem parar, gerando ondas de choque. Todo inimigo presente na cena fica lento.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Massa Demais',
        effect:
          'Ataques e feitiços ofensivos (O) que incluam uma pata dianteira entre os alvos não podem incluir também a cabeça ou uma pata traseira (podem incluir outra pata dianteira).',
      },
      {
        name: 'Erguer e Cair',
        effect:
          'Enquanto a pata estiver erguida (veja Pata Traseira), ela ganha Vulnerabilidade a dano de ar e de raio. Se, estando erguida, perder PV por dano de um tipo a que seja Vulnerável, ela deixa de estar erguida.',
      },
      {
        name: 'Ainda Despercebido',
        effect:
          'Durante a fase 1 (ciclo de caminhada), a pata não ouve nem vê nenhuma das criaturas presentes na cena.',
      },
    ],
  }),
  creature({
    name: 'Adamantherion: Pata Traseira',
    page: 89,
    summary:
      'Pata traseira do Adamantherion: ergue a pata dianteira do mesmo lado ou sustenta o peso para curá-la, e a deixa quase indestrutível enquanto estiver de pé.',
    body: '**Abordagens favoráveis:** raio, terra, veneno, dano alto em um só alvo.\n\n**Abordagens desfavoráveis:** ar, trevas, fogo, gelo, luz, atordoado, enfurecido, abalado, atingir 3 ou mais inimigos.',
    originalName: 'Adamantherion (Hind Leg)',
    groupSlug: 'adamantherion',
    level: 50,
    species: 'beast',
    rank: 'soldier',
    role: 'support',
    flags: ['part'],
    villain: false,
    traits: ['colossal', 'pesadão', 'robusto', 'previsível'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 10 },
    hp: 150,
    crisis: 75,
    mp: 100,
    initiative: 8,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'resistant',
      dark: 'resistant',
      fire: 'resistant',
      ice: 'resistant',
      light: 'immune',
      poison: 'vulnerable',
    },
    attacks: [],
    spells: [],
    otherActions: [
      {
        name: 'Erguer Pata Dianteira',
        effect:
          'A pata traseira pode usar uma ação para parar de andar e sustentar peso suficiente para que a pata dianteira do mesmo lado do corpo seja erguida bem acima do chão (a traseira direita ergue a dianteira direita e a esquerda, a esquerda). Se fizer isso, essa pata dianteira fica erguida até o início do próximo turno desta pata traseira ou até ela sofrer dano de um tipo a que seja Vulnerável. Uma pata erguida também pode deixar de estar erguida pelos efeitos de Erguer e Cair (veja Pata Dianteira).',
      },
      {
        name: 'Sustentar Peso',
        effect:
          'A pata traseira pode usar uma ação para sustentar com firmeza o peso do seu lado do corpo. Se fizer isso, a pata dianteira do mesmo lado recupera 30 PV e, se esta pata traseira não estiver em crise, essa pata dianteira também se recupera de lento e fraco (a traseira direita sustenta a dianteira direita e a esquerda, a esquerda). Porém, esta pata traseira ganha Vulnerabilidade a dano de raio e de terra até o início do próximo turno dela ou até perder qualquer quantidade de PV (isso substitui as Afinidades básicas dela).',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Massa Demais',
        effect:
          'Ataques e feitiços ofensivos (O) que incluam uma pata traseira entre os alvos não podem incluir também a cabeça ou uma pata dianteira (podem incluir outra pata traseira).',
      },
      {
        name: 'Robusta e Resistente',
        effect:
          'Enquanto a pata traseira direita estiver presente na cena, os PV atuais da pata dianteira direita não podem ser reduzidos abaixo de 1; o mesmo vale para a esquerda e a pata dianteira esquerda.',
      },
      {
        name: 'Ainda Despercebido',
        effect:
          'Durante a fase 1 (ciclo de caminhada), a pata não ouve nem vê nenhuma das criaturas presentes na cena.',
      },
    ],
  }),
  creatureGroup({
    name: 'Dragão Arbóreo (grupo)',
    slug: 'dragao-arboreo-grupo',
    page: 92,
    summary:
      'Encarnação viva dos ciclos das estações, acompanhada de duas lótus guardiãs; suas escamas mudam de cor e de Afinidades a cada estação.',
    body: 'Adorado como arauto da mudança, o Dragão Arbóreo percorre o céu quando as estações viram, com escamas que reluzem sob o sol, a lua e as estrelas. Muitos rezam a ele por estações amenas e boas colheitas, mas ninguém o viu reconhecer uma prece. Dizem que quem presenciar esse voo sente um desejo irresistível de viajar pelo mundo colhendo histórias.\n\n## Táticas\n\nEm batalha, o Dragão Arbóreo vem com duas lótus guardiãs. A lótus com menos PV atuais age primeiro a cada rodada (em empate, decida aleatoriamente). Por causa de Escamas Sazonais, Luz Arbórea e Fluxo Sazonal normalmente não causam dano de luz; a informação está lá caso precise.\n\nRotina: Dragão: Fluxo Sazonal ➔ Lótus: Tempestade de Pétalas ➔ Dragão: Devorado por Mil Flores ➔ Lótus: Praga de Pólen (se puder e estiver em crise) ou Tempestade de Pétalas ➔ Dragão: Luz Arbórea (se puder) ou Fluxo Sazonal (se estiver em crise) ou Varredura de Madeira ↺',
  }),
  creature({
    name: 'Dragão Arbóreo',
    page: 95,
    summary:
      'Dragão ancestral e severo cujas escamas trocam de cor com as estações, mudando suas Afinidades e o tipo de dano de seus ataques.',
    body: '**Abordagens favoráveis:** ar, terra, fogo, gelo, Resistência (físico, ar, terra, fogo, gelo), envenenado, lento, fraco, perda de PM, impedir a ação Feitiço, impedir a recuperação de PV.\n\n**Abordagens desfavoráveis:** físico, trevas, luz, atordoado, enfurecido, abalado.',
    originalName: 'Arboreal Dragon',
    groupSlug: 'dragao-arboreo-grupo',
    level: 40,
    species: 'plant',
    rank: 'champion',
    championX: 3,
    role: 'support',
    flags: ['unique'],
    villain: true,
    traits: ['ancestral', 'enigmático', 'sempre mutável', 'severo'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 10 },
    hp: 360,
    crisis: 180,
    mp: 200,
    initiative: 12,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: { physical: 'immune', dark: 'resistant', light: 'resistant' },
    attacks: [
      {
        name: 'Devorado por Mil Flores',
        range: 'melee',
        accuracy: 'VIG + VON',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'physical',
        effect:
          'Cada lótus guardiã presente na cena recupera uma quantidade de PV igual à perda total de PV sofrida pelo alvo deste ataque.',
      },
      {
        name: 'Varredura de Madeira',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Fluxo Sazonal',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'light',
      },
    ],
    spells: [
      {
        name: 'Luz Arbórea',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O Dragão Arbóreo causa 30 de dano de luz a todos os inimigos que consiga ver.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Primavera Jubilosa',
        effect:
          'Quando as escamas do Dragão Arbóreo passam de azul (inverno) para verde (primavera), ele deve gastar 1 Ponto de Ultima, se puder. Se gastar, recupera 100 PM e cada lótus guardiã presente na cena recupera 100 PV.',
      },
      {
        name: 'Escamas Sazonais',
        effect:
          'O Dragão entra no conflito com escamas verdes (primavera). No fim de cada turno (inclusive o de outras criaturas), se o Dragão perdeu 1 PV ou mais naquele turno, as escamas mudam para a próxima cor: dourado (verão), marrom-avermelhado (outono), azul (inverno) e de volta ao verde. As cores dão ao Dragão Vulnerabilidade e Absorção temporárias e mudam o tipo de dano de Luz Arbórea e Fluxo Sazonal. Verde (primavera): Vulnerável a terra, Absorve ar, causa dano de ar. Dourado (verão): Vulnerável a gelo, Absorve fogo, causa dano de fogo. Marrom-avermelhado (outono): Vulnerável a ar, Absorve terra, causa dano de terra. Azul (inverno): Vulnerável a fogo, Absorve gelo, causa dano de gelo.',
      },
      {
        name: 'Ira Severa',
        effect:
          'Enquanto não houver lótus guardiãs na cena, o Dragão Arbóreo causa 5 de dano extra com seus ataques e feitiços.',
      },
    ],
  }),
  creature({
    name: 'Dragão Arbóreo: Lótus Guardiã',
    page: 94,
    summary:
      'Flor flutuante e sem mente que protege o Dragão Arbóreo: envenena com pétalas e impede que ele perca PV enquanto ele estiver em crise.',
    body: '**Abordagens favoráveis:** ar, terra, fogo, gelo, Resistência (veneno), recuperação de condições.\n\n**Abordagens desfavoráveis:** raio, veneno, condições, símbolos.',
    originalName: 'Guardian Lotus',
    groupSlug: 'dragao-arboreo-grupo',
    level: 40,
    species: 'plant',
    rank: 'soldier',
    role: 'saboteur',
    villain: false,
    traits: ['sinistro', 'flutuante', 'sem mente', 'corrompido'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 10 },
    hp: 120,
    crisis: 60,
    mp: 100,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      bolt: 'resistant',
      earth: 'vulnerable',
      fire: 'vulnerable',
      ice: 'vulnerable',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Tempestade de Pétalas',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'poison',
        effect:
          'O alvo sofre uma condição que depende da cor atual das escamas do Dragão Arbóreo: verde (fraco), dourado (abalado), marrom-avermelhado (atordoado) ou azul (lento). Este ataque mira a Defesa Mágica.',
      },
    ],
    spells: [
      {
        name: 'Praga de Pólen',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        effect:
          'A lótus causa (RA + 20) de dano de veneno ao alvo, que não pode fazer ataques livres até o início do próximo turno dele.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune a todas as condições.' },
      {
        name: 'Guarda de Lótus',
        effect:
          'Enquanto o Dragão Arbóreo estiver em crise e houver uma ou mais lótus na cena, ele não pode perder PV.',
      },
      {
        name: 'Florada Passageira',
        effect:
          'Quando a lótus chega a 0 PV, o Dragão Arbóreo se recupera de todas as condições e todos os símbolos presentes nele são destruídos.',
      },
    ],
  }),
  creatureGroup({
    name: 'Arsenal Cobra',
    page: 96,
    summary:
      'Serpente de guerra mecânica, feita para combate aéreo: uma cabeça armada com o canhão V.E.N.O.M. e dois segmentos de cauda articulados.',
    body: 'A Arsenal Cobra é uma máquina serpentina temível, projetada para a guerra aérea e feita para unir intimidação de predador a tecnologia militar de ponta. O corpo esguio é formado por segmentos modulares que compõem uma cauda articulada, capaz tanto de manobras aéreas quanto de golpes no solo. O capuz abriga turbinas e rotores que dão sustentação e propulsão, e a cabeça traz o V.E.N.O.M. (Variable Energy Neutralization Ordnance Machine), arma de energia dirigida que adapta sua carga ao alvo.\n\n## Táticas\n\nEm batalha, a Arsenal Cobra é formada por uma cabeça e dois segmentos. O segmento com menos PV atuais age primeiro a cada rodada (em empate, decida aleatoriamente).\n- Rodadas ímpares: Segmento: Fogo de Supressão ➔ Cabeça: Varredura de Cauda (se puder) ou Mergulho Súbito ➔ Segmento: Fogo de Supressão ➔ Cabeça: Queimador de Turbina.\n- Rodadas pares: Cabeça: Fogo Coordenado (se puder) ou Mergulho Súbito ➔ Segmento: Desviar Energia para a Cabeça ➔ Segmento: Desviar Energia para a Cabeça ➔ Cabeça: Raio V.E.N.O.M.',
  }),
  creature({
    name: 'Arsenal Cobra: Cabeça',
    page: 99,
    summary:
      'Cabeça voadora da Arsenal Cobra: investe, varre com a cauda e acumula Pontos de Raio para disparar o canhão V.E.N.O.M.',
    body: '**Abordagens favoráveis:** ar, fogo, Resistência (físico, raio, fogo, luz), fraco, causar dano à cabeça e aos segmentos ao mesmo tempo.\n\n**Abordagens desfavoráveis:** terra, veneno, envenenado, ataques corpo a corpo, priorizar dano à cabeça.',
    originalName: 'Arsenal Cobra (Head)',
    groupSlug: 'arsenal-cobra',
    level: 10,
    species: 'construct',
    rank: 'elite',
    role: 'brute',
    villain: false,
    traits: ['blindado', 'destrutivo', 'voador', 'barulhento'],
    attributes: { DES: 8, AST: 6, VIG: 10, VON: 8 },
    hp: 160,
    crisis: 80,
    mp: 50,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      earth: 'resistant',
      fire: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Mergulho Súbito',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
      },
      {
        name: 'Varredura de Cauda',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (X), onde X é 1 mais o número de segmentos ainda presentes na cena. Se não restar nenhum segmento, a cabeça não pode fazer este ataque.',
      },
      {
        name: 'Raio V.E.N.O.M.',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'bolt',
        effect:
          'Este ataque ganha um bônus no teste de Precisão igual aos Pontos de Raio atuais da cabeça e causa dano extra igual aos Pontos de Raio atuais da cabeça multiplicados por 5. Enquanto a cabeça tiver 2 ou mais Pontos de Raio, todo o dano deste ataque vira de luz, o tipo não pode mudar e as criaturas que perderem PV por esse dano ficam fracas. Depois que o ataque é resolvido, tenha acertado ou não, a cabeça perde todos os seus Pontos de Raio.',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Fogo Coordenado',
        effect:
          'A cabeça pode usar uma ação e gastar 10 PM para fazer o segmento com mais PV atuais executar um ataque livre com Fogo de Supressão. Se fizer isso, o ataque ganha multi (2). Se não restar nenhum segmento, a cabeça não pode realizar esta ação.',
      },
      {
        name: 'Queimador de Turbina',
        effect:
          'A cabeça pode usar uma ação para causar 10 de dano de fogo a todos os inimigos que consiga ver e que estejam lentos e/ou fracos.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Destruição de Segmento',
        effect:
          'Quando a cabeça perde PV, se houver um ou mais segmentos na cena, ela perde apenas metade desses PV e o segmento com menos PV atuais sofre o restante da perda. Se dois ou mais segmentos empatarem em PV atuais, escolha um deles aleatoriamente.',
      },
    ],
  }),
  creature({
    name: 'Arsenal Cobra: Segmento',
    page: 98,
    summary:
      'Segmento articulado da cauda da Arsenal Cobra: atrasa inimigos com fogo de supressão e canaliza energia para a cabeça.',
    body: '**Abordagens favoráveis:** raio, trevas, Resistência (físico), imunidade (lento), lento, fraco, perda de PM.\n\n**Abordagens desfavoráveis:** ar, terra, gelo, veneno, atordoado, enfurecido, envenenado, abalado, ataques corpo a corpo.',
    originalName: 'Arsenal Cobra (Segment)',
    groupSlug: 'arsenal-cobra',
    level: 10,
    species: 'construct',
    rank: 'soldier',
    role: 'sentinel',
    flags: ['part'],
    villain: false,
    traits: ['blindado', 'apegado', 'automatizado', 'vigilante'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 60,
    crisis: 30,
    mp: 50,
    initiative: 8,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      bolt: 'vulnerable',
      dark: 'vulnerable',
      earth: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Fogo de Supressão',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect: 'O alvo fica lento.',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Desviar Energia para a Cabeça',
        effect:
          'O segmento pode usar uma ação e gastar 20 PM para fazer a cabeça ganhar 1 Ponto de Raio. Se fizer isso, ela ganha Resistência a ar e gelo até o início do próximo turno da cabeça.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect:
          'Imune às condições atordoado, enfurecido, envenenado e abalado.',
      },
      {
        name: 'Segmento Pendente',
        effect:
          'Enquanto a cabeça estiver em voo e o segmento não estiver em crise, o segmento também é tratado como em voo.',
      },
    ],
  }),
  creature({
    name: 'Aracne',
    page: 91,
    summary:
      'Demônio nascido da pressão social, que se disfarça de humano, manipula vítimas pelo medo e sustenta uma corte de peões descartáveis.',
    body: '**Rotina:** Mentira Envolvente (em rodadas ímpares) ou Dúvida Rastejante ➔ Puxar os Fios (se puder e houver alvo válido) ou Sussurros Ambíguos (se puder e ao menos um inimigo não estiver atordoado) ou Mentira Envolvente ↺\n\n**Abordagens favoráveis:** físico, terra, gelo, Resistência (trevas, luz), recuperação de condições, perda de PM.\n\n**Abordagens desfavoráveis:** trevas, luz, recuperação de PM, enfrentar a aracne em sua corte social.',
    originalName: 'Arachne',
    level: 20,
    species: 'demon',
    rank: 'elite',
    role: 'saboteur',
    villain: true,
    traits: ['cativante', 'insidioso', 'manipulador', 'mascarado'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 160,
    crisis: 80,
    mp: 80,
    initiative: 10,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      physical: 'vulnerable',
      dark: 'resistant',
      earth: 'vulnerable',
      ice: 'vulnerable',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Dúvida Rastejante',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'dark',
        effect:
          'Se o alvo estiver abalado, todos os inimigos que consigam vê-lo ficam abalados.',
      },
      {
        name: 'Mentira Envolvente',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'light',
        effect:
          'O alvo fica abalado e não pode recuperar PM até o fim do próximo turno dele.',
      },
    ],
    spells: [
      {
        name: 'Sussurros Ambíguos',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que consiga ouvir a Aracne fica atordoado.',
      },
    ],
    otherActions: [
      {
        name: 'Puxar os Fios',
        effect:
          'A aracne pode usar uma ação e gastar 20 PM para escolher uma criatura que veja e que esteja sofrendo duas ou mais condições. Se fizer isso, escolhe uma opção: a criatura faz um ataque livre com um ataque básico ou arma equipada à escolha dela contra um alvo escolhido pela aracne; ou a criatura faz uma declaração comprometedora ou um movimento desastrado, descrito por quem a controla, o que permite à aracne preencher ou apagar 1 seção de um Relógio à escolha dela.',
      },
    ],
    specialRules: [
      {
        name: 'Persuasão Sobrenatural',
        effect:
          'No turno dela durante um conflito, a aracne ganha +3 em testes resistidos se a abordagem dela se basear em carisma, manipulação social ou percepção.',
      },
      {
        name: 'Engodo Tecido',
        effect:
          'Enquanto não estiver em crise, a aracne parece humanoide, sem traços monstruosos, e seus ataques e feitiços não são vistos como ameaçadores nem mágicos por ninguém além das vítimas (a informação fica oculta só dos personagens, não dos Jogadores). Personagens que examinem o perfil dela com testes abertos, ou que usem Poderes ou efeitos que permitam fazer perguntas e receber respostas verdadeiras, descobrem a farsa (mas expô-la aos demais será um desafio à parte).',
      },
    ],
  }),
]);
