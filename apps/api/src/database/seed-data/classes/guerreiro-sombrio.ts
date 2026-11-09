import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Guerreiro Sombrio';

export const guerreiroSombrio: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 204,
    summary:
      'Combatente lúgubre que esconde um passado triste e sacrifica a própria força vital em golpes poderosos, extraindo coragem, poder e até sabedoria do sofrimento.',
    body: `Guerreiros Sombrios são combatentes lúgubres e poderosos que escondem passados tristes. Por experiências trágicas no campo de batalha ou na vida pessoal, sua alma desenvolveu afinidade com a dor e com energias sombrias.

Heróis no mínimo improváveis, sacrificam a própria força vital para desferir golpes poderosos e extrair coragem, poder e até sabedoria do sofrimento.

## Para pensar no personagem

- Que experiência trágica despertou suas habilidades?
- Muitos acreditam que seus poderes são malignos. Como você se sente em relação a eles?
- Qual a aparência das suas armas e como é o seu estilo de luta?
- Há muitos praticando a sua magia, ou você é uma exceção?`,
    otherNames: ['Cavaleiro da Morte', 'Cavaleiro Negro', 'Vingador'],
    quote: 'Hoje você conhecerá a extensão do meu sofrimento.',
    freeBenefits: [
      'Aumenta permanentemente seus PV máximos em 5.',
      'Pode equipar armas corpo a corpo e armaduras marciais.',
    ],
  }),

  skill(
    CLASS,
    'Agonia',
    205,
    5,
    'Uma vez por turno (inclusive os de outras criaturas), depois de causar dano a inimigos com quem você tem um Laço, você recupera (NP × 2) PV e (NP × 2) PM.',
  ),

  skill(
    CLASS,
    'Coração da Escuridão',
    205,
    1,
    'Uma vez por cena, ao entrar em crise, você escolhe uma criatura que vê e com quem não tem Laço e cria um Laço de ódio com ela.',
  ),

  skill(
    CLASS,
    'Golpe das Sombras',
    205,
    5,
    'Com uma ação, você rola seu dado de Vigor e perde PV igual ao resultado; se isso não zerar seus PV, faz um ataque livre que causa dano de trevas adicional de (NP + o número rolado).',
    `Você aprendeu a canalizar sua força vital nos ataques. Você pode usar uma **ação** para fazer um **Golpe das Sombras**:

1. Role seu dado atual de **Vigor** e perca PV igual ao resultado.
2. Se isso **não** reduzir seus PV a 0, você pode fazer um **ataque livre** com uma arma equipada.
3. Se o ataque atingir um ou mais alvos, você causa dano adicional igual a **(NP + o número rolado no dado de Vigor)**.

Esse ataque causa dano de **trevas**, e o tipo não pode ser alterado.`,
  ),

  skill(
    CLASS,
    'Lição Dolorosa',
    205,
    3,
    'Quando outra criatura faz você perder PV, você pode fazer a ação Estudo imediatamente contra ela, com bônus de (NP) no teste; só se estuda a mesma informação de uma criatura uma vez.',
    `Quando outra criatura faz você perder PV (com um ataque, feitiço ou qualquer outro método), você pode fazer a ação **Estudo** (veja a página 70) **imediatamente**, tendo-a como alvo. Se fizer isso, o teste recebe um bônus igual a **(NP)**.

Lembre-se: só se pode estudar a mesma informação de uma criatura **uma vez**.`,
  ),

  skill(
    CLASS,
    'Sangue das Trevas',
    205,
    1,
    'Enquanto você está em crise, tem Resistência a dano de trevas e de veneno.',
  ),
];
