import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Simbolista';

export const simbolista: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 142,
    summary:
      'Tece energia sobrenatural em runas, pinturas e talismãs: marca criaturas com símbolos de efeito contínuo, que reforçam aliados ou enfraquecem inimigos.',
    body: `Símbolos e imagens portam imenso poder, e ninguém sabe disso melhor que um Simbolista. Mais que uma disciplina mágica, o simbolismo é o estudo de como tecer energias sobrenaturais em sigilos e ícones: runas, pinturas, talismãs etc.

A maioria desenvolve a habilidade com prática constante e estudo meticuloso. Muitos, porém, enxergam a disciplina como uma forma de expressar sua visão artística sem restrições.

## Para pensar no personagem

- Quem ou o quê lhe ensinou a tecer a magia em símbolos?
- Você se vê mais como um conjurador ou como um artista?
- Muitas pessoas praticam sua arte, ou você é uma exceção?
- Qual é a aparência de seus símbolos e como você os usa nas criaturas?

## Regras dos símbolos

- Uma criatura só pode estar com **um símbolo por vez**: ao receber outro, de qualquer fonte, o anterior é destruído.
- Símbolos têm efeito e duração **ilimitados** até serem destruídos.
- Se o Simbolista morre, todos os símbolos que criou são destruídos na hora. Se a criatura marcada morre, o símbolo também some (mas um NPC que só mudou de forma ao chegar a 0 PV mantém o símbolo: eles se ligam à pessoa na narrativa, não aos parâmetros).
- Numa cena do Mestre, um vilão pode gastar **1 Ponto de Ultima** para destruir qualquer quantidade de símbolos ligados a ele e a seus aliados presentes. É a única forma de remover um símbolo contra a vontade do Simbolista, além de uma oportunidade adequada à cena ou de um poder de NPC (e isso não deve acontecer mais de duas ou três vezes por campanha).
- O Simbolista pode destruir quantos símbolos quiser, a qualquer momento, sem usar ação.
- Se um símbolo exige uma escolha ao ser criado, ela vale para **todas as cópias** criadas na mesma ação, mas não afeta cópias criadas em outras ações.
- O máximo de símbolos ativos ao mesmo tempo é definido pelo NP em [[simbolismo]].

## Os Símbolos

Descrição resumida dos 19 símbolos (páginas 145 a 147 do Atlas). "Escolha um tipo de dano" refere-se a ar, fogo, gelo, luz, raio, terra, trevas ou veneno.

| Símbolo | Efeito na criatura marcada |
| --- | --- |
| Amarras | Seus dados atuais de Atributo nunca passam dos dados básicos (não encerra efeitos, só impede a influência sobre os Atributos). |
| Crescimento | Feitiços dela com "até três criaturas" de alvo passam a "até quatro" (o PM do quarto alvo ainda é pago). |
| Criação | Quando precisar gastar Pontos de Inventário em conflito, pode destruir o símbolo para não gastar. |
| Desespero | Recupera só metade do PV e/ou PM em conflitos. |
| Destino | Depois de rolar um teste, se você a vê, pode gastar 1 Ponto de Fabula para ela rolar os dois dados de novo (uma vez por teste; não vale após sucesso ou falha crítica). |
| Elementos | Escolha um tipo de dano ao criar. Quando ela causa dano, você pode gastar PM igual a um terço do dano total para converter todo ele nesse tipo. |
| Feitiçaria | Feitiços que a têm como alvo custam 5 PM a menos (mínimo 5); acumula por criatura marcada. |
| Fluxo | Escolha uma condição (abalado, atordoado, lento ou fraco): ela fica Imune a ela, **ou** perde a Imunidade e não pode recuperá-la. |
| Fraqueza | Escolha um tipo de dano: ela sofre 5 pontos de dano adicional dessas fontes. |
| Inimizade | Em crise, inimigos que a vejam devem incluí-la entre os alvos de ataques e feitiços ofensivos, se possível. |
| Metamorfose | Escolha uma espécie (fera, construto, demônio, elemental, monstro, planta ou morto-vivo): para efeitos e poderes, ela conta como dessa espécie. Não se aplica a PJs. |
| Proibição | Escolha uma ação (Ataque, Guarda, Feitiço, Objetivo ou Poder): ao fazê-la, ela perde 5 PV e 5 PM antes (+10 a partir do 20º nível, +20 a partir do 40º). |
| Prosperidade | Quando gasta 1 Ponto de Fabula para invocar um Traço ou Laço, recebe também 100 zênites. |
| Proteção | Escolha um tipo de dano: ela fica Resistente a ele. |
| Rebelião | Com um vilão na cena, seus testes opostos têm sucesso crítico quando os dois dados saem iguais (se não for falha crítica). |
| Renascimento | Prestes a chegar a 0 PV, pode destruir o símbolo para ficar com exatamente 1 PV. |
| Sacrifício | Quando ela sofre dano e você a vê, pode destruir o símbolo para sofrer o dano no lugar dela. |
| Verdade | Testes para examinar ou localizar a criatura, e testes de Precisão e de Magia de ataques e feitiços ofensivos contra ela, recebem +2 (acumula entre alvos marcados). |
| Vingança | Quando uma criatura em crise a atinge com ataque ou feitiço ofensivo, essa criatura recupera 5 PV e 5 PM. |`,
    otherNames: ['Calígrafo', 'Pintor', 'Runomante'],
    quote:
      'Para que serve um pincel se o seu coração é guiado pela motivação errada?',
    traits: ['ip'],
    freeBenefits: [
      'Aumenta permanentemente seus Pontos de Inventário (PI) máximos em 2.',
    ],
  }),

  skill(
    CLASS,
    'Conexão Simbólica',
    143,
    1,
    'Você sempre sabe a direção exata de qualquer criatura que tenha um símbolo seu, se ela estiver a até 2 dias de viagem.',
    `Você sempre sabe a **direção exata** de qualquer criatura que esteja com um de seus símbolos, desde que ela esteja a até **2 dias de viagem** da sua posição.`,
  ),

  skill(
    CLASS,
    'Miragem',
    143,
    1,
    'Permite fazer rituais de ritualismo e usar ritualismo para criar ilusões visuais.',
    `Você pode fazer rituais da disciplina **ritualismo**. Além disso, também pode usar ritualismo para criar **ilusões visuais**.`,
  ),

  skill(
    CLASS,
    'Simbolismo',
    143,
    5,
    'Aprende dois símbolos por nível e pode manter NP + 1 ativos. Por ação Inventário e 2 PI, cria um símbolo em você, num aliado ou em inimigos atingidos por um ataque livre.',
    `Sempre que adquirir este poder, aprenda **dois símbolos** (veja a lista no corpo da classe [[simbolista]]).

Você pode ter até **(NP + 1)** símbolos ativos ao mesmo tempo. Se criar mais que isso, antes precisa escolher um símbolo ativo seu para destruir.

Você pode fazer a ação **Inventário** e gastar **2 PI** para criar um dos símbolos que aprendeu e escolher uma opção:

- aplicá-lo em **você mesmo**;
- aplicá-lo num **aliado** que você veja; **ou**
- fazer um **ataque livre** com uma arma equipada. Esse ataque não causa dano, mas você aplica uma cópia do símbolo a cada inimigo atingido (cada cópia conta como um símbolo individual no limite de NP + 1).`,
  ),

  skill(
    CLASS,
    'Símbolos Mágicos',
    143,
    3,
    'Um aliado com símbolo seu pode usar a ação Feitiço para destruí-lo e lançar um feitiço que você conhece, com custo total de até NP × 10 PM (ele paga o PM).',
    `Se um aliado estiver com um de seus símbolos, ele pode fazer a ação **Feitiço** para **destruir o símbolo** e lançar um único feitiço entre aqueles que **você** conhece.

O custo total em PM do feitiço deve ser igual ou menor que **(NP × 10)**, e o aliado ainda deve pagar esse custo em PM.`,
  ),

  skill(
    CLASS,
    'Toque Pessoal',
    143,
    5,
    'Quando uma criatura com símbolo seu sofre dano ou recupera PV/PM, você pode fazê-la sofrer ou recuperar NP a mais.',
    `Quando uma criatura que você veja e que esteja com um de seus símbolos sofrer dano ou recuperar PV e/ou PM, você pode fazer essa criatura sofrer **(NP)** de dano adicional ou recuperar **(NP)** PV e/ou PM, respectivamente.`,
  ),
];
