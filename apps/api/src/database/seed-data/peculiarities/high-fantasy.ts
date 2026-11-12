import { peculiarity } from '../helpers';
import { SeedEntry } from '../types';
import { HEROICO_SEM_REQUISITOS } from './shared';

// "Novas Peculiaridades" do Atlas High Fantasy (páginas 113–123).
// Aplique `inBook('high-fantasy', …)` ao registrar.
export const peculiaridadesHighFantasy: SeedEntry[] = [
  peculiarity({
    name: 'Almas Entrelaçadas',
    page: 114,
    summary:
      'Você habita o corpo de outro PJ (o hospedeiro) e sai dele à vontade; vocês ganham um Laço, se ouvem à distância e só descansam juntos.',
    body: `Ao adquirir, escolha outro PJ como **hospedeiro** da sua alma; o jogador dele precisa concordar. Os dois criam na hora um Laço ([[lacos]]) com **1 emoção** entre admiração, afeto e lealdade.

- Vocês se comunicam por telepatia (para as regras, são "capazes de ouvir um ao outro").
- **Fora de conflito**, você entra ou sai do corpo do hospedeiro quando quiser, aparecendo ao lado dele. Se estiver a mais de **1 dia de viagem**, você desaparece e reaparece ao lado dele. **Em conflito**, entra ou sai no início do seu turno, sem gastar ação.
- Dentro do corpo dele, você não percebe o mundo nem interage com ele, e as criaturas também não percebem você. Quem sente almas (por rituais ou habilidades parecidas) nota que há **duas almas** naquele corpo.
- Você só recebe os benefícios de um descanso se o hospedeiro **também** descansar.
- Quando **você** se render, entra no corpo do hospedeiro (e a rendição nunca o separa dele). Quando o **hospedeiro** se render, você entra no corpo dele e só sai quando ele recobrar a consciência.
- Quando o hospedeiro se **sacrificar**, escolha um:
  - **Sobrevivência:** você sai do corpo, perde esta peculiaridade, seus PV vão a 0 e você deve se render. Depois disso, seus PV e PM máximos aumentam em **10**.
  - **Última Despedida:** você se sacrifica no lugar dele, que recupera PV até ficar em crise e não precisa se render nem se sacrificar.`,
  }),

  peculiarity({
    name: 'Amaldiçoado',
    page: 115,
    summary:
      'Você carrega uma maldição ligada a uma ameaça do mundo: pode trocar um teste por falha crítica automática para ganhar 2 Pontos de Fabula e, ao quebrá-la, ganha um Poder Heroico.',
    body: `Ao adquirir, descreva a **natureza da maldição** e ligue-a a uma das **ameaças** do mundo. Quando a ameaça for resolvida, você pode quebrar a maldição; descreva como espera que isso aconteça.

> **Exemplo:** você erra os ataques com frequência; sua presença causa terror; sua magia dá resultados inesperados; criaturas próximas sentem dores intensas.

Antes de fazer um teste, em vez de fazê-lo, você pode descrever como a maldição o atrapalha e sofrer uma **falha crítica automática** (ambos os dados contam como 1). Se fizer isso, recebe **2 Pontos de Fabula** em vez de 1 e gera uma oportunidade normalmente.

Se conseguir **quebrar a maldição**, você recebe na hora um [Poder Heroico](/poderes-heroicos) à sua escolha, até de uma classe que você não aprendeu. ${HEROICO_SEM_REQUISITOS}`,
  }),

  peculiarity({
    name: 'Arbóreo',
    page: 115,
    summary:
      'Você é uma criatura botânica senciente: imune a uma condição à escolha, mas Vulnerável a um tipo de dano, e aprende um feitiço de NPC mais barato sob o sol.',
    body: `- Escolha uma condição entre **atordoado, enfurecido ou abalado**: você é **imune** a ela, mas **Vulnerável** a um tipo de dano à sua escolha entre ar, raio, terra, fogo e gelo.
- Você aprende um feitiço de NPC ([[feiticos-de-npc]]), exceto Devastação. Se ele pedir um teste de Magia, use (AST + VON). Personalize o feitiço (nome, tipo de dano, condição…). Ao lançá-lo **sob a luz do sol**, o custo total de PM cai em **5** (mínimo 0).`,
  }),

  peculiarity({
    name: 'Cerne Elemental',
    page: 116,
    summary:
      'Você é imerso no poder de um elemento: Resistente a ele, muda o tipo do seu dano para ele, é Vulnerável a outro e faz rituais de elementalismo do elemento.',
    body: `- Escolha seu **tipo de dano elemental** entre ar, raio, terra, fogo e gelo. Você fica **Resistente** a ele.
- Sempre que causar dano, você pode **mudar o tipo** dele para o escolhido.
- Em troca, você fica **Vulnerável** a um tipo de dano **diferente** entre os cinco.
- Você faz rituais de **elementalismo**, mas só os que manipulam o elemento escolhido (ar; eletricidade; terra/pedra; fogo; gelo/água, respectivamente).`,
  }),

  peculiarity({
    name: 'De Um Mundo Distante',
    page: 116,
    summary:
      'Você é uma anomalia neste mundo: ganha 1 Ponto de Fabula ao entrar em um conflito e pode evocar um Traço para rolar de novo mesmo numa falha crítica.',
    body: `- Você recebe **1 Ponto de Fabula** automaticamente ao participar de um conflito.
- Você pode **evocar um Traço** para rolar de novo mesmo que o teste seja uma falha crítica. Se fizer isso, não recebe o Ponto de Fabula da falha.`,
  }),

  peculiarity({
    name: 'Glorioso Destino',
    page: 117,
    summary:
      'Uma profecia fala de você: no fim de cada sessão você avalia se agiu a favor ou contra ela, e cumpri-la (ou desistir dela) lhe dá um Poder Heroico.',
    body: `Com a colaboração do grupo, descreva a **profecia** e o que ela previu, ligue-a a uma ameaça ou emergência do mundo e descreva o **sinal ou agouro** que o marca como quem a cumprirá.

> **Exemplo:** "o garoto com o colar de rubi fará a água voltar às Planícies Ermas"; "o Marcado destruirá o Dragão do Caos".

No **fim de cada sessão** (cerca de quatro horas de jogo), antes de distribuir a EXP, pense com honestidade no que aconteceu e escolha uma opção (vale conversar com o grupo):

- **A profecia foi cumprida:** perca esta peculiaridade, restaure por completo PV e PM, recupere-se de todas as condições e receba um [Poder Heroico](/poderes-heroicos) dentre os disponíveis para suas classes.
- **Você agiu de acordo com a profecia:** restaure por completo PV e PM e recupere-se de todas as condições.
- **Você não agiu nem a favor nem contra:** nada acontece.
- **Você agiu contra a profecia:** receba **1 Ponto de Fabula**.
- **A profecia nunca poderá ser cumprida:** perca esta peculiaridade, receba **6 Pontos de Fabula** e um Poder Heroico dentre os disponíveis para suas classes.

${HEROICO_SEM_REQUISITOS}

Depois da primeira ou da última opção, o papel da profecia no mundo acaba: mesmo que uma situação futura pareça encaixar nela, os efeitos desta peculiaridade não valem mais.`,
  }),

  peculiarity({
    name: 'Grilhões do Coração',
    page: 118,
    requirement:
      'Só com o Tema Dúvida; o Tema não pode mudar enquanto você tiver esta peculiaridade.',
    summary:
      'Você segue os mandamentos de um NPC ou instituição que começa a questionar: quebrá-los custa metade de seus PV e PM, mas dá Pontos de Fabula e, na sétima vez, liberta você.',
    body: `Você só pode adquirir esta peculiaridade se o seu **Tema for Dúvida**, e ele não muda de modo algum enquanto você a tiver.

Ao adquirir, crie um Laço ([[lacos]]) com o **NPC ou instituição** que moldou sua vida. Ele começa com **três emoções** à sua escolha e **não pode ser perdido nem desfeito** enquanto você tiver a peculiaridade (você pode trocar as emoções em cenas de descanso). Crie também **três mandamentos** cruciais para esse NPC ou instituição: cada um é algo que você sempre ou nunca deve fazer.

> **Exemplo:** o Lorde dos Dragões (sempre obedeça aos dragões, nunca demonstre fraqueza, nunca apague o fogo); a Igreja Alva (sempre fique ao lado dos fiéis, nunca duvide da palavra de um Sacerdote, nunca ouça um demônio).

- Na **primeira vez** que quebrar um mandamento em uma cena, você fica **fraco e abalado** e perde **metade dos PV e PM atuais** (arredondando para baixo), mas recebe **2 Pontos de Fabula**.
- Se quebrar um mandamento em uma cena de descanso, sofre as penalidades depois de recuperar. Quebrar vários na mesma cena conta só a primeira violação.
- Depois de **6 violações**, ignore as seguintes, a menos que aconteçam diante de um vilão que siga ou personifique os mandamentos.
- Se houver dúvida sobre uma situação cumprir esta peculiaridade, a **palavra final é sempre sua**; seja o mais honesto possível.
- Na **sétima violação**, você perde a peculiaridade e seu Tema muda para **Pertencimento, Culpa, Justiça ou Vingança**. Você recebe na hora um [Poder Heroico](/poderes-heroicos) dentre os disponíveis para suas classes, recupera todos os PV e PM e se recupera de todas as condições. Dali em diante, a força dos seus Laços conta **1 ponto a mais** (um Laço com três emoções passa a ter força 4). ${HEROICO_SEM_REQUISITOS}`,
  }),

  peculiarity({
    name: 'Herança',
    page: 119,
    summary:
      'Você tem um item raro de até 1.200z (ou dois de até 800z cada) com propriedades peculiares; o mestre pode oferecer 1 Ponto de Fabula por sessão para criar complicações por causa dele.',
    body: `Você recebe **um item raro** de valor até **1.200z**, ou **dois itens raros** de até **800z cada**. Escolha-os nas listas disponíveis ou crie-os com o grupo (para armas, veja [[criar-armas-raras]]).

- **Uma vez por sessão** (cerca de quatro horas de jogo), o mestre pode oferecer **1 Ponto de Fabula** para gerar uma complicação por causa da natureza dos itens (duelistas rivais, monstros atraídos pela magia deles…).
- Itens recebidos por esta peculiaridade **não podem ser destruídos, danificados, perdidos ou roubados** sem a sua permissão.`,
  }),

  peculiarity({
    name: 'Mãos Vazias',
    page: 119,
    summary:
      'Você luta só com o corpo: ataques desarmados causam 6 de dano adicional (10 a partir do nível 30) e, sem arma nem escudo, Defesa e Defesa Mágica sobem em 1.',
    body: `- Seus **ataques desarmados** causam **6 pontos de dano adicional**; a partir do **30º nível**, **10**.
- Enquanto não tiver **nenhuma arma nem escudo** equipado (fora o ataque desarmado), sua **Defesa** e **Defesa Mágica** aumentam em **+1**.`,
  }),

  peculiarity({
    name: 'Portador da Ruína',
    page: 119,
    summary:
      'Você está fadado a trazer uma ruína ao mundo: pode ignorar custos de PV, PM e Pontos de Fabula deixando-a avançar, até ela se concretizar como um vilão supremo.',
    body: `Ao adquirir, diga qual **ruína** você deverá trazer ao mundo; ela se torna na hora uma das **ameaças** do seu mundo.

> **Exemplo:** a Rainha dos Demônios, o Grande Cometa, o Deus da Carnificina.

- Até a ruína se concretizar, você **não pode se sacrificar** (os servos da ruína podem até ajudar você a escapar de situações que o impediriam de cumprir seu papel).
- Quando uma regra ou habilidade pedir que você gaste **PV, PM ou Pontos de Fabula**, você pode deixar a ruína **avançar** para ignorar o custo por completo. Descreva os maus agouros; o mestre recebe uma oportunidade para criar complicações depois da cena.
- No **fim de cada sessão**, antes da EXP, role **2d20**. Se o resultado for igual ou menor que o seu nível, a ruína avança (a partir do **40º nível**, ela sempre avança).
- Quando a ruína avançar pela **nona vez**, você perde esta peculiaridade e a ruína se concretiza no mundo como um **vilão supremo** (15 Pontos de Ultima, veja [[pontos-de-ultima]]). Em compensação, você recebe um [Poder Heroico](/poderes-heroicos) dentre os disponíveis para suas classes. ${HEROICO_SEM_REQUISITOS}`,
  }),

  peculiarity({
    name: 'Prodígios Rivais',
    page: 120,
    summary:
      'Você é um dos melhores em rituais, poderes ou magias, mas está sempre atrás de um rival (vilão menor): pode pagar custos com Pontos de Fabula, e suas falhas perto dele viram falhas críticas.',
    body: `Ao adquirir, escolha uma **especialização**: **rituais, poderes ou magias**. Depois diga quem é o seu grande **rival**: um NPC que é um **vilão menor** (5 Pontos de Ultima, veja [[pontos-de-ultima]]). Crie com ele um Laço ([[lacos]]) com **1 emoção** entre admiração e inferioridade.

- Quando uma regra ou habilidade ligada à sua especialização pedir que você gaste **PV ou PM**, você pode gastar **1 Ponto de Fabula** para ignorar o custo.
- Em compensação, enquanto o rival estiver na cena e tiver **1 ou mais Pontos de Ultima**, toda vez que você **falhar em um teste**, ele conta como **falha crítica** (não pode ser rolado de novo e você recebe 1 Ponto de Fabula automaticamente).
- Se o rival ficar sem Pontos de Ultima mas **escalonar** e virar um vilão mais forte, ele recupera os Pontos de Ultima na hora e a penalidade volta. Só se livra dela por completo se o rival **morrer ou deixar de ser vilão**.`,
  }),

  peculiarity({
    name: 'Regressado',
    page: 121,
    summary:
      'Você voltou da morte: não é um ser vivo, é imune a veneno e a trevas, Vulnerável a luz, e causa dano de trevas que ignora Imunidades e Resistências.',
    body: `- Você **não é considerado um ser vivo**, é **imune** à condição envenenado e tem **Imunidade** a dano de **trevas** e **veneno**, mas é **Vulnerável** a dano de **luz**.
- Você não precisa respirar, comer nem beber, mas segue a regra de descanso normalmente. Recupera PV e se recupera de condições como qualquer um (ao contrário dos mortos-vivos, efeitos de cura não ferem seu PJ).
- Sempre que causar dano, você pode **mudar o tipo dele para trevas**, e todo dano de trevas que você causa **ignora Imunidades e Resistências**.`,
  }),

  peculiarity({
    name: 'Robô',
    page: 121,
    summary:
      'Você é um corpo artificial animado: não é um ser vivo, é imune a veneno, Resistente a terra, e ganha +2 em testes para examinar ou usar máquinas e tecnologia.',
    body: `- Você **não é considerado um ser vivo**, é **imune** à condição envenenado, tem **Imunidade** a dano de veneno e **Resistência** a dano de terra.
- Você não precisa respirar, comer nem beber, mas segue a regra de descanso normalmente. Recupera PV e se recupera de condições normalmente.
- Você recebe **+2** em todos os testes para examinar ou interagir com **máquinas, tecnologia e construtos** (exceto testes de Precisão e de Magia).`,
  }),

  peculiarity({
    name: 'Veículo Velho',
    page: 122,
    summary:
      'Você tem um veículo muito usado, grande o bastante para o grupo e uma dúzia de passageiros (fora de combate); o mestre pode dar 2 Pontos de Fabula por sessão para complicá-lo.',
    body: `Você tem um transporte à sua escolha entre os de [[servicos-e-transporte]] (veículo terrestre, navio ou aeronave) ou uma **nave espacial** ([[servicos-e-transporte-viagem-espacial]]). Ele é **médio ou grande**, o bastante para você, o resto do grupo e **uma dúzia de passageiros**, mas **não pode ser usado em combate**.

- **Uma vez por sessão** (cerca de quatro horas de jogo), o mestre pode lhe conceder **2 Pontos de Fabula** para introduzir uma complicação narrativa ligada ao transporte ou ao dono anterior.
- O veículo **não pode ser destruído** sem a sua permissão.`,
  }),

  peculiarity({
    name: 'Voo',
    page: 122,
    summary:
      'Você sabe voar ou levitar: seus ataques corpo a corpo atingem criaturas voadoras e só voadores (ou quem os alcança) podem atacar você corpo a corpo; em crise ou sem espaço, você perde o benefício.',
    body: `Você sabe voar. Além da mobilidade:

- Seus **ataques corpo a corpo** podem acertar criaturas que estejam voando.
- Você **não pode ser alvo** de ataque corpo a corpo, a menos que o atacante também esteja voando ou tenha como atingir criaturas voadoras.

Você **perde todos os benefícios** enquanto estiver em **crise** ou não puder voar livremente (dentro de um veículo feito para criaturas de tamanho humano, num corredor estreito…). Ao sofrer dano de **ar, raio ou gelo** em uma cena de conflito, você também os perde até o início do seu próximo turno.`,
  }),
];
