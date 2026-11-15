import { classEntry, skill, withTags } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Carteador';

export const carteador: SeedEntry[] = [
  withTags(
    classEntry({
      name: CLASS,
      page: 2,
      summary:
        'Usa um baralho pessoal para sentir as flutuações do rio das almas: combinando cartas na hora certa, produz efeitos sobrenaturais de cura, dano e condições. Versão do suplemento Bônus (inglês), traduzida e não oficial.',
      body: `Carteadores usam baralhos especiais para perceber as constantes flutuações do rio das almas. Cada baralho está preso ao seu dono e reflete o gosto e a personalidade dele: ao sacar certas combinações no momento certo, o carteador manipula a energia mágica e gera efeitos sobrenaturais.

Em alguns mundos, carteadores duelam entre si com seus baralhos pessoais, em busca de glória ou de artefatos preciosos.

Esta é a versão do suplemento Bônus gratuito do Carteador (em inglês), traduzida por nós e não oficial. Ela é a referência de regras da classe neste glossário; o Codex Extra imprime uma versão anterior.

## Para pensar no personagem

- Quando você manifestou seus poderes mágicos pela primeira vez?
- Você é frio e perceptivo ou impetuoso e vivaz? Como é o seu baralho?
- Qual foi o evento mais infeliz da sua vida? O que você aprendeu com ele?
- Como você combina seu baralho com as suas outras habilidades?

## Gerenciando o Baralho

Seu baralho é um baralho de verdade, que você monta como preferir, desde que os versos das cartas sejam idênticos e que você siga estas restrições:

- O baralho tem exatamente **30 cartas**: **2 curingas** e **28 cartas** divididas em quatro tipos, chamados de **naipes** (num baralho de pôquer comum, os naipes são paus, ouros, copas e espadas). Ao criar o baralho do seu personagem, associe cada naipe a um tipo de dano diferente entre **ar**, **terra**, **fogo** e **gelo**.
- Cada naipe tem **7 cartas**, com valores de **1 a 7**.

O jeito mais simples é usar um baralho de pôquer, tirando as figuras e as cartas de 8 a 10. Mas você também pode usar arcanos menores do tarô, cartas de jogos colecionáveis e o que mais quiser, desde que as combinações sejam fáceis de identificar.

- **Início do conflito:** embaralhe as 30 cartas, ponha o baralho com a face para baixo à sua frente e **compre 5 cartas** para formar a sua **mão** inicial.
- **Baralho vazio:** se precisar comprar mais cartas do que o baralho tem, compre as que houver, embaralhe a **pilha de descarte** de volta no baralho, ponha-o com a face para baixo e continue comprando.
- **Comprar:** as cartas compradas vão para a sua mão. Em geral só você vê a mão, mas pode mostrá-la a outros se quiser.
- **Descartar:** as cartas descartadas da mão vão com a face para cima para a pilha de descarte, na ordem que você preferir. Depois disso, a ordem das cartas na pilha não pode mais ser mudada.

O baralho, a mão e a pilha de descarte (e todos os Poderes e efeitos ligados a eles) só existem em **cenas de conflito**. Ao fim de cada conflito, embaralhe as 30 cartas de volta no baralho e deixe-o de lado.

### Naipes sugeridos para um baralho de pôquer

| Naipe | Tipo de dano |
| --- | --- |
| Ouros | **ar** |
| Paus | **terra** |
| Copas | **fogo** |
| Espadas | **gelo** |

## Usando um conjunto

Para produzir um efeito, o conjunto precisa cumprir **exatamente** os requisitos dele. Por exemplo, um conjunto de 5 cartas do mesmo valor não cumpre o Grande Prêmio, que pede exatamente 4 cartas.

- Ao usar um conjunto com **curingas**, você escolhe o naipe e o valor (de 1 a 7) de cada um.
- Se o conjunto cumprir os requisitos de dois ou mais efeitos, você escolhe e aplica **apenas um** deles.

## Efeitos de conjunto

Efeitos de **Encrenca em Dobro**, **Flush Mágico** e **Flush Ofuscante** causam **10 de dano adicional** se você estiver no nível 20 ou acima, ou **20 de dano adicional** se estiver no nível 40 ou acima.

| Efeito | Requisito do conjunto |
| --- | --- |
| Grande Prêmio | 4 cartas do **mesmo valor**, nenhuma delas curinga |
| Flush Mágico | 4 cartas de **valores em sequência** e do **mesmo naipe** |
| Flush Ofuscante | 4 cartas de **valores em sequência** |
| Full Status | 3 cartas do **mesmo valor** + 2 cartas do **mesmo valor** |
| Trinca de Suporte | 3 cartas do **mesmo valor** |
| Encrenca em Dobro | 2 cartas do **mesmo valor** + 2 cartas do **mesmo valor** |
| Par Mágico | 2 cartas do **mesmo valor** |

### Grande Prêmio

Você e todos os aliados presentes na cena recuperam **777 PV** e **777 PM**. PJs que tenham se rendido mas ainda estejam na cena recobram a consciência na hora (isso não encerra os efeitos da rendição deles).

### Flush Mágico

Você causa dano igual a **(25 + o valor total das cartas usadas)** a cada inimigo presente na cena. O tipo do dano é o do naipe das cartas usadas.

### Flush Ofuscante

Você causa dano igual a **(15 + o valor total das cartas usadas)** a cada inimigo presente na cena. O tipo do dano é **luz** se o maior valor entre as cartas usadas for par, ou **trevas** se for ímpar.

### Full Status

Escolha duas condições entre **atordoado**, **abalado**, **lento** e **fraco**. Se **(o maior valor entre as cartas usadas)** for par, você e todos os aliados presentes na cena se recuperam das condições escolhidas; se for ímpar, cada inimigo presente na cena sofre essas condições.

### Trinca de Suporte

Você e todos os aliados presentes na cena recuperam uma quantidade de PV e de PM igual a **(o valor total das cartas usadas × 3)**.

### Encrenca em Dobro

Você causa dano igual a **(10 + o maior valor entre as cartas usadas)** a cada um de **até dois inimigos diferentes** que você consiga ver e que estejam presentes na cena. O tipo do dano é à sua escolha entre os dos naipes das cartas usadas.

### Par Mágico

Você faz um **ataque livre** com uma arma que tenha equipada. Se o ataque causar dano, escolha um naipe entre os das cartas usadas: todo o dano do ataque passa a ser do tipo correspondente a esse naipe.`,
      otherNames: ['Baralhomante', 'Duelista do Destino', 'Apostador'],
      quote: 'Não desvie o olhar!',
      traits: ['hp', 'mp'],
      freeBenefits: [
        'Aumenta permanentemente seus PV máximos ou seus PM máximos em 5 (à sua escolha).',
      ],
    }),
    'ace of cards',
  ),

  skill(
    CLASS,
    'Altos e Baixos',
    3,
    1,
    'Ao gerar um sucesso crítico ou uma falha crítica, você pode comprar 1 carta do baralho; se fizer isso, descarte 1 carta da mão.',
    `Quando você gera um **sucesso crítico** ou uma **falha crítica**, pode **comprar 1 carta** do seu baralho. Se fizer isso, **descarte 1 carta** da sua mão.`,
  ),

  skill(
    CLASS,
    'Carta Armadilha',
    3,
    4,
    'Após a ação de um inimigo, declare um naipe e descarte a primeira carta do fundo do baralho; se for curinga ou do naipe, lance de graça um feitiço de custo total até (NP × 5) PM.',
    `Depois que um inimigo que você consiga ver realizar uma ação em um conflito (e depois que a ação for resolvida), você pode **declarar um dos naipes** do seu baralho e pôr a **primeira carta do fundo do baralho** na sua pilha de descarte, com a face para cima.

Se essa carta for um **curinga** ou for do **naipe declarado**, você pode realizar imediatamente a ação **Feitiço** sem custo de ação, lançando um feitiço cujo custo total em PM seja igual ou menor que **(NP × 5)**. Você ainda precisa pagar esse custo em PM.`,
  ),

  skill(
    CLASS,
    'Cartas Mágicas',
    3,
    3,
    'Você recebe um baralho, uma mão e uma pilha de descarte. Em conflito, com uma ação e até (10 + NP × 5) PM, use 1 carta da mão a cada 5 PM gastos (no máximo 5, formando um conjunto) e então compre outras.',
    `Você recebe um **baralho**, uma **mão** e uma **pilha de descarte** (veja "Gerenciando o Baralho" em [[carteador]]).

Durante um conflito, você pode usar uma **ação** e gastar até **(10 + (NP × 5)) PM** (mínimo de 10 PM). Se fizer isso, use **1 carta da sua mão para cada 5 PM** gastos dessa forma, até o máximo de **5 cartas**: essas cartas formam um **conjunto**. Depois de resolver o efeito do conjunto (se houver), descarte essas cartas e compre a mesma quantidade de cartas do baralho.`,
  ),

  skill(
    CLASS,
    'Dobro ou Nada',
    3,
    1,
    'Antes de um teste de Precisão, de um teste de Magia de feitiço ofensivo ou de um teste para avançar ou recuar um relógio, declare dobro ou nada: um sucesso crítico dobra o resultado, qualquer outro sucesso vira falha.',
    `Antes de fazer um **teste de Precisão**, um **teste de Magia** para um feitiço **ofensivo** ou um **teste para avançar ou recuar um relógio**, você pode declarar **dobro ou nada**.

Se fizer isso e o teste for um **sucesso crítico**, **dobre** o dano causado pelo ataque ou pelo feitiço, ou o número de seções preenchidas ou apagadas do relógio, conforme o caso. No entanto, **qualquer outro tipo de sucesso** passa a contar como uma **falha**.`,
  ),

  skill(
    CLASS,
    'Mulligan',
    3,
    5,
    'No fim do seu turno em um conflito, descarte até (NP) cartas da mão e compre a mesma quantidade do baralho.',
    `No **fim do seu turno** em um conflito, você pode descartar até **(NP)** cartas da sua mão. Se fizer isso, compre a mesma quantidade de cartas do seu baralho.`,
  ),
];
