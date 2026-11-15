import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Forjador de Almas';

export const forjadorDeAlmas: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 52,
    summary:
      'Artesão capaz de moldar a energia mágica do rio das almas em armas e feitiços; fortalece seus Poderes com Pontos de Alma, fragmentos extraídos de inimigos derrotados.',
    body: `O forjador de almas dá forma à energia mágica do rio das almas, seja num objeto poderoso, seja escondida num item qualquer. Ninguém nega a habilidade e o capricho dele, mas os grandes nomes da magia torcem o nariz. Afinal, a alma é o que há de mais essencial em qualquer ser, e fica a pergunta: ele paga cada obra com um pedaço da própria alma ou descobriu como usar a dos inimigos?

## Para pensar no personagem

- Como você enxerga as implicações éticas de forjar almas?
- Qual é a aparência das suas runas espirituais?
- Como você aprendeu a forjar almas em formas de armas poderosas?
- O que você sacrifica para continuar aprimorando almas?

## Pontos de Alma

Todo forjador de almas manifesta seus Poderes com a energia da própria alma. Alguns, por desejo sincero de fazer o bem ou por ambição sombria, aprendem a ir além e a extrair um fragmento da alma de outros seres: o **Ponto de Alma**. O Poder [[coletar-almas]] limita o total que você pode ter a **(NP + 1)** Pontos de Alma.

### Como obter

Quando um inimigo é reduzido a **0 PV** em um conflito, você pode **aprisionar a alma dele** e receber **1 Ponto de Alma**.

### O que um Ponto de Alma carrega

Cada Ponto de Alma guarda marcas da criatura de que veio. O mestre revela essas informações quando você o recebe:

- **Espécie:** a espécie da criatura da qual a alma foi extraída.
- **Traço:** um Traço da criatura, à sua escolha.
- **Dano:** um tipo de dano contra o qual a criatura tinha Absorção ou Resistência (exceto físico), à sua escolha.
- **Feitiço:** se a criatura lançava feitiços ofensivos, um deles, à sua escolha.

### Efeito extra por Poder

Ao gastar 1 Ponto de Alma para ativar um destes Poderes, você recebe, além do efeito normal, o benefício abaixo:

| Poder | Efeito adicional ao gastar o Ponto de Alma |
| --- | --- |
| [[forjar-caracteristica]] | A arma ganha, pela duração do efeito, o benefício da espécie do Ponto de Alma (tabela a seguir). |
| [[forjar-feitico]] | Você pode infundir na arma o feitiço do Ponto de Alma, em vez de um dos seus feitiços de elementalista. |
| [[manifestar-arma]] | O tipo de dano da arma passa a ser o do Ponto de Alma e não pode mais mudar. Além disso, uma vez por cena, você pode evocar o Traço do Ponto de Alma como se fosse um Traço seu. |

### Benefício por espécie

| Espécie | Benefício |
| --- | --- |
| Construto | Todo dano que você sofre diminui em **1**, antes de aplicar Afinidades. |
| Demônio | Você fica **Resistente** ao tipo de dano do Ponto de Alma. |
| Elemental | O dano da arma do tipo do Ponto de Alma **ignora Resistências e Imunidades**. |
| Fera | A arma causa **2 pontos de dano adicional**. |
| Humanoide | Se a arma for marcial, você pode equipá-la mesmo sem poder usar armas marciais. |
| Monstro | Num teste de Precisão com a arma, o resultado também conta como **sucesso crítico** se os dois dados tirarem **5**. |
| Morto-vivo | Quando a arma causa dano, a criatura atingida **não recupera PV** até o fim do próximo turno dela. |
| Planta | Escolha **abalado** ou **atordoado**: você fica **imune** a essa condição, mas não se recupera dela se já a sofria. Se você já estava abalado ao equipar a arma, continua abalado; porém, quando se recuperar, não poderá sofrê-la de novo enquanto o efeito durar. |`,
    otherNames: ['Alma Armada', 'Ferreiro Mágico', 'Mestre Rúnico'],
    quote: 'Essa arma não pode fazer isso… ainda.',
    traits: ['ip'],
    freeBenefits: ['Aumenta permanentemente seus PI máximos em 2.'],
  }),

  skill(
    CLASS,
    'Animar Arma',
    53,
    4,
    'No seu turno, com uma ação e 1 Ponto de Alma, anime uma arma equipada: ela flutua, libera a mão e, no fim de cada rodada, ataca sozinha (RA 0 no dano) por (NP) rodadas.',
    `No seu turno, você pode usar uma **ação** e gastar **1 Ponto de Alma** para **animar** uma arma equipada. A mão que a segurava fica livre.

A arma passa a flutuar, como se uma mão invisível a empunhasse. Ela **perde a propriedade multi** (se a tinha) e não pode recebê-la de nenhuma forma.

No **fim de cada rodada**, a arma faz **um único ataque**, usando o seu teste de Precisão, mas o dano é calculado com **RA igual a 0**.

A arma continua animada por **(NP) rodadas**, ou até você animar outra arma.`,
  ),

  skill(
    CLASS,
    'Coletar Almas',
    53,
    5,
    'Você pode coletar Pontos de Alma de inimigos derrotados e usá-los para fortalecer seus Poderes, com no máximo (NP + 1) Pontos de Alma.',
    `Você pode **coletar Pontos de Alma** de inimigos derrotados e gastá-los para fortalecer seus Poderes.

Seu limite é de **(NP + 1) Pontos de Alma**. Os detalhes de como obtê-los e usá-los estão na seção Pontos de Alma da classe [[forjador-de-almas]].`,
  ),

  skill(
    CLASS,
    'Forjar Característica',
    53,
    1,
    'Com a ação Inventário e 10 PM ou 1 Ponto de Alma, molde numa arma ao seu alcance uma característica de arma de custo até (500z + nível × 40z); dura até o fim da cena, uma por item.',
    `Você pode usar a ação **Inventário** e gastar **10 PM** ou **1 Ponto de Alma** para **moldar** uma característica de arma (Livro Básico, página 269) numa arma ao seu alcance.

A característica escolhida pode custar até **(500z + seu nível × 40z)**.

Ela dura **até o fim da cena**, e um mesmo item só pode ter **uma** característica moldada por vez.`,
  ),

  skill(
    CLASS,
    'Forjar Feitiço',
    53,
    5,
    'A cada nível, escolha um feitiço ofensivo de elementalista. Com a ação Inventário e 10 PM ou 1 Ponto de Alma, infunda-o numa arma ao alcance; até o fim da cena, quem a empunhar pode lançá-lo uma vez com a Precisão da arma.',
    `Sempre que adquirir este Poder, escolha um dos **feitiços ofensivos** de elementalista (Livro Básico, páginas 188 e 189).

Você pode usar a ação **Inventário** e gastar **10 PM** ou **1 Ponto de Alma** para **infundir** um desses feitiços numa arma ao seu alcance.

**Até o fim da cena**, um PJ equipado com essa arma pode fazer a ação **Feitiço** para lançar o feitiço infundido **uma única vez**. O teste de Magia usa a **fórmula do teste de Precisão da arma**.`,
  ),

  skill(
    CLASS,
    'Manifestar Arma',
    53,
    1,
    'No seu turno em conflito, com a ação Equipamento e 10 PM ou 1 Ponto de Alma, manifeste uma arma básica (destruindo a anterior); você pode trocar um Atributo do teste de Precisão por Vontade.',
    `No seu turno em um conflito, você pode usar a ação **Equipamento** e gastar **10 PM** ou **1 Ponto de Alma** para **manifestar uma arma básica**. Qualquer arma que você já tenha manifestado assim é **destruída**.

Se tiver espaços de mão livres, você pode equipar essa arma na hora.

Com ela, você pode **trocar um Atributo** do teste de Precisão por **Vontade** (por exemplo, **(VON + DES)** num arco curto).`,
  ),
];
