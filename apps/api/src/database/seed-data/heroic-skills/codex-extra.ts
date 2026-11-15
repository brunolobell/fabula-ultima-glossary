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
      'Ao ser alvo de novo de um poder ou feitiço que já o atingiu na cena, gaste 1 Ponto de Fabula para ficar imune a ele; com 1 Ponto de Ultima, também recupera 20 PV.',
    body: `Quando você for alvo de um poder ou feitiço que **já tenha sido usado contra você** nesta cena, pode gastar **1 Ponto de Fabula** para ficar **imune ao efeito e ao dano** desse poder ou feitiço. A imunidade dura até o fim da cena ou até você usar este poder de novo, o que vier primeiro.

Se você pagar com **1 Ponto de Ultima** no lugar do Ponto de Fabula, também **recupera 20 PV**.`,
  }),

  heroicSkill({
    name: 'Cargas Radiantes',
    page: 17,
    classes: ['Astrólogo'],
    summary:
      'Ao gerar cargas, gaste 5 PM para converter uma delas em carga cósmica (vale como qualquer tipo); consumi-la amplia em 5 os PV perdidos ou recuperados por uma criatura.',
    body: `Sempre que você **gerar cargas** de qualquer tipo (celeste, estelar, meteórica ou solar), pode gastar **5 PM** para transformar uma das cargas geradas em uma **carga cósmica**. Ela pode ser consumida como se fosse uma carga de **qualquer tipo** que você escolher.

Além disso, quando você fizer uma criatura **perder ou recuperar PV**, pode consumir uma carga cósmica: nesse caso, a quantidade de PV perdida ou recuperada pela criatura **aumenta em 5**.`,
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
];
