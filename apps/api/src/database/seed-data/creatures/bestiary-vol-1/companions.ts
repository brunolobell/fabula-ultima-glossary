import { creature, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/**
 * Bestiary Vol. I, "Sample Companions" (printed p. 328-336): nine Faithful Companion
 * profiles, translated and unofficial; summaries and effects are our own words.
 *
 * A companion is a Creature with the `companion` mark. The book prints no Initiative
 * (it acts when its Wayfarer spends an action) and no Rank (all are level 5 NPCs), so
 * `initiative` is left out and the Rank is the NPC default, soldier. The book's
 * Attributes DEX, INS, MIG and WLP are our DES, AST, VIG and VON.
 *
 * The printed Crisis of Amagus is 18; half of 32 is 16, which is what every other
 * profile follows (and what the seed validation requires), so we use 16.
 */
export const companionsVol1: SeedEntry[] = inBook('bestiary-vol-1', [
  creature({
    name: 'Amagus',
    page: 328,
    summary:
      'Cogumelo mágico e prestativo que cura vários aliados de uma vez e ainda arde em veneno; resistente para o tamanho.',
    body: 'Nascido de um acidente alquímico nos tempos de academia do arquimago Henryk, Amagus virou seu assistente de confiança e cuida da casa e da filha dele, Roderika. Quando ela parte como aprendiz de feiticeira, o cogumelo decide ir junto.\n\n**Notas de projeto:** o grupo de Roderika tinha só curas pequenas, então Amagus nasceu para curar vários alvos. Esporos Coçantes dá bom dano e uma boa chance de envenenar, uma das piores condições do jogo, e o cogumelo é parrudo; a Jogadora pretende levar [[companheiro-fiel]] ao nível 5 para que os PV dele se aproximem dos de um PJ comum.',
    originalName: 'Amagus',
    level: 5,
    species: 'plant',
    rank: 'soldier',
    flags: ['companion'],
    villain: false,
    traits: ['gomoso', 'prestativo', 'mágico', 'paciente'],
    attributes: { DES: 6, AST: 6, VIG: 10, VON: 10 },
    hp: 32,
    crisis: 16,
    mp: 55,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { air: 'vulnerable', dark: 'resistant', light: 'resistant' },
    attacks: [
      {
        name: 'Rolada Fúngica',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'physical',
      },
      {
        name: 'Estrelinha',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'fire',
      },
    ],
    spells: [
      {
        name: 'Curar',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Cada alvo recupera 40 PV.',
      },
      {
        name: 'Esporos Coçantes',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        effect:
          'Causa (RA + 15) de dano de veneno ao alvo; se o RA do teste de Magia for 8 ou mais, o alvo também fica envenenado.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
    ],
  }),

  creature({
    name: 'Buzzer',
    page: 329,
    summary:
      'Drone flutuante que estuda inimigos de graça no início do conflito e pode pilotar o veículo pessoal do Andarilho.',
    body: 'Os drones da série G foram aposentados depois das revoltas de robôs, por medo de que se conectassem demais aos quadros de combate. Kojo, um piloto rebelde de Tychea, recuperou uma placa de movimento da série e montou um drone capaz de operar quase todos os sistemas do quadro blindado dele.\n\n**Notas de projeto:** companheiro complexo: dá eficiência ao Estudo e deixa o veículo agir mesmo sem Kojo ao volante. O drone não tem os Poderes do Andarilho ao pilotar e depende dos módulos ativos, mas o bônus de Precisão de [[companheiro-fiel]] vale para ataques com módulos de arma. Também serve para explorar e distrair: Andarilho e companheiro devem estar nas mesmas cenas, mas elas podem envolver muita distância se os dois se coordenarem (daí o traço "conectado").',
    originalName: 'Buzzer',
    level: 5,
    species: 'construct',
    rank: 'soldier',
    flags: ['companion'],
    villain: false,
    traits: ['conectado', 'flutuante', 'perceptivo', 'pequeno'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 6 },
    hp: 26,
    crisis: 13,
    mp: 35,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { air: 'vulnerable', earth: 'resistant', poison: 'immune' },
    attacks: [
      {
        name: 'Descarga Estática',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'bolt',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Autoescaneamento',
        effect:
          'No início do turno do Andarilho na primeira rodada de um conflito, Buzzer pode gastar 10 PM; se gastar, faz a ação Estudo imediatamente, de graça.',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Piloto de Mecha',
        effect:
          'Buzzer pode pilotar o veículo pessoal do Andarilho, pelas regras do Atlas Techno Fantasy (a partir da p. 160). Ao pilotar, perde a Vulnerabilidade a ar e o poder Voo, e ganha todos os espaços de mão e de armadura de que os módulos de arma e de armadura do veículo precisam para funcionar.',
      },
    ],
  }),

  creature({
    name: 'Freki',
    page: 330,
    summary:
      'Loba do inverno leal, boa no ataque e na defesa: protege contra ar e gelo e deixa o alvo lento, mas é vulnerável a fogo.',
    body: 'Uma fimbulvetrulfr, o "lobo do inverno rigoroso", Freki acompanha o herói Alvrin desde a viagem ao Vale dos Gigantes de Poeira. Ela e a irmã mais velha, Geri, guardavam a entrada do vale e impediam que almas inquietas escapassem. Quando Geri morreu pelas garras do Rei das Wyverns, Alvrin resgatou Freki ferida, e os dois seguem juntos desde então.\n\n**Notas de projeto:** companheira confiável, com bons recursos de ataque e defesa, incluindo um feitiço feito sob medida que dá muita proteção contra ar e gelo. Para equilibrar, o grupo deu a ela Vulnerabilidade a fogo, mas aumentou os PV em 10.',
    originalName: 'Freki',
    level: 5,
    species: 'beast',
    rank: 'soldier',
    flags: ['companion'],
    villain: false,
    traits: ['glacial', 'leal', 'forte', 'veloz'],
    attributes: { DES: 10, AST: 6, VIG: 8, VON: 8 },
    hp: 36,
    crisis: 18,
    mp: 45,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { air: 'resistant', fire: 'vulnerable', ice: 'resistant' },
    attacks: [
      {
        name: 'Mordida',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
      },
      {
        name: 'Salto do Lobo da Tempestade',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'air',
      },
    ],
    spells: [
      {
        name: 'Bênção de Geri',
        mpCost: '5 × A',
        target: 'Até três criaturas',
        duration: 'Cena',
        offensive: false,
        effect:
          'Quando uma fonte causaria dano de ar ou de gelo a uma ou mais criaturas afetadas por este feitiço, em vez disso o feitiço termina e essa fonte não causa dano a elas.',
      },
      {
        name: 'Uivo Invernal',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        effect: 'Causa (RA + 15) de dano de gelo ao alvo, que fica lento.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Sumir na Tempestade',
        effect:
          'Quando Freki chega a 0 PV, pode fazer a ação Feitiço de graça antes de sair de cena, lançando Bênção de Geri ou Uivo Invernal (ela ainda paga o custo em PM).',
      },
    ],
  }),

  creature({
    name: 'A Turma',
    page: 331,
    summary:
      'Três bichos tratados como um só companheiro: o urso, o pangolim ou o pica-pau fica ativo e muda os ataques e as Afinidades do Andarilho e da Turma.',
    body: 'Na infância, Brandon passou horas nas Florestas Cintilantes fazendo amizade com os bichos. Já jovem comerciante, partiu de casa, e três deles o seguiram teimosamente: Bernie, o urso, Perry, o pangolim, e Woody, o pica-pau.\n\n**Notas de projeto:** solução para quem quer vários animais por perto: a Turma é uma só criatura pelas regras, mas as habilidades dependem de qual animal está ativo. Parece trapaça, mas o Jogador de Brandon gasta um Poder inteiro só para trocar os animais, e Afinidades Dinâmicas impõe Vulnerabilidades à Turma e ao Andarilho.',
    originalName: 'The Gang',
    level: 5,
    species: 'beast',
    rank: 'soldier',
    flags: ['companion'],
    villain: false,
    traits: ['adorável', 'curiosa', 'gentil', 'barulhenta'],
    attributes: { DES: 10, AST: 6, VIG: 10, VON: 6 },
    hp: 32,
    crisis: 16,
    mp: 35,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {},
    attacks: [
      {
        name: 'Pancada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'physical',
        effect:
          'Se Bernie estiver ativo, causa 5 de dano adicional e o dano ignora Resistências; se Perry estiver ativo, o dano do ataque passa a ser de terra e o alvo fica lento.',
      },
      {
        name: 'Bicada Trovejante',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'bolt',
        effect:
          'O alvo fica atordoado. Só pode ser feito se Woody estiver ativo.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Afinidades Dinâmicas',
        effect:
          'Com Bernie ativo, a Turma e o Andarilho têm Resistência a dano de fogo e de gelo e Vulnerabilidade a dano de terra. Com Perry ativo, têm Resistência a dano físico e de terra e Vulnerabilidade a dano de ar. Com Woody ativo, têm Resistência a dano de ar e de raio e Vulnerabilidade a dano de gelo. Vale só em cenas de conflito.',
      },
      {
        name: 'Ei, Ei! Escolha Eu!',
        effect:
          'No início de cada cena de conflito e no início do turno do Andarilho, ele deve escolher Bernie, Perry ou Woody. O animal escolhido fica ativo e substitui o anterior. Vale só em cenas de conflito.',
      },
    ],
  }),

  creature({
    name: 'Lumi',
    page: 332,
    summary:
      'Fada elemental frágil que se fortalece com os Arcanos do Andarilho: copia as Resistências do Arcano fundido e causa dano adicional.',
    body: 'Depois que o Exército Imperial queimou a Árvore das Estações, a jovem sacerdotisa Akari encontrou Lumi entre as cinzas junto às raízes que restaram. A fadinha é tudo o que sobrou do vigor da Árvore e deve ficar mais forte conforme Akari reunir os espíritos sazonais espalhados.\n\n**Notas de projeto:** companheira peculiar, feita para aproveitar os Arcanos invocados por Akari. Pode ser muito forte, sobretudo se um Arcano der Resistência a vários tipos de dano, mas é extremamente frágil, e os Poderes dela quase não servem sem um Arcano invocado ou outro efeito que lhe dê Resistências. O grupo concluiu que essas desvantagens justificam o poder de Metamorfose Arcana.',
    originalName: 'Lumi',
    level: 5,
    species: 'elemental',
    rank: 'soldier',
    flags: ['companion'],
    villain: false,
    traits: ['brilhante', 'potencial oculto', 'misteriosa', 'minúscula'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 8 },
    hp: 20,
    crisis: 10,
    mp: 55,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { dark: 'vulnerable', light: 'immune', poison: 'immune' },
    attacks: [
      {
        name: 'Explosão Arcana',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'physical',
        effect:
          'Se Lumi tiver Resistência a ar, fogo e/ou físico no momento, o ataque tem multi (2); se tiver Resistência a raio, terra e/ou gelo no momento, cada alvo atingido fica lento.',
      },
    ],
    spells: [
      {
        name: 'Dardo Elemental',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect:
          'Causa (RA + 10) de dano de luz ao alvo. Ao causar dano com este feitiço, Lumi pode trocar o tipo do dano por um a que tenha Resistência no momento.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Metamorfose Arcana',
        effect:
          'Quando o Andarilho invoca um Arcano cujos benefícios de fundição lhe deem Resistência, Imunidade e/ou Absorção a ar, raio, terra, fogo, gelo e/ou físico, Lumi ganha Resistência a esses mesmos tipos até o Arcano ser dispensado. Enquanto o Andarilho estiver fundido a um Arcano, Lumi causa dano adicional igual ao número de Arcanos vinculados por ele.',
      },
    ],
  }),

  creature({
    name: 'Mathim',
    page: 333,
    summary:
      'Familiar digital de um Diabolista: sonda e apoia à distância, divide sentidos e PV com o Andarilho e se recompõe se os dois se afastarem.',
    body: 'Mathim é um familiar digital criado pela hacker mágica Galari, que assim explora e apoia os aliados sem se expor. Longe de uma simples inteligência artificial, ele foi aceso com um toque de magia de fogo e tem um temperamento bem sarcástico. Ele é baseado na Peculiaridade [[diabolista]] (Atlas Techno Fantasy, p. 122).\n\n**Notas de projeto:** familiar feito para facilitar o jogo "remoto" do Esper (Atlas Techno Fantasy, p. 110 e 123). Acompanhando o grupo, permite que Galari use seus cantos em aliados e inimigos (que ouvem a voz dela) e lance feitiços por meio dele (ela vê o que ele vê). Galari continua parte da cena, mas, em outro lugar, fica protegida de qualquer efeito que exija visão, como a maioria dos ataques e feitiços.\n\nPor ser um familiar, Mathim tem o cálculo de PV e os bônus de Precisão e de Magia fixos.',
    originalName: 'Mathim',
    level: 5,
    species: 'demon',
    rank: 'soldier',
    flags: ['companion'],
    villain: false,
    traits: ['flutuante', 'hipnótico', 'semicorpóreo', 'sarcástico'],
    attributes: { DES: 6, AST: 8, VIG: 8, VON: 10 },
    hp: 42,
    crisis: 21,
    mp: 65,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { dark: 'resistant', fire: 'resistant', light: 'vulnerable' },
    attacks: [
      {
        name: 'Ecto-mordida',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'dark',
        effect:
          'O Andarilho recupera PM igual à metade dos PV que o alvo perdeu.',
      },
    ],
    spells: [
      {
        name: 'Olhar Abrasador',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        effect: 'Causa (RA + 15) de dano de fogo ao alvo, que fica atordoado.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Sentidos Ligados',
        effect:
          'Para o Poder [[navegador]] (Atlas Techno Fantasy, p. 151), Mathim conta sempre como um aliado por quem o Andarilho tem um Laço. O Andarilho também ouve e vê tudo o que Mathim ouve e vê, e qualquer criatura que ouça Mathim também ouve o Andarilho.',
      },
      {
        name: 'Almas Ligadas',
        effect:
          'Quando Mathim perde PV, o Andarilho pode perder a mesma quantidade no lugar dele. Se os dois ficarem a mais de 1 dia de Viagem um do outro, Mathim some e reaparece ao lado do Andarilho.',
      },
    ],
  }),

  creature({
    name: 'Sr. Cog',
    page: 334,
    summary:
      'Robô blindado que toma o lugar do Andarilho diante de qualquer perigo e revida; uma muralha de aço, fraca só contra raio.',
    body: 'Um robô alto e muito blindado, resgatado do Ferro-Velho Delta por uma médica itinerante e corajosa (Atlas Techno Fantasy, p. 147). Ao ser reativado, mostrou uma personalidade peculiar e passou a proteger a médica. Nunca diz uma palavra, mas o leve tilintar das engrenagens transmite segurança.\n\n**Notas de projeto:** companheiro defensivo que usa o Poder [[proteger]] do Guardião (Livro Básico, p. 197) quantas vezes quiser, mas só em favor do Andarilho dele. Apesar da fraqueza a raio, as Resistências e o Vigor o fazem uma verdadeira muralha de aço, que ainda revida.',
    originalName: 'Mr. Cog',
    level: 5,
    species: 'construct',
    rank: 'soldier',
    flags: ['companion'],
    villain: false,
    traits: ['curioso', 'corpulento', 'inescrutável', 'protetor'],
    attributes: { DES: 6, AST: 8, VIG: 12, VON: 6 },
    hp: 38,
    crisis: 19,
    mp: 35,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      bolt: 'vulnerable',
      earth: 'resistant',
      ice: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Tapa Esmagadora',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'physical',
      },
      {
        name: 'Laser de Mão',
        range: 'ranged',
        accuracy: 'AST + VIG',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'fire',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Protocolo de Defesa',
        effect:
          'Quando o Andarilho é ameaçado por um ataque, feitiço ou outro perigo, o Sr. Cog pode tomar o lugar dele: todos os testes do perigo são feitos contra o Sr. Cog, que pode declarar o uso antes ou depois dos testes. Se o perigo já o afetava, ele o afeta duas vezes (resolva cada uma separadamente).',
      },
      {
        name: 'Protocolo de Retaliação',
        effect:
          'No fim do turno de cada inimigo, se esse inimigo causou dano ao Sr. Cog no turno, ele pode fazer um ataque livre com Tapa Esmagadora ou Laser de Mão contra o inimigo. Considere o RA desse teste de Precisão como 0 para o dano, a menos que o inimigo o tenha ferido por causa do Protocolo de Defesa.',
      },
    ],
  }),

  creature({
    name: 'Palupam',
    page: 335,
    summary:
      'Slime guerreiro que turbina os ataques com arma pesada do Andarilho e acumula Pontos de Home Run para rebater um ataque extra.',
    body: 'Quando um portal estranho jogou a jovem prodígio do beisebol Xingxing na terra de Yara, o primeiro encontro dela foi com um slime guerreiro errante, Palupam. Juntos, criaram um estilo de luta baseado em energia cinética, tacadas bem cronometradas e na capacidade de Palupam de virar uma bola elástica ou endurecer num ataque de espinhos.\n\n**Notas de projeto:** o exemplo de companheiro temático, desenhado para combinar com a estética do Andarilho: melhora os ataques com arma pesada de Xingxing e, de vez em quando, ataca por conta própria com Ricochete de Home Run. São habilidades fortes, mas o grupo achou que o estoque de PM restrito basta para segurá-las.',
    originalName: 'Palupam',
    level: 5,
    species: 'elemental',
    rank: 'soldier',
    flags: ['companion'],
    villain: false,
    traits: ['fofo', 'enérgico', 'macio', 'molengo'],
    attributes: { DES: 10, AST: 6, VIG: 10, VON: 6 },
    hp: 32,
    crisis: 16,
    mp: 35,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: { physical: 'immune', ice: 'vulnerable', poison: 'immune' },
    attacks: [
      {
        name: 'Bola de Espinhos',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Tacada de Rebatedor',
        effect:
          'Quando o Andarilho ataca com uma arma corpo a corpo da categoria pesada, Palupam pode gastar 5 PM; se gastar, escolha uma opção: o ataque ganha multi (2); ou o ataque causa 5 de dano adicional e pode ter como alvo criaturas que normalmente não poderiam ser alvo de ataques corpo a corpo.',
      },
      {
        name: 'Ricochete de Home Run',
        effect:
          'Depois que um ataque que recebeu os benefícios de Tacada de Rebatedor atinge um ou mais alvos, Palupam ganha Pontos de Home Run iguais ao RA do teste de Precisão desse ataque. Depois que o ataque for resolvido, Palupam pode gastar 10 Pontos de Home Run para fazer um ataque livre com Bola de Espinhos; considere o RA desse teste de Precisão como 0 para o dano. Palupam também perde todos os Pontos de Home Run no fim de cada cena.',
      },
    ],
  }),

  creature({
    name: 'Tao',
    page: 336,
    summary:
      'Pavus orgulhoso que serve de montaria: dá ao Andarilho Resistência a dano físico, cura e causa dano extra em alvos com condições.',
    body: 'Os batedores e a cavalaria do reino de Askera são famosos pelos pavus, aves parecidas com pavões, maiores que avestruzes, de grande resistência e bico forte, que não deve ser subestimado. Um pouco orgulhosos, tornam-se companheiros fiéis de quem conquista o afeto deles. Foi assim que Tao, um pavus marcado de cicatrizes, passou a seguir teimosamente a jovem cavaleira Lenna depois que ela desertou.\n\n**Notas de projeto:** companheiro simples e confiável: Montaria de Cavaleiro o deixa proteger Lenna de dano físico e Plumas Curativas é um ótimo apoio. Bicada de Pavus depende de condições para o dano extra, o que é mais interessante que o poder de NPC Dano Extra e incentiva sinergia com o grupo. Lenna é uma Comandante, que combina os ataques dela com os de Tao usando [[carga-de-cavalaria]] e [[gambito-da-dama]]. Outro Jogador teve a ideia, aprovada pelo grupo, de criar as "barbelas": acessórios que Lenna equipa no espaço de acessório, mas cujos benefícios vão para Tao.',
    originalName: 'Tao',
    level: 5,
    species: 'beast',
    rank: 'soldier',
    flags: ['companion'],
    villain: false,
    traits: ['elegante', 'perceptivo', 'orgulhoso', 'ágil'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 26,
    crisis: 13,
    mp: 45,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {},
    attacks: [
      {
        name: 'Bicada de Pavus',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 5,
        damageType: 'physical',
        effect:
          'Se o alvo estiver sofrendo uma ou mais condições, causa 5 de dano adicional e o dano ignora Resistências.',
      },
    ],
    spells: [
      {
        name: 'Plumas Curativas',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'O alvo recupera 30 PV e se recupera de envenenado, lento e fraco.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Montaria de Cavaleiro',
        effect:
          'Tao é uma montaria terrestre (Livro Básico, p. 125). Enquanto estiver presente na cena, o Andarilho tem Resistência a dano físico.',
      },
    ],
  }),
]);
