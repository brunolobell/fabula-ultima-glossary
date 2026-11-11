import { creature, creatureGroup, inBook } from '../../helpers';
import { SeedEntry } from '../../types';

/** Bestiary Vol. I, Undine a Walpurgisgras: translated and unofficial; summaries and effects are our own words. */
export const criaturasVol1K: SeedEntry[] = inBook('bestiary-vol-1', [
  creatureGroup({
    name: 'Vampiros',
    page: 290,
    summary:
      'Aristocratas sem idade ou, na maioria, abominações grotescas nascidas de maldições, movidas por sede infinita de força vital; do nível 10 ao 20.',
    body: 'Lendas e contos populares costumam pintar os vampiros como senhores da noite e aristocratas sem idade, tão cavalheirescos quanto hedonistas. Alguns se encaixam nessa imagem, mas a maioria é de abominações retorcidas e grotescas, nascidas de maldições poderosas ou de profunda corrupção espiritual. Em geral inteligentes e capazes de falar, importam-se pouco com moral e sociedade, exceto para desafiá-las com gosto: entregam-se a brutais caçadas ao luar, movidos por uma sede infinita de força vital.\n\n## Táticas\n\n- Strigoi: Mordida de Strigoi ➔ Lamento Faminto (se puder) ou Arranhão Cruel ↺\n- Blutsauger: Gelo Sombrio ➔ Esfolador das Trevas (se puder e estiver invisível) ou Recuperação (se for Vilão e sofrer duas ou mais condições) ou Rasga-veias ➔ Regeneração Sombria (se puder e estiver em crise) ou Sumir na Névoa (se não sofrer nenhuma condição) ou Rasga-veias ↺',
  }),
  creature({
    name: 'Strigoi',
    page: 292,
    summary:
      'Vampiro grotesco e cego, que caça pelo som e entra em frenesi quando alguém ao alcance do ouvido chega ao estado de crise.',
    body: '**Abordagens favoráveis:** terra, gelo, luz, Resistência (trevas), atordoado, enfurecido, lento, impedir a recuperação de PV.\n\n**Abordagens desfavoráveis:** trevas, veneno, envenenado, ataques corpo a corpo.',
    originalName: 'Strigoi',
    groupSlug: 'vampiros',
    level: 10,
    species: 'undead',
    rank: 'elite',
    role: 'hunter',
    villain: false,
    traits: ['esfomeado', 'grotesco', 'ligeiro', 'sem visão'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 120,
    crisis: 60,
    mp: 50,
    initiative: 11,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      dark: 'immune',
      earth: 'vulnerable',
      ice: 'vulnerable',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Mordida de Strigoi',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 4,
        damage: 10,
        damageType: 'dark',
        effect:
          'Depois que o ataque é resolvido, se os PV atuais do strigoi forem menores que 120, ele recupera 10 PV e fica saciado até o fim da cena ou até lançar Lamento Faminto.',
      },
      {
        name: 'Arranhão Cruel',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 4,
        damage: 5,
        damageType: 'physical',
      },
    ],
    spells: [
      {
        name: 'Lamento Faminto',
        mpCost: '5',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 1,
        effect: 'O strigoi causa (RA + 10) de dano de trevas ao alvo.',
      },
    ],
    otherActions: [],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Ecolocalização',
        effect:
          'O strigoi não enxerga, mas pode mirar qualquer criatura que consiga ouvir.',
      },
      {
        name: 'Frenesi Alimentar',
        effect:
          'Depois que um ou mais inimigos que o strigoi consiga ouvir entram em crise fora do turno do strigoi, se ele não estiver saciado, faz um ataque livre com Mordida de Strigoi contra um desses inimigos, escolhido aleatoriamente. Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
      {
        name: 'Voo',
        effect: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Blutsauger',
    page: 293,
    summary:
      'Vampiro astuto e cruel, que some na névoa, drena os PM de quem lança feitiços contra ele e se regenera nas sombras.',
    body: '**Abordagens favoráveis:** terra, fogo, luz, Resistência (físico, trevas, gelo), abalado, lento, fraco.\n\n**Abordagens desfavoráveis:** raio, trevas, gelo, veneno, envenenado, atingir o blutsauger com feitiços.',
    originalName: 'Blutsauger',
    groupSlug: 'vampiros',
    level: 20,
    species: 'undead',
    rank: 'champion',
    championX: 3,
    role: 'hunter',
    villain: true,
    traits: ['esperto', 'cruel', 'paciente', 'distorcido'],
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 8 },
    hp: 240,
    crisis: 120,
    mp: 140,
    initiative: 12,
    defense: { value: 0, fixed: false },
    magicDefense: 0,
    affinities: {
      bolt: 'resistant',
      dark: 'absorbs',
      earth: 'vulnerable',
      fire: 'vulnerable',
      ice: 'resistant',
      light: 'vulnerable',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Rasga-veias',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 5,
        damage: 15,
        damageType: 'physical',
        effect:
          'Este ataque causa 10 de dano extra a inimigos cujos PV atuais sejam iguais ou maiores que o máximo.',
      },
      {
        name: 'Gelo Sombrio',
        range: 'ranged',
        accuracy: 'DES + VON',
        accuracyBonus: 5,
        damage: 10,
        damageType: 'ice',
      },
    ],
    spells: [
      {
        name: 'Esfolador das Trevas',
        mpCost: '10',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect:
          'O blutsauger causa (RA + 20) de dano de trevas ao alvo, que fica fraco.',
      },
      {
        name: 'Regeneração Sombria',
        mpCost: '10',
        target: 'Pessoal',
        duration: 'Instantânea',
        offensive: false,
        effect: 'O blutsauger recupera PV iguais a (10 + o nível dele).',
      },
    ],
    otherActions: [
      {
        name: 'Sumir na Névoa',
        effect:
          'Enquanto o blutsauger não sofrer nenhuma condição, ele pode usar uma ação para ficar invisível até o fim da cena, ou até perder PV, lançar um feitiço ou fazer Rasga-veias.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Sifão de Almas',
        effect:
          'Feitiços que incluam o blutsauger entre os alvos têm o custo em PM aumentado em 10. Depois que um feitiço é resolvido, se ele incluía o blutsauger entre os alvos e/ou causou dano a ele, o blutsauger recupera 10 PM.',
      },
      {
        name: 'Morto-vivo',
        effect:
          'Efeitos que o curariam podem feri-lo (regra dos Mortos-vivos, Livro Básico p. 305).',
      },
    ],
  }),
  creature({
    name: 'Ondina',
    page: 287,
    summary:
      'Guardiã Cardeal das Montanhas do Sul, a Imperatriz do Gelo: protetora, envolve o campo de batalha em permafrost e conta com esprits de gelo.',
    body: '**Rotina:** Bastião de Permafrost (em rodadas ímpares, se puder) ou Gelo Verdadeiro (se puder) ou Corte de Prata ➔ Lança Congelada ➔ Corte da Nevasca ↺\n\n**Abordagens favoráveis:** raio, fogo, Resistência (gelo), condições, imunidade (lento).\n\n**Abordagens desfavoráveis:** trevas, gelo, luz, veneno, envenenado.',
    originalName: 'Undine',
    level: 20,
    species: 'elemental',
    rank: 'champion',
    championX: 3,
    role: 'sentinel',
    flags: ['unique'],
    villain: true,
    traits: ['eterno', 'atencioso', 'altivo', 'atento'],
    attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
    hp: 270,
    crisis: 135,
    mp: 140,
    initiative: 11,
    defense: { value: 2, fixed: false },
    magicDefense: 1,
    affinities: {
      bolt: 'vulnerable',
      dark: 'resistant',
      fire: 'vulnerable',
      ice: 'absorbs',
      light: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Corte de Prata',
        range: 'melee',
        accuracy: 'DES + VIG',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'physical',
        effect: 'O alvo fica lento.',
      },
      {
        name: 'Corte da Nevasca',
        range: 'melee',
        accuracy: 'DES + AST',
        accuracyBonus: 2,
        damage: 10,
        damageType: 'ice',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Lança Congelada',
        range: 'ranged',
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        damage: 15,
        damageType: 'ice',
      },
    ],
    spells: [
      {
        name: 'Gelo Verdadeiro',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'VIG + VON',
        accuracyBonus: 2,
        effect:
          'Ondina causa (RA + 25) de dano de gelo ao alvo. Esse dano não pode ser reduzido por nenhum efeito e também ignora Resistências e Imunidades.',
      },
    ],
    otherActions: [
      {
        name: 'Bastião de Permafrost',
        effect:
          'Ondina pode usar uma ação e gastar 10 PM para envolver o campo de batalha em permafrost. Durante o permafrost, Ondina e todos os aliados presentes na cena ganham Resistência a dano físico e Imunidade a dano de fogo. Quando Ondina e/ou um aliado sofre dano de raio ou de fogo, o permafrost racha; se já estava rachado, o permafrost desaparece. O permafrost também desaparece quando Ondina lança Gelo Verdadeiro.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Minha Corte Leal',
        effect:
          'No fim de cada rodada, se Ondina estiver em crise e não houver esprits de gelo presentes na cena, um novo esprit de gelo entra na cena.',
      },
      {
        name: 'Corte da Vingança',
        effect:
          'No fim de cada turno de inimigo durante o permafrost, se esse inimigo fez um aliado de Ondina perder PV durante o turno, Ondina faz um ataque livre com Corte de Prata contra esse inimigo. Considere o resultado alto (RA) do teste de Precisão como 0 ao determinar o dano deste ataque.',
      },
      {
        name: 'Temperança Vigilante',
        effect:
          'Quando um inimigo preenche ou apaga três ou mais seções de um Relógio, se Ondina estiver presente na cena, uma seção a menos é preenchida ou apagada.',
      },
    ],
  }),
  creature({
    name: 'Unicórnio',
    page: 289,
    summary:
      'Guardião Cardeal das Planícies Centrais, trovejante e impetuoso: acumula tempestade no chifre e fica hipercondutor para purificar e punir.',
    body: '**Rotina:** Raio Purificador ➔ Raio Verdadeiro (se puder) ou Galope ➔ Tempestade se Acumulando ➔ Tempestade Rugidora (se puder) ou Galope ↺\n\n**Abordagens favoráveis:** trevas, terra, Resistência (físico, raio), enfurecido, abalado, perda de PM, impedir a ação Feitiço.\n\n**Abordagens desfavoráveis:** ar, raio, fogo, luz, veneno, envenenado, atordoado, lento, ataques, feitiços de duração Cena, símbolos.',
    originalName: 'Unicorn',
    level: 30,
    species: 'elemental',
    rank: 'champion',
    championX: 4,
    role: 'mage',
    flags: ['solo', 'unique'],
    villain: true,
    traits: ['eterno', 'impetuoso', 'altivo', 'forte'],
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 10 },
    hp: 400,
    crisis: 200,
    mp: 160,
    initiative: 12,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'immune',
      bolt: 'absorbs',
      dark: 'vulnerable',
      earth: 'vulnerable',
      fire: 'resistant',
      light: 'resistant',
      poison: 'immune',
    },
    attacks: [
      {
        name: 'Galope',
        range: 'melee',
        accuracy: 'VIG + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Raio Purificador',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 3,
        damage: 10,
        damageType: 'bolt',
        effect:
          'Este ataque mira a Defesa Mágica. Depois que um inimigo perde PV por este ataque, se Unicórnio estiver hipercondutor, todos os símbolos presentes nesse inimigo são destruídos e ele deixa de ser afetado por todos os feitiços de duração Cena que o afetavam.',
      },
    ],
    spells: [
      {
        name: 'Tempestade Rugidora',
        mpCost: '30',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect:
          'Unicórnio causa 30 de dano de raio a todo inimigo que veja. Todo inimigo que perder 30 PV ou mais por esse dano também fica lento.',
      },
      {
        name: 'Raio Verdadeiro',
        mpCost: '20',
        target: 'Uma criatura',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 6,
        effect:
          'Unicórnio causa (RA + 25) de dano de raio ao alvo. Esse dano não pode ser reduzido por nenhum efeito e também ignora Resistências e Imunidades.',
      },
    ],
    otherActions: [
      {
        name: 'Tempestade se Acumulando',
        effect:
          'Unicórnio pode usar uma ação para empinar enquanto raios se reúnem em torno do chifre. Se fizer isso, ele se recupera de atordoado e lento, recupera 30 PM e fica hipercondutor até fazer Raio Purificador ou sofrer dano de terra.',
      },
    ],
    specialRules: [
      { name: 'Imunidades', effect: 'Imune à condição envenenado.' },
      {
        name: 'Aura Crepitante',
        effect:
          'Depois que um inimigo acerta Unicórnio com um ataque, se ele estiver hipercondutor, recupera 10 PM e causa 10 de dano de raio a esse inimigo (depois que o ataque for resolvido).',
      },
      {
        name: 'Domínio da Voltagem',
        effect:
          'No fim de cada rodada de uma cena de conflito, Unicórnio pode preencher ou apagar 1 seção de um Relógio à sua escolha ligado a eletricidade, raios, magnetismo ou maquinário.',
      },
    ],
  }),
  creature({
    name: 'Walpurgisgras',
    page: 295,
    summary:
      'Planta hipnótica e predadora, campeã solitária: atrai com pulsos elétricos, entorpece com feromônios e congela as presas.',
    body: '**Rotina:** Feromônios Entorpecentes (se puder, em rodadas ímpares) ou Onda de Éter Crepitante ➔ Raízes Chicoteantes ➔ Onda de Éter Crepitante (priorizando o inimigo com mais PV atuais) ➔ Floração Gélida (se puder) ou Raízes Chicoteantes ↺\n\n**Abordagens favoráveis:** ar, fogo, Resistência (gelo), envenenado, fraco, imunidade (envenenado, lento), perda de PM, ataques corpo a corpo.\n\n**Abordagens desfavoráveis:** raio, luz, atordoado, enfurecido, abalado, dano que não vem de ataques corpo a corpo.',
    originalName: 'Walpurgisgras',
    level: 5,
    species: 'plant',
    rank: 'champion',
    championX: 4,
    role: 'mage',
    flags: ['solo'],
    villain: true,
    traits: ['enganoso', 'instintivo', 'oportunista', 'enraizado'],
    attributes: { DES: 8, AST: 8, VIG: 6, VON: 10 },
    hp: 160,
    crisis: 80,
    mp: 150,
    initiative: 12,
    defense: { value: 1, fixed: false },
    magicDefense: 2,
    affinities: {
      air: 'vulnerable',
      bolt: 'resistant',
      fire: 'vulnerable',
      light: 'resistant',
    },
    attacks: [
      {
        name: 'Raízes Chicoteantes',
        range: 'melee',
        accuracy: 'AST + VIG',
        accuracyBonus: 0,
        damage: 5,
        damageType: 'physical',
        effect: 'Este ataque tem multi (2).',
      },
      {
        name: 'Onda de Éter Crepitante',
        range: 'ranged',
        accuracy: 'AST + VON',
        accuracyBonus: 0,
        damage: 5,
        damageType: 'bolt',
        effect:
          'Até o início do próximo turno do alvo, o dano de feitiços ignora as Resistências dele.',
      },
    ],
    spells: [
      {
        name: 'Floração Gélida',
        mpCost: '10 × A',
        target: 'Até três criaturas',
        duration: 'Instantânea',
        offensive: true,
        accuracy: 'AST + VON',
        accuracyBonus: 0,
        effect:
          'A walpurgisgras causa (RA + 10) de dano de gelo a cada alvo atingido por este feitiço, e se o resultado alto do teste de Magia foi 8 ou mais, cada alvo atingido fica lento.',
      },
      {
        name: 'Feromônios Entorpecentes',
        mpCost: '20',
        target: 'Especial',
        duration: 'Instantânea',
        offensive: false,
        effect: 'Todo inimigo que a walpurgisgras veja perde 20 PM.',
      },
    ],
    otherActions: [],
    specialRules: [
      {
        name: 'Imunidades',
        effect: 'Imune às condições atordoado, enfurecido e abalado.',
      },
      {
        name: 'Proteção em Botão',
        effect:
          'Depois que a walpurgisgras perde PV por dano de um tipo a que era Vulnerável, se a flor não estiver fechada, ela se fecha. Enquanto a flor estiver fechada, as Afinidades básicas dela a dano de ar, terra, fogo e gelo são substituídas por Resistência. Abrir a flor exige um Relógio de 4 seções, que também avança 1 seção sempre que a walpurgisgras perde PV por dano físico.',
      },
      {
        name: 'Retaliação Tóxica',
        effect:
          'No fim de cada turno de inimigo, se a walpurgisgras estiver em crise e esse inimigo causou dano a ela com algo que não seja um ataque corpo a corpo enquanto a flor estava fechada, todo inimigo que a walpurgisgras veja fica envenenado.',
      },
    ],
  }),
]);
