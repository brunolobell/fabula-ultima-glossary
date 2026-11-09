import { classEntry, skill, spell } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Entropista';

export const entropista: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 190,
    summary:
      'Conjurador que canaliza o Cosmos, um caos infinito além das estrelas, para distorcer a realidade, a sorte e o tempo.',
    body: `Muito acima das estrelas, onde a luz não chega, existe um vazio sem fundo em que a vida e as almas murcham e se transformam em algo irreconhecível. Esse reino é uma não realidade: um caos vasto e infinito, imune às leis do tempo, do espaço e da probabilidade.

Entropistas o chamam de **Cosmos**, Céu ou apenas Sorte, e estão entre os poucos com a dádiva de canalizar suas energias, que distorcem a realidade.

Quem lança feitiços segue as regras de [[como-lancar-um-feitico]].

## Para pensar no personagem

- Quem ensinou você a canalizar os poderes do Cosmos e distorcer a realidade?
- O que você sabe sobre o Cosmos? É o fim de uma realidade ou o começo de uma nova?
- Qual a aparência da sua magia?
- Há muitos praticando a sua magia, ou você é uma exceção?`,
    otherNames: ['Apostador', 'Astromante', 'Mago do Caos'],
    quote: 'O frio entre as estrelas... não me assusta.',
    freeBenefits: [
      'Aumenta permanentemente seus PM máximos em 5.',
      'Pode fazer rituais da disciplina ritualismo.',
    ],
  }),

  skill(
    CLASS,
    'Absorver PM',
    191,
    5,
    'Depois de sofrer dano, você recupera (NP × 2) PM.',
  ),

  skill(
    CLASS,
    'Entropismo Ritualista',
    191,
    1,
    'Você pode fazer rituais da disciplina entropismo, que usam (AST + VON) no teste de Magia.',
  ),

  skill(
    CLASS,
    'Magia Entrópica',
    191,
    10,
    'A cada vez que adquire este Poder, você aprende um feitiço de Entropista; os feitiços ofensivos da classe usam (AST + VON) no teste de Magia.',
    `Sempre que adquirir este Poder, você **aprende um feitiço de Entropista** (veja as páginas 192 e 193).

Os feitiços ofensivos de Entropista usam **(AST + VON)** no teste de Magia.`,
  ),

  skill(
    CLASS,
    'Sete da Sorte',
    191,
    1,
    'Você tem um número da sorte (7 no início de cada sessão) e, uma vez por cena, pode trocar o valor de um dado de um teste por ele; o valor substituído vira seu novo número da sorte.',
    `Você tem um **número da sorte**. No início de cada sessão, esse número é **7**.

Uma vez por cena, depois de fazer um teste, você pode **substituir o valor de um dado** que rolou pelo seu número da sorte, mesmo que isso dê um resultado impossível (como um 7 em um d6).

Se fizer isso, o valor que foi substituído se torna o seu **novo número da sorte**.`,
  ),

  skill(
    CLASS,
    'Tempo Roubado',
    191,
    4,
    'Em um conflito, você usa uma ação e até (NP × 5) PM para interferir no tempo: a cada 5 PM, escolhe um efeito (lentidão, fim da lentidão, ação Equipamento grátis, dano a inimigo lento ou turno antecipado de um aliado).',
    `Durante um conflito, você pode usar uma **ação** e até **(NP × 5) PM** para interferir no fluxo temporal. Para cada **5 PM** gastos, escolha uma opção:

- uma criatura fica **lenta**;
- uma criatura **deixa de ficar lenta**;
- uma criatura faz a ação **Equipamento** sem custo;
- um inimigo que esteja lento perde **(10 + (NP × 5))** Pontos de Vida; ou
- um aliado que ainda não agiu nesta rodada faz o turno dele **imediatamente depois do seu** durante essa rodada.

Cada opção só pode ser escolhida **uma vez por uso** deste Poder, e você precisa **ver** as criaturas para afetá-las.`,
  ),

  spell(CLASS, {
    name: 'Aceleração',
    page: 192,
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Cena',
    summary:
      'No fim de cada turno do alvo, ele pode fazer um ataque livre ou lançar de graça um feitiço de até 10 PM; o feitiço termina na segunda vez que ele usa o efeito.',
    body: `No final de cada um dos turnos do alvo, ele pode escolher **uma** opção:

- fazer um **ataque livre** com a arma equipada; ou
- fazer a ação **Feitiço** sem gastar uma ação, lançando um feitiço com custo total de PM igual ou menor que **10** (pagando esse custo).

O feitiço termina quando o mesmo alvo usa o efeito pela segunda vez.`,
  }),

  spell(CLASS, {
    name: 'Anomalia',
    page: 192,
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Cena',
    offensive: true,
    summary:
      'Altera a essência do alvo: contra um tipo de dano a que seria Absorvedor ou Imune, ele passa a ser Vulnerável; o feitiço termina quando isso acontece.',
    body: 'Você altera a essência natural do alvo. Enquanto o feitiço durar, se o alvo fosse sofrer dano de um tipo contra o qual é **Absorvedor** ou **Imune**, ele é considerado **Vulnerável** àquele dano. Quando isso acontece, o feitiço termina.',
  }),

  spell(CLASS, {
    name: 'Apostar',
    page: 192,
    mpCost: 'até 20',
    target: 'Especial',
    duration: 'Instantânea',
    summary:
      'Um vórtice de caos: você rola seu dado de Vontade a cada 10 PM gastos e escolhe um resultado, que vai de perder metade dos PV e PM a causar 30 de dano em quantas criaturas quiser.',
    body: `Você invoca um vórtice de energia caótica. **Role seu dado atual de Vontade** uma vez para cada 10 PM gastos ao lançar o feitiço e escolha **um** dos resultados: ele define os efeitos.

| Resultado | Efeito |
| --- | --- |
| 1 | Você perde metade dos PV atuais e metade dos PM atuais. |
| 2-3 | Cada criatura presente na cena, incluindo você, fica **envenenada**. |
| 4-6 | Cada criatura presente na cena, incluindo você, fica **lenta**. |
| 7-8 | Escolha até três criaturas que você veja; cada uma recupera 50 PV e todas as condições. |
| 9+ | Escolha qualquer número de criaturas que você veja e cause 30 pontos de dano a cada uma. O tipo é definido rolando um d6 (veja abaixo). |

**Tipo de dano (d6):** 1 ar, 2 raio, 3 trevas, 4 terra, 5 fogo, 6 veneno.`,
  }),

  spell(CLASS, {
    name: 'Arma das Trevas',
    page: 192,
    mpCost: '5',
    target: 'Uma arma equipada',
    duration: 'Cena',
    summary:
      'Imbui a arma com energia das trevas: enquanto durar, o dano dela vira dano de trevas.',
    body: `Você imbui a arma com energia das trevas. Enquanto o feitiço durar, o dano causado pela arma passa a ser de **trevas**. Se você tiver essa arma equipada ao lançar o feitiço, pode fazer um **ataque livre** com ela como parte da mesma ação.

O feitiço só pode ser lançado em armas equipadas de criaturas voluntárias.`,
  }),

  spell(CLASS, {
    name: 'Dissipar',
    page: 192,
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Instantânea',
    summary:
      'Remove toda a magia de uma criatura: os feitiços de duração Cena que a afetam terminam.',
    body: 'Você remove toda a magia de uma criatura. Se o alvo estiver sob o efeito de um ou mais feitiços com duração **Cena**, os efeitos desses feitiços terminam.',
  }),

  spell(CLASS, {
    name: 'Drenar Espírito',
    page: 193,
    mpCost: '5',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Consome a psique do alvo: ele perde (RA + 20) PM e você recupera metade dos PM que ele de fato perdeu.',
    body: 'Você consome a psique de uma criatura. O alvo perde **(RA + 20)** PM. Você recupera PM igual à **metade** dos PM totais que o alvo perdeu (se o alvo não tem mais Pontos de Mana, você não recupera PM).',
  }),

  spell(CLASS, {
    name: 'Drenar Vigor',
    page: 193,
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Rouba a força vital do alvo: causa (RA + 15) pontos de dano de trevas e você recupera metade dos PV que ele perdeu.',
    body: 'Você rouba a força vital de outra criatura, causando **(RA + 15)** pontos de dano de **trevas** ao alvo. Você recupera PV igual à **metade** da perda de PV causada pelo feitiço (se o alvo não tem mais Pontos de Vida, você não recupera PV).',
  }),

  spell(CLASS, {
    name: 'Divinação',
    page: 193,
    mpCost: '10',
    target: 'Pessoal',
    duration: 'Cena',
    summary:
      'Um vislumbre do futuro: quando uma criatura que você vê faz um teste sem falha ou sucesso crítico, você pode forçá-la a rolar os dois dados de novo, até duas vezes.',
    body: 'Você tem um breve vislumbre do futuro. Enquanto o feitiço durar, quando uma criatura que você possa ver faz um teste cujo resultado **não** seja uma falha crítica nem um sucesso crítico, você pode forçá-la a **rolar ambos os dados novamente**. O feitiço termina depois que você força **duas** novas rolagens.',
  }),

  spell(CLASS, {
    name: 'Espelhar',
    page: 193,
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Cena',
    summary:
      'Distorce a magia: se um feitiço ofensivo for lançado contra o alvo, quem o lançou vira o alvo no lugar; então o feitiço termina.',
    body: 'Você distorce as leis mágicas. Enquanto o feitiço durar, se um feitiço **ofensivo** for lançado contra o alvo, a criatura que o lançou se torna o alvo em seu lugar (os outros alvos são escolhidos normalmente). Quando isso acontece, o feitiço termina.',
  }),

  spell(CLASS, {
    name: 'Parar',
    page: 193,
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Prende o adversário em um círculo de tempo e espaço alterados: no próximo turno, o alvo faz uma ação a menos (mínimo de zero).',
    body: 'Você aprisiona o adversário em um círculo de tempo e espaço alterados. O alvo faz **uma ação a menos** no próximo turno dele (até o mínimo de 0 ação).',
  }),

  spell(CLASS, {
    name: 'Umbra',
    page: 193,
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Uma tempestade de trevas reduz a matéria a cinzas: causa (RA + 15) pontos de dano de trevas a cada alvo; na oportunidade, os alvos ficam fracos.',
    body: `Uma tempestade de energia das trevas transforma matéria em cinzas. Você causa **(RA + 15)** pontos de dano de **trevas** a cada alvo.

**Oportunidade:** os alvos atingidos também ficam **fracos**.`,
  }),

  spell(CLASS, {
    name: 'Ômega',
    page: 193,
    mpCost: '15',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Invoca a ruína contra o adversário: o alvo perde PV igual a (20 + metade do nível dele).',
    body: 'Você invoca a ruína contra o adversário, transformando força em fraqueza. O alvo perde uma quantidade de PV igual a **(20 + metade do nível do alvo)**.',
  }),
];
