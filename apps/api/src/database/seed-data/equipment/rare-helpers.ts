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

/** Books that print rare items (the Bestiary Vol. I prints three rewards). */
export type RareBook =
  | 'livro-basico'
  | 'high-fantasy'
  | 'natural-fantasy'
  | 'techno-fantasy'
  | 'bestiary-vol-1';

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
  /**
   * An Atlas basic Custom Weapon example (300 to 400z): rarity `custom`, so the
   * Weapon Forge does not offer it as a base weapon.
   */
  custom?: boolean;
  /** Slug of the basic Custom Weapon this Rare Evolution upgrades; adds a link. */
  evolutionOf?: string;
  /** Form II of a two-Form (Mutável) weapon, as Markdown with its own stat line. */
  formII?: string;
  /** Extra Markdown after the generated notes. */
  body?: string;
}

export const rareWeapon = (book: RareBook, w: RareWeapon): SeedEntry => {
  const martial = w.martial ?? false;
  const bonus = w.accuracyBonus ? ` +${w.accuracyBonus}` : '';
  const grip = w.module
    ? w.range === 'melee'
      ? 'corpo a corpo'
      : 'à distância'
    : `${w.hands === 1 ? 'uma mão' : 'duas mãos'}, ${
        w.range === 'melee' ? 'corpo a corpo' : 'à distância'
      }`;
  const kind = w.module
    ? 'Módulo de arma raro'
    : w.custom
      ? 'Arma personalizada (exemplo)'
      : w.evolutionOf
        ? 'Arma rara (evolução rara)'
        : 'Arma rara';
  const body = [
    martial ? MARTIAL_NOTE : '',
    w.evolutionOf
      ? `Evolução rara de [[${w.evolutionOf}]], a arma personalizada básica da mesma família.`
      : '',
    w.formII ? `**Forma II:** ${w.formII}` : '',
    w.body ?? '',
  ]
    .filter(Boolean)
    .join('\n\n');
  return {
    type: 'equipment',
    source: book,
    name: w.name,
    ...(w.slug ? { slug: w.slug } : {}),
    page: w.page,
    summary: `${kind}${martial ? ' marcial' : ''} (${CATEGORY[w.category]}), ${grip}. Precisão (${w.accuracy})${bonus}, dano (RA + ${w.damage}) ${w.damageType}, ${zenites(w.cost)}. ${w.effect}`,
    body,
    tags: [
      'equipamento',
      'arma',
      ...(w.custom ? ['arma personalizada'] : ['raro']),
      ...(w.evolutionOf ? ['evolução rara'] : []),
      ...(w.module ? ['módulo'] : []),
      CATEGORY[w.category].toLowerCase(),
    ],
    details: {
      kind: 'weapon',
      rarity: w.custom ? 'custom' : 'rare',
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
  /** Extra Markdown after the generated notes. */
  body?: string;
}

const initiativeLabel = (n: number) =>
  n === 0 ? 'sem modificador' : String(n);

export const rareArmor = (book: RareBook, a: RareArmor): SeedEntry => {
  const martial = a.martial ?? false;
  return {
    type: 'equipment',
    source: book,
    name: a.name,
    ...(a.slug ? { slug: a.slug } : {}),
    page: a.page,
    summary: `Armadura rara${martial ? ' marcial' : ''}. Defesa ${a.defense}, Def. Mágica ${a.magicDefense ?? 'sem bônus'}, Iniciativa ${initiativeLabel(a.initiative)}, ${zenites(a.cost)}. ${a.effect}`,
    body: [martial ? MARTIAL_NOTE : '', a.body ?? '']
      .filter(Boolean)
      .join('\n\n'),
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
  /** Extra Markdown after the generated notes. */
  body?: string;
}

export const rareShield = (book: RareBook, s: RareShield): SeedEntry => {
  const martial = s.martial ?? false;
  return {
    type: 'equipment',
    source: book,
    name: s.name,
    ...(s.slug ? { slug: s.slug } : {}),
    page: s.page,
    summary: `${s.module ? 'Módulo de escudo raro' : 'Escudo raro'}${martial ? ' marcial' : ''}. Defesa ${s.defense}, Def. Mágica ${s.magicDefense ?? 'sem bônus'}, ${zenites(s.cost)}. ${s.effect}`,
    body: [martial ? MARTIAL_NOTE : '', s.body ?? '']
      .filter(Boolean)
      .join('\n\n'),
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
  /** Extra Markdown (for example a link to the feature rule). */
  body?: string;
}

export const rareAccessory = (book: RareBook, a: RareAccessory): SeedEntry => ({
  type: 'equipment',
  source: book,
  name: a.name,
  ...(a.slug ? { slug: a.slug } : {}),
  page: a.page,
  summary: `Acessório raro, ${zenites(a.cost)}. ${a.effect}`,
  body: a.body ?? '',
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

export const artifact = (book: RareBook, a: Artifact): SeedEntry => ({
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
