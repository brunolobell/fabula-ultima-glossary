import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Gourmet';

export const gourmet: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 148,
    summary:
      'Combina ingredientes de cinco sabores em iguarias cujos efeitos são sorteados e registrados numa ficha de receitas: cura, condições, dano, resistências e mais.',
    body: `Cozinhar pode ser uma habilidade comum, mas gourmets refinam seu conhecimento sobre alimentos a um nível quase sobrenatural: aperfeiçoam a arte de extrair a energia espiritual dos ingredientes e infusionam as refeições com efeitos poderosos.

Alguns se estabelecem numa vila e vivem do ofício; outros viajam o mundo atrás de novos ingredientes.

## Para pensar no personagem

- Quem te ensinou a cozinhar? Qual sua relação com seu mentor?
- Sua arte é revolucionária ou você já é estabelecido no meio?
- Qual a aparência dos seus pratos? Que ferramentas você usa?
- Por qual receita ou ingrediente lendário você está procurando?

A classe foca em experimentar combinações de sabores. Para registrar tudo, a Jambô oferece uma ficha de receitas em jamboeditora.com.br.

## Ingredientes

Você recebe ingredientes principalmente por [[culinaria]] e [[cozinheiro-viajante]], ou como recompensa. Ao obter um, role **1d6** para saber o sabor, descreva a aparência e dê um nome a ele.

| d6 | Sabor |
| --- | --- |
| 1 | Amargo |
| 2 | Salgado |
| 3 | Azedo |
| 4 | Doce |
| 5 | Umami |
| 6 | Sua escolha |

Você também pode comprar ingredientes em feiras, lojas ou com mercadores: **10 zênites** por um sabor aleatório ou **20 zênites** por um sabor à sua escolha.

## Iguarias e combinações de sabores

Com [[culinaria]], você combina **dois ou três ingredientes** numa **iguaria**, que aplica efeitos aos alvos.

- Cada combinação diferente de **dois sabores** (mesmo repetindo o mesmo sabor) acrescenta um efeito à iguaria.
- Ao combinar dois sabores que nunca combinou, role **1d12** na tabela de efeitos. Muitas opções exigem uma escolha (tipo de dano ou condição). Registre o resultado na ficha: dali em diante, essa combinação sempre gera exatamente esse efeito.
- Duas combinações na ficha **não podem ter efeitos idênticos**: faça escolhas que evitem repetição (outro tipo de dano ou condição); se for impossível, role de novo.
- Com a ficha completa, você terá **15 efeitos**, um por combinação possível de sabores.
- Iguarias de Culinária têm efeito imediato e são destruídas na hora. Para comidas únicas, para usar depois, use as regras de projetos (Livro Básico, página 134).

> **Exemplo:** três ingredientes, um salgado e dois amargos, geram duas combinações (amargo + amargo e amargo + salgado), logo dois efeitos diferentes.

### Efeitos de iguaria (d12)

"Alvo" é cada alvo da iguaria. Os tipos de dano para as escolhas são fogo, gelo, raio, terra ou veneno; as condições são atordoado, furioso, envenenado, abalado, lento ou fraco.

| d12 | Efeito |
| --- | --- |
| 1 | Cada alvo se recupera de uma condição (à escolha). |
| 2 | Cada alvo fica com uma condição (à escolha). |
| 3 | Cada alvo recupera 40 PV (50 a partir do 30º nível). |
| 4 | Cada alvo recupera 40 PM (50 a partir do 30º nível). |
| 5 | Causa 20 de dano a cada alvo, de um tipo à escolha (30 a partir do 30º nível). |
| 6 | Até o fim do seu próximo turno, cada fonte de dano de um tipo à escolha causa 5 de dano adicional a cada alvo. |
| 7 | Cada alvo não pode fazer a ação Guarda no próximo turno. |
| 8 | Cada alvo não pode fazer a ação Feitiço no próximo turno. |
| 9 | Cada alvo não pode fazer a ação Poder no próximo turno. |
| 10 | Até o fim do seu próximo turno, cada alvo fica Resistente a um tipo de dano à escolha. |
| 11 | Até o fim do próximo turno, cada alvo conta um dado (Destreza, Astúcia, Vigor ou Vontade, à escolha) como um passo maior (máx. d12). |
| 12 | No próximo turno de cada alvo, todo dano que ele causa vira de um tipo à escolha, fixo. |

### Regras especiais dos efeitos

- Uma iguaria tem **1, 2 ou 3 efeitos**, conforme a combinação (podem chegar a 4 ou 6 com o poder heroico Rodízio). Você decide a ordem de aplicação e pode abrir mão de quantos quiser, mas a mesma escolha vale para todos os alvos.
- Efeitos de **5 a 12** só funcionam em cenas de conflito.
- Uma iguaria só pode ter **um** efeito do tipo 5 (dano) e **um** do tipo 12 (muda tipo de dano); se a combinação trouxer mais, escolha só um e abra mão dos outros.
- Fora esses casos, os efeitos se acumulam e são aplicados por inteiro a cada alvo.

> **Exemplo:** efeito 2 (doce + umami), efeito 5 (amargo + umami) e efeito 9 (amargo + doce) numa mesma iguaria causam dano, uma condição e impedem a ação Poder por um turno.

## Conselhos do livro

A classe é atípica: suas habilidades são geradas ao longo da campanha. Você pode preparar iguarias **fora de conflito**, gastando ingredientes, para descobrir os efeitos antes da luta. Aproveite a propriedade **multi** para aplicar a mesma iguaria em vários inimigos.`,
    otherNames: ['Cervejeiro', 'Chef', 'Confeiteiro'],
    quote: 'Chefs de verdade respeitam a natureza do que transformam.',
    traits: ['ip', 'projects'],
    freeBenefits: [
      'Aumenta permanentemente seus Pontos de Inventário em 2.',
      'Pode iniciar projetos para criar comidas e bebidas únicas: sempre consumíveis, com área baseada no número e tipo de criaturas a alimentar.',
    ],
  }),

  skill(
    CLASS,
    'Cozinheiro Viajante',
    149,
    3,
    'Depois de cada rolagem de viagem, se tiver Culinária, você recebe NP × 2 ingredientes.',
    `Depois de cada rolagem de viagem, se tiver o poder [[culinaria]], você recebe **(NP × 2)** ingredientes.`,
  ),

  skill(
    CLASS,
    'Culinária',
    149,
    5,
    'Ao descansar em assentamento, recebe NP ingredientes; por uma ação combina 2 ou 3 ingredientes numa iguaria e a aplica em você e num aliado, ou em inimigos via ataque livre.',
    `Ao descansar em um assentamento, você recebe **(NP)** ingredientes.

Você pode usar uma ação e combinar **2 ou 3 ingredientes** para preparar uma iguaria (veja o corpo da classe [[gourmet]]) e escolher um efeito:

- aplicar os efeitos em você e num aliado que veja; **ou**
- fazer um **ataque livre** com uma arma equipada. O ataque não causa dano, mas você aplica os efeitos da iguaria a cada inimigo atingido.

Você carrega até **10 + (NP × 5)** ingredientes, que nunca estragam até serem usados. Se adquirir este poder na criação do personagem, começa o jogo com **dez ingredientes** de sabores aleatórios.`,
  ),

  skill(
    CLASS,
    'Feito com Amor',
    149,
    3,
    'Ao usar Culinária em você ou num aliado, gaste até NP × 10 PM: a cada 10 PM, aplica a iguaria em mais um aliado que você veja.',
    `Quando usa [[culinaria]] e aplica os efeitos da iguaria em você ou num aliado que veja, você pode gastar até **(NP × 10)** PM. Para cada **10 PM** gastos assim, aplique os efeitos num **aliado adicional** que você veja.`,
  ),

  skill(
    CLASS,
    'Garfo e Faca',
    149,
    1,
    'Ao usar Culinária num ataque livre com apenas 2 ingredientes, o ataque também causa dano normal, com RA 0.',
    `Quando usa [[culinaria]] para fazer um ataque livre, se combinou **apenas 2 ingredientes**, você também pode fazer o ataque causar dano normalmente. Se fizer isso, sua RA conta como **0** ao calcular o dano.`,
  ),

  skill(
    CLASS,
    'Sal e Pimenta',
    149,
    1,
    'Ao preparar uma iguaria, gaste 2 Pontos de Inventário para mudar o sabor de um ingrediente para outro à sua escolha.',
    `Ao preparar uma iguaria, você pode gastar **2 Pontos de Inventário**. Se fizer isso, mude o sabor de um ingrediente para outro sabor à sua escolha.`,
  ),
];
