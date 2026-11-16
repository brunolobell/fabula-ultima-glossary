import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Lâmina Carmesim';

export const laminaCarmesim: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 56,
    summary:
      'Guerreiro que molda o próprio sangue, a substância que sustenta a vida, para lutar: transforma ferimentos em força, rouba a vontade de inimigos e cresce quando está à beira da queda.',
    body: `O sangue é o que mantém um corpo vivo, e a lâmina carmesim aprendeu a dobrá-lo conforme a sua vontade. Esse domínio costuma assustar quem o presencia, e por isso muitos desses guerreiros são temidos ou expulsos de onde passam.

Ninguém sabe ao certo de onde vem o dom. Há lendas que o ligam a uma descendência de vampiros, e há quem o atribua a experimentos de alquimia. Seja qual for a origem, o poder vem acompanhado de uma sede de sangue, e controlá-la é o maior desafio de quem o carrega.

## Para pensar no personagem

- De que forma você aprendeu a controlar o sangue?
- A sede de sangue nunca passa. Como você convive com ela?
- O que você faz diante do medo e do preconceito que as pessoas têm dos seus dons?
- Além de sangue quente, o que mais corre nas suas veias?`,
    otherNames: ['Cavaleiro Vermelho', 'Dampiro', 'Hemomante'],
    quote: 'Sangue é vivo!',
    traits: ['hp', 'melee-weapon', 'shield'],
    freeBenefits: [
      'Aumenta permanentemente seus PV máximos em 5.',
      'Pode equipar armas corpo a corpo e escudos marciais.',
    ],
  }),

  skill(
    CLASS,
    'Arsenal Vermelho',
    57,
    1,
    'Ação e 5 PV: cobre uma arma corpo a corpo equipada de sangue até o fim da cena; ela passa a disparar cortes que atingem alvos fora do alcance corpo a corpo e força a pousar quem voa. Em crise, não custa PV e inclui um ataque livre.',
    `Com uma ação e **5 PV**, você banha uma **arma corpo a corpo** que esteja equipada em sangue seu, e o efeito dura até o **fim da cena**.

Nesse período, a arma lança **lâminas de sangue em grande velocidade**, o que a deixa acertar alvos fora do alcance de um ataque corpo a corpo comum. Se um alvo **em pleno voo** for atingido por um ataque da arma, ele é **forçado a pousar** na hora.

Quando você estiver em **crise**, usar o poder **não custa PV** e você ainda pode fazer um **ataque livre** dentro da mesma ação.`,
  ),

  skill(
    CLASS,
    'Dobrar Sangue',
    57,
    1,
    'Ação e 20 PM: escolhe um ataque básico ou feitiço conhecido de um inimigo visível e faz um teste oposto de (VON + VIG); se vencer, o alvo é obrigado a usar essa ação no próximo turno, contra um alvo à sua escolha.',
    `Você pode usar uma ação e gastar **20 PM** para escolher um **ataque básico** ou um **feitiço** conhecido de um inimigo que você consiga ver.

Faça então um **teste oposto** contra ele, usando **(VON + VIG)**. Se você vencer, o alvo é obrigado a **usar a ação escolhida** no turno seguinte dele, contra um alvo que **você** decidir.`,
  ),

  skill(
    CLASS,
    'Escudo Escarlate',
    57,
    2,
    'Enquanto estiver em crise, sua Defesa e sua Defesa mágica aumentam em (NP).',
    `Enquanto você estiver em **crise**, sua **Defesa** e sua **Defesa mágica** aumentam em **(NP)**.`,
  ),

  skill(
    CLASS,
    'Frenesi Sanguinolento',
    57,
    4,
    'Ao rolar um sucesso crítico em um ataque corpo a corpo, você pode gastar a oportunidade gerada para recuperar (NP × 10) PV.',
    `Quando rolar um **sucesso crítico** ao fazer um ataque **corpo a corpo**, você pode gastar a oportunidade gerada para **recuperar (NP × 10) PV**.`,
  ),

  skill(
    CLASS,
    'Hemofagia',
    57,
    5,
    'Uma vez por rodada, quando outra criatura faz você perder PV, gaste 10 PV para fazer um ataque livre contra ela depois que a ação for resolvida; se acertar, em vez do dano da arma causa (NP + RA do teste de Precisão) de dano físico.',
    `Uma vez por rodada, quando outra criatura fizer você **perder PV**, você pode gastar **10 PV** para fazer um **ataque livre** contra ela. O ataque acontece depois que a ação dessa criatura for resolvida.

Se acertar, o ataque **não causa o dano da arma**. Em vez disso, causa **(NP + RA do teste de Precisão)** de dano **físico**.`,
  ),
];
