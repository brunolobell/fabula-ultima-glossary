import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Esper';

export const esper: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 150,
    summary:
      'Conecta-se à rede de almas para turbinar corpo e mente: escolhe um foco, ganha bônus contra ele e usa dons psíquicos em reação, regidos por um Relógio Mental.',
    body: `Desejos, emoções e pensamentos são forças poderosas que influenciam o rio das almas que flui pelo mundo. Espers cultivaram a habilidade de se conectar a essa rede espiritual de sensações, que os cientistas chamam de **rede de almas**, e a usam para transmitir informações e aumentar suas habilidades físicas e mentais. Por isso, cada esper usa seus poderes de um jeito nitidamente diferente.

## Para pensar no personagem

- Como você desenvolveu suas habilidades psíquicas? Alguém o treinou?
- Suas habilidades são comuns ou você é uma exceção?
- Quais atributos ou poderes você pode fortalecer com suas artes psíquicas?
- Que qualidade incomum ou preocupante seus poderes têm?

## Usando um dom

Dons só podem ser usados **em reação a eventos específicos**. Quando o evento acontece, você pode gastar **5 × (seções preenchidas no Relógio Mental)** PM (mínimo 5 PM) para aplicar os efeitos do dom ao evento.

- Você só pode usar **um dom por evento**.
- Se um dom recupera PV ou PM, ou causa perda de PM, a quantidade aumenta em 10 a partir do 20º nível e em 20 a partir do 40º.

## Relógio Mental

Ao adquirir [[dons-psiquicos]], você recebe um **Relógio Mental**.

- Tem **4 seções** e começa vazio em cada cena.
- Depois de usar um dom, preencha **1 seção** (após resolver os efeitos do dom).
- Ele define o **custo em PM** do dom e a **efetividade** dele. Ainda é possível usar dons com o relógio cheio.
- Só pode ser preenchido como descrito acima, e só pode ser apagado pelo poder heroico Descarga de Ondas Mentais (página 172 do Atlas) ou por efeitos que citem o Relógio Mental.

## Os Dons

Nas fórmulas, **S** é o número de seções preenchidas no seu Relógio Mental. Os dons de dano mudam o tipo de dano de uma fonte e somam dano adicional **2 + S** (mesmo valor). O dado de Vontade é o atual.

| Dom | Evento | Efeito |
| --- | --- | --- |
| Atmocinese | Quando você causa dano | O dano vira de **ar ou raio** e a fonte causa 2 + S de dano adicional. |
| Fotocinese | Quando você causa dano | O dano vira de **trevas ou luz** e a fonte causa 2 + S de dano adicional. |
| Gravitocinese | Quando você causa dano | O dano vira de **terra ou físico**, a fonte causa 2 + S de dano adicional, e criaturas voadoras atingidas são forçadas a aterrissar na hora. |
| Termocinese | Quando você causa dano | O dano vira de **fogo ou gelo** e a fonte causa 2 + S de dano adicional. |
| Clarividência | Quando um NPC vira seu foco, ou você cria um Laço com um NPC | Faça uma pergunta ao Mestre sobre esse NPC; a resposta deve ser verdadeira. Descreva a sensação que revelou a informação. Uma vez por NPC. |
| Escudo Psíquico | Depois que um inimigo que você veja faz teste de Precisão ou de Magia | Para esse teste, sua Def. e Def.M valem seu dado atual de Vontade + 2 × S (se seus valores atuais forem melhores, use-os). |
| Presença Reconfortante | Depois de dar cobertura a um aliado com a ação Guarda | O aliado recupera 10 + 5 × S PM. Se for seu foco, também se recupera de uma condição à sua escolha entre abalado, atordoado e enfurecido. |
| Retaliação Psíquica | Depois que um inimigo vence um teste oposto contra você ou faz você perder PV | O inimigo perde 5 + 5 × S PM e depois fica abalado ou atordoado (à sua escolha). |
| Transferência de Vida | Quando você faz inimigos perderem PV | Escolha você ou um aliado que seja seu foco: se estiver em crise, a criatura recupera 5 + 5 × S PV. |`,
    otherNames: ['Empata', 'Psiônico', 'Hacker de Almas'],
    quote:
      'Paz ditada por uma vontade única não é paz; é apenas uma forma diferente de submissão.',
    freeBenefits: ['Aumenta permanentemente seus PM máximos em 5.'],
  }),

  skill(
    CLASS,
    'Dons Psíquicos',
    151,
    5,
    'Cada nível dá um dom psíquico; também dá o Relógio Mental, que regula custo e força dos dons.',
    `Sempre que adquirir este poder, você recebe um **dom**. As regras de dons e do Relógio Mental estão no corpo da classe [[esper]].`,
  ),

  skill(
    CLASS,
    'Foco Cognitivo',
    151,
    5,
    'No início do turno em conflito, escolhe um foco (aliado que o ouça ou inimigo abalado/atordoado/enfurecido que veja): bônus de NP para examinar e atacar o foco, e NP × 2 de cura extra nele.',
    `No início do seu turno durante um conflito, você pode escolher um **aliado que possa ouvi-lo** ou um **inimigo que veja** e que esteja abalado, atordoado e/ou enfurecido. Até o início do próximo turno, essa criatura é seu **foco**.

- Você recebe bônus de **(NP)** em testes para examinar seu foco e em testes de Precisão e de Magia de ataques e feitiços ofensivos que o tenham entre os alvos.
- Quando você faz seu foco recuperar PV e/ou PM, ele recupera **(NP × 2)** PV e/ou PM adicionais.`,
  ),

  skill(
    CLASS,
    'Hipercognição',
    151,
    5,
    'Feitiços e versos que têm seu foco entre os alvos custam NP a menos em PM (NP × 2 se o foco for o único alvo; mínimo 0).',
    `O custo total em PM dos seus feitiços e versos (Atlas High Fantasy, página 150) que têm seu foco entre os alvos é reduzido em **(NP)**; ou em **(NP × 2)** se o foco for o **único** alvo (mínimo de 0 PM).`,
  ),

  skill(
    CLASS,
    'Navegador',
    151,
    1,
    'Telepatia com qualquer aliado consciente a 1 dia de viagem; rituais de ritualismo e uso de ritualismo para transportar criaturas para dentro e fora da rede de almas, reunir informações e rastrear entidades nela.',
    `Você se comunica **telepaticamente** com qualquer aliado consciente a até **1 dia de viagem**; para poderes e condições, vocês podem ouvir um ao outro.

Você pode fazer rituais da disciplina **ritualismo**. Além disso, pode usar ritualismo para **transportar criaturas para dentro e fora da rede de almas**, reunir informações e rastrear entidades enquanto estiverem na rede.`,
  ),

  skill(
    CLASS,
    'Psicocinese',
    151,
    1,
    'Nos testes de Precisão, pode trocar um dado de atributo por Vontade; ataques corpo a corpo com espadas ou armas arcanas podem atingir criaturas voadoras.',
    `Ao fazer um teste de Precisão, você pode substituir um dos dados de atributo por **Vontade** (por exemplo, (DES + VON) para um arco curto).

Além disso, seus ataques corpo a corpo com **espadas** ou **armas arcanas** podem atingir criaturas voadoras.`,
  ),
];
