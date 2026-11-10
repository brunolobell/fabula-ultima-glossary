export const ENTRY_TYPES = [
  'rule',
  'class',
  'skill',
  'heroic-skill',
  'spell',
  'equipment',
  'service',
  'transport',
  'guide',
] as const;
export type EntryType = (typeof ENTRY_TYPES)[number];

/** The book an Entry's Page Reference points into. */
export const ENTRY_SOURCES = [
  'livro-basico',
  'high-fantasy',
  'natural-fantasy',
  'techno-fantasy',
] as const;
export type EntrySource = (typeof ENTRY_SOURCES)[number];

export const EQUIPMENT_KINDS = [
  'weapon',
  'armor',
  'shield',
  'accessory',
  'artifact',
] as const;
export type EquipmentKind = (typeof EQUIPMENT_KINDS)[number];

export const ATTRIBUTES = ['DES', 'VIG', 'AST', 'VON'] as const;
export type AttributeCode = (typeof ATTRIBUTES)[number];

export interface ClassDetails {
  /** Alternative names the book lists for the Class ("Outros nomes"). */
  otherNames: string[];
  /** The Class's "Benefícios Iniciais", in our own words. */
  freeBenefits: string[];
  /** The Class's epigraph. */
  quote: string | null;
}

export interface SkillDetails {
  /** Slug of the owning Class entry. */
  classSlug: string;
  /** How many times the Skill can be taken (its maximum NP); 1 if not repeatable. */
  maxLevel: number;
}

/** What a Heroic Skill demands before it can be taken. */
export interface HeroicSkillRequirements {
  /** Slugs of the Class entries whose Mastery counts; empty when open to everyone. */
  classes: string[];
  /** How many of `classes` must be mastered: 1 for "any of", `classes.length` for "all of", 2 for "two of". 0 when `classes` is empty. */
  required: number;
  /** Slugs of Skill or Spell entries the character must also have. */
  alsoRequires: string[];
  /** Any other condition (a minimum level, "know two offensive spells"), in our own words. */
  note: string | null;
}

export interface HeroicSkillDetails {
  requirements: HeroicSkillRequirements;
  /** Whether the same Heroic Skill can be taken more than once. */
  repeatable: boolean;
}

export interface SpellDetails {
  /** Slug of the owning Class entry. */
  classSlug: string;
  /** PM cost as printed: "20", "10 × A" (10 per target) or "até 20". */
  mpCost: string;
  target: string;
  duration: string;
  offensive: boolean;
}

export interface EquipmentDetails {
  kind: EquipmentKind;
  rarity: 'basic' | 'rare';
  /** Marked with the "marcial" icon: only some Classes can equip it. */
  martial: boolean;
  /** Cost in zênites (z); null when the item has none. */
  cost: number | null;
  /** Armor and shields: Defesa as printed ("12", "Dado de DES +1", "+2"). */
  defense?: string;
  /** Armor and shields: Defesa Mágica as printed; absent when the item gives none. */
  magicDefense?: string;
  /** Armor only: Iniciativa modifier (negative or 0). */
  initiative?: number;
  /** Weapons only. */
  category?: string;
  accuracy?: string;
  accuracyBonus?: number;
  /** Added to the high roll (RA): damage is "RA + damage". */
  damage?: number;
  damageType?: string;
  hands?: 1 | 2;
  range?: 'melee' | 'ranged';
  /** Special characteristics beyond the standard profile. */
  notes?: string | null;
}

export interface GuideStep {
  title: string;
  intro: string;
  /** Slugs of the entries to read at this step. */
  entries: string[];
}

export interface GuideDetails {
  /** Position among the guides in the menu and on the home page. */
  order: number;
  steps: GuideStep[];
}

/** Where a Transport or a Travel Service can go (the "meio"). */
export const MEDIUMS = [
  'land',
  'water',
  'submarine',
  'air',
  'planetary',
  'interplanetary',
  'interstellar',
] as const;
export type Medium = (typeof MEDIUMS)[number];

export const SERVICE_GROUPS = ['settlement', 'travel'] as const;
export type ServiceGroup = (typeof SERVICE_GROUPS)[number];

export interface ServiceDetails {
  /** `settlement`: PI recharge and rest. `travel`: a fare for one day of Travel. */
  group: ServiceGroup;
  /** Cost in zênites (z). */
  cost: number;
  /** Travel fares only: where the fare takes the passenger. */
  medium?: Medium;
}

export const TRANSPORT_CLASSES = ['mount', 'vehicle'] as const;
export type TransportClass = (typeof TRANSPORT_CLASSES)[number];

/** How many times farther a day of Travel goes, by scale; null where the Transport cannot go. */
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
  /** The most passengers it carries (the book says "um ou dois", "cerca de seis"). */
  passengers: number;
  /** The book gives `passengers` as "cerca de N" instead of an exact limit. */
  approximate?: boolean;
  distance: TransportDistance;
}

/** A Rule with no structured data (almost all of them). */
export interface PlainRuleDetails {
  forge?: undefined;
}

/** The weapon categories of the Atlas "Armas Personalizadas" rule, as the app names them. */
export const WEAPON_CATEGORIES = [
  'Adagas',
  'Armas Arcanas',
  'Armas de Arremesso',
  'Armas de Fogo',
  'Armas Pesadas',
  'Arcos',
  'Espadas',
  'Lanças',
  'Luta',
  'Malhos',
] as const;

/** The damage types a weapon can have besides "físico". */
export const WEAPON_DAMAGE_TYPES = [
  'ar',
  'fogo',
  'gelo',
  'luz',
  'raio',
  'terra',
  'trevas',
  'veneno',
] as const;

/** One option of the Custom Weapon list ("personalização"). Numbers are as printed. */
export interface WeaponCustomization {
  id: string;
  name: string;
  /** Our own words. */
  summary: string;
  /** The "marcial" icon: choosing it makes the weapon martial. */
  martial: boolean;
  /** How many of the weapon's customization slots it takes. */
  slots: number;
  /** Zênites it adds to the weapon's cost. */
  cost: number;
  /** Extra damage. */
  damage?: number;
  /** Extra damage instead of `damage` on a heavy weapon ("Armas Pesadas"). */
  heavyDamage?: number;
  /** Bonus to the Precisão check. */
  accuracy?: number;
  defense?: number;
  magicDefense?: number;
  /** The Reader picks the damage type (it replaces "físico"). */
  chooseDamageType?: boolean;
  /** Adds a second form, built as another Custom Weapon. */
  secondForm?: boolean;
  /** The Ataque action makes two attacks. */
  doubleAttack?: boolean;
  /** Categories (from WEAPON_CATEGORIES) that cannot take it. */
  blockedCategories?: string[];
  /** Ids of customizations it cannot be combined with (in either direction). */
  blockedWith?: string[];
  /** A reminder shown while it is chosen. */
  note?: string;
}

/** The Atlas "Armas Personalizadas" rule (Atlas High Fantasy p. 106-108; reprinted in the other two). */
export interface CustomWeaponRuleDetails {
  forge: 'custom-weapon';
  /** How every Custom Weapon starts. */
  base: {
    cost: number;
    /** Damage is "RA + damage", physical. */
    damage: number;
    /** Customization slots. */
    slots: number;
    /** The two Precisão formulas to choose from, "DES + AST" style. */
    accuracies: string[];
  };
  categories: string[];
  damageTypes: string[];
  customizations: WeaponCustomization[];
  /** Reminders for the Forge, in our own words. */
  notes: string[];
}

/** A step-3 change of the Livro Básico "Como criar armas raras" (p. 268). */
export interface RareAlteration {
  id: 'one-handed' | 'two-handed' | 'accuracy' | 'damage' | 'attributes';
  name: string;
  summary: string;
  /** Zênites added (for `attributes`, only when the new formula uses one Atributo). */
  cost: number;
  damage?: number;
  accuracy?: number;
}

/** One line of the Livro Básico weapon-feature table (p. 269). */
export interface WeaponFeature {
  id: string;
  name: string;
  group: 'defensive' | 'offensive';
  /** Zênites added to the weapon's cost. */
  cost: number;
  summary: string;
  defense?: number;
  magicDefense?: number;
}

/** The Livro Básico "Como criar armas raras" rule (p. 266-269). */
export interface RareWeaponRuleDetails {
  forge: 'rare-weapon';
  damageTypes: string[];
  /** Cost of a damage type other than physical. */
  damageTypeCost: number;
  /** How many step-3 alterations the printed rule allows. */
  maxAlterations: number;
  /** A damage modifier at or above this makes the weapon martial. */
  martialDamage: number;
  /** Categories that cannot be turned into two-handed weapons. */
  oneHandedOnlyCategories: string[];
  /** Slugs of the basic weapons that cannot be a base (unarmed, improvised). */
  excludedBases: string[];
  alterations: RareAlteration[];
  features: WeaponFeature[];
  notes: string[];
}

export type RuleDetails =
  PlainRuleDetails | CustomWeaponRuleDetails | RareWeaponRuleDetails;

export interface DetailsByType {
  rule: RuleDetails;
  class: ClassDetails;
  skill: SkillDetails;
  'heroic-skill': HeroicSkillDetails;
  spell: SpellDetails;
  equipment: EquipmentDetails;
  service: ServiceDetails;
  transport: TransportDetails;
  guide: GuideDetails;
}
