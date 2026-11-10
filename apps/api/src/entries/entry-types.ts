export const ENTRY_TYPES = [
  'rule',
  'class',
  'skill',
  'heroic-skill',
  'spell',
  'equipment',
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

export type RuleDetails = Record<string, never>;

export interface DetailsByType {
  rule: RuleDetails;
  class: ClassDetails;
  skill: SkillDetails;
  'heroic-skill': HeroicSkillDetails;
  spell: SpellDetails;
  equipment: EquipmentDetails;
  guide: GuideDetails;
}
