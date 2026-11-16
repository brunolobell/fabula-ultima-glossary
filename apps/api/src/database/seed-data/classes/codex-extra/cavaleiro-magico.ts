import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Cavaleiro Mágico';

export const cavaleiroMagico: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 48,
    summary:
      'Herói raro escolhido por uma relíquia mágica pelo coração bondoso e senso de justiça; invoca formas mágicas que lhe dão armas, armaduras e poderes movidos por seus Laços.',
    body: `Poucos nascem para ser cavaleiros mágicos. A relíquia, um artefato enigmático de eras esquecidas, é quem escolhe o portador, atraída por um coração generoso e um forte senso de justiça. Pode ser um objeto místico ou uma peça de tecnologia, mas cada relíquia é única e deixa o portador invocar trajes que trazem armas e poderes extraordinários. Versáteis e raros como são, esses cavaleiros costumam assumir lugares de liderança, como chefes justos e espertos, ou se erguer contra impérios tirânicos.

## Para pensar no personagem

- Que aspecto tem a sua relíquia mágica, e como ela veio parar nas suas mãos?
- De que jeito você se transforma, e o que acontece com o seu equipamento nesse momento?
- Como a sua forma mágica se parece?
- Que princípios você precisa respeitar para manter o direito de usar a relíquia?

## Forma Mágica

Toda relíquia concede transformações com efeitos especiais, e cada transformação é uma **forma mágica**. A maneira como ela acontece e a aparência da forma ficam à sua escolha (as sugestões de aparência estão na tabela de focos). Para criar uma forma mágica, combine **uma motivação, uma aura e dois focos**. Depois da escolha, ela só pode ser mudada por Poderes específicos.

- A **motivação** é o sentimento que move a transformação e define os alvos da aura.
- A **aura** causa um efeito diferente nos alvos da motivação. Efeitos de Afeto duram até o fim da cena ou enquanto os efeitos do foco durarem.
- Cada **foco** causa um efeito diferente em você. Entre as opções descritas nos seus focos, você pode escolher **no máximo uma arma e uma armadura**.
- Se algum item escolhido for pior do que o item equipado no espaço correspondente, você não precisa trocá-lo ao usar [[magitransformacao]]; nesse caso, se necessário, mude apenas o tipo de dano causado pela arma.
- Os efeitos do foco duram até o fim da cena, mas também terminam se você morrer, ficar inconsciente ou sair da forma mágica.
- Você pode encerrar uma forma mágica quando quiser, mas, em um conflito, só pode fazê-lo no seu turno, antes ou depois de uma ação.
- Você pode combinar aspectos de focos diferentes: por exemplo, os focos Ardente e Congelante permitem usar um arco curto que causa dano de gelo.

### Motivação e aura

A motivação decide quem é afetado: com **Afeto**, cada aliado presente na cena com quem você tem um Laço; com **Raiva**, cada inimigo presente na cena com quem você tem um Laço. A aura decide o efeito:

| Aura | Afeto (aliados com Laço) | Raiva (inimigos com Laço) |
| --- | --- | --- |
| Fraqueza | Fica imune à condição **fraco**. | Fica **fraco**. |
| Coragem | Fica imune à condição **abalado**. | Fica **abalado**. |
| Tolice | Fica imune à condição **atordoado**. | Fica **atordoado**. |
| Zelo | Fica imune à condição **lento**. | Fica **lento**. |

### Focos

Ao usar Magitransformação, os itens escolhidos substituem qualquer arma e armadura equipadas, e todo dano causado por seus ataques passa a ser do tipo do foco. Todas as armas e armaduras escolhidas são **básicas**.

| Foco | Escolha | Dano | Aparência sugerida |
| --- | --- | --- | --- |
| Foco Ardente | Uma arma de fogo ou arco e uma armadura | **fogo** | Armadura completa, vestido curto; tons de vermelho. |
| Foco Brilhante | Uma espada e uma armadura marcial | **luz** | Peitoral, terno, vestido longo; tons de amarelo. |
| Foco Celeste | Uma arma arcana e uma armadura | **ar** | Armadura leve, toga e auréola, asas; tons de verde. |
| Foco Congelante | Uma arma de luta ou de arremesso e uma armadura | **gelo** | Gibão de peles, casaco, cachecol; tons de azul. |
| Foco Eletrizante | Uma lança e uma armadura marcial | **raio** | Armadura de couro, óculos, gravata; tons de laranja. |
| Foco Rochoso | Uma arma pesada ou um malho e uma armadura marcial | **terra** | Loriga, turbante, pés descalços; tons de marrom. |
| Foco Sombrio | Uma adaga e uma armadura marcial | **trevas** | Armadura leve, máscara, capuz; tons de roxo. |

Se você não substituir os itens equipados, eles ainda podem ser afetados visualmente pela transformação.`,
    otherNames: ['Garota Mágica', 'Guerreiro Estelar', 'Herói Henshin'],
    quote: 'Minha alma inflama e meu poder desperta!',
    traits: ['mp', 'armor', 'shield'],
    freeBenefits: [
      'Aumenta permanentemente seus PM máximos em 5.',
      'Pode equipar armaduras e escudos marciais.',
    ],
  }),

  skill(
    CLASS,
    'Alma Ferida',
    49,
    5,
    'Uma vez por cena, ao entrar em crise, crie um Laço de desconfiança com até (NP) inimigos que você veja, sem apagar Laços existentes; duram até o fim da cena.',
    `**Uma vez por cena**, quando você **entra em crise**, pode criar um **Laço de desconfiança** com um número de inimigos igual a **(NP)** que você consiga ver.

Esses Laços duram **até o fim da cena** e **não precisam apagar** Laços já existentes para serem criados. Se você precisasse apagar algum para criar um ou mais Laços deste Poder, escolha, em vez disso, uma quantidade dos seus Laços atuais igual ao número de Laços excedentes: os escolhidos **deixam de existir até o fim da cena**.`,
  ),

  skill(
    CLASS,
    'Coração Ardente',
    49,
    3,
    'Sob efeito de uma forma mágica, ao evocar um Laço de desconfiança, inferioridade e/ou ódio em um teste de Precisão ou Magia para causar dano, causa (NP × 2) de dano adicional do mesmo tipo.',
    `Enquanto estiver sob o efeito de uma **forma mágica**, quando você **evocar** um Laço de **desconfiança**, **inferioridade** e/ou **ódio** em um teste de Precisão ou Magia para causar dano, você causa **(NP × 2)** de dano adicional, do mesmo tipo.`,
  ),

  skill(
    CLASS,
    'Impulso do Coração',
    49,
    1,
    'O custo de Magitransformação cai em 1 PM por Laço seu com emoção de admiração, lealdade e/ou afeto (mínimo de 20 PM).',
    `O custo para usar [[magitransformacao]] é reduzido em um número de PM igual à quantidade de **Laços** seus com emoções de **admiração**, **lealdade** e/ou **afeto**, até o **mínimo de 20 PM**.`,
  ),

  skill(
    CLASS,
    'Magitransformação',
    49,
    3,
    'Cada vez que adquire este Poder, crie uma nova forma mágica. Com uma ação e 25 PM, assuma uma forma mágica que você possua.',
    `Sempre que adquirir este Poder, você deve criar uma nova **forma mágica** (veja [[cavaleiro-magico]]).

Você pode usar uma **ação** e gastar **25 PM** para assumir uma forma mágica que possua.`,
  ),

  skill(
    CLASS,
    'Transformação Aprimorada',
    49,
    3,
    'Cada vez que adquire este Poder, escolha a arma ou a armadura de uma forma mágica. Ao fim de cada descanso, troque ou aplique uma característica de item raro (valor máximo 40 × seu nível em zênites).',
    `Sempre que adquirir este Poder, escolha a **arma** ou a **armadura** de uma das suas formas mágicas.

No fim de cada **descanso** (veja [[descanso]]), para cada item escolhido, você pode **substituir** a característica dele ou **aplicar uma nova** (se o item não tiver características) como se fosse um **item raro** (Livro Básico, a partir da página 266). A característica escolhida deve ser aprovada pelo mestre e ter valor em zênites **igual ou menor que (40 × seu nível)**.`,
  ),
];
