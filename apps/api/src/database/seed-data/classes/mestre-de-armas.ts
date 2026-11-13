import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Mestre de Armas';

export const mestreDeArmas: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 214,
    summary:
      'Combatente de curto alcance que dedicou anos a aperfeiçoar a arte da luta, com várias armas ou uma só, e que serve a alguém ou busca oponentes dignos.',
    body: `Mestres de Armas dedicam anos e anos ao aperfeiçoamento das suas artes de combate de curto alcance. A maioria tem habilidade notável com diversas armas; outros treinaram para se tornar um só com um armamento específico.

Alguns seguem e protegem alguém por amor ou lealdade; outros atravessam o mundo em busca de oponentes dignos, armas mágicas lendárias ou professores capacitados.

## Para pensar no personagem

- Qual é a sua relação com as armas? São meros objetos ou algo maior?
- Você procura batalhas ou tenta evitá-las?
- Você está ou já esteve a serviço de uma dama ou de um lorde? Como era essa pessoa?
- Qual a aparência das suas armas e como é o seu estilo de luta?`,
    otherNames: ['Guerreiro', 'Lutador', 'Ronin'],
    quote: 'As lâminas mais aguçadas nunca são desembainhadas.',
    traits: ['hp', 'melee-weapon', 'shield'],
    freeBenefits: [
      'Aumenta permanentemente seus PV máximos em 5.',
      'Pode equipar armas corpo a corpo e escudos marciais.',
    ],
  }),

  skill(
    CLASS,
    'Chuva de Lâminas',
    215,
    1,
    'Ao fazer um ataque corpo a corpo, você pode gastar 10 PM para dar a ele multi (2) ou aumentar em 1 a propriedade multi do ataque, até multi (3).',
    `Quando faz um ataque corpo a corpo, você pode gastar **10 PM** para escolher uma opção:

- o ataque recebe **multi (2)**; ou
- você aumenta em um a propriedade **multi** do ataque, até o máximo de **multi (3)**.`,
  ),

  skill(
    CLASS,
    'Contra-ataque',
    215,
    1,
    'Quando um inimigo acerta ou erra um ataque corpo a corpo contra você com um resultado par no teste de Precisão, você pode fazer um ataque livre corpo a corpo contra ele, com RA considerada 0.',
    `Quando um inimigo **atinge ou erra** um ataque corpo a corpo contra você, se o resultado do teste de Precisão for um **número par**, você pode fazer um **ataque livre** contra esse inimigo (depois que o ataque dele for resolvido).

Esse ataque deve ser corpo a corpo e ter esse inimigo como **único alvo**. Sua RA é considerada **0** para calcular o dano.`,
  ),

  skill(
    CLASS,
    'Quebra-ossos',
    215,
    4,
    'Ao atingir alvos com um ataque corpo a corpo que causaria dano, você pode escolher não causar dano e deixar cada alvo atordoado ou fraco, ou fazê-lo perder (NP × 10) PM.',
    `Quando você atinge um ou mais alvos com um ataque corpo a corpo que causaria dano, pode **escolher não causar dano**. Se fizer isso, escolha uma opção:

- cada alvo atingido fica **atordoado**;
- cada alvo atingido fica **fraco**; ou
- cada alvo atingido perde **(NP × 10) PM**.

Descreva a sua manobra.`,
  ),

  skill(
    CLASS,
    'Maestria com Armas Corpo a Corpo',
    215,
    4,
    'Você recebe um bônus igual a (NP) nos testes de Precisão corpo a corpo.',
  ),

  skill(
    CLASS,
    'Trespassar',
    215,
    3,
    'Com uma ação e 5 PM, você faz um ataque livre corpo a corpo contra uma só criatura; se acertar, em vez de causar dano você destrói o escudo ou a armadura dela, ou faz todas as fontes causarem (NP × 2) de dano adicional a ela até o início do seu próximo turno.',
    `Você pode usar uma **ação** e gastar **5 PM** para fazer um **ataque livre** com uma arma corpo a corpo equipada. O ataque deve ter **somente uma criatura** como alvo.

Se acertar, você **não causa dano** e escolhe uma opção:

- destrói um **escudo** equipado pelo alvo;
- destrói a **armadura** equipada pelo alvo; ou
- todas as fontes causam **(NP × 2)** pontos de dano adicional ao alvo até o início do seu próximo turno.`,
  ),
];
