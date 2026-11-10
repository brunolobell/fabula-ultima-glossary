// Mirrors apps/api/src/entries/entities/entry.entity.ts and entry-types.ts.
// Keep these in sync by hand when the entity changes.

export type EntryType =
  | 'rule'
  | 'class'
  | 'skill'
  | 'heroic-skill'
  | 'spell'
  | 'equipment'
  | 'creature'
  | 'service'
  | 'transport'
  | 'guide';

export type EntrySource =
  | 'livro-basico'
  | 'high-fantasy'
  | 'natural-fantasy'
  | 'techno-fantasy'
  | 'bestiary-vol-1';

export type EquipmentKind =
  | 'weapon'
  | 'armor'
  | 'shield'
  | 'accessory'
  | 'artifact';

export interface ClassDetails {
  otherNames: string[];
  freeBenefits: string[];
  quote: string | null;
}

export interface SkillDetails {
  classSlug: string;
  maxLevel: number;
}

export interface HeroicSkillRequirements {
  /** Slugs of the Class entries whose Mastery counts; empty when open to everyone. */
  classes: string[];
  /** How many of `classes` must be mastered (1 = any of); 0 when `classes` is empty. */
  required: number;
  /** Slugs of Skill or Spell entries the character must also have. */
  alsoRequires: string[];
  note: string | null;
}

export interface HeroicSkillDetails {
  requirements: HeroicSkillRequirements;
  repeatable: boolean;
}

export interface SpellDetails {
  classSlug: string;
  /** As printed: "20", "10 × A" (10 per target) or "até 20". */
  mpCost: string;
  target: string;
  duration: string;
  offensive: boolean;
}

export interface EquipmentDetails {
  kind: EquipmentKind;
  rarity: 'basic' | 'rare';
  martial: boolean;
  cost: number | null;
  defense?: string;
  magicDefense?: string;
  initiative?: number;
  category?: string;
  accuracy?: string;
  accuracyBonus?: number;
  damage?: number;
  damageType?: string;
  hands?: 1 | 2;
  range?: 'melee' | 'ranged';
  notes?: string | null;
}

/** Where a Transport or a Travel Service can go. */
export type Medium =
  | 'land'
  | 'water'
  | 'submarine'
  | 'air'
  | 'planetary'
  | 'interplanetary'
  | 'interstellar';

export type ServiceGroup = 'settlement' | 'travel';

export interface ServiceDetails {
  group: ServiceGroup;
  /** Cost in zênites (z). */
  cost: number;
  /** Travel fares only. */
  medium?: Medium;
}

export type TransportClass = 'mount' | 'vehicle';

export interface TransportDistance {
  planetary: number | null;
  interplanetary: number | null;
  interstellar: number | null;
}

export interface TransportDetails {
  transportClass: TransportClass;
  medium: Medium;
  /** Cost in zênites (z). */
  cost: number;
  /** The most passengers it carries. */
  passengers: number;
  /** The book says "cerca de N" instead of an exact limit. */
  approximate?: boolean;
  distance: TransportDistance;
}

export type Species =
  | 'construct'
  | 'demon'
  | 'elemental'
  | 'beast'
  | 'humanoid'
  | 'monster'
  | 'undead'
  | 'plant';

export type DamageType =
  | 'physical'
  | 'air'
  | 'bolt'
  | 'dark'
  | 'earth'
  | 'fire'
  | 'ice'
  | 'light'
  | 'poison';

export type Affinity = 'vulnerable' | 'resistant' | 'immune' | 'absorbs';
export type Rank = 'soldier' | 'elite' | 'champion';
export type Role =
  | 'brute'
  | 'hunter'
  | 'mage'
  | 'saboteur'
  | 'sentinel'
  | 'support';
export type Die = 6 | 8 | 10 | 12;

export interface CreatureAttack {
  name: string;
  range: 'melee' | 'ranged';
  /** "DES + VIG" style. */
  accuracy: string;
  accuracyBonus: number;
  /** Added to the high roll (RA); null when the attack does no damage. */
  damage: number | null;
  /** Null when a rule sets the type instead of the book printing one. */
  damageType: DamageType | null;
  effect?: string;
}

export interface CreatureSpell {
  name: string;
  mpCost: string;
  target: string;
  duration: string;
  offensive: boolean;
  accuracy?: string;
  accuracyBonus?: number;
  effect: string;
}

export interface CreatureAbility {
  name: string;
  effect: string;
}

/** What the list endpoint sends for a Creature: the scalar stats, no abilities. */
export interface CreatureSummaryDetails {
  level: number;
  species: Species;
  rank: Rank;
  role?: Role;
  villain: boolean;
  /** English name of a Bestiary Vol. I Creature. */
  originalName?: string;
  traits: string[];
  attributes: { DES: Die; AST: Die; VIG: Die; VON: Die };
  hp: number;
  /** Half of `hp`, rounded down. */
  crisis: number;
  mp: number;
  initiative: number;
  /** A fixed number (martial armor) or a bonus to the current Destreza die. */
  defense: { value: number; fixed: boolean };
  /** A bonus to the current Astúcia die. */
  magicDefense: number;
  hasSpells: boolean;
  affinities: Partial<Record<DamageType, Affinity>>;
}

/** The whole stat block, as the entry endpoint sends it. */
export interface CreatureDetails extends CreatureSummaryDetails {
  attacks: CreatureAttack[];
  spells: CreatureSpell[];
  otherActions: CreatureAbility[];
  specialRules: CreatureAbility[];
}

export interface GuideStep {
  title: string;
  intro: string;
  entries: string[];
}

export interface GuideDetails {
  /** Position among the guides in the menu and on the home page. */
  order: number;
  steps: GuideStep[];
}

/** A Rule with no structured data (almost all of them). */
export interface PlainRuleDetails {
  forge?: undefined;
}

/** One option of the Custom Weapon list ("personalização"). */
export interface WeaponCustomization {
  id: string;
  name: string;
  summary: string;
  /** Choosing it makes the weapon martial. */
  martial: boolean;
  /** How many customization slots it takes. */
  slots: number;
  /** Zênites it adds to the cost. */
  cost: number;
  damage?: number;
  /** Extra damage instead of `damage` on a heavy weapon. */
  heavyDamage?: number;
  accuracy?: number;
  defense?: number;
  magicDefense?: number;
  chooseDamageType?: boolean;
  secondForm?: boolean;
  doubleAttack?: boolean;
  blockedCategories?: string[];
  /** Ids it cannot be combined with, in either direction. */
  blockedWith?: string[];
  note?: string;
}

/** Atlas "Armas Personalizadas" (High Fantasy p. 106-108). */
export interface CustomWeaponRuleDetails {
  forge: 'custom-weapon';
  base: {
    cost: number;
    damage: number;
    slots: number;
    /** "DES + AST" style. */
    accuracies: string[];
  };
  categories: string[];
  damageTypes: string[];
  customizations: WeaponCustomization[];
  notes: string[];
}

export interface RareAlteration {
  id: 'one-handed' | 'two-handed' | 'accuracy' | 'damage' | 'attributes';
  name: string;
  summary: string;
  cost: number;
  damage?: number;
  accuracy?: number;
}

export interface WeaponFeature {
  id: string;
  name: string;
  group: 'defensive' | 'offensive';
  cost: number;
  summary: string;
  defense?: number;
  magicDefense?: number;
}

/** Livro Básico "Como criar armas raras" (p. 266-269). */
export interface RareWeaponRuleDetails {
  forge: 'rare-weapon';
  damageTypes: string[];
  damageTypeCost: number;
  maxAlterations: number;
  /** A damage modifier at or above this makes the weapon martial. */
  martialDamage: number;
  /** Categories that cannot become two-handed. */
  oneHandedOnlyCategories: string[];
  /** Slugs of the basic weapons that cannot be a base. */
  excludedBases: string[];
  alterations: RareAlteration[];
  features: WeaponFeature[];
  notes: string[];
}

export type RuleDetails =
  | PlainRuleDetails
  | CustomWeaponRuleDetails
  | RareWeaponRuleDetails;

export interface DetailsByType {
  rule: RuleDetails;
  class: ClassDetails;
  skill: SkillDetails;
  'heroic-skill': HeroicSkillDetails;
  spell: SpellDetails;
  equipment: EquipmentDetails;
  creature: CreatureDetails;
  service: ServiceDetails;
  transport: TransportDetails;
  guide: GuideDetails;
}

/** What list and search endpoints return: everything but the body. */
export interface EntrySummary {
  id: string;
  slug: string;
  name: string;
  type: EntryType;
  summary: string;
  /** Book that `page` refers to. */
  source: EntrySource;
  /** Printed page in `source`; null only for guides. */
  page: number | null;
  tags: string[];
  details: DetailsByType[EntryType];
}

export interface Entry extends EntrySummary {
  /** Markdown; `[[slug]]` links to another entry. */
  body: string;
  createdAt: string;
  updatedAt: string;
}

/** A Class also carries its Skills then Spells; empty for other types. */
export interface EntryWithChildren extends Entry {
  children: Entry[];
}
