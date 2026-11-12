import type {
  Affinity,
  CreatureAttack,
  CreatureDetails,
  CreatureSpell,
  DamageType,
  Species,
  VillainTier,
} from '../api/types';

/**
 * A stat block as the NPC JSON of Fultimator, the format Foundry's Fabula Ultima system
 * (projectfu) imports. Fultimator derives HP, MP, Initiative and the damage of an attack
 * from the level, the dice and the rank, and keeps only the difference in `extra` and in
 * each attack; so this converter subtracts those formulas from the numbers we assembled.
 * Nothing here is saved.
 */
export interface FoundryNpc {
  name: string;
  species: string;
  lvl: number;
  rank: string;
  villain: '' | VillainTier;
  traits: string;
  description: string;
  imgurl: string;
  attributes: Record<'dexterity' | 'insight' | 'might' | 'will', number>;
  affinities: Record<string, 'vu' | 'rs' | 'im' | 'ab'>;
  immunities: Record<string, boolean>;
  extra: Record<string, number | string | boolean>;
  attacks: FoundryAttack[];
  spells: FoundrySpell[];
  actions: FoundryAbility[];
  special: FoundryAbility[];
  notes: FoundryAbility[];
  dataType: 'npc';
}

interface FoundryAbility {
  name: string;
  effect: string;
}

interface FoundryAttack {
  itemType: 'basic';
  name: string;
  range: 'melee' | 'distance';
  attr1: string;
  attr2: string;
  type: string;
  extraDamage?: boolean;
  flathit?: string;
  flatdmg?: string;
  special: string[];
}

interface FoundrySpell {
  itemType: 'spell';
  name: string;
  mp: string;
  target: string;
  duration: string;
  type: 'offensive' | '';
  attr1?: string;
  attr2?: string;
  damagetype: string;
  effect: string;
  special: string[];
}

export interface FoundryOptions {
  /** How many soldiers a champion replaces (1 to 6); used only for a champion. */
  championX: number;
  /** Used only when the Creature is a Villain. */
  tier: VillainTier;
  /** Condition immunities of the Species, by Fultimator key (`poisoned`, `dazed`…). */
  statusImmunities?: readonly string[];
}

export interface FoundryExport {
  npc: FoundryNpc;
  /** Numbers Fultimator cannot hold exactly; the Creature will differ a little in Foundry. */
  warnings: string[];
}

const SPECIES_NAME: Record<Species, string> = {
  beast: 'Beast',
  construct: 'Construct',
  demon: 'Demon',
  elemental: 'Elemental',
  humanoid: 'Humanoid',
  monster: 'Monster',
  plant: 'Plant',
  undead: 'Undead',
};

const ATTRIBUTE_KEY = {
  DES: 'dexterity',
  AST: 'insight',
  VIG: 'might',
  VON: 'will',
} as const;

const AFFINITY_CODE: Record<Affinity, 'vu' | 'rs' | 'im' | 'ab'> = {
  vulnerable: 'vu',
  resistant: 'rs',
  immune: 'im',
  absorbs: 'ab',
};

/** Fultimator calls air damage "wind". */
const damageKey = (damage: DamageType) => (damage === 'air' ? 'wind' : damage);

const attributeKey = (label: string) =>
  ATTRIBUTE_KEY[label.trim() as keyof typeof ATTRIBUTE_KEY] ?? 'dexterity';

/** "DES + VIG" to the two Fultimator attribute names. */
const splitCheck = (formula: string) => {
  const [a = 'DES', b = 'DES'] = formula.split('+');
  return [attributeKey(a), attributeKey(b)] as const;
};

/** Rank to the three things Fultimator multiplies or adds by. */
function rankFactors(rank: string) {
  const champion = /^champion(\d)$/.exec(rank);
  if (champion) {
    const n = Number(champion[1]);
    return { hp: n, mp: 2, init: n };
  }
  if (rank === 'elite') return { hp: 2, mp: 1, init: 2 };
  return { hp: 1, mp: 1, init: 0 };
}

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.round(n)));

function convertAttack(
  a: CreatureAttack,
  level: number,
  warnings: string[],
): FoundryAttack {
  const [attr1, attr2] = splitCheck(a.accuracy);
  const out: FoundryAttack = {
    itemType: 'basic',
    name: a.name,
    range: a.range === 'melee' ? 'melee' : 'distance',
    attr1,
    attr2,
    type: a.damage === null ? 'nodmg' : (a.damageType ?? 'physical'),
    special: a.effect ? [a.effect] : [],
  };
  const hit = a.accuracyBonus - Math.floor(level / 10);
  if (hit !== 0) out.flathit = String(hit);
  if (a.damage !== null) {
    // Fultimator: 5, +5 per 20 levels, +5 with "extraDamage", then the flat bonus.
    const rest = a.damage - 5 - Math.floor(level / 20) * 5;
    if (rest >= 5) {
      out.extraDamage = true;
      if (rest > 5) out.flatdmg = String(rest - 5);
    } else if (rest !== 0) {
      out.flatdmg = String(rest);
    }
  }
  if (a.damage !== null && a.damageType === null) {
    warnings.push(
      `${a.name}: o tipo de dano é definido por uma regra; o JSON usa "físico".`,
    );
  }
  return out;
}

function convertSpell(
  s: CreatureSpell,
  level: number,
  warnings: string[],
): FoundrySpell {
  const out: FoundrySpell = {
    itemType: 'spell',
    name: s.name,
    mp: s.mpCost,
    target: s.target,
    duration: s.duration,
    type: s.offensive ? 'offensive' : '',
    // The spell's damage type is in its text, not a field we keep.
    damagetype: 'nodmg',
    effect: s.effect,
    special: [],
  };
  if (s.offensive && s.accuracy) {
    [out.attr1, out.attr2] = splitCheck(s.accuracy);
    if ((s.accuracyBonus ?? 0) !== Math.floor(level / 10)) {
      warnings.push(
        `${s.name}: o bônus de precisão difere do nível; o Foundry calcula só pelo nível.`,
      );
    }
  }
  return out;
}

export function creatureToFoundry(
  name: string,
  d: CreatureDetails,
  options: FoundryOptions,
): FoundryExport {
  const warnings: string[] = [];
  const rank =
    d.rank === 'champion'
      ? `champion${clamp(options.championX, 1, 6)}`
      : d.rank;
  const factor = rankFactors(rank);
  const attributes = {
    dexterity: d.attributes.DES,
    insight: d.attributes.AST,
    might: d.attributes.VIG,
    will: d.attributes.VON,
  };

  const extra: FoundryNpc['extra'] = {};
  // HP = (2 × level + 5 × VIG + extra.hp) × rank; MP = level + 5 × VON + extra.mp, ×2 for a champion.
  const baseHp = 2 * d.level + 5 * attributes.might;
  const extraHp = d.hp / factor.hp - baseHp;
  if (!Number.isInteger(extraHp)) {
    warnings.push(
      `PV ${d.hp} não divide por ${factor.hp}; o Foundry mostrará ${Math.round(extraHp + baseHp) * factor.hp}.`,
    );
  }
  if (Math.round(extraHp) !== 0) extra.hp = String(Math.round(extraHp));

  const baseMp = d.level + 5 * attributes.will;
  const extraMp = d.mp / factor.mp - baseMp;
  if (!Number.isInteger(extraMp)) {
    warnings.push(
      `PM ${d.mp} não divide por ${factor.mp}; o Foundry mostrará ${Math.round(extraMp + baseMp) * factor.mp}.`,
    );
  }
  if (Math.round(extraMp) !== 0) extra.mp = String(Math.round(extraMp));

  // Initiative = (DES + AST) / 2 + rank bonus + extra.extrainit.
  const baseInit =
    (attributes.dexterity + attributes.insight) / 2 + factor.init;
  const extraInit = d.initiative - baseInit;
  if (extraInit !== 0) extra.extrainit = extraInit;

  // A fixed Defense (martial armor) replaces the total; otherwise it is a bonus to the die.
  if (d.defense.fixed) {
    extra.defOverride = true;
    extra.def = d.defense.value;
  } else if (d.defense.value !== 0) {
    extra.def = d.defense.value;
  }
  if (d.magicDefense !== 0) extra.mDef = d.magicDefense;

  const affinities: FoundryNpc['affinities'] = {};
  for (const [damage, affinity] of Object.entries(d.affinities) as [
    DamageType,
    Affinity,
  ][]) {
    affinities[damageKey(damage)] = AFFINITY_CODE[affinity];
  }

  return {
    npc: {
      name,
      species: SPECIES_NAME[d.species],
      lvl: d.level,
      rank,
      villain: d.villain ? options.tier : '',
      traits: d.traits.join(', '),
      description: '',
      imgurl: '',
      attributes,
      affinities,
      immunities: Object.fromEntries(
        (options.statusImmunities ?? []).map((key) => [key, true]),
      ),
      extra,
      attacks: d.attacks.map((a) => convertAttack(a, d.level, warnings)),
      spells: d.spells.map((s) => convertSpell(s, d.level, warnings)),
      actions: d.otherActions.map(({ name, effect }) => ({ name, effect })),
      special: d.specialRules.map(({ name, effect }) => ({ name, effect })),
      notes: [],
      dataType: 'npc',
    },
    warnings,
  };
}
