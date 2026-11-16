import { rule } from './helpers';
import { SeedEntry } from './types';

/**
 * The Actions of a conflict (Livro Básico, "Ações", printed p. 66-75): a hub Rule
 * ("Ações") plus one Rule per Action that needs its own page. Poder, Feitiço and
 * Outro are short and live in the hub. Trabalho em equipe and the conflict-ending
 * rules (p. 76-77) are not seeded yet.
 */
const tags = ['regra', 'combate', 'ação', 'conflito'];

export const actionRules: SeedEntry[] = [
  rule(
    'Ações',
    66,
    'Em um conflito, o foco do seu turno é uma ação (Ataque, Poder, Feitiço, Estudo, Guarda, Impedimento, Objetivo, Inventário, Equipamento ou Outro), e há também ações menores que cabem junto dela.',
    `Uma ação não é só um gesto: é **o foco do seu turno** e uma escolha tática. Com [[ataque]] você faz uma manobra ofensiva completa; com [[estudo]] você se concentra em obter informações essenciais, e assim por diante.

## As ações

| Ação | O que você faz |
| --- | --- |
| [[ataque]] | Um ataque corpo a corpo ou à distância. |
| Poder | Usa um Poder que exige uma ação. |
| Feitiço | Lança um feitiço que aprendeu. |
| [[estudo]] | Tenta obter informações sobre alguém ou algo, em geral com um teste aberto de (AST + AST). |
| [[guarda-acao]] | Uma vez por turno: fica Resistente a todo dano, ganha +2 em testes opostos e pode dar cobertura. |
| [[impedimento]] | Faz um teste de ND 10 contra um oponente; se vencer, deixa-o abalado, atordoado, fraco ou lento. |
| [[objetivo]] | Trabalha para cumprir um objetivo do conflito, com um teste de Atributo ou um teste oposto. |
| [[inventario]] | Gasta Pontos de Inventário para criar e usar um item consumível na hora. |
| [[equipamento-acao]] | Troca qualquer número de itens equipados por itens da mochila (menos armaduras). |
| Outro | Faz algo que não está na lista, combinando o resultado com o mestre. |

## Ações menores

Algumas coisas simples cabem no seu turno **junto** da ação principal. O mestre tem a palavra final sobre o que conta como ação menor, mas em geral você pode:

- **Pegar um item do chão e/ou soltar o que segura.** Se pegar um acessório, arma ou escudo, pode equipá-lo na hora, desde que tenha um espaço livre e possa equipar aquele item (o livro trata de equipar itens na página 122). Quem larga um item deixa de tê-lo equipado; para reorganizar o equipamento é preciso fazer a ação [[equipamento-acao]].
- **Lançar rapidamente a outro personagem** um item que você segura.
- **Fazer uma pequena interação com o ambiente:** abrir uma porta destrancada, puxar uma alavanca ou chutar uma tábua para atravessar um buraco.

Elas podem acontecer antes, depois e, às vezes, durante a ação principal. O mestre deve ser generoso ao julgar o que cabe em um turno, e os jogadores não devem abusar disso. **Se a ação exige um teste, ela precisa ser a sua ação principal.**

Tudo que dá estilo e especificidade à ação **não gasta tempo**: coreografias com a espada, cânticos mágicos, misturar ingredientes antes de arremessar uma poção, descrições vivas. Isso deve ser incentivado, não punido.

## Poder

Você usa esta ação quando um Poder ou efeito diz que é preciso "usar uma ação" para ativá-lo. Fora de conflito, usar um desses Poderes leva de cinco a dez segundos.

## Feitiço

Você usa esta ação para lançar um feitiço que já aprendeu. Veja [[como-lancar-um-feitico]].

## Outro

Você pode tentar ações criativas que não estão na lista, desde que não sejam muito complexas nem demoradas. O jogador e o mestre combinam os detalhes e o resultado; muitas vezes basta dizer com clareza o que você quer fazer e como, e perceber que já existe uma ação para isso.

## Diálogo e táticas

Conflitos são cenas de ritmo rápido, em que os personagens quase não têm tempo de discutir um plano, mas esse ritmo **não** vale para os jogadores. O livro sugere ter em mente que:

- os personagens são heróis e aventureiros, então já devem ter conversado sobre estratégia antes (no acampamento, na estrada), e filmes e séries costumam "congelar" o tempo para os heróis planejarem;
- essa abordagem deixa a mesa mais descontraída, de acordo com o tom otimista do jogo.

Cabe ao grupo achar o meio-termo de quanta conversa e estratégia cabem durante um conflito.

O livro trata das ações nas páginas 66 a 75 e resume todas elas na tabela da página 67.`,
    tags,
  ),

  rule(
    'Ataque',
    68,
    'Você escolhe um alvo, faz um teste de Precisão contra a Defesa dele e, se acertar, ele perde PV conforme o dano da arma e a Afinidade; há variações para ataque livre, multi e com duas armas.',
    `Você usa esta ação para fazer uma manobra ofensiva com uma das armas à sua disposição.

## Passo a passo

1. **Escolha o alvo.** Escolha um inimigo. Você precisa saber a posição dele, ser capaz de vê-lo e conseguir alcançá-lo com a arma em uso: inimigos voadores, por exemplo, não são alcançáveis por ataques corpo a corpo.
2. **Faça o teste de Precisão.** Use a fórmula da arma. O **ND é a Defesa do alvo**. Em um sucesso você o atinge; em uma falha, ele prevê, esquiva ou neutraliza o golpe.
   - Falha crítica é falha automática e sucesso crítico sempre atinge, seja qual for a Defesa. Ambos geram [[oportunidades]].
   - O mestre pode aplicar modificadores situacionais de +2 ou -2 conforme as circunstâncias.
3. **Calcule o dano.** Se atingiu, o dano segue a fórmula da arma. Em geral é a **rolagem alta (RA)** do teste de Precisão somada a um valor fixo da arma. A página 132 do livro lista as armas mais comuns.
4. **Aplique o dano.** O alvo perde PV igual ao dano, ajustado pela Afinidade dele com o tipo de dano (o livro trata de Afinidades na página 92):
   - **Vulnerável:** perde PV igual a **duas vezes** o dano.
   - **Resistente:** perde PV igual à **metade** do dano.
   - **Imune:** não perde PV.
   - **Absorvedor:** **recupera** PV igual ao dano que sofreria.

> **Exemplo:** o cavaleiro Montblanc golpeia um esqueleto de Defesa 11 com um machado de guerra. O teste de Precisão é (VIG + VIG); ele rola 6 e 9, total 15, que supera a Defesa. O machado causa (RA + 14) e a rolagem alta foi 9, então o dano é 23.

## Ataque livre

Alguns efeitos permitem um **ataque livre**. Ele segue os mesmos passos acima, mas costuma ser parte de outra ação. Certos Poderes e efeitos até deixam você fazer um ataque livre com armas que não está empunhando naquele momento.

## Ataque multi

Um ataque com a propriedade **multi** permite escolher quantos alvos diferentes a arma ou o efeito permitir: com multi (2), até duas criaturas.

- Você faz **um único** teste de Precisão e o compara com a Defesa de cada alvo, para saber quais foram atingidos.
- Em um sucesso crítico atinge **todos** os alvos; em uma falha crítica erra **todos**.
- Os efeitos são aplicados a cada alvo ao mesmo tempo.

## Ataque com duas armas

Ao fazer a ação Ataque empunhando **duas armas da mesma categoria** (duas espadas, duas armas de fogo), você pode declarar que ataca com ambas.

- Você faz os dois ataques na ordem que preferir, contra o mesmo alvo ou alvos diferentes.
- Os dois ataques **perdem a propriedade multi** (se tinham) e não podem ganhá-la.
- No cálculo do dano dos dois ataques, a **rolagem alta (RA) é sempre 0**.
- Não dá para atacar com duas armas em um ataque livre.

Veja também [[testes]] e [[acoes]].`,
    tags,
  ),

  rule(
    'Estudo',
    70,
    'Você diz ao mestre o que quer descobrir sobre um item, pessoa, criatura ou local e faz um teste aberto, em geral (AST + AST); o resultado (7+, 10+, 13+ ou 16+) define o quanto você descobre.',
    `Você usa esta ação para saber mais sobre a pessoa ou o assunto com que está lidando. Basta dizer ao mestre o que quer descobrir sobre o alvo, seja um item, pessoa, criatura ou local.

## O teste

Faça um **teste aberto**: em vez de um ND de sucesso ou falha, o resultado define o tipo de informação que você recebe. A fórmula costuma ser **(AST + AST)**, mas outros Atributos podem fazer sentido, como **(AST + VON)** para fazer um adversário falar mais do que deveria. O mestre escolhe os Atributos conforme a sua abordagem.

| Resultado | Informações | Você descobre... |
| --- | --- | --- |
| 7+ | Básicas | Uma dica útil, mas um tanto vaga e sutil. |
| 10+ | Completas | Uma resposta completa, sem espaço para dúvidas. |
| 13+ | Detalhadas | Uma resposta completa e um detalhe útil. |
| 16+ | Enciclopédicas | Literalmente tudo que há para saber sobre o alvo. |

## Depois de estudar

Depois de estudar algo ou alguém, você **não pode repetir a mesma pergunta**, mas pode investigar outras informações do mesmo alvo.

> **Exemplo:** numa audiência com a duquesa Ylemin, a ladra Valea quer saber mais sobre os desejos da nobre. Ela tira 14 e descobre que, pelo anel que a duquesa usa, ela é apaixonada por joias antigas. Valea ainda nota que uma parte da pele da mão direita da duquesa é mais pálida: será que ela perdeu um de seus tesouros?

## Criaturas

Se a informação do NPC está na ficha ou nas estatísticas dele, o livro trata disso na página 319. Note que as **regras especiais** de uma criatura devem ser investigadas **separadamente**.

Veja também [[acoes]] e [[testes]].`,
    tags,
  ),

  // The Creature "Guarda" (p. 339) owns the slug `guarda`.
  {
    ...rule(
      'Guarda',
      71,
      'Uma vez por turno, até o início do seu próximo turno você fica Resistente a todo dano, ganha +2 em testes opostos e pode dar cobertura a outra criatura, impedindo ataques corpo a corpo contra ela.',
      `Você se concentra em defender os colegas de equipe e frustrar o inimigo.

## Efeitos

Até o **início do seu próximo turno**:

- Você fica **Resistente a todos os tipos de dano**, seja qual for a fonte (o livro trata de Afinidades na página 92).
- Quando faz um **teste oposto** contra outro personagem em cena, você recebe **+2 no resultado**, não importa quem iniciou o teste.
- Você pode **dar cobertura** a outra criatura presente na cena. Se fizer isso, ela **não pode ser alvo de ataques corpo a corpo** até o início do próximo turno que você jogar. O efeito termina se você morrer, sair de cena ou ficar inconsciente.

Você **não pode dar cobertura** a uma criatura que já esteja dando cobertura.

## Limites

A ação Guarda só pode ser feita **uma vez por turno**, mesmo que você possa fazer várias ações no turno (ou faça a Guarda sem custo como parte de outro efeito), e seus benefícios **nunca se acumulam**.

Veja também [[acoes]].`,
      tags,
    ),
    slug: 'guarda-acao',
  },

  rule(
    'Impedimento',
    71,
    'Você descreve como põe um oponente em posição desvantajosa e faz um teste de ND 10 contra ele; em um sucesso, ele fica abalado, atordoado, fraco ou lento, à sua escolha.',
    `Você força um oponente a ficar em posição desvantajosa. Pode ser uma finta, uma distração ou até um comentário ácido.

## Como funciona

1. **Descreva a abordagem.**
2. **Faça o teste.** O ND (veja [[nivel-de-dificuldade]]) é **fixo em 10** contra o alvo, e o mestre define os Atributos relevantes a partir da sua descrição.
3. **Em um sucesso,** o alvo sofre uma das seguintes [[condicoes]], à sua escolha: **abalado**, **atordoado**, **fraco** ou **lento**.

> **Exemplo:** a princesa Camilla desafiou o cavaleiro sombrio Brandon a um duelo. Ela circunda o guerreiro e tenta ficar de costas para o sol para cegá-lo, e o mestre pede um teste de (DES + AST). Camilla tira um sucesso crítico e deixa Brandon lento. Ela também gera uma oportunidade, que gasta na hora para arremessar a espada dele aos ares.

Veja também [[acoes]].`,
    tags,
  ),

  rule(
    'Objetivo',
    72,
    'Você faz um teste (de Atributo ou oposto) para avançar um objetivo do conflito; em um sucesso, preenche ou apaga seções do Relógio: 1 por sucesso, mais 1 se passar o ND por 3 e mais 2 se passar por 6.',
    `Você usa esta ação para progredir em um objetivo do conflito, seja o que você definiu no começo da cena ou um que acabou de perceber que quer alcançar: iniciar uma negociação, esgueirar-se por um grupo de guardas, começar um ritual, tentar imobilizar um alvo, puxar uma alavanca para ativar um mecanismo.

## Passo a passo

1. **Descreva o que quer fazer e como.** Você só pode perseguir um objetivo se tiver uma forma razoável de alcançá-lo. O mestre decide quais ações são possíveis, mas deve estar aberto a várias abordagens. Um objetivo **simples** (saltar um abismo, subir uma corda) costuma ser resolvido com um único teste; a maioria dos objetivos é **complexa** e pede um [[relogios]], sobretudo se levá-lo à vitória no conflito.
2. **Faça um teste.** Como o Objetivo sempre o aproxima do que quer, ele **sempre exige um teste**:
   - se o seu objetivo for **contrário ao de outro participante**, faça um teste oposto contra ele (veja [[testes-opostos]]); mesmo que vários se oponham, só o mais capaz entre eles faz o teste;
   - caso contrário, faça um **teste de Atributo**.
3. **Mova o Relógio.** Em um sucesso, você altera o Relógio a seu favor, **preenchendo ou apagando seções**:
   - **1 seção** por sucesso;
   - **mais 1** se o resultado passou o ND por **3 ou mais**, ou **mais 2** se passou por **6 ou mais**.

> **Exemplo:** num laboratório tecnomágico, a monja-guerreira Sílida segura um golem de pedra. A contrabandista arcana Nethis quer canalizar o poder de cristais mágicos para sobrecarregar o núcleo do golem, e o mestre cria um Relógio de **6 seções**: ao completá-lo, o núcleo é desintegrado e todos os dados de Atributo do golem diminuem um passo. Sílida, que não lança feitiços, ainda pode usar Objetivo para atacar a placa que protege o núcleo e aumentar o fluxo de energia. Talvez preencha menos seções, mas ajuda.

Ao usar Objetivo sobre um Relógio, **descreva o que seu personagem fará**: o mestre tem a palavra final sobre o que pode ou não influenciá-lo.

## Relógios de objetivo e número de seções

Quem decide quantas seções o Relógio de um objetivo tem é o mestre. A tabela do livro serve de guia:

| Seções | Objetivo | Quando preenchido... |
| --- | --- | --- |
| 4 | Pequeno | Dá uma vantagem pequena ou temporária. |
| 6 a 8 | Grande | Dá uma vantagem decisiva e permanente. |
| 10 a 12 | Resolutivo | Quem o preencheu vence o conflito. |

O livro trata de Relógios e metas de conflito na página 78.

Veja também [[acoes]].`,
    tags,
  ),

  rule(
    'Inventário',
    74,
    'Você gasta Pontos de Inventário para criar um item do seu inventário e usá-lo na hora, na mesma ação, mesmo com as duas mãos ocupadas.',
    `Você cria um item do seu inventário e o usa imediatamente, como parte da mesma ação. Por exemplo, dar uma poção a um aliado ou passar-lhe um bálsamo refrescante durante uma negociação tensa.

- Se o item tem um **ataque livre** contra um ou mais alvos, você o faz como parte da ação Inventário.
- Você pode fazer esta ação **mesmo com itens equipados nas duas mãos**.
- Se um Poder exige a ação Inventário, você também pode fazê-la **fora de conflitos**, o que leva de cinco a dez segundos.

As regras de Pontos de Inventário estão em [[pontos-de-inventario]].

Veja também [[acoes]].`,
    tags,
  ),

  rule(
    'Equipamento (ação)',
    74,
    'Você guarda na mochila qualquer número de itens equipados e equipa qualquer número de itens da mochila; só não vale para armaduras.',
    `Você pode guardar na mochila um número qualquer de itens equipados e também retirar e equipar um número qualquer de itens.

## Armaduras

A única coisa que você **não** pode equipar ou guardar com esta ação é a sua **armadura**: não há tempo para isso em uma só ação. O mestre pode permitir que você vista ou tire uma armadura se gastar **vários turnos** nisso, ou se o conflito se passar em um período longo, em que os turnos são uma abstração de horas, dias ou semanas.

## Itens já equipados

Itens equipados estão sempre **de prontidão**: você não precisa fazer esta ação para começar a batalha com a arma empunhada. O livro trata de equipar itens na página 122.

Não confunda esta ação com a regra [[equipamento]], que trata das categorias de itens equipáveis.

Veja também [[acoes]].`,
    tags,
  ),
];
