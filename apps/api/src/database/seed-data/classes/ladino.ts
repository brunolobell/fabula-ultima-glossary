import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Ladino';

export const ladino: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 212,
    summary:
      'Criminoso, rebelde ou espião disposto a jogar sujo; rápido, perspicaz e evasivo, às vezes só pelo lucro, muitas vezes contra injustiças e tiranias.',
    body: `Sejam criminosos, rebeldes ou espiões, Ladinos estão mais que dispostos a jogar sujo para conseguir o que querem. Em geral são rápidos, perspicazes e evasivos. Alguns têm a fama de só se importar com dinheiro e lucro, mas muitos se consideram inimigos de injustiças, tiranias ou exclusão social.

É comum que Ladinos tenham o trágico destino de ser vistos como ameaça pelas mesmas pessoas a quem defendem.

## Para pensar no personagem

- O que motiva você? Desejo? Vingança? Ou uma ânsia ardente por liberdade?
- Você faz parte de uma organização criminosa ou trabalha por conta própria?
- Há algum lugar que você chama de casa? Ou, no fim, todos morrem sozinhos?
- Qual é a regra mais importante do seu código pessoal?`,
    otherNames: ['Bandido', 'Ladrão', 'Ninja'],
    quote: 'Eu encontrarei minha própria justiça.',
    freeBenefits: ['Aumenta permanentemente seus PI máximos em 2.'],
  }),

  skill(
    CLASS,
    'Alta Velocidade',
    213,
    3,
    'No início de um conflito, você pode gastar 10 PM para fazer, antes da primeira rodada, um ataque livre ou a ação Impedimento ou Objetivo, com bônus de (NP) nos testes dessa escolha.',
    `No início de um conflito, você pode gastar **10 PM**. Se fizer isso, escolha uma opção:

- faça um **ataque livre** com uma arma equipada; ou
- faça a ação **Impedimento** ou **Objetivo**.

Isso acontece **antes da primeira rodada**. Você também recebe um bônus igual a **(NP)** nos testes feitos como parte da opção escolhida.`,
  ),

  skill(
    CLASS,
    'Esquiva',
    213,
    3,
    'Enquanto não tem escudos nem armaduras marciais equipados, sua Defesa aumenta em (NP).',
  ),

  skill(
    CLASS,
    'Golpe Baixo',
    213,
    5,
    'Ao atingir uma criatura que seja o único alvo do ataque e esteja sofrendo condições, você causa dano adicional igual a (NP + o número de condições que a afetam).',
  ),

  skill(
    CLASS,
    'Roubo de Alma',
    213,
    5,
    'Com uma ação, você faz um teste de (DES + VON) contra a Defesa Mágica de um inimigo que vê; em caso de sucesso contra um soldado você recupera (NP) PI, e contra um elite ou campeão leva o tesouro da alma dele.',
    `Em um conflito, você pode usar uma **ação** para fazer um teste de **(DES + VON)** contra a **Defesa Mágica** de um inimigo que você veja. Você recebe um bônus igual a **(NP)** nesse teste.

Se tiver sucesso:

- contra um **soldado**, você recupera **(NP) PI**;
- contra um **elite** ou **campeão**, você recebe o **tesouro da alma** do alvo: um item de valor em zênites igual ou inferior ao **(nível do alvo × 30)** ou, se for um vilão, **(nível do alvo × 50)**. O tesouro aparece na sua mochila.

Uma criatura só pode ser furtada por este Poder **uma vez**.`,
  ),

  skill(
    CLASS,
    'Vejo Você Mais Tarde',
    213,
    1,
    'Com uma ação e 1 Ponto de Fabula, você some da cena e reaparece, quando quiser, em outra cena em que haja outro PJ; descreva como escapou.',
    `Você pode usar uma **ação** e **1 Ponto de Fabula** para **sumir da cena atual**, reaparecendo quando quiser durante uma **cena diferente** em que outro PJ esteja.

Descreva como você escapou e apareceu milagrosamente no novo local.`,
  ),
];
