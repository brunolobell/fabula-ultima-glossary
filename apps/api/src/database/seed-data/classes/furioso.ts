import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Furioso';

export const furioso: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 200,
    summary:
      'Combatente que não sabe parar: enérgico, determinado e implacável, arrisca tudo pelos próprios ideais e deixa a ira empurrá-lo além do limite.',
    body: `Furiosos não sabem parar. Na guerra e na vida, são enérgicos, determinados e implacáveis; sejam quais forem seus ideais ou desejos, não param por nada e arriscam tudo para conquistá-los.

Alguns passam por treinamentos rígidos para controlar as emoções; outros veem o poder como a solução de todos os problemas e estão sempre prestes a deixar a ira dominá-los.

## Para pensar no personagem

- Você conta com a sua paixão ardente ou tenta mantê-la sob controle?
- Há sempre uma coisa específica que faz você perder a cabeça. O que é?
- No passado, seu descontrole teve consequências trágicas. O que você perdeu?
- Qual a aparência das suas armas e como é o seu estilo de luta?`,
    otherNames: ['Berserker', 'Lutador', 'Viking'],
    quote: 'Eu só preciso ficar mais forte que você!',
    traits: ['hp', 'melee-weapon', 'armor'],
    freeBenefits: [
      'Aumenta permanentemente seus PV máximos em 5.',
      'Pode equipar armas corpo a corpo e armaduras marciais.',
    ],
  }),

  skill(
    CLASS,
    'Adrenalina',
    201,
    5,
    'Enquanto você está em crise, causa (NP × 2) pontos de dano adicional, venha o dano de ataques, feitiços, Arcanos, itens ou qualquer outro meio.',
  ),

  skill(
    CLASS,
    'Espírito Indomável',
    201,
    4,
    'Ao gastar Pontos de Fabula, você recebe um benefício extra: recuperar (NP × 5) PV, recuperar (NP × 5) PM ou se curar de uma condição à sua escolha.',
    `Quando você gasta um ou mais [[pontos-de-fabula]], recebe um benefício adicional. Escolha um:

- você recupera **(NP × 5) PV**;
- você recupera **(NP × 5) PM**; ou
- você se recupera de **uma única condição** à sua escolha.`,
  ),

  skill(
    CLASS,
    'Frenesi',
    201,
    1,
    'Seus testes de Precisão com adaga, luta, malho e armas de arremesso contam como sucesso crítico se os dois dados mostrarem o mesmo número, qualquer que seja, desde que não seja falha crítica.',
  ),

  skill(
    CLASS,
    'Provocar',
    201,
    5,
    'Com uma ação e 5 PM, você faz um teste oposto de (VIG + VON) contra uma criatura que vê; se passar, ela fica enfurecida e é compelida a mirar você. Você ganha bônus de (NP) nesse teste.',
    `Você pode usar uma **ação** e **5 PM** para fazer um **teste oposto** de **(VIG + VON)** contra uma criatura que você veja. Descreva como você a provoca.

Se você passar, o alvo fica **enfurecido** e é **compelido a se concentrar em você**: deve fazer o possível para ter você como alvo de ataques e feitiços.

A compulsão termina se você ficar inconsciente ou deixar a cena, se a criatura deixar de ficar enfurecida, ou se ela for provocada por outra pessoa.

Você recebe um bônus igual a **(NP)** nos testes de (VIG + VON) feitos para este Poder.`,
  ),

  skill(
    CLASS,
    'Resistir',
    201,
    5,
    'Ao fazer a ação Guarda sem dar cobertura a outra criatura, você recupera PV igual a (NP × a maior força de Laço que tiver) e eleva um passo o dado de Vigor ou Vontade até o fim do próximo turno.',
    `Quando você faz a ação **Guarda** e escolhe **não** dar cobertura a outra criatura:

- você recupera PV igual a **(NP × a maior força de [[lacos]] que tiver)**; e
- escolha **Vigor** ou **Vontade**: até o fim do seu próximo turno, o dado atual desse Atributo é considerado **um passo maior** (máximo de d12).`,
  ),
];
