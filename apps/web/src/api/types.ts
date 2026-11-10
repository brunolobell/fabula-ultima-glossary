// Mirrors apps/api/src/entries/entities/entry.entity.ts and entry-types.ts.
// Keep these in sync by hand when the entity changes.

export type EntryType =
  | 'rule'
  | 'class'
  | 'skill'
  | 'heroic-skill'
  | 'spell'
  | 'equipment'
  | 'service'
  | 'transport'
  | 'guide';

export type EntrySource =
  | 'livro-basico'
  | 'high-fantasy'
  | 'natural-fantasy'
  | 'techno-fantasy';

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

export type RuleDetails = Record<string, never>;

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
