import { inBook, rule } from './helpers';
import { SeedEntry } from './types';

/**
 * Bestiary Vol. I, "Variants and Options" (printed p. 344-349): four optional rules.
 * Translated and unofficial; the text is our own words. Registered with `inBook`.
 */
const tags = ['regra opcional', 'bestiary vol. i', 'inimigos'];

export const bestiaryOptionRules: SeedEntry[] = inBook('bestiary-vol-1', [
  rule(
    'Afinidades por Categoria',
    344,
    'Regra opcional: inimigos também têm Afinidades a dano causado por armas de certas Categorias (Vulnerável a 1 a 3, com Resistências ou Imunidade/Absorção em troca), o que premia levar armas variadas.',
    `Esta regra opcional incentiva variedade nas armas dos heróis: reunir armas de **Categorias** diferentes passa a valer tanto quanto reunir armas de tipos de dano diferentes. Como toda regra opcional, o grupo inteiro deve discutir e concordar com ela.

## Ao criar inimigos

As Categorias são: arcana, arco, luta, adaga, arma de fogo, malho, pesada, lança, espada e arremesso.

- Todo inimigo é **Vulnerável** ao dano de todos os tipos causado por armas de **uma a três Categorias** diferentes.
- Para cada Categoria a que o inimigo é Vulnerável, dê a ele também **Resistência a duas outras Categorias**, ou **Imunidade ou Absorção a uma outra Categoria**.

> **Exemplo:** um inimigo gelatinoso e viscoso poderia ser Vulnerável a dano de arcos, adagas e lanças, Resistente a dano de malhos e armas de arremesso e Imune a dano de armas de luta e pesadas.

## Como se combinam

Estas Afinidades se combinam com as Afinidades comuns pelas regras do Livro Básico (p. 92). Por exemplo, se um inimigo Vulnerável a arcos e Resistente a fogo for atingido por um arco que causa dano de fogo, ele é tratado como neutro contra esse dano. Se uma arma pertence a mais de uma Categoria, combine todas as Afinidades correspondentes para chegar ao resultado final.

## Quando usar

Funciona bem em grupos que gostam de colecionar armas, mas pode frustrar Jogadores com uma estética específica em mente (como um lanceiro ou um pistoleiro dedicados). Só use se todos estiverem empolgados.

Não use junto com [[pressao-e-desestabilizacao]], que já interage com as Categorias.

*Bestiary Vol. I (inglês), não oficial.*`,
    tags,
  ),

  rule(
    'Trespassar (variante)',
    345,
    'Versão alternativa de Trespassar para campanhas em que os inimigos não usam armadura nem escudo (Montagem Rápida e Compêndio): ataque único de 10 PM com dano extra ou aliados com dano extra.',
    `Os inimigos criados pela [[montagem-rapida]] e os do Compêndio do Bestiary Vol. I não usam equipamento, e o mesmo vale para as regras opcionais de Tecnosferas do Atlas Techno Fantasy. Nessas campanhas, e em qualquer outra em que os heróis enfrentem sobretudo inimigos sem escudo ou armadura, o Poder [[trespassar]] perde muito do apelo. Esta variante pode ser usada no lugar dele, e fica disponível a qualquer Mestre de Armas que a prefira à versão padrão.

## Trespassar (variante) · nível máximo 3

Você pode usar uma **ação** e gastar **10 PM** para fazer um **ataque livre** com uma arma corpo a corpo equipada; o ataque deve ter **somente uma criatura** como alvo. Se acertar, escolha uma opção:

- o ataque causa **(NP × 5)** pontos de dano adicional e o dano **ignora Resistências**, mas também ignora Vulnerabilidades a qualquer tipo de dano que não seja físico; ou
- o ataque não causa dano e, até o início do seu próximo turno, seus aliados causam **(NP × 2)** pontos de dano adicional ao alvo dele.

## Golpe Pulverizador com esta variante

Se o grupo adotar esta versão de Trespassar, trate o Poder Heroico [[golpe-pulverizador]] com o texto abaixo:

> Ao usar Trespassar, se você atacar com uma arma corpo a corpo da categoria **pesada**, pode tratar o seu nível no Poder Trespassar como 2 pontos maior (até o nível máximo 5).

*Bestiary Vol. I (inglês), não oficial.*`,
    tags,
  ),

  rule(
    'Acromorfose Maior (variante)',
    345,
    'Troca o terceiro item do Poder Heroico Acromorfose Maior em campanhas sem equipamento para NPCs: ataques desarmados causam dano extra a construtos e a criaturas de armadura pesada ou escamas grossas.',
    `Assim como [[trespassar]], parte do Poder Heroico [[acromorfose-maior]] (Atlas Techno Fantasy) interage com armaduras e escudos usados por NPCs. Numa campanha em que os NPCs não usam equipamento, troque o **terceiro item** do Poder pelo texto abaixo.

## Terceiro item (variante)

- **Arma de fogo, pesada:** seus ataques desarmados causam **5 pontos de dano adicional a construtos** e **5 pontos de dano adicional a criaturas que não sejam construtos** e estejam cobertas por armadura pesada ou por escamas grossas. O Mestre tem a palavra final sobre se o efeito se aplica.

*Bestiary Vol. I (inglês), não oficial.*`,
    tags,
  ),

  rule(
    'Pressão e Desestabilização',
    346,
    'Regra opcional de "desestabilização": Vulnerabilidades e armas de Categorias certas enchem um Relógio de Pressão dos elites e campeões; quando cheio, o inimigo perde os turnos da rodada e fica Vulnerável à maioria dos danos.',
    `Parecida com a regra de pontos de superioridade do Livro Básico, esta regra opcional traz um sistema de **desestabilização** ao combate. Pode valer para a campanha inteira ou ser um truque de um chefe específico.

Com ela, as Vulnerabilidades **não** fazem um inimigo mais forte perder o dobro de PV na hora. Em vez disso, elas servem para **pressioná-lo** até um ponto de ruptura: o inimigo fica **desestabilizado**, Vulnerável à maioria dos tipos de dano e sem ações pelo resto da rodada. A regra **não vale para soldados**, que seguem as regras normais, porque controlar pressão e desestabilização deles seria trabalhoso demais.

## Ao criar inimigos

Todo inimigo **elite** ou **campeão** entra em cena com um **Relógio de Pressão** vazio e alguns **pontos de pressão**, que são Categorias de arma especialmente úteis contra ele (as mesmas dez de [[afinidades-por-categoria]]).

- Um **elite** tem um Relógio de Pressão de **4 seções** e **dois** pontos de pressão.
- Um **campeão** tem um Relógio com **(2 + o dobro do número de soldados que substitui)** seções e **quatro** pontos de pressão.

> **Exemplo:** um mecha militar enorme (campeão 3) com uma torreta de mísseis (soldado) e um projetor de escudo de energia (soldado). A torreta e o projetor seguem as regras normais e são Vulneráveis a fogo. O mecha é Vulnerável a raio, tem luta, arma de fogo, pesada e lança como pontos de pressão e um Relógio de Pressão de 8 seções.

Como a regra já interage com as Categorias, **não use junto com** [[afinidades-por-categoria]].

## Encher o Relógio

Os principais modos de preencher seções do Relógio de Pressão:

- Quando um inimigo **não desestabilizado** perde PV por dano de um tipo a que é Vulnerável, ele **não perde o dobro de PV** como na regra do Livro Básico (p. 92). Em vez disso, o Relógio enche **1 seção**, ou **2 seções** se a perda de PV for igual ou maior que **(10 + metade do nível do inimigo)**.
- Quando um inimigo **não desestabilizado** perde PV por dano de um ataque com arma, se uma ou mais Categorias da arma coincidirem com os pontos de pressão dele, o Relógio enche **1 seção**.

Os dois efeitos **não se acumulam**: se um ataque se enquadra nos dois, aplique só o primeiro (ou seja, ignore os pontos de pressão).

> **Exemplo:** um inimigo de nível 25, Vulnerável a gelo e com adagas entre os pontos de pressão, sofre 30 de dano de gelo de um ataque com adaga. Como o limite de dano para esse nível é 22, enchem-se 2 seções. Aqui o ponto de pressão é irrelevante.

O Relógio também pode ser preenchido por qualquer método que preencha seções de um Relógio, como a ação Objetivo, a oportunidade Progresso e Poderes como [[persuasivo]] do Orador.

## Esvaziar o Relógio

O Relógio de Pressão de um inimigo só se esvazia **no fim da rodada em que ele ficou desestabilizado** ou por efeitos feitos sob medida que citem Relógios de Pressão. O Mestre deve cuidar para que esses efeitos não sejam comuns nem fáceis demais de acionar, porque podem frustrar. Um inimigo que apaga 1 seção no fim de cada turno é irritante demais; um que apaga 1 seção quando acerta dois ou mais alvos com um ataque que só usa uma vez por rodada é bem mais justo, e ainda desafiador.

## Inimigos desestabilizados

Assim que o Relógio de Pressão de um inimigo fica cheio, ele fica **desestabilizado** e sofre estas penalidades:

- **Não pode agir.** Os turnos que ainda teria na rodada são perdidos. Se ficar desestabilizado no próprio turno, o turno termina na hora.
- Trata as Afinidades neutra (–) e de Resistência (RS) como **Vulnerabilidades**; todas as suas Vulnerabilidades (antigas e as novas) valem normalmente e causam perda dobrada de PV.
- Efeitos baseados nos turnos dele **não terminam, não começam nem se recarregam**. Porém, se o inimigo estava em Guarda e/ou cobrindo outra criatura, a Guarda se quebra e todos os benefícios dela acabam na hora. Um inimigo voador desestabilizado é forçado a pousar imediatamente (e pode voltar a voar no fim da rodada).

No **fim de cada rodada**, cada inimigo desestabilizado **esvazia todo o Relógio** e deixa de estar desestabilizado. Por isso pode valer esperar um pouco e desestabilizar um inimigo no começo da rodada seguinte, para aproveitar ao máximo.

Às vezes será preciso decidir como a desestabilização interage com regras especiais e efeitos em andamento de um inimigo. O Mestre sempre tem a palavra final, por ser quem escolheu ou criou o inimigo; vale considerar de antemão as interações mais prováveis.

## Descobrir pontos de pressão

Além de tentativa e erro, os pontos de pressão de um inimigo podem ser revelados como as Afinidades dele: qualquer opção do jogo que revele Afinidades, como examinar com um teste aberto ou o Poder [[analise-rapida]] do Erudito, também revela os pontos de pressão. Opções que permitam fazer uma pergunta ao Mestre e receber uma resposta sincera servem para perguntar sobre eles.

## Experimentar com pressão e desestabilização

A regra muda bastante o ritmo dos conflitos e abre espaço para truques de inimigos e Qualidades de itens que interajam com ela. Alguns exemplos:

- Chefes cujas Vulnerabilidades e pontos de pressão mudam ao entrar em crise pela primeira vez, no fim de cada rodada ou depois de uma ação específica.
- Um chefe cujo Relógio enche 2 seções sempre que um dos soldados que o acompanham é derrotado (os soldados são frágeis, mas ele pode invocar outro no fim de cada rodada).
- Um chefe cujo Relógio enche 1 seção no início de cada turno dele enquanto sofrer duas condições específicas.
- Um chefe Imune a todos os tipos de dano enquanto o Relógio estiver vazio (mas os pontos de pressão ainda podem ser explorados!).
- Uma dupla de inimigos em que cada um tem uma ação que, se der certo, apaga 1 seção do Relógio do parceiro... mas enche 1 seção do próprio Relógio se falhar.
- Um ataque de alvo único que causa dano adicional igual ao número de seções preenchidas do Relógio do atacante.
- Uma arma que causa 5 de dano adicional a inimigos desestabilizados; essa Qualidade deveria valer pelo menos 1000 zenit.
- Uma armadura que faz os feitiços do usuário encherem uma seção a mais do Relógio, desde que o feitiço já enchesse ao menos uma; deveria valer pelo menos 1500 zenit.
- Um escudo que dá Resistência a dano de todos os tipos causado por inimigos cujo Relógio já esteja preenchido pela metade ou mais; deveria valer pelo menos 1500 zenit.

*Bestiary Vol. I (inglês), não oficial.*`,
    tags,
  ),
]);
