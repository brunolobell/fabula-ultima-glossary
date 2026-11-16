import { SeedEntry } from '../../types';
import { rule } from '../../helpers';
import { artifact, rareAccessory } from '../rare-helpers';

const BOOK = 'livro-basico' as const;

const RULE_LINK = 'Veja as características em [[criar-acessorios-raros]].';
const ARTIFACT_LINK = 'Veja a regra geral em [[artefatos]].';

const accessory = (
  name: string,
  page: number,
  cost: number,
  effect: string,
  body: string = RULE_LINK,
): SeedEntry => rareAccessory(BOOK, { name, page, cost, effect, body });

export const acessoriosArtefatosLivroBasico: SeedEntry[] = [
  // Como criar acessórios (p. 284-285)
  {
    ...rule(
      'Criar acessórios raros',
      284,
      'Regra para criar um acessório raro: basta escolher uma característica da lista (ou inventar outra); o preço do item é o da característica, sem item base.',
      `Para criar um acessório raro, o mestre só precisa decidir **que característica** ele concede, escolhendo da lista abaixo ou inventando algo mais adequado. O **preço do item é o preço da característica**: não há item básico por baixo, então o valor da tabela é o custo completo (diferente da lista de [[criar-armaduras-e-escudos-raros]], onde o valor se soma ao do item base).

Vale experimentar efeitos personalizados ligados à natureza e à origem do item. Muitos dos acessórios de exemplo não usam nenhuma característica da tabela: os melhores concedem benefícios bem específicos ou estimulam estratégias pouco convencionais. Os cuidados da seção de [[criar-armas-raras]] valem aqui também.

## Características de acessórios (p. 284-285)

### Defensivas

| Característica | Custo | Efeito |
| --- | --- | --- |
| **Anticondição** | 500z | Imunidade a uma condição. |
| **Resistência** | 700z | Resistência a um tipo de dano (exceto físico). |
| **Amuleto** | 800z | Defesa Mágica +1. |
| **Baluarte** | 800z | Defesa +1. |
| **Dupla resistência** | 1.000z | Resistência a dois tipos de dano (exceto físico). |
| **Quebra-lâminas** | 1.000z | Resistência a dano físico. |
| **Imunidade** | 1.500z | Imunidade a um tipo de dano (exceto físico). |
| **Omniescudo** | 2.000z | Defesa e Defesa Mágica +1. |
| **Saúde perfeita** | 2.000z | Imunidade a todas as condições. |

### De melhoria

| Característica | Custo | Efeito |
| --- | --- | --- |
| **Mudar dano** | 300z | O dano das suas armas, feitiços e poderes passa a ser de um tipo específico. |
| **Mais Iniciativa** | 500z | +4 na Iniciativa, mas só se você estiver usando o item no início do conflito. |
| **Mais Precisão** | 1.000z | +1 em testes de Precisão. |
| **Mais Magia** | 1.000z | +1 em testes de Magia. |
| **Mais vitalidade** | 1.000z | Ao recuperar PV, você recupera 5 PV adicionais. |
| **Mais cura** | 1.500z | Seus feitiços que recuperam PV recuperam 5 PV adicionais. |
| **Mais conjuração** | 2.000z | Seus feitiços causam 5 pontos de dano adicional. |
| **Mais dano** | 2.000z | Seus ataques corpo a corpo **ou** à distância (escolha um) causam 5 pontos de dano adicional. |

## Diferenças para armaduras e escudos

- **Mudar dano** existe só na lista de acessórios; a lista de [[criar-armaduras-e-escudos-raros]] não a tem.
- **Mais Iniciativa** num acessório só vale se o item estiver sendo usado no começo do conflito; numa armadura o bônus já faz parte do item.
- **Amuleto**, **Baluarte** e **Omniescudo** também aparecem na lista de [[criar-armas-raras]].`,
      ['regra', 'equipamento', 'acessório', 'rara'],
    ),
    source: BOOK,
  },

  // Exemplos de acessórios (p. 285)
  accessory('Cinto de Explorador', 285, 500, 'Você recebe +4 na Iniciativa.'),
  accessory('Luvas Elegantes', 285, 500, 'Você é imune à condição atordoado.'),
  accessory('Luvas Gastas', 285, 500, 'Você é imune à condição fraco.'),
  accessory('Luvas Sedosas', 285, 500, 'Você é imune à condição lento.'),
  accessory('Luvas Quentes', 285, 500, 'Você é imune à condição abalado.'),
  accessory(
    'Botas de Novato',
    285,
    600,
    'Se você tem menos de 10 EXP e rola uma falha crítica, recebe 1 EXP na hora.',
  ),

  // Exemplos de acessórios (p. 286)
  accessory(
    "Máscara Han'nya",
    286,
    700,
    'Todo dano que você causa a criaturas abaladas ignora Resistências.',
  ),
  accessory('Pingente Âmbar', 286, 700, 'Você é Resistente a dano de terra.'),
  accessory(
    'Pingente Ametista',
    286,
    700,
    'Você é Resistente a dano de trevas.',
  ),
  accessory('Pingente Diamante', 286, 700, 'Você é Resistente a dano de luz.'),
  accessory(
    'Pingente Esmeralda',
    286,
    700,
    'Você é Resistente a dano de veneno.',
  ),
  accessory('Pingente Opala', 286, 700, 'Você é Resistente a dano de ar.'),
  accessory('Pingente Rubi', 286, 700, 'Você é Resistente a dano de fogo.'),
  accessory('Pingente Safira', 286, 700, 'Você é Resistente a dano de gelo.'),
  accessory('Pingente Topázio', 286, 700, 'Você é Resistente a dano de raio.'),
  accessory('Anel de Feitiçaria', 286, 800, 'Sua Defesa Mágica aumenta em 1.'),
  accessory(
    'Botas de Vagante',
    286,
    900,
    'Quando o grupo faz uma descoberta durante uma Viagem, você recebe 1 Ponto de Fabula.',
    `Veja as características em [[criar-acessorios-raros]]. As descobertas são tratadas em [[jornadas-e-viagens]].`,
  ),
  accessory(
    'Elmo de crista',
    286,
    1000,
    'Você recebe +1 em testes de Precisão.',
  ),

  // Exemplos de acessórios (p. 287)
  accessory(
    'Luvas Carmesins',
    287,
    1000,
    'Ao fazer um ataque com multi, você recebe +2 no teste de Precisão.',
  ),
  accessory(
    'Chapéu Pontudo Amarelo',
    287,
    1000,
    'Você recebe +1 em testes de Magia.',
  ),
  accessory(
    'Anel do Leão',
    287,
    1500,
    'Você recebe +2 em testes opostos que usem Vontade.',
  ),
  accessory(
    'Anel da Coruja',
    287,
    1500,
    'Você recebe +2 em testes opostos que usem Astúcia.',
  ),
  accessory(
    'Anel do Pupilo',
    287,
    1500,
    'Enquanto tiver ao menos dois Laços de admiração, sua Defesa e sua Defesa Mágica aumentam em 1.',
  ),
  accessory(
    'Anel de Contos',
    287,
    1500,
    'Ao rolar um sucesso crítico, você pode gastar a oportunidade gerada para ganhar 1 Ponto de Fabula.',
    `Veja as características em [[criar-acessorios-raros]]. Sobre os Pontos de Fabula, veja [[pontos-de-fabula]].`,
  ),
  accessory(
    'Luvas de Pele Multicamada',
    287,
    2000,
    'Você é imune a todas as condições.',
  ),
  accessory(
    'Anel de Cebolas',
    287,
    2000,
    'Enquanto o usa, seu PV máximo e seu PM máximo aumentam em 2 por classe diferente que você tiver.',
  ),
  accessory(
    'Anel de Gelo',
    287,
    2500,
    'Você Absorve dano de gelo, mas é Vulnerável a dano de fogo.',
  ),
  accessory(
    'Anel de Magma',
    287,
    2500,
    'Você Absorve dano de fogo, mas é Vulnerável a dano de gelo.',
  ),
  accessory(
    'Anel do Ovo',
    287,
    3000,
    'Ao ficar com 0 PV, você pode escolher resistir e ficar com 1 PV; depois disso, não pode repetir o efeito até descansar.',
    `Veja as características em [[criar-acessorios-raros]]. O descanso é descrito em [[descanso]].`,
  ),

  // Artefatos (p. 288)
  {
    ...rule(
      'Artefatos',
      288,
      'Regras de mestre sobre artefatos: itens tão poderosos que giram em torno da campanha, não se compram nem se vendem e não têm regras de criação.',
      `Itens raros dão opções para personalizar um personagem, mas **artefatos são o tema central de uma campanha**. Eles vão além de aumentar dano, dar bônus em testes ou ignorar condições: são tão poderosos que atraem a atenção das grandes organizações do mundo. Por isso **não podem ser comprados nem vendidos**, exceto por preços absurdos, e quase ninguém aceita se desfazer de um.

## Artefatos no seu jogo

Não existem regras para criar um artefato. Os efeitos devem ir muito além dos de feitiços comuns e itens mágicos, e o único limite é o que o mestre achar adequado. Não apresente um artefato novo a cada sessão: **um mesmo arco narrativo deve ter no máximo dois**. Faça deles elementos importantes para o desenvolvimento da história, e não "brinquedos mágicos superpoderosos".`,
      ['regra', 'equipamento', 'artefato'],
    ),
    source: BOOK,
  },

  // Artefatos (p. 288-291)
  artifact(BOOK, {
    name: 'Astroscópio',
    page: 288,
    summary:
      'Globo cheio de estrelas e nuvens que permite controlar o dia, a noite e o clima numa grande área, sem gastar PM.',
    body: `Um grande globo cheio de estrelas e nuvens rodopiantes. Quem coloca a mão sobre ele e observa a energia em movimento pode **manipular o ciclo de dia e noite** num raio de até 1 dia de Viagem e também **mudar o clima** (vento, nevascas, neve, nuvens etc.) na mesma área.

O efeito equivale aos [[rituais]] de entropismo (dia e noite) ou de elementalismo (clima), mas o artefato **não consome PM** e o usuário **não precisa ter dominado** nenhuma das duas disciplinas.

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Bastão da Terra Ascendente',
    page: 289,
    summary:
      'Bastão de oricalco, relíquia de uma era de tecnologias perdidas, capaz de erguer e mover massas de terra quando posto no centro do Anel de Oricalco.',
    body: `Um bastão de 30 centímetros, de um metal que lembra latão. Vem de uma era de tecnologias perdidas: sua estrutura é de **oricalco**, um metal levíssimo e quase indestrutível, e uma ponta guarda uma gema feita de espíritos da terra cristalizados.

Quando colocado no centro do **Anel de Oricalco** (uma estrutura cuja natureza e construção ainda são desconhecidas), o bastão pode **levantar massas inteiras de terra do solo e fazê-las flutuar e se mover**.

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Elmo dos Pensamentos',
    page: 289,
    summary:
      'Elmo feito do crânio de uma fera misteriosa; quem o veste sente emoções e pensamentos superficiais e pode ler a mente de uma criatura.',
    body: `Um elmo levíssimo, criado com o crânio de uma fera misteriosa. Quem o veste sente, sem esforço, as **emoções e os pensamentos superficiais** das pessoas ao redor.

Ao se concentrar e usar uma **ação**, o usuário pode **ler os pensamentos de uma criatura específica**. O alvo sente apenas um leve formigamento na base do crânio e **não percebe** que sua mente está sendo lida.

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Escama do Vento',
    page: 289,
    summary:
      'Escama dourada e translúcida que concede voar e levitar à vontade enquanto toca a pele, com o risco de transformar o portador.',
    body: `Uma escama dourada e translúcida do tamanho de uma mão humana, de origem desconhecida. Quem a usa ganha a habilidade de **voar e levitar à vontade**, desde que a escama **permaneça em contato com a pele**.

Dizem que o contato prolongado pode **alterar a fisiologia do portador para sempre**, transformando-o aos poucos em algo que ninguém sabe dizer o quê.

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Fragmento de Voz',
    page: 289,
    summary:
      'Pedaço de cristal cujo portador ouve vozes que guiam ao poder, à riqueza e à prosperidade; só ele as escuta.',
    body: `Um pedaço de cristal vítreo do tamanho de um punho. Quem o segura ouve vozes cuja sabedoria leva ao poder, à riqueza e à prosperidade. Uns acreditam que elas pertencem a um panteão de deuses esquecidos; outros, a pessoas sábias e generosas de uma era passada (ou futura).

As vozes só são ouvidas por **quem está segurando o artefato**, então os demais precisam confiar na sinceridade do portador.

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Pena Final',
    page: 290,
    summary:
      'Pena que brilha em cores de arco-íris, a última do seu tipo; lendas dizem que, moída, ressuscita uma criatura morta há pouco.',
    body: `Uma bela pena do tamanho de um antebraço humano, que brilha com as cores do arco-íris. Muitos estudiosos debateram sua natureza e origem sem achar respostas. Duas coisas são certas: **é a última do seu tipo**, e várias lendas dizem que ela pode ser esmagada até virar um pó fino capaz de **ressuscitar uma criatura morta recentemente**.

Ninguém teve coragem de testar, sobretudo porque a pena seria **destruída** no processo.

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Rasga-almas',
    page: 290,
    summary:
      'Lâmina quebrada que, com a sequência certa de movimentos, isola uma alma do rio das almas, podendo condená-la ao esquecimento ou ao tormento.',
    body: `Uma lâmina hiperafiada que brilha com uma luz sinistra. Parece a metade inferior de uma montante quebrada e é **quase inútil em combate real**; seu verdadeiro poder é outro.

Se o portador realizar a **sequência correta de posturas e movimentos**, consegue **isolar uma consciência** que esteja no **rio das almas** e separá-la do fluxo. É um efeito de ritualismo com **potência extrema** (veja [[rituais]]), mais fácil quando:

- a alma é de alguém que morreu há pouco;
- a alma era de caráter forte; ou
- o portador tinha um laço profundo com a pessoa.

Conforme o resultado do teste, a alma pode ser cortada **apenas por um tempo** ou ficar **impedida de voltar ao rio das almas**, condenada a desaparecer no esquecimento ou a ficar presa em tormento eterno.

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Sangue Preto',
    page: 290,
    summary:
      'Frasco de líquido negro e viscoso; quem o bebe, ao morrer, mantém a consciência presa ao mundo dos vivos em vez de voltar ao rio das almas.',
    body: `Um grande frasco com uma substância preta, oleosa e viscosa, que dizem vir de uma fonte maculada nas profundezas da terra. Quem a bebe ganha uma habilidade peculiar: **ao morrer, seu espírito não volta ao rio das almas** que permeia o mundo, e sua consciência etérea permanece **vinculada ao mundo dos vivos**.

Ninguém sabe por que alguém escolheria esse destino.

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Tomo do Portão',
    page: 291,
    summary:
      'Grimório antigo que, sob a lua cheia, deixa a tinta virar tentáculos e abre um caminho para o Cosmos até o amanhecer.',
    body: `Um grimório pesado, com um olho carmim na capa que às vezes parece se mexer. Suas páginas trazem rabiscos ilegíveis e imagens perturbadoras de criaturas horrendas adorando o céu.

À luz da **lua cheia**, a tinta brilha em tom avermelhado, sobe das páginas e se contorce numa rede de tentáculos que rasgam a realidade. O artefato **abre um caminho para o Cosmos**, que **se fecha ao amanhecer**.

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Varinha dos Ermos',
    page: 291,
    summary:
      'Varinha de 10 cm que, com uma ação, transforma uma criatura voluntária numa pequena fera; só o portador ou um ritual de quimerismo extremo desfaz o efeito.',
    body: `Uma varinha de madeira de 10 cm, decorada com folhas de esmeralda. É pequena e frágil demais para servir de arma, mas permite que pessoas **se transformem em animais**.

O portador pode usar uma **ação** para transformar uma **criatura voluntária** (inclusive ele mesmo) numa **pequena fera**, como um cão, esquilo, gato, pássaro ou peixe. Tudo o que a pessoa carrega passa a fazer parte da forma animal, e **enquanto estiver transformada ela não pode falar, lutar nem usar magia**. A varinha, porém, **nunca vira parte do equipamento** do alvo transformado: quem usar o efeito em si mesmo terá de carregá-la com a boca, o bico ou as garras.

Quem estiver com a varinha pode usar uma **ação** para **reverter** a transformação de uma criatura. Se o artefato for perdido ou roubado, a transformação só pode ser revertida por um conjurador poderoso, com um ritual de **quimerismo** de potência extrema (veja [[rituais]]).

${ARTIFACT_LINK}`,
  }),
  artifact(BOOK, {
    name: 'Zênite do Homem Morto',
    page: 291,
    summary:
      'Moeda de ouro antiga com uma caveira no verso; a lenda diz que seu portador comanda piratas fantasmas em troca da própria alma.',
    body: `Lembra uma moeda de ouro antiga, exceto por uma **caveira** no verso. É fácil de perder ou de pôr no lugar errado e está gasta pelo tempo. Muitos riem do crânio brilhante e dizem que é piada de ourives, mas velhos marinheiros aconselham deixá-la afundar no oceano.

Uma antiga lenda fala de uma moeda de ouro indestrutível cujo portador pode **comandar um exército de piratas fantasmagóricos**... **em troca da própria alma**.

${ARTIFACT_LINK}`,
  }),
];
