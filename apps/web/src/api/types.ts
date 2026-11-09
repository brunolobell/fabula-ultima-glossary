// Mirrors apps/api/src/entries/entities/entry.entity.ts and entry-types.ts.
// Keep these in sync by hand when the entity changes.

export type EntryType =
  | 'rule'
  | 'class'
  | 'skill'
  | 'spell'
  | 'equipment'
  | 'guide';

export type EquipmentKind = 'weapon' | 'armor' | 'shield' | 'accessory';

export interface ClassDetails {
  otherNames: string[];
  freeBenefits: string[];
  quote: string | null;
}

export interface SkillDetails {
  classSlug: string;
  maxLevel: number;
}

export interface SpellDetails {
  classSlug: string;
  /** As printed, e.g. "20" or "10 × A" (10 per target). */
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
  category?: string;
  accuracy?: string;
  accuracyBonus?: number;
  damage?: number;
  damageType?: string;
  hands?: 1 | 2;
  range?: 'melee' | 'ranged';
  notes?: string | null;
}

export interface GuideStep {
  title: string;
  intro: string;
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

/** What list and search endpoints return: no body, no details. */
export interface EntrySummary {
  id: string;
  slug: string;
  name: string;
  type: EntryType;
  summary: string;
  /** Printed page in the Livro Básico; null only for guides. */
  page: number | null;
  tags: string[];
}

export interface Entry extends EntrySummary {
  /** Markdown; `[[slug]]` links to another entry. */
  body: string;
  details: DetailsByType[EntryType];
  createdAt: string;
  updatedAt: string;
}

/** A Class also carries its Skills then Spells; empty for other types. */
export interface EntryWithChildren extends Entry {
  children: Entry[];
}
