import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Arcanista';

export const arcanista: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 178,
    summary:
      'Entra em transe e projeta parte da própria alma para fora do corpo, fundindo-se a um Arcano (uma manifestação de almas ancestrais) para ganhar poderes sobrenaturais.',
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

Cada Arcano se associa a alguns conceitos-chave, os **domínios**. O Mestre os usa para criar as provações de vinculação e para definir quais rituais o Poder [[arcanismo-ritualista]] permite. Ao criar Arcanos novos para o seu mundo, associe-os a domínios que permitam bons rituais (dicas e exemplos em [[magia-e-rituais-atlas]]).

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
  - **Translocar.** Você e até cinco outras criaturas voluntárias são teletransportados para um local que você já visitou, a até 1 dia de Viagem.

## Arcanos do Bestiary Vol. I

Seis criaturas do Compêndio do Bestiary Vol. I (inglês, não oficial; tradução nossa) listam um Arcano entre as recompensas: a [[gorgona]], a [[harpia]], a [[fenix]], a [[ondina]], o [[unicornio]] e a [[zirnitra]]. As regras completas deles estão nas p. 338 a 343 desse livro, resumidas abaixo. Não é preciso enfrentar essas criaturas para vincular o Arcano delas; os perfis existem para o caso de elas estarem corrompidas, aliadas a um antagonista ou testando os heróis.

Estes Arcanos são mais complexos e têm mais personalidade que os do Livro Básico. Se o grupo achar demais, pode simplificá-los: por exemplo, uma Harpia cujo efeito de fundir só dá Resistência a ar e aumenta a Destreza, e cujo efeito de dispensar causa direto 40 de dano, sem acúmulo de pontos. Quem joga o Arcanista tem a palavra final.

Se o grupo concordar, a Górgona, a Harpia, a Fênix, a Ondina e o Unicórnio podem ser o Arcano inicial do Poder [[vincular-e-invocar]]. Zirnitra não é boa escolha inicial: sua natureza e seu poder combinam mais com o ápice da jornada de um Arcanista, talvez como um Arcano esquecido descoberto pelo Poder Heroico [[revelacao]].

### Arcano da Górgona

*Guardiã Cardeal do Deserto Ocidental.* **Domínios:** terra, meditação, compreensão.

- **Fundir (Abraço Titânico).**
  - Você tem Resistência a dano de terra.
  - Ao causar dano, você pode fazer o tipo dele virar terra.
  - Ao causar dano de terra, você causa 5 pontos de dano adicionais.
  - Uma vez por turno em conflito, ao atacar com uma arma equipada, escolha uma opção: o ataque ganha **multi (2)**; ou, se for corpo a corpo, ele pode ter como alvo criaturas que normalmente não poderiam ser alvo de ataques corpo a corpo; ou todos os inimigos que perderem PV por esse ataque ficam atordoados.
- **Dispensar (Força Emergente).** Escolha uma opção: você e cada aliado em cena tratam Vigor e Vontade como um passo maior (máximo d12) até o fim do seu próximo turno; ou você causa 30 pontos de dano de terra a cada inimigo que veja e que não esteja voando, flutuando, caindo ou de outro modo no ar (esse dano ignora as Resistências e Imunidades de criaturas atordoadas).

### Arcano da Harpia

*Guardiã Cardeal do Oceano Oriental.* **Domínios:** determinação, velocidade, vento.

- **Fundir (Corrente Ascendente Turbulenta).**
  - Você tem Resistência a dano de ar.
  - Enquanto não tiver armadura marcial equipada, trate sua Destreza como um passo maior (máximo d12).
  - Uma vez por turno em conflito, você pode usar a ação Poder para causar dano de ar igual a **(10 + o número de faces do seu dado de Destreza atual)** a até dois inimigos que veja; os que perderem PV assim também ficam fracos. Depois, você ganha 1 **Ponto de Turbulência** (2, se escolheu afetar só um inimigo). O dano aumenta em 5 a partir do 20º nível e em 10 a partir do 40º.
  - Ao dispensar o Arcano, você perde todos os Pontos de Turbulência.
- **Dispensar (Golpe de Furacão).** Escolha ar ou físico: você causa dano do tipo escolhido igual a **(10 + os Pontos de Turbulência que perdeu ao dispensar × 10)** a um inimigo que veja. Se perdeu 2 ou mais Pontos, o dano ignora Resistências. Se um inimigo voador perder PV por esse dano, é obrigado a pousar de imediato.

### Arcano da Fênix

*Guardiã Cardeal do Vulcão do Norte.* **Domínios:** purificação, fogo, renascimento.

- **Fundir (Coroa Flamejante).**
  - Você tem Resistência a dano de fogo.
  - Uma vez por turno em conflito, você pode usar a ação Poder para escolher uma opção: causar dano de fogo igual a **(10 + (5 × a maior força entre seus Laços))** a até dois inimigos que veja; ou fazer uma criatura que veja se recuperar de todas as condições e, se você estiver em chamas, também recuperar 20 PV. O dano aumenta em 5 a partir do 20º nível e em 10 a partir do 40º.
  - Quando você chega a 0 PV e não está em chamas, em vez disso fica de pé com exatamente 1 PV e passa a ficar em chamas.
  - Ao dispensar o Arcano, se estiver em chamas, você deixa de estar.
- **Dispensar (Bênçãos do Fogo).** Escolha uma opção:
  - **Calor purificador.** Você e cada aliado em cena recuperam 30 PV e se recuperam de todas as condições. O valor sobe para 40 PV a partir do 30º nível e aumenta em mais 10 PV se você estava em chamas ao dispensar.
  - **Chuva de plumas em brasa.** Você causa 20 pontos de dano de fogo a cada inimigo que veja (esse dano ignora Resistências), mais 10 de dano adicional se estava em chamas ao dispensar.

### Arcano da Ondina

*Guardiã Cardeal das Montanhas do Sul.* **Domínios:** gelo, percepção, proteção.

- **Fundir (Imperatriz da Neve Eterna).**
  - Você tem Resistência a dano de gelo.
  - Ao se fundir, você ganha 5 **Pontos de Permafrost**. Nunca pode ter mais de 5, e perde os que restarem ao dispensar o Arcano.
  - Uma vez por turno em conflito, você pode usar a ação Poder para causar dano de gelo igual a **(20 + seus Pontos de Permafrost atuais)** a um inimigo que veja; depois, perde 1 Ponto de Permafrost. O dano aumenta em 5 a partir do 20º nível e em 10 a partir do 40º.
  - Quando você e/ou aliados em cena sofrem dano, ele diminui em um valor igual aos seus Pontos de Permafrost atuais (antes das Afinidades); em seguida, você perde 1 Ponto de Permafrost.
- **Dispensar (Decreto Abaixo de Zero).** Escolha uma opção:
  - **Fenda de avalanche.** Você causa 30 pontos de dano de gelo a cada inimigo que veja (esse dano ignora Resistências e diminui em 5 para cada Ponto de Permafrost perdido ao dispensar).
  - **Barreira da alma de inverno.** Para cada Ponto de Permafrost perdido ao dispensar, escolha um tipo entre trevas, gelo, luz, físico e veneno. Até o fim do seu próximo turno, você e cada aliado em cena têm Resistência a cada tipo escolhido. Se perdeu menos de 2 Pontos, escolhe um único tipo, e o efeito dura até o fim da cena ou até você usar a Barreira da alma de inverno de novo.

### Arcano do Unicórnio

*Guardião Cardeal das Planícies Centrais.* **Domínios:** adivinhação, raios, punição.

- **Fundir (Aura Crepitante).**
  - Você tem Resistência a dano de raio.
  - Ao sofrer dano de um tipo diferente de terra, você ganha 1 **Ponto de Raio** (2, se estiver em crise).
  - Todo dano que você causa vira de raio, o tipo não pode mudar e o dano ignora Resistências.
  - Ao causar dano de raio estando hipercondutor, você causa dano adicional igual aos seus Pontos de Raio.
  - Ao dispensar o Arcano, você perde todos os Pontos de Raio.
- **Dispensar (Descarga Trovejante).** Você causa 40 pontos de dano de raio a um inimigo que veja (o dano ignora Resistências se você estiver hipercondutor). Se uma criatura perder PV por esse dano e estiver afetada por feitiços de duração Cena, ela deixa de ser afetada por todos eles. Depois, se você perdeu 5 ou mais Pontos de Raio ao dispensar e não está hipercondutor, pode invocar este Arcano de novo na hora (sem ação e sem PM). Se fizer isso, você fica hipercondutor e não pode dispensá-lo por vontade própria até o início do seu próximo turno.

### Arcano de Zirnitra

*A antiga deusa-dragão das almas e da feitiçaria.* **Domínios:** energia, magia, renovação.

- **Fundir (Halo de Luz e Sombra).**
  - Você tem Resistência a dano de trevas e de luz.
  - Você pode lançar [[dissipar]], [[fulgur]], [[glacies]], [[ignis]] e [[reforcar]], mesmo sem tê-los aprendido (listas do Elementalista, do Entropista e do Espiritualista do Livro Básico).
  - Ao lançar um feitiço ofensivo, você pode usar **(VON + VON)** no teste de Magia; se fizer isso, também ganha um bônus nesse teste igual ao dobro do número de criaturas alvo do feitiço.
  - Ao lançar um feitiço, você pode ignorar o custo em PM; depois de ignorar dois custos assim, o Arcano é dispensado automaticamente (depois de resolvido o feitiço; isso não conta como dispensa voluntária).
- **Dispensar (Verdades da Destruição e da Criação).** Escolha uma opção:
  - **Favor da Deusa-Dragão.** Uma criatura que você veja recupera 999 PV e se recupera de todas as condições.
  - **Guardiã do Grande Ritual.** Até o fim da cena, você pode fazer rituais das disciplinas elementalismo, entropismo, ritualismo e espiritualismo. O primeiro ritual da cena custa metade dos PM, e esse custo não pode ser alterado por outro efeito. Só pode ser escolhida uma vez por cena e nunca em cena de conflito.
  - **Nitraclismo.** Você causa 30 pontos de dano a cada inimigo que veja: de luz, se não estiver em crise, ou de trevas, se estiver. O dano ignora Resistências e também Imunidades e Absorções de inimigos de patente campeã.`,
    otherNames: ['Avatar', 'Escolhido', 'Invocador'],
    quote: 'Alguns destinos não podem ser evitados.',
    traits: ['mp'],
    freeBenefits: ['Aumenta permanentemente seus PM máximos em 5.'],
  }),

  skill(
    CLASS,
    'Arcanismo Ritualista',
    179,
    1,
    'Você pode fazer rituais da disciplina arcanismo, desde que seus efeitos estejam nos domínios de um ou mais Arcanos vinculados; eles usam (VON + VON) no teste de Magia.',
    `Você pode fazer rituais da disciplina **arcanismo**, desde que seus efeitos estejam entre os domínios de um ou mais Arcanos que você vinculou (veja as páginas 180 a 183).

Os rituais de arcanismo usam **(VON + VON)** no teste de Magia.

Veja [[rituais]]. Para criar Arcanos novos e ver dois exemplos prontos, veja [[magia-e-rituais-atlas]].`,
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
