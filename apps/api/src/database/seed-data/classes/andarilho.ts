import { classEntry, skill } from '../helpers';
import { SeedEntry } from '../types';

const CLASS = 'Andarilho';

export const andarilho: SeedEntry[] = [
  classEntry({
    name: CLASS,
    page: 176,
    summary:
      'Viajante que vive pela jornada: explora ermos, aprende com cada lugar e vê na natureza uma professora severa, não uma inimiga nem uma aliada.',
    body: `Nômades à procura de um continente mitológico, exploradores dos ermos, caçadores e viajantes têm algo em comum: são andarilhos. A maioria dos heróis viaja durante as aventuras, mas Andarilhos **vivem pela jornada**, sempre dispostos a visitar novos lugares e aprender com os outros.

Para um Andarilho, a natureza não é inimiga nem aliada: é uma professora severa, capaz de revelar muitas verdades esquecidas.

## Para pensar no personagem

- O que motiva você a viver viajando? Foi escolha sua? Você se cansou?
- Há um lugar que você considera um "lar"?
- Você visitou muitas pessoas e lugares. Tem algo que não consegue esquecer?
- Você perdeu algo ou alguém por causa das suas viagens. O que aconteceu?`,
    otherNames: ['Aventureiro', 'Caçador de Tesouros', 'Explorador'],
    quote: 'Fronteiras são um truque da mente.',
    freeBenefits: ['Aumenta permanentemente seus PI máximos em 2.'],
  }),

  skill(
    CLASS,
    'Caçador de Tesouros',
    177,
    2,
    'Quando o grupo viaja pelo mapa do mundo, você faz uma descoberta se tirar (NP + 1) ou menos no teste de Viagem, em vez de apenas 1.',
  ),

  skill(
    CLASS,
    'Companheiro Fiel',
    177,
    5,
    'Com a ajuda do grupo, você cria um NPC de nível 5 (construto, elemental, fera ou planta) como companheiro; ele só age quando você gasta sua ação para isso.',
    `Com a ajuda do grupo, crie um NPC (veja a página 302) **construto**, **elemental**, **fera** ou **planta** de **nível 5** para ser seu companheiro.

## O companheiro

- Não tem iniciativa e não sobe de nível.
- Pode ter no máximo **dois ataques básicos**.
- Recebe um bônus em testes de Precisão e Magia igual ao **(NP)**.
- Seus PV máximos são **((NP × o dado básico de Vigor do companheiro) + metade do seu nível)**.

## Como ele age

- Você pode gastar sua **ação** para fazê-lo realizar uma ação no seu turno (uma vez por turno). Ele não age de nenhuma outra forma.
- Se ele for afetado por efeitos de turno (página 77), é afetado no **seu** turno.
- Ele entra e sai de cena com você e recebe os mesmos benefícios de descanso.
- Se ficar com 0 PV, ele foge e reencontra você no início da próxima cena em que você estiver, reaparecendo com **metade dos PV máximos**.`,
  ),

  skill(
    CLASS,
    'Papo de Taverna',
    177,
    3,
    'Ao descansar em uma estalagem ou taverna, você faz (NP) perguntas ao Mestre sobre os arredores e os habitantes; as respostas são verdadeiras, mas você descreve como obteve a informação.',
  ),

  skill(
    CLASS,
    'Prático',
    177,
    4,
    'Você recupera (NP) PI após cada teste de Viagem (veja a página 106).',
  ),

  skill(
    CLASS,
    'Viajante Experiente',
    177,
    1,
    'Você reduz em um o dado rolado nos seus testes de Viagem (mínimo d6). Se mais de um personagem tiver este Poder, os efeitos não se acumulam.',
  ),
];
