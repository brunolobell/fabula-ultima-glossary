import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Floralista';

export const floralista: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 138,
    summary:
      'Cultiva magissementes num jardim abstrato: cada uma floresce ao longo de um relógio de germinação, dando resistências, condições, dano ou apoio até murchar.',
    body: `Floralistas têm uma conexão direta com a terra. Dela brotam as **magissementes**, sementes capazes de se nutrir de energia espiritual e florescer num majestoso e efêmero triunfo mágico.

Eles identificam e cultivam essas sementes, obtendo uma imensa variedade de benefícios que combinam com qualquer disciplina mágica ou marcial.

## Para pensar no personagem

- Quando e onde você descobriu sua primeira magissemente?
- Quem te ensinou a cuidar de plantas e flores?
- Como você implementou as magissementes em seu estilo de combate?
- Há muitos praticando a sua arte ou você é uma exceção?

## O jardim

Ao plantar uma magissemente, ela **enraíza no seu jardim** até ser removida. O jardim é um espaço abstrato (um vaso nas costas, uma fenda na lâmina, o chão sob seus pés). Ele comporta **uma magissemente por vez**, e qualquer uma que esteja nele é removida no fim de cada cena.

## Relógio de germinação

Ao adquirir [[cloromancia]], você recebe um **relógio de germinação**, presente só em cenas de conflito. Ele representa o ciclo da vida no seu jardim.

- Tem **4 seções** e começa toda cena vazio.
- No fim do seu turno, se houver uma magissemente no jardim, **preencha 1 seção**; depois, se ainda houver magissemente e o efeito dela for "No fim do seu turno", você deve ativá-lo.
- Ao preencher a quarta seção, **remova a magissemente** e apague todas as seções.
- Só é possível preencher ou apagar seções dessa forma, com os poderes heroicos Dedo Verde ou Muralha de Espinhos, ou com efeitos que citem relógios de germinação.

## Efeitos de magissementes

Os efeitos são passivos ou ativados no fim do seu turno, e variam conforme o número de seções preenchidas (coluna **T**).

- Só se aplicam enquanto a magissemente estiver enraizada.
- Aplica-se **apenas** o efeito do número exato de seções preenchidas, nunca o de outros números.
- A partir do **30º nível**, efeitos que causam dano causam 5 a mais, e efeitos que fazem perder ou recuperar PV e/ou PM aumentam em 10.

## Lista de magissementes

Lista padrão de 20 magissementes (páginas 141 a 147 do Atlas). Seu grupo pode criar outras; o Mestre pode dá-las como recompensa, e cada uma vale cerca de **1.000z**, com poder parecido com o das listadas. "NP" abaixo é o NP em Cloromancia.

### Asfódelo-do-Cemitério

- **1:** no fim do turno, um inimigo que você veja fica abalado.
- **2:** no fim do turno, todos os inimigos que você veja ficam abalados.
- **3:** no fim do turno, causa dano de trevas de 15 + NP a cada inimigo abalado que você veja.

### Beladona-de-Folha-Curva

- **0–1:** todo dano que você causa vira de veneno (tipo fixo; ignora Imunidades e Resistências).
- **2–3:** o dano dos seus ataques vira de veneno (fixo; ignora Imunidades e Resistências). Na primeira vez no turno que você causar dano de veneno, causa dano adicional igual ao NP e cada criatura que perder PV assim fica envenenada.

### Cravo-Furioso

- **0–1:** quando sai do jardim, escolha um inimigo que você veja: até o fim do seu próximo turno, ao atacar ou lançar feitiço ofensivo ele deve incluir você entre os alvos, se possível. Até o fim do seu turno, você pode remover a magissemente do jardim e apagar todas as seções do relógio.

### Crisântemo-Ardente

- **1–3:** no fim do turno, escolha terra ou fogo. Até usar o efeito de novo ou a magissemente sair, todo dano causado por você e por cada aliado presente vira desse tipo (fixo; ignora Resistências).

### Dália-do-Deserto

- **0–1:** você tem Resistência a dano de ar e de fogo.
- **2–3:** você e os aliados presentes na cena têm essa Resistência.

### Dente-de-Leão-Saltitante

- **1–3:** no fim do turno, escolha ar ou raio. Até usar o efeito de novo ou a magissemente sair, todo dano causado por você e pelos aliados presentes vira desse tipo (fixo; ignora Resistências).

### Espinheiro-Chifrudo

- **0–1:** você tem Resistência a dano de trevas e de veneno.
- **2–3:** você e os aliados presentes na cena têm essa Resistência.

### Estrelícia-Prateada

- **0–1:** você tem Resistência a dano de raio e de luz.
- **2–3:** você e os aliados presentes na cena têm essa Resistência.

### Gazânia Peregrina

- **1–2:** no fim do turno, você ou outro personagem que veja recupera 2 Pontos de Inventário.
- **3:** no fim do turno, você e todos os outros personagens que veja recuperam 1 Ponto de Inventário.

### Ginkgo-Dourado

- **1:** no fim do turno, você e os aliados que veja se recuperam de abalado, atordoado e/ou enfurecido.
- **2–3:** no fim do turno, você e os aliados que veja recuperam 5 + NP PM.

### Íris-Eremita

- **1:** no fim do turno, escolha um inimigo que veja; o Mestre revela nível, patente, espécie, PV e PM máximos, Traços, Atributos, Defesa e Defesa Mágica.
- **2–3:** igual, e o Mestre revela também as Afinidades.

### Lírio-Medicinal

- **0–1:** no fim do turno, você e os aliados que veja se recuperam de envenenado, fraco e lento.
- **2–3:** no fim do turno, você e os aliados que veja recuperam 15 + NP PV.

### Lótus-Oceânica

- **0–1:** você é imune a atordoado e lento.
- **2:** seus dados de Destreza e Astúcia contam como um passo maior (máximo d12).
- **3:** você e os aliados que veja contam seus dados de Destreza e Astúcia como um passo maior (máximo d12).

### Magnólia-Lunar

- **1–3:** no fim do turno, escolha gelo ou luz. Até usar o efeito de novo ou a magissemente sair, todo dano causado por você e pelos aliados presentes vira desse tipo (fixo; ignora Resistências).

### Muralha-de-Espinhos

- **0–1:** Resistência a dano físico.
- **2:** Resistência a dano físico; depois de ser atingido por ataque corpo a corpo, você causa 5 + NP de dano físico ao atacante (após o ataque ser resolvido).
- **3:** como no 2, mas você causa esse dano físico duas vezes (5 + NP, duas vezes).

### Narciso-do-Ártico

- **0–1:** você tem Resistência a dano de terra e de gelo.
- **2–3:** você e os aliados presentes na cena têm essa Resistência.

### Orquídea-Listrada

- **1:** no fim do turno, um inimigo que veja fica fraco.
- **2:** todos os inimigos que veja ficam fracos.
- **3:** causa dano de veneno de 15 + NP a cada inimigo fraco que veja.

### Peônia-Estrelada

- **1:** no fim do turno, um inimigo que veja fica atordoado.
- **2:** todos os inimigos que veja ficam atordoados.
- **3:** causa dano de luz de 15 + NP a cada inimigo atordoado que veja.

### Protea-Real

- **0–1:** você é imune a abalado e fraco.
- **2:** seus dados de Vigor e Vontade contam como um passo maior (máximo d12).
- **3:** você e os aliados que veja contam seus dados de Vigor e Vontade como um passo maior (máximo d12).

### Rosa-Serrilhada

- **1:** no fim do turno, um inimigo que veja fica lento.
- **2:** todos os inimigos que veja ficam lentos.
- **3:** causa dano de luz de 15 + NP a cada inimigo lento que veja (o livro imprime "luz" aqui).`,
    otherNames: ['Lâmina do Florescer', 'Jardineiro', 'Herbalista'],
    quote: 'Não há rosas sem espinhos.',
    freeBenefits: [
      'Aumenta permanentemente seus PV ou PM máximos em 5 (à sua escolha).',
    ],
  }),

  skill(
    CLASS,
    'Árvore da Vida',
    139,
    5,
    'Ao remover uma magissemente do jardim, uma criatura que você veja e que esteja em crise recupera 5 + NP × 5 PV.',
    `Ao remover uma magissemente do seu jardim, você pode escolher uma criatura que veja: se ela estiver **em crise**, recupera **(5 + (NP × 5))** PV.`,
  ),

  skill(
    CLASS,
    'Cloromancia',
    139,
    10,
    'Cada nível ensina um tipo de magissemente. Em conflito, sem magissemente no jardim, por uma ação e 20 PM você planta uma que conheça.',
    `Sempre que adquirir este poder, você conhece um **tipo diferente de magissemente** da lista da classe [[floralista]].

Durante um conflito, se não houver magissementes no seu jardim, você pode usar uma ação e gastar **20 PM** para plantar uma magissemente de um tipo que conheça. As regras do jardim e do relógio de germinação estão no corpo da classe.`,
  ),

  skill(
    CLASS,
    'Enxerto',
    139,
    1,
    'Com uma magissemente no jardim e ao menos 1 seção do relógio preenchida, por uma ação você a troca por outra que conheça, sem alterar o relógio.',
    `Enquanto houver uma magissemente no seu jardim e **1 ou mais seções** do relógio de germinação estiverem preenchidas, você pode usar uma ação para removê-la e plantar **outra** magissemente que você conheça. Isso **não altera** as seções preenchidas do relógio.`,
  ),

  skill(
    CLASS,
    'Influência Verdejante',
    139,
    1,
    'Permite fazer rituais de ritualismo e usar ritualismo para criar, animar e controlar vegetação, pólen, esporos e toxinas (exceto NPCs da espécie planta).',
    `Você pode fazer rituais da disciplina **ritualismo**. Além disso, pode usar ritualismo para **criar, animar e/ou controlar** vegetação, pólen, esporos e toxinas, mas não pode criar nem controlar NPCs da espécie planta dessa forma.`,
  ),

  skill(
    CLASS,
    'Jardinagem Marcial',
    139,
    3,
    'Depois de plantar com Cloromancia (não com Enxerto): um ataque livre ou um feitiço de até 5 + NP × 5 PM, sem gastar ação, com RA 0 no dano.',
    `Depois de plantar uma magissemente com [[cloromancia]] (mas **não** com [[enxerto]]), escolha um efeito:

- fazer um **ataque livre** com uma arma equipada; **ou**
- fazer a ação **Feitiço** sem usar ação, lançando um feitiço com custo total de até **(5 + (NP × 5))** PM (você ainda paga o custo).

Sua RA no teste de Precisão ou de Magia conta como **0** para calcular o dano desse ataque ou feitiço.`,
  ),
];
