import { heroicSkill } from '../helpers';
import { SeedEntry } from '../types';

// "Novos Poderes Heroicos" do Atlas Natural Fantasy (páginas 160–169).
// Aplique `inBook('natural-fantasy', …)` ao registrar.
export const poderesHeroicosNaturalFantasy: SeedEntry[] = [
  heroicSkill({
    name: 'Alma Quimérica',
    page: 161,
    classes: ['Mutante', 'Quimerista'],
    alsoRequires: ['Imitação Mágica'],
    summary:
      'Ao lançar um feitiço de Quimerista, ganha um benefício pela espécie de origem do feitiço: Resistência aos dois tipos de dano dela, ou +5 de dano nesses tipos, até o fim da cena.',
    body: `Ao lançar um dos seus feitiços de quimerista, você recebe um benefício baseado na **espécie da criatura a quem o feitiço pertencia originalmente**. Escolha um:

- você se torna **Resistente** aos dois tipos de dano associados à espécie; ou
- ao causar dano de um desses tipos, você causa **5 pontos de dano adicional**.

O benefício dura até o fim da cena ou até você lançar outro feitiço de quimerista.

## Tipos de dano por espécie

| Espécie | Tipos de dano |
| --- | --- |
| Construto | terra e veneno |
| Demônio | fogo e gelo |
| Elemental | ar e raio |
| Fera | ar e gelo |
| Monstro | raio e fogo |
| Morto-vivo | trevas e veneno |
| Planta | terra e luz |`,
  }),

  heroicSkill({
    name: 'Caçador Silencioso',
    page: 162,
    classes: ['Atirador', 'Ladino', 'Mestre de Armas'],
    alsoRequires: ['Alta Velocidade'],
    summary:
      'Ataques livres de Alta Velocidade com arco, lança ou arma de arremesso causam 5 × NP de dano adicional; criaturas que você ataca com essas armas não fazem ataques livres no turno.',
    body: `Ao usar [[alta-velocidade]] para fazer um **ataque livre com um arco, lança ou arma de arremesso**, o ataque causa dano adicional igual a **(5 × seu NP em Alta Velocidade)**.

Além disso, se atacar uma ou mais criaturas com um arco, lança ou arma de arremesso, elas **não podem fazer ataques livres** até o fim do turno atual.`,
  }),

  heroicSkill({
    name: 'Cloromancia Maior',
    page: 162,
    classes: ['Floralista'],
    summary:
      'Uma vez por turno, ao uma magissemente sair do jardim, gasta 20 PM para reproduzir um de seus efeitos de "fim do turno"; rituais também controlam plantas soldado.',
    body: `**Uma vez por turno**, quando uma magissemente deixa o seu jardim, se ela tiver um ou mais efeitos ativados "**No fim do seu turno**", você pode gastar **20 PM** para reproduzir um desses efeitos. Pode escolher um efeito que não corresponda às seções atuais do seu relógio de germinação.

Além disso, se tiver **Influência Verdejante**, seus rituais também podem influenciar e controlar criaturas de patente **soldado** da espécie **planta** (mas você ainda não consegue criá-las).`,
  }),

  heroicSkill({
    name: 'Cochilo Poderoso',
    page: 162,
    classes: ['Andarilho', 'Guardião', 'Mercador'],
    summary:
      'Em um conflito, usa uma ação para recuperar (20 + metade do nível) PV e PM e todas as condições, ficando cego, surdo e com Defesa e Def. Mágica 5 até ser perturbado.',
    body: `No seu turno em um conflito, você pode usar uma **ação** para recuperar **(20 + metade do seu nível) PV e PM** e se recuperar de **todas as condições**. Se fizer isso:

- seu turno **termina imediatamente**;
- você perde a capacidade de **ver e ouvir**;
- sua **Defesa e Defesa Mágica** viram **5** e não podem ser modificadas (você ainda pode usar Proteger, do guardião).

Essas penalidades duram até o início do seu próximo turno, até você perder PV, ou até ser atingido por um ataque ou feitiço ofensivo.`,
  }),

  heroicSkill({
    name: 'Conjuração Maromba',
    page: 163,
    classes: [
      'Andarilho',
      'Esper',
      'Furioso',
      'Guerreiro Sombrio',
      'Quimerista',
    ],
    summary:
      'Num teste de Magia, você pode trocar um dos Atributos por Vigor; armas cujo teste de Precisão usa Vigor contam como arcanas.',
    body: `Ao fazer um **teste de Magia** para um feitiço ou ritual, você pode **substituir um dos Atributos por Vigor** (como (VIG + VIG) num ritual de quimerismo).

Se o teste de Precisão da arma que estiver equipando incluir Vigor, você pode considerá-la **arcana** para poderes e efeitos com esse pré-requisito.`,
  }),

  heroicSkill({
    name: 'Dedo Verde',
    page: 163,
    classes: ['Floralista'],
    summary:
      'Ao preencher seções do relógio de germinação, pode preencher 1 a mais ou 1 a menos (então não repete até esvaziá-lo); o dano das magissementes ignora Resistências.',
    body: `Quando preenche uma ou mais seções do seu **relógio de germinação**, você pode escolher um: preencher **1 seção adicional**; ou preencher **1 seção a menos** (mínimo 0). Se o fizer, não pode usar esse efeito de novo até o relógio ter se **esvaziado por completo**.

Além disso, o dano causado por suas magissementes **ignora Resistências**.`,
  }),

  heroicSkill({
    name: 'Dosagem Precisa',
    page: 163,
    classes: ['Erudito', 'Gourmet', 'Inventor', 'Mercador'],
    summary:
      'Poções, iguarias e feitiços seus podem recuperar PV e PM acima do máximo, até 150% dele; o excedente some no fim da cena.',
    body: `As poções e iguarias que você cria, e os feitiços que você lança, agora podem fazer criaturas **recuperarem PV e PM além dos máximos**. O PV ou PM atual de uma criatura não pode passar de **150%** dos pontos máximos.

No fim de cada cena, quem ainda estiver acima do máximo volta ao valor máximo.`,
  }),

  heroicSkill({
    name: 'Especialidade da Casa',
    page: 164,
    classes: ['Gourmet'],
    summary:
      'Você escolhe três sabores e três efeitos; ao preparar em conflito uma iguaria com exatamente 3 ingredientes, um de cada sabor escolhido, aplica os efeitos escolhidos em vez dos normais.',
    body: `Ao adquirir este poder, escolha **três sabores diferentes** entre amargo, salgado, azedo, doce e umami. Em seguida, escolha **três efeitos diferentes** da lista:

- causa **20 pontos de dano de luz ou trevas** (escolha o tipo ao adquirir) a todos os alvos da iguaria; **30** se você estiver no 30º nível ou acima;
- durante o próximo turno de cada alvo, todo o dano que ele causa passa a ser de **luz ou trevas** (escolha ao adquirir), e não pode ser mudado;
- cada alvo sob efeito de feitiços com duração "Cena" deixa de estar sob esse efeito;
- escolha você mesmo ou um aliado que veja: da próxima vez que cada alvo atacar ou lançar um feitiço ofensivo nesta cena, a criatura escolhida deve ser incluída entre os alvos, se possível;
- cada alvo fica **furioso**;
- cada alvo fica **envenenado**;
- cada alvo recupera **30 PV e 30 PM** (**40** se você estiver no 40º nível ou acima);
- cada alvo se recupera de **uma condição** à sua escolha;
- cada alvo se recupera de **atordoado, furioso e abalado**;
- cada alvo se recupera de **envenenado, lento e fraco**.

## Como funciona

Quando cria uma iguaria usando **exatamente 3 ingredientes** em um conflito, se cada ingrediente equivaler a um sabor **diferente** entre os escolhidos, você pode **ignorar todos os efeitos normais** da iguaria e aplicar, em vez disso, um, dois ou todos os efeitos que escolheu.`,
  }),

  heroicSkill({
    name: 'Golpe Valente',
    page: 165,
    classes: ['Comandante', 'Furioso', 'Guardião', 'Mestre de Armas', 'Piloto'],
    summary:
      'Ao usar Quebra-ossos contra um único alvo com escudo equipado, você desafia a criatura; ataques livres seus com arma de uma mão contra ela causam +5 de dano (uma vez por turno).',
    body: `Quando usa **Quebra-ossos**, se o ataque tiver **apenas uma criatura** como alvo e você tiver um **escudo** equipado, pode **desafiar** essa criatura até o fim do seu próximo turno. O desafio também termina se outra pessoa desafiar a criatura ou se você desafiar outra.

Uma criatura desafiada deve **incluir você** entre os alvos de seus ataques e feitiços ofensivos, se possível.

Além disso, **uma vez por turno** (inclusive nos de outras criaturas), quando você causar dano à criatura desafiada com um **ataque livre** feito com uma arma corpo a corpo de uma mão ou com uma arma personalizada das categorias espada ou adaga, pode causar **5 pontos de dano adicional** a ela.`,
  }),

  heroicSkill({
    name: 'Lado a Lado',
    page: 165,
    classes: ['Andarilho'],
    alsoRequires: ['Companheiro Fiel'],
    summary:
      'Seu companheiro causa +5 de dano, você pode gastar 1 Ponto de Fabula para ele re-rolar um teste, e após Companheiro Fiel você escolhe recuperar 10 PM cada ou um bônus de teste.',
    body: `- Quando o seu companheiro causa dano, ele causa **5 pontos de dano adicional**.
- Quando ele faz um teste, você pode gastar **1 Ponto de Fabula** e evocar um dos Traços dele para que role de novo um ou ambos os dados (regras do Livro Básico, página 46).
- Depois de usar [[companheiro-fiel]] para ele fazer uma ação no seu turno (e depois que a ação for resolvida), escolha um: você e o companheiro **recuperam 10 PM cada**; ou a primeira vez que você ou ele fizer um teste até o fim do seu próximo turno, o teste recebe um **bônus igual ao seu NP em Companheiro Fiel**.`,
  }),

  heroicSkill({
    name: 'Levanta a Cabeça!',
    page: 165,
    classes: ['Esper', 'Orador', 'Virtuoso'],
    alsoRequires: ['Confio em Você'],
    summary:
      'Ao usar Confio em Você em outro personagem, ele escolhe um Atributo e passa a tratar o dado como um passo maior (máximo d12) até o fim da cena.',
    body: `Ao usar [[confio-em-voce]] em outro personagem, ele escolhe entre **Destreza, Astúcia, Vigor ou Vontade** e passa a considerar o dado atual do Atributo escolhido como **um passo maior** (máximo d12).

O benefício dura até o fim da cena ou até você usar Confio em Você nele de novo.`,
  }),

  heroicSkill({
    name: 'Luar Purificador',
    page: 166,
    classes: ['Entropista', 'Espiritualista'],
    summary:
      'Com arma arcana, um feitiço ofensivo com RA 8+ encerra os feitiços de duração "Cena" nos alvos, e feitiços em aliados podem curar uma condição escolhida.',
    body: `- Quando atinge uma ou mais criaturas com um **feitiço ofensivo**, se tiver uma **arma arcana** equipada e a **RA do teste de Magia for 8 ou mais**, você pode fazer essas criaturas deixarem de estar sob efeito de todos os feitiços com duração "**Cena**" que as afetem.
- Ao lançar um feitiço que tenha um ou mais **aliados** como alvo, se tiver uma arma arcana equipada, você pode escolher uma condição entre **abalado, atordoado, envenenado, fraco, furioso e lento**. Cada alvo se recupera da condição escolhida.`,
  }),

  heroicSkill({
    name: 'Manancial Interior',
    page: 166,
    classes: ['Invocador'],
    summary:
      'Ao adquirir e a cada descanso, escolhe um manancial (água, ar, fogo, raio, terra): ele passa a estar disponível em todas as cenas, dá Resistência a seu dano e permite rituais de elementalismo dele.',
    body: `Ao adquirir este poder e **sempre que descansar**, escolha um manancial: **água, ar, fogo, raio ou terra**. Até o próximo descanso:

- você considera o manancial escolhido como **disponível em todas as cenas** (além dos que já estiverem presentes);
- pode fazer **rituais de elementalismo**, mas só os que manipulem o elemento do manancial escolhido;
- fica **Resistente** ao tipo de dano do manancial;
- ao causar dano, pode **mudar o tipo** para o do manancial; se fizer isso, o dano **ignora Resistências**.`,
  }),

  heroicSkill({
    name: 'Manipular Magia',
    page: 166,
    classes: ['Elementalista', 'Entropista', 'Invocador', 'Simbolista'],
    alsoRequires: ['Invocação'],
    summary:
      'Depois que um inimigo acerta ou erra você com feitiço ofensivo e seu teste de Magia foi par, você usa Invocação sem ação e sem PM contra ele (não pode ser praga).',
    body: `Depois que um inimigo que você veja **acertar ou errar** seu personagem com um feitiço ofensivo, se o resultado do teste de Magia dele for um **número par**, você pode usar [[invocacao]] imediatamente, **sem usar uma ação** e **sem gastar PM**, depois que o feitiço for resolvido, para fazer uma das suas invocações contra esse inimigo.

Essa invocação não pode ser do tipo "praga" e deve ter apenas esse inimigo como alvo (não é possível usar Invocações Conectadas nesta ação).`,
  }),

  heroicSkill({
    name: 'Muralha de Espinhos',
    page: 167,
    classes: ['Floralista', 'Guerreiro Sombrio'],
    alsoRequires: ['Cloromancia'],
    summary:
      'Dá Resistência a luz e veneno, enche uma seção do relógio de germinação ao perder PV em crise e deixa o Golpe das Sombras causar veneno com dano extra pelas seções preenchidas.',
    body: `- Você tem **Resistência a dano de luz e de veneno**.
- Depois de perder PV, se estiver em **crise** e houver uma magissemente no seu jardim, pode **preencher 1 seção** do seu relógio de germinação.
- Ao usar **Golpe das Sombras**, pode fazer o ataque causar dano de **veneno** em vez de trevas (esse tipo não pode ser mudado). Se o fizer, o Golpe causa dano adicional igual a **(2 × o número de seções preenchidas no relógio de germinação)**.`,
  }),

  heroicSkill({
    name: 'Palavras de Sabedoria',
    page: 167,
    classes: ['Comandante', 'Erudito', 'Orador'],
    summary:
      'Em testes de Apoio você usa (AST + AST), (AST + VON) ou (VON + VON); ao ajudar em conflito com trabalho em equipe, gasta 10 PM e dá dois benefícios extras ao aliado.',
    body: `Ao fazer um **teste de Apoio**, se o líder do teste em grupo puder ouvir e entender você, pode usar **(AST + AST), (AST + VON) ou (VON + VON)** em vez dos Atributos normalmente exigidos. Descreva como dá seu conselho!

Além disso, ao usar **trabalho em equipe** (Livro Básico, página 76) para ajudar o teste de outro personagem no seu turno em um conflito, você pode gastar **10 PM** e escolher **até dois** benefícios:

- o personagem alvo recupera **20 PM**;
- ele se recupera de **atordoado, furioso e abalado**;
- no fim do turno dele, escolha um: ele faz um **ataque livre** com uma arma equipada; ou faz a ação **Feitiço sem custo de ação**, lançando um feitiço de custo total de até **20 PM**;
- se ele obtiver sucesso no teste e isso permitir preencher ou apagar seções de um relógio, ele preenche ou apaga **uma seção adicional**.`,
  }),

  heroicSkill({
    name: 'Poder dos Cinco Mananciais',
    page: 168,
    classes: ['Invocador'],
    summary:
      'Após uma invocação em conflito, você e um aliado tratam um Atributo como um passo maior, definido pelo manancial invocado (ar: Astúcia, terra: à escolha, fogo: Destreza, raio: Vigor, água: Vontade).',
    body: `Depois de fazer uma invocação durante um conflito, você e **até um aliado** que veja consideram um dos seus Atributos como **um passo maior** (máximo d12). Dura até o fim da cena ou até você usar este poder de novo.

O Atributo é definido pelo manancial invocado:

| Manancial | Atributo |
| --- | --- |
| Ar | Astúcia |
| Terra | à sua escolha |
| Fogo | Destreza |
| Raio | Vigor |
| Água | Vontade |`,
  }),

  heroicSkill({
    name: 'Por um Futuro Melhor',
    page: 168,
    classes: ['Mercador'],
    alsoRequires: ['Ventos do Comércio', 'Verdadeiro Tesouro'],
    summary:
      'Você pode gastar Pontos de Comércio no lugar de Pontos de Fabula e, ao receber 1 Ponto de Comércio de propósito, aumenta a prosperidade de um assentamento próximo, o que traz benefícios.',
    body: `Quando gastar 1 ou mais **Pontos de Fabula** (exceto para alterar a história, Livro Básico, página 98), pode gastar a mesma quantidade em **Pontos de Comércio**. Descreva que memórias de suas negociações e jornadas lhe dão força!

Além disso, quando receber **2 ou mais Pontos de Comércio** por [[verdadeiro-tesouro]] ou [[ventos-do-comercio]], pode escolher receber **exatamente 1**. Se o fizer, escolha um assentamento a **1 dia de viagem** de você e aumente a **prosperidade** dele em **(seu NP em Ventos do Comércio + seu NP em Verdadeiro Tesouro)**. A prosperidade começa em 0 e não tem limite.

## Efeitos da prosperidade

Ativos enquanto você estiver a 1 dia de viagem do assentamento:

| Prosperidade | Efeito |
| --- | --- |
| 10 ou mais | Quando você ou um aliado precisar pagar zênites por qualquer motivo, o custo cai pela metade. |
| 15 ou mais | Vocês descansam livremente, sem gastar zênites, e testes de Viagem na área nunca usam dado maior que d8. |
| 20 ou mais | Quando um vilão gasta Pontos de Ultima na área, precisa gastar o dobro. |`,
  }),

  heroicSkill({
    name: 'Refração Auramante',
    page: 169,
    classes: ['Arcanista', 'Espiritualista'],
    note: 'Exige ter o feitiço Aura e/ou Barreira.',
    summary:
      'Quando um inimigo causa dano a criaturas sob sua Aura ou Barreira, o dano sofrido cai e você retalia com dano do tipo escolhido (uma vez por turno).',
    body: `Escolha um tipo de dano entre **ar, raio, terra, fogo, gelo e luz**.

Quando um inimigo que você veja causa dano a uma ou mais criaturas sob efeito de um feitiço [[aura]] e/ou [[barreira]] lançado por você:

- o dano sofrido por cada uma é **reduzido** em **(metade do seu nível de espiritualista) ou (seu nível ÷ 10)**, o que for maior, antes de qualquer Afinidade;
- em seguida, você pode causar **dano do tipo escolhido** igual à **metade do seu nível** a esse inimigo. Se o fizer, não pode causar dano assim de novo até o início do seu próximo turno.`,
  }),

  heroicSkill({
    name: 'Rodízio',
    page: 169,
    classes: ['Gourmet'],
    summary:
      'Uma vez por cena, ao usar Culinária, você pode combinar quatro ingredientes numa iguaria, ignorando o limite de três.',
    body: `**Uma vez por cena**, ao usar Culinária, você pode combinar **quatro ingredientes** em uma iguaria, ignorando o limite normal de três. Fora isso, a iguaria segue a regra padrão.`,
  }),

  heroicSkill({
    name: 'Tranquilidade Efêmera',
    page: 169,
    classes: ['Dançarino', 'Esper', 'Espiritualista', 'Ladino', 'Simbolista'],
    summary:
      'Alucinação e Torpor aplicam as duas condições; com uma ação e até 20 PM, inimigos com 2+ condições perdem todas e PV, e você recupera PM por cada um que entrar em crise ou cair a 0 PV.',
    body: `- Ao lançar o feitiço **Alucinação** ou **Torpor** (Livro Básico, páginas 208–209), você pode aplicar **ambas as condições** a cada alvo atingido.
- Durante um conflito, pode usar uma **ação** e gastar **até 20 PM**. A cada **10 PM** gastos, escolhe um inimigo diferente que você veja e que esteja sofrendo **duas ou mais condições**. Cada inimigo escolhido se recupera de todas as condições e perde PV igual a **(metade do seu nível + 10 × o número de condições das quais se recuperou)**. Em seguida, você recupera **20 PM por inimigo** que entrou em crise ou foi reduzido a 0 PV graças a esse efeito.`,
  }),
];
