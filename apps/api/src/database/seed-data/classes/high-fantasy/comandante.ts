import { classEntry, skill } from '../../helpers';
import { SeedEntry } from '../../types';

const CLASS = 'Comandante';

export const comandante: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 136,
    summary:
      'Líder inspirador que comanda aliados no campo de batalha: faz companheiros atacarem fora do turno, dobra custos, bloqueia recuperação e usa gambitos de xadrez.',
    body: `Comandantes são líderes e figuras inspiradoras. Alguns têm sangue nobre, mas a maioria mereceu a lealdade dos companheiros no campo de batalha, onde sua vontade de ferro e seus talentos táticos foram postos à prova.

Não pense só no cavaleiro de armadura reluzente: líderes bandidos, nobres em desgraça e estudiosos de estratégia também são bons Comandantes.

## Para pensar no personagem

- Você tem sangue nobre? Ou é um herói de origem humilde?
- Você busca a batalha ou faz o possível para evitá-la?
- Existe algum sacrifício que você jamais faria pela vitória?
- Como suas habilidades se manifestam? Elas são visivelmente sobrenaturais?`,
    otherNames: ['Príncipe', 'Rainha', 'Shôgun'],
    quote: 'Não há vitoriosos em uma guerra.',
    traits: ['hp', 'melee-weapon', 'ranged-weapon'],
    freeBenefits: [
      'Aumenta permanentemente seus PV máximos em 5.',
      'Pode equipar armas corpo a corpo e armas à distância marciais.',
    ],
  }),

  skill(
    CLASS,
    'Carga de Cavalaria',
    137,
    5,
    'Em conflito, por uma ação e 10 PM, um aliado que ouça você faz um ataque livre com bônus de Precisão igual ao NP, mas com RA 0 no dano.',
    `Em um conflito, você pode usar uma ação e gastar **10 PM** para escolher um aliado que possa ouvi-lo. Esse aliado faz imediatamente um **ataque livre** com uma arma equipada (ou um ataque básico, se for um NPC).

Ele recebe um bônus no teste de Precisão igual ao seu **(NP)**, mas considera sua RA como **0** ao calcular o dano desse ataque.`,
  ),

  skill(
    CLASS,
    'Carruagem Devastadora',
    137,
    1,
    'Depois de usar Decreto do Bispo, Carga de Cavalaria ou Roque do Rei, escolha um PJ que ainda não agiu na rodada: o turno dele vem logo após o seu.',
    `Depois de usar [[decreto-do-bispo]], [[carga-de-cavalaria]] ou [[roque-do-rei]], você pode escolher outro **PJ** que possa ouvi-lo e que ainda não tenha tido o turno nesta rodada.

O turno desse personagem acontece **imediatamente após o seu** nesta rodada.`,
  ),

  skill(
    CLASS,
    'Decreto do Bispo',
    137,
    5,
    'Em conflito, por uma ação e 10 PM, escolha: todos os custos em PM dobram, ou todas as fontes de dano causam NP × 3 de dano adicional.',
    `Em um conflito, você pode usar uma ação e gastar **10 PM** para escolher um efeito:

- todos os custos em PM são **dobrados**; **ou**
- todas as fontes de dano causam **(NP × 3)** de dano adicional.`,
  ),

  skill(
    CLASS,
    'Gambito da Dama',
    137,
    6,
    'Por uma ação, faz um ataque livre com RA 0; depois usa de graça Decreto, Carga ou Roque, ou um aliado recupera 5 + NP × 5 PV.',
    `Em um conflito, você pode usar uma ação para fazer um **ataque livre** com uma arma equipada, considerando sua RA como **0** ao calcular o dano.

Depois que o ataque for resolvido, escolha um efeito:

- você usa imediatamente um poder que possua entre [[decreto-do-bispo]], [[carga-de-cavalaria]] ou [[roque-do-rei]], sem gastar uma ação (mas paga o PM apropriado); **ou**
- um aliado que possa ouvi-lo recupera **(5 + (NP × 5))** PV.`,
  ),

  skill(
    CLASS,
    'Roque do Rei',
    137,
    4,
    'Em conflito, por uma ação e 10 PM, escolha: ninguém pode recuperar PV ou PM, ou efeitos que restauram PM restauram NP × 5 PM a mais. Dura até o início do seu próximo turno.',
    `Em um conflito, você pode usar uma ação e gastar **10 PM** para escolher um efeito:

- nenhuma criatura pode recuperar PV ou PM; **ou**
- todos os efeitos que restauram PM restauram **(NP × 5)** PM adicionais.

O efeito escolhido dura até o início do seu próximo turno.`,
  ),
];
