export const ENTRY_TYPES = [
  'rule',
  'class',
  'skill',
  'heroic-skill',
  'peculiarity',
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

export interface PeculiarityDetails {
  /** What a character needs to take it ("Tema Dúvida"), in our own words; null when open to all. */
  requirement: string | null;
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

/** The marks of a Bestiary Vol. I Creature: fights alone, one of a kind, part of a bigger creature. */
export const CREATURE_FLAGS = ['solo', 'unique', 'part'] as const;
export type CreatureFlag = (typeof CREATURE_FLAGS)[number];

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
  /** A champion replaces this many soldiers ("Campeão 3"); Bestiary Vol. I only. */
  championX?: number;
  /** "Solitário", "Único", "Parte"; Bestiary Vol. I only. */
  flags?: CreatureFlag[];
  /** Marked as a Villain; the Villain Tier is the Game Master's choice and is never stored. */
  villain: boolean;
  /** The English name, kept (and searchable) for Entries from the Bestiary Vol. I. */
  originalName?: string;
  /** Slug of the Creature Group this Creature belongs to (a stat-less Creature Entry). */
  groupSlug?: string;
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

/**
 * A Creature Group ("grupo de criaturas"): a Creature Entry with no stat block that
 * gathers the Creatures pointing to it by `groupSlug`. Stored in `entries.details`.
 */
export interface CreatureGroupDetails {
  group: true;
}

export const isCreatureGroup = (
  details: object,
): details is CreatureGroupDetails =>
  (details as { group?: unknown }).group === true;

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
  /** How many options to pick (at most). */
  count: number;
  /** How many are required; defaults to `count`. "Choose one or two" is count 2, min 1. */
  min?: number;
  options: { value: string; label: string }[];
}

/** One option a Species offers under Quick Assembly (Bestiary Vol. I p. 70-73). */
export interface SpeciesOption {
  id: string;
  label: string;
  kind: 'hp' | 'spell' | 'rule' | 'role-skill' | 'resistances' | 'absorb';
  /** How many times it may be taken; once when absent. */
  max?: number;
  /** `hp`: how many Hit Points it adds. `resistances`: how many Resistances it buys. */
  amount?: number;
  /** A special rule the option adds (flying, thorns, a bonus, an immunity). */
  rule?: { name: string; text: string };
  /** `spell`: the spells it offers, with +10 PM. */
  spells?: SpellGrant;
  /** `absorb`: swaps a Resistance or an Immunity for an Absorption. */
  swaps?: 'resistant' | 'immune';
  /** `absorb`: the damage type it swaps, when the book fixes it. */
  swapType?: DamageType;
  slots?: AssemblySlot[];
}

/** The rule of one Species under Quick Assembly; it replaces the Livro Básico's (p. 304-305). */
export interface SpeciesRule {
  species: Species;
  /** What the Species always has. */
  affinities: Partial<Record<DamageType, Affinity>>;
  statusImmunities: string[];
  /** Resistances / Immunities to damage types of the Reader's choice. */
  resistances?: number;
  immunities?: number;
  /** The Reader picks one Vulnerability from these types. */
  vulnerability?: DamageType[];
  /** How many options it takes. */
  picks: number;
  /** An optional extra Vulnerability that buys more options. */
  extra?: { vulnerability: DamageType[]; picks: number };
  note?: string;
  options: SpeciesOption[];
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
  /** The Negative Skills (p. 68-69): a drawback that buys one more Role Skill or Boss Skill. */
  negativeSkills: RoleSkill[];
  /** The Boss Skills (p. 54-67) a champion takes, and the groups the book sorts them in. */
  bossSkills: RoleSkill[];
  bossGroups: { id: string; name: string; summary: string }[];
  /** The eight Species rules (p. 70-73). */
  species: SpeciesRule[];
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

/** One spell of the Livro Básico list of NPC spells (p. 310-311). */
export interface NpcSpell {
  id: string;
  name: string;
  /** PM cost as printed: "20", "10 × A". */
  mpCost: string;
  target: string;
  duration: string;
  offensive: boolean;
  /** Added to the high roll (RA) in the text's `{damage}`; fixed damage when `flat`. */
  damage?: number;
  flat?: boolean;
  /** Our own words; `{id}` is a slot choice, `{damage}` the damage with the level's extra. */
  effect: string;
  slots?: AssemblySlot[];
}

/** The Rule "Feitiços de NPC": the spells a Creature may learn, as the book prints them. */
export interface NpcSpellsRuleDetails {
  forge: 'npc-spells';
  spells: NpcSpell[];
}

/** A spell a Skill offers: from the NPC list or a Class spell (by its slug). */
export interface SpellRef {
  kind: 'npc' | 'class';
  /** The NPC spell's id, or the Class spell Entry's slug. */
  id: string;
  /** The Portuguese name, for the Role page. */
  name: string;
  /** Only from this level on. */
  minLevel?: number;
}

/** "Learns two spells, or one spell and +10 PM": what a Skill gives and the list it picks from. */
export interface SpellGrant {
  from: SpellRef[];
  options: { id: string; label: string; count: number; mp: number }[];
}

/** Where one effect of a Role Skill lands on the stat block. */
export interface SkillEffect {
  /** A special rule, an "outra ação", or a change to the normal or strong attack. */
  to: 'rule' | 'action' | 'normal' | 'strong';
  /** Names the rule or action; defaults to the Skill's name. */
  name?: string;
  /** Our own words; `{id}` is a slot choice, `{minor}`, `{heavy}` and `{massive}` the level's amounts. */
  text: string;
  /** For an effect on the strong attack: it becomes ranged / uses this Precisão formula. */
  patch?: { range?: 'melee' | 'ranged'; accuracy?: string };
}

/** One Role Skill or customization of a Role (Bestiary Vol. I p. 30-53). */
export interface RoleSkill {
  id: string;
  name: string;
  effects: SkillEffect[];
  slots?: AssemblySlot[];
  /** Only these Ranks may take it. */
  ranks?: Rank[];
  /** A basic attack the Skill adds (the hunter's and the saboteur's strong attack). */
  addsAttack?: RoleAttackTemplate;
  /** Affinities the Reader must also choose. */
  resistances?: number;
  immunities?: number;
  notPhysical?: boolean;
  extraVulnerabilities?: number;
  /** Spells the Skill teaches. */
  spells?: SpellGrant;
  /** What a Negative Skill or Boss Skill is meant for, as the book says. */
  advice?: string;
  /** The group of a Boss Skill (see `QuickAssemblyRuleDetails.bossGroups`). */
  group?: string;
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
  /** The Role Skills a Creature of this Role can take (spells come in a later step). */
  skills: RoleSkill[];
  /** What a soldier or elite may add: the "customization" list. */
  customizations: RoleSkill[];
  /** What the customization slot gives instead of one of those: more Hit Points, an Immunity, or a Role Skill. */
  extra: 'hp' | 'immunity' | 'skill';
  /** The mage and the support start with a choice of spells. */
  baseSpells?: SpellGrant;
}

export type RuleDetails =
  | PlainRuleDetails
  | CustomWeaponRuleDetails
  | RareWeaponRuleDetails
  | QuickAssemblyRuleDetails
  | QuickAssemblyRoleDetails
  | NpcSpellsRuleDetails;

/** Rules whose `details` are too big for the list: it sends only `{ forge }`. */
export const HEAVY_FORGES = [
  'quick-assembly',
  'quick-assembly-role',
  'npc-spells',
] as const;
export interface HeavyRuleMarker {
  forge: (typeof HEAVY_FORGES)[number];
}
export const isHeavyRule = (
  details: object,
): details is { forge: HeavyRuleMarker['forge'] } =>
  HEAVY_FORGES.includes((details as HeavyRuleMarker).forge);

export interface DetailsByType {
  rule: RuleDetails;
  class: ClassDetails;
  skill: SkillDetails;
  'heroic-skill': HeroicSkillDetails;
  peculiarity: PeculiarityDetails;
  spell: SpellDetails;
  equipment: EquipmentDetails;
  creature: CreatureDetails | CreatureGroupDetails;
  service: ServiceDetails;
  transport: TransportDetails;
  guide: GuideDetails;
}
