import { SeedEntry } from '../../types';
import {
  artifact,
  rareAccessory,
  rareArmor,
  rareShield,
  rareWeapon,
} from '../rare-helpers';

const B = 'high-fantasy' as const;

export const itensRarosHighFantasy: SeedEntry[] = [
  // Armas raras (pp. 78-79)
  rareWeapon(B, {
    name: 'Emissária da Justiça',
    page: 78,
    cost: 600,
    category: 'luta',
    accuracy: 'DES + VIG',
    accuracyBonus: 1,
    damage: 6,
    damageType: 'físico',
    hands: 1,
    range: 'melee',
    effect:
      'Ao usar Provocar contra uma criatura com mais PV que você, conta como sucesso automático (sem teste).',
  }),
  rareWeapon(B, {
    name: 'Arcanos Maiores',
    page: 78,
    cost: 900,
    category: 'arremessavel',
    accuracy: 'DES + AST',
    damage: 4,
    damageType: 'físico',
    hands: 1,
    range: 'ranged',
    effect:
      'Enquanto estiver fundido a um Arcano, seus testes de Precisão com esta arma têm sucesso crítico se os dois dados saírem iguais (e não for falha crítica).',
  }),
  rareWeapon(B, {
    name: 'Midas',
    page: 78,
    cost: 900,
    category: 'adaga',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 4,
    damageType: 'trevas',
    hands: 1,
    range: 'melee',
    effect:
      'Ao usar Roubo de Alma com sucesso contra criatura de patente elite ou campeão, o tesouro de alma obtido vale 100 zênites a mais.',
  }),
  rareWeapon(B, {
    name: 'Rabo de Quimera',
    page: 78,
    cost: 900,
    category: 'malho',
    accuracy: 'DES + DES',
    damage: 12,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Seus ataques com ela causam 1 de dano adicional por espécie diferente de que você aprendeu feitiços de quimerista (feitiços esquecidos não contam).',
  }),
  rareWeapon(B, {
    name: 'Aquiles',
    page: 78,
    cost: 1000,
    category: 'lanca',
    accuracy: 'DES + VIG',
    damage: 12,
    damageType: 'físico',
    hands: 1,
    range: 'melee',
    martial: true,
    effect:
      'Enquanto seus PV atuais forem iguais ou maiores que seus PV máximos, você é imune a todas as condições.',
  }),
  rareWeapon(B, {
    name: 'Bestiário',
    page: 78,
    cost: 1200,
    category: 'arcana',
    accuracy: 'AST + AST',
    damage: 6,
    damageType: 'luz',
    hands: 2,
    range: 'melee',
    effect:
      'Bônus de +2 em testes de Magia que atinjam a Defesa Mágica de criaturas das quais você conhece dois ou mais Traços; vale também em testes opostos contra elas.',
  }),
  rareWeapon(B, {
    name: 'Chiaroscuro',
    page: 78,
    cost: 1200,
    category: 'arcana',
    accuracy: 'AST + VON',
    damage: 10,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Ao aplicar um símbolo em criaturas, escolha: cada uma recupera 5 PV, ou cada uma perde 5 PV.',
  }),
  rareWeapon(B, {
    name: 'Fio Flutuante',
    page: 79,
    cost: 1200,
    category: 'espada',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 10,
    damageType: 'ar',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Todo dano de feitiços seus com custo total de PM de 20 ou menos ignora Imunidades e Resistências.',
  }),
  rareWeapon(B, {
    name: 'Heavy Metal',
    page: 79,
    cost: 1200,
    category: 'pesada',
    accuracy: 'VIG + VIG',
    damage: 14,
    damageType: 'raio',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Ao atacar com ela usando Vibrato, todo o dano do ataque passa a ser do tipo da escala do último verso cantado.',
  }),
  rareWeapon(B, {
    name: 'Valsa Sombria',
    page: 79,
    cost: 1200,
    category: 'lanca',
    accuracy: 'DES + VIG',
    damage: 12,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Depois de reduzir uma criatura a 0 PV com ela, você pode apresentar uma dança instantânea que aprendeu; o custo em PM dessa dança nunca fica abaixo de 10.',
  }),
  rareWeapon(B, {
    name: 'Tametomo',
    page: 79,
    cost: 1500,
    category: 'arco',
    accuracy: 'DES + DES',
    damage: 12,
    damageType: 'gelo',
    hands: 2,
    range: 'ranged',
    martial: true,
    effect:
      'Seus ataques com ela causam 5 de dano adicional a criaturas lentas ou abaladas.',
  }),
  rareWeapon(B, {
    name: 'Noite Eterna',
    page: 79,
    cost: 1800,
    category: 'arco',
    accuracy: 'DES + DES',
    damage: 8,
    damageType: 'trevas',
    hands: 2,
    range: 'ranged',
    martial: true,
    effect:
      'Se você estiver em crise e for alvo de um feitiço ofensivo, quem o lança deve gastar PV em vez de PM.',
  }),
  rareWeapon(B, {
    name: 'Ultimato',
    page: 79,
    cost: 1800,
    category: 'fogo',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 12,
    damageType: 'terra',
    hands: 1,
    range: 'ranged',
    martial: true,
    effect:
      'Se você for alvo de um feitiço ofensivo, quem o lança deve gastar 5 PM a mais; do contrário, você não pode ser alvo.',
  }),
  rareWeapon(B, {
    name: 'Vingador',
    page: 79,
    cost: 2000,
    category: 'pesada',
    accuracy: 'VIG + VIG',
    damage: 14,
    damageType: 'fogo',
    hands: 1,
    range: 'melee',
    martial: true,
    effect:
      'Quando uma criatura aplica uma condição a você, ela sofre a mesma condição na hora (não funciona se você for imune ou já a sofria).',
  }),

  // Armaduras raras (p. 80)
  rareArmor(B, {
    name: 'Vestido de Dança',
    page: 80,
    cost: 1000,
    defense: 'dado de DES',
    magicDefense: 'dado de AST +2',
    initiative: -1,
    effect:
      'Ao apresentar uma dança que dura até o início do próximo turno, você se recupera de uma condição à sua escolha.',
  }),
  rareArmor(B, {
    name: 'Traje Elemental',
    page: 80,
    cost: 1800,
    defense: 'dado de DES +1',
    magicDefense: 'dado de AST +1',
    initiative: -2,
    effect:
      'Em crise, feitiços seus que causem dano de ar, fogo, raio, gelo ou terra causam 5 de dano adicional.',
  }),
  rareArmor(B, {
    name: 'Oricalco',
    page: 80,
    cost: 2500,
    defense: '12',
    magicDefense: 'dado de AST',
    initiative: -4,
    martial: true,
    effect:
      'Seus PV máximos aumentam em 10 enquanto a usa. Não pode ser destruída.',
  }),

  // Escudos raros (p. 80)
  rareShield(B, {
    name: 'Escudo-mochila',
    page: 80,
    cost: 1000,
    defense: '+2',
    effect:
      'Quando um poder faz você recuperar Pontos de Inventário, você recupera 1 PI a mais.',
  }),
  rareShield(B, {
    name: 'Escudo Percussivo',
    page: 80,
    cost: 1700,
    defense: '+2',
    effect:
      'Se tiver o poder Harmonia, seu NP nele conta como 2 níveis maior (máximo NP 5).',
  }),
  rareShield(B, {
    name: 'Argus',
    page: 80,
    cost: 2000,
    defense: '+2',
    magicDefense: '+2',
    martial: true,
    effect:
      'Ao usar Roque do Rei e Decreto do Bispo, escolha uma criatura que você veja para não sofrer os efeitos.',
  }),
  rareShield(B, {
    name: 'Escudo Laminado',
    page: 80,
    cost: 2000,
    defense: '+2',
    magicDefense: '+2',
    martial: true,
    effect:
      'Ao atacar com espada, lança ou arma pesada, se o ataque tiver a propriedade multi, ele causa 5 de dano adicional.',
  }),
  rareShield(B, {
    name: 'Escudo do Aparo',
    page: 80,
    cost: 2500,
    defense: '+2',
    magicDefense: '+2',
    martial: true,
    effect:
      'Se tiver Contra-ataque, ele também dispara quando o resultado do teste de Precisão inimigo for ímpar.',
  }),

  // Acessórios raros (p. 81)
  rareAccessory(B, {
    name: 'Anel da Negação',
    page: 81,
    cost: 600,
    effect:
      'Ao lançar Dissipar, o custo em PM vira "10 × A" e o alvo vira "até três criaturas".',
  }),
  rareAccessory(B, {
    name: 'Anel do Ocultista',
    page: 81,
    cost: 600,
    effect:
      'Feitiços seus com alvo "até três criaturas" passam a "até quatro" (você ainda paga o PM do quarto alvo).',
  }),
  rareAccessory(B, {
    name: 'Anel de Marfim',
    page: 81,
    cost: 700,
    effect:
      'Quando seu Companheiro Fiel perder PV, você pode perder a mesma quantidade de PV no lugar dele.',
  }),
  rareAccessory(B, {
    name: 'Paleta Mágica',
    page: 81,
    cost: 700,
    effect:
      'Dano que você causa a uma criatura com um símbolo seu ignora Resistências.',
  }),
  rareAccessory(B, {
    name: 'Diadema do Estrategista',
    page: 81,
    cost: 800,
    effect:
      'Quando um aliado age logo após o seu turno na mesma rodada (por Carruagem Devastadora, Dança do Ouroboros ou Tempo Roubado), ele recupera 5 PM no início do turno dele.',
  }),
  rareAccessory(B, {
    name: 'Bolsa de Alquimia',
    page: 81,
    cost: 1000,
    effect:
      'Ao fabricar uma poção com Engenhocas (Alquimia), você pode rolar 1d20 adicional.',
  }),
  rareAccessory(B, {
    name: 'Pingente de Feitiçaria',
    page: 81,
    cost: 1200,
    effect:
      'Se tiver Golpe Baixo, o dano adicional dele também vale para feitiços ofensivos de alvo único, se o alvo sofrer ao menos uma condição.',
  }),
  rareAccessory(B, {
    name: 'Fita de Dança',
    page: 81,
    cost: 2000,
    effect:
      'Enquanto equipada, seu dado de Destreza sobe um passo (máximo d12).',
  }),

  // Artefatos (pp. 83-87)
  artifact(B, {
    name: 'Armadura da Supremacia',
    page: 83,
    summary:
      'Armadura negra com cabeça de dragão senciente. Após o vínculo, o portador usa uma ação para causar dano forte de fogo a um alvo, ignorando Imunidades e Resistências. Dizem ter sido forjada no Vulcão Negro, onde uma fortaleza selada esconde seu verdadeiro poder.',
  }),
  artifact(B, {
    name: 'Braçadeira Quebra-Tempo',
    page: 83,
    summary:
      'Por uma ação, cria uma esfera em volta de até duas criaturas próximas (uma é o usuário) e o tempo fora dela para por alguns segundos: tempo para um teste ou uma ação de cada criatura no conflito. Cada uso reduz permanentemente PV e PM máximos do usuário em 5, e o artefato só pode ser usado de novo na cena seguinte.',
  }),
  artifact(B, {
    name: 'Cálice da Juventude',
    page: 83,
    summary:
      'Quem bebe rejuvenesce à sua forma ideal por alguns dias, mas cada uso muda sutilmente a personalidade, pois as emoções são absorvidas pela joia vermelha. Só os mais jovens são imunes.',
  }),
  artifact(B, {
    name: 'Chave do Leão Vermelho',
    page: 84,
    summary:
      'Abre qualquer fechadura; a porta leva a um salão seguro cercado de portas, onde servos invisíveis alimentam e curam. Só se sai abrindo outra porta com a chave (um ritual de entropia sem PM, de ND conforme o destino é escondido ou conhecido). Itens deixados no salão somem.',
  }),
  artifact(B, {
    name: 'Coração de Behemoth',
    page: 84,
    summary:
      'Coração do dragão Behemoth, que se sacrificou na Guerra Celestial. Quem receber a aprovação do espírito ligado a ele ganha a habilidade de virar dragão e o respeito do povo dracônico.',
  }),
  artifact(B, {
    name: 'Emarillion',
    page: 84,
    summary:
      'Tomo que descreve todos os eventos do universo, onde e quando ocorreram, mas escolhe quem pode lê-lo e poucos compreendem mais que um ou dois parágrafos.',
  }),
  artifact(B, {
    name: 'Espelho das Aparências',
    page: 85,
    summary:
      'Espelho portátil que permite mudar livremente a aparência para ficar idêntico a outra pessoa. Sumiu dos registros há séculos, e dizem que causou mais guerras que hordas de demônios.',
  }),
  artifact(B, {
    name: 'Lanterna da Descoberta',
    page: 85,
    summary:
      'Lanterna de chama inextinguível: qualquer texto ou glifo iluminado por ela é compreendido (basta tocá-la para a tradução surgir em chamas), revelando verdades que levaram pessoas a decisões terríveis.',
  }),
  artifact(B, {
    name: 'Óculos Perfuralma',
    page: 85,
    summary:
      'Com a ação Poder, o usuário olha uma criatura viva e descobre tudo sobre ela (habilidades, história, objetivos, segredos); o Mestre deve mostrar a ficha de NPC completa. Cada uso deixa uma presença alienígena no reflexo das lentes estender seus pensamentos ao mundo.',
  }),
  artifact(B, {
    name: 'Olho do Despertar',
    page: 86,
    summary:
      'Joia que se prende à testa do portador como terceiro olho e dá acesso a memórias ocultas: equivale a um ritual de espiritualismo de poder extremo, que concede um poder heroico entre os disponíveis para as classes que ele já domina.',
  }),
  artifact(B, {
    name: 'Pedras Elementais',
    page: 86,
    summary:
      'Quatro pedras (água, fogo, terra, ar) que permitem rituais de elementalismo do elemento correspondente sem PM e sem teste de Magia. Encaixadas entre si, dão acesso a um Quinto Elemento ainda desconhecido.',
  }),
  artifact(B, {
    name: 'Tiara do Controle',
    page: 86,
    summary:
      'Tiara que permite controlar a mente de seres vivos, mas abriga um deus tirano que, após vários usos, pode substituir a consciência do usuário e aprisionar a alma dele numa joia.',
  }),
  artifact(B, {
    name: 'Varinha do Tempo',
    page: 87,
    summary:
      'Move o alvo (objeto ou ser vivo) através do tempo sem mudar a posição: equivale a um ritual de entropismo de potência extrema e área grande, sem PM, mas com teste de Magia normal. Em seres vivos, o efeito some após um dia.',
  }),
  artifact(B, {
    name: 'Vinho da Melancolia',
    page: 87,
    summary:
      'Bebida que dissolve para sempre a alma de quem a bebe; o líquido se afasta de quem não quer bebê-lo. Dizem que quem sobreviver à agonia viraria quase um deus, imune à dor e ao peso das emoções, mas em quinhentos anos ninguém sobreviveu.',
  }),
  artifact(B, {
    name: 'Xadrez de Oricalco',
    page: 87,
    summary:
      'Tabuleiro com seis peças de oricalco. Ao conectar sua essência a ele por um ritual de ritualismo (área individual, potência extrema), o usuário põe uma peça no tabuleiro e ela vira uma criatura serva; ninguém invocou mais de uma por vez. Só se conhecem o cavalo (combatente ágil e feroz) e a dama (bruxa poderosa).',
  }),
];
