import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Astrólogo';

export const astrologo: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 40,
    summary:
      'Vidente que carrega constelações tatuadas na pele e as invoca para queimar o cosmos: cada constelação é um efeito poderoso que também gera cargas de outros tipos, usadas para reforçar as demais.',
    body: `Astrólogos não buscam nas estrelas a beleza do céu, mas um amanhã iridescente. As constelações estão tatuadas em sua pele e funcionam como um vínculo que eles queimam, consumindo o cosmos, sempre que as invocam. Em meio às matas, à beira de um rio ou no canto sombrio do pássaro da morte, observam padrões escondidos e ligam os sinais do destino ao poder de cada constelação.

## Para pensar no personagem

- Qual constelação guia o seu destino? Dito de outro modo, qual é o seu signo?
- Quem lhe ensinou a ler e a dominar as constelações do firmamento?
- Que profecia lida nos astros virou a vida de alguém de cabeça para baixo?
- Como você explica as tatuagens que carrega, quando alguém pergunta?

## Cargas

Todas as Constelações, menos a da Rasga-mortalha, têm um efeito principal e **geram cargas**. As cargas duram **até o fim da cena** e são de quatro tipos:

| Carga | Gerada por | Consumida em |
| --- | --- | --- |
| Solar | Constelação do Boitatá | Constelação do Boto |
| Estelar | Constelação do Boto | Constelação do Cão Dourado |
| Meteórica | Constelação do Cão Dourado | Constelação do Saci |
| Celeste | Constelação do Saci | Constelação do Boitatá |

Cada constelação traz um bônus extra se você **consumir** uma carga do tipo indicado ao usá-la, e ao mesmo tempo gera **(NP)** cargas do seu próprio tipo. Assim, as constelações formam um ciclo: usar uma alimenta a próxima.`,
    otherNames: ['Astrologista', 'Mitomante', 'Zodíaco'],
    quote: 'Seremos protegidos pelo fogo do guardião das matas e florestas!',
    traits: ['mp'],
    freeBenefits: ['Aumenta permanentemente seus PM máximos em 5.'],
  }),

  skill(
    CLASS,
    'Constelação do Boitatá',
    41,
    3,
    'Ação, 5 PM: teste de (AST + VON) contra a Def.M de um inimigo visível, causando (NP × 10) de dano de fogo; consumir uma carga celeste deixa uma criatura Resistente a fogo até o fim da cena. Gera (NP) cargas solares.',
    `Você pode usar uma ação e gastar **5 PM** para fazer um teste de **(AST + VON)** contra a Defesa Mágica de um inimigo que você possa ver. Se atingir, ele sofre **(NP × 10)** pontos de dano de **fogo**.

Se você **consumir uma carga celeste**, uma criatura que você possa ver fica **Resistente a fogo** até o fim da cena.

Você também gera **(NP) cargas solares**, que duram até o fim da cena.`,
  ),

  skill(
    CLASS,
    'Constelação do Boto',
    41,
    3,
    'Ação, 5 PM: um aliado visível pode, até o fim da cena, trocar um atributo de um teste por AST ou VON; consumir uma carga solar dá +1 no teste. Gera (NP) cargas estelares.',
    `Como uma ação, e pagando **5 PM**, você posiciona os astros a favor de um aliado que esteja à vista. Até o fim da cena, o alvo pode **substituir um atributo** de um teste por **AST** ou **VON**.

Se, ao usar o poder, você **consumir uma carga solar**, o alvo ainda ganha **+1** nesse teste.

O poder também lhe dá **(NP) cargas estelares**, que duram até o fim da cena.`,
  ),

  skill(
    CLASS,
    'Constelação do Cão Dourado',
    41,
    3,
    'Ação, 10 PM: amaldiçoa um inimigo visível; até o início do seu próximo turno, toda fonte de dano de luz contra ele causa (NP) de dano adicional, e consumir uma carga estelar faz esse dano ignorar Imunidades e Resistências. Gera (NP) cargas meteóricas.',
    `Como uma ação, e pagando **10 PM**, você lança uma maldição sobre um inimigo que esteja à vista. Até o início do seu próximo turno, **qualquer fonte** de dano de **luz** contra ele causa **(NP)** pontos de dano a mais.

Se, ao usar o poder, você **consumir uma carga estelar**, todo dano de luz que o alvo sofrer **ignora Imunidades e Resistências**.

O poder também lhe dá **(NP) cargas meteóricas**, que duram até o fim da cena.`,
  ),

  skill(
    CLASS,
    'Constelação da Rasga-mortalha',
    41,
    1,
    'Você pode fazer rituais da disciplina ritualismo e também usá-lo para consultar as estrelas sobre eventos futuros, obter conhecimento de lendas e realizar pequenos desejos.',
    `Você pode fazer **rituais** da disciplina **ritualismo**.

Além disso, pode usar o ritualismo para **consultar as estrelas** sobre possíveis eventos futuros, para **obter conhecimento** de lendas e até para **realizar pequenos desejos**.

Veja [[rituais]].`,
  ),

  skill(
    CLASS,
    'Constelação do Saci',
    41,
    3,
    'Ação, 10 PM: um aliado visível pode, no próximo turno dele, fazer uma ação Equipamento, Guarda, Estudo ou Objetivo sem gastar ação; consumir uma carga meteórica permite também um ataque livre (RA do teste de Precisão tratada como 0 no dano). Gera (NP) cargas celestes.',
    `Você pode usar uma ação e gastar **10 PM** para acelerar um aliado que você possa ver. No **próximo turno do alvo**, ele pode fazer uma ação [[equipamento-acao]], [[guarda-acao]], [[estudo]] ou [[objetivo]] sem usar uma ação.

Se você **consumir uma carga meteórica**, ele também pode fazer um **ataque livre**, mas a RA do teste de Precisão desse ataque é considerada **0** para calcular o dano causado.

Você também gera **(NP) cargas celestes**, que duram até o fim da cena.`,
  ),
];
