import type {
  CustomWeaponRuleDetails,
  RareWeaponRuleDetails,
} from '../../entries/entry-types';
import {
  WEAPON_CATEGORIES,
  WEAPON_DAMAGE_TYPES,
} from '../../entries/entry-types';

// The numbers behind the Weapon Forge. This file imports nothing but types and
// constants so the web tests can load it and check the Forge's arithmetic
// against the books' own examples (see docs/adr/0002-weapon-forge-rule-data.md).

/** Atlas High Fantasy p. 106-108 (identical in Natural Fantasy p. 112-114 and Techno Fantasy p. 112-114). */
export const customWeaponRules: CustomWeaponRuleDetails = {
  forge: 'custom-weapon',
  base: {
    cost: 300,
    damage: 5,
    slots: 3,
    accuracies: ['DES + AST', 'DES + VIG'],
  },
  categories: [...WEAPON_CATEGORIES],
  damageTypes: [...WEAPON_DAMAGE_TYPES],
  customizations: [
    {
      id: 'aumento-na-defesa',
      name: 'Aumento na Defesa',
      summary:
        'Defesa +2, e vale como ter um escudo equipado para os requisitos de poderes (como Maestria Defensiva e Esquiva).',
      martial: false,
      slots: 1,
      cost: 0,
      defense: 2,
    },
    {
      id: 'aumento-na-defesa-magica',
      name: 'Aumento na Defesa Mágica',
      summary: 'Defesa Mágica +2.',
      martial: true,
      slots: 1,
      cost: 0,
      magicDefense: 2,
    },
    {
      id: 'certeira',
      name: 'Certeira',
      summary: 'Bônus de +2 no teste de Precisão da arma.',
      martial: false,
      slots: 1,
      cost: 0,
      accuracy: 2,
    },
    {
      id: 'elemental',
      name: 'Elemental',
      summary:
        'Você escolhe um tipo de dano (ar, fogo, gelo, luz, raio, terra, trevas ou veneno) no lugar de físico, e a arma causa 2 pontos de dano adicional.',
      martial: false,
      slots: 1,
      cost: 0,
      damage: 2,
      chooseDamageType: true,
    },
    {
      id: 'mutavel',
      name: 'Mutável',
      summary:
        'Acrescenta 100z ao custo. A arma tem uma segunda forma, montada como outra arma personalizada que também leva Mutável e não custa nada. Quem a empunha troca de forma no seu turno, antes ou depois da ação, uma vez por turno.',
      martial: false,
      slots: 1,
      cost: 100,
      secondForm: true,
      note: 'Se uma forma for corpo a corpo e a outra à distância, ou se forem de categorias diferentes, você só recebe os benefícios de uma de cada vez.',
    },
    {
      id: 'poderosa',
      name: 'Poderosa',
      summary:
        'A arma causa 5 pontos de dano adicional, ou 7 se for uma arma pesada. Não vale para armas arcanas, adagas nem armas rápidas.',
      martial: true,
      slots: 1,
      cost: 0,
      damage: 5,
      heavyDamage: 7,
      blockedCategories: ['Armas Arcanas', 'Adagas'],
      blockedWith: ['rapida'],
    },
    {
      id: 'rapida',
      name: 'Rápida',
      summary:
        'Conta como duas personalizações. Na ação Ataque, você faz dois ataques, contra o mesmo alvo ou contra alvos diferentes, que seguem as regras de atacar com duas armas.',
      martial: true,
      slots: 2,
      cost: 0,
      doubleAttack: true,
      note: 'Alguns Poderes Heroicos não se acumulam com ela: nunca há mais de dois ataques.',
    },
  ],
  notes: [
    'Uma arma personalizada é sempre de duas mãos e nunca é empunhada com uma mão. Também não se beneficia do poder heroico Mão de Gorila.',
    'Personalizações não são características da arma: uma arma só ganha característica ao virar arma rara.',
    'A rápida e certeira perde flexibilidade, já que não dá para combiná-la com outra arma. Há prós e contras em cada escolha.',
  ],
};

/** Livro Básico p. 266-269. */
export const rareWeaponRules: RareWeaponRuleDetails = {
  forge: 'rare-weapon',
  damageTypes: [...WEAPON_DAMAGE_TYPES],
  damageTypeCost: 100,
  maxAlterations: 1,
  martialDamage: 10,
  oneHandedOnlyCategories: ['Adagas', 'Armas de Arremesso', 'Luta'],
  excludedBases: ['ataque-desarmado', 'improvisada-cac', 'improvisada-dist'],
  alterations: [
    {
      id: 'one-handed',
      name: 'Uma mão',
      summary: 'Uma arma de duas mãos passa a ser de uma mão, com −4 de dano.',
      cost: 0,
      damage: -4,
    },
    {
      id: 'two-handed',
      name: 'Duas mãos',
      summary:
        'Uma arma de uma mão (que não seja adaga, arremessável ou de luta) passa a ser de duas mãos, com +4 de dano.',
      cost: 0,
      damage: 4,
    },
    {
      id: 'accuracy',
      name: 'Precisão +1',
      summary:
        'Soma +1 à fórmula de Precisão por 100z. Não vale se a arma já dá +1 ou mais de Precisão.',
      cost: 100,
      accuracy: 1,
    },
    {
      id: 'damage',
      name: 'Dano +4',
      summary: 'A arma causa +4 de dano, por 200z.',
      cost: 200,
      damage: 4,
    },
    {
      id: 'attributes',
      name: 'Atributos da Precisão',
      summary:
        'Troca os Atributos do teste de Precisão. Se o novo teste usar um só Atributo, o custo sobe 50z.',
      cost: 50,
    },
  ],
  features: [
    {
      id: 'anticondicao',
      name: 'Anticondição',
      group: 'defensive',
      cost: 500,
      summary: 'Imunidade a uma condição.',
    },
    {
      id: 'resistencia',
      name: 'Resistência',
      group: 'defensive',
      cost: 700,
      summary: 'Resistência a um tipo de dano (exceto físico).',
    },
    {
      id: 'amuleto',
      name: 'Amuleto',
      group: 'defensive',
      cost: 800,
      summary: 'Defesa Mágica +1.',
      magicDefense: 1,
    },
    {
      id: 'baluarte',
      name: 'Baluarte',
      group: 'defensive',
      cost: 800,
      summary: 'Defesa +1.',
      defense: 1,
    },
    {
      id: 'dupla-resistencia',
      name: 'Dupla resistência',
      group: 'defensive',
      cost: 1000,
      summary: 'Resistência a dois tipos de dano (exceto físico).',
    },
    {
      id: 'quebra-laminas',
      name: 'Quebra-lâminas',
      group: 'defensive',
      cost: 1000,
      summary: 'Resistência a dano físico.',
    },
    {
      id: 'imunidade',
      name: 'Imunidade',
      group: 'defensive',
      cost: 1500,
      summary: 'Imunidade a um tipo de dano (exceto físico).',
    },
    {
      id: 'omniescudo',
      name: 'Omniescudo',
      group: 'defensive',
      cost: 2000,
      summary: 'Defesa e Defesa Mágica +1.',
      defense: 1,
      magicDefense: 1,
    },
    {
      id: 'saude-perfeita',
      name: 'Saúde perfeita',
      group: 'defensive',
      cost: 2000,
      summary: 'Imunidade a todas as condições.',
    },
    {
      id: 'magica',
      name: 'Mágica',
      group: 'offensive',
      cost: 100,
      summary: 'A arma ataca a Defesa Mágica, em vez da Defesa.',
    },
    {
      id: 'cacadora',
      name: 'Caçadora',
      group: 'offensive',
      cost: 300,
      summary: '+5 de dano contra criaturas de uma espécie específica.',
    },
    {
      id: 'perfuradora',
      name: 'Perfuradora',
      group: 'offensive',
      cost: 400,
      summary: 'O dano da arma ignora Resistências.',
    },
    {
      id: 'dupla-cacadora',
      name: 'Dupla caçadora',
      group: 'offensive',
      cost: 500,
      summary: '+5 de dano contra criaturas de duas espécies específicas.',
    },
    {
      id: 'multi',
      name: 'Multi',
      group: 'offensive',
      cost: 1000,
      summary: 'Os ataques da arma têm a propriedade multi (2).',
    },
    {
      id: 'condicional',
      name: 'Condicional',
      group: 'offensive',
      cost: 1500,
      summary:
        'Alvos atingidos ficam abalados, atordoados, fracos ou lentos (um à escolha).',
    },
    {
      id: 'multicondicional',
      name: 'Multicondicional',
      group: 'offensive',
      cost: 2000,
      summary:
        'Alvos atingidos ficam enfurecidos ou envenenados (um à escolha).',
    },
  ],
  notes: [
    'Um item raro só pode ter uma característica.',
    'Nenhum personagem deve equipar mais de dois itens que melhorem Precisão, Magia, Defesa ou Defesa Mágica, a menos que sejam opções que não se usam ao mesmo tempo.',
    'Evite copiar feitiços e poderes exclusivos de uma classe.',
    'O preço de um efeito personalizado é decidido pelo mestre, seguindo os exemplos do livro.',
  ],
};
