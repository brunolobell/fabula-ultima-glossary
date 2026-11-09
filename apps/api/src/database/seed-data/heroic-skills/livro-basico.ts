import { heroicSkill } from '../helpers';
import { SeedEntry } from '../types';

// Poderes Heroicos do Livro Básico (páginas 232–241). Tabela na 232–233.
export const poderesHeroicosLivroBasico: SeedEntry[] = [
  // Disponíveis a todos os personagens
  heroicSkill({
    name: 'Ambidestria',
    page: 234,
    summary:
      'Aplica a luta com duas armas a quaisquer duas armas; se elas não compartilham categorias, você ganha +2 na Defesa e o segundo ataque de cada turno causa 5 de dano adicional.',
    body: `Você pode aplicar os benefícios de **luta com duas armas** (página 69) a qualquer par de armas, mesmo de categorias diferentes ou quando uma é corpo a corpo e a outra à distância (uma adaga e uma arma de fogo, por exemplo).

Enquanto tiver duas armas equipadas que **não compartilhem nenhuma categoria**:

- você recebe **+2 na Defesa**;
- o **segundo ataque** que fizer em cada um dos seus turnos causa **5 pontos de dano adicional**.`,
  }),

  heroicSkill({
    name: 'Feitiços Extras',
    page: 237,
    summary:
      'Você aprende dois feitiços de uma só lista de classe: Elementalista, Entropista ou Espiritualista.',
    body: `Ao adquirir este poder, aprenda **dois feitiços** de uma das listas de [[elementalista]], [[entropista]] ou [[espiritualista]]. Os dois devem ser da **mesma lista** e seguem as regras padrão da classe respectiva para serem lançados.`,
  }),

  heroicSkill({
    name: 'PI Extras',
    page: 239,
    summary: 'Aumenta permanentemente seus PI máximos em 4.',
    body: `Aumente permanentemente seus **Pontos de Inventário (PI)** máximos em **4**.`,
  }),

  heroicSkill({
    name: 'PM Extras',
    page: 239,
    summary:
      'Aumenta permanentemente seus PM máximos em 10 (20 se você estiver no nível 40 ou acima).',
    body: `Aumente permanentemente seus **PM máximos em 10**. Se você estiver no **40º nível ou acima**, esse aumento passa a ser de **20**.`,
  }),

  heroicSkill({
    name: 'PV Extras',
    page: 239,
    summary:
      'Aumenta permanentemente seus PV máximos em 10 (20 se você estiver no nível 40 ou acima).',
    body: `Aumente permanentemente seus **PV máximos em 10**. Se você estiver no **40º nível ou acima**, esse aumento passa a ser de **20**.`,
  }),

  // Com requisito de domínio de classe
  heroicSkill({
    name: 'Adversidade',
    page: 234,
    classes: ['Guerreiro Sombrio'],
    summary:
      'Enquanto sofre condições, você ganha +1 em todos os testes e causa 2 de dano adicional por condição que estiver sofrendo.',
    body: `Enquanto estiver sofrendo uma ou mais condições, você recebe **+1 em todos os testes** e causa **2 pontos de dano adicional para cada condição** que estiver sofrendo. Isso vale para qualquer fonte de dano: Arcanos, ataques, feitiços, itens ou qualquer outro método.`,
  }),

  heroicSkill({
    name: 'Ataque Poderoso',
    page: 234,
    classes: ['Furioso', 'Mestre de Armas'],
    summary:
      'Seus ataques corpo a corpo causam 5 de dano adicional (10 no nível 40 ou acima).',
    body: `Seus ataques corpo a corpo causam **5 pontos de dano adicional**. Se você estiver no **40º nível ou acima**, esse dano aumenta para **+10**.`,
  }),

  heroicSkill({
    name: 'Bolsos Fundos',
    page: 234,
    classes: ['Inventor'],
    summary: 'Reduz em 1 todos os seus custos em PI (mínimo 1).',
    body: `Você reduz os custos de **Pontos de Inventário** em **1** (mínimo 1).`,
  }),

  heroicSkill({
    name: 'Cometa',
    page: 234,
    classes: ['Entropista'],
    summary:
      'Você aprende o feitiço supremo de Entropista, Cometa (50 PM): 60 de dano a uma criatura ou 40 a todos os inimigos que você veja, sem tipo de dano.',
    body: `Você aprende o feitiço supremo de entropista: **Cometa**.

> **Cometa** · PM: 50 · Alvo: especial · Duração: instantânea

Você abre um grande portal do Cosmos e convoca uma rocha astral do vazio. Escolha uma opção:

- causa **60 pontos de dano** a uma criatura que você veja; ou
- causa **40 pontos de dano** a todos os inimigos que você veja.

Esse dano aumenta em **+5** se você estiver no 20º nível ou acima, e em **+10** se estiver no 40º nível ou acima. O dano **não tem tipo** (portanto não é afetado por Afinidades).`,
  }),

  heroicSkill({
    name: 'Companheiro Heroico',
    page: 235,
    classes: ['Andarilho'],
    alsoRequires: ['Companheiro Fiel'],
    summary:
      'Seu companheiro ganha +10 PV máximos, +5 de dano adicional, um Atributo um passo maior e um poder extra (outro no nível 40).',
    body: `Você recebe estes benefícios para o seu [[companheiro-fiel]]:

- os **PV máximos** do companheiro aumentam em **10**;
- ele causa **5 pontos de dano adicional**;
- escolha um dos Atributos dele; o dado básico desse Atributo aumenta um passo (máximo d12);
- ele recebe **um poder adicional**; ao chegar ao **40º nível** (ou se já o tiver ultrapassado), recebe mais um. Combine as escolhas com o mestre e o grupo.`,
  }),

  heroicSkill({
    name: 'Desalmado',
    page: 235,
    classes: ['Guerreiro Sombrio'],
    summary:
      'Ao atingir uma única criatura com quem tem Laço, você gasta metade dos PV atuais para causar 10 × a força do Laço de dano adicional (uma vez por turno).',
    body: `Quando atinge uma criatura com um ataque, se **apenas essa criatura** for o alvo e você tiver um **Laço** com ela, pode gastar **metade dos seus PV atuais** (arredondada para baixo). Se fizer isso, o ataque causa dano adicional igual a **10 × a força do seu Laço** com o alvo.

Só pode ser usado **uma vez por turno seu** em um conflito.`,
  }),

  heroicSkill({
    name: 'Domínio Quimérico',
    page: 235,
    classes: ['Quimerista'],
    repeatable: true,
    summary:
      'Escolha duas espécies (construto, demônio, elemental, morto-vivo) para aprender feitiços com Imitação Mágica e aumente em 2 seu limite de feitiços memorizados. Até duas vezes.',
    body: `Escolha **duas espécies** entre construto, demônio, elemental e morto-vivo. Você pode usar [[imitacao-magica]] para aprender feitiços de criaturas dessas espécies.

Pode ser adquirido **até duas vezes**, o que permite escolher duas espécies por vez.

Sempre que adquirir este poder, o seu limite de feitiços memorizados de Quimerista aumenta em **+2**.`,
  }),

  heroicSkill({
    name: 'Ecos Arcanos',
    page: 236,
    classes: ['Arcanista'],
    summary:
      'Num teste para apagar ou preencher seções de um relógio, se o domínio de um Arcano seu for aplicável, o sucesso mexe em uma seção a mais.',
    body: `Se os domínios de um ou mais **Arcanos vinculados a você** forem aplicáveis a um teste para **apagar ou preencher** seções de um relógio, ao obter sucesso você pode apagar ou preencher **uma seção adicional** do relógio.

O mestre tem a palavra final sobre um domínio ser ou não aplicável.`,
  }),

  heroicSkill({
    name: 'Esperança',
    page: 236,
    classes: ['Espiritualista'],
    summary:
      'Você aprende o feitiço supremo de Espiritualista, Esperança (40 PM): um PJ que se rendeu volta à consciência com metade dos PV máximos.',
    body: `Você aprende o feitiço supremo de espiritualista: **Esperança**.

> **Esperança** · PM: 40 · Alvo: especial · Duração: instantânea

Escolha um **PJ que tenha se rendido** e ainda esteja narrativamente presente na cena: ele recobra a consciência e recupera PV igual à **metade dos seus PV máximos**.

- O feitiço **não cancela** as consequências da rendição e não serve se o personagem saiu de cena como parte dela (capturado e levado embora, por exemplo).
- Um PJ só pode ser afetado **uma vez por cena**. Se voltar ao conflito assim e for reduzido a 0 PV de novo, deve se sacrificar ou se render pelas regras normais (com nova consequência e mais 2 Pontos de Fabula, no caso de rendição).`,
  }),

  heroicSkill({
    name: 'Feitiço Poderoso',
    page: 236,
    classes: ['Elementalista', 'Entropista', 'Espiritualista', 'Quimerista'],
    summary:
      'Seus feitiços causam 5 de dano adicional (10 no nível 40 ou acima).',
    body: `Seus feitiços causam **5 pontos de dano adicional**. Se você estiver no **40º nível ou acima**, esse dano aumenta para **+10**.`,
  }),

  heroicSkill({
    name: 'Golpe Tempestuoso',
    page: 237,
    classes: ['Mestre de Armas'],
    summary:
      'Em ataques corpo a corpo com multi, ganha bônus de Precisão igual ao valor de multi, +5 de dano, e mais +5 se o ataque atingir uma só criatura.',
    body: `Quando faz um ataque corpo a corpo com a propriedade **multi**, você recebe um **bônus no teste de Precisão** igual ao valor dessa propriedade multi, e o ataque causa **5 pontos de dano adicional**.

Se o ataque atingir **uma única criatura**, causa mais **5 pontos de dano**.`,
  }),

  heroicSkill({
    name: 'Imbatível',
    page: 237,
    classes: ['Guardião'],
    summary:
      'Uma vez por cena, quando ia ficar com 0 PV, você resiste à dor e fica com exatamente 1 PV.',
    body: `**Uma vez por cena**, quando estiver prestes a ficar com 0 PV, você pode, em vez disso, resistir à dor e ficar com **exatamente 1 PV**.`,
  }),

  heroicSkill({
    name: 'Imunidade à Condição',
    page: 237,
    classes: ['Andarilho'],
    summary: 'Você se torna Imune a uma única condição à sua escolha.',
    body: `Você se torna **Imune a uma única condição**, à sua escolha.`,
  }),

  heroicSkill({
    name: 'Matemágica',
    page: 237,
    classes: ['Erudito'],
    summary:
      'Num feitiço de alvo "uma criatura", escolhe um Atributo e um dado: o feitiço atinge todas as criaturas da cena com esse dado básico, ao dobro do custo em PM.',
    body: `Quando lança um feitiço com alvo "uma criatura", escolha um **Atributo** (Destreza, Vigor, Astúcia ou Vontade) e um **tipo de dado** (d6, d8, d10 ou d12). Se o fizer:

- o alvo do feitiço passa a ser **todas as criaturas na cena cujo dado básico do Atributo escolhido seja o dado escolhido**;
- o **custo total em PM é dobrado**;
- no texto do feitiço, "o alvo" vira "cada alvo" (ou "um ou mais alvos", se o feitiço for Anomalia, Dissipar, Espelhar ou Piedade);
- quando o feitiço termina em um alvo, termina automaticamente em todos.

Se lançar um feitiço ofensivo dessa forma, você faz **um único teste de Magia** e compara com a Defesa Mágica de cada alvo.`,
  }),

  heroicSkill({
    name: 'Mão de Gorila',
    page: 238,
    classes: ['Furioso'],
    summary:
      'Equipa armas de duas mãos (espada, lança, malho, pesada) num só espaço de mão; o primeiro ataque com arma de duas mãos por turno causa +5 de dano e ignora Resistências.',
    body: `Você pode equipar armas de duas mãos das categorias **espada, lança, malho e pesada** usando **um único espaço de mão**.

Além disso, o **primeiro ataque** que fizer com uma arma de duas mãos em cada turno causa **5 pontos de dano adicional** e **ignora Resistências**.`,
  }),

  heroicSkill({
    name: 'Melhoria',
    page: 238,
    classes: ['Inventor'],
    summary:
      'Em um descanso, pode dar ou trocar a característica de armas, armaduras e escudos do grupo (até +1000z cada), pagando o custo reduzido pelo NP de Visionário × 100.',
    body: `Em um **descanso**, você pode escolher qualquer número de armas, armaduras e/ou escudos em posse do seu grupo. Para cada item escolhido, pode aplicar uma **característica** (se ele não tiver) ou **trocar** a atual por outra.

- As novas características devem estar nas listas de características do respectivo tipo de item e custar **+1000 zênites ou menos**.
- No fim do descanso, você gasta zênites iguais à **soma de todos os custos**, reduzida por **(NP do seu poder Visionário × 100)**. Se o fizer, os itens são modificados conforme suas escolhas.

A lista padrão de características de armas está na página 269; a de armaduras e escudos, na página 280.`,
  }),

  heroicSkill({
    name: 'Mira Perfeita',
    page: 238,
    classes: ['Atirador'],
    alsoRequires: ['Tiro de Aviso'],
    summary:
      'Ao usar Tiro de Aviso (sem causar dano), você escolhe duas opções em vez de uma.',
    body: `Quando atinge uma ou mais criaturas com um ataque à distância e escolhe **não causar dano** para usar [[tiro-de-aviso]], você pode escolher **duas opções** em vez de uma. Por exemplo: deixar cada criatura abalada e lenta, ou infligir uma condição a cada criatura e reduzir os PM delas ao mesmo tempo.`,
  }),

  heroicSkill({
    name: 'Muralha',
    page: 238,
    classes: ['Guardião'],
    summary:
      'No início da primeira rodada de cada conflito, você é Resistente a todos os tipos de dano e não pode sofrer condições até o fim da rodada.',
    body: `No início da **primeira rodada** de cada cena de conflito, você é **Resistente a todos os tipos de dano** e **não pode sofrer condições** (mas não se recupera das que já tinha). O benefício dura até o fim da primeira rodada.`,
  }),

  heroicSkill({
    name: 'Pilhar',
    page: 239,
    classes: ['Ladino'],
    alsoRequires: ['Roubo de Alma'],
    summary:
      'Roubo de Alma pode ter qualquer número de criaturas como alvo, com um único teste comparado à Defesa Mágica de cada uma.',
    body: `Quando usa [[roubo-de-alma]], você pode escolher como alvo **qualquer número de criaturas** ao mesmo tempo. Faça **um único teste** e compare-o com a Defesa Mágica de cada criatura que deseja furtar.`,
  }),

  heroicSkill({
    name: 'Previsível!',
    page: 239,
    classes: ['Erudito'],
    summary:
      'Com uma ação e 20 PM, escolhe um tipo de ação e a criatura (da qual você conhece 2+ Traços) paga 20 PM para fazê-la até seu próximo turno.',
    body: `Em um conflito, você pode usar uma **ação** e **20 PM** para antecipar os movimentos de uma criatura que você veja, desde que conheça **dois ou mais Traços** dela. Escolha um tipo de ação: **Ataque, Feitiço, Guarda, Objetivo ou Poder**.

Até o início do seu próximo turno, a criatura deve gastar **20 PM** sempre que quiser fazer a ação escolhida. Se não puder pagar, precisa fazer uma ação diferente.`,
  }),

  heroicSkill({
    name: 'Repetição',
    page: 239,
    classes: ['Orador'],
    summary:
      'Uma vez por turno, depois de usar Condenar ou Encorajar, você pode usá-lo de novo (pagando o PM de novo).',
    body: `**Uma vez por turno** em um conflito, depois de usar [[condenar]] ou [[encorajar]], você pode reutilizá-lo, no mesmo alvo ou em outro. Você ainda paga o custo em PM desse segundo uso.`,
  }),

  heroicSkill({
    name: 'Revelação',
    page: 240,
    classes: ['Arcanista'],
    summary:
      'Você se vincula a um Arcano novo, criado com o grupo e exclusivo seu; uma vez por cena, gasta 2 Pontos de Fabula para ativar a dispensa dele sem dispensá-lo.',
    body: `Você faz contato com um **Arcano desconhecido**, vinculando-o à sua alma. Ele deve ser criado em conjunto com o grupo; enquanto você viver, ninguém mais no seu mundo pode se vincular a ele.

**Uma vez por cena**, enquanto estiver fundido a um Arcano, você pode usar uma ação e gastar **2 Pontos de Fabula** para ativar o efeito de **dispensa** desse Arcano (se houver) **sem dispensá-lo**. Isso não ativa o poder Círculo Arcano (página 179).`,
  }),

  heroicSkill({
    name: 'Retórica Desarmante',
    page: 240,
    classes: ['Orador'],
    summary:
      'Numa cena de conflito, usa uma ação e (20 + metade do nível) PM para convencer um soldado abalado ou em crise a abandonar a luta pacificamente.',
    body: `Durante uma cena de conflito, você pode usar uma **ação** para escolher uma criatura de **patente soldado** que possa ouvi-lo e entendê-lo (o mestre diz quem é um alvo válido).

Se ela estiver **abalada ou em crise**, você pode gastar **(20 + metade do nível da criatura) PM** para fazê-la sair do conflito de maneira pacífica. Descreva como você a convence a desistir de lutar.`,
  }),

  heroicSkill({
    name: 'Sumir',
    page: 241,
    classes: ['Ladino'],
    summary:
      'Ao atingir criaturas com um ataque, gasta 1 Ponto de Fabula: elas ficam incapazes de ver você até o início do seu próximo turno.',
    body: `Quando atinge uma ou mais criaturas com um ataque, você pode gastar **1 Ponto de Fabula**. Se fizer isso, cada uma delas fica **incapaz de ver você** até o início do seu próximo turno.`,
  }),

  heroicSkill({
    name: 'Tiro Poderoso',
    page: 241,
    classes: ['Atirador'],
    summary:
      'Seus ataques à distância causam 5 de dano adicional (10 no nível 40 ou acima).',
    body: `Seus ataques à distância causam **5 pontos de dano adicional**. Se você estiver no **40º nível ou acima**, esse dano aumenta para **+10**.`,
  }),

  heroicSkill({
    name: 'Vulcão',
    page: 241,
    classes: ['Elementalista'],
    summary:
      'Você aprende o feitiço supremo de Elementalista, Vulcão (40 PM): 50 de dano de fogo a uma criatura ou 30 a todos os inimigos que você veja, ignorando Resistências e Imunidades.',
    body: `Você aprende o feitiço supremo de elementalista: **Vulcão**. Se combinar melhor com seu personagem, pode mudar o nome do feitiço e trocar o tipo de dano por ar, gelo, raio ou terra.

> **Vulcão** · PM: 40 · Alvo: especial · Duração: instantânea

Você canaliza a fúria do planeta numa onda de fogo e magma. Escolha uma opção:

- causa **50 pontos de dano de fogo** a uma criatura que você veja; ou
- causa **30 pontos de dano de fogo** a todos os inimigos que você veja.

Se estiver no 20º nível ou acima, o dano aumenta em **5**; no 40º ou acima, em **10**. O dano **ignora Resistências e Imunidades**.`,
  }),
];
