import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Mutante';

export const mutante: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 154,
    summary:
      'Corpo e alma marcados pela poluição tecnológica ou mágica: gasta PV para assumir terioformas, mutações com poderes variados, e luta com ataques desarmados cada vez mais fortes.',
    body: `Alguns dizem que não há progresso sem sacrifícios; convenientemente raros são os feitos por quem está no poder. Mutantes são testemunhas vivas dessa arrogância impiedosa: pessoas cujo corpo e alma carregam os sinais da poluição tecnológica ou mágica.

Cada mutante é único e capaz de metamorfosear o próprio corpo de formas estranhas e sem precedentes, mas esses poderes têm um custo alto e vê-los em ação pode ser terrível.

## Para pensar no personagem

- Suas mutações vêm de experiências científicas ou de magia?
- Quem é o responsável por suas mutações? O que você sente por essa pessoa?
- Quem foi a primeira pessoa a ser gentil com você? O que isso custou a ela?
- Como suas mutações se manifestam? O que lhes dá uma estranha beleza?

## Terioformas

**Terioformas** são mutações que dão poderosas habilidades. A aparência é por sua conta (Pterotéria, por exemplo, pode dar asas de penas ou transformar você num morcego do tamanho de uma pessoa). Veja [[teriomorfose]].

- Depois de usar Teriomorfose, os efeitos da terioforma duram até o **fim da cena**, mas também terminam se você morrer ou ficar inconsciente, fizer a ação Guarda ou usar Teriomorfose de novo (inclusive por [[genoclepse]]).
- Você pode encerrar os efeitos a qualquer momento; em conflito, só no seu turno, antes ou depois de uma ação.
- Ao fim de uma cena, se ainda estiver sob uma terioforma, você pode gastar **10 PM** para estendê-la à cena seguinte.

### Lista de terioformas

Entre parênteses, as sugestões de Genoclepse (tipos de NPC que a refletem).

- **Anfíbia** (anfíbios, regeneradores, monstros aquáticos). Respira debaixo d'água e enxerga bem na penumbra. Quando recupera PV, recupera 5 a mais e pode se recuperar na hora de uma condição à sua escolha.
- **Arpátida** (lobos, aves de rapina, sentidos de caça aguçados). Astúcia conta como um tipo de dado maior (máx. d12). Ao causar dano pela primeira vez no turno, se ao menos uma das criaturas estiver em crise, causa 5 de dano adicional a cada uma.
- **Dinamotéria** (ursos, dinossauros, criaturas de força descomunal). Vigor atual conta como um passo maior (máx. d12). Ao ter sucesso num teste de relógio que inclua Vigor, pode preencher ou apagar 1 seção a mais.
- **Eletrófora** (criaturas elétricas, elementais do raio, robôs). Todo dano de seus ataques e feitiços vira de raio. Enquanto seus ataques desarmados causarem dano de raio, inimigos que percam 20 PV ou mais por eles também ficam lentos.
- **Neurofagoida** (parasitas, mortos-vivos, criaturas que se alimentam de almas). Ao usar [[biofagia]], você também recupera 4 + seu NP em Teriomorfose PM.
- **Pirófora** (besouros-bombardeiros, camarões-de-estalo, elementais de fogo). Todo dano de seus ataques e feitiços vira de fogo. Com ataques desarmados de fogo, inimigos que percam 20 PV ou mais por eles também ficam atordoados.
- **Placófora** (crustáceos, tartarugas, criaturas blindadas, veículos). Sua Defesa vale 13 + metade do seu NP em Teriomorfose (se o valor atual for melhor, use-o).
- **Pneumófora** (moluscos a jato, grandes feras aladas, foguetes). Todo dano de seus ataques e feitiços vira de ar. Com ataques desarmados de ar, inimigos que percam 20 PV ou mais por eles também ficam fracos.
- **Polípoda** (lulas, polvos, criaturas com tentáculos ou vinhas). Seus ataques desarmados recebem a propriedade multi (3).
- **Pterotéria** (morcegos, pássaros, insetos alados, voadores). Você voa: ataques corpo a corpo seus atingem voadores e você só é atingido em corpo a corpo por voadores ou quem alcance voadores. Sem efeito se não puder voar livremente (dentro de veículo para humanos, corredor estreito); e ao sofrer dano de ar, raio ou gelo em conflito, perde os benefícios até o início do próximo turno.
- **Taquitéria** (gatos, gazelas, lebres, criaturas ágeis). Destreza atual conta como um passo maior (máx. d12). Ao ter sucesso num teste de relógio que inclua Destreza, pode preencher ou apagar 1 seção a mais.
- **Toxicófora** (aranhas, cobras, gosmas tóxicas, criaturas venenosas). Todo dano de seus ataques e feitiços vira de veneno. Com ataques desarmados de veneno, inimigos que percam 20 PV ou mais por eles também ficam envenenados.`,
    otherNames: ['Abominação', 'Experimento', 'Licantropo'],
    quote:
      'Olhe para mim, covarde! Contemple o que seu silêncio permitiu que criassem!',
    freeBenefits: ['Aumenta permanentemente seus PV máximos em 5.'],
  }),

  skill(
    CLASS,
    'Acromorfose',
    155,
    3,
    'Ataques desarmados ganham bônus de Precisão igual ao NP e 6 + NP × 2 de dano adicional; no início do turno você pode mudar a categoria deles (se não for luta) até o próximo turno.',
    `Seus testes de Precisão para **ataques desarmados** recebem bônus igual ao **(NP)**, e esses ataques causam **(6 + (NP × 2))** pontos de dano adicional.

No início do seu turno durante um conflito, você pode escolher uma **categoria de arma** que não seja luta. Se fizer isso, seus ataques desarmados passam a pertencer a essa categoria:

- se escolher **arco, arma de fogo ou arremesso**, eles se tornam armas **à distância** em vez de corpo a corpo;
- se escolher **adaga ou espada**, eles não podem ser usados com Corte Triplo (Atlas High Fantasy, página 154).

As mudanças duram até o início do seu próximo turno.`,
  ),

  skill(
    CLASS,
    'Biofagia',
    155,
    4,
    'Em crise, depois que um ataque ou feitiço ofensivo seu fizer inimigos perderem PV, recupera NP × 5 PV.',
    `Se estiver **em crise**, você pode recuperar **(NP × 5)** PV depois que um dos seus ataques ou feitiços ofensivos fizer um ou mais inimigos perderem PV.`,
  ),

  skill(
    CLASS,
    'Ecdise',
    155,
    1,
    'Depois de perder PV por dano que não seja físico, gaste 10 PV para ganhar Resistência a esse tipo até usar o poder de novo.',
    `Depois de perder PV ao sofrer dano, se o dano for de um tipo que **não seja físico**, você pode gastar **10 PV** para receber **Resistência** ao tipo do dano sofrido, até usar este poder novamente.`,
  ),

  skill(
    CLASS,
    'Genoclepse',
    155,
    2,
    'Ao causar dano a NPCs, descobre a espécie deles; o Mestre escolhe NP terioformas que os reflitam e, com Teriomorfose, você pode pagar o PV e usá-las mesmo sem tê-las aprendido.',
    `Quando causar dano a um ou mais NPCs, você pode descobrir a **espécie** deles.

O Mestre também deve escolher **(NP)** terioformas que reflitam esses NPCs (veja as sugestões no corpo da classe [[mutante]]). Se você tiver [[teriomorfose]], pode pagar na hora o custo em PV daquele poder para usá-lo e manifestar essas terioformas, mesmo que não estejam entre as que aprendeu.`,
  ),

  skill(
    CLASS,
    'Teriomorfose',
    155,
    6,
    'Cada nível ensina uma terioforma. Por uma ação e um terço dos PV atuais (arredondado para baixo), manifesta os efeitos de até duas terioformas que conheça.',
    `Sempre que adquirir este poder, você aprende uma **terioforma**.

Você pode usar uma ação e gastar **um terço dos seus PV atuais** (arredondado para baixo) para manifestar os efeitos de **até duas** terioformas dentre as que aprendeu. Duração e detalhes das terioformas estão no corpo da classe [[mutante]].`,
  ),
];
