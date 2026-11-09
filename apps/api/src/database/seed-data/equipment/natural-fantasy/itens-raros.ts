import { SeedEntry } from '../../types';
import {
  artifact,
  rareAccessory,
  rareArmor,
  rareShield,
  rareWeapon,
} from '../rare-helpers';

const B = 'natural-fantasy' as const;

export const itensRarosNaturalFantasy: SeedEntry[] = [
  // Armas raras (pp. 84-85)
  rareWeapon(B, {
    name: 'Concha',
    page: 84,
    cost: 500,
    category: 'arremessavel',
    accuracy: 'DES + AST',
    damage: 8,
    damageType: 'físico',
    hands: 1,
    range: 'ranged',
    effect:
      'Se tiver o poder Feito com Amor, seu NP nele conta como 1 ponto maior (máximo NP 4).',
  }),
  rareWeapon(B, {
    name: 'Câmera Obscura',
    page: 84,
    cost: 600,
    category: 'arcana',
    accuracy: 'AST + AST',
    damage: 6,
    damageType: 'trevas',
    hands: 2,
    range: 'melee',
    effect:
      'Ao rolar 13 ou mais num teste para examinar inimigos que você veja, tendo Imitação Mágica, escolha um deles: se ele souber feitiços, você pode aprender um como se fosse feitiço de quimerista.',
  }),
  rareWeapon(B, {
    name: 'Memorialis',
    page: 84,
    cost: 700,
    category: 'lanca',
    accuracy: 'DES + VIG',
    accuracyBonus: 1,
    damage: 12,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect: 'Ao usar Cascata, você recupera 5 PM.',
  }),
  rareWeapon(B, {
    name: 'Leque das Chamas',
    page: 84,
    cost: 800,
    category: 'luta',
    accuracy: 'DES + VIG',
    accuracyBonus: 1,
    damage: 6,
    damageType: 'fogo',
    hands: 1,
    range: 'melee',
    effect:
      'Invocações suas com duas ou mais criaturas como alvo causam dano adicional igual ao seu NP em Invocações Conectadas.',
  }),
  rareWeapon(B, {
    name: 'Garrucha',
    page: 84,
    cost: 800,
    category: 'fogo',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 8,
    damageType: 'físico',
    hands: 1,
    range: 'ranged',
    effect:
      'O primeiro ataque com ela em cada cena causa 5 de dano adicional. Apesar de baseada na pistola, não é marcial.',
  }),
  rareWeapon(B, {
    name: 'Balança de Bronze',
    page: 84,
    cost: 900,
    category: 'arcana',
    accuracy: 'AST + AST',
    damage: 6,
    damageType: 'terra',
    hands: 2,
    range: 'melee',
    effect:
      'Depois de um teste de Magia, se um dos dados for múltiplo do outro, você recupera PI igual à metade do seu NP em Ventos do Comércio.',
  }),
  rareWeapon(B, {
    name: 'Garfo Gigante',
    page: 84,
    cost: 1000,
    category: 'lanca',
    accuracy: 'DES + VIG',
    damage: 16,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Ao usar com Garfo e Faca, você pode somar sua RA ao dano (não precisa considerá-la 0).',
  }),
  rareWeapon(B, {
    name: 'Osso de Víbora',
    page: 85,
    cost: 1200,
    category: 'adaga',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 8,
    damageType: 'veneno',
    hands: 1,
    range: 'melee',
    effect:
      'Ataques com ela causam 5 de dano adicional desde que não seja o seu turno.',
  }),
  rareWeapon(B, {
    name: 'Espremedor Estival',
    page: 85,
    cost: 1300,
    category: 'pesada',
    accuracy: 'VIG + VIG',
    damage: 18,
    damageType: 'gelo',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Ao atingir só uma criatura da espécie planta, o ataque causa 10 de dano adicional. Se ela ficar em crise, você e os aliados que o vejam recuperam PM igual à sua RA no teste de Precisão.',
  }),
  rareWeapon(B, {
    name: 'Norimitsu',
    page: 85,
    cost: 1400,
    category: 'espada',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 14,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Ataques com ela causam 6 de dano adicional a inimigos de patente elite ou campeão.',
  }),
  rareWeapon(B, {
    name: 'Barril',
    page: 85,
    cost: 1500,
    category: 'pesada',
    accuracy: 'VIG + VIG',
    damage: 18,
    damageType: 'físico',
    hands: 2,
    range: 'melee',
    martial: true,
    effect:
      'Ao acertar criaturas, você pode gastar 1 Ponto de Comércio: o ataque causa dano adicional igual a 5 × seu NP em Estoque Pessoal.',
  }),
  rareWeapon(B, {
    name: 'Cajado Cata-vento',
    page: 85,
    cost: 1600,
    category: 'arcana',
    accuracy: 'VON + VON',
    damage: 6,
    damageType: 'ar',
    hands: 2,
    range: 'melee',
    effect:
      'Feitiços ou invocações suas que causem dano de ar causam 10 de dano adicional.',
  }),
  rareWeapon(B, {
    name: 'Caçador Voltaico',
    page: 85,
    cost: 1600,
    category: 'fogo',
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 16,
    damageType: 'raio',
    hands: 2,
    range: 'ranged',
    martial: true,
    effect:
      'Depois que ela causar dano, se ao menos uma criatura atingida for Vulnerável a raio, você causa 10 de dano de raio a cada inimigo que veja.',
  }),
  rareWeapon(B, {
    name: 'Hirundo',
    page: 85,
    cost: 1800,
    category: 'arco',
    accuracy: 'DES + DES',
    damage: 12,
    damageType: 'luz',
    hands: 2,
    range: 'ranged',
    martial: true,
    effect:
      'Depois de usar e resolver Encorajar, você pode fazer um ataque livre com ela, com RA 0 no dano.',
  }),

  // Armaduras raras (p. 86)
  rareArmor(B, {
    name: 'Couraça de Lã',
    page: 86,
    cost: 800,
    defense: '11',
    magicDefense: 'dado de AST',
    initiative: -3,
    martial: true,
    effect:
      'Fora de crise, você tem Resistência a dano de gelo e Imunidade à condição fraco.',
  }),
  rareArmor(B, {
    name: 'Jaqueta de Técnico',
    page: 86,
    cost: 1000,
    defense: 'dado de DES +1',
    magicDefense: 'dado de AST +1',
    initiative: -1,
    effect:
      'Ao usar um fragmento elemental, você pode causar o dano dele em até três criaturas que veja; além disso, o dano de fragmento elemental causa 5 a mais.',
  }),
  rareArmor(B, {
    name: 'Traje Nobre',
    page: 86,
    cost: 1600,
    defense: 'dado de DES +1',
    magicDefense: 'dado de AST +1',
    initiative: 0,
    effect:
      'Quando um aliado que o veja faz você recuperar PV, se você estiver em crise, esse aliado também recupera 5 PM.',
  }),
  rareArmor(B, {
    name: 'Trajes de Boticário',
    page: 86,
    cost: 1800,
    defense: 'dado de DES +1',
    magicDefense: 'dado de AST +2',
    initiative: -2,
    effect:
      'Ao usar Chuva de Poções, o efeito de restauração não é dividido pela metade.',
  }),
  rareArmor(B, {
    name: 'Túnica Feérica',
    page: 86,
    cost: 2000,
    defense: 'dado de DES +1',
    magicDefense: 'dado de AST +2',
    initiative: -2,
    effect:
      'Enquanto estiver sob feitiço com duração "Cena", sua Defesa Mágica aumenta em +2.',
  }),

  // Escudos raros (p. 86)
  rareShield(B, {
    name: 'Manica de Placas',
    page: 86,
    cost: 800,
    defense: '+2',
    effect:
      'Sem armadura marcial nem outro escudo, você pode usar os efeitos de Esquiva.',
  }),
  rareShield(B, {
    name: 'Escudo-tampa',
    page: 86,
    cost: 1500,
    defense: '+2',
    magicDefense: '+2',
    martial: true,
    effect: 'Ao causar dano com uma iguaria, você causa 5 de dano adicional.',
  }),
  rareShield(B, {
    name: 'Braçadeira-lírio',
    page: 86,
    cost: 2000,
    defense: '+2',
    magicDefense: '+2',
    martial: true,
    effect:
      'Se tiver Jardinagem Marcial (o texto do item a chama de "Jardinagem de Combate"), você pode usá-la para plantar uma magissemente com Enxerto.',
  }),

  // Acessórios raros (p. 87)
  rareAccessory(B, {
    name: 'Regador',
    page: 87,
    cost: 500,
    effect:
      'Ao fazer uma invocação de água, você pode preencher 1 seção do relógio de germinação de um PJ que veja.',
  }),
  rareAccessory(B, {
    name: 'Pimenta em Pó',
    page: 87,
    cost: 600,
    effect:
      'Ao causar dano com iguaria ou poção, você pode mudar o tipo do dano para fogo (isso também vale para o dano de Data de Validade).',
  }),
  rareAccessory(B, {
    name: 'Obi de Dente-de-leão',
    page: 87,
    cost: 700,
    effect:
      'Ao fazer uma invocação de ar, você pode se recuperar de uma condição à sua escolha.',
  }),
  rareAccessory(B, {
    name: 'Coração Mecânico',
    page: 87,
    cost: 800,
    effect:
      'Você é Resistente a dano de raio e fogo. Ao entrar em crise, o acessório perde os efeitos até o próximo descanso.',
  }),
  rareAccessory(B, {
    name: 'Manto de Sapo Venenoso',
    page: 87,
    cost: 900,
    effect:
      'Quando você causa dano de veneno em conflito, cada criatura que perder PV assim não pode recuperar PV até o início do seu próximo turno.',
  }),
  rareAccessory(B, {
    name: 'Cachecol Artesanal',
    page: 87,
    cost: 1000,
    effect:
      'Ao receber Pontos de Comércio com Verdadeiro Tesouro, você também recebe 1 Ponto de Fabula.',
  }),
  rareAccessory(B, {
    name: 'Amuleto da Folha Caída',
    page: 87,
    cost: 1500,
    effect:
      'Ao usar Árvore da Vida em crise, escolha um aliado que veja, também em crise: você e ele se beneficiam da recuperação de PV do poder.',
  }),
  rareAccessory(B, {
    name: 'Livro de Receitas dos Excêntricos',
    page: 87,
    cost: 1600,
    effect:
      'Uma vez por descanso, escolha uma combinação de dois sabores cujo efeito já descobriu e role os dados de novo, substituindo o efeito anterior.',
  }),

  // Artefatos (pp. 89-93)
  artifact(B, {
    name: 'Chaves do Harmonista',
    page: 89,
    summary:
      'Chaveiro de prata com nove chaves inertes. Se um grupo corajoso e honesto refizer a antiga peregrinação, mostrando lealdade, os espíritos animais despertam e lutam como arcanos invocáveis por qualquer membro do grupo (um PJ por vez).',
  }),
  artifact(B, {
    name: 'Cálice Cardeal',
    page: 89,
    summary:
      'Cálice raso e congelante, preservado nas mãos de uma estátua no fundo do Abismo Norte. Sussurra promessas de controle sobre as forças elementais e do mundo, mas não responde o que a humanidade fará quando não tiver mais nada a temer a não ser a si mesma.',
  }),
  artifact(B, {
    name: 'Corda de Três Nós',
    page: 89,
    summary:
      'Corda naval mágica com a essência do vento. O primeiro nó desatado lança o feitiço Ventus sem custo de PM; o segundo permite um ritual de elementalismo do vento sem PM; o terceiro, raramente desatado, dá audiência com a Princesa do Vento. Só resta uma, e a arte de criá-las se perdeu.',
  }),
  artifact(B, {
    name: 'Crânio da Deusa Salamandra',
    page: 90,
    summary:
      'Fóssil imenso de crânio de salamandra, com dentes de topázio, que emite calor e alimenta chamas próximas. É o vínculo terreno do espírito dos Três Vulcões: se não for devolvido antes do próximo verão, Aquela-que-Destrói-a-Terra vagará pelo mundo à sua procura.',
  }),
  artifact(B, {
    name: 'Desforno',
    page: 90,
    summary:
      'Forno portátil que desfaz objetos complexos em materiais simples. Uma vez por descanso, você coloca um equipamento (acessório, arma, armadura ou escudo) nele e recebe dois materiais diferentes, de valor total igual ao do item destruído.',
  }),
  artifact(B, {
    name: 'Diário de Reidy',
    page: 90,
    summary:
      'Antologia de lendas, folclore e registros históricos. Uma vez por descanso, o grupo inicia ou continua uma pesquisa: o Mestre define um relógio de 4 a 10 seções (maior para informação mais obscura) e o grupo faz um teste em grupo de ND 10 para avançá-lo; ao completar, o Mestre dá uma resposta útil, confiável e precisa.',
  }),
  artifact(B, {
    name: 'Espelho Lunar',
    page: 91,
    summary:
      'Espelho de metal oxidado que reflete a luz da lua com intensidade. À noite, permite um ritual como se você tivesse Influência Verdejante, sem custo de PM, desde que o espelho reflita o luar sobre a planta. A luz pode causar vibrações imprevisíveis em máquinas e armaduras.',
  }),
  artifact(B, {
    name: 'Fragmento da Máscara Branca',
    page: 91,
    summary:
      'Metade de uma máscara de madeira com chifres, imbuída da coragem da escultora Aucanissa: nenhum morto-vivo, exceto vilões, pode ferir quem a usa.',
  }),
  artifact(B, {
    name: 'Lágrima de Resina',
    page: 91,
    summary:
      'Espada curva de âmbar que controla raios, de forma semelhante a um ritual de elementalismo, mas sem custo de PM. Foi esculpida com a resina de árvores derrubadas, e a linhagem de quem a empunhou foi amaldiçoada.',
  }),
  artifact(B, {
    name: 'Ocarina da Tranquilidade',
    page: 92,
    summary:
      'Instrumento feito do chifre de uma cabra montanhesa que partiu em paz. Nas mãos de quem tem boas intenções, a música alivia o medo e a fúria de feras, monstros e plantas (como um ritual de espiritualismo ou quimerismo, sem PM nem teste de Magia; em conflito, ainda é preciso preencher um relógio).',
  }),
  artifact(B, {
    name: 'Óleo Celeste',
    page: 92,
    summary:
      'Líquido verde e viscoso que cai de nuvens avermelhadas sobre o oceano: condutor elemental extraordinário que transforma tudo o que toca, comprimindo milênios de evolução em poucas horas e causando dor excruciante (como visto nas mutações dos aviocetae da Costa do Coral).',
  }),
  artifact(B, {
    name: 'Ovo de Illuyanka',
    page: 92,
    summary:
      'Ovo grande e pesado de casca listrada, provavelmente o último de uma criatura dracônica. Preservado por ascetas élficos do clã Capa Amarela, deve chocar quando surgir uma ameaça anunciada pela tradição oral deles.',
  }),
  artifact(B, {
    name: 'Selo do Segundo Sol',
    page: 93,
    summary:
      'Selo cilíndrico de lápis-lazúli com a inscrição "Nas mãos da Rainha do Inverno, um caminho se abre até o novo Sol". Ligado a estátuas femininas numa torre de pedra do arquipélago ao sul, da era imperial e da segunda era do gelo.',
  }),
  artifact(B, {
    name: 'Sineta do Refúgio',
    page: 93,
    summary:
      'Presente de uma silkie a quem a respeitou ou ajudou. Tocá-la faz surgir uma casa rústica, segura e protegida pela silkie, onde se descansa em completa segurança. Ao fim do descanso, role 1d6: com 1 ou 2, a silkie faz um pedido peculiar; se não for atendido, o artefato desaparece.',
  }),
  artifact(B, {
    name: 'Tomo do Meteoro',
    page: 93,
    summary:
      'Livro com descrições de máquinas improváveis, fórmulas e orações a entidades desconhecidas; a capa tem um mecanismo com ponteiros em forma de cometa que marca um calendário estranho. Eruditos o tratam como piada, mas os honestos temem que o mecanismo possa parar.',
  }),
];
