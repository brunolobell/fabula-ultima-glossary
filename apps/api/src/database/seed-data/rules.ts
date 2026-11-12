import { rule } from './helpers';
import { SeedEntry } from './types';

export const rules: SeedEntry[] = [
  rule(
    'Traços',
    34,
    'Todo personagem tem três Traços — Identidade, Tema e Origem — que o definem na história e podem ser evocados para aumentar a chance de sucesso em um teste.',
    `## Os três Traços

- **Identidade.** Uma frase curta que resume o conceito do personagem, como "pirata celeste" ou "cavaleiro sem rainha". Pode ser trocada depois, se o personagem evoluir além dela.
- **Tema.** Um ideal ou sentimento forte que move as ações do personagem, como Raiva, Justiça ou Ambição. Também pode mudar ao longo do jogo.
- **Origem.** A terra natal do personagem.

Você escolhe os Traços na criação do personagem. Durante o jogo, pode **evocá-los** para aumentar sua chance de sucesso ao rolar dados, gastando [[pontos-de-fabula]].

Os [[lacos]] funcionam de forma parecida.`,
    ['personagem', 'criação'],
  ),

  rule(
    'Laços',
    35,
    'Um Laço liga seu personagem a outra pessoa por até três emoções; quanto mais emoções, mais forte o Laço (máximo 3). Ele pode ser evocado para melhorar testes.',
    `## Emoções

Cada Laço pode ter até três emoções, no máximo uma de cada par:

- Admiração **ou** inferioridade;
- Lealdade **ou** desconfiança;
- Afeto **ou** ódio.

## Força

A **força** de um Laço é o número de emoções que ele tem, até o máximo de 3.

> **Exemplo:** um Laço de inferioridade e lealdade com a princesa Safira tem força 2. Se depois surgir afeto por ela, a força passa a 3.

## Evocar e limite

Assim como os [[tracos]], os Laços podem ser **evocados** para melhorar suas rolagens e sua capacidade de ajudar companheiros. Um personagem pode ter até **seis** Laços ao mesmo tempo.

O livro trata dos Laços em detalhe na página 56.`,
    ['personagem', 'criação', 'narrativa'],
  ),

  rule(
    'Pontos de Fabula',
    96,
    'Moeda de troca dos PJs: cada um começa com 3, ganha mais ao enfrentar adversidades e os gasta para evocar Traços e Laços, mudar a história ou ativar Poderes. Gastá-los também faz o grupo subir de nível.',
    `## Ganhar

Cada personagem recém-criado começa com **3** Pontos de Fabula. Depois disso, ganha-se assim:

- **Sessão sem pontos.** Se um PJ começa a sessão sem nenhum Ponto de Fabula, recebe **1**.
- **Falha crítica.** Sempre que um PJ rola uma falha crítica, recebe **1**.
- **Vilão em cena.** Sempre que um vilão entra em cena, cada PJ recebe **1**, mesmo em cenas do mestre sem PJs presentes (veja "Vilões e Pontos de Fabula" abaixo).
- **Rendição.** Um PJ que chega a 0 [[pontos-de-vida]] e decide se render recebe **2** (veja [[zero-ponto-de-vida]]).
- **Falha automática (regra opcional, p. 47).** Se um PJ evoca um Laço ou Traço para falhar automaticamente em um teste, recebe **1**.

Não há limite máximo de Pontos de Fabula. Mas gastá-los é uma das principais formas de ganhar pontos de experiência e subir de nível (p. 226), então guardá-los demais atrasa o grupo inteiro.

## Gastar

| Efeito | Custo | O que faz |
| --- | --- | --- |
| Mudar a história | 1 | Muda um fato existente ou acrescenta um novo. |
| Evocar [[lacos]] | 1 | Soma a força do Laço a um teste (p. 47). |
| Evocar [[tracos]] | 1 | Rola novamente os dados de um teste (p. 46). |
| Usar um Poder | varia | Ativa um [[classes-e-poderes]] que exige Pontos de Fabula. |

## Mudar a história

Gastando 1 Ponto de Fabula, o jogador faz uma afirmação sobre a história: molda parte do mundo, do povo ou das criaturas para preencher lacunas, abrir uma oportunidade, ajustar um detalhe a seu favor ou até trazer uma reviravolta conveniente. Limites:

- Para alterar ou acrescentar detalhes a um personagem, local ou item que o **mestre** já estabeleceu, é preciso a permissão dele.
- Se a mudança afeta diretamente outro PJ, é preciso a permissão do **jogador** dele.
- Não dá para negar uma afirmação já feita por alguém, só expandi-la ou dar-lhe um toque especial.
- Não dá para fazer mudanças **mecânicas**: ganhar ou mudar um Poder, alterar as Vulnerabilidades de uma criatura, causar uma condição. O mestre pode decidir que o elemento novo dá alguma vantagem mecânica, mas a decisão é dele.
- Os NPCs criados assim ficam sob controle do mestre.

Antes de jogar, combinem na mesa quais elementos todos se sentem à vontade para mudar (veja [[antes-de-comecar-sessao-zero]]).

> **Exemplo:** o grupo derrota um golem e fica com um disco de marfim escrito numa língua antiga que ninguém lê. Uma jogadora gasta 1 Ponto de Fabula e afirma que seu personagem conhece um estudioso que vive ali perto. Como isso não contradiz nada já estabelecido, vira verdade na hora.

> **Exemplo:** o grupo encontra um dragão, apresentado pelo mestre. Um jogador gasta 1 Ponto de Fabula para dizer que ele está dormindo. Como o dragão é do mestre, é preciso permissão; o mestre concorda, mas decide que não é um sono mágico e o grupo ainda terá de fazer testes para não acordá-lo.

## Vilões e Pontos de Fabula

O vilão que aparece em cena dá 1 Ponto de Fabula a cada PJ. Com ressalvas:

- **Várias identidades.** Se o vilão tem mais de uma, os PJs só ganham quando ele aparece como "persona de antagonista". Depois que a farsa é descoberta, ganham sempre que ele entra em cena, disfarçado ou não.
- **Vários vilões.** Cada PJ ganha 1 por vilão na cena, até **3** por cena. Vilões que vão se unir durante a campanha podem ser tratados como um só: o grupo divide uma única reserva de [[pontos-de-ultima]] e foge junto.
- **Várias cenas.** Se a presença de um vilão passa por cenas seguidas, os PJs só ganham 1 na **primeira** delas.

Quando o grupo está com poucos Pontos de Fabula, o mestre pode fazer uma cena do mestre mostrando um vilão em ação: avança a história e dá "energia" aos heróis. Do outro lado, os vilões têm os [[pontos-de-ultima]].`,
    ['recurso', 'narrativa'],
  ),

  rule(
    'Pontos de Ultima',
    101,
    'Reserva do vilão, o reflexo sombrio dos Pontos de Fabula: 5, 10 ou 15 conforme o porte (menor, maior, supremo), gasta em fuga, em evocar um Traço ou em recuperação, e nunca recarregada. Quando acaba, o vilão deixa de ser vilão.',
    `## Pontos iniciais

Ao apresentar um vilão, o mestre decide se ele é **menor**, **maior** ou **supremo**; pode manter essa escolha em segredo ou revelá-la. Ela define os Pontos de Ultima do vilão:

| Vilão | Pontos de Ultima | Exemplos |
| --- | --- | --- |
| Menor | 5 | Comandantes inimigos, monstros únicos e infames, antagonistas que causam problemas em pequenos assentamentos. |
| Maior | 10 | Tiranos, magos poderosos, criaturas lendárias, entidades que ameaçam países inteiros. |
| Supremo | 15 | Arquidemônios, deuses alienígenas que buscam destruição ou dominação, entidades imortais. |

## Gastar

| Efeito | Custo | O que faz |
| --- | --- | --- |
| Fuga | 1 | O vilão sai de cena em segurança; o mestre descreve como (talvez deixando capangas para cuidar dos heróis). |
| Evocar [[tracos]] | 1 | Depois de fazer um teste, o vilão evoca um Traço e rola novamente um ou ambos os dados (p. 46). |
| Recuperação | 1 | Gastando uma ação, o vilão se recupera de todas as condições e recupera 50 [[pontos-de-mana]]. |

Ao contrário dos PJs, que ganham [[pontos-de-fabula]] de várias formas, o vilão **não recarrega** seus Pontos de Ultima: eles representam a determinação dele de perseguir seus objetivos. Quando acabam, o personagem deixa de ser vilão e vira um NPC comum. O mestre também pode escalonar o vilão.

## Escalonamento

A qualquer momento, o mestre pode declarar que um vilão assumiu uma nova forma, com mais poderes e ambições mais sombrias. Na história, é o instante em que ele rejeita a chance de redenção e se obceca ainda mais pelo objetivo.

- Um vilão **menor** pode virar **maior**; um **maior** pode virar **supremo**; um **supremo** não fica mais poderoso.
- Depois da transformação, ele conta como um **novo vilão**: na primeira vez que aparecer em cena, seus Pontos de Ultima voltam ao valor do novo porte.
- Se um vilão **sem Pontos de Ultima** chega a 0 [[pontos-de-vida]], pode escalonar durante a cena. Isso devolve seus pontos e ele não precisa mais se render (veja [[zero-ponto-de-vida]]).
- Se o vilão escalona **em cena**, é tratado como novo vilão na hora e **cada jogador recebe 1 Ponto de Fabula**.

Para decidir se um vilão deve escalonar, o mestre considera a importância dele para a história, sua personalidade e como os heróis o enfrentam. O escalonamento mostra que o grupo pode vencer um conflito e ainda assim piorar a situação. Normalmente é melhor que o vilão seja derrotado (talvez desanime, ou perceba que estava errado e se alie aos PJs). Escalonar em ritmo espaçado torna os vilões mais memoráveis: o livro sugere de **dois a quatro** escalonamentos por campanha.`,
    ['recurso', 'vilão', 'mestre'],
  ),

  rule(
    'Nível e Experiência',
    35,
    'O nível mostra o poder do personagem: os PJs costumam começar no nível 5 e chegar ao 50, subindo ao acumular EXP, em média um nível a cada duas sessões.',
    `- Os PJs geralmente começam suas aventuras no **nível 5** e podem chegar ao **nível 50**.
- Para subir de nível, é preciso acumular **experiência (EXP)** suficiente; a média é **um nível a cada duas sessões**.
- A cada nível, o personagem avança em uma [[classes-e-poderes]].

A progressão completa está na página 226.`,
    ['personagem', 'progressão'],
  ),

  rule(
    'Atributos',
    36,
    'Quatro Atributos — Destreza, Vigor, Astúcia e Vontade — medem o treinamento do personagem, cada um representado por um dado de d6 a d12.',
    `## Os quatro Atributos

- **Destreza (DES).** Precisão, coordenação, agilidade e reflexos. Usada para se mover com cuidado, defender-se de ataques, criar objetos e lutar com armas leves, arcos e armas de fogo.
- **Vigor (VIG).** Capacidade física e robustez. A maioria das armas pesadas exige Vigor. Também ligado à resistência a dor e fadiga, por meio dos [[pontos-de-vida]].
- **Astúcia (AST).** Observação, compreensão e raciocínio. Importante para investigar situações, lançar feitiços e se defender de magia.
- **Vontade (VON).** Determinação, carisma e disciplina. Usada em diplomacia e persuasão, e influencia indiretamente os feitiços e poderes por meio dos [[pontos-de-mana]].

## Dados

Cada Atributo é um dado, do de seis lados (**d6**) ao de doze lados (**d12**).

- O **dado básico** é o que está na ficha.
- O **dado atual** é o dado em uso no momento, que alguns efeitos podem alterar temporariamente, como as [[condicoes]].`,
    ['personagem', 'criação'],
  ),

  rule(
    'Classes e Poderes',
    36,
    'A cada nível, o personagem avança em uma das 15 classes do livro (nova ou já obtida) e escolhe seus Poderes; alguns Poderes podem ser tomados várias vezes, aumentando o NP.',
    `## Classes

Sempre que o personagem sobe de nível, você pode progredir em uma das **quinze classes** do livro: desenvolver uma que já tem ou começar uma nova. Cada classe apresenta vários poderes e habilidades, e você escolhe em quais investir. Dois personagens com as mesmas classes podem ser bem diferentes na construção e no jogo.

## Nível de poder (NP)

Alguns Poderes podem ser escolhidos várias vezes, ficando mais fortes ou flexíveis. A cada nova escolha, o **nível de poder (NP)** daquele Poder aumenta. Um Poder marcado com o símbolo de repetição e um número, como (5), pode ser obtido até esse número de vezes.

> **Exemplo:** se você escolher duas vezes o Poder [[fortaleza]] do Guardião, seu NP nele é 2.

As classes e seus Poderes começam na página 176.`,
    ['personagem', 'classes'],
  ),

  rule(
    'Testes',
    38,
    'Um teste é uma rolagem de exatamente dois dados de Atributo, somados e ajustados por um modificador; é exigido pelas regras ou pedido pelo mestre, e jogadores nunca o pedem.',
    `Um **teste** é uma rolagem feita com os dados de [[atributos]] do personagem: Destreza, Vigor, Astúcia e Vontade.

## Quando fazer um teste

Em geral, um personagem faz um teste:

- **Quando as regras exigem.** Atingir um alvo, lançar um feitiço e usar um Poder de classe costumam pedir testes para definir sucesso ou fracasso. Um efeito que **não** pede um teste de forma explícita sempre tem **sucesso automático**.
- **Quando o mestre pede.** O mestre pode pedir testes quando os personagens fazem algo arriscado, enfrentam oposição ou reagem a um perigo.

**Só o mestre pode pedir testes; os jogadores nunca fazem isso.**

## A fórmula

Cada teste vem com uma fórmula que diz quais dados rolar e somar. Você **sempre rola exatamente dois dados**. A fórmula também pode somar ou subtrair um valor do total.

> **Exemplo:** um teste de (AST + VON) feito por um personagem com Astúcia d6 e Vontade d10 soma um d6 e um d10, com resultado entre 2 e 16.

> **Exemplo:** num teste de (VIG + VIG) +5, o personagem rola o dado de Vigor duas vezes e soma 5 ao total.

## Resolver

No jogo, "resolver" algo é encontrar o resultado depois de aplicar todos os efeitos e suas consequências. Resolver um ataque inclui o teste de Precisão, o dano, a aplicação das Afinidades do alvo, a redução dos PV dele e as penalidades ou condições que ele possa sofrer. Isso vale para testes, Poderes, feitiços, características e o resto do jogo.`,
    ['regra', 'teste', 'dados'],
  ),

  rule(
    'Pontos de Vida',
    84,
    'Medem a energia vital e o espírito de luta do personagem, não sua integridade física. Quando chegam a 0, o espírito de luta se quebra.',
    `Abreviados como **PV**, os Pontos de Vida indicam a energia vital, o espírito de luta e a saúde geral do personagem, além da capacidade de aguentar dor e fadiga. Perder PV não significa necessariamente sofrer ferimentos graves: pense nos PV como um "escudo" que protege o personagem do golpe final.

## Valores

- **PV atuais.** Quanto o personagem tem agora. Nunca menos que 0 nem mais que os PV máximos.
- **PV máximos.** O teto dos PV atuais.

> **Exemplo:** com PV máximos 50 e PV atuais 40, um item que restaura 60 PV deixa o personagem com 50 PV, não com 100.

## Gastar PV

Alguns efeitos exigem que você **gaste** PV. Só é possível se isso não reduzir seus PV a 0: para gastar 30 PV, é preciso ter pelo menos 31. Gastar PV não conta como "perder" Pontos de Vida.

## Chegar a 0 PV

O espírito de luta do personagem é quebrado. As consequências dependem do papel na história: NPC comum, vilão ou PJ. Os três casos estão em [[zero-ponto-de-vida]].

Veja também a [[crise]].`,
    ['recurso', 'combate'],
  ),

  rule(
    'Zero Ponto de Vida',
    86,
    'O que acontece quando os PV de um personagem chegam a 0: o NPC fica à mercê de quem o derrotou, o vilão foge ou se rende, e o PJ se sacrifica ou se rende.',
    `Quando os [[pontos-de-vida]] de um personagem chegam a 0, os perigos e danos sofridos ficam insuportáveis. As opções dependem do papel dele na história.

## NPC comum

O NPC perde a vontade de lutar, e **quem o derrotou decide seu destino**: capturá-lo, forçá-lo a fugir, deixá-lo inconsciente, matá-lo ou até fazê-lo se arrepender e reconsiderar suas ações.

Inimigos mais fracos ou sem consciência (um zumbi, um drone autômato, uma partícula irracional de energia elemental) podem simplesmente ser **destruídos**, a critério do mestre.

> **Exemplo:** Yezma reduz a 0 PV um javali maculado por magia. Sabendo que a fera só ficou agressiva por causa da corrupção arcana, ela decide poupá-la e apenas afugentá-la, esperando restaurar sua mente algum dia.

## Vilão

Ao chegar a 0 PV, o vilão escolhe entre **fuga** e **rendição**.

- **Fuga.** O vilão gasta **1 Ponto de Ultima** (veja [[pontos-de-ultima]]) e sai de cena em segurança; o mestre descreve como. Sem Pontos de Ultima, ele ainda pode escapar escalonando para uma versão mais perigosa de si.
- **Rendição.** O vilão se rende e passa a ser tratado como qualquer outro NPC: seu destino fica nas mãos de quem o derrotou. É um bom momento para os jogadores propor um arco de redenção, que termine com o antagonista virando aliado (e talvez um novo PJ).

Um vilão cujos propósito e objetivos ainda valem **só se rende se não tiver mais [[pontos-de-ultima]]**. O mestre pode, porém, considerar a rendição de um vilão cujas motivações foram resolvidas ou removidas, ou cuja sobrevivência alongaria a campanha sem necessidade (por exemplo, o chefe final derrotado ainda com 2 ou 3 Pontos de Ultima).

> **Exemplo:** sob a mira da pirata celeste Morgan, o comandante Duna pula do convés e despenca rumo ao oceano. Quando Morgan olha por cima do corrimão, ele está agarrado a uma enorme salamandra alada, que o leva embora em direção à capital.

## Personagem de jogador (PJ)

Ao chegar a 0 PV, o PJ escolhe entre **sacrifício** e **rendição**.

### Sacrifício

O PJ dá a vida para realizar um feito tido como impossível: acabar com uma maldição centenária, tirar por um tempo os poderes de um semideus ou repelir sozinho um pequeno exército para os aliados fugirem.

Só é possível se **pelo menos duas** destas condições forem verdadeiras:

- Um vilão está em cena.
- O sacrifício beneficiaria um personagem com quem você tem um Laço (veja [[lacos]]).
- Você acredita que o sacrifício tornaria o mundo um lugar melhor.

Jogador e mestre negociam os detalhes e narram juntos o final heroico. Não há limite para o que o sacrifício realiza: exagere, pois o personagem está perdido para sempre.

PJs que se sacrificam aceitam a morte e, em geral, **não voltam à vida**: entram em paz no rio das almas. O jogo não oferece mecânicas de ressurreição porque a morte de um PJ deve ser importante e porque o mistério do pós-vida deve ser explorado e moldado em conjunto, como parte da história. Em geral os espíritos dos mortos retornam ao rio das almas que permeia o mundo, mas alguns são aprisionados por feitiços malignos, levados a outras dimensões ou têm vontade forte o bastante para manter a identidade.

### Rendição

O PJ fica **inconsciente** e incapaz de agir ou afetar a cena com efeitos ou habilidades, **mesmo que seus PV sejam restaurados** a mais de 0. Em um conflito, ele sai da lista de participantes.

- O mestre **não pode matar** um PJ rendido, mas pode impor uma **consequência** (agora ou mais tarde), escolhida na lista abaixo ou qualquer outra que faça sentido.
- O PJ que se rende recebe **2** [[pontos-de-fabula]].
- No início da próxima cena em que aparecer, recupera a consciência e PV suficientes para ficar em [[crise]].
- Mesmo severas, as consequências devem evitar ferimentos incapacitantes ou permanentes, pelo clima geral de Fabula Ultima.
- Se vários PJs (ou o grupo todo) se renderem, o mestre impõe consequências separadas ou uma única reviravolta dramática, como uma "derrota roteirizada" de videogame.

> **Exemplo:** quando o último herói cai, a comandante Kelta sorri: não vai eliminá-los agora, pois tem a agenda cheia, e eles nunca chegarão à aldeia a tempo. O Vidro Celeste logo estará nas mãos da imperatriz.

### Exemplos de consequência

- **Trevas.** Você muda seu Tema (veja [[tracos]]) para Culpa, Dúvida, Raiva ou Vingança, à sua escolha.
- **Desespero.** O inimigo faz um movimento decisivo, ou os heróis perdem a confiança e a aprovação de uma pessoa ou grupo importante.
- **Perda.** Algo precioso é tomado de você: um artefato mágico, uma pessoa amada, uma relíquia de família.
- **Ressentimento.** Você apaga um de seus Laços e o substitui por um Laço com um personagem escolhido pelo mestre, de desconfiança, inferioridade ou ódio, à sua escolha.
- **Separação.** Você deixa o grupo: é capturado, levado para longe ou fica perdido em local desconhecido.`,
    ['combate', 'estado'],
  ),

  rule(
    'Crise',
    84,
    'Um personagem está em crise quando seus PV atuais são iguais ou inferiores à metade dos PV máximos (arredondada para baixo); alguns efeitos só se ativam ou só valem nesse estado.',
    `O valor de **Crise** é igual à metade dos [[pontos-de-vida]] máximos do personagem, **arredondada para baixo**. Se seus PV atuais forem iguais ou inferiores a esse valor, você está **em crise**.

> **Exemplo:** um personagem com 65 PV máximos fica em crise com 32 PV ou menos.

Alguns efeitos de jogo se ativam quando o personagem entra em crise; outros permanecem ativos apenas enquanto ele estiver em crise.

Veja também [[zero-ponto-de-vida]], para o que acontece quando os PV chegam a 0.`,
    ['combate', 'estado'],
  ),

  rule(
    'Pontos de Mana',
    85,
    'Medem a força interna e a concentração do personagem; são gastos para lançar feitiços e usar diversas habilidades.',
    `Abreviados como **PM**, os Pontos de Mana medem a força interna, o potencial mágico e a capacidade de concentração do personagem. Costumam ser gastos para aprimorar magias ou realizar feitos heroicos quase sobre-humanos.

## Valores

- **PM atuais.** Quanto o personagem tem agora. Nunca menos que 0 nem mais que os PM máximos.
- **PM máximos.** O teto dos PM atuais.

## Gastar PM

Feitiços e várias outras habilidades exigem que você gaste PM. Só é possível se você tiver PM suficientes para pagar o custo completo: não dá para lançar um feitiço de 10 PM com apenas 9 PM. Gastar PM não conta como "perder" Pontos de Mana.

## Chegar a 0 PM

O personagem fica mentalmente exausto, mas não sofre outra consequência além de não poder usar magias e habilidades que consomem PM.`,
    ['recurso', 'magia'],
  ),

  rule(
    'Condições',
    94,
    'Seis condições — Abalado, Atordoado, Enfurecido, Envenenado, Fraco e Lento — reduzem temporariamente um ou mais dados de Atributo.',
    `Personagens dos jogadores e NPCs podem sofrer condições, em geral como consequência de ataques e feitiços.

| Condição | Efeito |
| --- | --- |
| **Abalado** | Reduz temporariamente o dado de Vontade em um. |
| **Atordoado** | Reduz temporariamente o dado de Astúcia em um. |
| **Enfurecido** | Reduz temporariamente os dados de Destreza e Astúcia em um. |
| **Envenenado** | Reduz temporariamente os dados de Vigor e Vontade em um. |
| **Fraco** | Reduz temporariamente o dado de Vigor em um. |
| **Lento** | Reduz temporariamente o dado de Destreza em um. |

## Condições cumulativas

Condições diferentes que afetam o mesmo Atributo se acumulam.

> **Exemplo:** atordoado e enfurecido juntos reduzem o dado de Astúcia em dois.

Os [[atributos]] nunca ficam com um dado menor que **d6**. Se o personagem já tem uma condição e é afetado por ela de novo, nada acontece.

## Recuperação

As condições podem ser curadas com descanso, feitiços, poderes e itens.`,
    ['estado', 'combate'],
  ),

  rule(
    'Como lançar um feitiço',
    115,
    'Para lançar um feitiço é preciso se mover e falar livremente, ter PM para o custo total e ver os alvos; depois, seis passos levam da declaração ao efeito.',
    `## Requisitos

Para lançar um feitiço, o personagem precisa cumprir **todos** estes requisitos:

- Conseguir mover o corpo livremente. Pode estar segurando itens, desde que consiga mover os braços.
- Poder falar e pronunciar a invocação.
- Ter [[pontos-de-mana]] suficientes para o **custo total de PM** do feitiço, incluindo qualquer PM adicional gasto para aprimorar o efeito.
- Estar vendo os alvos, a menos que o feitiço tenha alvo **pessoal** ou **especial**.

## Passo a passo

1. Declare qual feitiço o personagem quer lançar, dentre os que aprendeu, e qual efeito ele causa.
2. Defina, se necessário, os alvos.
3. Descreva como o personagem faz os gestos mágicos e pronuncia a fórmula. Criaturas próximas verão e escutarão.
4. Gaste a quantidade necessária de PM.
5. Se o feitiço for **ofensivo**, faça um **teste de Magia**.
6. Aplique os efeitos do feitiço.

## Teste de Magia

- Elementalismo, entropismo e espiritualismo usam **(AST + VON)**.
- Quimerismo usa **(AST + VON)** ou **(VIG + VON)**, à sua escolha.
- Feitiços **não ofensivos** têm sucesso automático, sem teste.
- Falhas críticas e sucessos críticos no teste de Magia geram **oportunidades** normalmente.`,
    ['magia', 'feitiços'],
  ),

  rule(
    'Equipamento',
    126,
    'Há quatro categorias de itens equipáveis — acessórios, armaduras, armas e escudos —, básicos ou raros; itens marciais só podem ser equipados por certas classes.',
    `## Categorias

Os itens equipáveis são de quatro categorias: **acessórios**, **armaduras**, **armas** e **escudos**. Cada item pode ser **básico** ou **raro**, exceto os acessórios, que são **sempre raros**.

## Itens marciais

Itens com o ícone de marcial só podem ser equipados por personagens de certas classes:

- **Guerreiros Sombrios:** armas corpo a corpo e armaduras marciais.
- **Furiosos:** armas corpo a corpo e armaduras marciais.
- **Guardiões** ([[guardiao]]): armaduras e escudos marciais.
- **Atiradores:** armas à distância e escudos marciais.
- **Mestres de Armas:** armas corpo a corpo e escudos marciais.

Quem não tem a classe adequada ainda pode **carregar** itens marciais, mas não pode equipá-los nem usar seus benefícios.

## Acessórios

Acessórios são itens mágicos que concedem características especiais a quem os equipa. Cada um traz o nome, o custo em zênites (z) e as características concedidas.

> **Exemplo:** o Elmo de crista custa 1.000z e dá +1 em testes de Precisão.

Há uma lista de acessórios de exemplo nas páginas 285 a 287.`,
    ['equipamento', 'itens'],
  ),

  rule(
    'Projetos',
    134,
    'Regra de criação de invenções (poções, golens, aeronaves…) para personagens Inventores: o custo sai de potência × área × uso e o projeto avança 1 ponto de progresso por dia por PJ (mais 1 por Inventor) até chegar a custo ÷ 100.',
    `Assim como conjuradores têm a magia ritualística, personagens [[inventor]] podem iniciar **projetos** e trabalhar em invenções personalizadas, de poções do amor a aeronaves. O Inventor ganha o direito de iniciar Projetos na classe; a regra em si vale para qualquer PJ que ajude no trabalho.

## Passo a passo

1. **Descreva a invenção.** Diga o que ela faz, como é operada, que energia usa e quais benefícios específicos oferece. O mestre tem a palavra final sobre ser possível criá-la naquelas circunstâncias.
2. **Divida, se for complexo.** Uma invenção muito complexa (uma moto tecnomágica que é veículo e arma ao mesmo tempo) pode ser separada pelo mestre em duas ou mais invenções, cada uma com seu próprio projeto.
3. **Defina o custo.** Com as tabelas de potência, área e uso, o mestre determina o **custo total em materiais**, pago na hora. Em invenções de potência **média ou maior**, ele também descreve um ingrediente ou material especial que não pode ser comprado: consegui-lo deve ser o foco de uma ou duas sessões.
4. **Defeito (opcional).** Você pode negociar com o mestre um defeito terrível (recarga constante, peso, barulho, pouca confiabilidade). Ele **reduz o custo do projeto em 25%**.
5. **Acumule progresso.** Para concluir, é preciso somar progresso igual a **um centésimo do custo em zênites** (mínimo de 1). Ao fim de cada dia, o projeto avança:
   - +1 de progresso por PJ que trabalhou nele;
   - +1 de progresso extra por PJ com pelo menos um nível de Inventor que trabalhou nele.
6. **Invenção pronta.** Ao atingir o progresso necessário, a invenção é criada. Se num mesmo dia o grupo gerar mais progresso do que o necessário, ela fica pronta em uma ou duas horas.

## Custo: potência, área e uso

**Custo total = custo base da potência × multiplicador de área × multiplicador de uso** (e depois −25% se houver defeito).

| Potência | Custo base | A invenção pode… |
| --- | --- | --- |
| Menor | 100z | Iluminar, transportar pessoas ou carga por terra ou água, dar uma pequena proteção. |
| Média | 200z | Viajar submersa, suprimir um efeito mágico, emitir sons ou fala, executar uma operação específica no lugar do inventor, fornecer energia a curto prazo. |
| Maior | 400z | Voar, alterar a natureza de uma área por pouco tempo, cancelar efeitos de um feitiço, ter inteligência rudimentar, lutar ao lado do inventor, fornecer energia a longo prazo, capturar ou imobilizar o alvo. |
| Extrema | 800z | Alterar a natureza de uma área por um longo período, suprimir o poder de um demônio, evitar uma catástrofe, ter inteligência e personalidade completas. |

| Área | Multiplicador | A invenção afeta… |
| --- | --- | --- |
| Individual | ×1 | Uma criatura de tamanho humano, uma porta, uma árvore, uma arma. |
| Pequena | ×2 | Um grupo de criaturas de tamanho humano, uma criatura grande, uma pequena clareira, um vagão de trem, uma cabana. |
| Grande | ×3 | Uma multidão, uma pequena floresta, uma aeronave ou galeão, um salão de castelo, uma casa, uma criatura gigante. |
| Enorme | ×4 | Uma fortaleza, um lago, um cume de montanha, uma aldeia, um quarteirão. |

| Uso | Multiplicador | Depois de ativada, a invenção… |
| --- | --- | --- |
| Consumível | ×1 | Não pode ser usada de novo, a menos que o criador faça uma cópia. |
| Permanente | ×5 | Fica disponível para vários usos e situações. |

> **Exemplo:** uma grande aeronave para cinquenta pessoas é potência Maior (400z), área Grande (×3) e uso Permanente (×5): 400 × 3 × 5 = **6.000z**, ou seja, **60 de progresso**, sem defeito.

## Dano e proteção

O mestre decide a potência de qualquer invenção, usando esta tabela como guia para itens que ajudam em batalha:

| Potência | Dano | Cura | Proteção |
| --- | --- | --- | --- |
| Menor | indisponível | indisponível | Uma Resistência (somente consumíveis) |
| Média | Fraco | Forte | Uma Resistência |
| Maior | Forte | Intenso | Uma Imunidade ou duas Resistências |
| Extrema | Intenso | Intenso +20 | Duas Imunidades ou três Resistências |

- Evite criar invenções que deem Imunidade a dano físico.
- Um projeto com efeitos mistos (por exemplo, dar Resistência a um tipo de dano e também causar dano) deve ser dividido em mais de um projeto.

Os valores de dano e cura dependem do **nível atual do criador**:

| Nível | Fraco | Forte | Intenso |
| --- | --- | --- | --- |
| 5+ | 10 | 30 | 40 |
| 20+ | 20 | 40 | 60 |
| 40+ | 30 | 50 | 80 |

## Materiais

Você pode pagar o custo do projeto com materiais preciosos obtidos nas aventuras, conforme o mestre aceitar. O ingrediente especial exigido pela potência da invenção (passo 3) **não** pode ser usado também para pagar o custo.

## Ajudantes

Para progredir mais rápido, ou para o projeto andar sem a presença do criador, é possível contratar ajudantes.

- Cada ajudante exige pagamento igual à **metade do custo total** do projeto (alguns ajudam de graça, por gratidão ou gentileza).
- Ao fim de cada dia, cada ajudante gera **+1 de progresso**.

## Como usar Projetos

- As regras são leves e flexíveis, não realistas nem à prova de falhas: servem para que inventores criem soluções heroicas, não itens comuns, e sem atrapalhar a progressão do jogo.
- Projetos não devem conflitar com a narrativa: devem ajudar na missão do grupo, e não virar um minijogo separado nem um jeito de "quebrar" o sistema.
- Prefira projetos que possam ser feitos durante uma Viagem, narrando o avanço em cenas de interlúdio.
- Projetos caros costumam ser inviáveis por falta de tempo ou recursos: foque em consumíveis mais baratos e em apoiar o grupo com os demais Poderes.

O Poder [[visionario]] acelera projetos e paga parte do custo de materiais.

## Exemplos do livro

| Invenção | Potência | Área | Uso | Custo | Progresso | Defeito |
| --- | --- | --- | --- | --- | --- | --- |
| Aeronave "Descoberta" | Maior | Grande | Permanente | 6.000z | 60 | não |
| Metralhagolem (arma flutuante semi-inteligente que causa dano físico fraco no fim do turno do criador) | Maior | Individual | Permanente | 1.500z | 15 | sim |
| Botas magnéticas (andar em superfícies metálicas, inclusive paredes e teto) | Média | Individual | Permanente | 1.000z | 10 | não |
| Traje tecnomágico (armadura de quatro patas) | Média + Média | Individual | Permanente | 1.750z | 17 | sim |

O traje tecnomágico é dividido pelo mestre em dois projetos, a armadura (Resistência a dano físico) e o canhão de calor (dano fraco de fogo, com teste de Precisão de (DES + AST)). O criador aceitou Vulnerabilidade a dano de raio como defeito em um deles para baratear o custo.`,
    ['invenção', 'inventor', 'criação'],
  ),

  rule(
    'Domínio de classe',
    227,
    'Ao investir o 10º nível numa classe, o personagem a domina e escolhe um Poder Heroico; não pode mais pôr níveis nela, e só pode ter três classes não dominadas ao mesmo tempo.',
    `## Dominar uma classe

Uma classe tem no máximo **dez níveis**. Ao investir o décimo, o personagem **domina** a classe: ela fica fechada a novos níveis e ele escolhe um **Poder Heroico** da lista (veja a página 232 do Livro Básico e a lista "Novos Poderes Heroicos" de cada Atlas).

O Poder Heroico é uma **adição** ao Poder de classe que o personagem ganha normalmente ao investir aquele décimo nível.

## Limite de classes abertas

Um personagem **não pode ter mais de três classes não dominadas** ao mesmo tempo. Para diversificar além disso, ele precisa primeiro dominar uma das classes que já tem.

## Requisitos dos Poderes Heroicos

Muitos Poderes Heroicos exigem dominar uma classe específica (ou uma entre várias), e alguns exigem também um Poder ou Feitiço, ou um nível mínimo. Os poucos sem requisito servem a qualquer personagem.

Veja também [[classes-e-poderes]] e [[nivel-e-experiencia]].`,
    ['personagem', 'progressão', 'poder heroico'],
  ),

  rule(
    'Relógios',
    52,
    'Um Relógio é um círculo dividido em seções (em geral de 4 a 12) que o mestre usa, à vista de todos, para medir o progresso de um objetivo ou a chegada de um perigo; testes preenchem ou apagam suas seções.',
    `## O que é

Um Relógio acompanha situações que evoluem, perigos que se aproximam ou o progresso dos personagens numa tarefa complexa demais para um único teste. É um círculo dividido em **seções**; cada seção é um passo rumo a um objetivo ou a um evento. Também ajuda o mestre a controlar o ritmo da cena.

- Um Relógio de Alerta, numa infiltração, enche quando os testes falham.
- Quando os heróis derrubam colunas para desabar o teto sobre um inimigo colossal, um Relógio mede quanto o suporte já cedeu.
- Num ritual que pode mudar o mundo, um Relógio como "Apocalipse Arcano" mostra o tempo que resta para impedi-lo.

## Quem cria e como é feito

- Costuma ter de **4 a 12 seções**, conforme a complexidade.
- O **mestre** cria e gerencia o Relógio, mas ele deve ficar **visível para todos**: gera tensão e transparência e deixa cada jogador narrar suas ações conforme o objetivo avança.
- Ele deve estar ligado a um **objetivo ou perigo específico**, nunca a um método. Assim cada personagem pode agir sobre ele de um jeito diferente (no desabamento, atingir os pilares, pulverizá-los com magia ou arremessar inimigos contra eles).

## Avançar o Relógio

Em geral os Relógios avançam por **testes**.

**Relógio de progresso** (enche com sucessos):

- Preencha **1 seção** por sucesso.
- Preencha **mais 1** se o resultado passou do ND (ou do resultado do oponente, em testes opostos) por **3 ou mais**, ou **mais 2** se passou por **6 ou mais**.
- Num **sucesso crítico**, a oportunidade concedida pode pagar **mais 2 seções**.

**Relógio de ameaça** (enche com falhas, sobretudo as grandes):

- Preencha **1 seção** por falha.
- Preencha **mais 1** se o resultado ficou abaixo do ND (ou do oponente) por **3 ou mais**, ou **mais 2** se ficou por **6 ou mais**.
- Numa **falha crítica**, a oportunidade concedida pode pagar **mais 2 seções**.

> **Exemplo:** Valea tira 6 num teste de ND 10 ao se esgueirar por um castelo cheio de monstros. O mestre preenche **2 seções** do Relógio "Emboscada": uma pela falha e outra por falhar por 3 ou mais.

Os Relógios devem evoluir conforme a ficção. O mestre usa modificadores situacionais e ajusta a dificuldade para refletir vantagens e desvantagens criadas pelas escolhas dos jogadores.

## O limite da falha

Se o Relógio representa uma série complexa de ações, defina quando o objetivo se perde para sempre: com um só teste falho, com vários, ou com um "Relógio de fracasso" paralelo que enche a cada rolagem ruim. O mestre decide caso a caso, mas precisa **avisar os jogadores** antes do desafio.

## Voltar o Relógio

Os personagens também podem **desacelerar** o avanço ou **apagar seções** até o Relógio voltar a 0, pelo mesmo método do preenchimento. Ao chegar a 0, o mestre pode remover a ameaça ou deixá-la à espreita.

> **Exemplo:** Crona, uma feiticeira, está quase terminando um ritual que abrirá uma fenda para o Reino Demoníaco. O mestre usa um Relógio de **10 seções** e preenche **1** ao fim de cada turno dela. Se encher, a cena termina em derrota automática. Os jogadores dividem as ações entre derrotá-la e atrasar o ritual.

Uma cena centrada num único Relógio que avança e recua o tempo todo tende a virar empate. Quase sempre vale incluir **outra fonte de pressão**, como o perigo da batalha no exemplo.

## Outros eventos

- Se o mestre julga que um evento (mesmo sem teste) preenche ou apaga seções, ele pode preencher ou apagar **1 seção** ou, em eventos importantes, **2 seções**.
- Algumas escolhas preenchem um Relógio por completo ou o inutilizam, como destruir o Cristal da Vida e tornar irrelevante o Relógio "Canalizar o Poder do Cristal".
- O mestre deve descartar Relógios que perderam a importância para a história, desde que isso não tire dos jogadores a autonomia de moldá-la.

## Cenas de conflito

Em perseguições, batalhas, audiências e outras cenas de conflito, PJs e NPCs agem uns contra os outros, e os Relógios acompanham o progresso de todos. O livro explica isso na ação Objetivo (p. 72) e na seção sobre cenas de conflito (a partir da p. 58).

> **Exemplo:** num duelo entre Bertrand e Duma, o mestre dá um Relógio de **6 seções** a cada um. Quem completar o seu primeiro vence.

## Ritmo e pressão

Relógios também servem de **contador de tempo**: mostram quanto os heróis têm para impedir o plano do vilão, obter um item ou descobrir algo, e assim eles gerenciam melhor os recursos e sentem que suas ações importam. Esses Relógios raramente avançam só por testes e costumam ser o foco de uma ou mais sessões.

> **Exemplo:** a Aeronave Obliteradora Babel começa a operar em quatro dias. O mestre desenha no mapa do mundo um Relógio de **4 seções**.

O livro trata dos Relógios nas páginas 52 a 55.`,
    ['regra', 'mestre', 'narrativa', 'cena'],
  ),
];
