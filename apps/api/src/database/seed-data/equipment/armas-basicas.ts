import { AttributeCode } from '../../../entries/entry-types';
import { SeedEntry } from '../types';

type Accuracy = `${AttributeCode} + ${AttributeCode}`;

interface WeaponRow {
  name: string;
  page: 130 | 131;
  category: string;
  cost: number | null;
  accuracy: Accuracy;
  accuracyBonus?: number;
  damage: number;
  hands: 1 | 2;
  range: 'melee' | 'ranged';
  martial?: boolean;
  notes?: string;
}

const weapon = (row: WeaponRow): SeedEntry => {
  const martial = row.martial ?? false;
  const profile = `${row.hands === 1 ? 'Uma mão' : 'Duas mãos'}, ${
    row.range === 'melee' ? 'corpo a corpo' : 'à distância'
  }`;
  const accuracy = `(${row.accuracy})${row.accuracyBonus ? ` +${row.accuracyBonus}` : ''}`;
  const cost = row.cost === null ? 'sem custo' : `${row.cost}z`;

  return {
    type: 'equipment',
    name: row.name,
    page: row.page,
    summary: `Arma básica${martial ? ' marcial' : ''} da categoria ${row.category}. ${profile}. Precisão ${accuracy}, dano (RA + ${row.damage}) físico, ${cost}.`,
    body: [
      row.notes ? `**Característica:** ${row.notes}` : '',
      martial
        ? 'Item **marcial**: só pode ser equipado por quem tem a classe adequada (veja [[equipamento]]).'
        : '',
    ]
      .filter(Boolean)
      .join('\n\n'),
    tags: ['equipamento', 'arma', row.category.toLowerCase()],
    details: {
      kind: 'weapon',
      rarity: 'basic',
      martial,
      cost: row.cost,
      category: row.category,
      accuracy: row.accuracy,
      ...(row.accuracyBonus ? { accuracyBonus: row.accuracyBonus } : {}),
      damage: row.damage,
      damageType: 'físico',
      hands: row.hands,
      range: row.range,
      notes: row.notes ?? null,
    },
  };
};

const BREAKS = 'Quebra após o ataque.';

export const armasBasicas: SeedEntry[] = [
  weapon({
    name: 'Cajado',
    page: 130,
    category: 'Armas Arcanas',
    cost: 100,
    accuracy: 'VON + VON',
    damage: 6,
    hands: 2,
    range: 'melee',
  }),
  weapon({
    name: 'Tomo',
    page: 130,
    category: 'Armas Arcanas',
    cost: 100,
    accuracy: 'AST + AST',
    damage: 6,
    hands: 2,
    range: 'melee',
  }),
  weapon({
    name: 'Besta',
    page: 130,
    category: 'Arcos',
    cost: 150,
    accuracy: 'DES + AST',
    damage: 8,
    hands: 2,
    range: 'ranged',
  }),
  weapon({
    name: 'Arco curto',
    page: 130,
    category: 'Arcos',
    cost: 200,
    accuracy: 'DES + DES',
    damage: 8,
    hands: 2,
    range: 'ranged',
  }),
  weapon({
    name: 'Ataque desarmado',
    page: 130,
    category: 'Luta',
    cost: null,
    accuracy: 'DES + VIG',
    damage: 0,
    hands: 1,
    range: 'melee',
    notes: 'Equipado em cada espaço de mão vazio.',
  }),
  weapon({
    name: 'Improvisada (CaC)',
    page: 130,
    category: 'Luta',
    cost: null,
    accuracy: 'DES + VIG',
    damage: 2,
    hands: 1,
    range: 'melee',
    notes: BREAKS,
  }),
  weapon({
    name: 'Soqueira de ferro',
    page: 130,
    category: 'Luta',
    cost: 150,
    accuracy: 'DES + VIG',
    damage: 6,
    hands: 1,
    range: 'melee',
  }),
  weapon({
    name: 'Adaga de aço',
    page: 130,
    category: 'Adagas',
    cost: 150,
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 4,
    hands: 1,
    range: 'melee',
  }),
  weapon({
    name: 'Pistola',
    page: 130,
    category: 'Armas de Fogo',
    cost: 250,
    accuracy: 'DES + AST',
    damage: 8,
    hands: 1,
    range: 'ranged',
    martial: true,
  }),
  weapon({
    name: 'Chicote de correntes',
    page: 130,
    category: 'Malhos',
    cost: 150,
    accuracy: 'DES + DES',
    damage: 8,
    hands: 2,
    range: 'melee',
  }),
  weapon({
    name: 'Martelo de ferro',
    page: 131,
    category: 'Armas Pesadas',
    cost: 200,
    accuracy: 'VIG + VIG',
    damage: 6,
    hands: 1,
    range: 'melee',
  }),
  weapon({
    name: 'Machado largo',
    page: 131,
    category: 'Armas Pesadas',
    cost: 250,
    accuracy: 'VIG + VIG',
    damage: 10,
    hands: 1,
    range: 'melee',
    martial: true,
  }),
  weapon({
    name: 'Machado de guerra',
    page: 131,
    category: 'Armas Pesadas',
    cost: 250,
    accuracy: 'VIG + VIG',
    damage: 14,
    hands: 2,
    range: 'melee',
    martial: true,
  }),
  weapon({
    name: 'Lança leve',
    page: 131,
    category: 'Lanças',
    cost: 200,
    accuracy: 'DES + VIG',
    damage: 8,
    hands: 1,
    range: 'melee',
    martial: true,
  }),
  weapon({
    name: 'Lança pesada',
    page: 131,
    category: 'Lanças',
    cost: 200,
    accuracy: 'DES + VIG',
    damage: 12,
    hands: 2,
    range: 'melee',
    martial: true,
  }),
  weapon({
    name: 'Espada de bronze',
    page: 131,
    category: 'Espadas',
    cost: 200,
    accuracy: 'DES + VIG',
    accuracyBonus: 1,
    damage: 6,
    hands: 1,
    range: 'melee',
    martial: true,
  }),
  weapon({
    name: 'Montante',
    page: 131,
    category: 'Espadas',
    cost: 200,
    accuracy: 'DES + VIG',
    accuracyBonus: 1,
    damage: 10,
    hands: 2,
    range: 'melee',
    martial: true,
  }),
  weapon({
    name: 'Katana',
    page: 131,
    category: 'Espadas',
    cost: 200,
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 10,
    hands: 2,
    range: 'melee',
    martial: true,
  }),
  weapon({
    name: 'Rapieira',
    page: 131,
    category: 'Espadas',
    cost: 200,
    accuracy: 'DES + AST',
    accuracyBonus: 1,
    damage: 6,
    hands: 1,
    range: 'melee',
    martial: true,
  }),
  weapon({
    name: 'Improvisada (dist.)',
    page: 131,
    category: 'Armas de Arremesso',
    cost: null,
    accuracy: 'DES + VIG',
    damage: 2,
    hands: 1,
    range: 'ranged',
    notes: BREAKS,
  }),
  weapon({
    name: 'Shuriken',
    page: 131,
    category: 'Armas de Arremesso',
    cost: 150,
    accuracy: 'DES + AST',
    damage: 4,
    hands: 1,
    range: 'ranged',
  }),
];
