import { rule } from './helpers';
import { SeedEntry } from './types';

/**
 * The detail of Testes (Livro Básico, "Regras do jogo", printed p. 38-51). The hub
 * Rule "Testes" lives in `rules.ts`; the sections people look up by name during
 * play have their own Rule here, and the hub links to each of them. The optional
 * rules (Sucesso custoso, Evocando falhas, Escolha compartilhada de atributo) sit
 * under the Rule they belong to, under a "Regra opcional" heading.
 */
const tags = ['regra', 'teste', 'dados'];

export const checkRules: SeedEntry[] = [
  rule(
    'Oportunidades',
    41,
    'Um sucesso crítico dá uma oportunidade a quem rolou e uma falha crítica dá uma a quem controla a oposição; cada uma vira uma reviravolta (Aflição, Avaliar, Conexão, Desmascarar, Favor, Informações, Item Perdido, Mancada, Progresso, Reviravolta! ou Vantagem) ou outra de sua invenção.',
    `Oportunidades são reviravoltas inesperadas, às vezes boas e às vezes ruins. Elas surgem de um teste (veja [[testes]]) com **sucesso crítico** (a oportunidade é de quem rolou) ou **falha crítica** (a oportunidade vai para quem controla a oposição da cena).

Ao gastar uma oportunidade, você escolhe uma das opções abaixo **ou** inventa outra reviravolta que combine com a cena. O mestre tem a palavra final sobre o que vale na situação. Alguns feitiços e Poderes permitem gastos de oportunidade novos e poderosos.

## As opções

| Oportunidade | O que acontece |
| --- | --- |
| Aflição | Uma criatura fica abalada, atordoada, fraca ou lenta (veja [[condicoes]]). |
| Avaliar | Você descobre uma Vulnerabilidade ou um Traço de uma criatura que consiga ver. |
| Conexão | Você cria um Laço com algo ou alguém, ou acrescenta uma emoção a um Laço que já tem (veja [[lacos]]). |
| Desmascarar | Você descobre os objetivos e as motivações de uma criatura à sua escolha. |
| Favor | Suas ações garantem o apoio ou a admiração de uma pessoa ou de um grupo. |
| Informações | Você detecta uma pista ou um detalhe útil. O mestre pode dizer qual é ou pedir que você a descreva ou invente. |
| Item Perdido | Um item é destruído, perdido, roubado ou abandonado. |
| Mancada | Escolha uma criatura presente na cena: quem a controla deve interpretar um comentário comprometedor feito por ela. |
| Progresso | Você preenche ou apaga até duas seções de um relógio (veja [[relogios]]). |
| Reviravolta! | Alguém ou algo à sua escolha aparece de repente na cena. |
| Vantagem | O próximo teste feito por você, ou por um aliado à sua escolha, recebe +4. |

> **Exemplo:** Valea, a ladra, quer pular de telhado em telhado para despistar os mercenários do conde Eligor. O mestre pede um teste de (DES + VIG) e ela tira 7 e 7: sucesso crítico. O jogador escolhe a oportunidade Favor, e a ousadia de Valea conquista a simpatia dos aldeões, fartos da tirania do conde.

## Onde aparecem

As oportunidades também valem em [[testes-opostos]], em testes de Precisão e de Magia e nos testes que preenchem relógios. Nos testes de Apoio de um teste em grupo (veja [[testes-em-grupo]]) elas **não** são geradas.`,
    tags,
  ),

  rule(
    'Nível de dificuldade',
    43,
    'O ND mede o quanto uma ação é complexa e arriscada: 7 (fácil), 10 (normal), 13 (difícil) ou 16 (muito difícil); o teste passa se o resultado for igual ou maior que o ND. Na dúvida, o mestre usa 10.',
    `O **nível de dificuldade (ND)** de um teste (veja [[testes]]) diz o quanto uma ação é complexa e arriscada. Se o resultado do teste for **igual ou maior** que o ND, a ação tem sucesso. As regras podem fixar o ND (o ND de um teste de Precisão é a Defesa do alvo); quando não fixam, o mestre o escolhe.

## O que o ND resume

O ND junta vários fatores em um único número:

- o conhecimento ou a especialidade necessários para concluir a ação;
- circunstâncias que ajudam ou atrapalham, como o clima, a pouca visibilidade, a exaustão ou influências sobrenaturais;
- a falta ou a presença de recursos importantes (tempo, espaço, materiais);
- o impacto imediato ou futuro da ação na história.

Em resumo, é uma medida de o quanto a situação se opõe ao personagem.

## Tabela de ND

A pergunta que o mestre deve se fazer é "quem consegue fazer isso?".

| ND | Dificuldade | Quem consegue fazer isso? |
| --- | --- | --- |
| 7 | Fácil | Qualquer um com pouco treino ou talento natural. |
| 10 | Normal | Pessoas competentes ou muito talentosas. |
| 13 | Difícil | Especialistas ou prodígios. |
| 16 | Muito difícil | Os maiores mestres no assunto. |

## Na dúvida, ND 10

Se o mestre não souber qual ND usar, deve usar **10**: não é baixo nem alto demais e é fácil de lembrar.

## Sem ND

Em um teste aberto não há ND, e em um [[testes-opostos]] a disputa é contra o resultado de outro personagem. Veja os dois no [[testes]].`,
    tags,
  ),

  rule(
    'Evocando Traços e Laços',
    46,
    'Gastando 1 Ponto de Fabula, um PJ evoca um Traço para rolar de novo um ou ambos os dados (cada nova rolagem custa outro ponto) ou um Laço para somar a força dele ao resultado, uma vez por teste; nenhum dos dois vale após uma falha crítica.',
    `Os jogadores podem virar um teste a seu favor evocando os [[tracos]] e os [[lacos]] do personagem. Cada evocação custa **1** [[pontos-de-fabula]]. Em ambos os casos a descrição do jogador deve combinar com o que está evocando: não force, mas a palavra final sobre como gastar os pontos é sua.

## Evocar um Traço

Um Traço é a Identidade, a Origem ou o Tema do personagem.

- Ao fazer um teste, o PJ gasta 1 Ponto de Fabula, evoca um Traço e **rola de novo um ou ambos os dados**, substituindo a rolagem antiga pela nova.
- Pode repetir isso quantas vezes quiser dentro da mesma evocação, mas **cada nova rolagem** (de um ou dos dois dados) custa **outro** Ponto de Fabula.
- **Não é possível evocar um Traço** se o personagem teve uma falha crítica.

> **Exemplo:** Ricardo corre até o ancoradouro de uma aeronave prestes a decolar, com os companheiros presos a bordo. O teste é de (DES + VIG) com ND 13, e ele tem d6 nos dois Atributos. Rola 6 e 3: pouco. Com 2 Pontos de Fabula, o jogador evoca o Tema do personagem, Pertencimento (ele teme ficar sozinho de novo), e rola de novo o 3. Sai outro 6: dois 6 são um sucesso crítico, e o teste passa automaticamente. Ele ainda gasta o último ponto para descrever a cena.

## Evocar um Laço

- Ao fazer um teste, o PJ gasta 1 Ponto de Fabula e evoca um de seus Laços para **somar a força dele ao resultado**. A força de um Laço é o número de emoções (veja [[lacos]]).
- Só é possível **uma vez por teste**.

> **Exemplo:** na mesma cena, Ricardo evoca o Tema, mas rola 6 e 5, total 11, ainda abaixo do ND 13. Em vez de rolar de novo, evoca o Laço com o feiticeiro Antígio, de inferioridade e ódio (força 2). O total sobe para 13 e o teste passa.

Como nos Traços, só evoque um Laço quando fizer sentido na cena.

## Regra opcional: evocando falhas

Esta regra permite evocar Laços e Traços para **falhar de propósito** e ganhar Pontos de Fabula.

- **Uma vez por cena**, antes de fazer um teste, o jogador pode descrever como os Laços ou Traços do personagem o impedem de ter sucesso. Isso **substitui a rolagem**.
- O teste conta como falha automática, com resultado e rolagem alta (RA) iguais a **0**.
- O personagem recebe **1** Ponto de Fabula.
- Não vale em testes de Apoio de um teste em grupo (veja [[testes-em-grupo]]), e um teste em que você evocou uma falha não pode virar sucesso custoso (veja [[testes]]).`,
    tags,
  ),

  rule(
    'Testes opostos',
    48,
    'Na disputa entre personagens, cada um faz o mesmo teste de Atributo, sem ND, e vence o maior resultado; empate repete o teste. Sucesso crítico é o maior resultado possível e falha crítica o menor.',
    `Testes opostos são o jeito mais rápido de decidir competições entre personagens, como corridas, perseguições e debates.

## Como funciona

1. Cada personagem na disputa faz **o mesmo teste de Atributo**, sem ND (veja [[nivel-de-dificuldade]]).
2. **Vence** quem tiver o **maior resultado**.
3. Em caso de **empate**, quem empatou **repete** o teste até que um deles vença.

## Críticos

Em um teste oposto, a **falha crítica é o menor resultado possível** e o **sucesso crítico é o maior**, e ambos geram oportunidades (veja [[oportunidades]]) como de costume. Se **dois ou mais** personagens tiram falha crítica ou sucesso crítico, eles empatam e o teste se repete.

> **Exemplo:** o cavaleiro Montblanc tenta se soltar do agarrão de um dragão, e o mestre pede um teste oposto de (DES + VIG). Montblanc rola d8 + d10 e tira 8 e 8. O dragão rola d12 + d12 e tira 9 e 12, total 21. Mesmo assim, o 16 de Montblanc é um sucesso crítico, e ele escapa.

## Modificadores

Os modificadores situacionais de +2 ou -2 (veja [[testes]]) são úteis nos testes opostos, quando não há um ND para ajustar. A ação [[guarda-acao]] dá +2 em testes opostos.

Veja também [[testes]] e [[testes-em-grupo]].`,
    tags,
  ),

  rule(
    'Testes em grupo',
    50,
    'Os PJs nomeiam um líder; cada apoiador faz o mesmo teste com ND 10 e cada sucesso dá +1 ao teste do líder, mais a maior força de Laço entre os apoiadores bem-sucedidos que tenham Laço com ele.',
    `Os personagens dos jogadores podem cooperar para aumentar as chances de sucesso quando dois ou mais fazem a mesma ação juntos. O mestre sempre tem a palavra final sobre se um teste em grupo é possível.

## Passo a passo

1. **Líder.** Os PJs nomeiam um **líder**, o personagem que faz o teste final. Os demais são **apoiadores**.
2. **Teste de Apoio.** Cada apoiador faz um teste de Apoio **idêntico** ao do líder, mas com ND **fixo em 10** (veja [[nivel-de-dificuldade]]). Falhas e sucessos críticos em testes de Apoio **não geram** oportunidades (veja [[oportunidades]]), mas continuam contando como falha ou sucesso automáticos.
3. **Bônus por apoiador.** Cada apoiador que passa concede **+1** ao teste do líder.
4. **Laços.** Se algum apoiador que passou tem um [[lacos]] com o líder, some ao teste do líder a **maior força** entre esses Laços. Só a mais alta conta.
5. **Teste final.** O líder faz o teste final, que funciona como de costume e pode gerar oportunidades em um crítico. A **consequência afeta todos** que participaram.

> **Exemplo:** três heróis querem convencer a Grande Coruja a dar acesso à sua biblioteca. O líder faz (AST + VON) com ND 13, e os dois apoiadores fazem (AST + VON) com ND 10. Ambos passam, e um deles tem um Laço de força 2 com o líder. O teste final recebe +1 +1 +2, ou seja, **+4**.

## Rituais

Um ritual é um caso de teste em grupo: o conjurador é o líder e quem o apoia, mesmo sem saber fazer rituais, faz o teste de Apoio (veja [[rituais]]).

Veja também [[testes]] e [[testes-opostos]].`,
    tags,
  ),

  rule(
    'Testes frequentes',
    51,
    'Tabela de situações comuns e dos Atributos sugeridos para cada teste, de (DES + DES) para furtividade a (VIG + VON) para resistir à dor; a regra opcional deixa o jogador escolher um dos dois Atributos.',
    `Esta tabela lista circunstâncias que costumam exigir um teste (veja [[testes]]) e os Atributos sugeridos. É só uma sugestão: o mestre escolhe os Atributos conforme a abordagem descrita pelo jogador.

| Situação | Teste sugerido |
| --- | --- |
| Mover-se em silêncio, esconder-se e agir sem ser notado. | (DES + DES) |
| Evitar uma armadilha ou fugir de um prédio em colapso. | (DES + AST) |
| Prever os movimentos e pegar alguém de surpresa. | (DES + AST) |
| Concluir uma obra artesanal ou consertar algo. | (DES + AST) |
| Mover-se graciosamente para não ser detectado. | (DES + VON) |
| Examinar ou investigar alguém ou algo. | (AST + AST) |
| Lembrar-se de informações úteis sobre algo. | (AST + AST) |
| Conseguir informações com alguém em uma conversa. | (AST + VON) |
| Convencer alguém por meio de autoridade ou diplomacia. | (AST + VON) |
| Trabalho pesado, como erguer uma grade levadiça ou empurrar uma estátua. | (VIG + VIG) |
| Resistir a intensa dor ou fadiga. | (VIG + VON) |
| Intimidar alguém com sua força. | (VIG + VON) |

Veja também [[atributos]] e [[nivel-de-dificuldade]].

## Regra opcional: escolha compartilhada de atributo

Esta regra deixa o **jogador** decidir um dos dois Atributos do teste, enquanto o **mestre** decide o outro. O Atributo do mestre pode ser o mesmo que o do jogador ou outro.

A regra não vale para testes cujos Atributos já são fixados pelas regras, como os testes de Precisão.`,
    tags,
  ),
];
