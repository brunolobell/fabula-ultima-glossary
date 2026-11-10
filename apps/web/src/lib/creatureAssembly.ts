import type {
  AssemblySlot,
  CreatureAttack,
  CreatureDetails,
  DamageType,
  Die,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  Rank,
  Role,
  RoleAttackTemplate,
  RoleSkill,
  Species,
  VillainTier,
  CreatureSpell,
  EntrySummary,
  NpcSpellsRuleDetails,
  SpellGrant,
  SpellRef,
  SpellDetails,
} from '../api/types';
import { DAMAGE_LABEL, RANK_LABEL, ROLE_ORDER } from './creatures';

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

export const spellKey = (ref: Pick<SpellRef, 'kind' | 'id'>) =>
  `${ref.kind}:${ref.id}`;

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

type Amounts = { minor: number; heavy: number; massive: number };

const slotLabels = (slot: AssemblySlot | undefined, values: string[] = []) =>
  values.map(
    (value) =>
      slot?.options.find((option) => option.value === value)?.label ?? value,
  );

const list = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? '…')
    : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`;

/** Fills `{slot}` with the Reader's choices and `{minor}`, `{heavy}`, `{massive}` with the level's amounts. */
function fill(
  text: string,
  slots: AssemblySlot[],
  choices: Choices,
  amounts: Amounts,
  damage?: string,
): string {
  return text.replace(/\{(\w+)\}/g, (_, id: string) => {
    if (id === 'minor' || id === 'heavy' || id === 'massive')
      return String(amounts[id]);
    if (id === 'damage' && damage !== undefined) return damage;
    const slot = slots.find((s) => s.id === id);
    return list(slotLabels(slot, choices[id]));
  });
}

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** What a built attack carries while Skills are still adding to it. */
interface Built {
  id: RoleAttackTemplate['id'];
  attack: CreatureAttack;
  effects: string[];
}

export function assembleCreature(
  rules: QuickAssemblyRuleDetails,
  role: QuickAssemblyRoleDetails,
  input: AssemblyInput,
  catalog: SpellCatalog = {},
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

  // The customization slot of a soldier or elite.
  const picksExtra = input.customization === EXTRA_CUSTOMIZATION && !champion;
  if (input.customization && champion) {
    warnings.push('Campeões não escolhem personalização.');
  }

  const hp =
    ((row?.hp ?? role.base.hp) +
      (picksExtra && role.extra === 'hp' ? rules.extraHp : 0)) *
    multiplier;
  const tableMp =
    (row?.mp ?? role.base.mp) * (champion ? rules.champion.mpMultiplier : 1);
  const initiative =
    Math.floor((attributes.DES + attributes.AST) / 2) +
    (champion
      ? input.championX
      : rank === 'elite'
        ? rules.elite.initiative
        : 0);

  const amounts: Amounts =
    [...rules.amounts].reverse().find((a) => a.fromLevel <= level) ??
    rules.amounts[0];
  const accuracyBonus = (row?.accuracy ?? 0) + sum('accuracy');
  const extraDamage = row?.extraDamage ?? 0;

  // Basic attacks, then the ones a Skill adds.
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

  // Skills: the picked Role Skills, then the customization if it is one.
  const pickedSkills = role.skills.filter((skill) => skill.id in input.skills);
  const customization = input.customization?.startsWith('c:')
    ? role.customizations.find((c) => customKey(c.id) === input.customization)
    : undefined;
  const negative = input.negative
    ? rules.negativeSkills.find((n) => n.id === input.negative)
    : undefined;
  const chosen: [RoleSkill, string][] = [
    ...pickedSkills.map((skill): [RoleSkill, string] => [skill, skill.id]),
    ...(customization
      ? [[customization, customKey(customization.id)] as [RoleSkill, string]]
      : []),
    ...(negative
      ? [[negative, negativeKey(negative.id)] as [RoleSkill, string]]
      : []),
  ];

  for (const [skill] of chosen) {
    if (skill.addsAttack) built.push(build(skill.addsAttack));
  }

  const specialRules: CreatureDetails['specialRules'] = [];
  const otherActions: CreatureDetails['otherActions'] = [];
  const need = { resistances: 0, immunities: 0 };
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

  const attacks: CreatureAttack[] = built.map(({ attack, effects }) => ({
    ...attack,
    ...(effects.length > 0 && { effect: effects.join(' ') }),
  }));

  // Spells: the base choice of the mage and the support, then each spell Skill picked.
  const spells: CreatureSpell[] = [];
  let spellMp = 0;
  const grantsToUse: { where: string; grant: SpellGrant; choices: Choices }[] =
    [];
  if (role.baseSpells) {
    grantsToUse.push({
      where: 'Feitiços',
      grant: role.baseSpells,
      choices: input.baseSpells,
    });
  }
  for (const [skill, key] of chosen) {
    if (skill.spells) {
      grantsToUse.push({
        where: skill.name,
        grant: skill.spells,
        choices: input.skills[key] ?? {},
      });
    }
  }
  for (const { where, grant, choices } of grantsToUse) {
    const option =
      grant.options.length === 1
        ? grant.options[0]
        : grant.options.find((o) => o.id === choices.option?.[0]);
    if (!option) {
      warnings.push(`Escolha a opção de feitiços (${where}).`);
      continue;
    }
    const picks = [...new Set(choices.spells ?? [])].slice(0, option.count);
    if (picks.length < option.count) {
      warnings.push(
        `Escolha ${option.count} ${plural(option.count, 'feitiço', 'feitiços')} em ${where} (há ${picks.length}).`,
      );
    }
    spellMp += option.mp;
    for (const key of picks) {
      const ref = grant.from.find((r) => spellKey(r) === key);
      const spell = catalog[key];
      if (!ref || !spell) {
        warnings.push(`Feitiço fora da lista: ${key}.`);
        continue;
      }
      if (ref.minLevel && level < ref.minLevel) {
        warnings.push(`${spell.name} só a partir do nível ${ref.minLevel}.`);
      }
      const slotChoices = input.spellChoices[key] ?? {};
      for (const slot of spell.slots ?? []) {
        if ((slotChoices[slot.id] ?? []).length < (slot.min ?? slot.count)) {
          warnings.push(
            `Escolha ${slot.label.toLowerCase()} em ${spell.name}.`,
          );
        }
      }
      const damageText =
        spell.damage === undefined
          ? undefined
          : spell.flat
            ? String(spell.damage + extraDamage)
            : `RA + ${spell.damage + extraDamage}`;
      const effect = spell.fromClass
        ? spell.effect
            .replace(
              /\(RA \+ (\d+)\)/g,
              (_, n: string) => `(RA + ${Number(n) + extraDamage})`,
            )
            .replace(/(?<!\p{L})você(?!\p{L})/gu, 'o NPC')
        : fill(
            spell.effect,
            spell.slots ?? [],
            slotChoices,
            amounts,
            damageText,
          );
      spells.push({
        name: spell.name,
        mpCost: spell.mpCost,
        target: spell.target,
        duration: spell.duration,
        offensive: spell.offensive,
        ...(spell.offensive && {
          accuracy: input.magicFormula,
          accuracyBonus,
        }),
        effect,
      });
    }
  }
  const mp = tableMp + spellMp;

  // Special rules granted by the level come before those of the Skills.
  const granted = grants.flatMap((g) => {
    if (!g.rule) return [];
    for (const slot of g.slots ?? []) {
      if ((input.choices[slot.id] ?? []).length < (slot.min ?? slot.count)) {
        warnings.push(
          `Escolha ${slot.label.toLowerCase()} (nível ${g.level}).`,
        );
      }
    }
    return [
      {
        name: `Benefício do nível ${g.level}`,
        effect: fill(g.rule, g.slots ?? [], input.choices, amounts),
      },
    ];
  });

  // Affinities.
  const required = {
    vulnerabilities: role.base.vulnerabilities + extraVulnerabilities,
    resistances:
      grants.reduce((n, g) => n + (g.resistances ?? 0), 0) + need.resistances,
    immunities:
      grants.reduce((n, g) => n + (g.immunities ?? 0), 0) +
      need.immunities +
      (picksExtra && role.extra === 'immunity' ? 1 : 0),
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
  for (const [have, wanted, one, many] of [
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
    if (have < wanted) {
      warnings.push(
        `Escolha ${wanted} ${plural(wanted, one, many)} (há ${have}).`,
      );
    }
  }
  for (const type of conflicted) {
    const label = DAMAGE_LABEL[type];
    warnings.push(
      `${label[0].toUpperCase()}${label.slice(1)} tem mais de uma Afinidade.`,
    );
  }

  // How many Role Skills the build gets, against how many it took.
  const roleSkills =
    sum('roleSkills') +
    (champion
      ? input.championX
      : rank === 'elite'
        ? rules.elite.roleSkills
        : 0) +
    (picksExtra && role.extra === 'skill' ? 1 : 0) +
    // A Negative Skill buys one more Role Skill (or a Boss Skill).
    (negative ? 1 : 0);
  const taken = pickedSkills.length;
  if (taken < roleSkills) {
    const missing = roleSkills - taken;
    warnings.push(
      `Escolha ${missing} ${plural(missing, 'poder de função', 'poderes de função')} (há ${taken}).`,
    );
  } else if (taken > roleSkills) {
    warnings.push(
      `Há ${taken} ${plural(taken, 'poder de função', 'poderes de função')}, mas o perfil dá ${roleSkills}.`,
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
    hasSpells: spells.length > 0,
    affinities,
    attacks,
    spells,
    otherActions,
    specialRules: [...granted, ...specialRules],
  };

  return {
    name: input.name,
    details,
    ultimaPoints: input.villain ? rules.villainTiers[input.tier] : null,
    roleSkills,
    bossSkills: champion ? rules.champion.bossSkills : 0,
    required,
    warnings,
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
    ![rules.levels, rules.amounts, rules.negativeSkills].every(Array.isArray) ||
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
