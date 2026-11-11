import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Mellow Court a Necrodragon: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1F: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Corte Mole',
    page: 192,
    summary:
      'Gosmas moles da Ilha Mole, mandadas por um Pwíncipe que ganhou poder sobre água e chuva de um cristal azul abissal; cada cena traz um cortejo diferente.',
    body: 'Antes uma comunidade acolhedora, a vila da Ilha Mole mudou muito quando um dos moradores tirou um estranho cristal azul dos destroços de um navio antigo. Brilhando com energia abissal, o cristal deu a essa gosma especialmente mandona poder sobre a água e as chuvas, e ele usou a magia para aumentar o corpo, proclamando-se Pwíncipe de todas as gosmas moles (pensou em “Rei”, mas era um pouco difícil de pronunciar). Agora ele obriga o resto da vila a obedecer a decretos sem sentido, mas é tão autocentrado que não percebe que os súditos estão mais do que fartos dele!\n\n## Táticas\n\nSe os heróis enfrentarem o Pwíncipe Mole em batalha, ele chama de imediato a corte para expulsar os intrusos! No início da cena de conflito, o Pwíncipe vem acompanhado de aliados em número igual a (número de Personagens Jogadores menos 1), sorteados entre bispos, cavalos, peões e torres moles. Esses aliados devem ser todos diferentes entre si (não pode haver dois peões, por exemplo).\n\nO Pwíncipe sempre age por último na rodada. Os demais agem em ordem fixa (todos os peões, depois todos os cavalos, depois todas as torres, depois todos os bispos; havendo duas ou mais criaturas do mesmo tipo, a de menos PV atuais age primeiro).\n\nRotina: Peões: Peonada (se um ou mais inimigos não estiverem atordoados, mirando um deles aleatoriamente) ou Golpe de Lâmina ➔ Cavalos: Relâmpago Wuuush ➔ Torres: Canhonada Gwandiosa (se não estiver desequilibrada) ou Balanço ➔ Bispos: Gelinho Fofo... (se puder) ou Cabeçada Gelada ➔ Pwíncipe Mole: Pegue-os, Pwi!! (se tiver 2 ou mais Pontos de Ultima e o total de aliados presentes na cena for igual ou menor que o número de Personagens Jogadores menos 2) ou Coreografia Molenga (se puder e um ou mais aliados estiverem em crise) ou Barrigada ↺',
  }),
  creature({
    name: 'Pwíncipe Mole',
    page: 195,
    summary:
      'Gosma mandona e covarde que se proclamou Pwíncipe: chama a corte, cura os aliados e fica imune a tudo enquanto guarda 3 Pontos de Ultima.',
    body: '**Abordagens favoráveis:** envenenado, fraco, dano sem tipo, perda de PV, perda de PM.\n\n**Abordagens desfavoráveis:** dano com tipo.',
    originalName: 'Mellow Pwihnce',
    groupSlug: 'corte-mole',
    level: 5,
    species: 'monster',
    rank: 'champion',
    championX: 1,
    role: 'support',
    flags: ['unique'],
    villain: true,
    traits: ['mandão', 'covarde', 'imponente', 'macio'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 50,
    crisis: 25,
    mp: 120,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {},
    attacks: [
      {
        name: 'Barrigada',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
      },
    ],
    spells: [
      {
        name: 'Coreografia Molenga',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Todo aliado que o Pwíncipe veja recupera 30 PV e se recupera de todas as condições.',
      },
    ],
    otherActions: [
      {
        name: 'Pegue-os, Pwi!!',
        effect:
          'O Pwíncipe pode usar uma ação e gastar 1 Ponto de Ultima para fazer dois novos aliados entrarem na cena no fim da rodada atual. Cada um é sorteado entre bispo, cavalo, peão e torre. Esta ação não pode criar duas criaturas idênticas (mas elas podem ser uma nova cópia de uma criatura já presente).',
      },
    ],
    specialRules: [
      {
        name: 'Nem Ligue pra Mim, Pwi!',
        effect:
          'O Pwíncipe sempre guarda o último Ponto de Ultima para fugir em segurança ao chegar a 0 PV, deixando a vila em desordem. Talvez ele deixe de ser Vilão e, como antagonista de alívio cômico, seja encontrado depois em apuros sérios; ou talvez evolua para algo bem menos engraçado e fofo.',
      },
      {
        name: 'Imunidade Pwolítica',
        effect:
          'Enquanto o Pwíncipe tiver 3 ou mais Pontos de Ultima, ele ganha Imunidade a todos os tipos de dano e é imune a todas as condições.',
      },
      {
        name: 'Pwatético!',
        effect:
          'Enquanto o total de aliados do Pwíncipe presentes na cena for igual ou maior que (metade do número de Personagens Jogadores, arredondada para baixo), os PV atuais do Pwíncipe não podem ser reduzidos abaixo de 1.',
      },
      {
        name: 'Pwincípios Tortos',
        effect:
          'Depois que o Pwíncipe falha em um teste resistido durante o turno de um inimigo, se a abordagem desse inimigo dependeu de etiqueta ou diplomacia e ele estiver sofrendo uma ou mais condições, o Pwíncipe pode gastar 30 PM para preencher ou apagar 1 seção de um Relógio à sua escolha.',
      },
    ],
  }),
  creature({
    name: 'Bispo Mole',
    page: 196,
    summary:
      'Gosma brilhante e minuciosa em forma de bispo: sopra frio em vários alvos e rouba PM de quem já está lento.',
    body: '**Abordagens favoráveis:** fogo, veneno, Resistência (gelo), envenenado, abalado, perda de PM.\n\n**Abordagens desfavoráveis:** ar, raio, gelo, atordoado, enfurecido.',
    originalName: 'Mellow Bishop',
    groupSlug: 'corte-mole',
    level: 30,
    species: 'monster',
    rank: 'soldier',
    role: 'mage',
    villain: false,
    traits: ['reluzente', 'instruído', 'minucioso demais', 'macio'],
    attributes: { DES: 8, AST: 10, VIG: 6, VON: 10 },
    hp: 100,
    crisis: 50,
    mp: 90,
    initiative: 9,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'resistant',
      bolt: 'resistant',
      fire: 'vulnerable',
      ice: 'immune',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Cabeçada Gelada',
        range: 'melee',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'O alvo fica lento. Se já estava lento, o bispo recupera 20 PM em vez disso.',
      },
    ],
    spells: [
      {
        name: 'Gelinho Fofo...',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 6,
        effect:
          'O bispo causa (RA + 20) de dano de gelo a cada alvo atingido por este feitiço.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado e enfurecido.',
      },
    ],
  }),
  creature({
    name: 'Cavalo Mole',
    page: 196,
    summary:
      'Gosma veloz e imprudente em forma de cavalo: enquanto estiver sem condições, não pode ser alvo de ataques à distância e ignora Resistências.',
    body: '**Abordagens favoráveis:** terra, veneno, Resistência (raio), condições além de abalado e lento.\n\n**Abordagens desfavoráveis:** raio, fogo, luz, abalado, lento, ataques à distância.',
    originalName: 'Mellow Knight',
    groupSlug: 'corte-mole',
    level: 30,
    species: 'monster',
    rank: 'soldier',
    role: 'hunter',
    villain: false,
    traits: ['veloz', 'reluzente', 'imprudente', 'macio'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 110,
    crisis: 55,
    mp: 70,
    initiative: 9,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      bolt: 'immune',
      earth: 'vulnerable',
      fire: 'resistant',
      light: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Relâmpago Wuuush',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 6,
        damage: 15,
        damageType: 'bolt',
        effect:
          'Este ataque causa 5 de dano extra contra inimigos que sofram duas ou mais condições.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições abalado e lento.' },
      {
        name: 'Pwiu Wápido, Pwiu Fuwioso',
        effect:
          'Enquanto o cavalo não sofrer nenhuma condição, ele não pode ser alvo de ataques à distância e o dano dos ataques dele ignora Resistências.',
      },
    ],
  }),
  creature({
    name: 'Peão Mole',
    page: 197,
    summary:
      'Gosma firme e confiável em forma de peão: atordoa com peonadas e obriga os inimigos a atacá-la.',
    originalName: 'Mellow Pawn',
    groupSlug: 'corte-mole',
    level: 30,
    species: 'monster',
    rank: 'soldier',
    role: 'sentinel',
    villain: false,
    traits: ['reluzente', 'confiável', 'macio', 'estoico'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 120,
    crisis: 60,
    mp: 70,
    initiative: 8,
    defense: { value: 3, fixed: false },
    magicDefense: 3,
    affinities: {
      bolt: 'vulnerable',
      dark: 'vulnerable',
      earth: 'immune',
      fire: 'vulnerable',
    },
    attacks: [
      {
        name: 'Golpe de Lâmina',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
      },
      {
        name: 'Peonada',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'earth',
        effect: 'O alvo fica atordoado.',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições enfurecido e abalado.',
      },
      {
        name: 'Não Me Ignowe, Pwi!',
        effect:
          'Inimigos do peão devem incluí-lo entre os alvos de seus ataques corpo a corpo (se puderem).',
      },
    ],
  }),
  creature({
    name: 'Torre Mole',
    page: 197,
    summary:
      'Gosma imponente e indecisa em forma de torre: dispara canhonadas que abalam e fica desequilibrada ao sofrer dano de um tipo a que é Vulnerável.',
    originalName: 'Mellow Tower',
    groupSlug: 'corte-mole',
    level: 30,
    species: 'monster',
    rank: 'soldier',
    role: 'brute',
    villain: false,
    traits: ['reluzente', 'imponente', 'indeciso', 'macio'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 160,
    crisis: 80,
    mp: 60,
    initiative: 8,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      physical: 'resistant',
      air: 'vulnerable',
      dark: 'vulnerable',
      earth: 'resistant',
      fire: 'immune',
      ice: 'vulnerable',
    },
    attacks: [
      {
        name: 'Balanço',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
      },
      {
        name: 'Canhonada Gwandiosa',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'fire',
        effect: 'Cada alvo atingido fica abalado. Este ataque tem multi (2).',
      },
    ],
    spells: [],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune às condições atordoado e fraco.' },
      {
        name: 'PWIIIIIHHH!!!',
        effect:
          'Quando a torre perde PV por dano de um tipo a que é Vulnerável, ela fica desequilibrada até a próxima vez que fizer Balanço.',
      },
    ],
  }),
  creatureGroup({
    name: 'Militares',
    page: 198,
    summary:
      'Soldados e oficiais de organizações militares, a serviço de governos e poderosos; vão do nível 10 ao 40.',
    body: 'Organizações militares existem onde governos e poderosos desejam proteção. Banhadas em propaganda e exibidas como orgulho da nação, mais cedo ou mais tarde viram arma de opressão: com ótimo financiamento, tecnologia de ponta, redes de inteligência afiadas... e um suprimento infinito de vidas que o alto escalão usa como quiser. Seja qual for a visão de seus fundadores, essas organizações estão fadadas à corrupção.\n\n## Táticas\n\n- Sargento Granadeiro: Cortina de Fumaça Revigorante (se puder e ao menos um aliado não estiver sob ela, mirando um desses aliados aleatoriamente) ou Entrega Especial ➔ Explosivo Grudento ↺\n- Donzela de Escudo da Linha de Frente: Terão que Passar por Mim! (se puder e o Poder ainda não estiver ativo) ou Guarda (cobrindo o aliado com menos PV atuais) ou Me Desafie! ➔ Me Desafie! ➔ Nem Pensar! ↺\n- Veterana Atiradora de Elite: Eu Vejo Você... ➔ Última Boa-noite (se puder) ou Tiro de Reposicionamento ↺\n- Alto Comandante: Dispositivo Negador (se puder e não estiver sob ele) ou Esmagar o Espírito Rebelde (se puder) ou Impedimento (priorizando lento, depois atordoado) ➔ Apagar a Chama da Rebelião (se puder) ou Guarda ➔ Descarga da Manopla ↺',
  }),
  creature({
    name: 'Sargento Granadeiro',
    page: 200,
    summary:
      'Sargento recrutado à força, que arremessa explosivos grudentos e dá vigor e resistência a um aliado com sua cortina de fumaça.',
    originalName: 'Grenadier Sergeant',
    groupSlug: 'militares',
    level: 10,
    species: 'humanoid',
    rank: 'soldier',
    role: 'support',
    villain: false,
    traits: ['recrutado à força', 'ousado', 'inteligente', 'atarracado'],
    attributes: { DES: 8, AST: 8, VIG: 6, VON: 10 },
    hp: 60,
    crisis: 30,
    mp: 70,
    initiative: 9,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: { fire: 'vulnerable', ice: 'vulnerable' },
    attacks: [
      {
        name: 'Entrega Especial',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'fire',
        effect:
          'Este ataque tem multi (2), e o dano dele ignora as Resistências de inimigos preparados.',
      },
      {
        name: 'Explosivo Grudento',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect:
          'Se o sargento tiver 10 ou mais PM atuais, ele deve gastar 10 PM para que o alvo fique preparado até o fim da cena. Quando um aliado causa dano a um ou mais inimigos preparados, esse aliado causa 5 de dano extra a cada um deles e recupera 5 PV; então, esses inimigos deixam de estar preparados.',
      },
    ],
    spells: [
      {
        name: 'Cortina de Fumaça Revigorante',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Cena',
        offensive: false,
        effect:
          'Até o feitiço terminar, o alvo trata o Vigor como um dado maior (até o máximo de d12) e ganha Resistência a dano de luz.',
      },
    ],
    otherActions: [],
    specialRules: [],
  }),
  creature({
    name: 'Donzela de Escudo da Linha de Frente',
    page: 201,
    summary:
      'Campeã leal e corajosa, que desafia inimigos, cobre um aliado e transforma o medo em cura; se descobrir que seus superiores são corruptos, pode abandonar a causa.',
    body: '**Abordagens favoráveis:** raio, trevas, veneno, Resistência (físico), lento, fraco, dano que ignora Resistências.\n\n**Abordagens desfavoráveis:** ar, terra, fogo, gelo, abalado, luta com duas armas.',
    originalName: 'Frontline Shieldmaiden',
    groupSlug: 'militares',
    level: 10,
    species: 'humanoid',
    rank: 'champion',
    championX: 3,
    role: 'sentinel',
    villain: true,
    traits: ['blindado', 'corajoso', 'imponente', 'leal'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 180,
    crisis: 90,
    mp: 100,
    initiative: 11,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      air: 'resistant',
      bolt: 'vulnerable',
      dark: 'vulnerable',
      earth: 'resistant',
      fire: 'resistant',
      ice: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Me Desafie!',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 5,
        damageType: 'physical',
        effect:
          'Até o fim do próximo turno dele, o alvo deve incluir a donzela de escudo entre os alvos de seus ataques e feitiços ofensivos (O), se puder.',
      },
      {
        name: 'Nem Pensar!',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 10,
        damageType: 'physical',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Terão que Passar por Mim!',
        effect:
          'A donzela de escudo pode usar uma ação e gastar 20 PM para fazer todo aliado que ela veja ganhar Resistência a dano de ar, terra, fogo e gelo até o fim da cena, ou até ela perder PV por dano de um tipo a que seja Vulnerável.',
      },
    ],
    specialRules: [
      {
        name: 'A Coragem Vencerá o Mal!',
        effect:
          'Quando a donzela de escudo e/ou um ou mais aliados que a vejam ficam abalados durante uma batalha, em vez disso essas criaturas recuperam 10 PV e 10 PM (este efeito não vale para criaturas imunes a abalado).',
      },
      {
        name: 'Como Ousa!',
        effect:
          'Depois que um inimigo que a donzela de escudo veja acerta um ou mais aliados dela com um ataque ou feitiço ofensivo (O), a donzela faz um ataque livre com Nem Pensar! contra esse inimigo (depois que o ataque ou feitiço for resolvido). Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
      {
        name: 'Eu Cubro Você!',
        effect:
          'Enquanto a donzela de escudo estiver cobrindo um aliado, ele causa 5 de dano extra e os Traços dele não concedem modificadores situacionais positivos aos testes feitos por inimigos.',
      },
      {
        name: 'Vontade Forte, Coração Honesto!',
        effect:
          'Enquanto a donzela de escudo estiver presente num evento social ou formal, inimigos que obtenham sucesso crítico não geram oportunidades. Porém, se nessa cena ela receber provas contundentes de que seus superiores são corruptos, fica atordoada e abalada. Então, no fim da cena, deve gastar todos os Pontos de Ultima restantes e fugir (veja o Livro Básico, p. 101). Se fugir assim, deixa de ser Vilã, mas ainda procura os heróis para um confronto final, exigindo que provem sua honestidade onde ela possa ver com clareza: no campo de batalha.',
      },
    ],
  }),
  creature({
    name: 'Veterana Atiradora de Elite',
    page: 202,
    summary:
      'Atiradora fria e invisível, que trava a mira num inimigo para atingi-lo com bônus e se reposiciona após cada tiro.',
    originalName: 'Deadeye Veteran',
    groupSlug: 'militares',
    level: 20,
    species: 'humanoid',
    rank: 'elite',
    role: 'hunter',
    villain: true,
    traits: ['frio', 'rápido', 'implacável', 'invisível'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 160,
    crisis: 80,
    mp: 60,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      ice: 'resistant',
      light: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Última Boa-noite',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 20,
        damageType: 'ice',
        effect:
          'O dano deste ataque ignora Resistências. A veterana não pode fazer este ataque enquanto estiver atordoada.',
      },
      {
        name: 'Tiro de Reposicionamento',
        range: 'ranged',
        accuracy: 'DES + AST',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'physical',
        effect:
          'Depois que o ataque é resolvido, tenha acertado ou não, a veterana se recupera de todas as condições e fica invisível até o início do próximo turno dela.',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Eu Vejo Você...',
        effect:
          'A veterana pode usar uma ação para travar a mira em um inimigo aleatório que veja, até o fim do próximo turno dela ou até perder PV por dano de um tipo a que seja Vulnerável. Quando a veterana faz um ataque estando travada num inimigo que consiga mirar, deve mirar esse inimigo. Se fizer isso, o ataque ganha +10 no teste de Precisão e causa 10 de dano extra.',
      },
    ],
    specialRules: [
      {
        name: 'Operações Secretas',
        effect:
          'A veterana ganha +3 em testes resistidos ligados a furtividade e rastreamento.',
      },
    ],
  }),
  creature({
    name: 'Alto Comandante',
    page: 203,
    summary:
      'Comandante autoritário que acumula Pontos Táticos a cada acerto dos aliados, comanda ataques livres e, com 3 pontos, torna a si e aos aliados imunes a condições.',
    originalName: 'High Commander',
    groupSlug: 'militares',
    level: 40,
    species: 'humanoid',
    rank: 'champion',
    championX: 3,
    role: 'support',
    villain: true,
    traits: ['autoritário', 'calculista', 'altivo', 'veterano'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 10 },
    hp: 390,
    crisis: 195,
    mp: 200,
    initiative: 12,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      bolt: 'immune',
      dark: 'vulnerable',
      earth: 'vulnerable',
      fire: 'resistant',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Descarga da Manopla',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'bolt',
        effect:
          'Este ataque causa dano extra igual aos Pontos Táticos do comandante multiplicados por 5. Depois que o ataque é resolvido, tenha acertado ou não, o comandante perde todos os Pontos Táticos e recupera 10 PM por ponto perdido assim. Enquanto o comandante tiver 3 Pontos Táticos, este ataque ganha multi (2) e passa a ser à distância.',
      },
    ],
    spells: [
      {
        name: 'Dispositivo Negador',
        mpCost: '20',
        target: 'Pessoal',
        duration: 'Cena',
        offensive: false,
        effect:
          'Quando um inimigo causa dano de trevas ou de terra ao comandante e/ou a um ou mais aliados, em vez disso este feitiço termina e esse inimigo não causa dano.',
      },
    ],
    otherActions: [
      {
        name: 'Xeque-mate',
        effect:
          'Uma vez por cena de conflito, o comandante pode usar uma ação e gastar 2 Pontos de Ultima para trocar a quantidade atual de seções preenchidas de dois Relógios diferentes (seções preenchidas em excesso são simplesmente perdidas).',
      },
      {
        name: 'Esmagar o Espírito Rebelde',
        effect:
          'O comandante pode usar uma ação e gastar 20 PM para fazer um aliado aleatório que veja executar um ataque livre com um de seus ataques básicos. Inimigos atingidos por esse ataque ficam fracos.',
      },
      {
        name: 'Apagar a Chama da Rebelião',
        effect:
          'O comandante pode usar uma ação e gastar 20 PM para fazer um aliado aleatório que veja executar um ataque livre com um de seus ataques básicos. Esse ataque ganha multi (2); se já tinha a propriedade multi, o valor dela aumenta em 1.',
      },
    ],
    specialRules: [
      {
        name: 'Sem Piedade',
        effect:
          'Quando um aliado acerta um ou mais inimigos com um ataque ou feitiço ofensivo (O), ou quando um aliado é bem-sucedido em um teste resistido, o comandante ganha 1 Ponto Tático. Ele nunca pode ter mais de 3 Pontos Táticos e perde todos no fim de cada cena ou ao perder PV por dano de um tipo a que era Vulnerável.',
      },
      {
        name: 'Superar em Manobra e Classe',
        effect:
          'Enquanto o comandante tiver 3 Pontos Táticos, ele e todo aliado que o veja são imunes a todas as condições.',
      },
    ],
  }),
  creature({
    name: 'Minotauro',
    page: 205,
    summary:
      'Humanoide amaldiçoado e trágico, mantido em labirintos até o frenesi constante; campeão solitário que gira a corrente de espinhos e fica mais brutal em crise.',
    body: '**Rotina:** Frenesi Cruel (se estiver em crise) ou Touro Rosnante ➔ Investida Chifrada (se estiver em crise) ou Frenesi Cruel ➔ Touro Rosnante (se estiver em crise) ou Corrente Giratória (se puder) ou Investida Chifrada ➔ Investida Chifrada (se estiver em crise) ou Bola de Espinhos ↺\n\n**Abordagens favoráveis:** ar, trevas, fogo, veneno, Resistência (físico), enfurecido, lento, fraco, perda de PM, briga, armas de fogo, armas pesadas.\n\n**Abordagens desfavoráveis:** raio, gelo, abusar de condições.',
    originalName: 'Minotaur',
    level: 10,
    species: 'humanoid',
    rank: 'champion',
    championX: 4,
    role: 'brute',
    flags: ['solo'],
    villain: true,
    traits: ['agressivo', 'amargo', 'maciço', 'pesaroso'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 6 },
    hp: 360,
    crisis: 180,
    mp: 80,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      bolt: 'resistant',
      dark: 'vulnerable',
      fire: 'vulnerable',
      ice: 'resistant',
      poison: 'vulnerable',
    },
    attacks: [
      {
        name: 'Investida Chifrada',
        range: 'melee',
        accuracy: 'VIG + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'physical',
        effect:
          'Enquanto o minotauro não estiver em crise, este ataque ganha +3 no teste de Precisão; enquanto estiver em crise, inimigos atingidos por este ataque ficam atordoados.',
      },
      {
        name: 'Frenesi Cruel',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 5,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Bola de Espinhos',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 1,
        damage: 10,
        damageType: 'physical',
        effect:
          'Enquanto a corrente do minotauro estiver girando, este ataque causa 10 de dano extra e seu dano ignora Resistências.',
      },
    ],
    spells: [],
    otherActions: [
      {
        name: 'Touro Rosnante',
        effect:
          'O minotauro pode usar uma ação para rosnar com ferocidade. O inimigo (ou inimigos) com menos PV atuais entre os que conseguem ouvir o rosnado fica abalado.',
      },
      {
        name: 'Corrente Giratória',
        effect:
          'O minotauro pode usar uma ação e gastar 10 PM para girar a corrente da bola de espinhos. Se fizer isso, a corrente fica girando até o fim da cena, até o minotauro perder PV por dano de um tipo a que era Vulnerável, até ele perder PV por dano causado por uma arma de briga, de fogo ou pesada, ou até depois de resolver o ataque Bola de Espinhos.',
      },
    ],
    specialRules: [
      {
        name: 'Perseguidor Ctônico',
        effect:
          'Quando uma ou mais seções de um Relógio são preenchidas ou apagadas, se esse Relógio estiver ligado a uma perseguição ou a magia de terra, o minotauro pode gastar 20 PM. Se gastar, mais uma seção desse Relógio é preenchida ou apagada, respectivamente.',
      },
      {
        name: 'Ricochete',
        effect:
          'Depois que o minotauro entra em crise pela primeira vez numa cena, se a corrente estiver girando, ela para de girar e o minotauro causa 10 de dano físico a todos os inimigos que veja.',
      },
      {
        name: 'Vendo Vermelho',
        effect:
          'No fim de cada turno do minotauro, se ele sofrer três ou mais condições, ele se recupera de todas as condições exceto enfurecido.',
      },
    ],
  }),
  creature({
    name: 'Multigroa',
    page: 207,
    summary:
      'Planta carnívora solitária e fétida, que odeia frio e sol e digere qualquer presa com ácido; campeã que envenena a cena com névoa pútrida.',
    body: '**Rotina:** Tentáculos Chicoteantes ➔ Fauces Babosas ➔ Bioclepsia (se puder) ou Guarda ➔ Névoa Pútrida (se puder, apenas na primeira rodada do conflito ou se a multigroa estiver em crise) ou Bioclepsia (se puder) ou Fauces Babosas ↺\n\n**Abordagens favoráveis:** ar, gelo, luz, lento, fraco, Resistência (físico, veneno), lento, fraco, recuperação de condições, perda de PM.\n\n**Abordagens desfavoráveis:** raio, fogo, veneno, atordoado, enfurecido, envenenado, abalado.',
    originalName: 'Multigroa',
    level: 30,
    species: 'plant',
    rank: 'champion',
    championX: 4,
    role: 'saboteur',
    flags: ['solo'],
    villain: true,
    traits: [
      'repugnante',
      'sempre faminto',
      'odeia frio e luz do sol',
      'imponente',
    ],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 400,
    crisis: 200,
    mp: 200,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      air: 'vulnerable',
      bolt: 'resistant',
      fire: 'resistant',
      ice: 'vulnerable',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Tentáculos Chicoteantes',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect:
          'Enquanto a multigroa não estiver em crise, este ataque tem multi (2) e os alvos atingidos ficam fracos.',
      },
      {
        name: 'Fauces Babosas',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 3,
        damage: 15,
        damageType: 'physical',
        effect:
          'Se o alvo sofrer uma ou mais condições, este ataque causa 5 de dano extra e seu dano ignora Resistências e Imunidades.',
      },
    ],
    spells: [
      {
        name: 'Bioclepsia',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 6,
        effect:
          'A multigroa causa (RA + 20) de dano de veneno ao alvo. Em seguida, recupera PV iguais à metade da perda total de PV sofrida pelo alvo.',
      },
      {
        name: 'Névoa Pútrida',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Toda criatura que a multigroa veja fica envenenada. Se uma criatura afetada já estava envenenada, em vez disso fica atordoada e lenta. Então, toda criatura que a multigroa veja e que sofra três ou mais condições perde PV e PM iguais ao nível da multigroa.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect:
          'Imune às condições atordoado, enfurecido, envenenado e abalado.',
      },
      {
        name: 'Sentidos Turvos',
        effect:
          'Inimigos que sofrem duas ou mais condições não conseguem ver a multigroa.',
      },
      {
        name: 'Fedor Nauseante',
        effect:
          'Enquanto a multigroa estiver em crise, toda outra criatura presente na cena não pode se recuperar de envenenado, perde a imunidade a envenenado (se tiver) e não pode ganhá-la.',
      },
      {
        name: 'Rugido Sinistro',
        effect:
          'Quando a multigroa entra em crise pela primeira vez numa cena, ela se recupera de todas as condições e toda criatura que consiga ouvi-la fica abalada.',
      },
    ],
  }),
  creature({
    name: 'Necrodragão',
    page: 209,
    summary:
      'Abominação feita de cadáveres de dragões fundidos e movida por três corações doentes: troca de Afinidades e do tipo do sopro a cada batida.',
    body: '**Rotina:** Chuva Sangrenta ➔ Garra Atormentadora ➔ Sopro Sobrenatural (se puder) ou Chuva Sangrenta ➔ Batida Grotesca ↺\n\n**Abordagens favoráveis:** ar, fogo, gelo, luz, Resistência (ar, trevas, fogo, gelo, veneno), atordoado, enfurecido, lento, recuperação de condições, perda de PM.\n\n**Abordagens desfavoráveis:** trevas, veneno, envenenado, abalado, fraco, Rituais de Elementalismo.',
    originalName: 'Necrodragon',
    level: 40,
    species: 'undead',
    rank: 'champion',
    championX: 4,
    role: 'mage',
    flags: ['solo'],
    villain: true,
    traits: ['agressivo', 'poluente', 'atormentado', 'desengonçado'],
    attributes: { DES: 8, AST: 10, VIG: 8, VON: 10 },
    hp: 480,
    crisis: 240,
    mp: 200,
    initiative: 13,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: { dark: 'absorbs', light: 'vulnerable', poison: 'immune' },
    attacks: [
      {
        name: 'Garra Atormentadora',
        range: 'melee',
        accuracy: 'DES + VON',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'dark',
        effect:
          'Se o alvo sofrer duas ou mais condições, o necrodragão recupera 30 PM.',
      },
      {
        name: 'Chuva Sangrenta',
        range: 'ranged',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 15,
        damageType: 'poison',
        effect: 'Este ataque tem multi (2).',
      },
    ],
    spells: [
      {
        name: 'Sopro Sobrenatural',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 4,
        effect:
          'O necrodragão causa (RA + 25) de dano de trevas a cada alvo atingido por este feitiço. Oportunidade: o dano deste feitiço ignora Resistências e Imunidades.',
      },
    ],
    otherActions: [
      {
        name: 'Batida Grotesca',
        effect:
          'O necrodragão pode usar uma ação para fazer o coração que está batendo parar de bater. Se fizer isso, outro coração, escolhido aleatoriamente, começa a bater; então ele exala uma nuvem de miasma poluído, e todo inimigo presente na cena sofre uma condição conforme o coração que está batendo: abalado (vermelho), lento (verde) ou fraco (azul).',
      },
    ],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições envenenado, abalado e fraco.',
      },
      {
        name: 'Corrupção Elemental',
        effect:
          'Enquanto o necrodragão não estiver em crise, testes de Magia fracassados para Rituais de Elementalismo feitos por inimigos em sua presença são tratados como falhas críticas.',
      },
      {
        name: 'Coração Triplo',
        effect:
          'O necrodragão tem três corações: azul, verde e vermelho. Conforme o coração que está batendo, as Afinidades dele mudam e o dano de Sopro Sobrenatural muda de tipo (no início, o coração vermelho está batendo). Azul: Vulnerável a gelo, Imune a ar e fogo; o Sopro causa dano de gelo. Verde: Vulnerável a ar, Imune a fogo e gelo; o Sopro causa dano de ar. Vermelho: Vulnerável a fogo, Imune a ar e gelo; o Sopro causa dano de fogo.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
]);
