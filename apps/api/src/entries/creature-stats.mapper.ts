import { CreatureStats } from './entities/creature-stats.entity';
import {
  CreatureDetails,
  ServedCreature,
  ServedCreatureSummary,
} from './entry-types';

/** The columns of a `creature_stats` row for a seeded stat block (the seed adds `entryId`). */
export type CreatureStatsColumns = Omit<CreatureStats, 'entryId' | 'entry'>;

export function statsFromCreatureDetails(
  details: CreatureDetails,
  /** Place among the members of its Creature Group. */
  groupOrder?: number,
): CreatureStatsColumns {
  return {
    level: details.level,
    species: details.species,
    rank: details.rank,
    role: details.role ?? null,
    championX: details.championX ?? null,
    flags: details.flags ?? [],
    villain: details.villain,
    originalName: details.originalName ?? null,
    groupSlug: details.groupSlug ?? null,
    groupOrder: details.groupSlug ? (groupOrder ?? 0) : null,
    traits: details.traits,
    des: details.attributes.DES,
    ast: details.attributes.AST,
    vig: details.attributes.VIG,
    von: details.attributes.VON,
    hp: details.hp,
    crisis: details.crisis,
    mp: details.mp,
    initiative: details.initiative,
    defense: details.defense.value,
    defenseFixed: details.defense.fixed,
    magicDefense: details.magicDefense,
    hasSpells: details.spells.length > 0,
    affinities: details.affinities,
    attacks: details.attacks,
    spells: details.spells,
    otherActions: details.otherActions,
    specialRules: details.specialRules,
  };
}

/** The scalar part of the stat block: what the list sends and the filters read. */
export function creatureSummaryFromStats(
  row: CreatureStats,
): ServedCreatureSummary {
  return {
    level: row.level,
    species: row.species,
    rank: row.rank,
    ...(row.role ? { role: row.role } : {}),
    ...(row.championX ? { championX: row.championX } : {}),
    ...(row.flags.length > 0 ? { flags: row.flags } : {}),
    villain: row.villain,
    ...(row.originalName ? { originalName: row.originalName } : {}),
    ...(row.groupSlug ? { groupSlug: row.groupSlug } : {}),
    traits: row.traits,
    attributes: { DES: row.des, AST: row.ast, VIG: row.vig, VON: row.von },
    hp: row.hp,
    crisis: row.crisis,
    mp: row.mp,
    initiative: row.initiative,
    defense: { value: row.defense, fixed: row.defenseFixed },
    magicDefense: row.magicDefense,
    hasSpells: row.hasSpells,
    affinities: row.affinities,
  };
}

/** The whole stat block, abilities included. */
export function creatureDetailsFromStats(row: CreatureStats): ServedCreature {
  return {
    ...creatureSummaryFromStats(row),
    attacks: row.attacks,
    spells: row.spells,
    otherActions: row.otherActions,
    specialRules: row.specialRules,
  };
}
