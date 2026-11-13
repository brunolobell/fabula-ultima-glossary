import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Mercador';

export const mercador: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 158,
    summary:
      'Usa o comércio como força transformadora: acumula Pontos de Comércio para poupar Inventário, ajudar em testes de examinar e criar itens raros, materiais ou contatos.',
    body: `Mesmo em mundos transbordando magia, o dinheiro tem muita influência. O comércio é essencial para o desenvolvimento de nações e reinos, e mercadores sabem bem desse poder.

Pode parecer estranho ver mercadores em pé de igualdade com heróis. Mas quem resiste à tentação da ganância e usa o comércio para incentivar a troca de ideias e o diálogo entre pessoas está, de fato, travando a própria revolução.

## Para pensar no personagem

- O que te apresentou a arte do comércio? São negócios de família?
- O mundo seria melhor sem dinheiro? Se sim, por que você ainda é um mercador?
- O que você mais ama no comércio? E o que você detesta nele?
- Você tem algum rival de negócios? Qual é sua relação com ele?`,
    otherNames: ['Antiquário', 'Colecionador', 'Farmacêutico'],
    quote: 'Antes de mais nada, pense: como isso vai ajudar a quem precisa?',
    traits: ['ip'],
    freeBenefits: [
      'Aumenta permanentemente seus Pontos de Inventário (PI) máximos em 2.',
    ],
  }),

  skill(
    CLASS,
    'Data de Validade',
    159,
    3,
    'Numa poção ou iguaria sua que cura e não causa dano, você pode trocar a cura por dano de veneno de metade do nível + NP × 10 em cada criatura (dividido ao meio se forem 2 ou mais).',
    `Quando uma poção ou iguaria que você criou **não causar dano**, mas fizer uma ou mais criaturas recuperarem PV, você pode fazê-la, em vez de curar, causar dano de **veneno** igual a **(metade do seu nível + (NP × 10))** a cada uma dessas criaturas (tipo fixo). Se atingir duas ou mais criaturas, esse dano é **dividido à metade**.`,
  ),

  skill(
    CLASS,
    'Estoque Pessoal',
    159,
    3,
    'Quando você ou outro PJ for gastar NP + 2 ou menos Pontos de Inventário, gaste 1 Ponto de Comércio para ignorar esse custo.',
    `Quando você ou outro PJ for gastar **(NP + 2)** ou menos Pontos de Inventário, você pode gastar **1 Ponto de Comércio** para que o alvo ignore esse custo.`,
  ),

  skill(
    CLASS,
    'Já Ouvi Falar',
    159,
    3,
    'Quando você ou um aliado que o entenda fizer um teste para examinar criatura, item ou local, gaste 1 Ponto de Comércio para dar bônus de NP + 2 ao resultado.',
    `Quando você ou um aliado que possa ouvir e entender você fizer um teste para **examinar** uma criatura, item ou local, você pode gastar **1 Ponto de Comércio** para conferir bônus igual a **(NP + 2)** ao resultado do teste.`,
  ),

  skill(
    CLASS,
    'Ventos do Comércio',
    159,
    3,
    'Ao descansar onde há comércio, ganha NP + 1 Pontos de Comércio (máximo NP + 3). Fora de conflito, 2 Pontos criam um item raro ou material (valor até seu nível × 30z) ou um NPC local.',
    `Depois de descansar numa área onde possa fazer comércio, você recebe **(NP + 1)** Pontos de Comércio. Você nunca pode ter mais que **(NP + 3)**. Se adquirir este poder na criação do personagem, começa o jogo com **2 Pontos de Comércio**.

Numa cena sem conflito, você pode gastar **2 Pontos de Comércio** para escolher um efeito:

- criar um **item raro** ou um **material**, aprovado pelo Mestre, de valor em zênites igual ou menor que **(seu nível × 30z)**; **ou**
- criar um **NPC** que more por perto, explicar o ofício dele e como vocês se conheceram, e o Mestre diz o que ele deseja em troca dos serviços.`,
  ),

  skill(
    CLASS,
    'Verdadeiro Tesouro',
    159,
    3,
    'Uma vez por sessão, ao ajudar um NPC ou comunidade a superar ganância e corrupção, melhorar a vida ou coexistir com outras criaturas, e tendo Ventos do Comércio, ganha NP + 1 Pontos de Comércio.',
    `Uma vez por sessão, quando você ajudar um NPC ou uma comunidade a superar ganância e corrupção, melhorar a qualidade de vida ou coexistir com outras criaturas, se tiver [[ventos-do-comercio]], você recebe **(NP + 1)** Pontos de Comércio.`,
  ),
];
