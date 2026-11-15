import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Bandoleiro';

export const bandoleiro: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 42,
    summary:
      'Figura dos agrestes e sertões, mestre da emboscada e da fuga a galope; reúne-se em bando para vingar injustiças, combatendo violência com violência por uma honra e crenças próprias.',
    body: `O bandoleiro é gente dos agrestes e dos sertões: arma emboscadas, some a galope por trilhas que só ele conhece e abre passagem à faca e à bala. Muitos começaram como capangas, se voltaram contra os antigos patrões e formaram bandos para fazer justiça a quem foi lesado. Respondem à violência na mesma moeda, mas seguem uma honra e crenças próprias.

Aos olhos de quem manda, não passam de mercenários à venda. Aos olhos do povo, são heróis que dão medo, mas também encantam, e rendem canções e causos.

## Para pensar no personagem

- Como se chama o seu bando, e de que maneira você se juntou a ele?
- Quem anda no seu encalço, e o que essa pessoa quer de você?
- Como foi a sua primeira vez nos sertões, e o que passou pela sua cabeça?
- Que fé ou convicção, religiosa ou não, orienta tudo o que você faz?`,
    otherNames: ['Lampião', 'Renegado', 'Vaqueiro'],
    quote: 'Hoje, é dia de festa! Estamos entendidos, seu barão?!',
    traits: ['ip', 'melee-weapon', 'ranged-weapon'],
    freeBenefits: [
      'Aumenta permanentemente seus PI máximos em 2.',
      'Pode equipar armas corpo a corpo e armas à distância marciais.',
    ],
  }),

  skill(
    CLASS,
    'Cabra da Peste',
    43,
    5,
    'Uma vez por cena, em crise, ação e 1 Ponto de Fabula: você se recupera de todas as condições e recupera PV igual a (NP × 10); gastando 1 Ponto de Ultima em vez disso, recupera também PM igual a (NP × 10).',
    `**Uma vez por cena**, se estiver em **crise**, você pode usar uma ação e gastar **1 Ponto de Fabula** para se recuperar de **todas as condições** e recuperar PV igual a **(NP × 10)**.

Se gastar **1 Ponto de Ultima** no lugar do Ponto de Fabula para usar este poder, você também recupera **PM igual a (NP × 10)**.`,
  ),

  skill(
    CLASS,
    'Líder de Bando',
    43,
    1,
    'Como líder de um teste em grupo, se algum apoiador tiver Laço com você, soma as duas maiores forças entre esses Laços em vez de apenas a maior.',
    `Quando você for o **líder** de um teste em grupo e um ou mais personagens apoiadores tiverem um **Laço** com você, some as **duas forças mais altas** entre esses Laços, em vez de somar apenas a força mais alta.`,
  ),

  skill(
    CLASS,
    'Redistribuir Riquezas',
    43,
    3,
    'Ao fim de um conflito em que um vilão foi reduzido a 0 PV, você recebe (1d6 × NP) PI para dividir entre os PJs; se ele ainda tinha mais de 1 Ponto de Ultima, você rouba 1 (só pode ter 1 por vez).',
    `No fim de uma cena de conflito na qual um **vilão** foi reduzido a 0 PV, você recebe **(1d6 × NP) PI** para distribuir entre os PJs.

Além disso, se o vilão tiver **mais de 1 Ponto de Ultima** no fim do conflito, você **rouba** 1 Ponto de Ultima dele. Anote-o na sua ficha: você só pode ter **1 Ponto de Ultima** por vez.`,
  ),

  skill(
    CLASS,
    'Sertanejo',
    43,
    1,
    'Você tem ligação com uma região árida e afastada da costa e da civilização, que conta como uma segunda Origem; ao evocá-la, pode gastar 1 Ponto de Ultima em vez de Fabula.',
    `Você tem uma conexão com uma região de terras áridas e difíceis, afastada da costa e distante dos costumes da chamada civilização.

Ao adquirir este poder, descreva esse lugar e como você criou essa conexão, e combine com o grupo o que significa ser sertanejo no seu mundo de jogo.

Essa região conta como uma **segunda Origem** para você. Se usar um Ponto de Fabula para evocá-la, você pode gastar **1 Ponto de Ultima** em vez disso.`,
  ),

  skill(
    CLASS,
    'Valhacouto',
    43,
    3,
    'Ao fim de um descanso, 1 Ponto de Fabula: seu bando traz (NP + 1) Suprimentos, que duram até o próximo uso; gaste 1 para rerrolar um teste de Viagem ou criar uma barraca mágica. Com 1 Ponto de Ultima, +2 Suprimentos.',
    `No fim de um **descanso**, você pode gastar **1 Ponto de Fabula** para que seu bando traga **(NP + 1) Suprimentos**. Eles duram até você usar este poder de novo.

- Ao fazer um **teste de Viagem**, você pode gastar **1 Suprimento** para rolar o dado novamente.
- Você também pode gastar **1 Suprimento** para criar uma **barraca mágica**.

Se gastar **1 Ponto de Ultima** ao usar este poder, o número de Suprimentos trazidos aumenta em **+2**.`,
  ),
];
