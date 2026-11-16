import { inBook, rule } from '../../helpers';
import { SeedEntry } from '../../types';
import { RareAccessory, rareAccessory } from '../rare-helpers';

/**
 * Bestiary Vol. I, rewards of the Compendium: the three fixed accessories and the
 * Rule that lists the 23 named Qualities. Translated and unofficial (ADR 0004):
 * the Portuguese names are ours, the English ones stay searchable (tags and body).
 * The artifacts, materials, magiseeds and consumables of the same reward lists
 * are not seeded.
 */
const NOTE = '*Bestiary Vol. I (inglês), não oficial.*';

/** Qualities in the order the Compendium prints them. */
interface Quality {
  name: string;
  original: string;
  /** Price added to the gear, in zenites. */
  price: number;
  /** What it attaches to. */
  target: string;
  effect: string;
  /** Creature entry link(s), as a Markdown fragment. */
  creature: string;
  page: number;
}

const QUALITIES: Quality[] = [
  // Adamantherion (p. 85)
  {
    name: 'Evocador de Abalos',
    original: 'Quakecaller',
    price: 2000,
    target: 'qualquer equipamento',
    effect:
      'Você ignora o custo de PM dos feitiços [[pedregulho]] e [[terra]] e pode lançá-los mesmo sem tê-los aprendido.',
    creature: '[[adamantherion]]',
    page: 85,
  },
  {
    name: 'Morteiro Rugidor',
    original: 'Bellowing Mortar',
    price: 2000,
    target: 'arco ou arma de fogo',
    effect:
      'Os ataques com a arma têm múltiplo (2). Os inimigos que você atinge com ela deixam de sofrer os efeitos de todos os feitiços com duração Cena.',
    creature: '[[adamantherion]]',
    page: 85,
  },
  {
    name: 'Barreira de Pangeia',
    original: 'Pangea Barrier',
    price: 2000,
    target: 'escudo ou armadura',
    effect: 'Você tem Resistência a dano de terra, de fogo, de gelo e físico.',
    creature: '[[adamantherion]]',
    page: 85,
  },
  // Arboreal Dragon (p. 93)
  {
    name: 'Vitalidade Desabrochante',
    original: 'Blossoming Vitality',
    price: 1200,
    target: 'qualquer equipamento',
    effect:
      'Quando você recupera PV estando em Crise, recupera 5 PV a mais e também se livra de uma condição à sua escolha.',
    creature: '[[dragao-arboreo-grupo]]',
    page: 93,
  },
  // Arsenal Cobra (p. 97)
  {
    name: 'Carga V.E.N.O.M.',
    original: 'V.E.N.O.M. charge',
    price: 400,
    target: 'arma que já causa dano de raio',
    effect:
      'Ao causar dano com a arma fora de Crise, você pode transformar em dano de luz todo o dano desse ataque.',
    creature: '[[arsenal-cobra]]',
    page: 97,
  },
  {
    name: 'Explosão de Turbina',
    original: 'Turbine blast',
    price: 800,
    target: 'escudo',
    effect:
      'Uma vez por cena, depois que um inimigo o faz perder PV com um ataque ou feitiço (e após resolvê-lo), você causa 20 de dano de fogo a ele.',
    creature: '[[arsenal-cobra]]',
    page: 97,
  },
  // Basilisk (p. 109)
  {
    name: 'Olho de Basilisco',
    original: 'Basilisk eye',
    price: 1000,
    target: 'arma',
    effect:
      'Os inimigos que você atinge com a arma passam a ser "vigiados" por ela. Quando um ou mais inimigos vigiados se recuperam de condições, cada um perde 10 PV e deixa de ser vigiado.',
    creature: '[[basilisco]]',
    page: 109,
  },
  // Echinokore (p. 119)
  {
    name: 'Grande Floração',
    original: 'Grand bloom',
    price: 1700,
    target: 'arma arcana ou armadura não marcial',
    effect:
      'Seus feitiços causam dano extra igual a 2 mais o número de seções preenchidas do seu Relógio de Crescimento (Atlas Natural Fantasy, p. 140).',
    creature: '[[echinokore]]',
    page: 119,
  },
  {
    name: 'Raízes Fincadas',
    original: 'Entrenched roots',
    price: 1500,
    target: 'escudo ou armadura marcial',
    effect:
      'Você tem Resistência a dano físico e +2 em testes opostos quando mantém sua posição, bloqueia a passagem ou contém alguém.',
    creature: '[[echinokore]]',
    page: 119,
  },
  // Death Knight (p. 127)
  {
    name: 'Rejeição Sombria',
    original: 'Grim rejection',
    price: 1000,
    target: 'arma de aspecto sombrio',
    effect:
      'Uma vez por cena, quando um ataque com a arma faz inimigos perderem PV, você pode fazer cada perda individual ser igual à diferença entre seus PV máximos e seus PV atuais.',
    creature: '[[cavaleiro-da-morte-grupo]]',
    page: 127,
  },
  {
    name: 'Abraço Ruinoso',
    original: 'Ruinous embrace',
    price: 1000,
    target: 'armadura',
    effect:
      'Você tem Resistência a dano de trevas, de fogo e de gelo, mas é Vulnerável a dano de raio e de luz.',
    creature: '[[cavaleiro-da-morte-grupo]]',
    page: 127,
  },
  // Doomwall (p. 135)
  {
    name: 'Avanço Implacável',
    original: 'Relentless Advance',
    price: 800,
    target: 'qualquer equipamento',
    effect:
      'Depois de ter sucesso em um teste oposto durante o turno de um inimigo, você pode fazer esse inimigo perder 10 PV.',
    creature: '[[muralha-fatal]]',
    page: 135,
  },
  // Esprit (p. 141)
  {
    name: 'Troca de Feitiço',
    original: 'Spellchange',
    price: 300,
    target: 'arma arcana',
    effect:
      'Ao causar dano com um feitiço, você pode mudar o tipo desse dano para o tipo de dano do esprit enfrentado.',
    creature: '[[esprit]]',
    page: 141,
  },
  // Gallowbranch (p. 145)
  {
    name: 'Aura de Névoa Mortal',
    original: 'Deathmist aura',
    price: 900,
    target: 'armadura ou arma arcana',
    effect:
      'Quando um feitiço ofensivo seu faz inimigos perderem PV, se a Rolagem Alta do seu Teste de Magia foi 8 ou mais, esses inimigos ficam fracos.',
    creature: '[[galho-da-forca]]',
    page: 145,
  },
  {
    name: 'Espinhos Flamejantes',
    original: 'Blazing barbs',
    price: 1300,
    target: 'arma não arcana',
    effect:
      'Os inimigos que você atinge com a arma não podem usar as ações Guarda e Feitiço até o fim do próximo turno deles.',
    creature: '[[galho-da-forca]]',
    page: 145,
  },
  // Gargantua (p. 149)
  {
    name: 'Varredura Colossal',
    original: 'Grand swipe',
    price: 1300,
    target: 'espada, arma pesada ou lança',
    effect: 'Os ataques com a arma feitos no seu turno têm múltiplo (2).',
    creature: '[[gargantuas]]',
    page: 149,
  },
  {
    name: 'Repreensão Flamejante',
    original: 'Flaring rebuke',
    price: 1000,
    target: 'escudo ou arma de luta',
    effect:
      'Uma vez por cena, depois que um inimigo que você vê o faz perder PV, se você estiver em Crise, causa a ele dano de fogo igual a 10 mais metade do seu nível, ignorando Resistências.',
    creature: '[[gargantuas]]',
    page: 149,
  },
  {
    name: 'Desafio Absoluto',
    original: 'Absolute defiance',
    price: 1600,
    target: 'acessório ou armadura',
    effect:
      'Ao entrar em Crise pela primeira vez em um conflito, escolha Destreza, Astúcia, Vigor ou Vontade: até o fim da cena (ou até largar o item) você trata esse atributo como um dado maior, até d12.',
    creature: '[[gargantuas]]',
    page: 149,
  },
  // Kelpie (p. 181)
  {
    name: 'Maré Revolta',
    original: 'Rip Tide',
    price: 900,
    target: 'arma',
    effect:
      'Quando um feitiço ofensivo seu faz inimigos perderem PV com dano de gelo, se a Rolagem Alta do seu Teste de Magia foi 8 ou mais, esses inimigos ficam lentos.',
    creature: '[[kelpie]]',
    page: 181,
  },
  // Kerberos (p. 183)
  {
    name: 'Efígie do Pavor',
    original: 'Dread effigy',
    price: 800,
    target: 'escudo',
    effect:
      'Depois que um inimigo o faz perder PV com um ataque corpo a corpo, esse inimigo fica abalado.',
    creature: '[[cerbero-mandibula-sombria]]',
    page: 183,
  },
  {
    name: 'Frio Mortal',
    original: 'Deathly chill',
    price: 600,
    target: 'arma',
    effect:
      'Um feitiço seu que causa dano de gelo e tem duas ou mais criaturas como alvo causa 5 de dano extra, e esse dano ignora Resistências.',
    creature: '[[cerbero-mandibula-gelida]]',
    page: 183,
  },
  // Mellow Pwihnce (p. 193)
  {
    name: 'Empolgação Mole',
    original: 'Mellow hype',
    price: 1000,
    target: 'qualquer equipamento',
    effect:
      'Quando você restaura os PV e/ou PM de duas ou mais criaturas, restaura 5 PV e/ou 5 PM adicionais, respectivamente.',
    creature: '[[corte-mole]]',
    page: 193,
  },
  {
    name: 'Cobertura Mole',
    original: 'Mellow coating',
    price: 650,
    target: 'arma',
    effect:
      'Quando você atinge inimigos com a arma, se a Rolagem Alta do seu Teste de Precisão foi 8 ou mais, esses inimigos ficam lentos.',
    creature: '[[corte-mole]]',
    page: 193,
  },
];

const zenites = (n: number) => `+${n.toLocaleString('pt-BR')}z`;

const qualityTable = [
  '| Qualidade | Nome original | Preço | Vale para | Efeito | Criatura | Pág. |',
  '|---|---|---|---|---|---|---|',
  ...QUALITIES.map(
    (q) =>
      `| **${q.name}** | ${q.original} | ${zenites(q.price)} | ${q.target} | ${q.effect} | ${q.creature} | ${q.page} |`,
  ),
].join('\n');

const qualitiesRule = {
  ...rule(
    'Qualidades de recompensa (Bestiary Vol. I)',
    QUALITIES[0].page,
    'As 23 Qualidades que as recompensas do Bestiário do Bestiary Vol. I sugerem: propriedades extras com preço próprio (de +300z a +2.000z) que o Mestre acrescenta a um equipamento adequado. Não são itens de Equipamento.',
    `No Compendium do Bestiary Vol. I, várias criaturas trazem uma lista de "Special Rewards" ou "Rewards" que sugere dar aos heróis uma peça de equipamento "com" uma **Qualidade** (*Quality*). Uma Qualidade é uma **propriedade extra com preço próprio**, escrito com um "+" (por exemplo, +1.000z), que o Mestre acrescenta a um equipamento que combine com ela, uma arma, uma armadura, um escudo ou um acessório. Pela leitura mais natural do livro, esse valor se soma ao preço do equipamento escolhido. O livro dá cada Qualidade já com o texto do efeito, mas não a define em uma regra à parte; na p. 349 ele só observa que Qualidades de item podem interagir com as regras opcionais de [[pressao-e-desestabilizacao]], sugerindo um preço mínimo em zênites.

Uma Qualidade **não é um item de Equipamento**: não tem Entry própria na lista de equipamento e não vem pronta em nenhuma arma ou armadura. Ela só existe como acréscimo a um item que o Mestre escolhe, em geral um equipamento básico ou raro de que o grupo já goste. A coluna "Vale para" repete o que o livro diz sobre o tipo de equipamento; quando diz "qualquer equipamento", o livro não restringe. Os três itens de preço fixo que o mesmo Compêndio traz (acessórios) são Entries de Equipamento à parte e não aparecem aqui.

As 23 Qualidades nomeadas estão abaixo, na ordem em que o livro as imprime. As três ideias sem nome da p. 349 (uma arma, uma armadura e um escudo ligados ao Relógio de Pressão) não fazem parte da lista. Os nomes em português são tradução nossa e não oficial; o nome em inglês fica indicado para busca. Efeitos resumidos com nossas palavras: números e condições exatos, mas confira o livro para o texto original.

${qualityTable}

*Bestiary Vol. I (inglês), não oficial. Páginas do livro em inglês.*`,
    ['qualidade', 'recompensa', 'bestiary vol. i'],
  ),
  slug: 'qualidades-de-recompensa',
};

/** An accessory with a fixed price; the English name is kept as a search tag. */
const reward = (a: RareAccessory & { original: string }): SeedEntry => {
  const { original, ...accessory } = a;
  const entry = rareAccessory('bestiary-vol-1', accessory);
  return {
    ...entry,
    tags: [...(entry.tags ?? []), 'bestiary vol. i', original.toLowerCase()],
  };
};

export const recompensasBestiaryVol1: SeedEntry[] = [
  ...inBook('bestiary-vol-1', [qualitiesRule]),

  // Acessórios de recompensa (p. 127, 183, 191)
  reward({
    name: 'Manto da Morte Rubra',
    original: 'Mantle of the red death',
    page: 127,
    cost: 1500,
    effect:
      'Você sempre causa e sofre dano extra igual ao total de emoções Inferioridade, Desconfiança e/ou Ódio entre os seus Laços.',
    body: `Recompensa sugerida pelo [[cavaleiro-da-morte-grupo]].

Nome original: *Mantle of the red death*.

${NOTE}`,
  }),
  reward({
    name: 'Rugido Flamejante',
    original: 'Blazing roar',
    page: 183,
    cost: 1000,
    effect:
      'Quando você causa dano a um ou mais inimigos fora do seu turno, pode se recuperar de uma condição à sua escolha.',
    body: `Recompensa sugerida para a [[cerbero-mandibula-flamejante]], no cartão do grupo [[cerbero]].

Nome original: *Blazing roar*.

${NOTE}`,
  }),
  reward({
    name: 'Luvas Viscosas',
    original: 'Slimy gloves',
    page: 191,
    cost: 1000,
    effect:
      'Você ignora toda perda de PV e de PM causada por perigos ambientais.',
    body: `Recompensa sugerida pelo [[magnasapo]].

Nome original: *Slimy gloves*.

${NOTE}`,
  }),
];
