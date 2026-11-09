import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Atirador';

export const atirador: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 184,
    summary:
      'Combatente de armas à distância, calculista ou ousado, que pode ser soldado, pirata, caçador de recompensas ou guardião de um lugar proibido.',
    body: `A maioria dos Atiradores é excepcional em lidar com ameaças a uma distância cuidadosamente calculada; outros são corajosos, habilidosos ou imprudentes o bastante para enfrentar os adversários de perto.

Muitos são soldados habilidosos, mas alguns caíram na pirataria, na caça a recompensas ou na bandidagem. Outros põem suas habilidades a serviço do povo ou protegem um local sagrado ou proibido contra intrusos.

Quem usa armas à distância deve ver [[equipamento]] para os itens marciais.

## Para pensar no personagem

- Alguns acreditam que flechas e balas são armas de covardes. E você?
- Se for pego desprevenido, você improvisa ou recua?
- Você é discreto e reservado, confiante e astuto, ou expansivo e imprudente?
- Qual a aparência das suas armas e do seu estilo de luta?`,
    otherNames: ['Arqueiro', 'Franco-atirador', 'Pistoleiro'],
    quote:
      'Fuja até o outro canto do mundo; minha flecha ainda encontrará você.',
    freeBenefits: [
      'Aumenta permanentemente seus PV máximos em 5.',
      'Pode equipar armas à distância e escudos marciais.',
    ],
  }),

  skill(
    CLASS,
    'Barragem',
    185,
    1,
    'Ao fazer um ataque à distância, você pode gastar 10 PM para dar a ele a propriedade multi (2) ou aumentar em 1 a propriedade multi do ataque, até multi (3).',
    `Ao fazer um ataque à distância, você pode gastar **10 PM** para escolher uma opção:

- o ataque recebe a propriedade **multi (2)**; ou
- você aumenta em **+1** a propriedade multi do ataque, até o máximo de **multi (3)**.`,
  ),

  skill(
    CLASS,
    'Fogo Cruzado',
    185,
    1,
    'Quando uma criatura que você vê faz um ataque à distância, você pode gastar PM igual a (5 + o resultado do teste de Precisão dela) para fazer o ataque falhar contra todos os alvos.',
    `Quando uma criatura que você possa ver faz um ataque à distância, você pode gastar um total de PM igual a **(5 + o resultado do teste de Precisão da criatura)** para fazer o ataque **falhar automaticamente** contra todos os alvos.

- Só funciona se você tiver uma arma à distância equipada.
- Não funciona se o teste de Precisão da criatura for um **sucesso crítico**.`,
  ),

  skill(
    CLASS,
    'Maestria com Armas à Distância',
    185,
    4,
    'Você recebe um bônus igual a (NP) nos testes de Precisão à distância.',
  ),

  skill(
    CLASS,
    'Olhos de Águia',
    185,
    5,
    'Ao fazer a ação Guarda sem dar cobertura a outra criatura, você escolhe entre dano adicional de (NP × 3) no próximo ataque à distância da cena ou um ataque livre com arco ou arma de fogo.',
    `Quando você faz a ação **Guarda** e escolhe **não** dar cobertura a outra criatura, escolha uma opção:

- o próximo ataque à distância que você fizer na cena atual causa **(NP × 3)** pontos de dano adicional; ou
- você faz um **ataque livre** com um arco ou arma de fogo equipada, considerando sua RA como **0** ao calcular o dano desse ataque.`,
  ),

  skill(
    CLASS,
    'Tiro de Aviso',
    185,
    4,
    'Depois de atingir alvos com um ataque à distância, você pode escolher não causar dano: cada alvo atingido fica abalado, fica lento ou perde (NP × 10) PM.',
    `Depois de atingir um ou mais alvos com um ataque à distância, você pode **escolher não causar dano**. Se fizer isso, escolha uma opção:

- cada alvo atingido fica **abalado**;
- cada alvo atingido fica **lento**; ou
- cada alvo atingido perde **(NP × 10) PM**.

Descreva como você faz essa manobra.`,
  ),
];
