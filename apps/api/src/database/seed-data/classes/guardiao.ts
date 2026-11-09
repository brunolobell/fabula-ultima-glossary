import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Guardião';

export const guardiao: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 202,
    summary:
      'Protetor altruísta, disposto a se sacrificar por uma pessoa, nação ou ideal; usa armaduras e escudos marciais para ficar entre os aliados e o perigo.',
    body: `Guardiões são orgulhosos e altruístas: sabem o valor da vida e estão dispostos a se sacrificar por uma pessoa, nação ou ideal que juraram proteger. Costumam ser indivíduos impressionantes, como soldados ou veteranos marcados por centenas de batalhas.

Alguns parecem barulhentos e tempestuosos, mas muitos só escondem memórias atormentadas das pessoas que não conseguiram proteger.

## Para pensar no personagem

- Por quem ou pelo que você daria a vida de bom grado para proteger?
- Você serve ou já serviu a uma dama ou a um lorde? Como era essa pessoa?
- O que você falhou em proteger? O que perdeu?
- O que você usa de armadura e/ou escudo?`,
    otherNames: ['Paladino', 'Soldado', 'Yojimbo'],
    quote: 'Deixe-me ser seu escudo.',
    freeBenefits: [
      'Aumenta permanentemente seus PV máximos em 5.',
      'Pode equipar armaduras e escudos marciais.',
    ],
  }),

  skill(
    CLASS,
    'Duplo Escudeiro',
    203,
    1,
    'Permite equipar um escudo também na mão dominante; com dois escudos você recebe os benefícios de ambos e pode usá-los como uma arma de luta de duas mãos.',
    `Você passa a poder equipar um escudo no espaço da mão dominante. Enquanto tiver dois escudos equipados, recebe os benefícios dos dois itens e pode tratá-los como a seguinte arma de luta de duas mãos:

| Arma | Precisão | Dano |
| --- | --- | --- |
| Escudos Gêmeos | (VIG + VIG) | (RA + 5) físico |

A arma causa dano adicional igual ao seu NP em [[maestria-defensiva]].`,
  ),

  skill(
    CLASS,
    'Fortaleza',
    203,
    5,
    'Aumenta permanentemente seus PV máximos em NP × 3.',
    'Aumente permanentemente seus PV máximos em **(NP × 3)**.',
  ),

  skill(
    CLASS,
    'Guarda-costas',
    203,
    1,
    'Ao fazer a ação Guarda para dar cobertura a um aliado, essa criatura fica Resistente a todos os tipos de dano até o início do seu próximo turno.',
    'Se você fizer a ação **Guarda** e escolher dar cobertura a um aliado, essa criatura torna-se **Resistente** a todos os tipos de dano até o início do próximo turno dela.',
  ),

  skill(
    CLASS,
    'Maestria Defensiva',
    203,
    5,
    'Com um escudo ou armadura marcial equipado, todo o dano que você sofre é reduzido em NP.',
    'Enquanto tiver um escudo ou uma armadura marcial equipada, todo o dano que você sofrer é reduzido em **(NP)**. Essa redução é aplicada antes das Afinidades a dano.',
  ),

  skill(
    CLASS,
    'Proteger',
    203,
    1,
    'Quando outra criatura é ameaçada por um perigo, você pode tomar o lugar dela: os testes do perigo passam a ser contra você.',
    `Quando outra criatura é ameaçada por um ataque, feitiço ou outro perigo, você pode **tomar o lugar dela**.

- Quaisquer testes que façam parte do perigo são realizados contra você.
- Você pode declarar o uso deste Poder **antes ou depois** dos testes.
- Se o perigo já tinha afetado você, ele o afeta **duas vezes**, e cada instância é resolvida separadamente.
- Você não pode proteger várias criaturas do mesmo perigo.
- Se usar este Poder durante um conflito, não pode usá-lo de novo até o início do seu próximo turno.`,
  ),
];
