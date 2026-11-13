import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Virtuoso';

export const virtuoso: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 148,
    summary:
      'Orquestra mágica de uma pessoa só: canta versos que combinam volume, escala e tom para ferir inimigos, curar, proteger ou fortalecer aliados.',
    body: `Seja dedilhando uma harpa delicada, encantando o público com potência vocal ou se jogando de um palco sobre uma multidão de fãs enlouquecidos, virtuosos são orquestras mágicas de uma pessoa só.

Suas habilidades vão além dos limites da música e do canto: contam com a força da alma e tecem energia mágica nas canções, dando suporte aos aliados em situações tensas.

## Para pensar no personagem

- Quem te ensinou a combinar magia e música? É um talento natural?
- Você é uma celebridade ou um músico viajante?
- Quem é seu maior rival na música? Quem te inspira a ser quem é?
- Como são seus instrumentos e estilo de canto?

## Versos

Para cantar um **verso**, você combina um **volume**, uma **escala** e um **tom** que aprendeu. Eles definem custo em PM, alvos e efeitos:

- o **volume** define a intensidade do som (e quantas criaturas você alcança);
- o **tom** define o efeito geral;
- a **escala** traz um tipo de dano, uma condição, um Atributo e uma recuperação, que modificam o efeito do tom.

> **Exemplo:** volume fraco + escala da Chama + tom mórbido causa a condição abalado numa criatura por 10 PM; volume médio + escala do Ferro + tom animado faz os aliados preencherem melhor seus relógios usando Vontade.

### Volumes

| Volume | Custo | Alvos |
| --- | --- | --- |
| Fraco | 10 PM | Você **ou** uma criatura que você veja e que possa ouvi-lo. |
| Médio | 20 PM | Todos os aliados que possam ouvi-lo. |
| Forte | 30 PM | Todos os inimigos que possam ouvi-lo. |

O livro imprime a coluna de custo como "PV", mas o exemplo do próprio texto fala em PM; tratamos como PM.

### Escalas

| Escala | Tipo | Condição | Atributo | Recuperação |
| --- | --- | --- | --- | --- |
| Chama | fogo | abalado | Vigor | PV |
| Geada | gelo | fraco | Vontade | PM |
| Ferro | físico | lento | Vontade | PM |
| Resplendor | luz | atordoado | Astúcia | PV |
| Sombra | trevas | fraco | Destreza | PM |
| Pedra | terra | atordoado | Vigor | PV |
| Trovão | raio | abalado | Destreza | PV |
| Vento | ar | lento | Astúcia | PM |

### Tons

- **Agitado.** Cada alvo sofre dano do tipo da escala igual ao **dobro do seu dado atual de Vontade** (+10 a partir do 20º nível, +20 a partir do 40º).
- **Ameaçador.** Na primeira vez que o alvo sofrer dano antes do início do seu próximo turno, esse dano passa a ser do tipo da escala (uma vez para cada alvo).
- **Animado.** Até o início do seu próximo turno, quando um alvo passar num teste com o Atributo da escala que permita avançar ou recuar um Relógio, ele pode preencher ou apagar uma seção a mais.
- **Calmo.** Cada alvo recupera (PV ou PM, conforme a escala) igual a **10 + o dobro do dado de Vontade** (+10 a partir do 20º nível, +20 a partir do 40º). Se recupera PM, não afeta quem cantou.
- **Mórbido.** Cada alvo sofre a condição da escala e perde a Resistência ao tipo de dano da escala (se tiver), sem poder ganhá-la, até o início do seu próximo turno.
- **Solene.** Cada alvo se recupera da condição da escala e fica Resistente ao tipo de dano da escala até o início do seu próximo turno.
- **Vibrante.** Cada alvo trata o Atributo da escala como um tipo de dado maior (máximo d12) até o início do seu próximo turno.`,
    otherNames: ['Bardo', 'Idol', 'Trovador'],
    quote: 'O show mal começou e sua cortina já está abaixando!',
    traits: ['mp'],
    freeBenefits: ['Aumenta permanentemente seus PM máximos em 5.'],
  }),

  skill(
    CLASS,
    'Barreira Sonora',
    149,
    5,
    'Depois de cantar um verso em volume médio ou forte, dano físico que você sofre até o início do próximo turno é reduzido em NP.',
    `Depois de cantar um verso em volume **médio ou forte**, qualquer quantidade de dano **físico** que você sofrer até o início do seu próximo turno é reduzida em **(NP)**, antes de aplicar Afinidades a dano.`,
  ),

  skill(
    CLASS,
    'Canto da Sereia',
    149,
    1,
    'Permite fazer rituais de ritualismo e usar ritualismo para criar ilusões sonoras.',
    `Você pode fazer rituais da disciplina **ritualismo**. Além disso, também pode usar ritualismo para criar **ilusões sonoras**.`,
  ),

  skill(
    CLASS,
    'Harmonia',
    149,
    3,
    'Depois de afetar inimigos com um verso, com arma arcana equipada: aliados causam NP de dano adicional a eles, ou você recupera NP PM por inimigo que sofrer dano.',
    `Depois de afetar um ou mais inimigos com um verso, se tiver uma **arma arcana** equipada, escolha um efeito:

- até o início do seu próximo turno, seus aliados causam **(NP)** de dano adicional a esses inimigos; **ou**
- até o início do seu próximo turno, você recupera **(NP)** PM cada vez que esses inimigos sofrerem dano (se uma mesma fonte causar dano a dois ou mais deles ao mesmo tempo, você recupera NP PM por inimigo atingido).`,
  ),

  skill(
    CLASS,
    'Magicanto',
    149,
    10,
    'Em conflito, por uma ação e PM variável, canta um verso (um por turno). Ao adquirir, aprende os três volumes, uma escala e um tom; nos níveis seguintes, mais uma escala ou tom.',
    `Em seu turno durante uma cena de conflito, você pode usar uma ação e gastar uma quantidade variável de PM para tecer voz e música num efeito mágico chamado **verso** (regras no corpo da classe [[virtuoso]]).

Você só pode cantar **um verso por turno**, mesmo que possa fazer mais de uma ação.

Ao adquirir este poder pela primeira vez, você aprende os **três volumes**, mais **uma escala e um tom**. Sempre que o adquirir de novo, pode aprender mais uma escala **ou** um tom, à sua escolha.`,
  ),

  skill(
    CLASS,
    'Vibrato',
    149,
    1,
    'Depois de cantar um verso em volume fraco ou médio, faz um ataque livre com arma equipada, com RA 0 no dano.',
    `Depois de cantar um verso em volume **fraco ou médio**, você pode fazer um **ataque livre** com uma arma equipada, considerando sua RA como **0** ao calcular o dano.`,
  ),
];
