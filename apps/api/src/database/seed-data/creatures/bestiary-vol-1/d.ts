import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Esprit a Iudex: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1D: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Esprit',
    page: 140,
    summary:
      'Seres nascidos de uma onda de poder elemental que ganha uma centelha de consciência; o perfil completo é o do esprit de gelo, com variantes para cada tipo de dano.',
    body: 'Quando uma onda de poder elemental converge num único ponto, a massa formada pode ganhar uma centelha de consciência e dar origem a um esprit. Apesar das formas curiosas, essas criaturas encarnam a expressão mais pura do seu elemento, que pode se manifestar de modo destrutivo; como não falam nem se comunicam, a maioria as vê como desastres ambulantes. A maior parte some ainda jovem, mas alguns vivem o bastante para virar seres elementais poderosos.\n\n## Variantes\n\nO perfil completo é o do esprit de gelo; as variantes ligam-se aos tipos principais de dano. Combinar esprits de elementos opostos (fogo e gelo, luz e trevas) na mesma cena cria situações em que efeitos em vários alvos não podem ser usados à vontade, e sugere um lugar de grande instabilidade elemental. Em cada variante, Raios Congelantes troca de nome e de tipo de dano, e Onda de Esprit troca de tipo de dano e de condição.\n- **Esprit de terra:** Absorve terra; Vulnerável a ar. Onda de Esprit causa dano de terra e atordoado. Raios Sísmicos (terra).\n- **Esprit de chama:** Absorve fogo; Vulnerável a gelo. Onda causa dano de fogo e abalado. Raios Abrasadores (fogo).\n- **Esprit de ferro:** Absorve físico; Resistente a terra e gelo; Vulnerável a raio e fogo. Onda causa dano físico e lento. Raios Cinéticos (físico).\n- **Esprit prismático:** Absorve luz; Vulnerável a trevas. Onda causa dano de luz e atordoado. Raios Prismáticos (luz).\n- **Esprit de sombra:** Absorve trevas; Vulnerável a luz. Onda causa dano de trevas e fraco. Raios Sombrios (trevas).\n- **Esprit de trovão:** Absorve raio; Vulnerável a terra. Onda causa dano de raio e abalado. Raios Estáticos (raio).\n- **Esprit de vento:** Absorve ar; Vulnerável a raio. Onda causa dano de ar e lento. Raios Rodopiantes (ar).\n\n## Táticas\n\nTodos os esprits seguem, em geral, esta rotina (aqui, a do esprit de gelo): Drenar Espírito (se puder e tiver 30 PM ou menos) ou Onda de Esprit ➔ Raios Congelantes (se puder) ou Onda de Esprit ↺',
  }),
  creature({
    name: 'Esprit de Gelo',
    page: 142,
    summary:
      'Massa flutuante e muda de gelo elemental, que congela com ondas e raios e drena o PM das vítimas para se recuperar.',
    body: '**Abordagens favoráveis:** fogo, Resistência (gelo), atordoado, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** gelo, veneno, enfurecido, envenenado, abalado.',
    originalName: 'Ice Esprit',
    groupSlug: 'esprit',
    level: 10,
    species: 'elemental',
    rank: 'soldier',
    role: 'mage',
    villain: false,
    traits: ['enigmático', 'feito de gelo', 'flutuante', 'silencioso'],
    attributes: { DES: 6, AST: 10, VIG: 6, VON: 10 },
    hp: 50,
    crisis: 25,
    mp: 70,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { fire: 'vulnerable', ice: 'absorbs', poison: 'immune' },
    attacks: [
      {
        name: 'Onda de Esprit',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'ice',
        effect: 'O alvo fica lento.',
      },
    ],
    spells: [
      {
        name: 'Drenar Espírito',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        effect:
          'O alvo perde (RA + 20) PM. Em seguida, o esprit recupera PM iguais à metade da perda total de PM sofrida pelo alvo.',
      },
      {
        name: 'Raios Congelantes',
        mpCost: '10 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        effect:
          'O esprit causa (RA + 15) de dano de gelo a cada alvo atingido por este feitiço.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido, envenenado e abalado.',
      },
    ],
  }),
  creatureGroup({
    name: 'Galho da Forca',
    page: 144,
    summary:
      'Árvore nascida de uma semente ignorada, que se alimenta do fluxo de almas e espalha uma névoa corruptora; surge como um coração de névoa mortal e duas vinhas farpadas.',
    body: 'Bastou uma única semente, pequena, insignificante e ignorada. Aos poucos ela cresceu, afundando raízes no fluxo de almas, colhendo tristeza e desespero e prosperando com a dor de um mundo que escurece. Ao crescer, soltou uma névoa poluente por toda a floresta e além. Essa energia corruptora voltou à terra, e seus vapores tóxicos torceram mentes e espíritos: as feras ficaram mais vorazes, as pessoas, mais cruéis e frias. Se for deixado apodrecer, o Galho da Forca sufocará o mundo.\n\n## Táticas\n\nEm batalha, o Galho da Forca surge como um coração de névoa mortal, grotesco e imponente, acompanhado de duas vinhas farpadas. Para decidir qual vinha age primeiro a cada rodada, priorize a de menos PV atuais (em empate, decida aleatoriamente).\n\nRotina: Coração: Toque Murcho ➔ Vinha: Gancho Ardente (se puder e estiver em crise) ou Pancada Farpada ➔ Coração: Nuvem de Névoa Mortal (se puder, mirando um número de inimigos igual a três menos o número de vinhas farpadas presentes) ou Espinho de Névoa Mortal ➔ Vinha: Gancho Ardente (se puder e estiver em crise) ou Pancada Farpada ➔ Coração: Abraço da Névoa Mortal (em rodadas pares, se puder) ou Espinho de Névoa Mortal ↺',
  }),
  creature({
    name: 'Galho da Forca: Coração de Névoa Mortal',
    page: 147,
    summary:
      'Coração grotesco e atormentado do Galho da Forca: colhe almas lamentosas, crava espinhos mortais nos inimigos e sufoca a cena com névoa tóxica.',
    body: '**Abordagens favoráveis:** físico, ar, fogo, luz, Resistência (trevas, gelo), atordoado, enfurecido, recuperação de condições, cura.\n\n**Abordagens desfavoráveis:** trevas, terra, gelo, veneno, envenenado, abalado, fraco, feitiços de duração Cena.',
    originalName: 'Gallowbranch (Deathmist Heart)',
    groupSlug: 'galho-da-forca',
    level: 20,
    species: 'undead',
    rank: 'champion',
    championX: 3,
    role: 'saboteur',
    flags: ['unique'],
    villain: true,
    traits: ['amaldiçoado', 'assomando', 'murmurante', 'torturado'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 240,
    crisis: 120,
    mp: 160,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'vulnerable',
      air: 'vulnerable',
      dark: 'immune',
      earth: 'immune',
      fire: 'vulnerable',
      ice: 'immune',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Toque Murcho',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'dark',
        effect:
          'Este ataque tem multi (2). Depois que ele é resolvido, tenha acertado ou não, se não houver vinhas farpadas na cena, o coração recupera 10 PV por alvo atingido.',
      },
      {
        name: 'Espinho de Névoa Mortal',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        damage: null,
        damageType: null,
        effect:
          'O alvo perde todos os espinhos mortais (veja Almas Lamentosas, abaixo). Em seguida, perde PV iguais a (20 + (5 multiplicado pelo número de espinhos mortais que perdeu assim)).',
      },
    ],
    spells: [
      {
        name: 'Nuvem de Névoa Mortal',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'O coração causa (RA + 15) de dano de gelo a cada alvo atingido por este feitiço. Inimigos que perdem PV assim ficam fracos.',
      },
    ],
    otherActions: [
      {
        name: 'Abraço da Névoa Mortal',
        effect:
          'O coração pode usar uma ação e gastar 20 PM para emitir uma nuvem espessa e pesada de energia de almas corrompida. Se fizer isso, todo inimigo que ele veja fica envenenado; em seguida, toda criatura presente na cena e envenenada deixa de ser afetada por todos os feitiços de duração Cena que a afetavam.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições envenenado, abalado e fraco.',
      },
      {
        name: 'Desespero Antigo',
        effect:
          'Enquanto o coração estiver presente na cena, qualquer Personagem Jogador que sofra duas ou mais condições não pode evocar Traços e Laços.',
      },
      {
        name: 'Morto-vivo Atormentado',
        effect:
          'O coração pode ser ferido por efeitos que restauram PV (veja o Livro Básico, p. 305). No entanto, se um Personagem Jogador o faz perder PV assim, a perda é igual à recuperação (em vez de pela metade).',
      },
      {
        name: 'Almas Lamentosas',
        effect:
          'Depois que um inimigo faz o coração perder PV, esse inimigo ganha 1 espinho mortal; ganha 2 se a perda foi causada por dano de luz e/ou se o coração estiver em crise. As criaturas perdem todos os espinhos mortais no fim de cada cena.',
      },
    ],
  }),
  creature({
    name: 'Galho da Forca: Vinha Farpada',
    page: 146,
    summary:
      'Vinha farpada e oleosa que protege o coração de névoa mortal e reduz toda cura recebida pelos inimigos.',
    body: '**Abordagens favoráveis:** terra, gelo, veneno, Resistência (físico, fogo), envenenado, lento, fraco, perda de PM.\n\n**Abordagens desfavoráveis:** raio, fogo, luz, atordoado, enfurecido, abalado.',
    originalName: 'Gallowbranch (Barbed Vine)',
    groupSlug: 'galho-da-forca',
    level: 20,
    species: 'plant',
    rank: 'soldier',
    role: 'sentinel',
    flags: ['part'],
    villain: false,
    traits: ['farpado', 'debatendo-se', 'instintivo', 'oleoso'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 100,
    crisis: 50,
    mp: 70,
    initiative: 8,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      bolt: 'resistant',
      earth: 'vulnerable',
      fire: 'immune',
      ice: 'vulnerable',
      light: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Pancada Farpada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
      },
    ],
    spells: [
      {
        name: 'Gancho Ardente',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect:
          'A vinha causa (RA + 15) de dano de fogo ao alvo, que não pode fazer as ações Guarda e Feitiço até o fim do próximo turno dele. Este feitiço mira a Defesa em vez da Defesa Mágica.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Espinhos Carmesim',
        effect:
          'Enquanto duas ou mais vinhas farpadas estiverem presentes na cena, as Afinidades básicas do coração de névoa mortal a dano físico, de ar, de fogo e de luz são substituídas por Resistências.',
      },
      {
        name: 'Cura Dolorosa',
        effect:
          'Quando um inimigo que a vinha veja recupera PV, a quantidade recuperada é reduzida em 5 para cada vinha farpada presente na cena.',
      },
    ],
  }),
  creatureGroup({
    name: 'Gargântuas',
    page: 148,
    summary:
      'Gigantes ancestrais e sábios que crescem a vida inteira; o grendel e o Humbaba, o Rei Gargântua, seguem a mesma rotina.',
    body: 'Imensas e ancestrais, as gargântuas são criaturas de lenda. Dizem que nasce apenas uma a cada poucos séculos, mas elas crescem a vida toda, às vezes chegando ao tamanho de uma cidade pequena. Longe de meras feras, acredita-se que sejam sábias e inteligentes, embora quase nunca se deem ao trabalho de aprender línguas comuns, e por isso seus segredos raramente são partilhados. Há até rumores de uma gargântua colossal de milênios, cujas cristas dorsais cresceram e viraram asas que eclipsam o céu: é conhecida como Humbaba, ou Rei Gargântua.\n\n## Táticas\n\nO grendel e o Humbaba seguem a mesma rotina; o que os diferencia são as Afinidades, o modo violento de reagir ao comportamento inimigo e os efeitos específicos das ações.\n\nRotina: Patada (se os PV atuais forem pares) ou Salto Brutal ➔ Rugido Gargantuesco ➔ Patada ➔ Salto Brutal ↺',
  }),
  creature({
    name: 'Grendel',
    page: 150,
    summary:
      'Gargântua furiosa e imensa, campeã solitária que responde a golpes certeiros com Clarão e se livra das condições ao atacar em crise.',
    body: '**Abordagens favoráveis:** terra, gelo, veneno, Resistência (físico, raio), envenenado, fraco, perda de PM.\n\n**Abordagens desfavoráveis:** ar, raio, fogo, atordoado, abalado, ataques, feitiços de duração Cena.',
    originalName: 'Grendel',
    groupSlug: 'gargantuas',
    level: 30,
    species: 'monster',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo'],
    villain: false,
    traits: ['fluindo de magia', 'maciço', 'poderoso', 'de pavio curto'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 480,
    crisis: 240,
    mp: 160,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'resistant',
      bolt: 'resistant',
      earth: 'vulnerable',
      fire: 'immune',
      ice: 'vulnerable',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Salto Brutal',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
        effect:
          'Se este ataque acertar um ou mais inimigos e o grendel estiver em crise, ele se recupera de todas as condições.',
      },
      {
        name: 'Patada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Rugido Gargantuesco',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'bolt',
        effect:
          'O alvo fica atordoado. Se já estava atordoado, em vez disso deixa de ser afetado por todos os feitiços de duração Cena que o afetavam.',
      },
    ],
    spells: [
      {
        name: 'Clarão',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        effect:
          'O grendel causa (RA + 30) de dano de fogo ao alvo. Esse dano ignora Resistências.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições atordoado e abalado.' },
      {
        name: 'Orgulho Flamejante',
        effect:
          'Depois que um inimigo acerta o grendel com um ataque, se o resultado do teste de Precisão foi um número par, o grendel faz a ação Feitiço de graça, lançando Clarão contra esse inimigo (depois que o ataque for resolvido; o grendel ainda deve gastar PM e fazer o teste de Magia normalmente).',
      },
      {
        name: 'Rosnado Furioso',
        effect:
          'Depois que o grendel falha em um teste resistido durante o turno de um inimigo, esse inimigo fica abalado e perde 10 PM.',
      },
    ],
  }),
  creature({
    name: 'Humbaba',
    page: 151,
    summary:
      'Rei Gargântua milenar, de asas que eclipsam o céu: cada golpe e cada ferida enchem seu Relógio de ira, até soltar o Aster Sombrio.',
    body: '**Abordagens favoráveis:** terra, gelo, Resistência (físico, trevas, fogo), fraco, imunidade (atordoado), perda de PM.\n\n**Abordagens desfavoráveis:** físico, ar, raio, trevas, fogo, atordoado, envenenado, abalado, várias perdas de PV, feitiços de duração Cena.',
    originalName: 'Humbaba',
    groupSlug: 'gargantuas',
    level: 40,
    species: 'monster',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['ancestral', 'colossal', 'impregnado de magia', 'de pavio curto'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 10 },
    hp: 560,
    crisis: 280,
    mp: 200,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'resistant',
      bolt: 'resistant',
      dark: 'resistant',
      earth: 'vulnerable',
      fire: 'immune',
      ice: 'vulnerable',
    },
    attacks: [
      {
        name: 'Patada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (2). Se acertar todos os alvos, o Humbaba se recupera de todas as condições.',
      },
      {
        name: 'Salto Brutal',
        range: 'ranged',
        accuracy: 'VIG + VIG',
        accuracyBonus: 4,
        damage: 20,
        damageType: 'physical',
        effect:
          'Se este ataque errar todos os alvos, o Humbaba causa 5 de dano de raio a todos os inimigos que veja.',
      },
    ],
    spells: [
      {
        name: 'Aster Sombrio',
        mpCost: '40',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O Humbaba causa 25 de dano de trevas a todos os inimigos que veja. Em seguida, causa 20 de dano de fogo a todos os inimigos que veja.',
      },
    ],
    otherActions: [
      {
        name: 'Rugido Gargantuesco',
        effect:
          'O Humbaba pode usar uma ação para soltar um rugido feroz. Se fizer isso, todo inimigo que consiga ouvi-lo fica atordoado; então, se o Humbaba estiver em crise, todo inimigo que consiga ouvi-lo e esteja atordoado deixa de ser afetado por todos os feitiços de duração Cena que o afetavam.',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, envenenado e abalado.',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Ira Crescente',
        effect:
          'O Humbaba entra em cada conflito com um Relógio de quatro seções, vazio, chamado “Aster Sombrio”. Depois que o Humbaba falha em um teste resistido durante o turno de um inimigo ou perde PV, preencha 1 seção desse Relógio; preencha 2 seções se a perda de PV foi causada por dano de um tipo a que o Humbaba era Vulnerável.',
      },
      {
        name: 'Ira Liberada',
        effect:
          'No início do turno do Humbaba, se o Relógio Aster Sombrio dele estiver cheio, apague todas as seções. Então, se alguma seção foi apagada assim, o Humbaba deve usar a primeira ação disponível naquele turno para fazer a ação Feitiço e lançar Aster Sombrio. Se não puder lançá-lo por falta de PM ou por qualquer outro motivo, o Humbaba perde todas as ações daquele turno.',
      },
    ],
  }),
  creatureGroup({
    name: 'Fantasmas',
    page: 152,
    summary:
      'Ecos de consciências que não voltaram ao fluxo de almas; o geist, o navio fantasma e o dullahan com sua carruagem espectral.',
    body: 'Fantasmas são ecos de consciências que não conseguiram voltar ao fluxo de almas depois da morte, recusando-se a se dissolver nele e a abraçar o descanso eterno. Permanecem em nosso mundo agarrados a fragmentos do passado: uma lembrança vívida de pouco antes de morrer, uma emoção forte ou até a recordação mais querida. Esses vínculos logo se distorcem em obsessões, e o fantasma vira uma imitação oca do que deu sentido à sua vida.\n\n## Táticas\n\n- Geist: Aperto de Gelo Sanguíneo (em rodadas ímpares, se puder) ou Garra Caçadora de Vida ↺\n- Navio Fantasma: Dobre do Mar Profundo (se puder e ao menos um inimigo não estiver abalado) ou Descarga em Chamas ➔ Redemoinho Uivante (se puder) ou Descarga em Chamas ➔ Ventre Esquelético (se nenhum inimigo estiver engolido e ao menos um estiver sofrendo duas ou mais condições) ou Feitiço Vampírico (se um inimigo que conhece feitiços estiver engolido, lançando o feitiço aleatório da forma mais eficaz possível) ou Abalroada de Caveira ↺\n- Dullahan e Carruagem Espectral (juntos): Carruagem: Rodas Pisoteadoras ➔ Dullahan: Olhar sem Olhos (se a carruagem espectral ainda estiver presente) ou Empalamento dos Condenados (em rodadas pares, priorizando o PJ condenado com mais PV atuais) ou Desafio do Dullahan ➔ Dullahan: Golpe Ceifador ➔ Carruagem: Fogo-Espectro (se puder e os PV atuais forem pares) ou Investida Trêmula ➔ Dullahan: Correntes do Terror (se puder) ou Golpe Ceifador ↺',
  }),
  creature({
    name: 'Geist',
    page: 154,
    summary:
      'Fantasma semicorpóreo e voraz, imune a quase todo dano enquanto está sem condições; gela a vítima e caça quem ainda não está em crise.',
    originalName: 'Geist',
    groupSlug: 'fantasmas',
    level: 10,
    species: 'undead',
    rank: 'soldier',
    role: 'hunter',
    villain: false,
    traits: ['cruel', 'obcecado', 'voraz', 'semicorpóreo'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 60,
    crisis: 30,
    mp: 40,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'vulnerable',
      dark: 'immune',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Garra Caçadora de Vida',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 4,
        damage: 10,
        damageType: 'dark',
        effect:
          'Este ataque causa 5 de dano extra a criaturas que não estejam em crise.',
      },
    ],
    spells: [
      {
        name: 'Aperto de Gelo Sanguíneo',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        effect:
          'O geist causa (RA + 10) de dano de gelo ao alvo. Este feitiço trata a Defesa Mágica do alvo como igual ao tamanho atual do dado de Vigor dele.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Semicorpóreo',
        effect:
          'Enquanto o geist não sofrer nenhuma condição, ele ganha Imunidade a todos os tipos de dano exceto luz.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Navio Fantasma',
    page: 155,
    summary:
      'Galeão amaldiçoado e flutuante que engole inimigos cheios de condições e lança, às cegas, os feitiços que eles conhecem.',
    originalName: 'Ghost Ship',
    groupSlug: 'fantasmas',
    level: 10,
    species: 'undead',
    rank: 'champion',
    championX: 3,
    role: 'saboteur',
    flags: ['solo'],
    villain: true,
    traits: ['condenado', 'sinistro', 'flutuante', 'incansável'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 210,
    crisis: 105,
    mp: 100,
    initiative: 11,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      physical: 'resistant',
      air: 'vulnerable',
      bolt: 'vulnerable',
      dark: 'immune',
      fire: 'resistant',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Abalroada de Caveira',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
      },
      {
        name: 'Descarga em Chamas',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'fire',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Redemoinho Uivante',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        effect:
          'O navio fantasma causa (RA + 15) de dano de gelo ao alvo, que fica lento.',
      },
      {
        name: 'Dobre do Mar Profundo',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que o navio fantasma veja fica abalado.',
      },
    ],
    otherActions: [
      {
        name: 'Ventre Esquelético',
        effect:
          'O navio fantasma pode usar uma ação para abrir a quilha de madeira. Se fizer isso, o inimigo com mais PV atuais entre os que sofrem duas ou mais condições é engolido até o fim da cena, até o navio sofrer uma perda de 25 PV ou mais, ou até ele fazer Feitiço Vampírico ou Abalroada de Caveira.',
      },
      {
        name: 'Feitiço Vampírico',
        effect:
          'O navio fantasma pode usar uma ação para fazer a ação Feitiço de graça, lançando um feitiço aleatório entre os que a criatura engolida conhece, ignorando o custo em PM (ainda deve fazer o teste de Magia, se exigido).',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
      {
        name: 'Invisíveis',
        effect:
          'Criaturas engolidas não podem fazer ataques livres nem ações e ficam invisíveis para as outras criaturas.',
      },
    ],
  }),
  creature({
    name: 'Dullahan',
    page: 157,
    summary:
      'Cavaleiro decapitado e implacável, que condena os Personagens ao iniciar a caçada e os ceifa para recuperar PV.',
    body: '**Abordagens favoráveis:** raio, fogo, luz, Resistência (trevas, gelo), condições, perda de PM, impedir a recuperação de PV.\n\n**Abordagens desfavoráveis:** físico, trevas, gelo, veneno, envenenado, feitiços de duração Cena, efeitos baseados na audição.',
    originalName: 'Dullahan',
    groupSlug: 'fantasmas',
    level: 30,
    species: 'undead',
    rank: 'champion',
    championX: 3,
    role: 'hunter',
    villain: true,
    traits: ['blindado', 'assustador', 'sem cabeça', 'implacável'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 300,
    crisis: 150,
    mp: 160,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
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
        name: 'Golpe Ceifador',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 6,
        damage: 15,
        damageType: 'dark',
        effect:
          'O dullahan recupera PV iguais à metade da perda total de PV sofrida pelo alvo.',
      },
      {
        name: 'Olhar sem Olhos',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 6,
        damage: 10,
        damageType: 'ice',
        effect:
          'Este ataque mira a Defesa Mágica e causa 5 de dano extra contra inimigos condenados e/ou que sofram uma ou mais condições entre atordoado e abalado.',
      },
      {
        name: 'Empalamento dos Condenados',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 6,
        damage: 10,
        damageType: 'dark',
        effect:
          'Se o alvo estiver condenado, ele deixa de estar condenado e também deixa de ser afetado por todos os feitiços de duração Cena que o afetavam.',
      },
    ],
    spells: [
      {
        name: 'Correntes do Terror',
        mpCost: '40',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O dullahan causa 30 de dano de trevas a todos os inimigos que veja. Todo inimigo que perder PV por esse dano também fica abalado.',
      },
    ],
    otherActions: [
      {
        name: 'Desafio do Dullahan',
        effect:
          'O dullahan pode usar uma ação para escolher um inimigo condenado aleatório que veja. Se não houver inimigos condenados, escolhe um inimigo aleatório que veja. Se fizer isso, na próxima vez antes do fim da cena em que o dullahan fizer Golpe Ceifador, ele deve mirar esse inimigo, se puder; o ataque também causa 10 de dano extra, e todo o dano dele ignora Resistências e Imunidades.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Caçada Sem Cabeça',
        effect:
          'Quando um Personagem Jogador faz seu turno, se for o primeiro a fazê-lo na rodada, ele fica condenado até o fim da cena ou até o dullahan lançar Correntes do Terror.',
      },
      {
        name: 'Cabeça Perdida',
        effect:
          'Até a cabeça do dullahan ser devolvida, ele não consegue ouvir nem entender outras criaturas. Porém, consegue vê-las e pode mirá-las normalmente.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Carruagem Espectral',
    page: 156,
    summary:
      'Carruagem fantasma veloz do dullahan: atropela, protege o cavaleiro de ataques e adianta Relógios de fuga ou perseguição.',
    body: '**Abordagens favoráveis:** ar, gelo, luz, Resistência (físico, trevas, terra), condições.\n\n**Abordagens desfavoráveis:** trevas, terra, fogo, veneno, envenenado, ataques, feitiços ofensivos.',
    originalName: 'Spectral Chariot',
    groupSlug: 'fantasmas',
    level: 30,
    species: 'undead',
    rank: 'elite',
    role: 'sentinel',
    villain: false,
    traits: ['veloz', 'flutuante', 'pesadelar', 'previsível'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 220,
    crisis: 110,
    mp: 80,
    initiative: 10,
    defense: { value: 4, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'vulnerable',
      dark: 'immune',
      earth: 'resistant',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Rodas Pisoteadoras',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'O dullahan não pode ser alvo de ataques e feitiços ofensivos (O) até o início do próximo turno da carruagem espectral, ou até ela perder PV por dano de um tipo a que seja Vulnerável. Este ataque tem multi (2); tem multi (3) se o dullahan não estiver mais presente na cena.',
      },
      {
        name: 'Investida Trêmula',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'earth',
        effect: 'O alvo fica atordoado.',
      },
    ],
    spells: [
      {
        name: 'Fogo-Espectro',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        effect:
          'A carruagem espectral causa (RA + 15) de dano de trevas ao alvo.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Galope Incansável',
        effect:
          'No fim de cada rodada, a carruagem espectral pode preencher ou apagar 1 seção de um Relógio presente na cena e ligado a fugir ou perseguir.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creatureGroup({
    name: 'Gigantes',
    page: 158,
    summary:
      'Máquinas antigas de núcleos de alma elementais, que ainda patrulham grandes labirintos; o soldado de ferro e o defensor de oricalco.',
    body: 'Essas máquinas formidáveis, forjadas em eras antigas, ainda patrulham os corredores de grandes labirintos, com os núcleos de alma cintilando de energia elemental. Embora perdida no tempo, a técnica de criar um gigas é cobiçada por muitos reinos e impérios com aspirações de conquista.\n\n## Táticas\n\n- Soldado de Ferro: Lâmina Pesada ➔ Golpe de Rocha (se puder, em rodadas ímpares) ou Pisoteio ↺\n- Defensor de Oricalco: Monitoramento (se puder e nenhum aliado estiver monitorado) ou Rajada de Calor (em rodadas pares, se puder) ou Soco de Oricalco ➔ Serra Giratória ↺',
  }),
  creature({
    name: 'Soldado de Ferro',
    page: 160,
    summary:
      'Gigante de ferro leal e previsível: retarda com golpes pesados, atira rochas e protege os aliados contra dano de terra.',
    originalName: 'Iron Soldier',
    groupSlug: 'gigantes',
    level: 10,
    species: 'construct',
    rank: 'elite',
    role: 'sentinel',
    villain: false,
    traits: ['imponente', 'leal', 'metálico', 'previsível'],
    attributes: { DES: 8, AST: 6, VIG: 10, VON: 8 },
    hp: 140,
    crisis: 70,
    mp: 60,
    initiative: 9,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      bolt: 'vulnerable',
      earth: 'immune',
      fire: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Lâmina Pesada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect:
          'O alvo fica lento; se já estava lento, em vez disso todo dano que ele causar é reduzido em 5 (antes de aplicar as Afinidades) até o fim do próximo turno dele.',
      },
      {
        name: 'Pisoteio',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'physical',
        effect:
          'Enquanto o soldado de ferro estiver em crise, este ataque ganha multi (2) e causa dano de terra em vez de físico.',
      },
    ],
    spells: [
      {
        name: 'Golpe de Rocha',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        effect: 'O soldado de ferro causa (RA + 15) de dano de terra ao alvo.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Placas Derretendo',
        effect:
          'Quando o soldado de ferro sofre dano de fogo, ele também fica lento.',
      },
      {
        name: 'Mitigação Sísmica',
        effect:
          'Enquanto o soldado de ferro estiver presente na cena e não estiver em crise, os aliados dele ganham Resistência a dano de terra.',
      },
    ],
  }),
  creature({
    name: 'Defensor de Oricalco',
    page: 161,
    summary:
      'Gigante de oricalco que monitora um aliado, divide com ele suas Resistências e Imunidades e retalia com serras quem o ferir.',
    body: '**Abordagens favoráveis:** raio, trevas, gelo, Resistência (físico, fogo), abalado, lento, fraco, imunidade (fraco).\n\n**Abordagens desfavoráveis:** físico, terra, fogo, luz, veneno, envenenado.',
    originalName: 'Orichalcum Defender',
    groupSlug: 'gigantes',
    level: 30,
    species: 'construct',
    rank: 'elite',
    role: 'sentinel',
    villain: false,
    traits: ['imponente', 'leal', 'metálico', 'previsível'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 220,
    crisis: 110,
    mp: 80,
    initiative: 10,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      physical: 'resistant',
      bolt: 'vulnerable',
      dark: 'vulnerable',
      earth: 'resistant',
      fire: 'immune',
      ice: 'vulnerable',
      light: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Serra Giratória',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'O alvo fica fraco. Este ataque tem multi (2) enquanto o defensor não estiver em crise.',
      },
      {
        name: 'Soco de Oricalco',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
      },
    ],
    spells: [
      {
        name: 'Rajada de Calor',
        mpCost: '10 × A',
        target: 'Até duas criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        effect:
          'O defensor causa (RA + 20) de dano de fogo a cada alvo atingido por este feitiço. O dano deste feitiço ignora as Resistências dos alvos fracos.',
      },
    ],
    otherActions: [
      {
        name: 'Monitoramento',
        effect:
          'O defensor pode usar uma ação e gastar 20 PM para escolher um aliado que veja: esse aliado fica monitorado pelo defensor. O efeito termina se o defensor sofrer dano de um tipo a que seja Vulnerável ou se começar a monitorar outro aliado.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Contra-ataque de Serra',
        effect:
          'No fim de cada turno de inimigo, se esse inimigo fez o aliado monitorado do defensor perder PV durante o turno, o defensor deve fazer um ataque livre com Serra Giratória contra esse inimigo. Esse ataque perde a propriedade multi e o resultado alto (RA) do teste de Precisão é tratado como 0 ao determinar o dano.',
      },
      {
        name: 'Modelo de Proteção',
        effect:
          'Enquanto o defensor estiver monitorando um aliado, esse aliado ganha Resistência a todos os tipos de dano a que o defensor seja Resistente no momento e Imunidade a todos os tipos de dano a que o defensor seja Imune no momento.',
      },
      {
        name: 'Sobrecarga Estática',
        effect: 'Quando o defensor sofre dano de raio, ele também fica lento.',
      },
      {
        name: 'Protocolo de Defesa Total',
        effect:
          'Quando o defensor entra em crise pela primeira vez durante uma cena, ele se recupera de todas as condições; depois, ganha Imunidade a todos os tipos de dano exceto raio, trevas e gelo até o fim da cena.',
      },
    ],
  }),
  creature({
    name: 'Górgona',
    page: 163,
    summary:
      'Guardiã Cardeal colossal do Deserto Ocidental, sábia e paciente; fica imóvel para não causar desastres e só se enfurece contra quem mente ou destrói conhecimento.',
    body: '**Rotina:** Agarrão Titânico ➔ Pedra Verdadeira (se puder) ou Pisada ➔ Guarda ➔ Pilares de Ametista (se puder) ou Pisada ↺\n\n**Abordagens favoráveis:** ar, gelo, Resistência (físico, terra), fraco, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** físico, raio, terra, veneno, enfurecido, envenenado, ataques à distância, abusar de condições.',
    originalName: 'Gorgon',
    level: 30,
    species: 'elemental',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['eterno', 'contemplativo', 'imensurável', 'sábio'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 480,
    crisis: 240,
    mp: 180,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      bolt: 'immune',
      earth: 'absorbs',
      ice: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Pisada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'earth',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Agarrão Titânico',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
        effect:
          'Este ataque pode mirar criaturas que normalmente não poderiam ser alvo de ataques corpo a corpo.',
      },
    ],
    spells: [
      {
        name: 'Pilares de Ametista',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'A Górgona causa 30 de dano de terra a todos os inimigos que veja e que não estejam lançados, voando, flutuando, caindo ou de outro modo no ar. Cada criatura que perder 30 PV ou mais por esse dano fica lançada até o início do próximo turno dela. Criaturas lançadas não podem ser alvo de ataques corpo a corpo. Quando uma criatura lançada sofre dano, ela sofre 5 de dano extra e deixa de estar lançada.',
      },
      {
        name: 'Pedra Verdadeira',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        effect:
          'A Górgona causa (RA + 25) de dano de terra ao alvo. Esse dano não pode ser reduzido por nenhum efeito e também ignora Resistências e Imunidades.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido e envenenado.',
      },
      {
        name: 'Âmbar da Purificação',
        effect:
          'No fim de cada turno da Górgona, se ela estiver sofrendo três ou mais condições, ela se recupera de todas as condições.',
      },
      {
        name: 'Postura do Cobre Trançado',
        effect:
          'Quando a Górgona faz a ação Guarda, se não estiver em crise, suas serpentes formam um emaranhado intrincado que rebate projéteis. Até o início do próximo turno dela, ela ganha Absorção a dano de raio e não pode ser alvo de ataques à distância.',
      },
      {
        name: 'Postura do Ferro Bruto',
        effect:
          'Quando a Górgona faz a ação Guarda, se estiver em crise, seu corpo vira uma massa volumosa de pedra impenetrável. Ela recupera 30 PM e ganha Imunidade a dano físico até o início do próximo turno dela.',
      },
      {
        name: 'Turquesa do Entendimento',
        effect:
          'Testes fracassados de ações Impedimento ou Objetivo feitos por inimigos na presença da Górgona são tratados como falhas críticas se dependerem de mentiras ou enganos.',
      },
    ],
  }),
  creature({
    name: 'Harpia',
    page: 165,
    summary:
      'Guardião Cardeal do Oceano Oriental, volúvel como os ventos que encarna; protege a corte do céu com Graça da Ventania e acerta com penas afiadas e vento verdadeiro.',
    body: '**Rotina:** Graça da Ventania (se puder e Harpia e/ou aliados não estiverem sob Graça da Ventania, mirando o máximo deles e priorizando aliados) ou Turbulência ➔ Corte de Pena ➔ Vento Verdadeiro (se puder) ou Corte de Pena ↺\n\n**Abordagens favoráveis:** raio, gelo, Resistência (físico, ar), atordoado, enfurecido, imunidade (fraco), dissipar efeitos.\n\n**Abordagens desfavoráveis:** ar, terra, veneno, abalado, lento, envenenado, ataques corpo a corpo.',
    originalName: 'Harpy',
    level: 30,
    species: 'elemental',
    rank: 'champion',
    championX: 3,
    role: 'support',
    flags: ['unique'],
    villain: true,
    traits: ['eterno', 'veloz', 'amante da liberdade', 'temperamental'],
    attributes: { DES: 10, AST: 8, VIG: 6, VON: 10 },
    hp: 300,
    crisis: 150,
    mp: 160,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'absorbs',
      bolt: 'vulnerable',
      earth: 'immune',
      ice: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Corte de Pena',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'Se um inimigo perder PV por este dano, ele também fica fraco. Se já estava fraco, em vez disso Harpia recupera 20 PM.',
      },
      {
        name: 'Turbulência',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'air',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Graça da Ventania',
        mpCost: '5 × A',
        target: 'Até três criaturas',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, cada alvo fica imune a lento e ganha Resistência a dano físico causado por ataques à distância.',
      },
      {
        name: 'Vento Verdadeiro',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'Harpia causa (RA + 25) de dano de ar ao alvo. Esse dano não pode ser reduzido por nenhum efeito e também ignora Resistências e Imunidades.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições envenenado, abalado e lento.',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Brisa Suave',
        effect:
          'No fim de cada turno de Harpia, se ela não estiver em crise, todo aliado afetado por Graça da Ventania recupera 20 PV.',
      },
      {
        name: 'Ventania Rugente',
        effect:
          'Uma vez por turno, depois que um aliado acerta um ou mais inimigos com um ataque, se esse aliado estiver afetado por Graça da Ventania e Harpia estiver em crise, Harpia faz um ataque livre com Corte de Pena contra um desses inimigos, escolhido aleatoriamente (depois que o ataque do aliado for resolvido). Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
      {
        name: 'Resolução Teimosa',
        effect:
          'Quando Harpia preenche ou apaga uma ou mais seções de um Relógio, ela preenche ou apaga uma seção adicional desse Relógio para cada condição que esteja sofrendo.',
      },
    ],
  }),
  creature({
    name: 'Hidra',
    page: 167,
    summary:
      'Monstro de muitas cabeças e veneno mortal que regenera cabeças e se enterra ao entrar em crise; guarda ressentimento antigo contra a humanidade.',
    body: '**Rotina:** Mordida Rápida ➔ Roer ➔ Sopro Venenoso (se puder) ou Roer ➔ Guarda ↺\n\n**Abordagens favoráveis:** terra, fogo, Resistência (físico, veneno), abalado, lento, fraco, imunidade (lento), perda de PM.\n\n**Abordagens desfavoráveis:** físico, gelo, veneno, atordoado, envenenado, ataques corpo a corpo.',
    originalName: 'Hydra',
    level: 20,
    species: 'monster',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo'],
    villain: true,
    traits: ['agressivo', 'instruído', 'de muitas cabeças', 'forte'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 400,
    crisis: 200,
    mp: 140,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { fire: 'vulnerable', ice: 'resistant', poison: 'resistant' },
    attacks: [
      {
        name: 'Roer',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect:
          'Este ataque causa dano extra igual ao número atual de cabeças da hidra.',
      },
      {
        name: 'Mordida Rápida',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'poison',
        effect:
          'Enquanto a hidra não estiver em crise, este ataque tem multi (2). Enquanto estiver em crise, o dano deste ataque ignora Resistências.',
      },
    ],
    spells: [
      {
        name: 'Sopro Venenoso',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect:
          'A hidra causa (RA + 20) de dano de veneno ao alvo, que fica lento.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado e envenenado.',
      },
      {
        name: 'Monstruosidade Escavadora',
        effect:
          'Quando a hidra entra em crise pela primeira vez durante um conflito, ela se enterra no chão e emerge só em parte: perde a Vulnerabilidade a dano de fogo, ganha Resistência a dano físico e ganha Vulnerabilidade a dano de terra.',
      },
      {
        name: 'Cacofonia Sibilante',
        effect:
          'A hidra ganha um bônus igual à metade do número atual de cabeças dela em testes resistidos contra criaturas atordoadas e/ou lentas.',
      },
      {
        name: 'Cabeças Regenerantes',
        effect:
          'Quando uma nova hidra entra em cena pela primeira vez numa campanha, ela tem um número de cabeças igual a (1d6 + o nível dela dividido por 10). Depois que a hidra perde PV, se a perda foi por dano de fogo ou por dano de um tipo a que seja Vulnerável, ela perde uma cabeça; caso contrário, nasce uma cabeça nova. A hidra mantém o número atual de cabeças entre cenas e nunca pode ter menos de uma.',
      },
      {
        name: 'Emaranhado de Mandíbulas',
        effect:
          'Depois que um inimigo acerta ou erra a hidra com um ataque corpo a corpo, se esse ataque não causou dano de fogo, a hidra causa a esse inimigo dano de veneno igual ao número atual de cabeças dela (depois que o ataque desse inimigo for resolvido). Enquanto a hidra estiver em Guarda, este ataque causa 5 de dano extra.',
      },
    ],
  }),
  creature({
    name: 'Ictiodaimon',
    page: 169,
    summary:
      'Antigo mago mortal transformado em aberração tentacular por conhecimento proibido; especialista em feitiços de gelo e raio, prioriza inimigos fora de crise.',
    body: '**Rotina:** Iceberg (se puder) ou Ictiocajado ➔ Raio (se puder) ou Ictiocajado ↺. O ictiodaimon sempre prioriza com os feitiços inimigos que não estejam em crise e, entre eles, os com menos PV atuais\n\n**Abordagens favoráveis:** físico, terra, fogo, luz, atordoado, enfurecido, abalado, envenenado, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** ar, raio, trevas, gelo, Resistências.',
    originalName: 'Ichtyodaimon',
    level: 30,
    species: 'monster',
    rank: 'elite',
    role: 'mage',
    villain: true,
    traits: ['alienígena', 'de sangue frio', 'sedento de poder', 'tentacular'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 180,
    crisis: 90,
    mp: 100,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'immune',
      bolt: 'resistant',
      dark: 'immune',
      ice: 'resistant',
    },
    attacks: [
      {
        name: 'Ictiocajado',
        range: 'melee',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'dark',
        effect:
          'O ictiodaimon recupera PM iguais ao dobro da perda total de PV sofrida pelo alvo.',
      },
    ],
    spells: [
      {
        name: 'Iceberg',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'O ictiodaimon causa (RA + 30) de dano de gelo ao alvo. O dano deste feitiço ignora Resistências.',
      },
      {
        name: 'Raio',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'O ictiodaimon causa (RA + 30) de dano de raio ao alvo. O dano deste feitiço ignora Resistências.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Turbilhão Abissal',
        effect:
          'Quando o ictiodaimon lança Iceberg, ele ganha Vulnerabilidade a dano de fogo, Vulnerabilidade a dano de luz e Absorção a dano de gelo até o fim da cena ou até a próxima vez que lançar um feitiço. Quando lança Raio, ganha Vulnerabilidade a dano de terra, Vulnerabilidade a dano físico e Absorção a dano de raio até o fim da cena ou até a próxima vez que lançar um feitiço.',
      },
      {
        name: 'Portais para o Além',
        effect:
          'Quando um ictiodaimon Vilão gasta um Ponto de Ultima para fugir em segurança da cena, ele pode fazê-lo criando uma fenda no espaço. Se fizer isso, pode levar consigo qualquer número de aliados que veja, transportando-os em segurança para longe da cena.',
      },
    ],
  }),
  creature({
    name: 'Iudex',
    page: 171,
    summary:
      'Capanga blindado e orgulhoso de tiranos, que extrai poder da fé absoluta na letra da Lei, declara leis sobre os inimigos e pune os transgressores.',
    body: '**Rotina:** Lei Absoluta (se puder, alternando entre Verba, non Acta, Pro Bono Pacis e Intelligenti Pauca, exatamente nessa ordem) ou Malis Nocet ➔ Malis Nocet ➔ Bonis Parcet (se puder) ou Malis Nocet ↺\n\n**Abordagens favoráveis:** raio, trevas, veneno, Resistência (luz), atordoado, enfurecido, abalado, lento, imunidade (abalado), perda de PM.\n\n**Abordagens desfavoráveis:** ar, fogo, luz, falta de variedade e flexibilidade nas ações.',
    originalName: 'Iudex',
    level: 20,
    species: 'humanoid',
    rank: 'champion',
    championX: 3,
    role: 'saboteur',
    villain: true,
    traits: ['blindado', 'confiante', 'orgulhoso', 'fervoroso'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 240,
    crisis: 120,
    mp: 160,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      dark: 'vulnerable',
      fire: 'resistant',
      light: 'immune',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Malis Nocet',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'light',
        effect:
          'Este ataque pode mirar inimigos que normalmente não poderiam ser alvo dele, desde que estejam abalados. Causa 10 de dano extra a transgressores, e seu dano ignora as Afinidades dos transgressores.',
      },
    ],
    spells: [
      {
        name: 'Bonis Parcet',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        effect:
          'O iudex causa (RA + 20) de dano de luz ao alvo. Em seguida, recupera PV iguais à metade da perda total de PV sofrida pelo alvo.',
      },
    ],
    otherActions: [
      {
        name: 'Lei Absoluta',
        effect:
          'O iudex pode usar uma ação e gastar 20 PM para declarar uma das leis a seguir; cada lei vale para todo inimigo que o iudex veja, e seus efeitos duram até o fim da cena ou até outra lei ser declarada. Intelligenti Pauca: proíbe recuperar PM e se recuperar de condições. Pro Bono Pacis: proíbe fazer a ação Atacar, fazer ataques livres, lançar feitiços ofensivos (O) e fazer o iudex e/ou seus aliados sofrerem condições. Verba, non Acta: proíbe fazer as ações Guarda e Poder. Depois que um inimigo viola uma lei, ele se torna transgressor até o fim do próximo turno dele (mas só depois que a ação ou efeito infrator for totalmente resolvido).',
      },
    ],
    specialRules: [
      {
        name: 'Do Ut Des',
        effect:
          'Depois que um transgressor é bem-sucedido em um teste que permitiria preencher ou apagar duas ou mais seções de um Relógio, ele deve escolher uma opção: preencher ou apagar uma seção a menos desse Relógio; ou deixar o iudex preencher ou apagar 1 seção de um Relógio à escolha do iudex.',
      },
      {
        name: 'Dura Lex',
        effect:
          'O dano causado ao iudex por não transgressores é reduzido à metade.',
      },
      {
        name: 'Erga Omnes',
        effect:
          'Depois que um ou mais inimigos se tornam transgressores, o iudex causa 10 de dano de luz a cada um deles. Criaturas que perderem PV assim também ficam abaladas.',
      },
    ],
  }),
]);
