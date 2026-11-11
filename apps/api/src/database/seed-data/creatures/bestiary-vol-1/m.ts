import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Wyverns a Zirnitra: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1M: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Wyverns',
    page: 308,
    summary:
      'Parentes próximas dos dragões, de corpos finos e serpentinos e veneno mortal, que mutam conforme as forças elementais do habitat; do nível 20 ao 40.',
    body: 'Parentes próximas dos dragões, as wyverns têm traços marcadamente serpentinos em corpos finos e alongados e produzem venenos mortais. São muito suscetíveis à influência mágica e apresentam mutações conforme as forças elementais ou arcanas do habitat, até entre membros de um mesmo grupo. Às vezes chamadas de “dragões menores” por viverem menos e supostamente terem pouca ambição, as wyverns são muito inteligentes e bem mais adaptáveis que os dragões, o que fez a população delas ser muito mais numerosa.\n\n## Táticas\n\n- Anfisbena (duas cabeças que agem juntas): Cabeça superior: Cuspe de Fogo ➔ Cabeça inferior: Sopro Estático (se puder) ou Presas Tóxicas ➔ Cabeça superior: Devastação Sônica (se puder, em rodadas ímpares) ou Vento de Flogisto (se puder) ou Mergulho Desajeitado (se estiver em voo) ou Mordida em Brasa ➔ Cabeça inferior: Espiral Serrilhada ↺\n- Guivre: Mordida Súbita ➔ Sopro Laser (se puder) ou Estilhaços de Cristal ↺\n- Nidhoggr: Rasgar Mortal ➔ Bastião de Terra (em rodadas pares, se puder e não estiver sob ele, lançando em si mesma) ou Nastrond (em rodadas ímpares, se puder) ou Rasgar Mortal ➔ Espeleotema ➔ Devorador Sombrio ↺',
  }),
  creature({
    name: 'Anfisbena: Cabeça Superior',
    page: 311,
    summary:
      'Cabeça superior alada da anfisbena: cospe fogo e solta o vento de flogisto, e troca de lugar com a inferior para proteger a que está em crise.',
    body: '**Abordagens favoráveis:** raio, gelo, veneno, Resistência (físico, ar, fogo), atordoado, enfurecido, abalado, perda de PM.\n\n**Abordagens desfavoráveis:** ar, fogo, luz, envenenado, lento, fraco, ataques corpo a corpo.',
    originalName: 'Amphisbaena (Upper Head)',
    groupSlug: 'wyverns',
    level: 20,
    species: 'monster',
    rank: 'elite',
    role: 'mage',
    villain: false,
    traits: ['de cores vivas', 'grotesco', 'escorregadio', 'alado'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 140,
    crisis: 70,
    mp: 90,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'immune',
      bolt: 'vulnerable',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Mergulho Desajeitado',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (3). Depois que ele é resolvido, tenha acertado ou não, a cabeça superior é forçada a pousar e perde os benefícios do voo até o fim da rodada atual.',
      },
      {
        name: 'Mordida em Brasa',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect:
          'O alvo fica chamuscado. Fontes que causam dano de fogo causam 5 de dano extra contra criaturas chamuscadas. Criaturas deixam de estar chamuscadas no fim da cena ou se recuperarem PV.',
      },
      {
        name: 'Cuspe de Fogo',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'fire',
      },
    ],
    spells: [
      {
        name: 'Vento de Flogisto',
        mpCost: '10 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'A cabeça superior causa (RA + 15) de dano de fogo a cada alvo atingido por este feitiço. Este feitiço mira a Defesa em vez da Defesa Mágica.',
      },
      {
        name: 'Devastação Sônica',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'A cabeça superior causa (RA + 15) de dano de ar a cada alvo atingido por este feitiço. Criaturas que perdem PV assim também ficam atordoadas.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições envenenado, lento e fraco.',
      },
      {
        name: 'Voo',
        effect:
          'Segue o poder de NPC Voo (Livro Básico, p. 309). Embora a cabeça superior possa voar, a inferior pende mais baixo e pode ser alvo normal de ataques corpo a corpo.',
      },
      {
        name: 'Troca de Cabeças',
        effect:
          'Quando um ataque, feitiço ou outro efeito mira uma das cabeças da anfisbena, se a cabeça mirada estiver em crise e a outra não, a outra passa a ser o alvo desse ataque, feitiço ou efeito (mesmo que isso crie uma situação impossível, como um ataque corpo a corpo mirar a cabeça superior em voo). Este Poder não tem efeito se restar só uma cabeça, nem contra efeitos que não usem explicitamente a palavra “alvo”, nem se as duas cabeças forem mirada ao mesmo tempo. A anfisbena usa este efeito mesmo quando não a favorece (como fazer a cabeça inferior interceptar um ataque de fogo).',
      },
    ],
  }),
  creature({
    name: 'Anfisbena: Cabeça Inferior',
    page: 310,
    summary:
      'Cabeça inferior da anfisbena, wyvern de duas cabeças: escorregadia e espinhosa, envenena e ignora as Resistências de quem sofre condições.',
    body: '**Abordagens favoráveis:** ar, fogo, luz, Resistência (físico, raio, veneno), envenenado, lento, imunidade (envenenado).\n\n**Abordagens desfavoráveis:** raio, gelo, veneno, atordoado, enfurecido, abalado.',
    originalName: 'Amphisbaena (Lower Head)',
    groupSlug: 'wyverns',
    level: 20,
    species: 'monster',
    rank: 'elite',
    role: 'saboteur',
    villain: false,
    traits: ['veloz', 'grotesco', 'escorregadio', 'espinhoso'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 160,
    crisis: 80,
    mp: 70,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      bolt: 'immune',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Espiral Serrilhada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect:
          'O dano deste ataque ignora as Resistências de criaturas que sofram uma ou mais condições, e o ataque pode mirar inimigos que normalmente não poderiam ser alvo de ataques corpo a corpo.',
      },
      {
        name: 'Presas Tóxicas',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'poison',
        effect: 'O alvo fica envenenado.',
      },
    ],
    spells: [
      {
        name: 'Sopro Estático',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect: 'A cabeça inferior causa (RA + 15) de dano de raio ao alvo.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Ícor Nocivo',
        effect:
          'Quando a cabeça inferior entra em crise pela primeira vez num conflito, todo inimigo presente na cena fica envenenado.',
      },
    ],
  }),
  creature({
    name: 'Guivre',
    page: 312,
    summary:
      'Wyvern cristalina e territorial, que dispara estilhaços e sopros de luz e, em crise, reflete os feitiços de alvo único.',
    body: '**Abordagens favoráveis:** trevas, fogo, Resistência (físico, luz), condições, imunidade (abalado).\n\n**Abordagens desfavoráveis:** gelo, luz, ataques corpo a corpo, feitiços com alvo “Uma criatura”.',
    originalName: 'Guivre',
    groupSlug: 'wyverns',
    level: 30,
    species: 'monster',
    rank: 'elite',
    role: 'hunter',
    villain: false,
    traits: ['enroscado', 'cristalino', 'grande', 'territorial'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 200,
    crisis: 100,
    mp: 80,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      dark: 'vulnerable',
      fire: 'vulnerable',
      ice: 'immune',
      light: 'immune',
    },
    attacks: [
      {
        name: 'Mordida Súbita',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 6,
        damage: 15,
        damageType: 'physical',
        effect:
          'Este ataque causa 5 de dano extra contra criaturas atordoadas e/ou abaladas.',
      },
      {
        name: 'Estilhaços de Cristal',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 6,
        damage: 10,
        damageType: 'ice',
        effect:
          'Enquanto o guivre estiver em crise, este ataque mira a Defesa Mágica e seu dano ignora Resistências.',
      },
    ],
    spells: [
      {
        name: 'Sopro Laser',
        mpCost: '10 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        effect:
          'O guivre causa (RA + 15) de dano de luz a cada alvo atingido por este feitiço. Criaturas que perdem PV assim ficam abaladas.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Crescimentos Refletores',
        effect:
          'Enquanto o guivre estiver em crise, ele não pode ser alvo de feitiços com alvo “Uma criatura”.',
      },
    ],
  }),
  creature({
    name: 'Nidhoggr',
    page: 313,
    summary:
      'Grande wyvern ancestral e cruel, campeã solitária que apodrece os inimigos com veneno e abre a bocarra depois de Nastrond.',
    body: '**Abordagens favoráveis:** ar, gelo, luz, Resistência (físico, trevas, fogo, veneno), enfurecido, imunidade (envenenado, fraco), perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** físico, trevas, terra, fogo, veneno, atordoado, envenenado.',
    originalName: 'Nidhoggr',
    groupSlug: 'wyverns',
    level: 40,
    species: 'monster',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['ancestral', 'colossal', 'cruel', 'altivo'],
    attributes: { DES: 8, AST: 8, VIG: 12, VON: 8 },
    hp: 600,
    crisis: 300,
    mp: 200,
    initiative: 12,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'vulnerable',
      dark: 'immune',
      earth: 'resistant',
      fire: 'immune',
      light: 'vulnerable',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Devorador Sombrio',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'dark',
      },
      {
        name: 'Rasgar Mortal',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (2). Enquanto Nidhoggr estiver em crise, os alvos atingidos por este ataque ficam envenenados.',
      },
      {
        name: 'Espeleotema',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'earth',
        effect:
          'Enquanto Nidhoggr estiver em crise, o dano deste ataque ignora Resistências.',
      },
    ],
    spells: [
      {
        name: 'Bastião de Terra',
        mpCost: '5 × A',
        target: 'Até três criaturas',
        duration: 'Cena',
        offensive: false,
        effect:
          'Quando uma fonte causa dano físico ou de terra a uma ou mais criaturas afetadas por este feitiço, em vez disso o feitiço termina e essa fonte não causa dano a essas criaturas.',
      },
      {
        name: 'Nastrond',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Nidhoggr causa 35 de dano de fogo a todo inimigo que veja. Todo inimigo que perder 35 PV ou mais por esse dano também fica fraco.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado e envenenado.',
      },
      {
        name: 'Malícia Mordaz',
        effect:
          'No fim de cada turno de Nidhoggr, ela causa 5 de dano de veneno a todo inimigo que veja e esteja fraco e/ou envenenado.',
      },
      {
        name: 'Escamas do Destino Impenetrável',
        effect:
          'Enquanto Nidhoggr não estiver em crise, Personagens Jogadores não podem evocar Traços para rolar dados de novo em testes de Precisão e de Magia de ataques e feitiços ofensivos (O) que incluam Nidhoggr entre os alvos.',
      },
      {
        name: 'Wyvern Poderosa',
        effect:
          'Depois que Nidhoggr perde PV por dano de um tipo a que era Vulnerável, ela se recupera de lento e fraco.',
      },
      {
        name: 'Fraqueza Temporária',
        effect:
          'Depois que Nidhoggr resolve Nastrond, a bocarra permanece aberta: até ela fazer Devorador Sombrio ou Rasgar Mortal, a Afinidade básica dela a gelo é substituída por Vulnerabilidade e as Afinidades básicas dela a trevas e fogo são substituídas por Afinidade neutra.',
      },
    ],
  }),
  creatureGroup({
    name: 'Zirnitra, Deusa Dragão',
    page: 314,
    summary:
      'A mais antiga emanação do fluxo de almas, que hiberna no núcleo do planeta e acorda quando ele é ameaçado; vem com o anel da eternidade e prepara o Nitraclismo.',
    body: 'Habitando a fronteira entre luz e trevas, Zirnitra é a mais antiga emanação do fluxo de almas. Ela navega pelos éons, hibernando no núcleo espiritual do planeta e despertando apenas quando a existência dele é ameaçada. Mais próxima de uma força natural que de uma deusa, foi rotulada assim pelos Antigos por poder devolver toda a vida ao fluxo de almas e disparar um novo ciclo cósmico.\n\n## Táticas\n\nEm batalha, Zirnitra vem acompanhada de um anel da eternidade. Para que a mecânica dela funcione, as duas criaturas juntas devem ter um total de turnos igual ao número de Personagens Jogadores mais um. Isso garante que todos os Personagens Jogadores tenham a chance de fazer Guarda antes do Nitraclismo. Ela sempre vence a iniciativa em cenas de conflito.\n- Rodadas ímpares: Anel: Halo Elemental ➔ Zirnitra: Garra de Dragão ➔ Anel: Reunir Energia ➔ Zirnitra: Ignis, Fulgur ou Glacies (se puder, conforme o Halo Elemental) ou Garra de Dragão ➔ Zirnitra: Rugido Antimagia (se dois ou mais feitiços benéficos de duração Cena estiverem presentes entre os inimigos) ou Sopro de Luz e Sombra (priorizando inimigos que não podem ser alvo de ataques corpo a corpo)\n- Rodadas pares: Anel: Halo de Luz e Sombra ➔ Zirnitra: Ascensão à Estratosfera ➔ Anel: nenhuma ação ➔ Zirnitra: nenhuma ação ➔ Zirnitra: Nitraclismo (se puder) ou Garra de Dragão',
  }),
  creature({
    name: 'Zirnitra',
    page: 317,
    summary:
      'Deusa Dragão do fluxo de almas: lança Fulgur, Glacies e Ignis conforme o halo do anel e prepara o Nitraclismo, uma barragem de 999 golpes de dano.',
    body: '**Abordagens favoráveis:** raio, fogo, gelo, Resistência (raio, trevas, fogo, gelo, luz), condições, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** trevas, luz, físico, veneno, envenenado, Arcanos, feitiços de duração Cena.',
    originalName: 'Zirnitra',
    groupSlug: 'zirnitra-deusa-dragao',
    level: 50,
    species: 'elemental',
    rank: 'champion',
    championX: 3,
    role: 'mage',
    flags: ['unique'],
    villain: true,
    traits: ['eterno', 'exigente', 'imponente', 'guardião de todas as magias'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 12 },
    hp: 390,
    crisis: 195,
    mp: 240,
    initiative: 12,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      physical: 'resistant',
      dark: 'absorbs',
      light: 'absorbs',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Garra de Dragão',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Sopro de Luz e Sombra',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 15,
        damageType: null,
        effect:
          'Este dano não tem tipo e não pode ganhar tipo (portanto ignora Afinidades). Este ataque mira a Defesa Mágica.',
      },
    ],
    spells: [
      {
        name: 'Fulgur',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 5,
        effect:
          'Zirnitra causa (RA + 25) de dano de raio a cada alvo atingido por este feitiço. Oportunidade: cada alvo atingido fica atordoado.',
      },
      {
        name: 'Glacies',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 5,
        effect:
          'Zirnitra causa (RA + 25) de dano de gelo a cada alvo atingido por este feitiço. Oportunidade: cada alvo atingido fica lento.',
      },
      {
        name: 'Ignis',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 5,
        effect:
          'Zirnitra causa (RA + 25) de dano de fogo a cada alvo atingido por este feitiço. Oportunidade: cada alvo atingido fica abalado.',
      },
    ],
    otherActions: [
      {
        name: 'Nitraclismo',
        effect:
          'Zirnitra pode usar uma ação e gastar 50 PM para liberar uma barragem de energia mágica. Ela causa 1 de dano a todo Personagem Jogador que veja e repete esse efeito outras 998 vezes (cada ponto é uma instância separada de dano, então Resistência arredonda a perda de PV para 0!). O tipo desse dano é trevas se Zirnitra estiver envolta em escuridão, ou luz se estiver envolta em luz (veja o Halo de Luz e Sombra do anel da eternidade).',
      },
      {
        name: 'Rugido Antimagia',
        effect:
          'Zirnitra pode usar uma ação para emitir uma onda de energia negativa poderosa, encerrando todos os feitiços de duração Cena e dissipando à força todos os Arcanos.',
      },
      {
        name: 'Ascensão à Estratosfera',
        effect:
          'Zirnitra pode usar uma ação para voar a uma altura impossível. Ela e o anel da eternidade não podem ser vistos nem ouvidos por nenhuma outra criatura, não podem ver nem ouvir nenhuma outra criatura, não podem fazer ações, e seus PV e PM atuais não podem mudar. Esses efeitos duram até o início do último turno de Zirnitra nesta rodada.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
    ],
  }),
  creature({
    name: 'Zirnitra: Anel da Eternidade',
    page: 316,
    summary:
      'Anel flutuante ligado a Zirnitra: define o halo elemental que muda as Afinidades dela, a cura e anuncia o Nitraclismo.',
    body: '**Abordagens favoráveis:** raio, fogo, gelo, impedir a recuperação de PV e PM.\n\n**Abordagens desfavoráveis:** físico, trevas, luz, veneno, condições.',
    originalName: 'Zirnitra (Ring of Eternity)',
    groupSlug: 'zirnitra-deusa-dragao',
    level: 50,
    species: 'elemental',
    rank: 'elite',
    role: 'support',
    flags: ['part', 'unique'],
    villain: false,
    traits: [
      'ligado a Zirnitra',
      'imbuído de elementos',
      'eterno',
      'em constante mudança',
    ],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 10 },
    hp: 300,
    crisis: 150,
    mp: 100,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      dark: 'absorbs',
      light: 'absorbs',
      poison: 'immune',
    },
    attacks: [],
    spells: [],
    otherActions: [
      {
        name: 'Halo Elemental',
        effect:
          'O anel da eternidade pode usar uma ação para rolar um d6 e escolher um tipo de dano aleatório: 1-2 raio, 3-4 fogo, 5-6 gelo. O Anel da Eternidade e Zirnitra recebem estes efeitos até o Anel fazer Halo Elemental de novo. Halo de Raio: o anel brilha em amarelo, e ele e Zirnitra Absorvem dano de raio e são Vulneráveis a dano de fogo e de gelo; Zirnitra usará Fulgur no segundo turno dela. Halo de Fogo: o anel brilha em vermelho, e ele e Zirnitra Absorvem dano de fogo e são Vulneráveis a dano de raio e de gelo; Zirnitra usará Ignis no segundo turno dela. Halo de Gelo: o anel brilha em azul, e ele e Zirnitra Absorvem dano de gelo e são Vulneráveis a dano de raio e de fogo; Zirnitra usará Glacies no segundo turno dela.',
      },
      {
        name: 'Reunir Energia',
        effect:
          'O anel da eternidade pode usar uma ação para coletar poder de almas. Se o anel estiver em crise, ele recupera 999 PV; caso contrário, Zirnitra recupera 100 PV e 100 PM e se recupera de todas as condições.',
      },
      {
        name: 'Halo de Luz e Sombra',
        effect:
          'O anel da eternidade pode usar uma ação para rolar um d6: com 1-3, Zirnitra fica envolta em escuridão até o fim da rodada; com 4-6, fica envolta em luz até o fim da rodada. Quando isso acontece, o Mestre deve descrever a mudança de aparência de Zirnitra e declarar abertamente: “Você sente a magia dela ficar mais forte... Zirnitra logo liberará seu maior poder! Fazer Guarda pode ser uma boa ideia!”',
      },
    ],
    specialRules: [
      {
        name: 'Halo Flutuante',
        effect:
          'Enquanto Zirnitra estiver presente na cena e não estiver em crise, o Anel da Eternidade não pode ser alvo de ataques corpo a corpo.',
      },
      {
        name: 'Parte da Deusa',
        effect:
          'Enquanto Zirnitra estiver presente na cena e os PV atuais dela forem iguais ou maiores que 2, os PV atuais do anel da eternidade não podem ser reduzidos abaixo de 1.',
      },
      { name: 'Imunidades', effect: 'Imune a todas as condições.' },
    ],
  }),
]);
