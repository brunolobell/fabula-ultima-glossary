import { inBook, rule } from './helpers';
import { SeedEntry } from './types';

/**
 * Rest, Travel and Transport rules:
 *  - Livro Básico: "Descanso" (printed p. 90-91), "Jornadas e viagens" (p. 106-109)
 *    and "Pontos de Inventário" (p. 104-105, which holds the barraca mágica).
 *  - Natural Fantasy: the optional "Atividades de Acampamento" (p. 130-133).
 *  - Techno Fantasy: the optional "Batalhas em Escala Veicular", with the
 *    "Veículo de grupo" (p. 65-69).
 * Each Entry has one source and page, so the Atlas rules are separate Rules that
 * "Descanso" and the vehicle texts link to.
 */

const restTags = ['regra', 'descanso', 'laços', 'acampamento'];

const descanso = rule(
  'Descanso',
  90,
  'Descansar leva de quatro a seis horas, exige uma barraca mágica, um anfitrião amigável ou um local seguro (nos ermos) ou um quarto ou anfitrião (em assentamentos) e recupera todos os PV, PM e condições dos PJs; na cena de descanso cada PJ ajusta um Laço.',
  `A vida heroica é extenuante, então os PJs precisam descansar com frequência. As opções dependem de onde o grupo está.

## Descanso nos ermos

Longe da segurança de cidades e aldeias, na estrada ou dentro de uma ruína, o grupo precisa ter acesso a **um** destes recursos:

- Uma **barraca mágica**, criada gastando **4 Pontos de Inventário** (veja [[pontos-de-inventario]]). Ela é grande o bastante para o grupo todo.
- A **hospitalidade** de alguém amigável, em geral em troca de ajuda ou de dinheiro.
- Um **local seguro**, sem risco de ataque: um templo consagrado, uma sala secreta, o interior de um transporte blindado, uma área protegida por um círculo mágico etc.

## Descanso em assentamentos

Numa aldeia, vila ou cidade, o grupo precisa ter acesso a **um** destes recursos:

- Um **quarto numa estalagem**, que custa dinheiro: [[descanso-aldeia]] (5z), [[descanso-vila]] (10z) ou [[descanso-cidade]] (20z).
- A **hospitalidade** de alguém amigável, em geral em troca de ajuda ou de dinheiro.

## Efeitos do descanso

Quando um PJ descansa, ele:

- recupera **todos** os seus PV e PM ([[pontos-de-vida]] e [[pontos-de-mana]]);
- se recupera de **todas** as [[condicoes]].

Em geral, é preciso de **quatro a seis horas** de inatividade para descansar.

## Laços e cenas de descanso

Quando os heróis descansam, ganham a chance de interpretar cenas mais calmas e íntimas, chamadas de **cenas de descanso**: dá para falar mais, descrever o que os personagens fazem ao redor da fogueira ou relaxando na vila.

Ao fim da cena de descanso, cada PJ escolhe **uma** destas opções:

- Criar um **novo Laço** com alguém ou algo;
- Adicionar uma **emoção** a um Laço que já existe;
- **Apagar** uma emoção de um Laço que já existe e substituí-la por outra.

Ao criar um Laço ou mudar suas emoções, descreva como e por que a visão do personagem sobre aquela pessoa mudou. Veja [[lacos]].

## Atividades de acampamento (regra opcional)

O Atlas Natural Fantasy traz uma regra opcional que dá mais peso às cenas de descanso: em vez de só mexer nos Laços, cada PJ pode fazer uma **atividade de acampamento** que dá a ele ou a um aliado um benefício até o próximo descanso. Veja todas as regras e as 15 atividades em [[atividades-de-acampamento]].

## Descanso dos NPCs

Estas regras valem **só para os PJs**. O mestre controla por completo o descanso dos NPCs: em geral, quando um NPC entra em cena, assume-se que está com todos os PV e PM e sem nenhuma condição.

## Ritmo e boas práticas

As regras de descanso são generosas porque a maioria dos conflitos deixa os heróis precisando urgentemente de recuperação. Mas dois princípios valem:

- **Descansar leva horas.** Qualquer ameaça imediata pode agir primeiro, ou ao menos preencher uma ou mais seções de um [[relogios]] relevante.
- **Não maximize Laços.** Evite usar a barraca todas as noites de uma jornada tranquila só para encher seus Laços, e não sinta a obrigação de interpretar uma cena de descanso a cada descanso. Faça isso quando sentir que o personagem descobriu algo novo sobre os próprios sentimentos; senão você prejudica interpretações mais significativas no futuro.

Veja também [[jornadas-e-viagens]] e [[servicos-e-transporte]].`,
  restTags,
);

const camp = (name: string, target: string, text: string) =>
  `## ${name}\n\n**Alvo:** ${target}\n\n${text}`;

const campActivities = [
  camp(
    'Aulas de Combate',
    'um aliado',
    'Uma vez antes do próximo descanso, depois de fazer um teste de Precisão ou um teste de Magia para um feitiço ofensivo, o alvo pode somar **+4** ao resultado.',
  ),
  camp(
    'Aulas de Magia',
    'um aliado',
    'Escolha **um** feitiço que você conhece. Uma vez antes do próximo descanso, o alvo pode fazer a ação Feitiço para lançar esse feitiço (ele ainda paga o custo em PM e faz os testes de Magia necessários).',
  ),
  camp(
    'Cartografia',
    'você',
    'Uma vez antes do próximo descanso, depois de o grupo fazer um teste de Viagem (veja [[jornadas-e-viagens]]), você pode rolar o dado de novo, mas **deve manter o novo resultado**.',
  ),
  camp(
    'Colheita',
    'um personagem da classe Gourmet',
    `Você busca ingredientes na área: descreva como e role **1d6**.

- **1.** O grupo todo se envolve, no fim deste descanso, num conflito fácil contra uma ameaça de nível igual ao do grupo.
- **2.** O alvo recebe **2** ingredientes de sabores aleatórios.
- **3 a 5.** O alvo recebe **3** ingredientes de sabores aleatórios.
- **6.** O alvo recebe **3** ingredientes de sabores à escolha dele.`,
  ),
  camp(
    'Corujão',
    'você',
    'Você gera **3 pontos de progresso** para um único projeto à sua escolha (veja [[projetos]]).',
  ),
  camp(
    'Devaneio',
    'você',
    'Uma vez antes do próximo descanso, quando você perder PV por qualquer motivo, pode reduzir essa perda de PV à **metade**.',
  ),
  camp(
    'Exercícios',
    'você',
    'Uma vez antes do próximo descanso, se estiver prestes a sofrer uma ou mais [[condicoes]] vindas da mesma fonte, você pode escolher **não sofrer nenhuma** delas.',
  ),
  camp(
    'Exploração',
    'você ou um aliado',
    `Você procura itens úteis: descreva como e role **1d6**.

- **1.** Você recupera só **metade** dos PV e PM normais neste descanso.
- **2.** O alvo recupera **2 PI**.
- **3 a 5.** O alvo recupera **3 PI**.
- **6.** O alvo recupera **3 PI** e você encontra zênites iguais a (**50 × seu nível**).

Veja [[pontos-de-inventario]].`,
  ),
  camp(
    'Forja de Acampamento',
    'você',
    'Escolha **um**: consertar um item danificado do grupo; ou criar uma única arma, armadura ou escudo **básico** à sua escolha, sem pagar o custo em zênites (veja [[equipamento]]); ou destruir um equipamento do grupo e obter um **material** de valor igual ao custo do item destruído (os materiais são detalhados na p. 74 do Atlas Natural Fantasy).',
  ),
  camp(
    'Massagem',
    'um aliado',
    'Uma vez antes do próximo descanso, se o alvo precisar gastar PM, o custo cai pela **metade**. Isto não vale para o custo de um ritual (veja [[rituais]]).',
  ),
  camp(
    'Mensagem Motivacional',
    'um aliado',
    'Uma vez antes do próximo descanso, se o alvo estiver prestes a recuperar PM, ele pode **dobrar** o número de PM recuperados.',
  ),
  camp(
    'Planejamento',
    'um aliado',
    'Uma vez antes do próximo descanso, depois de o alvo ser o líder de um teste em grupo (veja [[testes-em-grupo]]) ou de fazer um teste para examinar algo ou alguém, ele recebe **+4** no resultado do teste.',
  ),
  camp(
    'Porção Dupla',
    'um aliado',
    'Uma vez antes do próximo descanso, se o alvo estiver prestes a recuperar PV, ele pode **dobrar** a quantidade de PV recuperados.',
  ),
  camp(
    'Sono Profundo',
    'você',
    'Uma vez antes do próximo descanso, você pode fazer uma **ação adicional** no seu turno durante um conflito. Ela deve ser [[equipamento-acao]], [[impedimento]] ou [[inventario]].',
  ),
  camp(
    'Treinamento Marcial',
    'você',
    'Uma vez antes do próximo descanso, quando faz um ataque, você pode dar a ele a propriedade **multi (2)** ou aumentar a propriedade multi dele em **1**.\n\n> **Nota:** o livro diz "antes do próximo descanso *longo*", mas o jogo só tem um tipo de descanso. Tratamos como "próximo descanso", como nas outras atividades.',
  ),
].join('\n\n');

const atividadesDeAcampamento = rule(
  'Atividades de Acampamento',
  130,
  'Regra opcional do Natural Fantasy: cada PJ escolhe duas atividades de acampamento na criação e, numa cena de descanso, pode fazer uma delas para dar a si ou a um aliado um benefício que dura até o próximo descanso.',
  `**Atividades de acampamento** são uma regra opcional que dá mais destaque às cenas de [[descanso]] e mais opções além de criar ou mudar Laços. Foram pensadas para a fantasia bucólica, mas servem a qualquer campanha. A regra não deixa ninguém mais poderoso que o normal; só mais flexível.

## Escolhendo as atividades

Com esta regra, cada PJ recebe **duas atividades de acampamento diferentes**, escolhidas na criação do personagem a partir da lista abaixo. Evite repetir atividades no mesmo grupo e escolha as que combinam com o conceito e a Identidade do personagem.

## Usando as atividades

Numa **cena de descanso**, nos ermos ou num assentamento, cada PJ participante pode fazer **uma** das atividades a que tem acesso: descreve a atividade e aplica os benefícios ao alvo escolhido. Cada personagem decide como usar a própria cena de descanso, sem depender dos outros. Quer faça uma atividade ou não, o PJ ainda pode ajustar seus Laços na cena (veja [[descanso]]).

> **Exemplo:** três heróis descansam numa cidade, pagando 20z cada. Brandon escolhe Sono Profundo para ganhar uma ação adicional depois, Martha prepara uma Porção Dupla para Ylua, que costuma ser alvo das curas do grupo, e Ylua, tocada pela gentileza, usa a cena para fazer uma Colheita de ingredientes para a cozinheira.

## Controlando os benefícios

Muitas atividades dão um benefício que só pode ser usado **uma vez antes do próximo descanso**. Para lembrar quem tem o quê, use marcadores ou outros objetos pequenos que combinem com o PJ que fez a atividade. Se um benefício continuar ativo entre sessões, anote-o num lugar bem visível da ficha.

## Opções e variações

Você pode criar atividades novas para os personagens, mantendo o mesmo nível de poder. Se o grupo adora culinária fantástica, cada atividade pode ser um **prato especial** do personagem, sempre com um aliado como alvo.

${campActivities}

Veja também [[descanso]].`,
  [...restTags, 'regra opcional'],
);

const jornadas = rule(
  'Jornadas e viagens',
  106,
  'Para cada dia de Viagem o mestre define o nível de ameaça da área (d6 a d20) e rola um teste de Viagem: 6 ou mais é um perigo, 1 é uma descoberta; perigos e descobertas ficam a critério do mestre.',
  `Os conflitos são os momentos mais memoráveis de uma sessão, mas explorar o mundo é outra grande parte de Fabula Ultima. O grupo cria o mundo em conjunto no começo do jogo, mas isso não quer dizer que sabe tudo sobre ele: há muitas descobertas, e muitos perigos, esperando pelos heróis.

## Etapas da viagem

Quando o grupo parte numa jornada, o mestre registra o avanço na **ficha de mapa**. A unidade básica é o **dia de Viagem**, a distância média percorrida no mapa em um dia, **a pé**. Na criação do mundo, o mestre e o grupo definem a duração de um dia de Viagem na ficha de mapa. Um transporte (montaria ou veículo, veja [[servicos-e-transporte]]) multiplica essa distância.

Para **cada dia de Viagem** da jornada, o mestre faz o seguinte:

1. **Determina o nível de ameaça** das áreas por onde o grupo passa (veja a tabela abaixo). Se houver mais de um nível, vale **só o mais alto**.
2. **Faz um teste de Viagem** com o dado do nível de ameaça:
   - Resultado **6 ou mais**: o grupo encontra um **perigo**.
   - Resultado **1**: o grupo faz uma **descoberta inesperada**.

   O mestre decide onde fica cada perigo e cada descoberta e, se precisar, marca a posição na ficha de mapa.
3. A menos que um perigo os detenha, os personagens seguem para o próximo dia de Viagem (volte à etapa 1) ou chegam ao destino.

Os dias de Viagem sempre se **arredondam para cima**: uma jornada de dois dias e meio conta como três. O mestre tem a palavra final sobre quantos dias leva uma jornada.

## Nível de ameaça

| Nível de ameaça | Dado de Viagem | Áreas de exemplo |
| --- | --- | --- |
| Mínimo | d6 | Aldeias, cidades, áreas protegidas |
| Baixo | d8 | Pradarias, estradas patrulhadas, zonas interioranas |
| Médio | d10 | Bosques, colinas, rios |
| Alto | d12 | Florestas, montanhas, mar aberto, pântanos |
| Muito alto | d20 | Desertos, ermos gélidos, selvas, vulcões |

Uma área patrulhada sob controle inimigo ou uma pradaria tomada por monstros hostis representa, claro, um perigo alto ou muito alto. O mestre tem a palavra final sobre o nível de ameaça de um dia de Viagem.

> **Exemplo:** o grupo sai da aldeia de Relde rumo às Colinas Kanka, onde procura um antigo túnel de mineração. O mestre decide que são dois dias de Viagem: um até as colinas e outro para explorá-las. No primeiro dia o grupo cruza pradarias (d8) e colinas (d10); vale só o dado mais alto, d10, mas há rumores de bandidos nas pradarias e o mestre sobe a ameaça para alta (d12). Sai 7: é um perigo! Quatro assaltantes acompanhados por um uivante-cinzento (uma criatura lupina) atacam, e os PJs vencem num conflito rápido. Antes do segundo dia, usam uma barraca mágica para descansar (veja [[descanso]]). No segundo dia rolam um d10 e tiram 1: uma descoberta! Eles acham a entrada dos túneis antigos, e uma mercadora viajante pede escolta na mina, oferecendo itens ou informações.

## Perigos

Os personagens devem poder **evitar** um perigo com um [[testes-em-grupo]], com uma série de testes ou, raramente, numa cena de conflito. Exemplos de perigos:

- Clima severo, como tempestades de areia ou frio intenso.
- Pântanos poluídos, tomados por miasmas tóxicos ou mortos-vivos famintos.
- Monstros ferozes e territoriais ou grupos de criaturas hostis.
- Encontros repentinos e infelizes com rivais ou antagonistas.
- Riscos de perder itens importantes.

O dano de um perigo sai desta tabela:

| Nível | Dano fraco | Dano forte | Dano intenso |
| --- | --- | --- | --- |
| 5+ | 10 | 30 | 40 |
| 20+ | 20 | 40 | 60 |
| 40+ | 30 | 50 | 80 |

[[condicoes]] também são boas consequências para um perigo: um pântano poluído pode deixar os PJs envenenados.

## Descobertas

Descobertas não acontecem com tanta frequência, então cada uma deve ser **especial e útil**. Exemplos:

- Uma entrada protegida para uma ruína antiga. Que tesouros ela guarda?
- Uma caravana mercante ou um grupo de criaturas solícitas.
- Uma aldeia reclusa ou um refúgio desconhecido.
- Um item precioso ou uma informação.

Descobertas são **sempre boas**: mesmo um local perigoso deve guardar uma recompensa que compense muito.

## Atualizando o mapa do mundo

Durante o jogo, o mestre pode acrescentar locais e assentamentos à ficha de mapa quando quiser, em geral quando o grupo encontra uma nova área perigosa ou um ponto de interesse, ou quando alguém lhe informa o lugar exato. Os **jogadores** também podem incluir áreas no mapa gastando **1 Ponto de Fabula** para acrescentar um elemento narrativo (veja [[pontos-de-fabula]]).

Veja também [[descanso]] e [[servicos-e-transporte]].`,
  ['regra', 'viagem', 'jornada', 'perigo', 'descoberta', 'mapa'],
);

const pontosDeInventario = rule(
  'Pontos de Inventário',
  104,
  'Cada PJ carrega até 6 PI, uma reserva abstrata de equipamento útil que ele gasta para criar na hora poções, fragmentos elementais ou uma barraca mágica; PI voltam por 10z cada em locais que vendam equipamento.',
  `**Pontos de Inventário (PI)** representam uma reserva abstrata de equipamentos úteis e itens consumíveis que os PJs têm. Via de regra, um personagem carrega no máximo **6 PI**, mas algumas classes e Poderes aumentam esse limite.

## Gastando PI

Sempre que precisar de um item consumível da lista abaixo, você pode gastar a quantidade adequada de PI para **criá-lo na mochila** e aplicar o efeito. Todos os PI gastos assim devem vir do **mesmo personagem**. O item deve ser usado **imediatamente** e é destruído no processo: não dá para criar algo e "guardar para depois".

| Item | Custo em PI | Efeito |
| --- | --- | --- |
| **Poções** | | |
| Elixir | 3 | Uma criatura recupera 50 PM. |
| Remédio | 3 | Uma criatura recupera 50 PV. |
| Tônico | 2 | Uma criatura se recupera de todas as condições. |
| **Utilidade** | | |
| Fragmento elemental | 2 | Você causa 10 pontos de dano de um tipo à sua escolha (ar, fogo, gelo, raio ou terra) a uma criatura que você veja. |
| Barraca mágica | 4 | Permite que o grupo descanse nos ermos (veja [[descanso]]). |

Esta tabela também está na ficha de grupo, que tem espaços em branco para anotar itens de inventário personalizados do seu mundo. Alguns Poderes de classe permitem usar PI de outras formas; mesmo que exijam a ação [[inventario]], você pode fazer isso **fora de conflitos**.

## Recuperando PI

Os personagens recuperam PI em vilas, aldeias ou outros locais onde dá para comprar equipamento útil: o custo é de **10 zênites por PI** ([[recarga-de-pi]]). A critério do mestre, também podem recuperar PI em circunstâncias especiais, como achar a mochila de um aventureiro ou ganhar uma recompensa por ajudar uma aldeia.

Os PI atuais **nunca** passam dos PI máximos.

## Compartilhando PI

Personagens **não podem** redistribuir PI entre si.

## Equipamento e ferramentas

Assume-se que todo PJ carrega o equipamento e as ferramentas adequados à sua Identidade ou ao seu papel de aventureiro, então não é preciso registrar tochas, cordas, cobertores etc. Se o personagem precisa de um item básico de aventureiro, ele o tem.

Se precisar de um item **incomum** ou que não combine com a Identidade, o mestre pode deixá-lo gastar PI (em média **de 2 a 4**) para "milagrosamente" pegar o item da mochila.

> **Exemplo:** uma personagem de Identidade "Princesa dos Ladrões" certamente carrega gazuas de qualidade; um nobre cavaleiro precisa gastar PI para pegá-las na mochila.

Itens criados assim **não** são destruídos na hora, mas não podem ser vendidos por mais de **cinco vezes o custo em PI**: um item de 2 PI vale no máximo 10 zênites. Ferramentas e equipamentos semelhantes permitem coisas que antes seriam impossíveis, mas **nunca** dão benefícios mecânicos.

Veja também [[equipamento]].`,
  ['regra', 'inventário', 'pi', 'barraca mágica', 'descanso'],
);

const escalaVeicular = rule(
  'Batalhas em Escala Veicular',
  65,
  'Regras opcionais do Techno Fantasy para lutas com transportes e criaturas de tamanho parecido: três tamanhos (pequeno, médio, grande), quem interage com quem, veículos inimigos como construtos e o veículo de grupo, que luta como uma única criatura controlada pela tripulação.',
  `Estas regras opcionais dão mais profundidade mecânica a batalhas com **meios de transporte** e criaturas de tamanho semelhante. Servem sobretudo a campanhas de pilotos (veja a classe Piloto, no Techno Fantasy) ou com muitos combates entre veículos.

## Três tamanhos

Criaturas e transportes se dividem em três tamanhos:

- **Pequeno:** personagens individuais, a maior parte das criaturas e os pilotos dirigindo veículos de estrutura exoesqueleto.
- **Médio:** a maioria dos veículos terrestres, barcos, tanques, jatos militares e caças espaciais, e pilotos dirigindo Montarias ou Mechas (os demais passageiros do veículo continuam pequenos). Inclui criaturas imponentes, como dragões e gigantes.
- **Grande:** galeões, cargueiros aéreos, dirigíveis, espaçonaves, fortalezas móveis e raros seres colossais, como baleias espaciais ou titãs: entidades que os PJs não enfrentam diretamente na maioria das campanhas.

Algo **maior que grande** (uma nave do tamanho de um planeta, por exemplo) é tratado como um **ambiente** e não participa de conflitos, mas o grupo pode enfrentar um pedaço dele, como um canhão antimatéria de tamanho grande.

## Interações

- **Pequenas** interagem com pequenas e médias. Também podem afetar entidades grandes, mas só com [[relogios]], [[projetos]] ou [[rituais]].
- **Médias** interagem com entidades de qualquer tamanho.
- **Grandes** interagem normalmente com médias e grandes. Mas se uma entidade grande faz uma pequena **perder PV**, a pequena é reduzida **automaticamente a 0 PV**.

A expectativa é que pequenas e grandes quase nunca interajam direto, pois uma aniquilaria a outra.

## Veículos como NPCs

Para criar a ficha completa de um veículo **inimigo**, projete-o como uma criatura da espécie **construto**:

- Se um **vilão** opera o veículo, ele é tratado como uma forma desse vilão e usa os [[pontos-de-ultima]] dele, além de todas as regras de vilões.
- Se os passageiros podem continuar lutando depois de o veículo ser destruído, trate-os como uma **segunda fase** da batalha, com uma ficha de combate separada.
- Se os PJs estão a bordo de um veículo e enfrentam tropas de tamanho humano, descrever essas tropas como **enxames** (Livro Básico, p. 297) é um jeito simples de mostrar a escala da batalha. O mesmo vale para lutas a bordo de um veículo de grupo ou contra agrupamentos de adversários.

O objetivo é evitar complicações desnecessárias, aproveitando as convenções clássicas dos JRPGs para tratar vários cenários sem mudar nenhuma regra.

## Veículo de grupo

Esta última regra opcional é mais complexa. Serve a grupos que obtiveram um transporte **médio ou grande adequado ao combate**: com ele os heróis entram em conflitos contra veículos inimigos e adversários de tamanho parecido, como uma perseguição de caças num campo de asteroides ou uma batalha contra uma fortaleza voadora.

As regras abaixo valem **só durante conflitos**. Fora deles, o veículo de grupo só tem as habilidades de viagem de [[servicos-e-transporte]] e [[servicos-e-transporte-viagem-espacial]]. Use a regra apenas se espera que **pelo menos um terço** das batalhas da campanha aconteça a bordo, especialmente se um PJ tem a peculiaridade [[transporte-roubado]].

### Criando um veículo de grupo

Jogadores e mestre criam a ficha **juntos**, com estas regras:

- O veículo é um **construto de patente soldado**, de nível igual ao do PJ de maior nível presente na cena em que o grupo o obtém.
- Sempre que o grupo [[descanso]] num porto, estaleiro ou outro local que permita a manutenção, o nível do veículo passa a ser igual ao do personagem de maior nível do grupo, e a ficha pode ser **modificada e reescrita** livremente, de novo em conjunto. Descreva as novas personalizações!
- Tem **até três ataques básicos** e **3 poderes a mais** que um construto normal do nível dele, mas não recebe poderes de classe e não pode ter Iniciativa Extra nem Uso de Equipamento como poderes de NPC.
- Causa **5 pontos de dano adicional** com ataques e feitiços. Ao subir de nível, recebe todos os aumentos de atributo e bônus para testes e dano dos passos 4 e 8 da criação de NPCs (Livro Básico, p. 302-303).
- Deve ter acesso a **pelo menos 3 tipos de dano** diferentes entre ataques, feitiços e outras habilidades, para que o mestre tenha liberdade ao criar os adversários.
- **Não tem Iniciativa.**

Dê um nome memorável ao veículo: a partir de agora, ele é praticamente um membro do grupo.

### Veículo de grupo em conflitos

Quando um conflito gira em torno de veículos e transportes, ou envolve adversários médios ou grandes, o mestre pode declarar que o veículo de grupo está disponível nessa batalha (se estiver disponível na narrativa). Se o grupo concordar, valem as regras abaixo. O conflito deve ter **só os PJs e seus inimigos**; NPCs aliados ficam como figurantes ou lutam a bordo de seu próprio veículo, com turnos independentes.

- Ao definir os participantes, cada PJ declara se participa como **tripulante** do veículo de grupo ou como **personagem individual**, fora dele (a segunda opção é só para pilotos com veículos pessoais de tamanho apropriado).
- O veículo **não faz teste de Iniciativa**, mas os tripulantes fazem.
- No turno de um tripulante, o veículo joga o turno **no lugar dele**, e as ações são escolhidas pelo jogador que controla esse tripulante. Efeitos baseados em turnos (Livro Básico, p. 77) seguem os turnos do veículo, não os de um tripulante específico.
- O veículo começa todo conflito com **PV máximos** iguais aos da ficha **multiplicados pelo número de tripulantes**, **crise** igual à metade dos PV máximos, PV e PM atuais iguais ao máximo e nenhuma condição.
- Se chegar a **0 PV**, o veículo se **rende** automaticamente e fica inativo até o fim do conflito. O mestre aplica as consequências da rendição ao veículo ou à tripulação, como preferir (veja [[zero-ponto-de-vida]]).

Os PJs tripulantes **não estão "presentes na cena"** e só usam as próprias habilidades assim:

- Quando o veículo faz um teste, qualquer tripulante pode gastar Pontos de Fabula para evocar Laços e/ou Traços, inclusive os Traços do veículo ([[pontos-de-fabula]]).
- O veículo tem acesso a todos os [[rituais]] que os tripulantes podem fazer. Quando lança um feitiço no turno dele, também tem acesso a todos os feitiços conhecidos pelo tripulante que o controla.
- No turno dele, o veículo pode gastar os **PM do tripulante que o controla** em vez dos seus.
- No turno dele, o veículo pode fazer a ação [[inventario]] gastando os **PI do tripulante que o controla**, mas só com estes itens: remédio, elixir, tônico e fragmento elemental (veja [[pontos-de-inventario]]).
- No turno dele, quando faz a ação [[estudo]], o tripulante que o controla pode aplicar qualquer habilidade que beneficie testes abertos e testes para examinar criaturas, locais ou itens.

### Avisos

Estas regras partem da premissa de que a batalha é um **minijogo autocontido**, travado do começo ao fim com tripulantes e personagens independentes **nas mesmas posições**, sem ninguém entrar ou sair do veículo. Se o grupo abordar um veículo inimigo, ou se a segunda fase do conflito for um combate em escala pessoal, voltem às regras normais.

### Exemplo: Gladsheimr

A Gladsheimr é a nave do Comandante Skadi, uma grande nave interestelar obtida pela peculiaridade [[transporte-roubado]]. Em resumo:

> **Exemplo:** construto de **nível 5**, com os Traços experimental, ágil, majestosa e simplificada. Atributos: DES d10, AST d8, VIG d8, VON d6. **60 PV, 45 PM**, sem Iniciativa, DEF 0 e DEF.M +0. **Baterias de Arma Laser:** (DES + AST) +3, (RA + 10) de dano de fogo, multi (2). **Foguete de Energia Espiritual:** (DES + VIG) +3, (RA + 15) de dano de luz. **Artilharia de Pulso** (feitiço, 10 PM, uma criatura, instantâneo): (RA + 20) de dano de raio e deixa o alvo lento. É imune a envenenado, voa e tem **Baterias de Mira Rápida**: depois de ser alvo de um ataque inimigo, acertada ou não, se o resultado do teste de Precisão for **par**, pode fazer um ataque livre com as Baterias de Arma Laser contra aquele inimigo, sem multi (2) e com a RA do teste contando como 0 para o dano.

Veja também [[jornadas-e-viagens]].`,
  ['regra', 'regra opcional', 'veículo', 'transporte', 'batalha', 'tecnologia'],
);

export const restAndTravelRules: SeedEntry[] = [
  descanso,
  pontosDeInventario,
  jornadas,
  ...inBook('natural-fantasy', [atividadesDeAcampamento]),
  ...inBook('techno-fantasy', [escalaVeicular]),
];
