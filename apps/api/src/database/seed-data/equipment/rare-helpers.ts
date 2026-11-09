import { AttributeCode } from '../../../entries/entry-types';
import { SeedEntry } from '../types';

type Accuracy = `${AttributeCode} + ${AttributeCode}`;

/** Weapon categories as the supplements print them, mapped to the app's plural names. */
const CATEGORY = {
  adaga: 'Adagas',
  arcana: 'Armas Arcanas',
  arco: 'Arcos',
  arremessavel: 'Armas de Arremesso',
  fogo: 'Armas de Fogo',
  luta: 'Luta',
  malho: 'Malhos',
  pesada: 'Armas Pesadas',
  espada: 'Espadas',
  lanca: 'Lanças',
} as const;
export type WeaponCategory = keyof typeof CATEGORY;

const MARTIAL_NOTE =
  'Item **marcial**: só pode ser equipado por quem tem a classe adequada (veja [[equipamento]]).';

const zenites = (cost: number) => `${cost.toLocaleString('pt-BR')}z`;

export interface RareWeapon {
  name: string;
  /** Set only to resolve a slug collision. */
  slug?: string;
  page: number;
  cost: number;
  category: WeaponCategory;
  accuracy: Accuracy;
  accuracyBonus?: number;
  damage: number;
  damageType: string;
  hands: 1 | 2;
  range: 'melee' | 'ranged';
  martial?: boolean;
  /** The item's special effect, in our own words. */
  effect: string;
  /** A Piloto vehicle module rather than a hand-held weapon. */
  module?: boolean;
}

export const rareWeapon = (
  book: 'high-fantasy' | 'natural-fantasy' | 'techno-fantasy',
  w: RareWeapon,
): SeedEntry => {
  const martial = w.martial ?? false;
  const bonus = w.accuracyBonus ? ` +${w.accuracyBonus}` : '';
  const grip = w.module
    ? w.range === 'melee'
      ? 'corpo a corpo'
      : 'à distância'
    : `${w.hands === 1 ? 'uma mão' : 'duas mãos'}, ${
        w.range === 'melee' ? 'corpo a corpo' : 'à distância'
      }`;
  const kind = w.module ? 'Módulo de arma raro' : 'Arma rara';
  return {
    type: 'equipment',
    source: book,
    name: w.name,
    ...(w.slug ? { slug: w.slug } : {}),
    page: w.page,
    summary: `${kind}${martial ? ' marcial' : ''} (${CATEGORY[w.category]}), ${grip}. Precisão (${w.accuracy})${bonus}, dano (RA + ${w.damage}) ${w.damageType}, ${zenites(w.cost)}. ${w.effect}`,
    body: martial ? MARTIAL_NOTE : '',
    tags: [
      'equipamento',
      'arma',
      'raro',
      ...(w.module ? ['módulo'] : []),
      CATEGORY[w.category].toLowerCase(),
    ],
    details: {
      kind: 'weapon',
      rarity: 'rare',
      martial,
      cost: w.cost,
      category: CATEGORY[w.category],
      accuracy: w.accuracy,
      ...(w.accuracyBonus ? { accuracyBonus: w.accuracyBonus } : {}),
      damage: w.damage,
      damageType: w.damageType,
      hands: w.hands,
      range: w.range,
      notes: w.effect,
    },
  };
};

export interface RareArmor {
  name: string;
  slug?: string;
  page: number;
  cost: number;
  defense: string;
  magicDefense?: string;
  /** Iniciativa modifier; 0 when the book prints a dash. */
  initiative: number;
  martial?: boolean;
  effect: string;
}

const initiativeLabel = (n: number) =>
  n === 0 ? 'sem modificador' : String(n);

export const rareArmor = (
  book: 'high-fantasy' | 'natural-fantasy' | 'techno-fantasy',
  a: RareArmor,
): SeedEntry => {
  const martial = a.martial ?? false;
  return {
    type: 'equipment',
    source: book,
    name: a.name,
    ...(a.slug ? { slug: a.slug } : {}),
    page: a.page,
    summary: `Armadura rara${martial ? ' marcial' : ''}. Defesa ${a.defense}, Def. Mágica ${a.magicDefense ?? 'sem bônus'}, Iniciativa ${initiativeLabel(a.initiative)}, ${zenites(a.cost)}. ${a.effect}`,
    body: martial ? MARTIAL_NOTE : '',
    tags: ['equipamento', 'armadura', 'raro'],
    details: {
      kind: 'armor',
      rarity: 'rare',
      martial,
      cost: a.cost,
      defense: a.defense,
      ...(a.magicDefense ? { magicDefense: a.magicDefense } : {}),
      initiative: a.initiative,
      notes: a.effect,
    },
  };
};

export interface RareShield {
  name: string;
  slug?: string;
  page: number;
  cost: number;
  defense: string;
  magicDefense?: string;
  martial?: boolean;
  effect: string;
  /** A Piloto vehicle module that acts as a shield. */
  module?: boolean;
}

export const rareShield = (
  book: 'high-fantasy' | 'natural-fantasy' | 'techno-fantasy',
  s: RareShield,
): SeedEntry => {
  const martial = s.martial ?? false;
  return {
    type: 'equipment',
    source: book,
    name: s.name,
    ...(s.slug ? { slug: s.slug } : {}),
    page: s.page,
    summary: `${s.module ? 'Módulo de escudo raro' : 'Escudo raro'}${martial ? ' marcial' : ''}. Defesa ${s.defense}, Def. Mágica ${s.magicDefense ?? 'sem bônus'}, ${zenites(s.cost)}. ${s.effect}`,
    body: martial ? MARTIAL_NOTE : '',
    tags: ['equipamento', 'escudo', 'raro', ...(s.module ? ['módulo'] : [])],
    details: {
      kind: 'shield',
      rarity: 'rare',
      martial,
      cost: s.cost,
      defense: s.defense,
      ...(s.magicDefense ? { magicDefense: s.magicDefense } : {}),
      notes: s.effect,
    },
  };
};

export interface RareAccessory {
  name: string;
  slug?: string;
  page: number;
  cost: number;
  effect: string;
}

export const rareAccessory = (
  book: 'high-fantasy' | 'natural-fantasy' | 'techno-fantasy',
  a: RareAccessory,
): SeedEntry => ({
  type: 'equipment',
  source: book,
  name: a.name,
  ...(a.slug ? { slug: a.slug } : {}),
  page: a.page,
  summary: `Acessório raro, ${zenites(a.cost)}. ${a.effect}`,
  body: '',
  tags: ['equipamento', 'acessório', 'raro'],
  details: {
    kind: 'accessory',
    rarity: 'rare',
    martial: false,
    cost: a.cost,
    notes: a.effect,
  },
});

export interface Artifact {
  name: string;
  slug?: string;
  page: number;
  /** One or two sentences, in our own words. */
  summary: string;
  body?: string;
}

export const artifact = (
  book: 'high-fantasy' | 'natural-fantasy' | 'techno-fantasy',
  a: Artifact,
): SeedEntry => ({
  type: 'equipment',
  source: book,
  name: a.name,
  ...(a.slug ? { slug: a.slug } : {}),
  page: a.page,
  summary: a.summary,
  body: a.body ?? '',
  tags: ['equipamento', 'artefato', 'raro'],
  details: {
    kind: 'artifact',
    rarity: 'rare',
    martial: false,
    cost: null,
  },
});
