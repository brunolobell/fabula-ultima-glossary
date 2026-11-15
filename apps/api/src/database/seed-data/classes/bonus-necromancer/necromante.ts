import { classEntry, skill, withTags } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Necromante';

export const necromante: SeedEntry[] = [
  withTags(
    classEntry({
      name: CLASS,
      page: 2,
      summary:
        'Ceifa a energia espiritual de quem está à beira da morte e a acumula como Pontos de Túmulo, que alimentam o controle sobre vida e morte: volta de 0 PV, cura, dano extra e feitiços em área. Versão do suplemento Bônus (inglês), traduzida e não oficial.',
      body: `As artes de manipular almas já tiveram os usos mais variados, mas poucas despertam um medo tão instintivo quanto a necromancia.

Necromantes ceifam a energia espiritual instantes antes da morte, quando ela brilha com mais força. Esse poder precioso alimenta o controle deles sobre o equilíbrio entre a vida e a morte, ou até serve para habitar um cadáver e fazê-lo voltar a se mover. Ainda assim, como se zombasse dos esforços sombrios deles, a verdadeira ressurreição de um ente perdido continua sendo uma miragem.

Esta é a versão do suplemento Fabula Bonus (em inglês), traduzida por nós e não oficial. Ela é a referência de regras da classe neste glossário.

## Para pensar no personagem

- Quem lhe ensinou os caminhos da necromancia? Essa pessoa está viva ou é um morto-vivo?
- Seus poderes agem contra o ciclo natural das almas. O que você sente a respeito?
- Você é frio e lúgubre ou decadente e sarcástico?
- Quem você perdeu? Quem você ressuscitaria, se tivesse o poder para isso?`,
      otherNames: ['Monarca Tumular', 'Reanimador', 'Vampiro'],
      quote: 'Nunca desperdice, nunca precise.',
      traits: ['hp', 'mp'],
      freeBenefits: [
        'Aumenta permanentemente seus PV máximos ou seus PM máximos em 5 (à sua escolha).',
      ],
    }),
    'necromancer',
  ),

  skill(
    CLASS,
    'Além do Reino da Morte',
    3,
    5,
    'Ganha 1 Ponto de Túmulo quando uma criatura que você vê perde PV em crise (exceto morto-vivo), até (NP + 1). Ao chegar a 0 PV, perde todos os pontos e, na primeira vez na cena, recupera PV em vez de se render.',
    `Quando outra criatura que você consiga ver perde PV **enquanto está em crise**, se ela **não for um morto-vivo**, você recebe **1 Ponto de Túmulo**. Você nunca pode ter mais de **(NP + 1)** Pontos de Túmulo.

Quando você é reduzido a 0 PV, **perde todos os seus Pontos de Túmulo**. Em seguida, se tiver perdido ao menos 1 Ponto de Túmulo dessa forma e esta for a **primeira vez** na cena em que você chega a 0 PV, você **não se rende nem se sacrifica**: em vez disso, recupera uma quantidade de PV igual a **(NP × a quantidade de Pontos de Túmulo que você perdeu dessa forma)**.`,
  ),

  skill(
    CLASS,
    'Filhos da Sepultura',
    3,
    1,
    'Você sempre consegue falar com mortos-vivos; uma vez por cena, pode fazer uma pergunta a um deles, que precisa responder com sinceridade.',
    `Você sempre pode se comunicar verbalmente com **mortos-vivos**. Uma vez por cena, pode fazer **uma única pergunta** a um morto-vivo, que é obrigado a responder com sinceridade.`,
  ),

  skill(
    CLASS,
    'Medo é a Chave',
    3,
    3,
    'Com Além do Reino da Morte, ao fazer inimigos perderem PV, se algum estiver abalado ou fraco, ganhe 1 Ponto de Túmulo e recupere (NP × 2) PV e PM.',
    `Depois de fazer um ou mais inimigos perderem PV, se você tiver o Poder [[alem-do-reino-da-morte]] e ao menos um deles estiver **abalado** e/ou **fraco**, você recebe **1 Ponto de Túmulo** e recupera **(NP × 2)** PV e PM.`,
  ),

  skill(
    CLASS,
    'Por Quem os Sinos Dobram',
    3,
    3,
    'Ao causar dano a uma só criatura com um feitiço, gaste 1 Ponto de Túmulo: se ela tiver condições, dano extra de (NP × 2) + o número delas; se não tiver nenhuma, ela fica abalada.',
    `Quando você causa dano a uma criatura com um feitiço, se esse feitiço causa dano **apenas a essa criatura**, você pode gastar **1 Ponto de Túmulo**. Se fizer isso, escolha uma opção:

- se a criatura estiver sofrendo uma ou mais condições, o feitiço causa dano adicional igual a **((NP × 2) + o número de condições que ela está sofrendo)**; ou
- se a criatura não estiver sofrendo nenhuma condição, ela fica **abalada**.`,
  ),

  skill(
    CLASS,
    'Rondó do Pesadelo',
    3,
    1,
    'Ao lançar um feitiço ofensivo de alvo "uma criatura", gaste 2 Pontos de Túmulo para atingir todas as criaturas que você vê na cena; todo o dano vira trevas.',
    `Ao lançar um feitiço **ofensivo** com alvo "**uma criatura**", você pode gastar **2 Pontos de Túmulo** para que ele atinja **todas** as criaturas presentes na cena que você consiga ver. Faça um único teste de Magia e compare o resultado com a Defesa Mágica de cada alvo.

Se fizer isso, todo o dano causado pelo feitiço passa a ser de **trevas**, e esse tipo não pode ser alterado.`,
  ),
];
