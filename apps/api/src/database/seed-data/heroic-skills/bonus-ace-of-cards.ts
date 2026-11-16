import { heroicSkill, withTags } from '../helpers';
import { SeedEntry } from '../types';

// "Novos Poderes Heroicos" do Fabula Bonus do Carteador (Ace of Cards, páginas 6–7),
// traduzidos por nós; não oficiais. Os nomes seguem os do Codex Extra.
// Aplique `inBook('bonus-ace-of-cards', …)` ao registrar.
export const poderesHeroicosAceOfCards: SeedEntry[] = [
  withTags(
    heroicSkill({
      name: 'Preto e Branco',
      page: 6,
      classes: [
        'Carteador',
        'Guerreiro Sombrio',
        'Entropista',
        'Espiritualista',
      ],
      alsoRequires: ['Cartas Mágicas'],
      summary:
        'Encrenca em Dobro pode causar todo o dano de luz ou de trevas; com um curinga na pilha de descarte, o dano de Flush Ofuscante, Encrenca em Dobro e Flush Mágico ignora Imunidades e Resistências.',
      body: `Ao resolver o efeito **Encrenca em Dobro**, você pode fazer **todo o dano** dele ser de **luz** ou de **trevas**, à sua escolha, em vez de ser do tipo correspondente aos naipes das cartas usadas.

Além disso, enquanto houver um **curinga** na sua **pilha de descarte**, todo o dano causado pelos efeitos **Flush Ofuscante**, **Encrenca em Dobro** e **Flush Mágico** **ignora Imunidades e Resistências**.`,
    }),
    'black & white',
  ),

  withTags(
    heroicSkill({
      name: 'Vanguarda das Cartas',
      page: 6,
      classes: ['Carteador'],
      alsoRequires: ['Cartas Mágicas'],
      summary:
        'Em conflito, uma ação põe uma carta da mão virada para baixo como carta de vanguarda (e compra 1); ao sofrer dano, revelá-la e descartá-la pode anular o dano e recuperar, em PM, o dano evitado.',
      body: `**Pôr uma carta de vanguarda.** Durante um conflito, se você tiver **duas ou menos cartas de vanguarda em jogo**, pode usar uma ação para escolher **1 carta da sua mão** e colocá-la **virada para baixo** como carta de vanguarda. Se fizer isso, **compre 1 carta** do baralho.

**Proteger-se.** Quando você sofrer dano e tiver uma ou mais cartas de vanguarda em jogo, pode **revelar uma delas** e colocá-la **no topo da sua pilha de descarte**. Se essa carta for um **curinga** ou se o naipe dela corresponder ao **tipo do dano** sofrido, você **não sofre o dano** e **recupera PM** na mesma quantidade.

**Fim do conflito.** Ao fim de cada conflito, se houver cartas de vanguarda em jogo, **embaralhe-as de volta** no seu baralho.`,
    }),
    'card vanguard',
  ),

  withTags(
    heroicSkill({
      name: 'Mestre de Duelos',
      page: 6,
      classes: [
        'Carteador',
        'Furioso',
        'Ladino',
        'Atirador',
        'Mestre de Armas',
      ],
      alsoRequires: ['Cartas Mágicas'],
      summary:
        'Ao resolver Par Mágico com uma arma arcana ou de arremesso, causa dano adicional igual ao valor comum das cartas e recupera PM igual ao dobro desse valor.',
      body: `Ao resolver o efeito **Par Mágico**, se o ataque for feito com uma arma da categoria **Arcana** ou **Arremesso**, você causa **dano adicional** igual ao **valor comum das cartas usadas** e **recupera PM** igual ao **dobro desse valor**.

> **Exemplo:** ao resolver um par de 5, você causa **5 pontos de dano adicional** e recupera **10 PM**.`,
    }),
    'duel master',
  ),

  withTags(
    heroicSkill({
      name: 'Rito Proibido',
      page: 7,
      classes: ['Carteador', 'Arcanista'],
      alsoRequires: ['Cartas Mágicas'],
      note: 'Exige NP 3 ou mais em Cartas Mágicas.',
      summary:
        'Você resiste ao tipo de dano do naipe da carta no topo da sua pilha de descarte (a todos, se for curinga) e ganha o efeito de conjunto Monarca Proibido: 777 de dano a cada inimigo.',
      body: `**Resistência.** Enquanto houver uma ou mais cartas na sua **pilha de descarte**, você tem **Resistência** ao tipo de dano correspondente ao **naipe da carta no topo** dela. Se essa carta for um **curinga**, você tem Resistência aos **quatro tipos de dano**: ar, terra, fogo e gelo.

**Novo efeito de conjunto.** Você adiciona o efeito abaixo à sua lista de conjuntos:

| Efeito | Requisito do conjunto |
| --- | --- |
| Monarca Proibido | 4 cartas do **mesmo valor**, nenhuma delas curinga + **1 curinga** |

### Monarca Proibido

Você causa **777 pontos de dano** a cada inimigo presente na cena. O tipo do dano é **luz** se **(o valor comum das 4 cartas)** for par, ou **trevas** se for ímpar.

Se houver um **curinga** na sua **pilha de descarte**, o dano causado por este efeito **ignora Imunidades e Resistências**.`,
    }),
    'forbidden rite',
  ),
];
