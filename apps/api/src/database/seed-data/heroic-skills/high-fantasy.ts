import { heroicSkill } from '../helpers';
import { SeedEntry } from '../types';

// "Novos Poderes Heroicos" do Atlas High Fantasy (páginas 152–161).
// Aplique `inBook('high-fantasy', …)` ao registrar.
export const poderesHeroicosHighFantasy: SeedEntry[] = [
  heroicSkill({
    name: 'Adepto das Lâminas',
    page: 153,
    classes: ['Ladino', 'Mestre de Armas'],
    summary:
      'Com adagas corpo a corpo equipadas, Defesa e Defesa Mágica sobem em 1, as adagas contam como arremesso, espada e luta, e podem atingir criaturas fora do alcance de ataques corpo a corpo.',
    body: `Enquanto tiver uma ou mais **adagas corpo a corpo** equipadas:

- sua **Defesa e Defesa Mágica** aumentam em **+1**;
- você considera essas armas como das categorias **arremesso, espada e luta** para requisitos de poderes e outros efeitos;
- seus ataques com adagas podem atingir criaturas que normalmente não poderiam ser alvo de ataques corpo a corpo.`,
  }),

  heroicSkill({
    name: 'Batalha Incessante',
    page: 154,
    classes: ['Comandante'],
    summary:
      'Os custos em PM de Carga de Cavalaria, Decreto do Bispo e Roque do Rei caem pela metade.',
    body: `O custo em PM dos seus poderes **Carga de Cavalaria**, **Decreto do Bispo** e **Roque do Rei** é reduzido pela **metade**.`,
  }),

  heroicSkill({
    name: 'Bimagus',
    page: 154,
    classes: ['Elementalista', 'Entropista', 'Espiritualista'],
    required: 2,
    note: 'Exige estar no 30º nível ou acima.',
    summary:
      'Com arma arcana, gasta 20 a 50 PM para lançar dois feitiços numa só ação, pagando só (20 + PM gastos) no total; o segundo custa no máximo metade do primeiro.',
    body: `**Uma vez por turno** em um conflito, se tiver uma **arma arcana** equipada, você pode usar uma ação e gastar de **20 a 50 PM** para fazer a ação **Feitiço duas vezes** sem usar uma ação, lançando os feitiços sem pagar o custo normal.

- O custo total em PM de **ambos** os feitiços deve ser **(20 + os PM gastos para usar este poder)**.
- O segundo feitiço deve ter custo total em PM **igual ou menor à metade** do custo total do primeiro.`,
  }),

  heroicSkill({
    name: 'Corte Triplo',
    page: 154,
    classes: ['Dançarino', 'Mestre de Armas'],
    summary:
      'Seu espaço de armadura vira um terceiro espaço de mão para uma adaga ou espada corpo a corpo de uma mão, e você ataca uma vez com cada arma (regras de duas armas, RA 0).',
    body: `Se tiver uma espada ou adaga (corpo a corpo e de uma mão) equipada em **cada um dos seus espaços de mão**, você pode tratar o seu **espaço de armadura** como um segundo espaço de mão secundária. Esse espaço só aceita uma adaga ou espada corpo a corpo de uma mão. O poder heroico Mão de Gorila não transforma armas de duas mãos em armas de uma mão, então **não combina** com Corte Triplo.

Ao fazer a ação Ataque com adagas e/ou espadas, você ataca **uma vez com cada arma**. Valem as regras de **combate com duas armas**: cada um dos três ataques perde a propriedade multi (sem poder recuperá-la) e você considera a **RA de cada teste de Precisão como 0** para calcular o dano.`,
  }),

  heroicSkill({
    name: 'Espetáculo',
    page: 155,
    classes: ['Dançarino'],
    summary:
      'No início do turno, sem armadura marcial, gasta 1 Ponto de Fabula para apresentar até três danças que conhece, em qualquer ordem e sem PM; depois não dança até o fim do próximo turno.',
    body: `No início do seu turno em um conflito, se **não** tiver armadura marcial equipada, você pode gastar **1 Ponto de Fabula** para apresentar **até três danças diferentes** entre as que conhece, na ordem que preferir e **sem custo em PM**.

Se fizer isso, não pode apresentar danças até o **fim do seu próximo turno**.`,
  }),

  heroicSkill({
    name: 'Enxame Rodopiante',
    page: 155,
    classes: ['Atirador', 'Dançarino', 'Furioso'],
    summary:
      'Ataques à distância com arma de arremesso (sem arma marcial ou escudo) dão Pontos de Ímpeto (até 5), que viram dano adicional ou Defesa quando você é acertado.',
    body: `Quando faz um **ataque à distância com uma arma de arremesso**, se não tiver nenhuma arma marcial ou escudo equipados, você recebe **1 Ponto de Ímpeto**. O máximo é **5**.

- Seus ataques à distância com armas de arremesso causam **dano adicional igual aos seus Pontos de Ímpeto** atuais.
- Quando uma criatura o acerta com um ataque que atinge sua Defesa, você **gasta todos** os Pontos de Ímpeto e aumenta sua Defesa em um valor igual à quantidade gasta (isso pode transformar um acerto em falha).
- Você perde todos os Pontos de Ímpeto no **fim de cada cena**.`,
  }),

  heroicSkill({
    name: 'Flecha Dupla',
    page: 155,
    classes: ['Atirador', 'Comandante'],
    summary:
      'Ao atacar à distância com um arco, sem outra arma equipada, faz dois ataques (mesmo alvo ou não), pelas regras de duas armas e RA 0.',
    body: `Quando faz um ataque à distância com um **arco**, se não tiver nenhuma outra arma equipada, você pode fazer **dois ataques diferentes** em vez de um, contra o mesmo alvo ou alvos diferentes.

Ambos seguem as regras de **combate com duas armas**: cada ataque perde a propriedade multi (sem poder recuperá-la) e a **RA de cada teste de Precisão conta como 0** para calcular o dano.

Não se acumula com a personalização rápida de uma arma personalizada: um arco rápido não permite mais de dois ataques.`,
  }),

  heroicSkill({
    name: 'Floresta de Ferro',
    page: 156,
    classes: ['Comandante', 'Mestre de Armas'],
    summary:
      'Ao acertar com uma lança (sem outra arma), gasta 2 PM: o ataque causa metade do dano e um alvo escolhido paga 10 PM para fazer um tipo de ação até seu próximo turno.',
    body: `Depois de acertar uma ou mais criaturas com um ataque corpo a corpo usando uma **lança**, se não tiver nenhuma outra arma equipada, você pode gastar **2 PM** e escolher uma das criaturas atingidas. Se o fizer:

- o ataque causa **metade do dano** a todos os alvos;
- escolha um tipo de ação: **Ataque, Guarda, Feitiço, Objetivo ou Poder**;
- o alvo escolhido deve gastar **10 PM** sempre que quiser fazer essa ação; se não tiver PM, precisa fazer outro tipo de ação.

O efeito dura até o início do seu próximo turno ou até você usar este poder de novo.`,
  }),

  heroicSkill({
    name: 'Hoplita',
    page: 156,
    classes: ['Comandante', 'Guardião'],
    summary:
      'Com uma arma na mão dominante e um escudo na secundária, seus ataques causam 5 de dano adicional e a Defesa sobe em 1.',
    body: `Enquanto estiver com uma arma no espaço de mão dominante e um **escudo** no espaço de mão secundária, seus ataques causam **5 pontos de dano adicional** e sua **Defesa** aumenta em **+1**.

Não pode ser usado junto com armas personalizadas com a personalização aumento na Defesa (página 107), nem com o poder Duplo Escudeiro (Livro Básico, página 203).`,
  }),

  heroicSkill({
    name: 'Golpe Pulverizador',
    page: 156,
    classes: ['Furioso', 'Guerreiro Sombrio', 'Mestre de Armas'],
    summary:
      'Depois de acertar com Trespassar usando uma arma pesada corpo a corpo, você pode causar dano igual à sua RA em vez de nenhum, somando todo o dano adicional.',
    body: `Depois de acertar uma criatura com **Trespassar**, se o ataque foi feito com uma **arma pesada corpo a corpo**, você pode escolher causar **dano igual à sua RA**, em vez de nenhum dano.

Todas as fontes de dano adicional, inclusive a terceira opção de Trespassar, continuam valendo normalmente; ignore o dano da arma.`,
  }),

  heroicSkill({
    name: 'Guarda Mágica',
    page: 156,
    classes: ['Elementalista', 'Entropista', 'Espiritualista', 'Quimerista'],
    summary:
      'Ao fazer Guarda sem cobrir outra criatura, pode interromper e negar um feitiço lançado por uma criatura que você veja, pagando (10 + o custo total do feitiço) PM.',
    body: `Ao fazer a ação **Guarda** sem dar cobertura a outra criatura, você recebe este benefício até o início do seu próximo turno: quando uma criatura que você veja **lançar um feitiço**, depois que ela gastar os PM, você pode gastar **(10 + o custo total em PM do feitiço)** para **interromper o feitiço e negar seus efeitos**.

O feitiço não é lançado, mas o alvo ainda gasta a ação.`,
  }),

  heroicSkill({
    name: 'Grande Invocação',
    page: 157,
    classes: ['Arcanista'],
    note: 'Exige estar no 30º nível ou acima.',
    summary:
      'Ao invocar um Arcano, gasta 1 Ponto de Fabula e metade dos PV atuais para manifestá-lo como uma criatura aliada de patente soldado (espécie demônio) com ficha própria.',
    body: `Quando invoca um Arcano, você pode gastar **1 Ponto de Fabula** e **metade dos seus PV atuais** (arredondada para baixo) para manifestar o poder dele por completo. O Arcano surge como uma criatura de **patente soldado**, espécie **demônio**, sob seu controle: é um aliado que age no seu próprio turno (se usar em um conflito, ele entra no fim da rodada atual). Você **não recebe** os benefícios de fundição que teria ao invocá-lo normalmente.

## Ficha da criatura

- **Nível** igual ao seu (recebe o bônus da etapa 8 do Livro Básico, página 303, em testes e dano).
- **d10** em um Atributo à sua escolha e **d8** nos demais.
- **PV máximos** = (2 × dado básico de Vigor da criatura) + (seus PV máximos ÷ 2). Não tem PM.
- **Resistência** a dois tipos de dano à sua escolha.
- Todos os **benefícios de fundição** que o arcanista teria ao invocá-lo (Afinidades, imunidade a condições, aumento de Atributos etc.). Se um benefício fizesse o Arcano ser dispersado, a criatura desaparece, a menos que você gaste 20 PM.
- Um **ataque básico corpo a corpo** cujo teste de Precisão usa dois Atributos diferentes (você escolhe quais) e causa **(RA + 8)** de dano físico. Escolha dois: o ataque vira à distância; causa 4 de dano adicional; causa dano de um tipo não físico; o teste de Precisão usa um único Atributo.
- Pode fazer a ação **Poder** para ativar um efeito de dispensa do Arcano, mas isso a dissipa, a menos que você gaste 20 PM.

## Regras

- A criatura sempre surge com os PV máximos e sem condições.
- Desaparece ao chegar a 0 PV; se você morrer, perder a consciência ou sair da cena; se você invocar ou fizer a Grande Invocação de outro Arcano; no fim da cena; ou sob suas ordens (isso não ativa o efeito de dispensa).
- Na primeira vez que invocar determinado Arcano assim, registre as escolhas de Atributos e de ataque básico: serão as mesmas nas próximas vezes.`,
  }),

  heroicSkill({
    name: 'Maré Crescente',
    page: 158,
    classes: ['Furioso', 'Mestre de Armas'],
    summary:
      'Ataques corpo a corpo com armas de luta (sem outra arma marcial ou escudo) dão Pontos de Coragem e causam (2 + Coragem) de dano adicional; no fim da cena ou com 5 pontos, você os gasta e recupera 10 PV e PM.',
    body: `Quando faz um ataque corpo a corpo com uma **arma de luta**, se não tiver nenhuma outra arma marcial ou escudo equipados, você recebe **1 Ponto de Coragem**.

- Seus ataques corpo a corpo com armas de luta causam dano adicional igual a **(2 + seus Pontos de Coragem atuais)**.
- No fim da cena, ou se tiver **5 ou mais** pontos no final do seu turno, você deve gastar todos eles e **recuperar 10 PV e 10 PM**.`,
  }),

  heroicSkill({
    name: 'Mira Arcana',
    page: 158,
    classes: ['Atirador', 'Mestre de Armas', 'Simbolista'],
    summary:
      'Ataques com arma arcana causam 5 de dano adicional e marcam um alvo: seu próximo feitiço ofensivo contra só ele tem sucesso crítico se os dois dados forem iguais.',
    body: `Quando atinge uma ou mais criaturas com um ataque usando uma **arma arcana**, o ataque causa **5 pontos de dano adicional** e você pode escolher um dos alvos atingidos.

Se o próximo **feitiço ofensivo** que você lançar nesta cena tiver **apenas essa criatura** como alvo, o teste de Magia dele conta como **sucesso crítico** se os dois dados rolarem o mesmo número (e não for uma falha crítica).`,
  }),

  heroicSkill({
    name: 'Momento Fugaz',
    page: 158,
    classes: ['Mestre de Armas'],
    alsoRequires: ['Contra-ataque'],
    summary:
      'Num Contra-ataque corpo a corpo com espada, você soma a RA ao dano em vez de contá-la como 0.',
    body: `Quando faz um [[contra-ataque]] corpo a corpo com uma **espada**, você pode somar a sua **RA** ao dano causado (não precisa considerá-la como 0).`,
  }),

  heroicSkill({
    name: 'Música Tema',
    page: 159,
    classes: ['Virtuoso'],
    summary:
      'Você ganha uma música-tema ligada a uma escala que conhece; uma vez por conflito, ao cantá-la ganha Resistência, 5 de dano adicional e versos mais baratos na escala.',
    body: `Ao adquirir este poder, você recebe uma **música-tema**: escolha um nome e uma **escala** entre as que conhece (pode ser uma música do mundo real; deixe-a tocando ao fundo!).

**Uma vez por cena de conflito**, depois de cantar um verso na escala escolhida, você pode dar início à música-tema. Enquanto ela dura, você:

- fica **Resistente** a dano do tipo da escala;
- causa **5 pontos de dano adicional** com dano desse tipo (que não pode ser alterado);
- paga **metade do custo em PM** de versos cantados na mesma escala, o mesmo valendo para aliados que também possam cantar versos.

A música dura até o fim da cena, ou até você sair de cena, ficar inconsciente ou morrer. Também termina se alguém começar um verso em outra escala, se você não cantar nenhum verso até o fim do seu turno, ou se outro personagem iniciar outra música-tema.`,
  }),

  heroicSkill({
    name: 'Paso Doble',
    page: 159,
    classes: ['Dançarino'],
    alsoRequires: ['Me Acompanhe'],
    summary: 'Em crise, você ignora o custo em PM do poder Me Acompanhe.',
    body: `Enquanto estiver em **crise**, você ignora o custo em PM de [[me-acompanhe]].`,
  }),

  heroicSkill({
    name: 'Rituais Ágeis',
    page: 159,
    classes: ['Elementalista', 'Entropista', 'Espiritualista', 'Quimerista'],
    summary:
      'Ao iniciar um ritual num conflito, o relógio do ritual tem duas seções a menos (mínimo quatro).',
    body: `Quando inicia um **ritual em uma cena de conflito**, o seu relógio de ritual é criado com **duas seções a menos** que o normal (mínimo de **quatro** seções).`,
  }),

  heroicSkill({
    name: 'Selos Rituais',
    page: 160,
    classes: ['Simbolista'],
    summary:
      'Fora de conflito, um ritual de até 60 PM pode ser armazenado num selo e concluído quando um gatilho escolhido por você ocorrer; só um selo ativo por vez.',
    body: `Quando faz um **ritual fora de uma cena de conflito**, se o custo total em PM for **60 ou menos**, você pode parar o processo imediatamente **antes do teste de Magia**, armazenando o ritual em um **selo ritual** sobre uma superfície que possa tocar.

- Escolha um **gatilho**, qualquer coisa de "quando eu entrar em crise" a "assim que eu estalar os dedos".
- Quando o gatilho ocorre, o selo desaparece e o ritual se conclui no local do selo: faça o teste de Magia e resolva os efeitos normalmente (mesmo inconsciente ou ausente da cena).
- Você só pode ter **um selo ativo por vez**; se morrer ou criar um novo, o anterior desaparece.`,
  }),

  heroicSkill({
    name: 'Tábula Rasa',
    page: 160,
    classes: ['Comandante'],
    summary:
      'Depois de usar Decreto do Bispo ou Roque do Rei em crise, cada inimigo da cena perde 10 PV (20 no nível 20, 30 no nível 40).',
    body: `Depois de usar **Decreto do Bispo** ou **Roque do Rei**, se estiver em **crise**, você pode fazer cada inimigo presente na cena **perder 10 PV**.

No **20º nível ou acima**, a perda é de **20**; no **40º nível ou acima**, de **30**.`,
  }),

  heroicSkill({
    name: 'Teia de Aranha',
    page: 161,
    classes: ['Furioso', 'Mestre de Armas'],
    summary:
      'Ao atacar corpo a corpo com um malho, sem outra arma equipada, faz dois ataques (regras de duas armas, RA 0).',
    body: `Quando faz um ataque corpo a corpo com um **malho**, se não tiver nenhuma outra arma equipada, você pode fazer **dois ataques separados** em vez de um, contra o mesmo alvo ou alvos diferentes.

Ambos seguem as regras de **combate com duas armas**: cada ataque perde a propriedade multi (sem poder recuperá-la) e a **RA de cada teste de Precisão conta como 0** para calcular o dano.

Não se acumula com a personalização rápida de uma arma personalizada: um malho rápido não permite mais de dois ataques.`,
  }),

  heroicSkill({
    name: 'Tela em Branco',
    page: 161,
    classes: ['Simbolista'],
    summary:
      'Com uma ação e até 30 PM, escolhe uma criatura que você veja para cada 5 PM gastos: ela se recupera de todas as condições e perde efeitos de duração "Cena".',
    body: `Você pode usar uma **ação** e gastar **até 30 PM** para escolher **uma criatura que veja para cada 5 PM** gastos. Cada alvo se recupera de **todas as condições** e deixa de ser afetado por qualquer efeito com duração "**Cena**" que o estivesse afetando.`,
  }),

  heroicSkill({
    name: 'Tiroteio',
    page: 161,
    classes: ['Atirador'],
    summary:
      'Depois de negar um ataque à distância com Fogo Cruzado, se seu teste de Precisão for par, faz um ataque livre de arma de fogo contra o atacante (RA 0).',
    body: `Depois de **negar um ataque à distância** com Fogo Cruzado, se o resultado do seu teste de Precisão for um **número par**, você pode fazer um **ataque livre** contra o atacante com uma **arma de fogo à distância** equipada.

O ataque deve ter o inimigo como único alvo e a sua **RA conta como 0** para calcular o dano.`,
  }),

  heroicSkill({
    name: 'Trilha Épica',
    page: 161,
    classes: ['Virtuoso'],
    summary:
      'Ao cantar um verso de volume médio ou forte, dobrando o custo em PM ou gastando 1 Ponto de Fabula, os testes de Precisão seus e de aliados que ouvem têm crítico com dados iguais.',
    body: `Quando canta um verso de volume **médio ou forte**, você pode **dobrar o custo em PM** dele ou gastar **1 Ponto de Fabula**. Se fizer isso, os **testes de Precisão** feitos por você e por todos os aliados que puderem ouvi-lo contam como **sucesso crítico** se os dois dados rolarem o mesmo número (e não for uma falha crítica).`,
  }),
];
