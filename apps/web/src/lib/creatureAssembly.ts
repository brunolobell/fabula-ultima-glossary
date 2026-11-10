import type {
  AssemblySlot,
  CreatureAttack,
  CreatureDetails,
  DamageType,
  Die,
  LevelGrant,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  Rank,
  RoleAttackTemplate,
  Species,
  VillainTier,
} from '../api/types';
import { DAMAGE_LABEL } from './creatures';

/**
 * Quick Assembly (Bestiary Vol. I p. 25-53) as a pure function. The numbers come
 * from the Rules (`QuickAssemblyRuleDetails`, one `QuickAssemblyRoleDetails` per
 * Role); nothing is hard-coded here.
 */

/** Slot id to the values the Reader picked. */
export type Choices = Record<string, string[]>;

export interface AttackChoice {
  /** Defaults to the Role's name for the attack. */
  name?: string;
  range: 'melee' | 'ranged';
  accuracy: string;
  damageType: DamageType;
  /** The id of the option picked, when the Role's attack has options. */
  option?: string;
  /** The attack's own slots and the picked option's slots. */
  choices: Choices;
}

export interface AssemblyInput {
  name: string;
  level: number;
  rank: Rank;
  /** How many soldiers a champion replaces; used only for a champion. */
  championX: number;
  /** +extraHp Hit Points instead of a customization (soldier or elite). */
  extraHp: boolean;
  species: Species;
  traits: string[];
  villain: boolean;
  tier: VillainTier;
  vulnerabilities: DamageType[];
  resistances: DamageType[];
  immunities: DamageType[];
  /** By template id (`normal`, `strong`). */
  attacks: Partial<Record<RoleAttackTemplate['id'], AttackChoice>>;
  /** The Reader's choices for the slots of the level grants. */
  choices: Choices;
}

export interface AssemblyResult {
  name: string;
  details: CreatureDetails;
  /** Null unless the Creature is a Villain. */
  ultimaPoints: number | null;
  /** Role Skills the Creature gets to pick (rank and level). */
  roleSkills: number;
  bossSkills: number;
  /** What the Reader still has to choose for the Affinities. */
  required: {
    vulnerabilities: number;
    resistances: number;
    immunities: number;
  };
  /** Gaps in the build. They never block anything. */
  warnings: string[];
}

const slotLabels = (slot: AssemblySlot | undefined, values: string[] = []) =>
  values.map(
    (value) =>
      slot?.options.find((option) => option.value === value)?.label ?? value,
  );

const list = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? '…')
    : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`;

/** Fills `{slot}` with the Reader's choices and `{minor}` with the level's amount. */
function fill(
  text: string,
  slots: AssemblySlot[],
  choices: Choices,
  minor: number,
): string {
  return text.replace(/\{(\w+)\}/g, (_, id: string) => {
    if (id === 'minor') return String(minor);
    const slot = slots.find((s) => s.id === id);
    return list(slotLabels(slot, choices[id]));
  });
}

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

export function assembleCreature(
  rules: QuickAssemblyRuleDetails,
  role: QuickAssemblyRoleDetails,
  input: AssemblyInput,
): AssemblyResult {
  const warnings: string[] = [];
  const { level, rank } = input;
  if (!rules.levels.includes(level)) {
    const levels = rules.levels.map(String);
    warnings.push(
      `O nível deve ser ${levels.slice(0, -1).join(', ')} ou ${levels[levels.length - 1]}.`,
    );
  }

  // The level table: the last row at or below the level (the base is level 5).
  const row = [...role.progression].reverse().find((r) => r.level <= level);
  const attributes = {
    ...role.base.attributes,
    ...(row?.attributes ?? {}),
  } as Record<'DES' | 'AST' | 'VIG' | 'VON', Die>;
  const grants = role.grants.filter((g) => g.level <= level);
  const sum = (key: 'defense' | 'magicDefense' | 'accuracy' | 'roleSkills') =>
    grants.reduce((total, g) => total + (g[key] ?? 0), 0);

  const champion = rank === 'champion';
  const multiplier = champion
    ? input.championX
    : rank === 'elite'
      ? rules.elite.hpMultiplier
      : 1;
  const hp =
    ((row?.hp ?? role.base.hp) +
      (input.extraHp && !champion ? rules.extraHp : 0)) *
    multiplier;
  const mp =
    (row?.mp ?? role.base.mp) * (champion ? rules.champion.mpMultiplier : 1);
  const initiative =
    Math.floor((attributes.DES + attributes.AST) / 2) +
    (champion
      ? input.championX
      : rank === 'elite'
        ? rules.elite.initiative
        : 0);

  const amount =
    [...rules.amounts].reverse().find((a) => a.fromLevel <= level) ??
    rules.amounts[0];
  const accuracyBonus = (row?.accuracy ?? 0) + sum('accuracy');
  const extraDamage = row?.extraDamage ?? 0;

  // Basic attacks.
  let extraVulnerabilities = 0;
  const attacks: CreatureAttack[] = role.attacks.map((template) => {
    const picked = input.attacks[template.id];
    const name = picked?.name?.trim() || template.name;
    const choices = picked?.choices ?? {};
    const option = template.options?.find((o) => o.id === picked?.option);
    const slots = [...(template.slots ?? []), ...(option?.slots ?? [])];

    if (template.options && !option) {
      warnings.push(`Escolha uma opção para o ${name}.`);
    }
    for (const slot of slots) {
      if ((choices[slot.id] ?? []).length < slot.count) {
        warnings.push(`Escolha ${slot.label.toLowerCase()} do ${name}.`);
      }
    }
    if (
      option?.extraVulnerability &&
      (choices[option.extraVulnerability.slot] ?? []).some((v) =>
        option.extraVulnerability?.values.includes(v),
      )
    ) {
      extraVulnerabilities += 1;
    }

    const effect = [
      template.effect && fill(template.effect, slots, choices, amount.minor),
      option && fill(option.effect, slots, choices, amount.minor),
    ]
      .filter(Boolean)
      .join(' ');
    return {
      name,
      range: picked?.range ?? template.ranges[0],
      accuracy: picked?.accuracy ?? template.accuracies[0],
      accuracyBonus,
      damage: template.damage + extraDamage,
      damageType: picked?.damageType ?? 'physical',
      ...(effect && { effect }),
    };
  });

  // Special rules granted by the level.
  const specialRules = grants
    .filter((g): g is LevelGrant & { rule: string } => Boolean(g.rule))
    .map((g) => {
      for (const slot of g.slots ?? []) {
        if ((input.choices[slot.id] ?? []).length < slot.count) {
          warnings.push(
            `Escolha ${slot.label.toLowerCase()} (nível ${g.level}).`,
          );
        }
      }
      return {
        name: `Benefício do nível ${g.level}`,
        effect: fill(g.rule, g.slots ?? [], input.choices, amount.minor),
      };
    });

  // Affinities.
  const required = {
    vulnerabilities: role.base.vulnerabilities + extraVulnerabilities,
    resistances: grants.reduce((n, g) => n + (g.resistances ?? 0), 0),
    immunities: grants.reduce((n, g) => n + (g.immunities ?? 0), 0),
  };
  const affinities: CreatureDetails['affinities'] = {};
  const seen = new Set<DamageType>();
  const conflicted = new Set<DamageType>();
  for (const [affinity, types] of [
    ['vulnerable', input.vulnerabilities],
    ['resistant', input.resistances],
    ['immune', input.immunities],
  ] as const) {
    for (const type of types) {
      if (seen.has(type)) conflicted.add(type);
      else affinities[type] = affinity;
      seen.add(type);
    }
  }
  for (const [have, need, one, many] of [
    [
      input.vulnerabilities.length,
      required.vulnerabilities,
      'Vulnerabilidade',
      'Vulnerabilidades',
    ],
    [
      input.resistances.length,
      required.resistances,
      'Resistência',
      'Resistências',
    ],
    [input.immunities.length, required.immunities, 'Imunidade', 'Imunidades'],
  ] as const) {
    if (have < need) {
      warnings.push(`Escolha ${need} ${plural(need, one, many)} (há ${have}).`);
    }
  }
  for (const type of conflicted) {
    const label = DAMAGE_LABEL[type];
    warnings.push(
      `${label[0].toUpperCase()}${label.slice(1)} tem mais de uma Afinidade.`,
    );
  }

  const details: CreatureDetails = {
    level,
    species: input.species,
    rank,
    role: role.role,
    villain: input.villain,
    traits: input.traits,
    attributes,
    hp,
    crisis: Math.floor(hp / 2),
    mp,
    initiative,
    defense: { value: role.base.defense + sum('defense'), fixed: false },
    magicDefense: role.base.magicDefense + sum('magicDefense'),
    hasSpells: false,
    affinities,
    attacks,
    spells: [],
    otherActions: [],
    specialRules,
  };

  return {
    name: input.name,
    details,
    ultimaPoints: input.villain ? rules.villainTiers[input.tier] : null,
    roleSkills:
      sum('roleSkills') +
      (champion
        ? input.championX
        : rank === 'elite'
          ? rules.elite.roleSkills
          : 0),
    bossSkills: champion ? rules.champion.bossSkills : 0,
    required,
    warnings,
  };
}

/** A valid starting build for a Role: a level 5 soldier with each attack's first options. */
export function defaultInput(
  role: QuickAssemblyRoleDetails,
  over: Partial<AssemblyInput> = {},
): AssemblyInput {
  return {
    name: '',
    level: 5,
    rank: 'soldier',
    championX: 2,
    extraHp: false,
    species: 'monster',
    traits: [],
    villain: false,
    tier: 'minor',
    vulnerabilities: [],
    resistances: [],
    immunities: [],
    attacks: Object.fromEntries(
      role.attacks.map((template) => [
        template.id,
        {
          range: template.ranges[0],
          accuracy: template.accuracies[0],
          damageType: 'physical' as const,
          choices: {},
        },
      ]),
    ),
    choices: {},
    ...over,
  };
}
