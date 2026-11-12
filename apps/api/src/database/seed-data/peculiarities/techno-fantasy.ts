import { peculiarity } from '../helpers';
import { SeedEntry } from '../types';

// "Novas Peculiaridades" do Atlas Techno Fantasy (páginas 119–128).
// Aplique `inBook('techno-fantasy', …)` ao registrar. Os slugs com sufixo
// resolvem a colisão com a mesma peculiaridade de um Atlas anterior.
export const peculiaridadesTechnoFantasy: SeedEntry[] = [
  peculiarity({
    name: 'Agitador',
    page: 120,
    summary:
      'Você atiça o povo contra os opressores: ao descansar perto de um assentamento, descobre do que os moradores têm medo ou cria um contato local.',
    body: `Quando você **descansa dentro ou perto de um assentamento**, escolha um:

- descobrir **do que os habitantes têm medo** (ou raiva); ou
- criar um **contato** que vive e atua na região: dê a ele um nome e uma especialização, e o mestre define o que ele pede em troca (ajuda, pagamento…).

> **Exemplo:** Mique, a Bruxa, ritualista experiente que ajuda em troca de materiais raros; Dois Dedos, negociante de armas preso pelas Forças de Segurança Planetária.`,
  }),

  peculiarity({
    name: 'Áugure do Planeta',
    page: 120,
    summary:
      'O rio das almas fala por você: ao recuperar PV ou PM de aliados, eles recuperam 5 a mais (10 a partir do nível 30) e se livram de uma condição; você faz rituais de espiritualismo.',
    body: `- Quando você **recupera PV e/ou PM** de um ou mais aliados, cada um recupera **5 PV e/ou PM adicionais**, e você escolhe uma condição entre **abalado, atordoado, enfurecido, envenenado, fraco ou lento**: cada um desses aliados se recupera dela. A partir do **30º nível**, o efeito de recuperação passa a **10**.
- Você faz rituais de **espiritualismo**.`,
  }),

  peculiarity({
    name: 'De Um Mundo Distante',
    slug: 'de-um-mundo-distante-techno-fantasy',
    page: 120,
    summary:
      'Você é uma anomalia neste mundo: ganha 1 Ponto de Fabula ao entrar em um conflito e pode evocar um Traço para rolar de novo mesmo numa falha crítica.',
    body: `- Você recebe **1 Ponto de Fabula** automaticamente ao participar de um conflito.
- Você pode **evocar um Traço** para rolar de novo mesmo que o teste seja uma falha crítica. Se fizer isso, não recebe o Ponto de Fabula da falha.`,
  }),

  peculiarity({
    name: 'Diabolista',
    page: 121,
    summary:
      'Você molda energia da rede de almas em um familiar demoníaco (NPC demônio de nível 5) que age por uma ação sua, evolui nos níveis 20 e 40 e pode absorver poderes de demônios derrotados.',
    body: `Com o grupo, crie o seu **familiar**: um NPC da espécie **demônio, de nível 5** (Livro Básico, p. 302). Ele:

- não tem iniciativa e **não sobe de nível**;
- tem **no máximo dois ataques básicos**;
- recebe **+3** em testes de Precisão e de Magia;
- tem PV máximos iguais a **(5 × o dado básico de Vigor dele + metade do seu nível)**.

No **20º nível**, o familiar recebe um poder adicional; no **40º**, outro. Combinem a escolha com o grupo.

- Quando um NPC da espécie **demônio** que você veja é reduzido a 0 PV e você está na cena, pode gastar **20 PM**: o mestre revela a ficha inteira da criatura e você pode **trocar um poder do familiar por um dela** (o mestre decide quais poderes estão disponíveis e como funcionam no familiar). Descreva a transformação.
- Você **não pode** ter o poder [[companheiro-fiel]] do andarilho, e vice-versa.
- O familiar **não joga um turno próprio**: uma vez por turno, você gasta uma ação para ele fazer uma ação. Efeitos ligados a turnos afetam o familiar durante o **seu** turno.
- Ele entra e sai das cenas com você e recebe os mesmos benefícios de descanso. Se for reduzido a **0 PV**, some da cena e reaparece ao seu lado no início da próxima cena em que você estiver, com PV igual ao valor de crise dele.`,
  }),

  peculiarity({
    name: 'Experimento Fugitivo',
    page: 122,
    summary:
      'Você é uma criatura de laboratório: pode ignorar um custo de até 100 PV, PM ou PI acumulando Pontos de Instabilidade, mas com 10 ou mais você cai a 0 PV e se rende.',
    body: `- Quando uma regra ou habilidade pedir que você gaste **100 ou menos PV, PM ou PI**, você pode acumular **1d8 Pontos de Instabilidade** para **ignorar** o custo.
- No **fim de cada sessão** (cerca de quatro horas de jogo), você perde **1d6** Pontos de Instabilidade (mínimo 0).
- Se os seus Pontos de Instabilidade chegarem a **10 ou mais**, seus PV caem a **0** e você deve se **render**; as consequências devem ter relação com a perda de controle das suas técnicas. Em seguida, você perde todos os Pontos de Instabilidade.`,
  }),

  peculiarity({
    name: 'Fantasma Cognitivo',
    page: 122,
    summary:
      'Você nasceu na rede de almas, entre demônios e humanos: Resistente a dois tipos de dano e Vulnerável a um terceiro, e faz rituais de ritualismo na rede de almas.',
    body: `- Escolha **dois tipos de dano** entre ar, fogo, gelo, luz, raio, terra e trevas: você fica **Resistente** a eles. Escolha um **terceiro** tipo: você fica **Vulnerável** a ele.
- Você faz rituais de **ritualismo** e pode usá-los para **transportar criaturas** para dentro e para fora da rede de almas, e para obter informações e **rastrear entidades** dentro dela.`,
  }),

  peculiarity({
    name: 'Fera Falante',
    slug: 'fera-falante-techno-fantasy',
    page: 123,
    summary:
      'Você é uma fera inteligente que só usa acessórios e módulos, ganha +2 em Defesa e Defesa Mágica sem armadura e escolhe dois benefícios entre armas personalizadas, um feitiço de NPC e dano desarmado maior.',
    body: `- Você **não pode usar nenhum item**, exceto **acessórios** e **módulos** de arma e de armadura. Em troca, enquanto o espaço de armadura estiver vazio, recebe **+2** em Defesa e Defesa Mágica.
- Você também recebe **dois benefícios** à sua escolha entre:
  - **Equipar armas personalizadas** ([[armas-personalizadas]]).
  - **Aprender um feitiço de NPC** ([[feiticos-de-npc]]), menos Devastação. Se ele pedir um teste de Magia, use (VIG + VON). Personalize os efeitos (nome, tipo de dano, condições…).
  - **Ataques desarmados** com **6 pontos de dano adicional**; a partir do **30º nível**, **10**.`,
  }),

  peculiarity({
    name: 'Inventor Prodígio',
    page: 124,
    summary:
      'Você tem paixão por tecnologia: uma vez por cena de conflito ignora um custo em PI e pode começar projetos, achando materiais com 1 Ponto de Fabula ao custo de um defeito terrível.',
    body: `- **Uma vez por cena de conflito**, se precisar gastar **PI**, você pode ignorar o custo.
- Você pode **começar projetos** ([[projetos]]). Se um projeto precisar de material ou ingrediente especial, pode gastar **1 Ponto de Fabula** para declarar que tem esse item. Se fizer isso, a invenção **deve ter um defeito terrível** (Livro Básico, p. 134).`,
  }),

  peculiarity({
    name: 'Mil Faces',
    page: 124,
    summary:
      'Você se disfarça de qualquer humanoide com a ação Poder e 1 Ponto de Fabula; o disfarce engana soldados, mas elites e campeões podem ver através dele.',
    body: `Se estiver **longe de olhares curiosos**, você pode usar a ação **Poder** e gastar **1 Ponto de Fabula** para se disfarçar como outra criatura **humanoide**. Se for alguém que você conhece, observou ou pesquisou, também adota a voz e os trejeitos dela.

- O disfarce engana facilmente criaturas de patente **soldado**. As de patente **elite** e **campeão** podem ver através dele se você **falhar em um teste** ou se usar uma **oportunidade**.
- Se houver um **vilão** na cena, ele pode gastar **1 Ponto de Ultima** para revelar a sua identidade, por coincidência ou intuição.`,
  }),

  peculiarity({
    name: 'Neo-Humano',
    page: 124,
    summary:
      'Você é a próxima fase da evolução humana: ao entrar num conflito, sobe em um o dado atual de um Atributo escolhido (ou o trata como d20 em testes), com efeitos colaterais.',
    body: `Ao adquirir, escolha **Astúcia, Destreza, Vigor ou Vontade**.

Quando entrar em uma **cena de conflito**, escolha um:

- **aumentar o dado atual** do Atributo escolhido em um (até o máximo de d12); ou
- se o **dado básico** dele for d12, considerar o dado atual como **d20** (apenas em testes, desconsiderando condições).

O efeito dura até o fim da cena. Ao escolher uma das opções, o mestre pode gastar uma **oportunidade** (na cena ou depois) para mostrar os efeitos colaterais das suas habilidades (atrair uma entidade psíquica, alertar autoridades, danificar o continuum…).`,
  }),

  peculiarity({
    name: 'Oficial Arrependido',
    page: 125,
    requirement:
      'Só com o Tema Dúvida ou Culpa; o Tema não pode mudar enquanto você tiver esta peculiaridade.',
    summary:
      'Você desertou de uma organização armada que virou uma ameaça do mundo: tem um item raro de até 1.000z e acumula Pontos de Subversão (usados como Pontos de Fabula) ao atrapalhá-la.',
    body: `Você só pode adquirir esta peculiaridade se o seu **Tema for Dúvida ou Culpa**, e ele não muda de modo algum enquanto você a tiver.

Ao adquirir, descreva a **organização** em que trabalhou, dê nome ao **vilão que a lidera** e liste as suas **três principais estratégias**. Ela se torna uma **ameaça** ao seu mundo.

> **Exemplo:** a Corporação Encruzilhada Galáctica, que explora recursos de planetas, acaba com direitos trabalhistas e coloniza o espaço; as Forças de Segurança Deluvianas, que usam força excessiva, traficam protótipos de armas tecnomágicas e espalham desinformação; a Companhia Privada Peckerson, que sabota protestos pacíficos, intimida civis e se infiltra em sindicatos.

- Você roubou algo da organização: tem **um item raro** de até **1.000z**, escolhido nas listas disponíveis ou criado com o grupo.
- No **fim de cada sessão** (cerca de quatro horas de jogo), se você atrapalhou uma ou mais estratégias da organização, ou remediou um mal que ela causou, ganha **1 Ponto de Subversão**. Em caso de dúvida, a palavra final é sua; seja o mais honesto possível.
- Quando precisar gastar **Pontos de Fabula**, você pode gastar **1 Ponto de Subversão** (seja qual for a quantidade necessária).
- Quando o vilão que lidera a organização for derrotado e se render, você perde esta peculiaridade, aumenta permanentemente seus **PV e PM máximos em 10** e muda o Tema para **Pertencimento, Dever ou Justiça**.`,
  }),

  peculiarity({
    name: 'Relíquia Enigmática',
    page: 126,
    summary:
      'Você tem uma relíquia (arma rara de até 1.200z) que manifesta poderes pela ação Poder, mas gera Pontos de Paradoxo que podem inutilizá-la ou liberar uma força terrível.',
    body: `Com o grupo, crie a **relíquia**: uma **arma personalizada rara** ([[armas-personalizadas]]) de valor até **1.200z**. Ela é um **artefato**: só pode ser destruída com o **sacrifício de um PJ** e só pode ser roubada ou perdida por uma **rendição**.

Enquanto um PJ ou vilão a tiver equipada, ele pode usar a ação **Poder** para manifestar um destes poderes:

- **(Só PJs)** Fazer **uma pergunta** ao mestre, respondida com sinceridade ao descrever as visões da relíquia.
- Escolher uma **disciplina** entre elementalismo, entropismo, espiritualismo, quimerismo e ritualismo: até o fim da cena, quem tiver a relíquia equipada faz rituais dessa disciplina pela **metade do custo em PM**.
- Até o fim da cena, os ataques com a relíquia causam **5 pontos de dano adicional**, todo o dano causado **ignora Absorção, Imunidades e Resistências**, e o personagem pode fazer **um ataque livre** com ela.

A segunda e a terceira opção são **cumulativas** entre si (usar a segunda com quimerismo três vezes na mesma cena faz os rituais de quimerismo custarem 1/8 do PM normal).

Depois que a relíquia manifestar um poder nas mãos de um PJ, ela gera **1d6 Pontos de Paradoxo**. Se chegarem a **10 ou mais**, todos se perdem na hora e o jogador rola um d6:

- **1 a 4:** a relíquia fica totalmente **inerte** e não pode ser equipada até que uma condição específica (definida pelo mestre) seja cumprida.
- **5 ou 6:** a relíquia libera uma força terrível: morte e destruição, uma séria alteração do tempo e do espaço, ou o surgimento de uma nova ameaça (à escolha do mestre).

Quando um **vilão** usa o poder da relíquia, ela nunca gera Pontos de Paradoxo. Se você se sacrificar e a relíquia não for destruída pelo sacrifício, ela continua na campanha com todas as regras intactas, podendo ser perdida como qualquer item (e só sendo destruída por um sacrifício).`,
  }),

  peculiarity({
    name: 'Robô',
    slug: 'robo-techno-fantasy',
    page: 127,
    summary:
      'Você é um humanoide parcial ou totalmente mecânico: não é um ser vivo, é imune a veneno, Resistente a terra, e ganha +2 em testes para examinar ou usar máquinas e tecnologia.',
    body: `- Você **não é considerado um ser vivo**, é **imune** à condição envenenado, tem **Imunidade** a dano de veneno e **Resistência** a dano de terra.
- Você não precisa respirar, comer nem beber, mas segue a regra de descanso normalmente. Recupera PV e se recupera de condições normalmente.
- Você recebe **+2** em todos os testes para examinar ou interagir com **máquinas, tecnologia e construtos** (exceto testes de Precisão e de Magia).`,
  }),

  peculiarity({
    name: 'Sobrevivente',
    slug: 'sobrevivente-techno-fantasy',
    page: 127,
    summary:
      'Você sobreviveu a uma catástrofe, ataque militar ou invasão corporativa: PV e PM máximos +5 e uma opção entre equipamento marcial, um feitiço de elementalista ou espiritualista, ou +2 PI máximos.',
    body: `- Seus **PV e PM máximos** aumentam em **5**.
- Escolha uma opção:
  - poder equipar **armas corpo a corpo e à distância, armaduras e escudos marciais**; ou
  - aprender **qualquer feitiço** da lista de [[elementalista]] ou [[espiritualista]]; ou
  - aumentar permanentemente seus **PI máximos em 2**.`,
  }),

  peculiarity({
    name: 'Transporte Roubado',
    page: 127,
    summary:
      'Você tem um transporte armado para combate de veículos, médio ou grande, com espaço para o grupo e uma dúzia de passageiros; o mestre pode dar 2 Pontos de Fabula por sessão para complicá-lo.',
    body: `Você tem um transporte à sua escolha entre os de [[servicos-e-transporte]] (veículo terrestre, navio ou aeronave) ou uma **nave espacial** ([[servicos-e-transporte-viagem-espacial]]). Ele é **médio ou grande**, o bastante para você, o resto do grupo e **uma dúzia de passageiros**, e vem equipado com armamentos que permitem o **combate de veículos** (Atlas Techno Fantasy, p. 65).

- **Uma vez por sessão** (cerca de quatro horas de jogo), o mestre pode lhe conceder **2 Pontos de Fabula** para introduzir uma complicação narrativa ligada ao transporte ou ao dono anterior.
- O veículo **não pode ser destruído** sem a sua permissão.`,
  }),

  peculiarity({
    name: 'Xifossimbiose',
    page: 128,
    summary:
      'Você é uma presença presa a uma arma que outro PJ empunha: vocês dividem um Laço e seus PV nunca caem abaixo de 1 (o excesso vai ao portador), e a ligação pode acabar em Despertar, Legado ou Estilhaçar.',
    body: `Ao adquirir, escolha outro personagem como seu **portador**; o jogador dele precisa concordar. Os dois criam na hora um Laço ([[lacos]]) com **1 emoção** entre admiração, desconfiança, inferioridade e lealdade.

Com o grupo, crie o seu **núcleo**: uma **arma rara personalizada** ([[armas-personalizadas]]) de valor até **1.200z**.

- O núcleo **não pode ser perdido, roubado ou destruído** por meios externos, mas se desintegra se você se sacrificar. Ele nunca é marcial e qualquer um pode equipá-lo. Quem o equipa pode usar a ação **Poder** para trocar os próprios Atributos nos testes de Precisão por **qualquer combinação de dois Atributos diferentes** (nas duas formas, se a arma for mutável).
- Enquanto você tiver esta peculiaridade, **só o seu portador** pode usar o núcleo.
- Seus **PV nunca caem abaixo de 1**: o dano excedente é sofrido pelo portador, a qualquer distância.
- Quando o portador se **render**, você some na hora, recolhido no núcleo, e fica dormente até ele recobrar a consciência. O mestre pode impor as consequências da rendição a você ou a ele.
- Quando o portador se **sacrificar**, escolha um:
  - **Despertar** (só se a força somada dos seus Laços for **8 ou mais**): você perde esta peculiaridade e o núcleo aparece em suas mãos; você faz a ação Equipamento sem custo e o equipa.
  - **Legado** (só se outro personagem disposto que você veja estiver em cena): ele vira seu novo portador e o núcleo aparece na mochila dele.
  - **Estilhaçar:** você se sacrifica no lugar do portador, que recupera PV igual ao valor de crise e não precisa se render nem se sacrificar.
- Sempre que **subir de nível**, se a força somada dos seus Laços for **10 ou mais**, você pode causar um Despertar como descrito acima, sem precisar do sacrifício.`,
  }),
];
