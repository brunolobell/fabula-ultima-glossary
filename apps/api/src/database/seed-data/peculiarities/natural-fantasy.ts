import { peculiarity } from '../helpers';
import { SeedEntry } from '../types';
import { HEROICO_SEM_REQUISITOS } from './shared';

// "Novas Peculiaridades" do Atlas Natural Fantasy (páginas 119–128).
// Aplique `inBook('natural-fantasy', …)` ao registrar. Os slugs com sufixo
// resolvem a colisão com a mesma peculiaridade do Atlas High Fantasy.
export const peculiaridadesNaturalFantasy: SeedEntry[] = [
  peculiarity({
    name: 'Amaldiçoado',
    slug: 'amaldicoado-natural-fantasy',
    page: 120,
    summary:
      'Você carrega uma maldição ligada a uma ameaça do mundo: pode trocar um teste por falha crítica automática para ganhar 2 Pontos de Fabula e, ao quebrá-la, ganha um Poder Heroico.',
    body: `Ao adquirir, descreva a **natureza da maldição** e ligue-a a uma das **ameaças** do mundo. Quando a ameaça for resolvida, você pode quebrar a maldição; descreva como espera que isso aconteça.

> **Exemplo:** você erra os ataques com frequência; sua presença causa terror; sua magia dá resultados inesperados; criaturas próximas sentem dores intensas.

Antes de fazer um teste, em vez de fazê-lo, você pode descrever como a maldição o atrapalha e sofrer uma **falha crítica automática** (ambos os dados contam como 1). Se fizer isso, recebe **2 Pontos de Fabula** em vez de 1 e gera uma oportunidade normalmente.

Se conseguir **quebrar a maldição**, você recebe na hora um [Poder Heroico](/poderes-heroicos) à sua escolha, até de uma classe que você não aprendeu. ${HEROICO_SEM_REQUISITOS}`,
  }),

  peculiarity({
    name: 'Arma Antiga',
    page: 120,
    summary:
      'Você achou numa ruína uma arma rara de até 1.200z, de aparência tecnológica; o mestre pode oferecer 1 Ponto de Fabula por sessão para complicá-la, e ela não se perde sem a sua permissão.',
    body: `Com o resto do grupo, crie uma **arma personalizada rara** ([[armas-personalizadas]]) de valor até **1.200z**. Ela deve ter uma aparência **incomum e tecnológica**; recomenda-se uma arma de fogo, e que itens parecidos sejam raros e misteriosos no seu mundo.

- **Uma vez por sessão** (cerca de quatro horas de jogo), o mestre pode lhe conceder **1 Ponto de Fabula** para uma complicação inesperada causada pela natureza incomum da arma (máquinas estranhas que reagem à sua presença, monstros atraídos pela energia dela…).
- A arma **não pode ser destruída, danificada, perdida ou roubada** sem a sua permissão.`,
  }),

  peculiarity({
    name: 'Arbóreo',
    slug: 'arboreo-natural-fantasy',
    page: 121,
    summary:
      'Você é uma criatura botânica senciente: imune a uma condição à escolha, mas Vulnerável a um tipo de dano, e aprende um feitiço de NPC mais barato sob o sol.',
    body: `- Escolha uma condição entre **atordoado, enfurecido ou abalado**: você é **imune** a ela, mas **Vulnerável** a um tipo de dano à sua escolha entre ar, raio, terra, fogo e gelo.
- Você aprende um feitiço de NPC ([[feiticos-de-npc]]), exceto Devastação. Se ele pedir um teste de Magia, use (AST + VON). Personalize o feitiço (nome, tipo de dano, condição…). Ao lançá-lo **sob a luz do sol**, o custo total de PM cai em **5** (mínimo 0).`,
  }),

  peculiarity({
    name: 'Cerne Elemental',
    slug: 'cerne-elemental-natural-fantasy',
    page: 121,
    summary:
      'Você é imerso no poder de um elemento: Resistente a ele, muda o tipo do seu dano para ele, é Vulnerável a outro e faz rituais de elementalismo do elemento.',
    body: `- Escolha seu **tipo de dano elemental** entre ar, raio, terra, fogo e gelo. Você fica **Resistente** a ele.
- Sempre que causar dano, você pode **mudar o tipo** dele para o escolhido.
- Em troca, você fica **Vulnerável** a um tipo de dano **diferente** entre os cinco.
- Você faz rituais de **elementalismo**, mas só os que manipulam o elemento escolhido (ar; eletricidade; terra/pedra; fogo; gelo/água, respectivamente).`,
  }),

  peculiarity({
    name: 'Desperto',
    page: 122,
    summary:
      'Você acordou no subsolo ligado a tecnologias antigas: ignora um custo de até 100 PV, PM ou PI por descanso e faz perguntas ao mestre sobre dispositivos e criaturas do passado.',
    body: `Você tem uma reserva interna de energia e uma ligação espontânea com tecnologias antigas.

- Quando uma regra ou habilidade pedir que você gaste **até 100 PV, PM ou PI** em um conflito, você pode **ignorar o custo**. Se fizer isso, não pode ignorar nenhum outro custo até o **fim do próximo descanso**. Descreva de onde vem essa energia.

> **Exemplo:** uma joia mágica escondida no olho esquerdo, um gerador incrustado no braço, um circuito arcano que parece uma tatuagem.

- Ao encontrar um **dispositivo ou criatura ligado a tecnologias antigas** ou ao passado de uma ruína, escolha um: perguntar ao mestre o **objetivo original** dele; perguntar **como ativá-lo**; ou perguntar **como desativá-lo**. O mestre responde com informação verdadeira e você descreve o **flashback** que revela a resposta.
- Ao receber a **sexta resposta** assim, você lembra o verdadeiro motivo de ter ficado dormente no subsolo, e o mestre escolhe um: você lembra uma pista essencial sobre uma ameaça que já existe no mundo; ou lembra a existência de uma **nova ameaça** e recebe uma pista essencial sobre ela. Você continua com todos os benefícios da peculiaridade depois disso.`,
  }),

  peculiarity({
    name: 'Fera Falante',
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
    name: 'Grimório Misterioso',
    page: 123,
    summary:
      'Você tem um grimório indestrutível que responde a perguntas após testes de Viagem; ao responder 10, vira um NPC que lança dois feitiços ou lhe dá um Poder Heroico.',
    body: `Enquanto tiver esta peculiaridade, o seu grimório é um **artefato indestrutível** que só se perde ou é roubado por meio de uma rendição.

Quando o grupo esbarrar em um **perigo ou descoberta após um teste de Viagem**, você pode fazer ao mestre **uma pergunta** sobre isso (na hora ou depois). Ele responde com informação verdadeira e descreve como a resposta surge no grimório.

Quando o grimório tiver respondido a **10 perguntas**, ele já dividiu quase tudo o que sabe. Escolha um:

- **Consciência Desperta:** você perde esta peculiaridade e o grimório vira um **NPC**, criado com o grupo (nome e aparência). Ele não tem ficha e não participa de testes nem de conflitos, mas aprende **dois feitiços** à sua escolha entre os de [[elementalista]], [[entropista]] e [[espiritualista]]. **Uma vez por conflito**, se pedido, ele lança um deles; o feitiço é lançado no fim da rodada atual, não custa PM e o teste de Magia (se houver) usa **2d10**.
- **Magia Oculta:** você perde esta peculiaridade, mas o grimório divide um último segredo e você recebe um [Poder Heroico](/poderes-heroicos) à escolha entre [[cometa]], [[esperanca]], [[feiticos-extras]] e [[vulcao]]. Você pode escolher um poder cujos pré-requisitos não cumpra.

Você também pode usar esta peculiaridade para **inserir um novo personagem (e jogador)** no grupo. Nesse caso ele recebe os benefícios de Magia Oculta, e não os de Consciência Desperta. Peculiaridades sugeridas para quem entra assim: Arbóreo, Fera Falante, Robô e Um Sonho Longo.

Seja qual for a escolha, o grimório vira um livro comum e o mestre escolhe um: ele fornece uma informação crucial sobre uma ameaça que já existe no mundo; ou revela uma **nova ameaça** e dá uma informação crucial sobre ela.`,
  }),

  peculiarity({
    name: 'Herdeiro Relutante',
    page: 124,
    summary:
      'Você vem da família mais rica da região: +1.000z de dinheiro inicial e dois guarda-costas leais que dão três benefícios, ao custo de Pontos de Exaustão.',
    body: `Se escolher esta peculiaridade **na criação do personagem**, seu dinheiro inicial aumenta em **1.000 zênites**.

Você tem **dois guarda-costas** muito leais. Dê nome e aparência a eles. Eles não têm ficha e nunca participam de testes ou conflitos, mas aparecem sempre que você precisa de ajuda. Seus benefícios:

- **Cuidado!** Ao sofrer dano, você pode reduzi-lo à **metade**.
- **Segue a informação que o senhor pediu.** Em um descanso, você pode fazer **uma pergunta** ao mestre, que responde com informação verdadeira.
- **Esconda-se, eu cuido disso!** Ao criar um fragmento elemental, você pode fazê-lo causar dano adicional igual a **(5 + metade do seu nível)**.

Cada vez que usa um benefício, os guarda-costas sofrem **1d6 Pontos de Exaustão**. Com **10 ou mais** desses pontos, você não pode contar com a ajuda deles. A Exaustão é dividida entre os dois, sem contar individualmente. No **fim de cada sessão** (cerca de quatro horas de jogo), eles recuperam até **1d6** Pontos de Exaustão (mínimo 0).`,
  }),

  peculiarity({
    name: 'Irmãozão',
    page: 125,
    summary:
      'Você cuida do grupo no acampamento: ganha acesso a três atividades de acampamento (ou mais uma, se a mesa já usa a regra) e faz duas por descanso.',
    body: `Esta peculiaridade se apoia na regra opcional de **atividades de acampamento** (Atlas Natural Fantasy, p. 130).

- Se a campanha **não usa** essa regra, o seu personagem ainda tem acesso a ela, com **três** atividades de acampamento em vez de duas.
- Se você receber a peculiaridade numa campanha que **já usa** a regra, ganha apenas **mais uma** atividade à sua escolha.
- Ao fazer atividades de acampamento num descanso, escolha um: fazer **duas atividades diferentes**, cujos efeitos não podem recair sobre a mesma criatura; ou fazer **a mesma atividade duas vezes**, com efeitos sobre duas criaturas diferentes.`,
  }),

  peculiarity({
    name: 'Oficina Itinerante',
    page: 125,
    requirement: 'Personagem com a classe Gourmet ou Inventor (ou as duas).',
    summary:
      'Você tem um veículo terrestre que é loja e laboratório: cabe o grupo e alguns convidados e permite achar materiais para projetos, ao custo de um defeito terrível.',
    body: `Você só pode escolher esta peculiaridade se o seu personagem tiver uma ou mais classes entre [[gourmet]] e [[inventor]].

Você tem um **veículo terrestre** ([[servicos-e-transporte]]), grande o bastante para você, o resto do grupo e **dois ou três convidados**, mas que **não pode ser usado em combate**.

Se um projeto ([[projetos]]) precisar de um ingrediente ou material especial, você pode gastar **1 Ponto de Fabula** para de repente encontrar algo parecido na sua oficina. Se fizer isso, a invenção **deve ter um defeito terrível** (Livro Básico, p. 134).`,
  }),

  peculiarity({
    name: 'Pária Feérico',
    page: 126,
    summary:
      'Você veio do Reino das Fadas: fala com elementais, feras e plantas, aprende um feitiço e faz rituais de ritualismo, mas tem uma fraqueza de fada que o mestre pode explorar.',
    body: `- Você se comunica **verbalmente** com qualquer criatura das espécies **elemental, fera e planta**.
- Você aprende **um feitiço** à sua escolha entre os de [[elementalista]], [[entropista]] e [[espiritualista]].
- Você faz rituais de **ritualismo** e pode usá-los para **transportar criaturas** para dentro ou para fora do Reino das Fadas.
- Você tem uma **fraqueza típica das fadas**, que o grupo define com você. **Uma vez por sessão** (cerca de quatro horas de jogo), o mestre pode lhe conceder **1 Ponto de Fabula** para que complicações surjam por causa dela, ou fazer você **falhar automaticamente** em um teste (antes de rolar os dados: o resultado do teste e a RA contam como 0).

> **Exemplo:** alergia a ferro; ter de contar cada grão de areia ou sal que cair; ter de imitar quando alguém faz um gesto específico.`,
  }),

  peculiarity({
    name: 'Robô',
    slug: 'robo-natural-fantasy',
    page: 127,
    summary:
      'Você é um corpo artificial animado: não é um ser vivo, é imune a veneno, Resistente a terra, e ganha +2 em testes para examinar ou usar máquinas e tecnologia.',
    body: `- Você **não é considerado um ser vivo**, é **imune** à condição envenenado, tem **Imunidade** a dano de veneno e **Resistência** a dano de terra.
- Você não precisa respirar, comer nem beber, mas segue a regra de descanso normalmente. Recupera PV e se recupera de condições normalmente.
- Você recebe **+2** em todos os testes para examinar ou interagir com **máquinas, tecnologia e construtos** (exceto testes de Precisão e de Magia).`,
  }),

  peculiarity({
    name: 'Sobrevivente',
    page: 127,
    summary:
      'Você sobreviveu a uma catástrofe: PV e PM máximos +5 e uma opção entre equipamento marcial, um feitiço de elementalista ou espiritualista, ou +2 PI máximos.',
    body: `- Seus **PV e PM máximos** aumentam em **5**.
- Escolha uma opção:
  - poder equipar **armas corpo a corpo e à distância, armaduras e escudos marciais**; ou
  - aprender **qualquer feitiço** da lista de [[elementalista]] ou [[espiritualista]]; ou
  - aumentar permanentemente seus **PI máximos em 2**.`,
  }),

  peculiarity({
    name: 'Um Sonho Longo',
    page: 127,
    summary:
      'Seu espírito natural assumiu forma humana por um tempo: você pode ignorar custos de PV, PM e Pontos de Fabula, mas cada vez aproxima seu último adeus, em que volta a ser parte da natureza.',
    body: `No **fim de cada sessão** (cerca de quatro horas de jogo), antes de distribuir a EXP, role **2d20**. Se o número for igual ou menor que o seu nível atual, o seu **último adeus se aproxima**.

Quando uma regra ou habilidade pedir que você gaste **PV, PM ou Pontos de Fabula**, você pode **ignorar o custo**. Se fizer isso, o seu último adeus se aproxima.

No fim de uma cena em que você ignorou um custo, se o seu último adeus **já se aproximou 10 vezes ou mais**, chegou a hora de deixar o mundo dos humanos: você volta para sempre à forma original, como um **objeto natural inanimado**. Com o grupo, interprete um último momento agridoce antes de o personagem partir. O mesmo acontece se você **se sacrificar**.

> **Exemplo:** uma grande árvore guardiã, um rosto na face de um penhasco, uma rocha de formato peculiar, a estrela mais brilhante do céu.

Um personagem cujo último adeus chegou é considerado **morto** e não pode ser trazido de volta. Mas, dali em diante, **todos os personagens da campanha** (inclusive um novo que você criar) recebem **1 Ponto de Fabula adicional** no início de cada sessão.`,
  }),

  peculiarity({
    name: 'Voo',
    slug: 'voo-natural-fantasy',
    page: 128,
    summary:
      'Você sabe voar ou levitar: seus ataques corpo a corpo atingem criaturas voadoras e só voadores (ou quem os alcança) podem atacar você corpo a corpo; em crise ou sem espaço, você perde o benefício.',
    body: `Você sabe voar. Além da mobilidade:

- Seus **ataques corpo a corpo** podem acertar criaturas que estejam voando.
- Você **não pode ser alvo** de ataque corpo a corpo, a menos que o atacante também esteja voando ou tenha como atingir criaturas voadoras.

Você **perde todos os benefícios** enquanto estiver em **crise** ou não puder voar livremente (dentro de um veículo feito para criaturas de tamanho humano, num corredor estreito…). Ao sofrer dano de **ar, raio ou gelo** em uma cena de conflito, você também os perde até o início do seu próximo turno.`,
  }),
];
