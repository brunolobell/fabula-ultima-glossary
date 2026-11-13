import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Quimerista';

export const quimerista: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 218,
    summary:
      'Mago que tira seu poder das almas de monstros e feras: imita os feitiços das criaturas que encontra e compreende a natureza selvagem delas.',
    body: `Quimeristas obtêm seu poder das almas dos monstros e das feras que encontram. Ao manipular a selvagem energia interior, esses magos imitam as habilidades mágicas dos monstros e alcançam uma compreensão sobrenatural das criaturas ferais.

Apoiam-se na resistência e na força física, unidas à magia, e costumam ser vistos viajando pelo mundo em busca incessante de criaturas raras e encantadas.

**Esta classe não tem uma lista de feitiços própria:** os feitiços de Quimerista são aprendidos imitando o que outras criaturas lançam (veja o Poder [[imitacao-magica]]).

## Para pensar no personagem

- Quem ensinou a você a arte do quimerismo? Seu mentor é humano ou monstruoso?
- Pessoas e monstros podem viver em harmonia, ou o destino deles é se ameaçar mutuamente?
- Qual a aparência da sua magia?
- Há muitos praticando a sua arte, ou você é uma exceção?`,
    otherNames: ['Druida', 'Mago Selvagem', 'Metamorfo'],
    quote: 'Poder sem harmonia só leva ao sofrimento.',
    traits: ['mp', 'rituals'],
    freeBenefits: [
      'Aumenta permanentemente seus PM máximos em 5.',
      'Pode fazer rituais da disciplina ritualismo.',
    ],
  }),

  skill(
    CLASS,
    'Consumir',
    219,
    5,
    'Ao causar dano a criaturas com um feitiço, se você tem uma adaga, arma arcana ou malho equipado, você recupera (NP × 2) PM.',
  ),

  skill(
    CLASS,
    'Imitação Mágica',
    219,
    10,
    'Ao ver uma fera, monstro ou planta lançar um feitiço, você pode aprendê-lo como feitiço de Quimerista; pode memorizar até (NP + 2) deles, e seus feitiços ofensivos usam (AST + VON) ou (VIG + VON), à sua escolha.',
    `Quando você vê um feitiço sendo lançado por uma criatura das espécies **fera**, **monstro** ou **planta**, pode **aprendê-lo** como um dos seus feitiços de Quimerista. Se fizer isso, anote a **espécie** da criatura com a qual o aprendeu.

Na **primeira vez** que receber este Poder, escolha **(AST + VON)** ou **(VIG + VON)**. Daí em diante, seus feitiços ofensivos de Quimerista usam os Atributos escolhidos no teste de Magia, independentemente dos Atributos que a criatura usou.

Você pode memorizar até **(NP + 2)** feitiços de Quimerista diferentes dessa forma. Se quiser memorizar um novo, mas já atingiu o limite, precisa **esquecer** um dos antigos e substituí-lo.`,
  ),

  skill(
    CLASS,
    'Língua das Feras',
    219,
    1,
    'Você pode se comunicar com criaturas das espécies fera, monstro e planta.',
  ),

  skill(
    CLASS,
    'Patogênese',
    219,
    1,
    'Ao causar dano com um feitiço de Quimerista, os alvos da mesma espécie da criatura com quem você aprendeu o feitiço ficam envenenados.',
  ),

  skill(
    CLASS,
    'Quimerismo Ritualista',
    219,
    1,
    'Você pode fazer rituais da disciplina quimerismo, que usam (AST + VON) ou (VIG + VON), à sua escolha ao obter este Poder.',
    `Você pode fazer rituais da disciplina **quimerismo**.

Ao obter este Poder, escolha **(AST + VON)** ou **(VIG + VON)**. Daí em diante, seus rituais de quimerismo usam os Atributos escolhidos no teste de Magia.`,
  ),
];
