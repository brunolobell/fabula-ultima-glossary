import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Babylonica a Bugaboo: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1B: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Babylonica',
    page: 100,
    summary:
      'Fortaleza-arma móvel que alterna entre duas formas, o núcleo de energia e o aparato colossal, gastando Pontos de Ultima para passar de uma à outra.',
    body: 'Babylonica é o ato supremo de desafio arrogante da humanidade: uma fortaleza-arma móvel cuja sombra cobre o céu, máquina de guerra tão vasta e aparentemente invulnerável que qualquer desejo de rebelião se desfaz diante do seu tamanho e do seu poder de fogo. É a chance perfeita para os heróis provarem sua força.\n\n## Táticas\n\nBabylonica alterna entre duas formas, o núcleo de energia e o aparato colossal, cada uma com a própria rotina.\n- Núcleo de Energia: Ativação de Magicarga (se puder) ou Descarga ↺\n- Aparato Colossal: Identificar Ameaça ➔ Mão Sísmica (se os PV atuais forem ímpares) ou Foguetes Deflagrantes ➔ Raio Aniquilador (se puder, priorizando inimigos identificados, a menos que um efeito o impeça) ou Foguetes Deflagrantes ➔ Mão Sísmica ↺',
  }),
  creature({
    name: 'Babylonica: Núcleo de Energia',
    page: 102,
    summary:
      'Núcleo imóvel e instável da Babylonica: acumula uma descarga elemental aleatória e, ao cair, convoca o aparato colossal.',
    body: '**Abordagens favoráveis:** Resistência (raio, fogo, gelo, luz), perda de PM, dissipar efeitos, dano sem tipo.\n\n**Abordagens desfavoráveis:** dano que tenha tipo, condições.',
    originalName: 'Babylonica (Energy Core)',
    groupSlug: 'babylonica',
    level: 40,
    species: 'construct',
    rank: 'soldier',
    role: 'mage',
    flags: ['unique'],
    villain: false,
    traits: ['pesado', 'inanimado', 'imóvel', 'instável'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 12 },
    hp: 110,
    crisis: 55,
    mp: 110,
    initiative: 9,
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
      light: 'immune',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Descarga',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'bolt',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Ativação de Magicarga',
        mpCost: '20',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'Quando o núcleo conjura este feitiço, rola um d8 para escolher aleatoriamente um tipo de dano: raio (1-2), fogo (3-4), gelo (5-6) ou luz (7-8). Sob o efeito do feitiço, o núcleo brilha na cor do tipo escolhido: amarelo para raio, vermelho para fogo, azul para gelo e branco para luz. No fim da rodada, o feitiço termina e o núcleo causa 40 de dano do tipo escolhido a todos os inimigos que consiga ver.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune a todas as condições.' },
      {
        name: 'Titã Ascendente',
        effect:
          'Quando o núcleo de energia chega a 0 PV, se Babylonica tiver 1 ou mais Pontos de Ultima, ela gasta 1 para fazer o núcleo sair da cena. O conflito, porém, não termina: o aparato colossal entra na cena no fim da rodada, com 300 PV atuais, PM máximos e sem nenhuma condição. Se entrar assim, ele fica desmoronando até sair da cena. Se Babylonica não tiver Pontos de Ultima para usar esta regra, é derrotada de vez.',
      },
    ],
  }),
  creature({
    name: 'Babylonica: Aparato Colossal',
    page: 103,
    summary:
      'Forma colossal e impenetrável da Babylonica, com mãos sísmicas, foguetes e um raio aniquilador; ao cair, devolve a cena ao núcleo de energia.',
    body: '**Abordagens favoráveis:** raio, gelo, Resistência (terra, fogo, luz), condições, perda de PM.\n\n**Abordagens desfavoráveis:** físico, terra, fogo, luz, veneno, envenenado.',
    originalName: 'Babylonica (Towering Apparatus)',
    groupSlug: 'babylonica',
    level: 40,
    species: 'construct',
    rank: 'champion',
    championX: 4,
    role: 'sentinel',
    flags: ['unique'],
    villain: true,
    traits: ['colossal', 'impenetrável', 'previsível', 'impiedoso'],
    attributes: { DES: 8, AST: 8, VIG: 12, VON: 8 },
    hp: 560,
    crisis: 280,
    mp: 180,
    initiative: 12,
    defense: { value: 4, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'resistant',
      bolt: 'vulnerable',
      earth: 'resistant',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'immune',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Mão Sísmica',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'earth',
        effect:
          'Este ataque tem multi (3), ou multi (4) se o aparato estiver desmoronando. Depois que o ataque é resolvido, tenha acertado ou não, se o aparato estiver desmoronando, ele perde 50 PV.',
      },
      {
        name: 'Foguetes Deflagrantes',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'fire',
        effect: 'Cada alvo atingido fica abalado. Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Raio Aniquilador',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 4,
        effect:
          'O aparato causa (RA + 30) de dano de luz ao alvo, que fica fraco.',
      },
    ],
    otherActions: [
      {
        name: 'Identificar Ameaça',
        effect:
          'O aparato pode usar uma ação para focar seus sistemas de mira no inimigo que veja com mais PV atuais (em empate, escolha aleatoriamente). Se fizer isso, esse inimigo fica identificado até o aparato usar Identificar Ameaça de novo.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Titã Tombando',
        effect:
          'Quando o aparato chega a 0 PV, se Babylonica tiver 1 ou mais Pontos de Ultima, ela gasta 1 para fazer o aparato sair da cena. O conflito, porém, não termina: o núcleo de energia entra na cena no fim da rodada, com PV e PM máximos e sem nenhuma condição. Se Babylonica não tiver Pontos de Ultima para usar esta regra, é derrotada de vez.',
      },
    ],
  }),
  creatureGroup({
    name: 'Donzelas de Espinhos',
    page: 114,
    summary:
      'Guardiãs sinistras de florestas e selvas, que encarnam o ecossistema e partilham sua alegria e sua fúria; variam do nível 10 ao 30.',
    body: 'Figuras comuns nas profundezas de florestas e selvas, as donzelas de espinhos encarnam o ecossistema, partilham sua alegria e sua fúria e o protegem quando preciso. Muitos contos dizem que nascem de mudas jovens nutridas pela vida mais pura, e há quase tantos sobre a relação complicada delas com os humanos: são vistas como guardiãs sinistras dignas de respeito, mas também como obstáculos à segurança e ao progresso.\n\n## Táticas\n\n- Rosenrot: Impedimento (priorizando causar lento, depois atordoado, depois abalado, depois fraco) ➔ Riso Maligno (priorizando inimigos envenenados) ↺\n- Dornroschen: Ronco ➔ Bocejo (se puder e dois ou mais inimigos não estiverem lentos) ou Debater Inquieto (se estiver agitada) ou Ronco ↺\n- Echinokore, rodadas ímpares: Saraivada de Espinhos ➔ Raízes Esmagadoras ➔ Fotossíntese Revigorante (se puder e estiver envenenada e/ou com PV atuais iguais ou menores que 300) ou Raízes Esmagadoras ➔ Abraço da Donzela (se ao menos um inimigo estiver envolvido) ou Saraivada de Espinhos.\n- Echinokore, rodadas pares: Saraivada de Espinhos ➔ Revelação das Profundezas Áridas (se tiver 1 ou mais Pontos de Ultima e houver na cena ao menos um feitiço de duração Cena, um Arcano e/ou um símbolo) ou Raízes Esmagadoras ➔ ação Recuperação de Vilão (se tiver 1 ou mais Pontos de Ultima, estiver sofrendo três ou mais condições e/ou tiver menos de 30 PM atuais) ou Saraivada de Espinhos ➔ Florada Suprema (se puder) ou Raízes Esmagadoras.',
  }),
  creature({
    name: 'Rosenrot',
    page: 116,
    summary:
      'Donzela de espinhos pequena, tagarela e travessa, que debocha de inimigos cheios de condições e envenena quem a atinge.',
    body: '**Abordagens favoráveis:** fogo, gelo, Resistência (trevas), lento, imunidade (envenenado), recuperação de condições.\n\n**Abordagens desfavoráveis:** atordoado, enfurecido, abalado, ataques, Fogo Cruzado.',
    originalName: 'Rosenrot',
    groupSlug: 'donzelas-de-espinhos',
    level: 10,
    species: 'plant',
    rank: 'soldier',
    role: 'saboteur',
    villain: false,
    traits: ['tagarela', 'travesso', 'pequeno', 'peçonhento'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 60,
    crisis: 30,
    mp: 50,
    initiative: 8,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: { fire: 'vulnerable', ice: 'vulnerable' },
    attacks: [
      {
        name: 'Riso Maligno',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'dark',
        effect:
          'Se o alvo estiver envenenado e com ao menos mais uma condição, ele faz uma ação a menos no próximo turno (mínimo de 0 ações). Este ataque trata a Defesa do alvo como igual ao tamanho atual do dado de Vontade dele e não pode ser forçado a errar por Poderes inimigos (como Fogo Cruzado).',
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
        name: 'Zombaria Irritante',
        effect:
          'Inimigos que a rosenrot veja e que estejam sofrendo três ou mais condições não podem fazer ataques livres.',
      },
      {
        name: 'Resposta Espinhosa',
        effect:
          'Depois que a rosenrot falha em um teste resistido durante o turno de um inimigo, ou depois que um inimigo a acerta com um ataque, esse inimigo fica envenenado (depois que o teste ou ataque for resolvido).',
      },
    ],
  }),
  creature({
    name: 'Dornroschen',
    page: 117,
    summary:
      'Donzela de espinhos adormecida e enraizada, que ronca e boceja e só reage com fúria quando perturbada; ao cair, acorda de súbito e fere os próprios aliados.',
    body: '**Abordagens favoráveis:** ar, trevas, gelo, veneno, Resistência (físico, terra), envenenado, fraco.\n\n**Abordagens desfavoráveis:** raio, fogo, luz, atordoado, enfurecido, abalado.',
    originalName: 'Dornroschen',
    groupSlug: 'donzelas-de-espinhos',
    level: 20,
    species: 'plant',
    rank: 'soldier',
    role: 'brute',
    villain: false,
    traits: ['distante', 'de raízes profundas', 'adormecido', 'vingativo'],
    attributes: { DES: 6, AST: 8, VIG: 10, VON: 10 },
    hp: 100,
    crisis: 50,
    mp: 80,
    initiative: 7,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      bolt: 'immune',
      dark: 'vulnerable',
      earth: 'vulnerable',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Debater Inquieto',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 2,
        damage: 15,
        damageType: 'earth',
      },
      {
        name: 'Ronco',
        range: 'ranged',
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Bocejo',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que consiga ouvir a dornroschen fica lento.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Sono Perturbado',
        effect:
          'No fim do turno de cada inimigo, se ele causou dano à dornroschen ou a fez perder PV durante o turno, ela fica agitada. Se já estiver agitada, faz um ataque livre com Debater Inquieto contra esse inimigo, tratando o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
      {
        name: 'Despertar Brusco',
        effect:
          'Quando a dornroschen chega a 0 PV, ela acorda de repente e causa 20 de dano de terra a todos os aliados que veja.',
      },
      {
        name: 'Sonambulismo',
        effect:
          'A menos que esteja com 0 PV, a dornroschen está dormindo e não ouve nem vê nenhuma outra criatura. Mesmo assim, ainda pode mirar inimigos com seus ataques.',
      },
      {
        name: 'Torpor',
        effect:
          'No fim do turno dela, se a dornroschen não estiver agitada, ela recupera 20 PV. Se estiver agitada, recupera 10 PV e deixa de estar agitada.',
      },
    ],
  }),
  creature({
    name: 'Echinokore',
    page: 118,
    summary:
      'Donzela de espinhos gigante e maternal, campeã que alterna entre se enraizar atrás de uma barreira de espinhos e atacar com raízes e saraivadas.',
    body: '**Abordagens favoráveis:** ar, trevas, veneno, Resistência (físico, terra), fraco, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** físico, terra, fogo, luz, ataques corpo a corpo, Arcanos, feitiços de duração Cena, símbolos.',
    originalName: 'Echinokore',
    groupSlug: 'donzelas-de-espinhos',
    level: 30,
    species: 'plant',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo'],
    villain: true,
    traits: ['gigante', 'maternal', 'resistente', 'inabalável'],
    attributes: { DES: 6, AST: 8, VIG: 10, VON: 10 },
    hp: 400,
    crisis: 200,
    mp: 160,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      dark: 'vulnerable',
      earth: 'immune',
      fire: 'resistant',
      light: 'absorbs',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Raízes Esmagadoras',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'earth',
        effect:
          'As criaturas atingidas ficam envolvidas até a echinokore sofrer dano de um tipo a que seja Vulnerável.',
      },
      {
        name: 'Saraivada de Espinhos',
        range: 'ranged',
        accuracy: 'AST + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (2). Em rodadas ímpares, o dano dele ignora Resistências; em rodadas pares, o ataque mira a Defesa Mágica.',
      },
    ],
    spells: [
      {
        name: 'Fotossíntese Revigorante',
        mpCost: '10',
        target: 'Pessoal',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'A echinokore se recupera de envenenado e recupera 30 PV (40 PV se ela for de nível 40 ou mais).',
      },
      {
        name: 'Florada Suprema',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'A echinokore causa 35 de dano de terra a todos os inimigos que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Abraço da Donzela',
        effect:
          'A echinokore pode usar uma ação para fazer todos os inimigos envolvidos presentes na cena perderem 30 PV e ficarem atordoados e fracos.',
      },
      {
        name: 'Revelação das Profundezas Áridas',
        effect:
          'A echinokore pode usar uma ação e gastar 1 Ponto de Ultima para encerrar de imediato todos os feitiços de duração Cena, destruir todos os símbolos presentes na cena e dissipar à força todos os Arcanos.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Crescimento Florescente',
        effect:
          'Em rodadas pares, a echinokore causa 5 de dano extra com seus ataques e feitiços, e todas as fontes de dano causam 5 de dano extra a ela.',
      },
      {
        name: 'Bastião Entrincheirado',
        effect:
          'Em rodadas ímpares, a echinokore ganha Imunidade a dano físico.',
      },
      {
        name: 'Grande Barreira de Espinhos',
        effect:
          'Depois que um inimigo acerta a echinokore com um ataque corpo a corpo em uma rodada ímpar, ela causa 10 de dano físico a esse inimigo (depois que o ataque for resolvido).',
      },
    ],
  }),
  creature({
    name: 'Balor',
    page: 105,
    summary:
      'Demônio voador e delirante que semeia pavor e crueldade sem sentido; invoca raios descontrolados que podem atingir até ele mesmo.',
    body: '**Rotina:** Olho do Delírio (se puder e estiver voando) ou Mordida Frenética ➔ Roleta de Raios (em rodadas pares, se puder) ou Dreno do Desespero (se estiver em crise) ou Mordida Frenética ↺\n\n**Abordagens favoráveis:** ar, luz, veneno, Resistência (físico, raio, trevas), condições, imunidade (enfurecido), perda de PM.\n\n**Abordagens desfavoráveis:** raio, trevas, ataques corpo a corpo, feitiços ofensivos.',
    originalName: 'Balor',
    level: 20,
    species: 'demon',
    rank: 'elite',
    role: 'hunter',
    villain: false,
    traits: ['cruel', 'irracional', 'atormentado', 'perturbador'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 8 },
    hp: 160,
    crisis: 80,
    mp: 70,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      bolt: 'resistant',
      dark: 'resistant',
      light: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Dreno do Desespero',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'dark',
        effect: 'Se o alvo estiver enfurecido, o balor recupera 10 PV.',
      },
      {
        name: 'Mordida Frenética',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'physical',
      },
    ],
    spells: [
      {
        name: 'Olho do Delírio',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'O balor causa (RA + 15) de dano de trevas ao alvo, que fica enfurecido.',
      },
    ],
    otherActions: [
      {
        name: 'Roleta de Raios',
        effect:
          'O balor pode usar uma ação e gastar 20 PM para invocar uma descarga de raios fora de controle. Se fizer isso, causa 40 de dano de raio a uma criatura aleatória entre as que ele vê (inclusive ele mesmo). O dano desta ação não pode reduzir os PV atuais de uma criatura abaixo de 1.',
      },
    ],
    specialRules: [
      {
        name: 'Asas Desajeitadas',
        effect:
          'O balor é Vulnerável a dano de todos os tipos causado por armas das Categorias arco, arma de fogo e arremesso.',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Ódio à Magia',
        effect:
          'Depois que um inimigo que o balor veja acerta ou erra o balor com um feitiço ofensivo (O), o balor faz um ataque livre com Mordida Frenética contra esse inimigo (depois que o feitiço for resolvido). Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
      {
        name: 'Sussurros do Pavor',
        effect:
          'Quando o balor faz um teste resistido contra uma criatura atordoada, enfurecida e/ou abalada, o teste é um sucesso crítico se os dois dados mostrarem o mesmo número (e o resultado não for uma falha crítica).',
      },
    ],
  }),
  creature({
    name: 'Barometz',
    page: 107,
    summary:
      'Planta-ovelha gregária e territorial, que descarrega eletricidade pelos chifres espiralados e, ao cair, solta uma nuvem de lã de musgo.',
    body: '**Rotina:** Balido Fulminante (se dois ou mais inimigos estiverem crepitando) ou Corrente Entrelaçada (se puder) ou Galho Aríete ➔ Galho Aríete ↺\n\n**Abordagens favoráveis:** terra, gelo, veneno, Resistência (físico, raio), envenenado, fraco, imunidade (envenenado).\n\n**Abordagens desfavoráveis:** raio, atordoado, enfurecido, abalado.',
    originalName: 'Barometz',
    level: 5,
    species: 'plant',
    rank: 'elite',
    role: 'brute',
    villain: false,
    traits: ['eletrostático', 'volúvel', 'gregário', 'territorial'],
    attributes: { DES: 8, AST: 6, VIG: 10, VON: 8 },
    hp: 140,
    crisis: 70,
    mp: 55,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      bolt: 'immune',
      earth: 'vulnerable',
      ice: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Galho Aríete',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'physical',
      },
      {
        name: 'Balido Fulminante',
        range: 'ranged',
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'bolt',
        effect:
          'Este ataque tem multi (2) e só pode mirar inimigos crepitando. As criaturas crepitando atingidas por ele deixam de estar crepitando.',
      },
    ],
    spells: [
      {
        name: 'Corrente Entrelaçada',
        mpCost: '10',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        effect:
          'O barometz causa (RA + 10) de dano de raio ao alvo. Se o alvo perder 20 PV ou mais por esse dano, o barometz causa 5 de dano de raio a ele no início do próximo turno do barometz.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Aríete Furioso',
        effect:
          'No fim de cada turno de inimigo, se o barometz entrou em crise pela primeira vez na cena naquele turno, ele faz um ataque livre com Galho Aríete contra esse inimigo. Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
      {
        name: 'Voltagem Crepitante',
        effect:
          'Quando um inimigo perde PV por dano de raio causado pelo barometz, esse inimigo passa a estar crepitando.',
      },
      {
        name: 'Nuvem de Lã de Musgo',
        effect:
          'Quando o barometz chega a 0 PV, todo inimigo que ele veja fica envenenado e todo aliado que ele veja recupera 10 PV.',
      },
    ],
  }),
  creature({
    name: 'Basilisco',
    page: 109,
    summary:
      'Monstro-lagarto covarde e oportunista, que cospe veneno debilitante e mata com o olhar quem já está enfraquecido por condições.',
    body: '**Rotina:** Cuspe Debilitante (se os PV atuais forem pares) ou Arranhão ➔ Olhar do Basilisco (se puder, priorizando o inimigo com mais condições) ou Hálito do Brejo (se puder) ou Cuspe Debilitante ↺\n\n**Abordagens favoráveis:** ar, luz, Resistência (físico, terra, veneno), condições além de atordoado e envenenado, recuperação de condições, perda de PM.\n\n**Abordagens desfavoráveis:** raio, trevas, veneno, atordoado, envenenado.',
    originalName: 'Basilisk',
    level: 20,
    species: 'monster',
    rank: 'elite',
    role: 'saboteur',
    villain: false,
    traits: ['covarde', 'oportunista', 'paciente', 'venenoso'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 160,
    crisis: 80,
    mp: 110,
    initiative: 10,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'vulnerable',
      bolt: 'resistant',
      dark: 'resistant',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Arranhão',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
      },
      {
        name: 'Cuspe Debilitante',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'poison',
        effect: 'O alvo fica fraco.',
      },
    ],
    spells: [
      {
        name: 'Olhar do Basilisco',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 5,
        effect:
          'Se uma criatura atingida por este feitiço estiver sofrendo duas ou mais condições e não for campeã nem elite, ela perde metade dos PV atuais; caso contrário, o basilisco causa (RA + 20) de dano de trevas a ela. O dano deste feitiço ignora Resistências.',
      },
      {
        name: 'Hálito do Brejo',
        mpCost: '15 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 5,
        effect:
          'O basilisco causa (RA + 15) de dano de veneno a cada alvo atingido por este feitiço, e eles ficam envenenados. Este feitiço trata a Defesa Mágica do alvo como igual ao tamanho atual do dado de Vigor dele.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado e envenenado.',
      },
      {
        name: 'Olhar Aterrador',
        effect:
          'Depois que um inimigo faz um teste de Precisão ou de Magia para um ataque ou feitiço ofensivo (O) que incluía o basilisco entre os alvos, se o teste foi uma falha crítica, o basilisco aproveita a oportunidade resultante para fazer a ação Feitiço de graça, lançando Olhar do Basilisco contra esse inimigo. Ao lançá-lo assim, o basilisco ignora o custo em PM do feitiço.',
      },
    ],
  }),
  creature({
    name: 'Mantis Sangrenta',
    page: 111,
    summary:
      'Inseto predador de emboscada, com foices rubras e olhos que vislumbram futuros imediatos; enquanto estiver sem condições, resiste a dano físico e ignora Resistências.',
    body: '**Rotina:** Grito Estridente (se puder e não estiver sob Grito Estridente) ou Foice Serrilhada ➔ Colheita Escarlate (se puder e ao menos um inimigo estiver em crise, mirando um inimigo em crise) ou Varredura de Campo (se estiver em crise) ou Foice Serrilhada ↺\n\n**Abordagens favoráveis:** terra, fogo, Resistência (físico, ar), condições, perda de PM.\n\n**Abordagens desfavoráveis:** físico, ar, raio, gelo, luz, ataques corpo a corpo.',
    originalName: 'Blood Mantis',
    level: 20,
    species: 'beast',
    rank: 'elite',
    role: 'hunter',
    villain: false,
    traits: ['agressivo', 'guinchante', 'preciso', 'ligeiro'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 160,
    crisis: 80,
    mp: 80,
    initiative: 11,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'resistant',
      bolt: 'resistant',
      earth: 'vulnerable',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Foice Serrilhada',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'physical',
        effect:
          'Este ataque causa 5 de dano extra a criaturas que não estejam em crise.',
      },
      {
        name: 'Varredura de Campo',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 20,
        damageType: 'air',
        effect:
          'Este ataque tem multi (2). Depois que ele é resolvido, tenha acertado ou não, a mantis sangrenta não pode fazer ações nem ataques livres até o fim do próximo turno dela.',
      },
    ],
    spells: [
      {
        name: 'Colheita Escarlate',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect:
          'A mantis causa (RA + 15) de dano de ar ao alvo, com 10 de dano extra contra criaturas em crise. Se uma criatura chegar a 0 PV por este feitiço, a mantis recupera 10 PV. Este feitiço mira a Defesa em vez da Defesa Mágica.',
      },
      {
        name: 'Grito Estridente',
        mpCost: '10',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, depois que um inimigo acerta ou erra a mantis com um ataque corpo a corpo, ela faz um ataque livre com Foice Serrilhada contra esse inimigo (depois que o ataque for resolvido). Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano. Depois de dois ataques livres assim, o feitiço termina. Se um Personagem Jogador aprender este feitiço pelo Poder Imitação Mágica, troque a menção a Foice Serrilhada por “uma arma que você tenha equipada”.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Caçadora Presciente',
        effect:
          'Enquanto a mantis sangrenta não sofrer nenhuma condição, ela ganha Resistência a dano físico e todo dano que causa ignora Resistências.',
      },
    ],
  }),
  creature({
    name: 'Vespa-bomba',
    page: 113,
    summary:
      'Inseto enorme de abdômen cheio de ícor escaldante, que unta as presas com óleo inflamável e as incendeia; em enxame fica muito mais perigoso.',
    body: '**Variantes:** o *enxame de vespas-bomba* é um soldado sabotador de nível 5 com Vulnerabilidade a ar e gelo, Resistência a físico e terra, Imunidade a fogo e, no lugar de Pó Escaldante, o feitiço Zumbido Constante (20 PM, Especial, Instantânea): todo inimigo que consiga ouvir o enxame fica atordoado. A *rainha das vespas-bomba* é uma campeã 3 de apoio, nível 10, com o poder de chefe Reforços de Emergência, que conjura o feitiço Acelerar e tem o poder Explosão Derretida: depois que um ou mais aliados soldados chegam a 0 PV, a rainha deve gastar 10 PM (se puder); se gastar, causa 10 de dano de fogo a todos os inimigos que veja.\n\n**Rotina:** Pinças Oleosas ➔ Pó Escaldante (se puder) ou Ferrão Perfurante ↺\n\n**Abordagens favoráveis:** gelo, veneno, Resistência (físico, fogo), condições, perda de PM.\n\n**Abordagens desfavoráveis:** raio, fogo, luz, ataques corpo a corpo.',
    originalName: 'Bomb Hornet',
    level: 5,
    species: 'beast',
    rank: 'soldier',
    role: 'mage',
    villain: false,
    traits: ['agressivo', 'zumbidor', 'voador', 'escaldante'],
    attributes: { DES: 8, AST: 8, VIG: 6, VON: 10 },
    hp: 40,
    crisis: 20,
    mp: 65,
    initiative: 8,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      bolt: 'resistant',
      fire: 'immune',
      ice: 'vulnerable',
      light: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Pinças Oleosas',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 0,
        damage: 5,
        damageType: 'physical',
        effect:
          'O alvo fica inflamável. Quando uma criatura inflamável sofre dano de fogo, ela sofre 5 de dano extra e deixa de estar inflamável.',
      },
      {
        name: 'Ferrão Perfurante',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 0,
        damage: 5,
        damageType: 'physical',
      },
    ],
    spells: [
      {
        name: 'Pó Escaldante',
        mpCost: '5 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 0,
        effect:
          'A vespa causa (RA + 10) de dano de fogo a cada alvo atingido por este feitiço.',
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
    name: 'Bicho-papão',
    page: 121,
    summary:
      'Pequeno demônio de cabeça de abóbora, cruel, que persegue uma vítima e a reduz a 1 PV com um talho no sorriso.',
    body: '**Rotina:** Marca de Abóbora (se puder e ainda não estiver perseguindo um Personagem Jogador) ou Talho do Sorriso (priorizando o inimigo que estiver perseguindo, se houver) ➔ Luz Escaldante (se puder) ou Vanglória (em rodadas ímpares) ou Afiar com Alegria ↺\n\n**Abordagens favoráveis:** ar, gelo, luz, Resistência (físico, fogo), imunidade (abalado).\n\n**Abordagens desfavoráveis:** físico, trevas, fogo, falta de cura forte em um só alvo.',
    originalName: 'Bugaboo',
    level: 30,
    species: 'demon',
    rank: 'elite',
    role: 'hunter',
    villain: false,
    traits: ['cruel', 'reluzente', 'pequeno', 'assombrado'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 200,
    crisis: 100,
    mp: 80,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { physical: 'resistant', dark: 'resistant', fire: 'absorbs' },
    attacks: [
      {
        name: 'Talho do Sorriso',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 6,
        damage: null,
        damageType: null,
        effect:
          'O alvo fica abalado e, se o bicho-papão o estiver perseguindo, é reduzido a exatamente 1 PV.',
      },
      {
        name: 'Vanglória',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 6,
        damage: 10,
        damageType: 'physical',
        effect:
          'Em seguida, o bicho-papão recupera PV iguais à metade da perda total de PV sofrida pelo alvo.',
      },
    ],
    spells: [
      {
        name: 'Luz Escaldante',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'O bicho-papão causa (RA + 10) de dano de fogo ao alvo. Se uma criatura perder PV assim, na próxima vez nesta cena que uma fonte lhe causar dano, essa fonte causará 10 de dano extra e todo o dano dela ignorará Resistências.',
      },
    ],
    otherActions: [
      {
        name: 'Afiar com Alegria',
        effect:
          'O bicho-papão pode usar uma ação para afiar a arma com barulho. Se fizer isso, recupera 80 PM e se recupera de todas as condições.',
      },
      {
        name: 'Marca de Abóbora',
        effect:
          'O bicho-papão pode usar uma ação e gastar 10 PM para começar a perseguir o Personagem Jogador que veja com menos PV atuais e que possa ser alvo de um ataque corpo a corpo (em caso de empate, os Jogadores decidem quem é perseguido). Ele segue perseguindo esse personagem até o fim da cena ou até esse personagem ser atingido pelo Talho do Sorriso deste bicho-papão.',
      },
    ],
    specialRules: [
      {
        name: 'Boca Escancarada',
        effect:
          'Quando o bicho-papão faz Talho do Sorriso, a boca serrilhada se escancara e ele ganha Vulnerabilidade a dano de ar, gelo e luz até o fim da cena ou até fazer Afiar com Alegria ou Marca de Abóbora.',
      },
    ],
  }),
]);
