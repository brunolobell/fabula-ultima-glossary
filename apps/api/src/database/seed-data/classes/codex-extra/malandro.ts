import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Malandro';

export const malandro: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 58,
    summary:
      'Trapaceiro das vielas e becos onde a lei não chega; vive de lábia, artimanha e gambiarra, confia na sorte e sempre arranja um jeito de escapar do aperto.',
    body: `Nas vielas, nos becos e nas biroscas onde a lei não chega, quem manda é o malandro. De chapéu de lado e sorriso pronto, ele faz da lábia, da artimanha e da gambiarra o seu ganha-pão, e engana o próprio destino como se este fosse só mais uma vítima.

Outros acreditam na força, na justiça, no trabalho sem fim ou em feitiços e firulas. O malandro prefere confiar que a sorte é sua amiga e deixar a vida levá-lo. Com jogo de cintura, ninguém fica encurralado.

## Para pensar no personagem

- Qual é a maior mentira que você já contou e que todo mundo acredita?
- Existe alguém que sempre cai nas suas lorotas. Quem é, e por quê?
- O que você responde quando perguntam em que você trabalha?
- A quantas pessoas você deve algo?`,
    otherNames: ['Pícaro', 'Espertalhão', 'Raposa'],
    quote: 'Quem tem jogo de cintura nunca fica encurralado.',
    traits: ['ip', 'ranged-weapon'],
    freeBenefits: [
      'Aumenta permanentemente seus PI máximos em 2.',
      'Pode equipar armas à distância marciais.',
    ],
  }),

  skill(
    CLASS,
    'Engabelar',
    59,
    3,
    'Uma vez por cena, quando alguém visível faz um teste, gaste 10 PM para fazer o mesmo teste com bônus ou penalidade de (NP) e, se quiser, trocar seu resultado pelo do alvo; até o fim da cena, o resultado trocado pode valer em um teste seu.',
    `**Uma vez por cena**, quando um aliado ou inimigo que você consiga ver fizer um teste, você pode gastar **10 PM** para "convencer" o destino a brincar com a sorte e o azar dele.

Se fizer isso, você faz o **mesmo teste**, mas com um **bônus** ou uma **penalidade** (a escolha é sua) igual a **(NP)**. Depois, você pode **trocar** o seu resultado pelo do alvo.

Até o fim da cena, você pode usar o resultado trocado como a rolagem de um dos seus testes.`,
  ),

  skill(
    CLASS,
    'Explorar Fraqueza',
    59,
    1,
    'No começo do seu turno, gaste 10 PM para usar a ação Estudo sem custo de ação, antes ou depois da sua ação, com (AST + DES) como fórmula do teste aberto.',
    `No começo do seu turno, você pode gastar **10 PM** para usar a ação **Estudo** sem gastar uma ação. Você escolhe se a usa antes ou depois da sua ação do turno.

O teste aberto dessa ação usa **(AST + DES)** como fórmula.`,
  ),

  skill(
    CLASS,
    'Gambiarra',
    59,
    4,
    'Uma vez por cena, com a ação Inventário, gaste até (NP × 2) PI para improvisar modificações em uma arma equipada, uma a cada 2 PI: +1 em Precisão, +2 de dano, +1 em testes da ação Objetivo ou dano de veneno. Duram até o fim da cena.',
    `**Uma vez por cena**, você pode usar a ação **Inventário** e gastar até **(NP × 2) PI** para fazer uma **modificação improvisada** em uma arma equipada, usando os materiais que houver à mão na cena.

A cada **2 PI** gastos, escolha uma modificação:

- a arma fornece **+1** em testes de Precisão;
- a arma causa **2 pontos de dano adicional**;
- a arma fornece **+1** em testes da ação **Objetivo**;
- ataques com a arma causam dano de **veneno**.

Todas as modificações improvisadas duram **até o fim da cena**, quando a arma se desfaz em vários pedacinhos de material inútil.`,
  ),

  skill(
    CLASS,
    'Golpe Aproveitador',
    59,
    3,
    'Ao atacar uma única criatura que esteja sofrendo uma ou mais condições, você pode trocar um dos atributos do teste de Precisão da arma por DES e recebe bônus de (NP) nesse teste.',
    `Quando fizer um ataque contra **uma única criatura** que esteja sofrendo **uma ou mais condições**, você pode trocar um dos atributos do teste de Precisão da arma usada por **DES**. Além disso, você recebe um **bônus de (NP)** nesse teste.`,
  ),

  skill(
    CLASS,
    'Jeitinho',
    59,
    2,
    'Quando um aliado passa em um teste para preencher ou apagar seções de um relógio, gaste até (NP × 20) PM: você não pode fazer testes para influenciar o relógio até o fim do seu próximo turno, mas preenche ou apaga 1 seção a cada 20 PM gastos.',
    `Quando um aliado passar em um teste para **preencher** ou **apagar** seções de um relógio, você pode gastar até **(NP × 20) PM**.

Se fizer isso, você **não pode** fazer testes para influenciar esse relógio até o fim do seu próximo turno. Em troca, você preenche ou apaga **1 seção** do relógio a cada **20 PM** gastos dessa forma.`,
  ),
];
