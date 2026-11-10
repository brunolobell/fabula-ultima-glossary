export const ENTRY_TYPES = [
  'rule',
  'class',
  'skill',
  'heroic-skill',
  'spell',
  'equipment',
  'creature',
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
  'bestiary-vol-1',
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

/** The eight Species of a Creature (Livro Básico p. 304-305). */
export const SPECIES = [
  'construct',
  'demon',
  'elemental',
  'beast',
  'humanoid',
  'monster',
  'undead',
  'plant',
] as const;
export type Species = (typeof SPECIES)[number];

/** The nine damage types, in the order the bestiary prints them (p. 321). */
export const DAMAGE_TYPES = [
  'physical',
  'air',
  'bolt',
  'dark',
  'earth',
  'fire',
  'ice',
  'light',
  'poison',
] as const;
export type DamageType = (typeof DAMAGE_TYPES)[number];

/** How a Creature fares against a damage type; absent means no Affinity. */
export const AFFINITIES = [
  'vulnerable',
  'resistant',
  'immune',
  'absorbs',
] as const;
export type Affinity = (typeof AFFINITIES)[number];

export const RANKS = ['soldier', 'elite', 'champion'] as const;
export type Rank = (typeof RANKS)[number];

/** The six Quick Assembly Roles (Bestiary Vol. I); Livro Básico Creatures have none. */
export const ROLES = [
  'brute',
  'hunter',
  'mage',
  'saboteur',
  'sentinel',
  'support',
] as const;
export type Role = (typeof ROLES)[number];

/** An Attribute die as its number of sides, d6 to d12. */
export type Die = 6 | 8 | 10 | 12;
export const DICE: readonly Die[] = [6, 8, 10, 12];

export interface CreatureAttack {
  name: string;
  range: 'melee' | 'ranged';
  /** Precisão check, "DES + VIG" style. */
  accuracy: string;
  accuracyBonus: number;
  /** Added to the high roll (RA): damage is "RA + damage". Null when the attack does none. */
  damage: number | null;
  /** Null when the book prints no type because a rule sets it (a die roll, the Reader's choice). */
  damageType: DamageType | null;
  /** The attack's extra effects, in our own words. */
  effect?: string;
}

export interface CreatureSpell {
  name: string;
  /** PM cost as printed. */
  mpCost: string;
  target: string;
  duration: string;
  offensive: boolean;
  /** Magic check, "VIG + VON" style; only offensive spells have one. */
  accuracy?: string;
  accuracyBonus?: number;
  effect: string;
}

/** An "outra ação" or a "regra especial": a name and what it does, in our own words. */
export interface CreatureAbility {
  name: string;
  effect: string;
}

/** The stat block of a Creature; the API serves the `creature_stats` row as these `details`. */
export interface CreatureDetails {
  level: number;
  species: Species;
  rank: Rank;
  /** Quick Assembly Role; Bestiary Vol. I only. */
  role?: Role;
  /** Marked as a Villain; the Villain Tier is the Game Master's choice and is never stored. */
  villain: boolean;
  /** The English name, kept (and searchable) for Entries from the Bestiary Vol. I. */
  originalName?: string;
  /** "Traços típicos". */
  traits: string[];
  attributes: Record<AttributeCode, Die>;
  hp: number;
  /** Half of `hp`, rounded down. */
  crisis: number;
  mp: number;
  initiative: number;
  /** A fixed number (martial armor) or a bonus to the current Destreza die. */
  defense: { value: number; fixed: boolean };
  /** Always a bonus to the current Astúcia die. */
  magicDefense: number;
  affinities: Partial<Record<DamageType, Affinity>>;
  attacks: CreatureAttack[];
  spells: CreatureSpell[];
  otherActions: CreatureAbility[];
  specialRules: CreatureAbility[];
}

/** The stat block without its abilities, plus `hasSpells`: what the list endpoint sends. */
export type ServedCreatureSummary = Omit<
  CreatureDetails,
  'attacks' | 'spells' | 'otherActions' | 'specialRules'
> & { hasSpells: boolean };

/** The stat block as the entry endpoint sends it. */
export type ServedCreature = CreatureDetails & { hasSpells: boolean };

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

/** A choice the Reader makes while assembling a Creature (a damage type, a status effect…). */
export interface AssemblySlot {
  id: string;
  label: string;
  /** How many options to pick. */
  count: number;
  options: { value: string; label: string }[];
}

/** The Quick Assembly rules every Role shares (Bestiary Vol. I p. 25-29). */
export interface QuickAssemblyRuleDetails {
  forge: 'quick-assembly';
  /** The only levels a Quick Assembly Creature can have. */
  levels: number[];
  /** "Minor, heavy and massive" amounts, by the level they start at (p. 28). */
  amounts: {
    fromLevel: number;
    minor: number;
    heavy: number;
    massive: number;
  }[];
  /** An elite: Hit Points times `hpMultiplier`, Initiative up, Role Skills added. */
  elite: { hpMultiplier: number; initiative: number; roleSkills: number };
  /** A champion that replaces X soldiers: Hit Points and Initiative by X, Mana Points and Boss Skills as given. */
  champion: { mpMultiplier: number; bossSkills: number };
  /** Hit Points a soldier or elite may add instead of a customization. */
  extraHp: number;
  /** Ultima Points by Villain Tier (Livro Básico p. 101). */
  villainTiers: Record<'minor' | 'major' | 'supreme', number>;
}

/** One "choose one option" of a Role's basic attack. */
export interface AttackOption {
  id: string;
  label: string;
  /** Our own words; `{id}` is a slot choice and `{minor}` the minor amount of the level. */
  effect: string;
  slots?: AssemblySlot[];
  /** Picking one of these values gives the NPC one more Vulnerability. */
  extraVulnerability?: { slot: string; values: string[] };
}

/** A basic attack of a Role: the Reader picks range, formula, damage type and option. */
export interface RoleAttackTemplate {
  id: 'normal' | 'strong';
  name: string;
  ranges: ('melee' | 'ranged')[];
  /** Precisão formulas to pick from, "DES + VIG" style. */
  accuracies: string[];
  /** Added to the high roll (RA) before the level's extra damage. */
  damage: number;
  /** Always applies; may use slots. */
  effect?: string;
  slots?: AssemblySlot[];
  /** The Reader picks exactly one. */
  options?: AttackOption[];
}

/** What a level from 10 up adds to a Role. */
export interface LevelGrant {
  level: number;
  roleSkills?: number;
  /** Bonus to Defesa / Defesa Mágica from this level on. */
  defense?: number;
  magicDefense?: number;
  /** Bonus to Precisão checks from this level on. */
  accuracy?: number;
  /** Affinities the Reader must choose. */
  resistances?: number;
  immunities?: number;
  /** The Affinity picks cannot be physical damage. */
  notPhysical?: boolean;
  /** A special rule the Creature gets (our own words, may use slots). */
  rule?: string;
  slots?: AssemblySlot[];
}

/** The profile of one Role (Bestiary Vol. I p. 30-53). */
export interface QuickAssemblyRoleDetails {
  forge: 'quick-assembly-role';
  role: Role;
  /** The level 5 profile. */
  base: {
    attributes: Record<AttributeCode, Die>;
    hp: number;
    mp: number;
    initiative: number;
    defense: number;
    magicDefense: number;
    /** Vulnerabilities the Reader must give it. */
    vulnerabilities: number;
  };
  /** One row per level from 10: the dice that differ from the base, then the numbers. */
  progression: {
    level: number;
    attributes: Partial<Record<AttributeCode, Die>>;
    hp: number;
    mp: number;
    accuracy: number;
    extraDamage: number;
  }[];
  grants: LevelGrant[];
  attacks: RoleAttackTemplate[];
}

export type RuleDetails =
  | PlainRuleDetails
  | CustomWeaponRuleDetails
  | RareWeaponRuleDetails
  | QuickAssemblyRuleDetails
  | QuickAssemblyRoleDetails;

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
