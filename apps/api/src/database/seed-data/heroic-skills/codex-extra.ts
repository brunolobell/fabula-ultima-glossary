import { heroicSkill } from '../helpers';
import { SeedEntry } from '../types';

// "Novos Poderes Heroicos" do Codex Extra (páginas 15–25).
// Aplique `inBook('codex-extra', …)` ao registrar.
export const poderesHeroicosCodexExtra: SeedEntry[] = [
  heroicSkill({
    name: 'Cancela do Lampião',
    page: 17,
    classes: ['Bandoleiro'],
    summary:
      'Ao ser alvo de novo de um poder ou feitiço que já teve você como alvo nesta cena, você pode gastar 1 Ponto de Fabula para ficar imune a ele; com 1 Ponto de Ultima, também recupera 20 PV.',
    body: `Se um poder ou feitiço que **já teve você como alvo** nesta cena voltar a ter você como alvo, você pode gastar **1 Ponto de Fabula** e ficar **imune ao efeito e ao dano** dele. A imunidade termina no fim da cena ou quando você usar este poder outra vez, o que ocorrer primeiro.

Se pagar com **1 Ponto de Ultima** em vez do Ponto de Fabula, você também **recupera 20 PV**.`,
  }),

  heroicSkill({
    name: 'Cargas Radiantes',
    page: 17,
    classes: ['Astrólogo'],
    summary:
      'Ao gerar cargas, gaste 5 PM para converter uma delas em carga cósmica (vale como qualquer tipo); consumi-la amplia em 5 os PV perdidos ou recuperados por uma criatura.',
    body: `Ao **gerar cargas** de qualquer tipo (celeste, estelar, meteórica ou solar), você pode pagar **5 PM** para converter uma dessas cargas em **carga cósmica**, que na hora de ser consumida vale como uma carga de **qualquer tipo** à sua escolha.

Além disso, ao fazer uma criatura **perder ou recuperar PV**, você pode consumir uma carga cósmica; se o fizer, o total de PV perdidos ou recuperados por ela **sobe em 5**.`,
  }),

  heroicSkill({
    name: 'Constelação da Cruz Austral',
    page: 18,
    classes: ['Astrólogo'],
    summary:
      'Uma vez por cena, com uma ação, 20 PM e uma carga de cada tipo, aplica o efeito básico de todos os seus outros poderes de astrólogo, cada um num alvo diferente e sem custo extra.',
    body: `**Uma vez por cena**, você pode usar uma ação, gastar **20 PM** e **consumir uma carga de cada tipo** (celeste, estelar, meteórica e solar) para ativar este poder.

Ao fazer isso, você produz o **efeito básico** de cada um dos seus outros poderes de astrólogo, cada um sobre um **alvo diferente**. Esses efeitos não exigem ação nem gasto de PM, e **não geram novas cargas**.`,
  }),

  heroicSkill({
    name: 'Fluxo de Yin e Yang',
    page: 19,
    classes: ['Astrólogo', 'Elementalista', 'Esper', 'Dançarino', 'Invocador'],
    summary:
      'Dano físico, de gelo, de terra ou de trevas dá Pontos de Yin; dano de ar, fogo, luz ou raio dá Pontos de Yang. Os dois lados se reforçam e, ao equilibrá-los, você drena ou concede PM.',
    body: `Durante conflitos, você acumula **Pontos de Yin** e **Pontos de Yang**. Todos eles se perdem no fim de cada cena, e você só os ganha e usa em conflitos.

- **Yin:** na primeira vez em um turno que você causar dano **físico, de gelo, de terra ou de trevas**, recebe **1 Ponto de Yin**. Se já tiver ao menos 1 Ponto de Yang, esse dano causa também **5 pontos de dano adicional**.
- **Yang:** na primeira vez em um turno que você causar dano **de ar, de fogo, de luz ou de raio**, recebe **1 Ponto de Yang**. Se já tiver ao menos 1 Ponto de Yin, esse dano causa também **5 pontos de dano adicional**.

**No fim do seu turno**, se você tiver **3 ou mais pontos** somando Yin e Yang e ao menos **1 de cada tipo**, perde todos eles e aplica um dos efeitos abaixo, conforme o tipo que predominava (os dois, em caso de empate):

- **Maioria de Yin:** cada inimigo presente na cena perde PM igual a **(metade do seu nível)**.
- **Maioria de Yang:** uma criatura que você veja na cena recupera PM igual a **(seu nível)**.`,
  }),

  heroicSkill({
    name: 'Forja Entrelaçada',
    page: 19,
    classes: ['Forjador de Almas'],
    summary:
      'Você faz as ações Inventário ou Equipamento sem gastar ação, desde que seja para usar um poder de forjador de almas.',
    body: `Você pode fazer a ação **Inventário** ou **Equipamento** **sem gastar uma ação**, mas somente para ativar um dos **poderes de forjador de almas** que você possui.`,
  }),

  heroicSkill({
    name: 'Instinto Assassino',
    page: 20,
    classes: ['Lâmina Carmesim'],
    summary:
      'Ataques corpo a corpo contra criaturas em crise causam 10 de dano adicional (20 a partir do 40º nível).',
    body: `Quando um ataque **corpo a corpo** seu atinge uma criatura que está **em crise**, ele causa **10 pontos de dano adicional**. A partir do **40º nível**, esse adicional passa a ser de **20**.`,
  }),

  heroicSkill({
    name: 'Lido Como um Livro',
    page: 20,
    classes: ['Erudito', 'Esper', 'Ladino', 'Malandro'],
    alsoRequires: ['Roubo de Alma'],
    summary:
      'Ao ter sucesso em Roubo de Alma, faz Estudo de graça contra um dos inimigos, reaproveitando a rolagem; contra elites e campeões cujo tesouro da alma você roubou, causa dano adicional igual ao NP.',
    body: `Quando você tem sucesso em [[roubo-de-alma]] contra um ou mais inimigos, pode escolher um deles e fazer a ação **Estudo** contra ele **sem gastar uma ação**. Em vez de rolar o teste aberto, use o **resultado** e a **rolagem alta** do teste de Roubo de Alma como se fossem os do teste aberto.

Além disso, ao causar dano a um inimigo de patente **elite** ou **campeão** cujo **tesouro da alma** você tenha roubado durante esta cena, você causa **dano adicional igual ao seu NP em Roubo de Alma** a ele.`,
  }),

  heroicSkill({
    name: 'Multifunção',
    page: 21,
    classes: ['Forjador de Almas'],
    summary:
      'Uma criatura que faz a ação Objetivo equipada com armas que carregam característica ou feitiço de forjador de almas ganha +1 no teste por arma assim (máximo +2).',
    body: `Quando uma criatura faz a ação **Objetivo** enquanto empunha armas que tenham uma **característica** ou um **feitiço** concedido por algum dos seus poderes de forjador de almas, ela recebe **+1 no teste** da ação para cada uma dessas armas, até o **máximo de +2**.`,
  }),

  heroicSkill({
    name: 'Papinho Amigável',
    page: 22,
    classes: ['Malandro', 'Orador'],
    summary:
      'Em conflito, com uma ação e PM, convence um soldado sob duas ou mais condições a lutar ao seu lado e passa a controlar sua ficha.',
    body: `Durante um conflito, você pode usar uma ação para escolher uma criatura de patente **soldado** que consiga ouvir e entender você (o mestre diz quem é um alvo válido). Se ela estiver sob **duas ou mais condições**, você pode gastar **(30 + metade do nível da criatura)** PM para convencê-la de que vale mais a pena lutar ao seu lado.

Você passa a **controlar a ficha dela** no lugar do mestre. O efeito dura até o fim da cena ou até a criatura ter menos de duas condições. Só é possível controlar **uma** criatura assim por vez.`,
  }),

  heroicSkill({
    name: 'Poder da Amizade',
    page: 22,
    classes: ['Cavaleiro Mágico'],
    summary:
      'Uma vez por cena, em forma mágica, você e os PJs com Laço com você fazem um ataque em grupo; depois, causa dano de luz adicional baseado na força dos Laços.',
    body: `**Uma vez por cena**, enquanto estiver sob uma **forma mágica**, você pode gastar uma ação e **(10 × o número de PJs presentes na cena com os quais você tem um Laço)** PM para fazer um **ataque em grupo** contra uma única criatura.

Você e cada um desses PJs fazem um **ataque livre** contra a criatura, com uma arma equipada, tratando a **RA do teste de Precisão como 0** no cálculo do dano de cada ataque.

Depois de resolvidos todos os ataques livres, você causa ao alvo **(2 × a soma da força dos Laços que você tem com cada personagem que causou dano a ele)** de dano adicional **de luz**. A partir do **20º nível**, esse dano adicional sobe em **5**; a partir do **40º nível**, sobe em **10**.`,
  }),

  heroicSkill({
    name: 'Redistribuição Aprimorada',
    page: 23,
    classes: ['Bandoleiro'],
    alsoRequires: ['Redistribuir Riquezas'],
    summary:
      'O limite de Pontos de Ultima que você acumula com Redistribuir Riquezas sobe para 3, mas ainda se rouba apenas 1 por uso.',
    body: `O número máximo de Pontos de Ultima que você pode ter acumulados por causa de [[redistribuir-riquezas]] passa a ser **3**. Continua valendo o limite de roubar **apenas 1 Ponto de Ultima** a cada uso desse poder.`,
  }),

  heroicSkill({
    name: 'Anatomista',
    page: 17,
    classes: ['Atirador', 'Erudito', 'Furioso', 'Mestre de Armas'],
    alsoRequires: ['Conhecimento é Poder'],
    repeatable: true,
    summary:
      'Você escolhe duas espécies; ao causar dano a um humanoide ou a uma criatura delas, causa 5 de dano adicional ou a deixa desorientada até o fim da cena. Pode ser adquirido até três vezes.',
    body: `Cada vez que adquirir este poder heroico, escolha **duas espécies** entre construto, demônio, elemental, fera, monstro, morto-vivo e planta.

Ao causar dano a um **humanoide** ou a uma criatura de uma das espécies que você escolheu, você pode escolher um destes efeitos:

- a criatura sofre **5 pontos de dano adicional**; ou
- a criatura fica **desorientada** até o fim da cena.

Enquanto está desorientada, uma criatura que recupera PV e/ou PM recupera **apenas metade** da quantidade normal e, depois disso, deixa de estar desorientada.

Este poder heroico pode ser adquirido **até três vezes**.`,
  }),

  heroicSkill({
    name: 'Corte Infernal',
    page: 18,
    classes: ['Elementalista', 'Guerreiro Sombrio', 'Piloto'],
    alsoRequires: ['Golpe das Sombras'],
    summary:
      'Ao usar Golpe das Sombras, converte todo o dano em fogo ou gelo e fica Resistente ao outro tipo; o ataque corpo a corpo livre pode alcançar inimigos só atingíveis à distância.',
    body: `Ao usar [[golpe-das-sombras]], você pode escolher **fogo** ou **gelo**. Se escolher, todo o dano causado por esse ataque passa a ser do tipo escolhido, no lugar de trevas (esse tipo não pode mudar, como de costume), e você fica **Resistente** ao tipo de dano que **não** escolheu até o início do seu próximo turno.

Além disso, quando você fizer um ataque livre com uma arma **corpo a corpo** como parte de Golpe das Sombras, esse ataque pode atingir inimigos que normalmente só poderiam ser escolhidos como alvo de ataques **à distância**.`,
  }),

  heroicSkill({
    name: 'Dragão Empalador',
    page: 18,
    classes: ['Comandante', 'Guerreiro Sombrio'],
    alsoRequires: ['Carga de Cavalaria', 'Golpe das Sombras'],
    summary:
      'Ao usar Golpe das Sombras com RA tratada como 0 no dano, você pode usar Carga de Cavalaria logo depois, sem gastar ação (pagando o PM).',
    body: `Ao usar [[golpe-das-sombras]], você pode considerar sua **RA como 0** ao determinar o dano do ataque. Se fizer isso, assim que o ataque de Golpe das Sombras for resolvido você pode usar [[carga-de-cavalaria]] **imediatamente e sem gastar uma ação**, pagando normalmente o custo em PM.`,
  }),

  heroicSkill({
    name: 'Está Vivo!',
    page: 18,
    classes: ['Andarilho', 'Inventor'],
    alsoRequires: ['Companheiro Fiel', 'Visionário'],
    note: 'Companheiro Fiel da espécie construto.',
    summary:
      'A Afinidade do seu companheiro a raio vira Absorção, seus PV máximos sobem em (2 × seu NP em Visionário) e, sem armas equipadas, ele causa dano adicional igual ao NP em Visionário.',
    body: `A Afinidade do seu [[companheiro-fiel]] a dano de **raio** passa a ser **Absorção**, e os PV máximos dele aumentam em **(2 × seu NP em [[visionario]])**.

Além disso, quando o companheiro causar dano e **não tiver armas equipadas**, ele causa dano adicional igual a **(seu NP em Visionário)**.`,
  }),

  heroicSkill({
    name: 'Fagomago',
    page: 19,
    classes: ['Entropista', 'Gourmet', 'Mutante', 'Quimerista'],
    summary:
      'Dissipar custa 10 × A e atinge até três criaturas; ao encerrar feitiços de duração Cena em inimigos, você recupera 20 PM por feitiço ou copia seu efeito em si mesmo.',
    body: `Quando você lança [[dissipar]], o custo em PM desse feitiço passa a ser **"10 × A"** e o alvo passa a ser **"até três criaturas"**.

Sempre que você fizer um ou mais inimigos deixarem de ser afetados por feitiços de duração **Cena**, escolha um efeito:

- você recupera **20 PM** por cada feitiço cujos efeitos tenham terminado em pelo menos um inimigo dessa forma; ou
- para cada feitiço cujos efeitos tenham terminado em pelo menos um inimigo dessa forma, você aplica em si mesmo uma **cópia do efeito** desse feitiço (se o feitiço exigir escolhas, mantenha as do original).

A cópia não usa ações, PM nem testes, e não conta como lançar um feitiço.`,
  }),

  heroicSkill({
    name: 'Maestria de Ofuda',
    page: 20,
    classes: ['Arcanista', 'Mercador', 'Simbolista'],
    alsoRequires: ['Simbolismo'],
    summary:
      'Em conflito, você pode gastar 20 PM para ignorar o custo em PI de Simbolismo; o ataque corpo a corpo livre do poder pode alcançar inimigos só atingíveis à distância.',
    body: `Ao usar [[simbolismo]] durante um conflito, você pode gastar **20 PM** para **ignorar o custo normal em PI** desse poder.

Quando você fizer um ataque livre com uma arma **corpo a corpo** como parte do uso de Simbolismo, esse ataque pode atingir inimigos que normalmente só poderiam ser escolhidos como alvo de ataques **à distância**.`,
  }),

  heroicSkill({
    name: 'Raízes Simbióticas',
    page: 23,
    classes: ['Andarilho', 'Floralista', 'Mutante', 'Quimerista'],
    alsoRequires: ['Companheiro Fiel'],
    note: 'Companheiro Fiel da espécie construto (a tabela do Codex cita planta).',
    summary:
      'Ao recuperar PV, você pode recuperar só metade e seu companheiro recupera o mesmo tanto; no fim do seu turno, um companheiro com PV cheios e que não agiu pode fazer um ataque livre.',
    body: `Ao recuperar PV, você pode escolher recuperar **apenas a metade**. Se fizer isso, o seu [[companheiro-fiel]] recupera **a mesma quantidade de PV**.

No fim do seu turno em um conflito, se os **PV atuais** do companheiro forem iguais ou maiores que os **PV máximos** dele e ele **não tiver feito ações nem ataques** neste turno, você pode ordenar que ele faça um **ataque livre** com um dos ataques básicos que possui.`,
  }),

  heroicSkill({
    name: 'Sacrifício Arcano',
    page: 24,
    classes: ['Arcanista', 'Guardião'],
    summary:
      'Uma vez por cena, se você está fundido a um Arcano e você e/ou aliados visíveis cairiam a 0 PV, todos podem ficar com 1 PV; se o fizerem, você dispensa o Arcano e não pode invocá-lo até o fim da cena.',
    body: `**Uma vez por cena**, se você estiver **fundido a um Arcano** e você e/ou aliados que você enxergue fossem cair a **0 PV**, todos esses personagens podem, em vez disso, ficar com **exatamente 1 PV**.

Se fizer isso, o preço é **dispensar o Arcano na hora** (sem ativar nenhum efeito de dispensa dele); você não pode invocá-lo de novo até o fim da cena.`,
  }),

  heroicSkill({
    name: 'Segredo do Grande Caldeirão',
    page: 24,
    classes: ['Inventor'],
    alsoRequires: ['Engenhocas'],
    note: 'Engenhocas com Alquimia no nível superior.',
    summary:
      'Ao criar uma poção por Alquimia, você pode tratar o resultado do dado que define o alvo como 13 ou 17, qualquer que seja o número rolado.',
    body: `Quando a **Alquimia** produzir uma poção, você pode escolher **13 ou 17** como o valor do dado que determina o **alvo** dela, seja qual for o número que saiu na rolagem.`,
  }),

  heroicSkill({
    name: 'Tática da Asa Quebrada',
    page: 24,
    classes: ['Comandante', 'Guardião'],
    summary:
      'Depois que um inimigo faz teste de Precisão ou de Magia para feitiço ofensivo, você dá +3 ao resultado e escolhe: você e aliados que o ouvem ficam Resistentes a tudo, ou causam 5 de dano adicional, até o fim do turno.',
    body: `No turno de um inimigo que você enxergue, em um conflito, logo após ele fazer um teste de **Precisão** ou um teste de **Magia** para um **feitiço ofensivo** (O), você pode somar **+3** ao resultado. Ao fazer isso, escolha uma opção:

- você e todo aliado que possa ouvi-lo ficam **Resistentes a todos os tipos de dano** até o fim desse turno; ou
- você e todo aliado que possa ouvi-lo causam **5 pontos de dano adicional** até o fim desse turno.

Depois de usar este poder, só poderá usá-lo outra vez a partir do início do seu próximo turno.`,
  }),

  heroicSkill({
    name: 'Truque do Caçador',
    page: 24,
    classes: ['Atirador', 'Mestre de Armas'],
    summary:
      'Ao transformar uma arma personalizada mutável no seu turno, escolha: o próximo ataque com ela causa 5 de dano adicional (se você ainda não atacou), ou, se acertar com ela, você recupera 5 PV e 5 PM.',
    body: `Quando você **transformar uma arma personalizada mutável** durante o seu turno, escolha um efeito:

- se você **ainda não tiver feito ataques** neste turno, o próximo ataque que fizer com essa arma neste turno causa **5 pontos de dano adicional**; ou
- se você **atingir uma ou mais criaturas** com um ataque feito com essa arma neste turno, recupera **5 PV e 5 PM**.`,
  }),

  heroicSkill({
    name: 'Voz da Bruxaria',
    page: 25,
    classes: ['Orador', 'Virtuoso'],
    summary:
      'Inimigos que sofrerem condições por um verso seu ou por Condenar também ficam enfeitiçados e precisam incluir você entre os alvos de ataques e feitiços ofensivos, se puderem.',
    body: `Quando inimigos sofrem condições por um **verso** que você cantou ou pelo seu **Condenar**, cada um deles fica também **enfeitiçado**. Ficam de fora as criaturas imunes e as que já estavam sob todas as condições que aquele efeito poderia causar.

Quem você enfeitiçou desse modo precisa **incluir você** entre os alvos dos próprios ataques e feitiços ofensivos (O) sempre que puder. O enfeitiçamento acaba no **início do próximo turno da criatura** ou quando ela se recuperar de uma ou mais condições, o que vier antes.`,
  }),
];
