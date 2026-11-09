import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Arcanista';

export const arcanista: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 178,
    summary:
      'Entra em transe e projeta parte da própria alma para fora do corpo, fundindo-se a um Arcano — uma manifestação de almas ancestrais — para ganhar poderes sobrenaturais.',
    body: `Arcanistas podem entrar em um transe profundo e projetar temporariamente uma porção considerável da alma para fora do corpo, dando-lhe forma física. Envolto por essa névoa mágica, o Arcanista ganha várias habilidades sobrenaturais. Dizem que essas formas invocadas são manifestações das almas ancestrais de entidades mitológicas chamadas **Arcanos**. Em alguns mundos, os Arcanos são cultuados como divindades.

## Para pensar no personagem

- De onde vêm seus poderes? São um presente da sua linhagem?
- Você já se comunicou com um Arcano, ou eles são quietos e distantes?
- As pessoas consideram você alguém misterioso, poderoso ou sobrenatural?
- Há muitos praticando a sua magia, ou você é uma exceção?

## Fundir-se a um Arcano

Ao invocar um Arcano, você recebe seus **benefícios de fundição**, que duram até ele ser dispensado. Você não pode invocar um Arcano enquanto está fundido a outro: é preciso dispensar o atual antes. Veja o Poder [[vincular-e-invocar]].

## Dispensar um Arcano

Um Arcano é dispensado de várias formas:

- Quando a cena acaba, todos os Arcanos são dispensados automaticamente.
- Quando você morre ou fica inconsciente fundido a um Arcano, ele é dispensado.
- Quando você sai de cena fundido a um Arcano, ele é dispensado.
- Você pode dispensá-lo **voluntariamente**, sem gastar uma ação. Em um conflito, deve fazê-lo no seu turno e enquanto nenhum outro efeito estiver sendo resolvido.

## Efeitos de dispensar

A maioria dos Arcanos tem um poderoso **efeito de dispensar**, ativado só quando você o dispensa voluntariamente. Em qualquer outro caso, o efeito não é acionado. Você também pode ignorá-lo, se preferir.

Se você está no 20º nível ou acima e o efeito causa dano, esse dano aumenta em **+10**; no 40º nível ou acima, aumenta em **+20**.

## Domínios

Cada Arcano se associa a alguns conceitos-chave, os **domínios**. O Mestre os usa para criar as provações de vinculação e para definir quais rituais o Poder [[arcanismo-ritualista]] permite. Ao criar Arcanos novos para o seu mundo, associe-os a domínios que permitam bons rituais.

## Os Arcanos

### Arcano da Espada

**Domínios:** conquista, heroísmo, liderança.

- **Fundir.** Seus ataques causam 5 pontos de dano adicionais, e todo dano causado por eles perde o tipo e não pode receber um tipo enquanto você estiver fundido (portanto, não é afetado por Afinidades a dano). Ao fazer um ataque, você pode dar a ele a propriedade **multi** (qualquer quantidade de alvos); se fizer isso, o Arcano é dispensado automaticamente depois que o ataque é resolvido (isso não conta como dispensa voluntária).

### Arcano da Forja

**Domínios:** calor, fogo, metal.

- **Fundir.** Você tem Resistência a dano de fogo, e todo dano de fogo que você causa ignora Resistências.
- **Dispensar.** Escolha Forja ou Inferno:
  - **Forja.** Você cria uma arma, armadura ou escudo básicos à sua escolha (páginas 130 a 133). Um item criado antes desaparece se você usar esta opção de novo. Uma arma criada assim causa dano de fogo em vez de físico.
  - **Inferno.** Escolha qualquer número de criaturas que você veja; você causa 30 pontos de dano de fogo em cada uma (esse dano ignora Resistências).

### Arcano da Geada

**Domínios:** frio, gelo, silêncio.

- **Fundir.** Você tem Resistência a dano de gelo e é imune a enfurecido. Todo dano de gelo que você causa ignora Resistências.
- **Dispensar (Era do Gelo).** Escolha qualquer número de criaturas que você veja; você causa 30 pontos de dano de gelo em cada uma (esse dano ignora Resistências).

### Arcano da Roda

**Domínios:** destino, tempo, velocidade.

- **Fundir.** Você é imune a lento e sua Defesa aumenta em +1.
- **Dispensar (Congelar o Tempo).** Escolha qualquer número de criaturas que você veja; cada uma fica lenta. Se uma criatura escolhida já estiver lenta, ela faz uma ação a menos no próximo turno (mínimo de zero ações).

### Arcano da Torre

**Domínios:** julgamento, proteção, sacrifício.

- **Fundir.** Ao invocar este Arcano, escolha um tipo de dano: ar, fogo, gelo, raio, terra ou trevas. Até ele ser dispensado, cada aliado seu em cena tem Resistência ao tipo escolhido (você não recebe essa Resistência).
- **Dispensar (Julgamento).** Escolha qualquer número de criaturas que você veja; você causa 30 pontos de dano de luz em cada uma (esse dano ignora Resistências).

### Arcano do Carvalho

**Domínios:** plantas, terra, veneno.

- **Fundir.** Você tem Resistência a dano de terra e de veneno e é imune a envenenado. Sempre que recupera PV, recupera 5 PV adicionais.
- **Dispensar (Florescer).** Escolha qualquer número de criaturas que você veja (inclusive você); cada uma perde a condição envenenado e recupera 40 PV (50 PV a partir do 20º nível; 60 PV a partir do 40º).

### Arcano do Céu

**Domínios:** chuva, névoa, tempestades.

- **Fundir.** Você tem Resistência a dano de ar e de raio. Pode usar uma ação para descobrir o clima do dia seguinte numa área de raio de dois dias de Viagem; o Mestre responde com informações verdadeiras.
- **Dispensar (Tempestade).** Escolha qualquer número de criaturas que você veja; você causa 30 pontos de dano de raio em cada uma (esse dano ignora Resistências).

### Arcano do Grimório

**Domínios:** compreensão, conhecimento, revelações.

- **Fundir.** Você sabe ler, escrever, falar e entender todos os idiomas. Seu dado de Astúcia é considerado um passo maior (máximo d12).
- **Dispensar (Oráculo).** Faça uma única pergunta ao Mestre; ele responde com sinceridade, descrevendo a visão que o Grimório mostrou. Depois de usado, esse efeito só volta a ficar disponível na manhã seguinte, e a mesma pergunta nunca pode ser feita duas vezes. O Mestre decide quais perguntas são parecidas demais para serem refeitas.

### Arcano do Portão

**Domínios:** espaço, vazio, viagens.

- **Fundir.** Você tem Resistência a dano de trevas e sua Defesa Mágica aumenta em +1.
- **Dispensar.** Escolha Oblívio ou Translocar:
  - **Oblívio.** Escolha qualquer número de criaturas que você veja; você causa 30 pontos de dano de trevas em cada uma (esse dano ignora Resistências).
  - **Translocar.** Você e até cinco outras criaturas voluntárias são teletransportados para um local que você já visitou, a até 1 dia de Viagem.`,
    otherNames: ['Avatar', 'Escolhido', 'Invocador'],
    quote: 'Alguns destinos não podem ser evitados.',
    freeBenefits: ['Aumenta permanentemente seus PM máximos em 5.'],
  }),

  skill(
    CLASS,
    'Arcanismo Ritualista',
    179,
    1,
    'Você pode fazer rituais da disciplina arcanismo, desde que seus efeitos estejam nos domínios de um ou mais Arcanos vinculados; eles usam (VON + VON) no teste de Magia.',
    `Você pode fazer rituais da disciplina **arcanismo**, desde que seus efeitos estejam entre os domínios de um ou mais Arcanos que você vinculou (veja as páginas 180 a 183).

Os rituais de arcanismo usam **(VON + VON)** no teste de Magia.`,
  ),

  skill(
    CLASS,
    'Arcano Emergencial',
    179,
    6,
    'Enquanto você está em crise, o custo de invocar seu Arcano diminui em (NP × 5).',
  ),

  skill(
    CLASS,
    'Círculo Arcano',
    179,
    4,
    'No seu turno, depois de dispensar um Arcano voluntariamente, você pode fazer a ação Feitiço sem gastar uma ação, desde que o feitiço custe no máximo (NP × 5) PM.',
    `No seu turno, depois de **dispensar voluntariamente** um Arcano durante um conflito, você pode fazer a ação **Feitiço sem gastar uma ação** (depois de resolver o efeito gerado por dispensar), se:

- esse Arcano não foi invocado nesse mesmo turno; e
- você tem uma **arma arcana** equipada.

O feitiço lançado assim deve ter custo total de PM igual ou inferior a **(NP × 5)**, e você ainda paga o custo em PM.`,
  ),

  skill(
    CLASS,
    'Regeneração Arcana',
    179,
    2,
    'Ao invocar um Arcano, você recupera (NP × 5) PV.',
  ),

  skill(
    CLASS,
    'Vincular e Invocar',
    179,
    1,
    'Você vincula Arcanos à sua alma para invocá-los depois, gastando uma ação e 40 PM; na criação, você já começa vinculado a um Arcano à sua escolha.',
    `Você pode **vincular** Arcanos à sua alma para **invocá-los** depois. Na primeira vez que encontrar um Arcano, o Mestre dirá os detalhes do processo de vinculação.

Para invocar um Arcano que você já vinculou, use uma **ação** e gaste **40 PM**.

Se escolher este Poder na criação do personagem, você já começa vinculado a um Arcano, à sua escolha. Além disso, novos Arcanos só se obtêm explorando e avançando na história.

Os Arcanos, o que é fundir-se a eles e como dispensá-los estão na página da classe [[arcanista]].`,
  ),
];
