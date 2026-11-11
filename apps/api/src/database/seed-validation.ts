import { slugify } from '../entries/slug';
import {
  AFFINITIES,
  ATTRIBUTES,
  CustomWeaponRuleDetails,
  DAMAGE_TYPES,
  DICE,
  DamageType,
  NpcSpellsRuleDetails,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  RANKS,
  RoleSkill,
  ROLES,
  RareWeaponRuleDetails,
  SPECIES,
  SpellGrant,
  ENTRY_SOURCES,
  ENTRY_TYPES,
  EQUIPMENT_KINDS,
  EntryType,
  MEDIUMS,
  SERVICE_GROUPS,
  TRANSPORT_CLASSES,
  isCreatureGroup,
  CREATURE_FLAGS,
} from '../entries/entry-types';
import { SeedEntry } from './seed-data/types';

export const resolveSlug = (entry: Pick<SeedEntry, 'name' | 'slug'>) =>
  entry.slug ?? slugify(entry.name);

const LINK = /\[\[([^\]]+)\]\]/g;
const MAX_PAGE = 360;
const ACCURACY = new RegExp(
  `^(${ATTRIBUTES.join('|')}) \\+ (${ATTRIBUTES.join('|')})$`,
);

type Fail = (message: string) => void;

const isMoney = (n: unknown) => Number.isInteger(n) && (n as number) >= 0;

const duplicates = (ids: string[]) =>
  ids.filter((id, i) => ids.indexOf(id) !== i);

function validateCustomWeapon(d: CustomWeaponRuleDetails, fail: Fail) {
  const { base, categories, damageTypes, customizations } = d;
  if (!isMoney(base.cost))
    fail('forge base.cost must be a non-negative integer');
  if (!Number.isInteger(base.damage))
    fail('forge base.damage must be an integer');
  if (!Number.isInteger(base.slots) || base.slots < 1)
    fail('forge base.slots must be a positive integer');
  if (base.accuracies.length === 0) fail('forge needs base.accuracies');
  for (const accuracy of base.accuracies) {
    if (!ACCURACY.test(accuracy)) fail(`forge bad accuracy "${accuracy}"`);
  }
  if (damageTypes.length === 0) fail('forge needs damageTypes');
  if (categories.length === 0) fail('forge needs categories');
  for (const dup of duplicates(customizations.map((c) => c.id)))
    fail(`forge customization "${dup}" is repeated`);

  const ids = customizations.map((c) => c.id);
  for (const c of customizations) {
    if (!c.name || !c.summary)
      fail(`forge customization "${c.id}" needs a name and summary`);
    if (!Number.isInteger(c.slots) || c.slots < 1 || c.slots > base.slots)
      fail(`forge customization "${c.id}" has bad slots`);
    if (!isMoney(c.cost)) fail(`forge customization "${c.id}" has a bad cost`);
    for (const category of c.blockedCategories ?? []) {
      if (!categories.includes(category))
        fail(
          `forge customization "${c.id}" blocks unknown category "${category}"`,
        );
    }
    for (const other of c.blockedWith ?? []) {
      if (!ids.includes(other))
        fail(
          `forge customization "${c.id}" is blocked with unknown "${other}"`,
        );
    }
  }
  if (customizations.filter((c) => c.secondForm).length !== 1)
    fail('forge needs exactly one customization that adds a second form');
}

function validateRareWeapon(
  d: RareWeaponRuleDetails,
  fail: Fail,
  expectEquipment: (slug: string) => void,
) {
  if (!isMoney(d.damageTypeCost))
    fail('forge damageTypeCost must be a non-negative integer');
  if (!Number.isInteger(d.maxAlterations) || d.maxAlterations < 1)
    fail('forge maxAlterations must be a positive integer');
  if (!Number.isInteger(d.martialDamage))
    fail('forge martialDamage must be an integer');
  if (d.damageTypes.length === 0) fail('forge needs damageTypes');
  for (const dup of duplicates(d.alterations.map((a) => a.id)))
    fail(`forge alteration "${dup}" is repeated`);
  for (const a of d.alterations) {
    if (!isMoney(a.cost)) fail(`forge alteration "${a.id}" has a bad cost`);
  }
  for (const dup of duplicates(d.features.map((f) => f.id)))
    fail(`forge feature "${dup}" is repeated`);
  for (const f of d.features) {
    if (!f.name || !f.summary)
      fail(`forge feature "${f.id}" needs a name and summary`);
    if (!isMoney(f.cost)) fail(`forge feature "${f.id}" has a bad cost`);
    if (f.group !== 'defensive' && f.group !== 'offensive')
      fail(`forge feature "${f.id}" has an unknown group`);
  }
  for (const slug of d.excludedBases) expectEquipment(slug);
}

const TOKEN = /\{(\w+)\}/g;

/** Every `{id}` in a text must be a slot the same entry offers (or `{minor}`). */
function checkTokens(
  text: string | undefined,
  slots: { id: string }[] | undefined,
  where: string,
  fail: Fail,
) {
  for (const [, id] of (text ?? '').matchAll(TOKEN)) {
    if (
      !['minor', 'heavy', 'massive'].includes(id) &&
      !(slots ?? []).some((slot) => slot.id === id)
    ) {
      fail(`${where} uses {${id}} but offers no such choice`);
    }
  }
}

function validateNpcSpells(d: NpcSpellsRuleDetails, fail: Fail) {
  for (const dup of duplicates(d.spells.map((s) => s.id)))
    fail(`npc spell "${dup}" is repeated`);
  for (const spell of d.spells) {
    const where = `npc spell "${spell.id}"`;
    if (!spell.name.trim()) fail(`${where} needs a name`);
    if (!/^\d+( × A)?$/.test(spell.mpCost))
      fail(`${where} mpCost "${spell.mpCost}" is not "N" or "N × A"`);
    if (!spell.target || !spell.duration)
      fail(`${where} needs a target and a duration`);
    const slots = spell.slots ?? [];
    for (const [, id] of spell.effect.matchAll(TOKEN)) {
      if (id === 'damage') {
        if (spell.damage === undefined)
          fail(`${where} uses {damage} but has no damage`);
      } else if (!slots.some((slot) => slot.id === id)) {
        fail(`${where} uses {${id}} but offers no such choice`);
      }
    }
  }
}

function checkGrant(
  grant: SpellGrant,
  where: string,
  fail: Fail,
  expectSpell: (slug: string) => void,
  npcIds: Set<string>,
) {
  if (grant.from.length === 0) fail(`${where} offers no spells`);
  if (grant.options.length === 0) fail(`${where} has no option`);
  for (const option of grant.options) {
    if (!Number.isInteger(option.count) || option.count < 1 || option.mp < 0)
      fail(`${where} option "${option.id}" is not valid`);
  }
  for (const ref of grant.from) {
    if (ref.kind === 'npc') {
      if (!npcIds.has(ref.id))
        fail(`${where} offers "${ref.id}", which is not an NPC spell`);
    } else {
      expectSpell(ref.id);
    }
    if (ref.minLevel !== undefined && ![30, 40, 50, 60].includes(ref.minLevel))
      fail(`${where} gives "${ref.id}" a bad minimum level`);
  }
}

/** The checks every Role Skill, customization and Negative Skill shares. */
function checkSkill(
  skill: RoleSkill,
  kind: string,
  ids: Set<string>,
  fail: Fail,
  expectSpell: (slug: string) => void,
  npcIds: Set<string>,
) {
  const where = `${kind} "${skill.id}"`;
  if (ids.has(skill.id)) fail(`${where} is repeated`);
  ids.add(skill.id);
  if (!skill.name.trim()) fail(`${where} needs a name`);
  const hasEffect =
    skill.effects.length > 0 ||
    skill.addsAttack ||
    skill.resistances ||
    skill.immunities ||
    skill.extraVulnerabilities ||
    skill.spells;
  if (!hasEffect) fail(`${where} does nothing`);
  for (const slot of skill.slots ?? []) {
    if (slot.options.length < slot.count)
      fail(`${where} slot "${slot.id}" has fewer options than choices`);
    if (slot.min !== undefined && (slot.min < 1 || slot.min > slot.count))
      fail(`${where} slot "${slot.id}" has a bad minimum`);
  }
  for (const effect of skill.effects) {
    if (!['rule', 'action', 'normal', 'strong'].includes(effect.to))
      fail(`${where} has an effect that goes to "${effect.to}"`);
    checkTokens(effect.text, skill.slots, where, fail);
  }
  for (const rank of skill.ranks ?? []) {
    if (!RANKS.includes(rank)) fail(`${where} has unknown rank "${rank}"`);
  }
  if (skill.spells) checkGrant(skill.spells, where, fail, expectSpell, npcIds);
  const added = skill.addsAttack;
  if (added) {
    for (const accuracy of added.accuracies) {
      if (!ACCURACY.test(accuracy))
        fail(`${where} has bad accuracy "${accuracy}"`);
    }
    checkTokens(added.effect, added.slots, where, fail);
  }
}

const STATUS_CODES = ['dazed', 'enraged', 'poisoned', 'shaken', 'slow', 'weak'];

function validateSpecies(
  rules: QuickAssemblyRuleDetails['species'],
  fail: Fail,
  expectSpell: (slug: string) => void,
  npcIds: Set<string>,
) {
  const present = rules.map((r) => r.species);
  if (
    present.length !== SPECIES.length ||
    SPECIES.some((species) => present.filter((p) => p === species).length !== 1)
  )
    fail(`every species needs exactly one rule (have ${present})`);
  for (const rule of rules) {
    const where = `species "${rule.species}"`;
    for (const [type, affinity] of Object.entries(rule.affinities)) {
      if (!DAMAGE_TYPES.includes(type as DamageType))
        fail(`${where} has an affinity to the unknown type "${type}"`);
      if (!AFFINITIES.includes(affinity))
        fail(`${where} has the unknown affinity "${affinity}"`);
    }
    for (const code of rule.statusImmunities) {
      if (!STATUS_CODES.includes(code))
        fail(`${where} is immune to the unknown condition "${code}"`);
    }
    for (const type of [
      ...(rule.vulnerability ?? []),
      ...(rule.extra?.vulnerability ?? []),
    ]) {
      if (!DAMAGE_TYPES.includes(type))
        fail(`${where} offers the unknown type "${type}"`);
    }
    if (!Number.isInteger(rule.picks) || rule.picks < 0)
      fail(`${where} picks must be a non-negative integer`);
    if (
      rule.extra &&
      (!Number.isInteger(rule.extra.picks) || rule.extra.picks < 1)
    )
      fail(`${where} extra picks must be a positive integer`);
    const optionIds = new Set<string>();
    for (const option of rule.options) {
      const at = `${where} option "${option.id}"`;
      if (optionIds.has(option.id)) fail(`${at} is repeated`);
      optionIds.add(option.id);
      if (
        option.max !== undefined &&
        (!Number.isInteger(option.max) || option.max < 2)
      )
        fail(`${at} max must be 2 or more`);
      if (option.kind === 'absorb' && !option.swaps) fail(`${at} needs swaps`);
      if (option.kind === 'spell' && !option.spells) fail(`${at} needs spells`);
      if (option.kind === 'rule' && !option.rule) fail(`${at} needs a rule`);
      if (option.spells)
        checkGrant(option.spells, at, fail, expectSpell, npcIds);
      checkTokens(option.rule?.text, option.slots, at, fail);
    }
  }
}

function validateQuickAssembly(
  d: QuickAssemblyRuleDetails,
  fail: Fail,
  expectSpell: (slug: string) => void,
  npcIds: Set<string>,
) {
  if (d.levels.join() !== '5,10,20,30,40,50,60')
    fail('quick assembly levels must be 5, 10, 20, 30, 40, 50, 60');
  let previous = 0;
  for (const a of d.amounts) {
    if (a.fromLevel <= previous) fail('amounts must go up by level');
    previous = a.fromLevel;
    if (!(a.minor > 0 && a.minor < a.heavy && a.heavy < a.massive))
      fail(
        `amounts from level ${a.fromLevel} must grow: minor < heavy < massive`,
      );
  }
  if (d.amounts[0]?.fromLevel !== 5) fail('amounts must start at level 5');
  validateSpecies(d.species, fail, expectSpell, npcIds);
  const groupIds = new Set(d.bossGroups.map((g) => g.id));
  if (groupIds.size !== d.bossGroups.length) fail('boss groups are repeated');
  const bossIds = new Set<string>();
  for (const skill of d.bossSkills) {
    checkSkill(skill, 'boss skill', bossIds, fail, expectSpell, npcIds);
    if (!skill.group || !groupIds.has(skill.group))
      fail(`boss skill "${skill.id}" is in the unknown group "${skill.group}"`);
  }
  const negativeIds = new Set<string>();
  for (const negative of d.negativeSkills) {
    checkSkill(
      negative,
      'negative skill',
      negativeIds,
      fail,
      expectSpell,
      npcIds,
    );
  }
  for (const [name, value] of [
    ['elite.hpMultiplier', d.elite.hpMultiplier],
    ['champion.mpMultiplier', d.champion.mpMultiplier],
    ['extraHp', d.extraHp],
    ...Object.entries(d.villainTiers).map(
      ([tier, points]) => [`villainTiers.${tier}`, points] as const,
    ),
  ] as const) {
    if (!Number.isInteger(value) || value < 1)
      fail(`quick assembly ${name} must be a positive integer`);
  }
}

function validateQuickAssemblyRole(
  d: QuickAssemblyRoleDetails,
  fail: Fail,
  expectSpell: (slug: string) => void,
  npcIds: Set<string>,
) {
  if (!ROLES.includes(d.role)) fail(`unknown role "${d.role}"`);
  const { base } = d;
  for (const code of ATTRIBUTES) {
    if (!DICE.includes(base.attributes[code]))
      fail(`base attribute ${code} must be a die from d6 to d12`);
  }
  if (
    base.initiative !==
    Math.floor((base.attributes.DES + base.attributes.AST) / 2)
  )
    fail(
      `base initiative (${base.initiative}) must be (DES + AST) / 2, rounded down`,
    );
  for (const [name, value] of [
    ['hp', base.hp],
    ['mp', base.mp],
  ] as const) {
    if (!Number.isInteger(value) || value < 1)
      fail(`base ${name} must be a positive integer`);
  }
  if (!Number.isInteger(base.vulnerabilities) || base.vulnerabilities < 1)
    fail('base vulnerabilities must be at least 1');

  const levels = d.progression.map((r) => r.level);
  if (levels.join() !== '10,20,30,40,50,60')
    fail(`progression must have the levels 10 to 60, in order (has ${levels})`);
  let hp = base.hp;
  let mp = base.mp;
  let extra = 0;
  for (const r of d.progression) {
    for (const [code, die] of Object.entries(r.attributes)) {
      if (!DICE.includes(die as never) || die < base.attributes[code as never])
        fail(`progression ${r.level}: ${code} d${die} is not a larger die`);
    }
    if (r.hp < hp || r.mp < mp)
      fail(`progression ${r.level}: hp and mp must not go down`);
    hp = r.hp;
    mp = r.mp;
    if (r.accuracy !== r.level / 10)
      fail(`progression ${r.level}: accuracy must be ${r.level / 10}`);
    if (r.extraDamage % 5 !== 0 || r.extraDamage < extra)
      fail(
        `progression ${r.level}: extraDamage must be a growing multiple of 5`,
      );
    extra = r.extraDamage;
  }

  for (const g of d.grants) {
    if (!levels.includes(g.level)) fail(`grant at unknown level ${g.level}`);
    checkTokens(g.rule, g.slots, `grant ${g.level}`, fail);
  }

  if (!['hp', 'immunity', 'skill'].includes(d.extra))
    fail(`unknown extra "${d.extra}"`);
  const ids = new Set<string>();
  for (const [kind, list] of [
    ['skill', d.skills],
    ['customization', d.customizations],
  ] as const) {
    for (const skill of list) {
      checkSkill(skill, kind, ids, fail, expectSpell, npcIds);
    }
  }

  if (d.baseSpells)
    checkGrant(d.baseSpells, 'base spells', fail, expectSpell, npcIds);

  if (d.attacks.length === 0) fail('a role needs a basic attack');
  for (const attack of d.attacks) {
    if (attack.ranges.length === 0) fail(`${attack.id} attack needs a range`);
    for (const accuracy of attack.accuracies) {
      if (!ACCURACY.test(accuracy)) fail(`bad accuracy "${accuracy}"`);
    }
    if (!Number.isInteger(attack.damage))
      fail(`${attack.id} damage must be an integer`);
    checkTokens(attack.effect, attack.slots, `${attack.id} attack`, fail);
    for (const option of attack.options ?? []) {
      checkTokens(
        option.effect,
        [...(attack.slots ?? []), ...(option.slots ?? [])],
        `${attack.id} attack option "${option.id}"`,
        fail,
      );
    }
  }
}

/** Returns every problem found in the seed data; empty means it is valid. */
export function validateSeed(entries: SeedEntry[]): string[] {
  const errors: string[] = [];
  const typeBySlug = new Map<string, EntryType>();
  const npcIds = new Set<string>(
    entries.flatMap((e) =>
      e.type === 'rule' && e.details.forge === 'npc-spells'
        ? e.details.spells.map((spell) => spell.id)
        : [],
    ),
  );

  for (const entry of entries) {
    const slug = resolveSlug(entry);
    if (typeBySlug.has(slug)) {
      errors.push(
        `${slug}: duplicate slug; set an explicit "slug" on one of them`,
      );
    }
    typeBySlug.set(slug, entry.type);
  }

  // Creature Groups: stat-less Creature Entries that the other Creatures point to.
  const groupSlugs = new Set<string>();
  const groupsWithMembers = new Set<string>();
  for (const entry of entries) {
    if (entry.type !== 'creature') continue;
    if (isCreatureGroup(entry.details)) groupSlugs.add(resolveSlug(entry));
    else if (entry.details.groupSlug)
      groupsWithMembers.add(entry.details.groupSlug);
  }

  const expectType = (from: string, slug: string, type: EntryType) => {
    if (typeBySlug.get(slug) !== type) {
      errors.push(`${from}: "${slug}" is not a ${type} entry`);
    }
  };

  for (const entry of entries) {
    const slug = resolveSlug(entry);
    const fail = (message: string) => errors.push(`${slug}: ${message}`);

    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail('invalid slug');
    if (!ENTRY_TYPES.includes(entry.type)) fail(`unknown type "${entry.type}"`);
    if (entry.source && !ENTRY_SOURCES.includes(entry.source))
      fail(`unknown source "${entry.source}"`);
    if (!entry.name.trim()) fail('empty name');
    if (!entry.summary.trim()) fail('empty summary');

    if (entry.page === null) {
      if (entry.type !== 'guide') fail('missing page reference');
    } else if (
      !Number.isInteger(entry.page) ||
      entry.page < 1 ||
      entry.page > MAX_PAGE
    ) {
      fail(
        `page ${entry.page} is not a printed page between 1 and ${MAX_PAGE}`,
      );
    }

    for (const text of [entry.body ?? '', entry.summary]) {
      for (const [, target] of text.matchAll(LINK)) {
        if (!typeBySlug.has(target)) fail(`link to unknown entry "${target}"`);
      }
    }

    switch (entry.type) {
      case 'rule': {
        const details = entry.details;
        if (details.forge === 'custom-weapon') {
          validateCustomWeapon(details, fail);
        } else if (details.forge === 'rare-weapon') {
          validateRareWeapon(details, fail, (target) =>
            expectType(slug, target, 'equipment'),
          );
        } else if (details.forge === 'quick-assembly') {
          validateQuickAssembly(
            details,
            fail,
            (target) => expectType(slug, target, 'spell'),
            npcIds,
          );
        } else if (details.forge === 'quick-assembly-role') {
          validateQuickAssemblyRole(
            details,
            fail,
            (target) => expectType(slug, target, 'spell'),
            npcIds,
          );
        } else if (details.forge === 'npc-spells') {
          validateNpcSpells(details, fail);
        } else if (details.forge !== undefined) {
          fail('unknown details.forge');
        }
        break;
      }
      case 'class': {
        const { otherNames, freeBenefits } = entry.details;
        if (!Array.isArray(otherNames))
          fail('details.otherNames must be a list');
        if (!Array.isArray(freeBenefits) || freeBenefits.length === 0) {
          fail('details.freeBenefits must be a non-empty list');
        }
        break;
      }
      case 'skill': {
        const { classSlug, maxLevel } = entry.details;
        expectType(slug, classSlug, 'class');
        if (!Number.isInteger(maxLevel) || maxLevel < 1) {
          fail('details.maxLevel must be a positive integer');
        }
        break;
      }
      case 'heroic-skill': {
        const { requirements, repeatable } = entry.details;
        const { classes, required, alsoRequires } = requirements;
        for (const target of classes) expectType(slug, target, 'class');
        if (new Set(classes).size !== classes.length)
          fail('requirements.classes has duplicates');
        if (
          !Number.isInteger(required) ||
          required < Math.min(1, classes.length) ||
          required > classes.length
        ) {
          fail(
            `requirements.required (${required}) must be between ${Math.min(1, classes.length)} and the number of classes (${classes.length})`,
          );
        }
        for (const target of alsoRequires) {
          if (!['skill', 'spell'].includes(typeBySlug.get(target) ?? '')) {
            fail(
              `requirements.alsoRequires "${target}" is not a skill or spell`,
            );
          }
        }
        if (typeof repeatable !== 'boolean')
          fail('details.repeatable must be a boolean');
        break;
      }
      case 'spell': {
        const { classSlug, mpCost, target, duration, offensive } =
          entry.details;
        expectType(slug, classSlug, 'class');
        if (!/^(até )?\d+( × A)?$/.test(mpCost))
          fail(`details.mpCost "${mpCost}" is not "N", "N × A" or "até N"`);
        if (!target) fail('details.target is required');
        if (!duration) fail('details.duration is required');
        if (typeof offensive !== 'boolean')
          fail('details.offensive must be a boolean');
        break;
      }
      case 'equipment': {
        const d = entry.details;
        if (!EQUIPMENT_KINDS.includes(d.kind)) fail(`unknown kind "${d.kind}"`);
        if (
          (d.kind === 'accessory' || d.kind === 'artifact') &&
          d.rarity !== 'rare'
        ) {
          fail('accessories and artifacts are always rare');
        }
        if (d.cost !== null && !(Number.isInteger(d.cost) && d.cost >= 0)) {
          fail('details.cost must be a non-negative integer or null');
        }
        if (d.kind === 'armor' || d.kind === 'shield') {
          if (!d.defense) fail('armor and shield need details.defense');
        }
        if (d.kind === 'armor' && !Number.isInteger(d.initiative)) {
          fail('armor needs integer details.initiative');
        }
        if (d.kind === 'weapon') {
          if (!d.category) fail('weapon needs details.category');
          if (!ACCURACY.test(d.accuracy ?? ''))
            fail(`bad details.accuracy "${d.accuracy}"`);
          if (!Number.isInteger(d.damage))
            fail('weapon needs integer details.damage');
          if (!d.damageType) fail('weapon needs details.damageType');
          if (d.hands !== 1 && d.hands !== 2)
            fail('weapon details.hands must be 1 or 2');
          if (d.range !== 'melee' && d.range !== 'ranged') {
            fail('weapon details.range must be melee or ranged');
          }
        }
        break;
      }
      case 'creature': {
        if (isCreatureGroup(entry.details)) {
          if (!groupsWithMembers.has(slug))
            fail('a creature group needs at least one member');
          break;
        }
        if (entry.details.groupSlug && !groupSlugs.has(entry.details.groupSlug))
          fail(`"${entry.details.groupSlug}" is not a creature group`);
        const { level, hp, crisis, attributes, species, rank, affinities } =
          entry.details;
        if (!SPECIES.includes(species))
          fail(`unknown details.species "${species}"`);
        if (!RANKS.includes(rank)) fail(`unknown details.rank "${rank}"`);
        if (entry.source === 'bestiary-vol-1' && !entry.details.originalName)
          fail('a Bestiary Vol. I Creature needs details.originalName');
        if (entry.source === 'bestiary-vol-1' && !entry.details.role)
          fail('a Bestiary Vol. I Creature needs details.role');
        const { championX, flags } = entry.details;
        if (rank === 'champion' && entry.source === 'bestiary-vol-1') {
          if (championX === undefined)
            fail('a champion needs details.championX');
          else if (
            !Number.isInteger(championX) ||
            championX < 1 ||
            championX > 6
          )
            fail(
              `details.championX (${championX}) must be an integer from 1 to 6`,
            );
        } else if (rank !== 'champion' && championX !== undefined) {
          fail('only a champion has details.championX');
        }
        for (const flag of flags ?? []) {
          if (!CREATURE_FLAGS.includes(flag))
            fail(`unknown details.flags "${flag}"`);
        }
        if (flags?.includes('part') && !entry.details.groupSlug)
          fail('a Part must belong to a creature group');
        if ((entry.source ?? 'livro-basico') === 'livro-basico') {
          if (entry.details.role) fail('only the Bestiary Vol. I has a role');
          if (rank === 'champion')
            fail('only the Bestiary Vol. I has champions');
        }
        for (const [type, affinity] of Object.entries(affinities)) {
          if (!DAMAGE_TYPES.includes(type as DamageType))
            fail(`unknown damage type "${type}" in details.affinities`);
          if (!AFFINITIES.includes(affinity))
            fail(`unknown affinity "${affinity}" for ${type}`);
        }
        for (const code of ATTRIBUTES) {
          if (!DICE.includes(attributes[code]))
            fail(`details.attributes.${code} must be a die from d6 to d12`);
        }
        if (!Number.isInteger(level) || level < 5 || level > 60 || level % 5)
          fail(`details.level (${level}) must be a multiple of 5 from 5 to 60`);
        if (crisis !== Math.floor(hp / 2))
          fail(
            `details.crisis (${crisis}) must be half of hp (${hp}), rounded down`,
          );
        break;
      }
      case 'service': {
        const { group, cost, medium } = entry.details;
        if (!SERVICE_GROUPS.includes(group))
          fail(`unknown details.group "${group}"`);
        if (!Number.isInteger(cost) || cost < 0)
          fail('details.cost must be a non-negative integer');
        if (medium !== undefined && !MEDIUMS.includes(medium))
          fail(`unknown details.medium "${medium}"`);
        if (group === 'travel' && !medium)
          fail('a travel fare needs details.medium');
        if (group === 'settlement' && medium)
          fail('only a travel fare has details.medium');
        break;
      }
      case 'transport': {
        const { transportClass, medium, cost, passengers, distance } =
          entry.details;
        if (!TRANSPORT_CLASSES.includes(transportClass))
          fail(`unknown details.transportClass "${transportClass}"`);
        if (!MEDIUMS.includes(medium))
          fail(`unknown details.medium "${medium}"`);
        if (!Number.isInteger(cost) || cost < 0)
          fail('details.cost must be a non-negative integer');
        if (!Number.isInteger(passengers) || passengers < 1)
          fail('details.passengers must be a positive integer');
        const scales = Object.entries(distance ?? {});
        for (const [scale, multiplier] of scales) {
          if (
            multiplier !== null &&
            !(Number.isInteger(multiplier) && multiplier >= 1)
          ) {
            fail(
              `details.distance.${scale} must be a positive integer or null`,
            );
          }
        }
        if (scales.every(([, multiplier]) => multiplier === null))
          fail('a Transport needs at least one distance multiplier');
        break;
      }
      case 'guide': {
        const { steps, order } = entry.details;
        if (typeof order !== 'number') fail('guide needs a numeric order');
        if (!Array.isArray(steps) || steps.length === 0)
          fail('guide needs steps');
        for (const step of steps ?? []) {
          if (!step.title || !step.intro)
            fail('every guide step needs a title and intro');
          for (const target of step.entries) {
            if (!typeBySlug.has(target))
              fail(`step "${step.title}" links to unknown entry "${target}"`);
          }
        }
        break;
      }
    }
  }

  return errors;
}
