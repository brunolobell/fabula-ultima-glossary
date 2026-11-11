import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Chimera a Dynaguar: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1C: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Quimera',
    page: 122,
    summary:
      'Criatura híbrida rara e perigosa, nascida de magia descontrolada ou de má intenção; aqui, um corpo de leão, uma cabeça caprina e uma cauda serpentina.',
    body: 'Tão raras quanto perigosas, as quimeras não existem na ordem natural: surgem por acaso, por um pico de magia descontrolada ou, às vezes, por má intenção. São um paradoxo, feitas de forças conflitantes e surpreendentemente estáveis. Astutas, caçam com eficiência brutal e sabem usar o medo que provocam. Reinam sobre regiões inteiras, no topo da cadeia alimentar, e algumas vivem o bastante para desenvolver linguagem e grande inteligência.\n\n## Táticas\n\nEsta quimera é composta de um corpo de leão, uma cabeça caprina e uma cauda serpentina. Sinta-se à vontade para trocar alguns desses perfis por outras criaturas de nível e função adequados. Ela gosta de manter a presa em alerta, mudando de tática a cada rodada.\n- Rodadas ímpares: Corpo de Leão: Sopro de Chamas ➔ Cabeça Caprina: Cabeçada Estática ➔ Corpo de Leão: Velocidade Abominável (se puder e a cauda serpentina estiver presente) ou Garra Feroz ➔ Cauda Serpentina: Toxina Gélida (sem multi 2) ➔ Cabeça Caprina: Fulgur (se puder, priorizando inimigos envenenados) ou Cabeçada Estática.\n- Rodadas pares: Cauda Serpentina: Toxina Gélida (multi 2) ➔ Corpo de Leão: Garra Feroz ➔ Cabeça Caprina: Cabeçada Estática ➔ Corpo de Leão: Clareza Unida (se puder e a cabeça caprina estiver presente) ou Sopro de Chamas ➔ Cabeça Caprina: Fulgur (se puder, mirando exatamente um inimigo e priorizando inimigos envenenados) ou Cabeçada Estática.',
  }),
  creature({
    name: 'Quimera: Corpo de Leão',
    page: 124,
    summary:
      'Corpo de leão alado e flamejante da quimera: dá velocidade à cauda, cura a cabeça e protege suas Afinidades com as outras partes.',
    body: '**Abordagens favoráveis:** raio, gelo, Resistência (físico, fogo), condições, perda de PM, ataques à distância.\n\n**Abordagens desfavoráveis:** fogo, ataques corpo a corpo, feitiços que atingem vários inimigos.',
    originalName: 'Chimera (Leonine Body)',
    groupSlug: 'quimera',
    level: 20,
    species: 'monster',
    rank: 'champion',
    championX: 2,
    role: 'support',
    villain: false,
    traits: ['brutal', 'astuto', 'flamejante', 'antinatural'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 200,
    crisis: 100,
    mp: 140,
    initiative: 10,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { bolt: 'vulnerable', fire: 'immune', ice: 'vulnerable' },
    attacks: [
      {
        name: 'Garra Feroz',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
      },
      {
        name: 'Sopro de Chamas',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'fire',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Velocidade Abominável',
        effect:
          'O corpo de leão pode usar uma ação e gastar 10 PM para fazer a cauda serpentina recuperar 20 PV e tratar a própria Destreza como um dado maior (até o máximo de d12) até o início do próximo turno do corpo de leão.',
      },
      {
        name: 'Clareza Unida',
        effect:
          'O corpo de leão pode usar uma ação e gastar 10 PM para fazer a cabeça caprina se recuperar de toda condição que o corpo de leão não esteja sofrendo no momento.',
      },
    ],
    specialRules: [
      {
        name: 'Afinidade Quimérica',
        effect:
          'Enquanto a cabeça caprina estiver presente na cena, a Afinidade básica do corpo de leão a raio é substituída por Resistência. Enquanto a cauda serpentina estiver presente na cena, a Afinidade básica dele a gelo é substituída por Resistência. Personagens que examinem o perfil ou as Afinidades do corpo de leão perceberão que elas são “protegidas” pela presença das outras partes.',
      },
      {
        name: 'Unidos',
        effect:
          'Enquanto o corpo de leão estiver em voo, a cabeça caprina e a cauda serpentina não podem ser alvo de ataques corpo a corpo. Quando o corpo de leão se rende ou foge da cena usando um Ponto de Ultima, a cabeça caprina e a cauda serpentina deixam a cena.',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Reservatórios Mágicos',
        effect:
          'Quando a cabeça caprina gasta PM, o corpo de leão pode gastar os próprios PM no lugar dela (desde que tenha PM suficientes para cobrir o custo inteiro).',
      },
    ],
  }),
  creature({
    name: 'Quimera: Cabeça Caprina',
    page: 125,
    summary:
      'Cabeça de bode da quimera, esperta e oportunista: cabeceia com eletricidade e lança raios que fortalecem contra inimigos envenenados.',
    body: '**Abordagens favoráveis:** fogo, gelo, Resistência (raio), atordoado, enfurecido, abalado, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** ar, raio, luz.',
    originalName: 'Chimera (Caprine Head)',
    groupSlug: 'quimera',
    level: 20,
    species: 'monster',
    rank: 'elite',
    role: 'mage',
    flags: ['part'],
    villain: false,
    traits: ['inteligente', 'unido', 'oportunista', 'antinatural'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 160,
    crisis: 80,
    mp: 80,
    initiative: 11,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'resistant',
      bolt: 'immune',
      fire: 'vulnerable',
      ice: 'vulnerable',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Cabeçada Estática',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'bolt',
        effect:
          'Depois que o ataque é resolvido, se acertou e o alvo estiver em crise, ele fica abalado.',
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
          'A cabeça caprina causa (RA + 20) de dano de raio a cada alvo atingido por este feitiço.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Toxinas Estranhas',
        effect:
          'Quando a cabeça caprina causa dano com um feitiço a um ou mais inimigos envenenados, o feitiço causa 5 de dano extra a eles e eles se recuperam de envenenado.',
      },
    ],
  }),
  creature({
    name: 'Quimera: Cauda Serpentina',
    page: 125,
    summary:
      'Cauda de serpente da quimera, veloz e peçonhenta: congela e envenena, e drena PM de quem já está envenenado.',
    body: '**Abordagens favoráveis:** raio, fogo, Resistência (gelo), enfurecido, abalado, lento, imunidade (envenenado).\n\n**Abordagens desfavoráveis:** gelo, veneno, envenenado, fraco.',
    originalName: 'Chimera (Serpentine Tail)',
    groupSlug: 'quimera',
    level: 20,
    species: 'monster',
    rank: 'soldier',
    role: 'saboteur',
    flags: ['part'],
    villain: false,
    traits: ['veloz', 'unido', 'peçonhento', 'antinatural'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 80,
    crisis: 40,
    mp: 70,
    initiative: 8,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: { bolt: 'vulnerable', fire: 'vulnerable', ice: 'immune' },
    attacks: [
      {
        name: 'Toxina Gélida',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'ice',
        effect:
          'Cada alvo fica envenenado. Se um alvo já estiver envenenado, ele perde 10 PM em vez disso. Este ataque tem multi (2) em rodadas pares.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições envenenado e fraco.' },
    ],
  }),
  creatureGroup({
    name: 'Cavaleiro da Morte (grupo)',
    slug: 'cavaleiro-da-morte-grupo',
    page: 126,
    summary:
      'O Cavaleiro da Morte, guerreiro de carne e aço refeito em luto e obsessão, e sua forma final, o Cavaleiro Infernal, acompanhado de dois obeliscos demoníacos.',
    body: 'A entidade conhecida como Cavaleiro da Morte não deve ser confundida com um simples guerreiro: é carne e aço refeitos numa encarnação poderosa e avassaladora da tristeza. Portadores de poderes demoníacos que desafiam a mortalidade, os Cavaleiros da Morte são ao mesmo tempo aviso e convite. Quem troca amor por obsessão e torce a alma até a escuridão suprema recebe força incomparável, mas vê a si mesmo e tudo o que amava se partir em pedaços.\n\n## Táticas\n\n**Cavaleiro da Morte** (campeão 3). Esta é a versão mais fraca, ainda presa aos restos do hospedeiro humano. Costuma ser enfrentado ao lado de um inimigo elite ou de dois soldados, de preferência caçadores ou sabotadores (um mago elite também funciona). Como Corte Infernal depende da rodada, vale marcar o número da rodada com um dado ou contador.\nRotina: Golpe Apavorante ➔ Abraço Amargo da Morte ➔ Corte Infernal ↺\n\nPara que os heróis o enfrentem sozinho, promova-o a campeão 4 (440 PV, Iniciativa 12) e acrescente esta ação exclusiva: **Rejeição Doce da Vida.** O Cavaleiro da Morte pode usar uma ação para se concentrar inteiramente na defesa, tornando-se um verdadeiro bastião de escuridão. Se fizer isso, perde a Vulnerabilidade a dano de raio, terra e luz e ganha Imunidade a dano de trevas, fogo, gelo e veneno. Esses benefícios duram até ele usar Golpe Apavorante. Nesse caso, a rotina fica: Golpe Apavorante ➔ Rejeição Doce da Vida ➔ Corte Infernal ➔ Golpe Apavorante ➔ Golpe Apavorante ➔ Abraço Amargo da Morte ➔ Corte Infernal ➔ Corte Infernal ↺\n\n**Cavaleiro Infernal** (campeão 3, nível 40). É a encarnação final e mais forte, acompanhada de dois obeliscos demoníacos (um da ira, outro da tristeza) que lhe dão energias infernais. Talvez a presença deles sugira uma influência mais sombria e oculta. O perfil do obelisco da tristeza é idêntico ao da ira, mas com Vulnerabilidade a fogo, Imunidade a gelo e todas as menções a fogo e gelo trocadas pelo tipo oposto; além disso, Toque Abissal causa envenenado em vez de enfurecido.\nRotina: Cavaleiro Infernal: Olhar Ruinoso (se puder e ao menos um inimigo não estiver abalado e/ou lento, mirando o máximo de inimigos possível) ou Despedaçar Tudo ➔ Obelisco da ira: Toque Abissal ➔ Cavaleiro Infernal: Ira e Tristeza, Concedam-me Obsessão Inabalável! ➔ Obelisco da tristeza: Toque Abissal ➔ Cavaleiro Infernal: Despedaçar Tudo ↺',
  }),
  creature({
    name: 'Cavaleiro da Morte',
    page: 129,
    summary:
      'Guerreiro obcecado e implacável, campeão que se ergue com 1 PV ao cair e pune quem o fere com cortes infernais de fogo e gelo.',
    body: '**Abordagens favoráveis:** raio, luz, Resistência (trevas, fogo, gelo), enfurecido, lento, fraco, perda de PM.\n\n**Abordagens desfavoráveis:** físico, ar, trevas, fogo, gelo, veneno, feitiços ofensivos.',
    originalName: 'Death Knight',
    groupSlug: 'cavaleiro-da-morte-grupo',
    level: 30,
    species: 'humanoid',
    rank: 'champion',
    championX: 3,
    role: 'sentinel',
    flags: ['unique'],
    villain: true,
    traits: ['assustador', 'inseguro', 'obcecado', 'implacável'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 330,
    crisis: 165,
    mp: 140,
    initiative: 11,
    defense: { value: 4, fixed: false },
    magicDefense: 2,
    affinities: {
      bolt: 'vulnerable',
      dark: 'resistant',
      fire: 'resistant',
      ice: 'resistant',
      light: 'vulnerable',
    },
    attacks: [
      {
        name: 'Golpe Apavorante',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'dark',
        effect:
          'Cada alvo atingido pelo ataque fica abalado. Este ataque tem multi (2).',
      },
      {
        name: 'Corte Infernal',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: null,
        effect:
          'Este ataque causa dano de fogo em rodadas ímpares e dano de gelo em rodadas pares.',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Abraço Amargo da Morte',
        effect:
          'O Cavaleiro da Morte pode usar uma ação para abrir os braços, acolhendo a investida inimiga e ansioso por punir a arrogância dos heróis. Se fizer isso, ganha Resistência a dano físico e de ar, e seus ataques com Corte Infernal causam 5 de dano extra. Esses benefícios duram até ele usar Golpe Apavorante.',
      },
    ],
    specialRules: [
      {
        name: 'Aura de Escuridão Vívida',
        effect:
          'Aliados do Cavaleiro da Morte que consigam vê-lo e/ou ouvi-lo ficam imunes a atordoado.',
      },
      {
        name: 'Dom da Determinação Mortal',
        effect:
          'Quando o Cavaleiro da Morte chega a 0 PV pela primeira vez durante uma cena, ele fica de pé com exatamente 1 PV, se recupera de todas as condições e recupera 60 PM. Ignore esta regra se ele chegou a 0 PV por dano de luz.',
      },
      {
        name: 'Ainda Insistem, Miseráveis...',
        effect:
          'Depois que um inimigo acerta o Cavaleiro da Morte e/ou um aliado dele com um ataque ou feitiço ofensivo (O), o Cavaleiro da Morte perde 20 PM (depois que o ataque ou feitiço for resolvido). Então, se ainda tiver pelo menos 1 PM, faz um ataque livre com Corte Infernal contra esse inimigo. Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
    ],
  }),
  creature({
    name: 'Cavaleiro Infernal',
    page: 131,
    summary:
      'Forma final do Cavaleiro da Morte: sua espada se carrega com a ira, a tristeza ou a obsessão dos obeliscos, e cada ferida que sofre vira castigo para o inimigo.',
    body: '**Abordagens favoráveis:** fogo, gelo, luz, Resistência (trevas, fogo, gelo), atordoado, enfurecido, lento.\n\n**Abordagens desfavoráveis:** trevas, veneno, envenenado, abalado, fraco, várias perdas pequenas de PV.',
    originalName: 'Hellknight',
    groupSlug: 'cavaleiro-da-morte-grupo',
    level: 40,
    species: 'demon',
    rank: 'champion',
    championX: 3,
    role: 'hunter',
    flags: ['unique'],
    villain: true,
    traits: ['assustador', 'enlutado', 'desumano', 'autodestrutivo'],
    attributes: { DES: 10, AST: 10, VIG: 8, VON: 8 },
    hp: 360,
    crisis: 180,
    mp: 200,
    initiative: 13,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      dark: 'absorbs',
      fire: 'vulnerable',
      ice: 'vulnerable',
      light: 'vulnerable',
      poison: 'resistant',
    },
    attacks: [
      {
        name: 'Despedaçar Tudo',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 7,
        damage: 25,
        damageType: 'physical',
        effect:
          'Este ataque pode mirar inimigos que normalmente não poderiam ser alvo de ataques corpo a corpo, e seus efeitos variam se a espada do Cavaleiro Infernal estiver carregada com uma emoção. Ira: o ataque causa dano de fogo e ganha multi (2). Tristeza: o ataque causa dano de gelo e causa 5 de dano extra. Obsessão: o ataque causa dano de trevas, ganha multi (3) e causa 10 de dano extra.',
      },
    ],
    spells: [
      {
        name: 'Olhar Ruinoso',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        effect: 'Cada alvo atingido por este feitiço fica abalado e lento.',
      },
    ],
    otherActions: [
      {
        name: 'Ira e Tristeza, Concedam-me Obsessão Inabalável!',
        effect:
          'O Cavaleiro Infernal pode usar uma ação para cravar a espada em um obelisco escolhido aleatoriamente entre os presentes na cena. Se fizer isso, o obelisco escolhido perde 20 PV e a espada fica carregada com a emoção desse obelisco (ira ou tristeza) até o Cavaleiro Infernal realizar esta ação de novo. Se ele realizar esta ação sem nenhum obelisco restante, perfura o próprio torso com a espada, perde 1 Ponto de Ultima (se tiver) e a espada fica carregada com obsessão até ele realizar esta ação de novo.',
      },
    ],
    specialRules: [
      {
        name: 'Força Infernal',
        effect:
          'Quando o Cavaleiro Infernal gasta um Ponto de Ultima para evocar um Traço durante um teste, ele também se recupera de envenenado, abalado e fraco (antes de rolar os dados de novo).',
      },
      {
        name: 'Espiral de Castigo',
        effect:
          'Depois que um inimigo faz o Cavaleiro Infernal perder PV, aplique estes três efeitos, nesta ordem: se a espada do Cavaleiro Infernal estiver carregada com uma emoção (veja acima), esse inimigo sofre uma condição baseada nela: atordoado (ira), lento (tristeza) ou fraco (obsessão); depois, se o obelisco da ira não estiver mais presente na cena, o Cavaleiro Infernal causa 10 de dano de fogo a esse inimigo; depois, se o obelisco da tristeza não estiver mais presente na cena, causa 10 de dano de gelo a esse inimigo.',
      },
    ],
  }),
  creature({
    name: 'Cavaleiro da Morte: Obelisco da Ira',
    page: 130,
    summary:
      'Obelisco demoníaco flutuante que alimenta o Cavaleiro Infernal e enfurece quem toca; o da tristeza é idêntico, com fogo e gelo trocados.',
    body: 'O obelisco da tristeza tem o mesmo perfil, mas com Vulnerabilidade a fogo, Imunidade a gelo e todas as menções a fogo e gelo trocadas pelo tipo oposto; Toque Abissal causa envenenado em vez de enfurecido.\n\n**Abordagens favoráveis:** gelo, luz, Resistência (fogo), atordoado, enfurecido, imunidade (enfurecido).\n\n**Abordagens desfavoráveis:** físico, ar, fogo, envenenado, abalado.',
    originalName: 'Death Knight (Obelisk of Anger)',
    groupSlug: 'cavaleiro-da-morte-grupo',
    level: 40,
    species: 'demon',
    rank: 'soldier',
    role: 'sentinel',
    villain: false,
    traits: ['corruptor', 'enigmático', 'flutuante', 'infernal'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 10 },
    hp: 130,
    crisis: 65,
    mp: 90,
    initiative: 8,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      physical: 'resistant',
      air: 'immune',
      fire: 'immune',
      ice: 'vulnerable',
      light: 'vulnerable',
    },
    attacks: [
      {
        name: 'Toque Abissal',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'fire',
        effect:
          'O alvo fica enfurecido. Este ataque mira a Defesa Mágica. Enquanto não houver outros obeliscos na cena, o ataque ganha multi (2).',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições envenenado e abalado.',
      },
      {
        name: 'Favor Infernal',
        effect:
          'Enquanto este obelisco estiver presente na cena, o Cavaleiro Infernal ganha Absorção a dano de fogo. Enquanto o obelisco da ira e o obelisco da tristeza estiverem ambos presentes na cena, o Cavaleiro Infernal ganha Imunidade a dano de luz.',
      },
    ],
  }),
  creature({
    name: 'Diablossauro',
    page: 133,
    summary:
      'Fera glutona e brutal, campeã solitária que mastiga a presa, a arremessa contra outros inimigos e alterna Resistência e Vulnerabilidade entre gelo e fogo a cada rodada.',
    body: '**Rotina:** Cocitoxina (em rodadas ímpares, se puder) ou Flegetoxina (se puder) ou Cauda Dilacerante ➔ Mandíbulas Vorazes ➔ Amaciar (se estiver mastigando um inimigo) ou Mandíbulas Vorazes ➔ Goela Infernal (se estiver mastigando um inimigo) ou Cauda Dilacerante ↺\n\n**Abordagens favoráveis:** fogo, gelo, Resistência (físico, fogo, gelo), condições.\n\n**Abordagens desfavoráveis:** falta de cura poderosa.',
    originalName: 'Diablosaur',
    level: 20,
    species: 'beast',
    rank: 'champion',
    championX: 4,
    role: 'hunter',
    flags: ['solo'],
    villain: true,
    traits: ['agressivo', 'bruto', 'glutão', 'violento'],
    attributes: { DES: 10, AST: 8, VIG: 10, VON: 6 },
    hp: 360,
    crisis: 180,
    mp: 100,
    initiative: 13,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {},
    attacks: [
      {
        name: 'Mandíbulas Vorazes',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'physical',
        effect:
          'O diablossauro começa a mastigar o alvo. Ele para de mastigar no fim da cena, quando fizer Mandíbulas Vorazes de novo ou quando perder PV por dano de um tipo a que seja Vulnerável.',
      },
      {
        name: 'Cauda Dilacerante',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 20,
        damageType: 'physical',
        effect:
          'Este ataque tem multi (2). Depois que ele é resolvido, tenha acertado ou não, o diablossauro não pode fazer ações nem ataques livres até o fim do próximo turno dele.',
      },
    ],
    spells: [
      {
        name: 'Cocitoxina',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect: 'O diablossauro causa (RA + 15) de dano de gelo ao alvo.',
      },
      {
        name: 'Flegetoxina',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect: 'O diablossauro causa (RA + 15) de dano de fogo ao alvo.',
      },
    ],
    otherActions: [
      {
        name: 'Goela Infernal',
        effect:
          'O diablossauro pode usar uma ação para parar de mastigar um inimigo e arremessá-lo com brutalidade contra outro inimigo aleatório que veja, causando 20 de dano a ambos. O tipo desse dano é gelo em rodadas pares e fogo em rodadas ímpares. Se um inimigo perder PV assim, ele também fica abalado.',
      },
      {
        name: 'Amaciar',
        effect:
          'O diablossauro pode usar uma ação para causar 20 de dano a um inimigo que esteja mastigando. O tipo desse dano é gelo em rodadas pares e fogo em rodadas ímpares. Se esse inimigo perder PV assim, o diablossauro recupera 10 PV e 10 PM.',
      },
    ],
    specialRules: [
      {
        name: 'Escamas de Ícor Elemental',
        effect:
          'Em rodadas ímpares, o diablossauro ganha Resistência a dano de gelo e Vulnerabilidade a dano de fogo. Em rodadas pares, ganha Resistência a dano de fogo e Vulnerabilidade a dano de gelo.',
      },
    ],
  }),
  creature({
    name: 'Muralha Fatal',
    page: 135,
    summary:
      'Morto-vivo imenso selado nas muralhas de cidades antigas: avança devagar, aprisiona os intrusos e os esmaga contra a parede oposta.',
    body: '**Rotina:** Garras Agarradoras ➔ Mordida do Vazio ➔ Pedra Esfarelante (se puder) ou Garras Agarradoras ➔ Deslizar Adiante (se puder) ou Mordida do Vazio ↺\n\n**Abordagens favoráveis:** ar, gelo, luz, Resistência (físico, trevas, terra), lento, fraco, manipulação de Relógios.\n\n**Abordagens desfavoráveis:** físico, trevas, terra, fogo, veneno, enfurecido, envenenado, abalado.',
    originalName: 'Doomwall',
    level: 20,
    species: 'undead',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo'],
    villain: false,
    traits: ['ancestral', 'imenso', 'sem mente', 'sólido'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 400,
    crisis: 200,
    mp: 140,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'immune',
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
        name: 'Garras Agarradoras',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect:
          'Cada alvo atingido por este ataque fica lento. Este ataque tem multi (2).',
      },
      {
        name: 'Mordida do Vazio',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 2,
        damage: 15,
        damageType: 'dark',
      },
    ],
    spells: [
      {
        name: 'Pedra Esfarelante',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect: 'A muralha causa (RA + 15) de dano de terra ao alvo.',
      },
    ],
    otherActions: [
      {
        name: 'Deslizar Adiante',
        effect:
          'A muralha pode usar uma ação para avançar aos poucos rumo aos heróis. Se fizer isso e estiver lenta e/ou fraca, ela se recupera de lento e fraco; caso contrário, preenche uma seção do Relógio Esmagado (veja abaixo). Então, se o Relógio Esmagado estiver cheio, todo inimigo presente na cena é forçado a Render-se automaticamente (independentemente dos PV).',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido, envenenado e abalado.',
      },
      {
        name: 'Armadilha Esmagadora',
        effect:
          'A muralha entra em cada conflito com um Relógio de seis seções chamado “Esmagado”, com duas seções já preenchidas. Esse Relógio pode ser alvo de interações normais, mas a muralha nunca se opõe a uma ação Objetivo feita para isso (o Mestre apenas define um Nível de Dificuldade para o teste).',
      },
      {
        name: 'Revelação Torturante',
        effect:
          'A muralha ganha um bônus nos testes de Precisão igual ao número de seções preenchidas do Relógio Esmagado, e um bônus na Defesa igual ao número de seções vazias dele.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que a curariam podem feri-la (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Serafim Terrível',
    page: 137,
    summary:
      'Falso anjo sem rosto, convocado para proteger um Vilão com dogma cego; pune quem machuca seu protegido.',
    body: '**Serafins terríveis espelhados:** se uma cena de conflito envolver dois serafins terríveis, o segundo pode ser o espelho do primeiro: Vulnerável a ar, fogo e luz, Resistente a gelo, capaz de Absorver trevas e causando dano de gelo e de trevas em vez de fogo e luz. Se os Personagens aguentarem, os dois serafins podem até trocar Afinidades e tipos de dano a cada rodada!\n\n**Rotina:** Raio de Penitência (se puder) ou Dilaceração Radiante ➔ Martelo Ardente ↺\n\n**Abordagens favoráveis:** trevas, terra, gelo, Resistência (fogo, luz), condições, imunidade (abalado).\n\n**Abordagens desfavoráveis:** fogo, luz, ataques corpo a corpo, feitiços de duração Cena, símbolos.',
    originalName: 'Dread Seraph',
    level: 30,
    species: 'demon',
    rank: 'soldier',
    role: 'sentinel',
    villain: false,
    traits: ['brutal', 'insensível', 'dogmático', 'sem emoções'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 120,
    crisis: 60,
    mp: 80,
    initiative: 8,
    defense: { value: 4, fixed: false },
    magicDefense: 2,
    affinities: {
      dark: 'vulnerable',
      earth: 'vulnerable',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'absorbs',
    },
    attacks: [
      {
        name: 'Martelo Ardente',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'fire',
        effect:
          'Se o serafim estiver em crise e este ataque for feito durante o turno de outra criatura, o alvo deixa de ser afetado por todos os feitiços de duração Cena que o afetavam e todos os símbolos presentes nele são destruídos.',
      },
      {
        name: 'Dilaceração Radiante',
        range: 'melee',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'light',
      },
    ],
    spells: [
      {
        name: 'Raio de Penitência',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        effect:
          'O serafim causa (RA + 20) de dano de luz ao alvo, que fica abalado.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Guardião Angelical',
        effect:
          'No início de cada cena de conflito, se houver um ou mais Vilões presentes, o serafim deve escolher um deles como protegido.',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Penitência e Proteção',
        effect:
          'Depois que um inimigo abalado acerta o protegido do serafim com um ataque ou feitiço ofensivo (O), o serafim faz um ataque livre com Martelo Ardente contra esse inimigo (depois que o ataque ou feitiço for resolvido). Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
    ],
  }),
  creature({
    name: 'Dinaguar',
    page: 139,
    summary:
      'Felino raro com dois tentáculos espinhosos que acumulam eletricidade estática; amigável e curioso, mas irritadiço com barulho alto.',
    body: '**Rotina:** Chicote de Tentáculo ➔ Guarda (se não estiver enfurecido) ou Rajada Estática (se puder e estiver eletrizado) ou Chicote de Tentáculo ➔ Mordida Saltante ↺\n\n**Abordagens favoráveis:** terra, Resistência (físico, raio), condições além de lento e abalado, imunidade (atordoado), perda de PM.\n\n**Abordagens desfavoráveis:** raio, luz, enfurecido, lento, abalado.',
    originalName: 'Dynaguar',
    level: 10,
    species: 'monster',
    rank: 'champion',
    championX: 3,
    role: 'hunter',
    villain: false,
    traits: ['ágil', 'curioso', 'eletrostático', 'temperamental'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 180,
    crisis: 90,
    mp: 100,
    initiative: 12,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: { bolt: 'resistant', earth: 'vulnerable', light: 'resistant' },
    attacks: [
      {
        name: 'Mordida Saltante',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 10,
        damageType: 'physical',
        effect:
          'Enquanto o dinaguar estiver enfurecido, este ataque causa 5 de dano extra.',
      },
      {
        name: 'Chicote de Tentáculo',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 4,
        damage: 5,
        damageType: 'bolt',
        effect:
          'Este ataque tem multi (2). Depois que ele é resolvido, tenha acertado ou não, o dinaguar fica eletrizado até o fim da cena.',
      },
    ],
    spells: [
      {
        name: 'Rajada Estática',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 1,
        effect:
          'O dinaguar causa (RA + 15) de dano de raio ao alvo, que fica atordoado. Criaturas que já estavam atordoadas farão uma ação a menos no próximo turno (mínimo de 0 ações).',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições lento e abalado.' },
      {
        name: 'Sensível a Barulho',
        effect:
          'Quando o dinaguar ouve um barulho especialmente alto ou um zumbido (como explosões, tiros, trovões, maquinário rangendo ou grandes insetos voadores), ele fica enfurecido.',
      },
      {
        name: 'Repulsão Estática',
        effect:
          'Enquanto o dinaguar estiver eletrizado, ele ganha Resistência a dano de todos os tipos causado por ataques à distância.',
      },
      {
        name: 'Descarga de Vingança',
        effect:
          'No fim de cada turno de inimigo, se o dinaguar estiver eletrizado e esse inimigo o fez perder PV com algo que não seja um ataque à distância durante o turno, o dinaguar deixa de estar eletrizado e faz a ação Feitiço de graça, lançando Rajada Estática contra esse inimigo (depois que o ataque for resolvido; o dinaguar ainda deve gastar PM e fazer o teste de Magia normalmente).',
      },
    ],
  }),
]);
