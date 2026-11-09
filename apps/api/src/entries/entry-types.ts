export const ENTRY_TYPES = [
  'rule',
  'class',
  'skill',
  'spell',
  'equipment',
  'guide',
] as const;
export type EntryType = (typeof ENTRY_TYPES)[number];

export const EQUIPMENT_KINDS = [
  'weapon',
  'armor',
  'shield',
  'accessory',
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

export interface SpellDetails {
  /** Slug of the owning Class entry. */
  classSlug: string;
  /** PM cost as printed, e.g. "20" or "10 × A" (10 per target). */
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
  steps: GuideStep[];
}

export type RuleDetails = Record<string, never>;

export interface DetailsByType {
  rule: RuleDetails;
  class: ClassDetails;
  skill: SkillDetails;
  spell: SpellDetails;
  equipment: EquipmentDetails;
  guide: GuideDetails;
}
