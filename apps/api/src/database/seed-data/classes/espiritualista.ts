import { classEntry, skill, spell } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Espiritualista';

export const espiritualista: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 196,
    summary:
      'Conjurador ligado aos aspectos brutos da alma (emoção, energia, vida e morte), que cura, protege e castiga com poderes milagrosos e assustadores.',
    body: `Espiritualistas cultivam uma conexão poderosa com os aspectos brutos da alma: emoção, energia, vida e morte. Usam poderes tão milagrosos quanto assustadores e costumam ser afiliados a cultos ou religiões.

Vários mundos veem os poderes do espiritualismo como dádivas divinas ou como prova da pureza de coração de alguém; mas não há prova definitiva de que essas habilidades venham de algo além de disciplina, empatia e foco.

Quem lança feitiços segue as regras de [[como-lancar-um-feitico]].

## Para pensar no personagem

- De onde vem a sua magia? Quais são as suas crenças sobre vida e morte?
- Como você se sente ao manipular as emoções e a energia vital das pessoas?
- O que acha de religião? Você faz parte de um culto ou igreja específica?
- Qual a aparência da sua magia?`,
    otherNames: ['Bruxa', 'Curandeiro', 'Sacerdote'],
    quote: 'Mostre-me a verdade do seu coração.',
    freeBenefits: [
      'Aumenta permanentemente seus PM máximos em 5.',
      'Pode fazer rituais da disciplina ritualismo.',
    ],
  }),

  skill(
    CLASS,
    'Espiritualismo Ritualista',
    197,
    1,
    'Você pode fazer rituais da disciplina espiritualismo, que usam (AST + VON) no teste de Magia.',
  ),

  skill(
    CLASS,
    'Magia de Suporte',
    197,
    1,
    'Ao lançar um feitiço com aliados como alvo e uma arma arcana equipada, você escolhe um aliado com quem tem um Laço: ele ganha bônus igual à força do Laço no próximo teste da cena.',
    `Quando você lança um feitiço que tenha um ou mais **aliados** como alvo, se estiver com uma **arma arcana** equipada, escolha um desses aliados com quem você tenha um [[lacos]].

O aliado recebe um bônus igual à **força do seu Laço** com ele no próximo teste que fizer até o fim da cena.`,
  ),

  skill(
    CLASS,
    'Magia Espiritual',
    197,
    10,
    'A cada vez que adquire este Poder, você aprende um feitiço de Espiritualista; os feitiços ofensivos da classe usam (AST + VON) no teste de Magia.',
    `Sempre que adquirir este Poder, você **aprende um feitiço de Espiritualista** (veja as páginas 198 e 199).

Os feitiços ofensivos de Espiritualista usam **(AST + VON)** no teste de Magia.`,
  ),

  skill(
    CLASS,
    'Poder Curativo',
    197,
    2,
    'Ao lançar um feitiço com aliados como alvo e uma arma arcana equipada, cada aliado alvo recupera (3 + (NP × número de Laços que você tem)) PV, além da cura do feitiço.',
    `Quando você lança um feitiço que tenha um ou mais **aliados** como alvo, se estiver com uma **arma arcana** equipada, cada aliado alvo recupera PV igual a **(3 + (NP × número de [[lacos]] que você tem))**.

Essa cura é separada de qualquer cura causada pelos efeitos do feitiço.`,
  ),

  skill(
    CLASS,
    'Vismagus',
    197,
    1,
    'Ao lançar um feitiço sem PM suficientes, você pode pagar com PV: (10 + o custo total em PM do feitiço). Se o feitiço o curaria, você não recupera PV.',
    `Quando você lança um feitiço e **não tem PM** para pagar o custo total, pode gastar **PV** em vez disso: uma quantidade igual a **(10 + o custo total em PM do feitiço)**.

Se um feitiço lançado dessa forma faria **você** recuperar PV, você não recupera (os outros alvos são afetados normalmente).`,
  ),

  spell(CLASS, {
    name: 'Alucinação',
    page: 198,
    mpCost: '5 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Altera os sentidos dos inimigos com alucinações: você escolhe abalado ou atordoado e cada alvo atingido sofre essa condição.',
    body: 'Você altera os sentidos dos inimigos, fazendo-os vivenciar alucinações bizarras ou assustadoras. Escolha **abalado** ou **atordoado**: cada alvo atingido é afligido pela condição escolhida.',
  }),

  spell(CLASS, {
    name: 'Arma Espiritual',
    page: 198,
    mpCost: '5',
    target: 'Uma arma equipada',
    duration: 'Cena',
    summary:
      'Imbui a arma com a energia purificadora do seu espírito: enquanto durar, o dano dela vira dano de luz.',
    body: `Você imbui a arma com a energia purificadora do seu espírito. Enquanto o feitiço durar, todo o dano causado pela arma passa a ser de **luz**. Se você tiver essa arma equipada ao lançar o feitiço, pode fazer um **ataque livre** com ela como parte da mesma ação.

O feitiço só pode ser lançado em armas equipadas de criaturas voluntárias.`,
  }),

  spell(CLASS, {
    name: 'Aura',
    page: 198,
    mpCost: '5 × A',
    target: 'Até três criaturas',
    duration: 'Cena',
    summary:
      'Sua alma cerca os alvos e os protege de magias: a Defesa Mágica deles passa a ser 12 (13 a partir do 20º nível, 14 a partir do 40º).',
    body: `Você projeta a alma para fora do corpo e a instrui a cercar os alvos, protegendo-os de magias perigosas. Enquanto o feitiço durar, a **Defesa Mágica** dos alvos se torna **12** (um alvo ainda pode usar a própria Def.M se for maior que 12).

Se você está no 20º nível ou acima, o valor sobe para **13**; no 40º nível ou acima, para **14**.`,
  }),

  spell(CLASS, {
    name: 'Barreira',
    page: 198,
    mpCost: '5 × A',
    target: 'Até três criaturas',
    duration: 'Cena',
    summary:
      'Sua alma vira uma barreira contra ataques: a Defesa dos alvos passa a ser 12 (13 a partir do 20º nível, 14 a partir do 40º).',
    body: `Você projeta a alma para fora do corpo e a transforma em uma barreira para proteger os alvos contra ataques. Enquanto o feitiço durar, a **Defesa** dos alvos se torna **12** (um alvo ainda pode usar a própria Defesa se for maior que 12).

Se você está no 20º nível ou acima, o valor sobe para **13**; no 40º nível ou acima, para **14**.`,
  }),

  spell(CLASS, {
    name: 'Bastião Espiritual',
    page: 198,
    mpCost: '5 × A',
    target: 'Até três criaturas',
    duration: 'Cena',
    summary:
      'Protege os alvos com energia mágica: você escolhe luz, trevas ou veneno e cada alvo fica Resistente a esse dano enquanto durar.',
    body: 'Você protege os alvos com energia mágica. Escolha um tipo de dano entre **luz**, **trevas** ou **veneno**. Enquanto o feitiço durar, cada alvo fica **Resistente** ao dano escolhido.',
  }),

  spell(CLASS, {
    name: 'Curar',
    page: 198,
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    summary:
      'Revigora seus companheiros: cada alvo recupera 40 PV (50 a partir do 20º nível, 60 a partir do 40º).',
    body: `Você revigora seus companheiros, aliviando suas dores e curando sua fadiga. Cada alvo recupera **40 PV**.

Se você está no 20º nível ou acima, a quantidade sobe para **50 PV**; no 40º nível ou acima, para **60 PV**.`,
  }),

  spell(CLASS, {
    name: 'Despertar',
    page: 199,
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Cena',
    summary:
      'Faz a criatura concentrar a energia vital: você escolhe um Atributo e o alvo o considera um passo maior (máximo d12) enquanto durar.',
    body: 'Você permite que uma criatura concentre a própria energia vital para fazer o que antes não conseguia. Escolha um Atributo: Destreza, Vigor, Astúcia ou Vontade. Enquanto o feitiço durar, o alvo considera o dado do Atributo escolhido **um passo maior** (máximo de d12).',
  }),

  spell(CLASS, {
    name: 'Enfurecer',
    page: 199,
    mpCost: '10',
    target: 'Uma criatura',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Faz uma criatura perder a compostura: o alvo fica enfurecido e não pode fazer Guarda nem Feitiço até o fim do próximo turno dele.',
    body: 'Você faz uma criatura perder a compostura e agir em total descontrole. O alvo fica **enfurecido** e **não pode fazer Guarda ou Feitiço** até o fim do próximo turno dele.',
  }),

  spell(CLASS, {
    name: 'Lux',
    page: 199,
    mpCost: '10 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Uma barragem de raios solares cegantes: causa (RA + 15) pontos de dano de luz a cada alvo atingido; na oportunidade, os alvos ficam atordoados.',
    body: `Você foca sua energia interior em uma barragem de raios solares cegantes, causando **(RA + 15)** pontos de dano de **luz** a cada alvo atingido.

**Oportunidade:** os alvos atingidos também ficam **atordoados**.`,
  }),

  spell(CLASS, {
    name: 'Piedade',
    page: 199,
    mpCost: '20',
    target: 'Uma criatura',
    duration: 'Cena',
    summary:
      'Fortalece a coragem do alvo: se ele ficaria com 0 PV, fica com exatamente 1 PV, e então o feitiço termina.',
    body: 'Você fortalece a coragem de uma criatura contra o sofrimento e o desespero. Enquanto o feitiço durar, se o alvo ficaria com 0 PV, ele fica com **exatamente 1 PV**. Quando isso acontece, o feitiço termina.',
  }),

  spell(CLASS, {
    name: 'Purificar',
    page: 199,
    mpCost: '5 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    summary:
      'Purifica a energia da alma dos companheiros: todos os alvos se recuperam de todas as condições.',
    body: 'Você fortifica e purifica a energia da alma que flui pelos seus companheiros. **Todos os alvos se recuperam de todas as condições.**',
  }),

  spell(CLASS, {
    name: 'Reforçar',
    page: 199,
    mpCost: '5 × A',
    target: 'Até três criaturas',
    duration: 'Cena',
    summary:
      'Protege contra ataques que corromperiam corpo e espírito: você escolhe uma condição e cada alvo fica imune a ela enquanto durar.',
    body: 'Você protege os alvos contra ataques que corromperiam o corpo e o espírito. Escolha **abalado, atordoado, enfurecido, envenenado, fraco ou lento**. Enquanto o feitiço durar, cada alvo fica **imune** à condição escolhida.',
  }),

  spell(CLASS, {
    name: 'Torpor',
    page: 199,
    mpCost: '5 × A',
    target: 'Até três criaturas',
    duration: 'Instantânea',
    offensive: true,
    summary:
      'Sufoca a energia da alma dos adversários: você escolhe fraco ou lento e cada alvo atingido sofre essa condição.',
    body: 'Você sufoca a energia da alma que flui pelo corpo dos adversários, dificultando seus movimentos. Escolha **fraco** ou **lento**: cada alvo atingido é afligido pela condição escolhida.',
  }),
];
