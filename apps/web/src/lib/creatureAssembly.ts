
import type {
  AssemblySlot,
  CreatureAttack,
  CreatureDetails,
  DamageType,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  Rank,
  Role,
  RoleAttackTemplate,
  SpeciesOption,
  RoleSkill,
  Species,
  VillainTier,
  EntrySummary,
  NpcSpellsRuleDetails,
  SpellDetails,
} from '../api/types';
import {
  type Built,
  type Chosen,
  type Context,
  buildSpells,
  buildAffinities,
  checkSkillBudgets,
  fill,
  requiredAffinities,
  roleSkillBudget,
  speciesRules,
  sumGrants,
} from './assemblySections';
import { RANK_LABEL, ROLE_ORDER } from './creatures';

export { spellKey } from './assemblySections';

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

/** The key of a customization among `AssemblyInput.skills`. */
export const customKey = (id: string) => `c:${id}`;

/** The key of a Boss Skill among `AssemblyInput.skills`. */
export const bossKey = (id: string) => `b:${id}`;

/** The key of the Negative Skill among `AssemblyInput.skills`. */
export const negativeKey = (id: string) => `n:${id}`;

/** The value of `AssemblyInput.customization` that takes what the Role gives in place of one. */
export const EXTRA_CUSTOMIZATION = 'extra';

export interface AssemblyInput {
  name: string;
  level: number;
  rank: Rank;
  /** How many soldiers a champion replaces; used only for a champion. */
  championX: number;
  /** Soldier or elite: `extra` (more Hit Points, an Immunity or a Role Skill), or `c:<id>`. */
  customization: string | null;
  /** Null: no Species chosen, so none of its rules apply. */
  species: Species | null;
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
  /** Role Skills picked (and the customization, under `c:<id>`), with their slot choices. */
  skills: Record<string, Choices>;
  /** The mage's and the support's base spells: `option` and `spells` (keys, see `spellKey`). */
  baseSpells: Choices;
  /** The Reader's choices for the slots of each spell picked, by spell key. */
  spellChoices: Record<string, Choices>;
  /** The Magic check of offensive spells: "AST + VON" or "VIG + VON". */
  magicFormula: string;
  /** The id of the Negative Skill, if the Creature takes one; its choices are under `n:<id>`. */
  negative: string | null;
  /** The ids of the Boss Skills picked; their choices are under `b:<id>`. */
  bosses: string[];
  /** The ids of the Species options picked (an option that may be taken twice appears twice). */
  speciesPicks: string[];
  /** The Vulnerability the Species asks for (humanoid, plant). */
  speciesVulnerability: DamageType | null;
  /** The optional extra Vulnerability that buys more options; null when not taken. */
  speciesExtra: DamageType | null;
  /** The choices of the Species options, by option id (`spells`, `type`, slots). */
  speciesChoices: Record<string, Choices>;
}

/** A spell the Reader can pick: from the NPC list, or a Class spell read from its Entry. */
export interface CatalogSpell {
  key: string;
  name: string;
  mpCost: string;
  target: string;
  duration: string;
  offensive: boolean;
  effect: string;
  damage?: number;
  flat?: boolean;
  slots?: AssemblySlot[];
  /** A Class spell's text: "(RA + N)" gets the level's extra damage. */
  fromClass?: boolean;
}

export type SpellCatalog = Record<string, CatalogSpell>;

/** The NPC spells of the Rule, and every Class spell of the entry index. */
export function buildSpellCatalog(
  npc: NpcSpellsRuleDetails | undefined,
  index: ReadonlyMap<string, EntrySummary>,
): SpellCatalog {
  const catalog: SpellCatalog = {};
  for (const spell of npc?.spells ?? []) {
    catalog[`npc:${spell.id}`] = { ...spell, key: `npc:${spell.id}` };
  }
  for (const entry of index.values()) {
    if (entry.type !== 'spell') continue;
    const d = entry.details as SpellDetails;
    catalog[`class:${entry.slug}`] = {
      key: `class:${entry.slug}`,
      name: entry.name,
      mpCost: d.mpCost,
      target: d.target,
      duration: d.duration,
      offensive: d.offensive,
      effect: entry.summary,
      fromClass: true,
    };
  }
  return catalog;
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

function buildContext(
  rules: QuickAssemblyRuleDetails,
  role: QuickAssemblyRoleDetails,
  input: AssemblyInput,
  catalog: SpellCatalog,
): Context {
  const warnings: string[] = [];
  const { level, rank } = input;
  if (!rules.levels.includes(level)) {
    const levels = rules.levels.map(String);
    warnings.push(
      `O nível deve ser ${levels.slice(0, -1).join(', ')} ou ${levels[levels.length - 1]}.`,
    );
  }

  const row = [...role.progression].reverse().find((r) => r.level <= level);
  const grants = role.grants.filter((g) => g.level <= level);
  const champion = rank === 'champion';

  if (input.customization && champion) {
    warnings.push('Campeões não escolhem personalização.');
  }

  // The Species rule (it replaces the Livro Básico's under Quick Assembly) and its picks.
  const speciesRule = input.species
    ? rules.species.find((r) => r.species === input.species)
    : undefined;
  const speciesOptions: SpeciesOption[] = speciesRule
    ? input.speciesPicks.flatMap((id) => {
        const option = speciesRule.options.find((o) => o.id === id);
        return option ? [option] : [];
      })
    : [];

  return {
    rules,
    role,
    input,
    catalog,
    warnings,
    level,
    rank,
    champion,
    row,
    grants,
    amounts:
      [...rules.amounts].reverse().find((a) => a.fromLevel <= level) ??
      rules.amounts[0],
    accuracyBonus:
      (row?.accuracy ?? 0) + grants.reduce((n, g) => n + (g.accuracy ?? 0), 0),
    extraDamage: row?.extraDamage ?? 0,
    picksExtra: input.customization === EXTRA_CUSTOMIZATION && !champion,
    speciesRule,
    speciesOptions,
  };
}

/** Hit Points, Mana Points and Initiative: the table, the rank and the Species. */
function vitals(ctx: Context, attributes: CreatureDetails['attributes']) {
  const { rules, role, input, row, champion, picksExtra } = ctx;
  const multiplier = champion
    ? input.championX
    : ctx.rank === 'elite'
      ? rules.elite.hpMultiplier
      : 1;
  const speciesHp = ctx.speciesOptions
    .filter((o) => o.kind === 'hp')
    .reduce((total, o) => total + (o.amount ?? 0), 0);
  const hp =
    ((row?.hp ?? role.base.hp) +
      (picksExtra && role.extra === 'hp' ? rules.extraHp : 0) +
      speciesHp) *
    multiplier;
  const tableMp =
    (row?.mp ?? role.base.mp) * (champion ? rules.champion.mpMultiplier : 1);
  const initiative =
    Math.floor((attributes.DES + attributes.AST) / 2) +
    (champion
      ? input.championX
      : ctx.rank === 'elite'
        ? rules.elite.initiative
        : 0);
  return { hp, tableMp, initiative };
}

/** Role Skills picked, the customization, the Negative Skill and the Boss Skills. */
function chooseSkills(ctx: Context) {
  const { rules, role, input } = ctx;
  const pickedSkills = role.skills.filter((skill) => skill.id in input.skills);
  const customization = input.customization?.startsWith('c:')
    ? role.customizations.find((c) => customKey(c.id) === input.customization)
    : undefined;
  const pickedBosses = rules.bossSkills.filter((b) =>
    input.bosses.includes(b.id),
  );
  const negative = input.negative
    ? rules.negativeSkills.find((n) => n.id === input.negative)
    : undefined;
  const chosen: Chosen = [
    ...pickedSkills.map((skill): [RoleSkill, string] => [skill, skill.id]),
    ...(customization
      ? [[customization, customKey(customization.id)] as [RoleSkill, string]]
      : []),
    ...(negative
      ? [[negative, negativeKey(negative.id)] as [RoleSkill, string]]
      : []),
    ...pickedBosses.map((skill): [RoleSkill, string] => [
      skill,
      bossKey(skill.id),
    ]),
  ];
  return { pickedSkills, pickedBosses, negative, chosen };
}

/** The Role's basic attacks, then the ones a Skill adds. */
function buildAttacks(ctx: Context, chosen: Chosen) {
  const { role, input, warnings, amounts, accuracyBonus, extraDamage } = ctx;
  let extraVulnerabilities = 0;
  const build = (template: RoleAttackTemplate): Built => {
    const picked = input.attacks[template.id];
    const name = picked?.name?.trim() || template.name;
    const choices = picked?.choices ?? {};
    const option = template.options?.find((o) => o.id === picked?.option);
    const slots = [...(template.slots ?? []), ...(option?.slots ?? [])];

    if (template.options && !option) {
      warnings.push(`Escolha uma opção para o ${name}.`);
    }
    for (const slot of slots) {
      if ((choices[slot.id] ?? []).length < (slot.min ?? slot.count)) {
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

    return {
      id: template.id,
      effects: [
        template.effect && fill(template.effect, slots, choices, amounts),
        option && fill(option.effect, slots, choices, amounts),
      ].filter((text): text is string => Boolean(text)),
      attack: {
        name,
        range: picked?.range ?? template.ranges[0],
        accuracy: picked?.accuracy ?? template.accuracies[0],
        accuracyBonus,
        damage: template.damage + extraDamage,
        damageType: picked?.damageType ?? 'physical',
      },
    };
  };
  const built: Built[] = role.attacks.map(build);
  for (const [skill] of chosen) {
    if (skill.addsAttack) built.push(build(skill.addsAttack));
  }
  return { built, extraVulnerabilities };
}

/** Lands the effects of every chosen Skill on the attacks, rules and actions. */
function applySkills(ctx: Context, chosen: Chosen, built: Built[]) {
  const { input, rank, warnings, amounts } = ctx;
  const specialRules: CreatureDetails['specialRules'] = [];
  const otherActions: CreatureDetails['otherActions'] = [];
  const need = { resistances: 0, immunities: 0 };
  let extraVulnerabilities = 0;
  for (const [skill, key] of chosen) {
    const choices = input.skills[key] ?? {};
    if (skill.ranks && !skill.ranks.includes(rank)) {
      const only = skill.ranks.map((r) => RANK_LABEL[r].toLowerCase());
      warnings.push(`${skill.name} é só para ${only.join(' e ')}.`);
    }
    for (const slot of skill.slots ?? []) {
      if ((choices[slot.id] ?? []).length < (slot.min ?? slot.count)) {
        warnings.push(`Escolha ${slot.label.toLowerCase()} em ${skill.name}.`);
      }
    }
    for (const effect of skill.effects) {
      const text = fill(effect.text, skill.slots ?? [], choices, amounts);
      if (effect.to === 'rule') {
        specialRules.push({ name: effect.name ?? skill.name, effect: text });
      } else if (effect.to === 'action') {
        otherActions.push({ name: effect.name ?? skill.name, effect: text });
      } else {
        const target = built.find((b) => b.id === effect.to);
        if (!target) {
          warnings.push(
            `${skill.name} precisa de um ataque ${effect.to === 'strong' ? 'forte' : 'normal'}.`,
          );
          continue;
        }
        target.effects.push(text);
        if (effect.patch?.range) target.attack.range = effect.patch.range;
        if (effect.patch?.accuracy)
          target.attack.accuracy = effect.patch.accuracy;
      }
    }
    need.resistances += skill.resistances ?? 0;
    need.immunities += skill.immunities ?? 0;
    extraVulnerabilities += skill.extraVulnerabilities ?? 0;
  }
  return { specialRules, otherActions, need, extraVulnerabilities };
}

/** Special rules granted by the level (they come before those of the Skills). */
function levelRules(ctx: Context): CreatureDetails['specialRules'] {
  return ctx.grants.flatMap((g) => {
    if (!g.rule) return [];
    for (const slot of g.slots ?? []) {
      if ((ctx.input.choices[slot.id] ?? []).length < (slot.min ?? slot.count)) {
        ctx.warnings.push(
          `Escolha ${slot.label.toLowerCase()} (nível ${g.level}).`,
        );
      }
    }
    return [
      {
        name: `Benefício do nível ${g.level}`,
        effect: fill(g.rule, g.slots ?? [], ctx.input.choices, ctx.amounts),
      },
    ];
  });
}

/** The sections run in the order their warnings should read. */
export function assembleCreature(
  rules: QuickAssemblyRuleDetails,
  role: QuickAssemblyRoleDetails,
  input: AssemblyInput,
  catalog: SpellCatalog = {},
): AssemblyResult {
  const ctx = buildContext(rules, role, input, catalog);
  const { level, rank, champion, row } = ctx;

  const attributes = {
    ...role.base.attributes,
    ...(row?.attributes ?? {}),
  } as CreatureDetails['attributes'];
  const { hp, tableMp, initiative } = vitals(ctx, attributes);

  const { pickedSkills, pickedBosses, negative, chosen } = chooseSkills(ctx);
  const { built, extraVulnerabilities: fromAttacks } = buildAttacks(
    ctx,
    chosen,
  );
  const skills = applySkills(ctx, chosen, built);
  const attacks: CreatureAttack[] = built.map(({ attack, effects }) => ({
    ...attack,
    ...(effects.length > 0 && { effect: effects.join(' ') }),
  }));

  const { spells, spellMp } = buildSpells(ctx, chosen);
  const granted = levelRules(ctx);

  const required = requiredAffinities(
    ctx,
    skills.need,
    fromAttacks + skills.extraVulnerabilities,
  );
  const affinities = buildAffinities(ctx, required);

  const roleSkills = roleSkillBudget(ctx, Boolean(negative));
  const speciesOut = speciesRules(ctx, affinities);
  checkSkillBudgets(ctx, roleSkills, pickedSkills, pickedBosses);

  const details: CreatureDetails = {
    level,
    species: input.species ?? 'monster',
    rank,
    role: role.role,
    villain: input.villain,
    traits: input.traits,
    attributes,
    hp,
    crisis: Math.floor(hp / 2),
    mp: tableMp + spellMp,
    initiative,
    defense: {
      value: role.base.defense + sumGrants(ctx, 'defense'),
      fixed: false,
    },
    magicDefense: role.base.magicDefense + sumGrants(ctx, 'magicDefense'),
    hasSpells: spells.length > 0,
    affinities,
    attacks,
    spells,
    otherActions: skills.otherActions,
    specialRules: [...granted, ...skills.specialRules, ...speciesOut],
  };

  return {
    name: input.name,
    details,
    ultimaPoints: input.villain ? rules.villainTiers[input.tier] : null,
    roleSkills,
    bossSkills: champion ? rules.champion.bossSkills : 0,
    required,
    warnings: ctx.warnings,
  };
}

/** The first range, formula and damage type of an attack, before the Reader picks. */
export const defaultAttackChoice = (
  template: RoleAttackTemplate,
): AttackChoice => ({
  range: template.ranges[0],
  accuracy: template.accuracies[0],
  damageType: 'physical',
  choices: {},
});

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
    customization: null,
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
        defaultAttackChoice(template),
      ]),
    ),
    choices: {},
    skills: {},
    baseSpells: {},
    spellChoices: {},
    magicFormula: 'AST + VON',
    negative: null,
    bosses: [],
    speciesPicks: [],
    speciesVulnerability: null,
    speciesExtra: null,
    speciesChoices: {},
    ...over,
  };
}

/**
 * Whether the Rules carry everything the Assembler reads. The Rules reach the browser
 * as the last seed wrote them, or as an older response it still holds: one that
 * predates a later step lacks parts (the Negative Skills, say), and the Assembler must
 * not be offered with them rather than fail on the missing part.
 */
export function assemblyRulesComplete(
  rules: QuickAssemblyRuleDetails | undefined,
  roles: Partial<Record<Role, QuickAssemblyRoleDetails | undefined>>,
): boolean {
  if (
    rules?.forge !== 'quick-assembly' ||
    ![
      rules.levels,
      rules.amounts,
      rules.negativeSkills,
      rules.bossSkills,
      rules.bossGroups,
      rules.species,
    ].every(Array.isArray) ||
    !rules.elite ||
    !rules.champion ||
    !rules.villainTiers
  ) {
    return false;
  }
  return ROLE_ORDER.every((name) => {
    const role = roles[name];
    return (
      role?.forge === 'quick-assembly-role' &&
      [
        role.progression,
        role.grants,
        role.attacks,
        role.skills,
        role.customizations,
      ].every(Array.isArray) &&
      Boolean(role.base) &&
      typeof role.extra === 'string'
    );
  });
}
