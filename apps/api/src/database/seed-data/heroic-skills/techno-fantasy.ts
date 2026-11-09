import { heroicSkill } from '../helpers';
import { SeedEntry } from '../types';

// "Novos Poderes Heroicos" do Atlas Techno Fantasy (páginas 170–177).
// Aplique `inBook('techno-fantasy', …)` ao registrar.
export const poderesHeroicosTechnoFantasy: SeedEntry[] = [
  heroicSkill({
    name: 'Acromorfose Maior',
    page: 171,
    classes: ['Mutante'],
    alsoRequires: ['Acromorfose'],
    summary:
      'Seus ataques desarmados ganham benefícios conforme a categoria atual (Defesa do alvo = Astúcia dele, dano adicional, +2 na Defesa, atingir voadores etc.).',
    body: `Você recebe benefícios conforme a **categoria atual** dos seus ataques desarmados:

- **Adaga, arcana, arremesso, luta:** seus ataques desarmados consideram a Defesa de cada alvo igual ao **dado de Astúcia atual** do alvo.
- **Arco, espada:** ataques desarmados com **duas ou mais criaturas** como alvo causam **5 pontos de dano adicional**.
- **Arma de fogo, pesada:** ataques desarmados causam **5 de dano adicional a construtos** e **5 de dano adicional a criaturas que não sejam construtos** e tenham um escudo e/ou armadura marcial equipados.
- **Lança, malho:** sua **Defesa aumenta em +2** e seus ataques desarmados podem **atingir criaturas voadoras**.

Se seus ataques desarmados contam em mais de uma categoria (por exemplo, pelo poder heroico Adepto das Lâminas), você recebe os benefícios de todas as categorias correspondentes.`,
  }),

  heroicSkill({
    name: 'Bruxa de Aço',
    page: 172,
    classes: ['Piloto'],
    summary:
      'Depois do primeiro feitiço do turno, pilotando seu veículo, escolhe: trocar um módulo ativo por um inativo, +5 de dano no próximo feitiço de dano, ou +10 PV no próximo feitiço de cura.',
    body: `Depois de lançar o **primeiro feitiço do seu turno** em um conflito, se estiver pilotando seu veículo pessoal, você pode (depois de resolver o feitiço) escolher um:

- escolher um módulo **ativo** para desativar e depois um **inativo** para ativar; ou
- o próximo feitiço que cause dano e que você lançar antes do fim da cena causa **5 pontos de dano adicional**; ou
- o próximo feitiço que restaure PV e que você lançar antes do fim da cena restaura **10 PV adicionais** de cada alvo.`,
  }),

  heroicSkill({
    name: 'Câmera Lenta',
    page: 172,
    classes: ['Entropista', 'Ladino'],
    note: 'Exige ter o poder Esquiva e/ou Tempo Roubado.',
    summary:
      'Bônus de iniciativa igual aos NP em Esquiva + Tempo Roubado; sem escudo ou armadura marcial, reduz o dano sofrido pelo NP de Esquiva e causa dano adicional igual ao NP de Tempo Roubado.',
    body: `Você recebe um bônus no **modificador de iniciativa** igual a **(seu NP em [[esquiva]] + seu NP em [[tempo-roubado]])**.

Se não tiver nenhum escudo ou armadura marcial equipados:

- todo o dano que você sofre é **reduzido** em **seu NP em Esquiva** (antes de Afinidades);
- você causa dano adicional igual ao **seu NP em Tempo Roubado**.`,
  }),

  heroicSkill({
    name: 'Campo Psíquico',
    page: 172,
    classes: ['Esper'],
    summary:
      'Seus dons "Quando você causa dano" também valem quando um aliado que ouve você causa dano; Escudo Psíquico passa a proteger você e seus aliados.',
    body: `Seus dons com o evento "**Quando você causa dano**" também podem ser usados "**Quando um aliado que consegue ouvir você causa dano**".

Se tiver o dom **Escudo Psíquico**, mude o efeito dele para: "Para esse teste, você e todos os aliados que possam ouvir você podem considerar sua Defesa e Defesa Mágica como **(seu dado de Vontade atual + 2 × o número de seções preenchidas no seu Relógio Mental)**". Se seus valores atuais forem melhores, ainda pode usá-los.`,
  }),

  heroicSkill({
    name: 'Descarga de Ondas Mentais',
    page: 172,
    classes: ['Esper'],
    summary:
      'Com o Relógio Mental cheio, usa uma ação para apagá-lo e causar 20 de dano físico a todos os inimigos ou 30 a um só (mais 10 no nível 20, mais 20 no nível 40).',
    body: `Enquanto o seu **Relógio Mental** estiver preenchido, você pode usar uma **ação** para apagar todas as seções. Se fizer isso, escolha um:

- causa **20 pontos de dano físico** a todos os inimigos presentes na cena; ou
- causa **30 pontos de dano físico** a um único inimigo que você veja.

Esse valor aumenta em **10** se você estiver no 20º nível ou acima, e em **20** se estiver no 40º nível ou acima.`,
  }),

  heroicSkill({
    name: 'Ecdise Maior',
    page: 173,
    classes: ['Mutante'],
    summary:
      'Ao usar Ecdise, você pode também se recuperar de todas as condições e/ou encerrar os feitiços de duração "Cena" que o afetam.',
    body: `Ao usar **Ecdise**, você pode escolher uma ou as duas opções: recuperar-se de **todas as condições** e/ou, se estiver sob efeito de feitiços com duração "**Cena**", deixar de ser afetado por todos eles.`,
  }),

  heroicSkill({
    name: 'Isca Chamariz',
    page: 173,
    classes: ['Atirador'],
    alsoRequires: ['Olhos de Águia'],
    summary:
      'Olhos de Águia pode criar uma isca por 10 PM que sofre dano no lugar de aliados; quando destruída, pode render um ataque livre devastador que ignora Imunidades e Resistências.',
    body: `Ao usar [[olhos-de-aguia]] e escolher a primeira opção, se não houver uma isca chamariz na cena, você pode gastar **10 PM** para criar uma **isca chamariz** com PV iguais a **(metade do seu nível + 5 × seu NP em Olhos de Águia)**.

- Quando um inimigo que veja a isca causar dano a uma ou mais criaturas, a isca sofre dano **no lugar de uma delas**, escolhida aleatoriamente. A isca tem Afinidade neutra a todos os tipos de dano (sem poder receber outras) e só sofre o dano, não outros efeitos.
- Quando um inimigo reduz a isca a 0 PV, ela é destruída e você rola **1d10**. Se o resultado for **igual ou menor que (3 + seu NP em Olhos de Águia)**, pode fazer um **ataque livre** com uma arma de fogo ou arco equipados. Ele só pode ter esse inimigo como alvo, recebe bônus no teste de Precisão igual ao **seu NP em Olhos de Águia**, e o dano **ignora Imunidades e Resistências**.

A isca não recupera PV e é destruída no fim da cena. Descreva a aparência dela!`,
  }),

  heroicSkill({
    name: 'Magicanhão Quântico',
    page: 174,
    classes: ['Inventor'],
    alsoRequires: ['Engenhocas'],
    note: 'Exige o benefício tecnomagia: avançada de Engenhocas.',
    summary:
      'Ataques com o magicanhão causam 5 de dano adicional; sem outra arma, o ataque pode recriar o magicanhão de graça, ganhar multi (3) ou virar dois ataques.',
    body: `Seus ataques com o magicanhão causam **5 pontos de dano adicional**.

Ao fazer a ação Ataque com o magicanhão, se não tiver outra arma equipada, você pode escolher um:

- destruir o magicanhão e **criar e equipar um novo sem custo** (ignore o custo de PI), usando o novo no ataque; ou
- o ataque ganha **multi (3)**; ou
- fazer **dois ataques separados** em vez de um, pelas regras de ataque com duas armas (Livro Básico, página 69).`,
  }),

  heroicSkill({
    name: 'Mimeoclepse',
    page: 174,
    classes: ['Mutante', 'Quimerista'],
    alsoRequires: ['Genoclepse', 'Imitação Mágica'],
    summary:
      'Ao usar Genoclepse num NPC de espécie que Imitação Mágica permite, o mestre revela os feitiços dele e você pode aprender um como feitiço de quimerista.',
    body: `Ao usar [[genoclepse]] em um NPC, se a espécie dele estiver entre aquelas de cujos feitiços você pode aprender com [[imitacao-magica]], o mestre deve **revelar todos os feitiços** conhecidos por esse NPC. Se ele conhecer um ou mais, você pode aprender **um deles** como um dos seus feitiços de quimerista.`,
  }),

  heroicSkill({
    name: 'Nebulização',
    page: 174,
    classes: ['Inventor'],
    alsoRequires: ['Engenhocas'],
    note: 'Exige o benefício alquimia: avançada de Engenhocas.',
    summary:
      'Criar poções dá Pontos de Nebulização (até 5), que aumentam o dano e a recuperação de poções e fragmentos; somem no fim da cena.',
    body: `Ao criar uma poção, você recebe **1 Ponto de Nebulização** (**2** se a poção foi criada pela alquimia de Engenhocas).

- Poções e fragmentos elementais criados por você causam dano adicional igual ao **dobro** dos seus Pontos de Nebulização atuais.
- Poções suas que recuperam PV e/ou PM restauram adicionais equivalentes a **(5 × seus Pontos de Nebulização atuais)**.
- O máximo é **5** Pontos de Nebulização, e você perde todos no fim de cada cena.`,
  }),

  heroicSkill({
    name: 'Ou Vai ou Racha',
    page: 175,
    classes: ['Furioso', 'Guerreiro Sombrio'],
    summary:
      'Antes do teste de Precisão, declara "ou vai ou racha!" para dobrar a RA no dano; se o resultado for par, a arma muda de forma ou vai para a mochila até o fim da cena.',
    body: `Ao atacar com uma arma, você pode declarar "**ou vai ou racha!**" antes do teste de Precisão. Se fizer isso, a **RA do teste é dobrada** para determinar o dano, e você aplica as seguintes penalidades se o resultado for um **número par**:

- se a arma for **mutável** (página 113), ela muda de forma imediatamente e não pode mudar de novo até o fim da cena;
- se a arma não for mutável (ou for mutável sem poder mudar de forma), ela vai para a sua **mochila** e não pode ser equipada até o fim da cena, mas você pode fazer a ação Equipamento imediatamente, sem custo.

Não vale para ataques desarmados, armas improvisadas, módulos de arma (página 161) nem escudos gêmeos (Livro Básico, página 203).`,
  }),

  heroicSkill({
    name: 'Pisar no Calo',
    page: 175,
    classes: ['Orador', 'Virtuoso'],
    alsoRequires: ['Condenar'],
    summary:
      'Condenar bem-sucedido num inimigo de quem você conhece um Traço devolve metade dos PM que ele perdeu e o deixa enfurecido; contra enfurecidos, dados iguais dão crítico.',
    body: `Quando tem sucesso ao usar [[condenar]] contra um inimigo de quem conhece **pelo menos um Traço**, você recupera PM iguais à **metade dos PM perdidos pelo alvo** e o faz ficar **enfurecido**, em vez das condições normais.

Além disso, ao fazer um **teste oposto** contra uma criatura enfurecida, ou um **teste de Precisão ou de Magia** para um ataque ou feitiço ofensivo com uma ou mais criaturas enfurecidas entre os alvos, você tem **sucesso crítico** quando os dois dados mostram o mesmo número (se não for falha crítica).`,
  }),

  heroicSkill({
    name: 'Sincronização Dinâmica',
    page: 176,
    classes: ['Piloto'],
    summary:
      'No início do turno, pilotando seu veículo, sincroniza com outro PJ (piloto ou passageiro): vocês usam os dados de Atributo um do outro, somam os Laços ao dano e compartilham ações até o fim da cena.',
    body: `No início do seu turno em um conflito, se estiver pilotando o seu veículo pessoal, você pode escolher um: **sincronizar** com outro PJ na cena pilotando o próprio veículo pessoal; ou sincronizar com outro PJ que seja **passageiro** do seu veículo. Descreva como vocês unem forças!

Enquanto a sincronização estiver ativa, ambos recebem:

- ao fazer um teste, podem usar os **dados atuais de Atributo do outro** no lugar dos seus (de um ou dos dois);
- ao causar dano, causam dano adicional igual a **(força do seu Laço com o outro + força do Laço dele com você)**;
- podem usar uma ação para fazer um **ataque livre com um módulo de arma** (ativo ou inativo) do veículo em que o outro estiver;
- depois do fim do seu turno, se o outro PJ ainda não jogou o turno dele nessa rodada, ele pode jogá-lo **imediatamente**.

A sincronização dura até o fim da cena, ou até você ou o outro morrer, ficar inconsciente, sair de cena, sincronizar de novo ou deixar de estar a bordo de um veículo pessoal.`,
  }),

  heroicSkill({
    name: 'Sobrecarga Explosiva',
    page: 176,
    classes: ['Piloto'],
    alsoRequires: ['Compressão Tecnológica'],
    summary:
      'Ao cair a 0 PV pela primeira vez na cena dirigindo seu veículo, você fica com 1 PV, o veículo desaparece e você causa dano igual ao valor de crise a uma criatura.',
    body: `Escolha um tipo de dano entre **fogo, gelo, luz, raio e trevas**.

Na **primeira vez** que for reduzido a 0 PV durante uma cena, se estiver dirigindo seu veículo pessoal, você pode ficar com **exatamente 1 PV**. Se fizer isso:

- você e quaisquer passageiros deixam o veículo, que **desaparece do mundo de jogo**;
- você causa dano igual ao **seu valor de crise** a uma única criatura que veja, do tipo escolhido.

Se o veículo desaparecer assim, o próximo uso de [[compressao-tecnologica]] custa **1 Ponto de Fabula adicional**.`,
  }),

  heroicSkill({
    name: 'Soldado Arcano',
    page: 177,
    classes: ['Atirador', 'Elementalista', 'Mestre de Armas'],
    note: 'Exige conhecer ao menos dois feitiços ofensivos.',
    summary:
      'Com uma ação, faz um ataque livre contra um inimigo (RA 0) e, se acertar, lança sem ação um feitiço ofensivo de até 20 PM contra ele (RA 0).',
    body: `Você pode usar uma **ação** para fazer um **ataque livre** com uma arma equipada. Ele deve ter um **único inimigo** como alvo. Se acertar, a sua **RA conta como 0** para calcular o dano.

Depois de resolver o ataque, se acertou, você pode fazer a ação **Feitiço sem custo de ação**: o feitiço deve ser **ofensivo**, ter custo total de **20 PM ou menos** e ter como alvo **apenas o inimigo atacado**. Você ainda paga os PM e faz o teste de Magia; a **RA do teste conta como 0** para calcular dano ou outros efeitos.`,
  }),

  heroicSkill({
    name: 'Sonho Partido',
    page: 177,
    classes: ['Esper', 'Guerreiro Sombrio'],
    summary:
      'Golpe das Sombras com espada faz os atingidos perderem PM igual ao dado de Vigor rolado e, com 8 ou mais, uma criatura (seu foco ou com Laço) faz uma ação a menos no próximo turno.',
    body: `Quando acerta uma ou mais criaturas com **Golpe das Sombras** usando uma **espada**, cada uma delas **perde PM** igual ao **número rolado no dado de Vigor** do Golpe das Sombras.

Então, se esse valor for **8 ou mais**, você pode escolher uma criatura atingida. Se ela for o seu **foco** ou você tiver um **Laço** com ela, ela faz **uma ação a menos** durante o próximo turno dela (mínimo zero).`,
  }),

  heroicSkill({
    name: 'Teriomorfose Maior',
    page: 177,
    classes: ['Mutante'],
    summary:
      'Ao usar Teriomorfose no seu turno (fora de Genoclepse), manifesta até três terioformas em vez de duas e faz uma ação adicional (que não pode ser Teriomorfose).',
    body: `Ao usar **Teriomorfose** no seu turno em um conflito, se isso não acontecer por meio de **Genoclepse**, você pode manifestar os efeitos de **até três terioformas** entre as que já aprendeu (em vez de apenas duas). Em seguida, pode fazer **uma ação adicional**, que não pode ser usada para o poder Teriomorfose.`,
  }),

  heroicSkill({
    name: 'Varredura Rápida',
    page: 177,
    classes: ['Erudito'],
    summary:
      'Na ação Estudo, examina as fichas de todos os inimigos que você veja com um único teste aberto (AST + AST), aplicado a cada um; esse teste não ativa Lampejo de Saber.',
    body: `Ao fazer a ação **Estudo** em um conflito, você pode examinar as fichas de **todos os inimigos que veja**. Se fizer isso, faz **um único teste aberto (AST + AST)** e aplica o resultado separadamente a cada inimigo (Livro Básico, página 319).

Se você tiver Lampejo de Saber, esse teste **não** pode ativá-lo.`,
  }),
];
