import type {
  AssemblySlot,
  CreatureAttack,
  CreatureDetails,
  CreatureSpell,
  DamageType,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  RoleAttackTemplate,
  Rank,
  RoleSkill,
  SpeciesOption,
  SpeciesRule,
  SpellGrant,
  SpellRef,
} from '../api/types';
import type { AssemblyInput, Choices, SpellCatalog } from './creatureAssembly';
import { DAMAGE_LABEL, SPECIES_LABEL } from './creatures';

/**
 * The sections of Quick Assembly that `assembleCreature` runs in turn (spells,
 * Affinities, Species, Skill budgets). Each reads the shared `Context`, returns its
 * piece of the stat block and adds its own warnings.
 */

export type Amounts = { minor: number; heavy: number; massive: number };

export const slotLabels = (slot: AssemblySlot | undefined, values: string[] = []) =>
  values.map(
    (value) =>
      slot?.options.find((option) => option.value === value)?.label ?? value,
  );

export const list = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? '…')
    : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`;

/** Fills `{slot}` with the Reader's choices and `{minor}`, `{heavy}`, `{massive}` with the level's amounts. */
export function fill(
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

export const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** The conditions a Species rule names, as the Livro Básico calls them. */
export const STATUS_NAME: Record<string, string> = {
  dazed: 'atordoado',
  enraged: 'enfurecido',
  poisoned: 'envenenado',
  shaken: 'abalado',
  slow: 'lento',
  weak: 'fraco',
};

/** What a built attack carries while Skills are still adding to it. */
export interface Built {
  id: RoleAttackTemplate['id'];
  attack: CreatureAttack;
  effects: string[];
}

/** What every section of the assembly reads: the Rules, the input and the level's numbers. */
export interface Context {
  rules: QuickAssemblyRuleDetails;
  role: QuickAssemblyRoleDetails;
  input: AssemblyInput;
  catalog: SpellCatalog;
  /** Gaps in the build; each section adds its own, in the order the sections run. */
  warnings: string[];
  level: number;
  rank: Rank;
  champion: boolean;
  /** The last row of the Role's level table at or below the level (the base is level 5). */
  row: QuickAssemblyRoleDetails['progression'][number] | undefined;
  grants: QuickAssemblyRoleDetails['grants'];
  amounts: Amounts;
  accuracyBonus: number;
  extraDamage: number;
  /** A soldier or elite takes what the Role gives in place of a customization. */
  picksExtra: boolean;
  speciesRule: SpeciesRule | undefined;
  speciesOptions: SpeciesOption[];
}

export type Chosen = [RoleSkill, string][];


export const spellKey = (ref: Pick<SpellRef, 'kind' | 'id'>) =>
  `${ref.kind}:${ref.id}`;


export const sumGrants = (
  ctx: Context,
  key: 'defense' | 'magicDefense' | 'roleSkills',
) => ctx.grants.reduce((total, g) => total + (g[key] ?? 0), 0);


/** The base choice of the mage and the support, each spell Skill picked, and the Species spells. */
export function buildSpells(ctx: Context, chosen: Chosen) {
  const { role, input, catalog, warnings, level, extraDamage, accuracyBonus } =
    ctx;
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
  for (const option of ctx.speciesOptions) {
    if (option.kind === 'spell' && option.spells) {
      grantsToUse.push({
        where: 'Espécie',
        grant: option.spells,
        choices: input.speciesChoices[option.id] ?? {},
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
            ctx.amounts,
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
  return { spells, spellMp };
}


/** How many Vulnerabilities, Resistances and Immunities the Reader still has to choose. */
export function requiredAffinities(
  ctx: Context,
  need: { resistances: number; immunities: number },
  extraVulnerabilities: number,
) {
  const { role, grants, speciesRule, speciesOptions } = ctx;
  return {
    vulnerabilities: role.base.vulnerabilities + extraVulnerabilities,
    resistances:
      grants.reduce((n, g) => n + (g.resistances ?? 0), 0) +
      need.resistances +
      (speciesRule?.resistances ?? 0) +
      speciesOptions
        .filter((o) => o.kind === 'resistances')
        .reduce((total, o) => total + (o.amount ?? 0), 0),
    immunities:
      grants.reduce((n, g) => n + (g.immunities ?? 0), 0) +
      need.immunities +
      (ctx.picksExtra && role.extra === 'immunity' ? 1 : 0) +
      (speciesRule?.immunities ?? 0),
  };
}

export const capitalizedDamage = (type: DamageType) =>
  `${DAMAGE_LABEL[type][0].toUpperCase()}${DAMAGE_LABEL[type].slice(1)}`;

/** The Affinities: what the Species fixes, then the Reader's picks, warning on gaps and clashes. */
export function buildAffinities(
  ctx: Context,
  required: ReturnType<typeof requiredAffinities>,
) {
  const { input, speciesRule, warnings } = ctx;
  const affinities: CreatureDetails['affinities'] = {};
  const seen = new Set<DamageType>();
  const conflicted = new Set<DamageType>();
  // What the Species fixes comes first; a Role pick on the same type is the conflict.
  if (speciesRule) {
    for (const [type, affinity] of Object.entries(speciesRule.affinities)) {
      affinities[type as DamageType] = affinity;
      seen.add(type as DamageType);
    }
    if (speciesRule.vulnerability) {
      const type = input.speciesVulnerability;
      if (!type) {
        warnings.push('Escolha a Vulnerabilidade da Espécie.');
      } else {
        if (!speciesRule.vulnerability.includes(type)) {
          warnings.push(
            `${capitalizedDamage(type)} não está entre as Vulnerabilidades que a Espécie permite.`,
          );
        }
        if (seen.has(type)) conflicted.add(type);
        else affinities[type] = 'vulnerable';
        seen.add(type);
      }
    }
    if (speciesRule.extra && input.speciesExtra) {
      const type = input.speciesExtra;
      if (!speciesRule.extra.vulnerability.includes(type)) {
        warnings.push(
          `${capitalizedDamage(type)} não está entre as Vulnerabilidades que a Espécie permite.`,
        );
      }
      if (seen.has(type)) conflicted.add(type);
      else affinities[type] = 'vulnerable';
      seen.add(type);
    }
  }
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
    warnings.push(`${capitalizedDamage(type)} tem mais de uma Afinidade.`);
  }
  return affinities;
}

/** How many Role Skills the build gets: the level, the rank, the extra and the Species. */
export function roleSkillBudget(ctx: Context, hasNegative: boolean) {
  const { rules, role, input } = ctx;
  return (
    sumGrants(ctx, 'roleSkills') +
    (ctx.champion
      ? input.championX
      : ctx.rank === 'elite'
        ? rules.elite.roleSkills
        : 0) +
    (ctx.picksExtra && role.extra === 'skill' ? 1 : 0) +
    ctx.speciesOptions.filter((o) => o.kind === 'role-skill').length +
    // A Negative Skill buys one more Role Skill (or a Boss Skill).
    (hasNegative ? 1 : 0)
  );
}

/** The Species: its rule, the options picked and what they ask. Absorptions edit `affinities`. */
export function speciesRules(
  ctx: Context,
  affinities: CreatureDetails['affinities'],
): CreatureDetails['specialRules'] {
  const { input, speciesRule, speciesOptions, warnings, amounts } = ctx;
  const speciesOut: CreatureDetails['specialRules'] = [];
  if (!speciesRule || !input.species) return speciesOut;

  const immune = speciesRule.statusImmunities.map(
    (code) => STATUS_NAME[code] ?? code,
  );
  if (immune.length > 0 || speciesRule.note) {
    speciesOut.push({
      name: SPECIES_LABEL[input.species],
      effect: [
        immune.length > 0
          ? `Imune ${immune.length > 1 ? 'às condições' : 'à condição'} ${list(immune)}.`
          : '',
        speciesRule.note ?? '',
      ]
        .filter(Boolean)
        .join(' '),
    });
  }
  for (const option of new Set(speciesOptions)) {
    const choices = input.speciesChoices[option.id] ?? {};
    for (const slot of option.slots ?? []) {
      if ((choices[slot.id] ?? []).length < (slot.min ?? slot.count)) {
        warnings.push(
          `Escolha ${slot.label.toLowerCase()} em ${option.label}.`,
        );
      }
    }
    if (option.kind === 'rule' && option.rule) {
      speciesOut.push({
        name: option.rule.name,
        effect: fill(option.rule.text, option.slots ?? [], choices, amounts),
      });
    }
    if (option.kind === 'absorb') {
      const type =
        option.swapType ?? (choices.type?.[0] as DamageType | undefined);
      const from = option.swaps === 'resistant' ? 'resistant' : 'immune';
      if (type) {
        if (affinities[type] === from) {
          affinities[type] = 'absorbs';
        } else {
          warnings.push(
            `Absorção em ${DAMAGE_LABEL[type]} exige ${from === 'resistant' ? 'uma Resistência' : 'uma Imunidade'} nesse tipo.`,
          );
        }
      }
    }
    const times = speciesOptions.filter((o) => o === option).length;
    const allowed = option.max ?? 1;
    if (times > allowed) {
      warnings.push(
        `${option.label} só pode ser escolhida ${allowed} ${allowed === 1 ? 'vez' : 'vezes'}.`,
      );
    }
  }
  const wanted =
    speciesRule.picks +
    (input.speciesExtra && speciesRule.extra ? speciesRule.extra.picks : 0);
  const have = speciesOptions.length;
  if (have < wanted) {
    const missing = wanted - have;
    warnings.push(
      `Escolha ${missing} ${plural(missing, 'opção', 'opções')} da Espécie (há ${have}).`,
    );
  } else if (have > wanted) {
    warnings.push(
      `Há ${have} ${plural(have, 'opção', 'opções')} da Espécie, mas a Espécie dá ${wanted}.`,
    );
  }
  return speciesOut;
}

/**
 * Warns about Boss Skills (a champion has its own; any beyond take the place of a Role
 * Skill) and about Role Skills (what the level and rank give, less those a Boss Skill replaced).
 */
export function checkSkillBudgets(
  ctx: Context,
  roleSkills: number,
  pickedSkills: RoleSkill[],
  pickedBosses: RoleSkill[],
) {
  const { rules, warnings } = ctx;
  const bossBudget = ctx.champion ? rules.champion.bossSkills : 0;
  const bossTaken = pickedBosses.length;
  if (bossTaken < bossBudget) {
    const missing = bossBudget - bossTaken;
    warnings.push(
      `Escolha ${missing} ${plural(missing, 'poder de chefe', 'poderes de chefe')} (há ${bossTaken}).`,
    );
  }
  const replaced = Math.max(0, bossTaken - bossBudget);
  if (replaced > roleSkills) {
    warnings.push(
      `Há ${bossTaken} ${plural(bossTaken, 'poder de chefe', 'poderes de chefe')}, mas o perfil dá ${bossBudget} (cada um a mais ocupa um poder de função).`,
    );
  }
  if (bossTaken > 2) {
    warnings.push('Mais de dois poderes de chefe: o livro pede muito cuidado.');
  }
  for (const group of rules.bossGroups) {
    if (pickedBosses.filter((b) => b.group === group.id).length > 1) {
      warnings.push(`Dois poderes de ${group.name}: o livro aconselha evitar.`);
    }
  }

  const roleNeeded = Math.max(0, roleSkills - replaced);
  const taken = pickedSkills.length;
  if (taken < roleNeeded) {
    const missing = roleNeeded - taken;
    warnings.push(
      `Escolha ${missing} ${plural(missing, 'poder de função', 'poderes de função')} (há ${taken}).`,
    );
  } else if (taken > roleNeeded) {
    warnings.push(
      `Há ${taken} ${plural(taken, 'poder de função', 'poderes de função')}, mas o perfil dá ${roleNeeded}.`,
    );
  }
}

