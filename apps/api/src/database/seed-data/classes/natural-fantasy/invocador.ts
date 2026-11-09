import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Invocador';

export const invocador: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 154,
    summary:
      'Estuda o fluxo natural de energia das almas e acessa os mananciais elementais da cena (ar, terra, fogo, raio, água) para fazer invocações de dano, praga, cura ou controle.',
    body: `Invocadores estudam a energia inata das almas e a forma como ela flui e se manifesta espontaneamente ao redor. Mesmo canalizando poder elemental, a arte deles se adapta às fontes que já existem, em vez de forçar um resultado antinatural e perturbar o fluxo espiritual.

Ainda assim, são aventureiros formidáveis, muito flexíveis e com uma afinidade única com as criaturas elementais.

## Para pensar no personagem

- Como você desenvolveu a arte da invocação?
- Há um espírito ou criatura elemental com quem você tem um vínculo único?
- Como suas invocações se manifestam?
- Suas habilidades são comuns ou você é uma exceção?

## Mananciais disponíveis

Em cada cena há **dois mananciais diferentes** nos arredores; o Mestre diz quais são. Descreva como eles se manifestam (elementos naturais, objetos, até criaturas).

> **Exemplo:** numa batalha em uma aeronave a vapor dentro de nuvens de tempestade, quaisquer dois entre ar, fogo, raio e água fariam sentido.

## Como fazer uma invocação

Ao fazer uma [[invocacao]], escolha uma opção a que tenha acesso (desde que o manancial dela esteja na cena) e aplique os efeitos a uma criatura que você veja. O seu **NP em Invocação** define o acesso:

- **NP 1:** invocações do tipo **explosão**.
- **NP 2:** **explosão** e **praga**.
- **NP 3:** todas.

> **Exemplo:** com mananciais de ar e terra na cena e NP 2, você tem Aero Explosão, Aero Praga, Geo Explosão e Geo Praga.

A partir do **20º nível**, invocações que causam dano causam +5 (+10 a partir do 40º). Também a partir do 20º nível, as que fazem o alvo recuperar PV ou perder PM aumentam em 10 (20 a partir do 40º).

## Mananciais e invocações

Uma **praga** dura até o início do seu próximo turno: o alvo sofre 5 pontos de dano adicional de todas as fontes dos dois tipos indicados.

| Manancial | Explosão (20 de dano) | Praga (+5 de dano de…) | Terceira | Quarta |
| --- | --- | --- | --- | --- |
| **Ar** (dano de ar) | Aero Explosão | Aero Praga: raio e fogo | Brisa: alvo recupera 30 PV | Tornado: 10 de dano de ar e atordoado |
| **Terra** (dano de terra) | Geo Explosão | Geo Praga: ar e gelo | Germinar: alvo recupera 30 PV | Areia Movediça: 10 de dano de terra e lento |
| **Fogo** (dano de fogo) | Pyro Explosão | Pyro Praga: terra e gelo | Centelha: 10 de dano de fogo e abalado | Fumaça: alvo perde 20 PM e fica fraco |
| **Raio** (dano de raio) | Electro Explosão | Electro Praga: terra e fogo | Estática: 10 de dano de raio e lento | Trovão: alvo perde 20 PM e fica atordoado |
| **Água** (dano de gelo) | Hidro Explosão | Hidro Praga: ar e raio | Calafrio: alvo perde 20 PM e fica atordoado | Congelamento: 10 de dano de gelo e fraco |

A "Explosão" de cada manancial causa 20 pontos de dano do tipo do manancial.`,
    otherNames: ['Assecla', 'Canalizador', 'Mestre das Cinco Almas'],
    quote: 'Anseie pela compreensão, não pelo controle.',
    freeBenefits: [
      'Aumenta permanentemente seus PV ou PM máximos em 5 (à sua escolha).',
    ],
  }),

  skill(
    CLASS,
    'Cascata',
    155,
    5,
    'Depois que um inimigo perde PV por dano de um aliado reforçado por uma praga sua, você faz um ataque livre contra ele com bônus de Precisão igual ao NP, no tipo de dano do aliado, e as pragas no alvo se dissipam.',
    `Depois que um inimigo que você veja perder PV por dano causado por um aliado seu, se esse aliado causou dano adicional graças a uma das suas invocações do tipo **praga**, você pode fazer um **ataque livre** com uma arma equipada.

- O ataque só pode ter o mesmo inimigo como alvo e você recebe bônus de Precisão igual a **(NP)**.
- Se atingir, todo o dano do ataque é do **mesmo tipo** que o aliado causou, e todas as invocações de praga no alvo se **dissipam** depois do ataque.
- Se dois ou mais inimigos engatilharem o poder ao mesmo tempo, você pode atacar cada um, na ordem que preferir.`,
  ),

  skill(
    CLASS,
    'Expandir Manancial',
    155,
    5,
    'Equipado com arco, arma arcana, arremessável, de luta, espada ou mangual: invocações de explosão causam NP a mais e o dano adicional das pragas aumenta em NP.',
    `Enquanto estiver equipado com um **arco, arma arcana, arma arremessável, arma de luta, espada ou mangual**, suas invocações do tipo **explosão** causam **(NP)** pontos de dano adicional, e o dano adicional das suas invocações do tipo **praga** aumenta em **(NP)**.`,
  ),

  skill(
    CLASS,
    'Harmonia Elemental',
    155,
    2,
    'Você fala com criaturas elementais; ao restaurar PV com invocação ou feitiço com um elemental na cena, restaura NP × 5 PV a mais.',
    `Você consegue se comunicar verbalmente com **criaturas elementais**.

Ao restaurar os PV de uma criatura com uma invocação ou feitiço, se houver um elemental presente na cena, o efeito restaura **(NP × 5)** PV adicionais.`,
  ),

  skill(
    CLASS,
    'Invocação',
    155,
    3,
    'Por uma ação e 5 PM, faz uma invocação usando a energia de um manancial presente na cena; o NP define quais invocações você acessa.',
    `Você pode usar uma ação e gastar **5 PM** para fazer uma invocação acessando a energia de um dos **mananciais** presentes na cena (veja o corpo da classe [[invocador]]). Seu **(NP)** determina a quais invocações você tem acesso.`,
  ),

  skill(
    CLASS,
    'Invocações Conectadas',
    155,
    3,
    'Ao invocar, gaste até NP × 10 PM extras: a cada 10 PM, a invocação alcança uma criatura adicional que você veja.',
    `Ao fazer uma [[invocacao]], você pode gastar até **(NP × 10)** PM adicionais. A cada **10 PM** gastos assim, a invocação pode ter **uma criatura adicional** que você veja como alvo.`,
  ),
];
