import type {
  Affinity,
  DamageType,
  Rank,
  Role,
  Species,
  SpeciesRule,
} from '../api/types';

/** The Livro Básico's names (p. 303-305). */
export const SPECIES_LABEL: Record<Species, string> = {
  construct: 'Construto',
  demon: 'Demônio',
  elemental: 'Elemental',
  beast: 'Fera',
  humanoid: 'Humanoide',
  monster: 'Monstro',
  undead: 'Morto-vivo',
  plant: 'Planta',
};

/** The Livro Básico's patentes (p. 293-295). */
export const RANK_LABEL: Record<Rank, string> = {
  soldier: 'Soldado',
  elite: 'Elite',
  champion: 'Campeão',
};
export const RANK_ORDER: readonly Rank[] = ['soldier', 'elite', 'champion'];

/**
 * Quick Assembly Roles ("função"). The Bestiary Vol. I has no Brazilian edition,
 * so these names are our own translation and unofficial (ADR 0004).
 */
export const ROLE_LABEL: Record<Role, string> = {
  brute: 'Bruto',
  hunter: 'Caçador',
  mage: 'Mago',
  saboteur: 'Sabotador',
  sentinel: 'Sentinela',
  support: 'Apoio',
};
export const ROLE_ORDER: readonly Role[] = [
  'brute',
  'hunter',
  'mage',
  'saboteur',
  'sentinel',
  'support',
];

/** The nine damage types in the order the bestiary prints them (p. 321). */
export const DAMAGE_ORDER: readonly DamageType[] = [
  'physical',
  'air',
  'bolt',
  'dark',
  'earth',
  'fire',
  'ice',
  'light',
  'poison',
];

export const DAMAGE_LABEL: Record<DamageType, string> = {
  physical: 'físico',
  air: 'ar',
  bolt: 'raio',
  dark: 'trevas',
  earth: 'terra',
  fire: 'fogo',
  ice: 'gelo',
  light: 'luz',
  poison: 'veneno',
};

export const AFFINITY_LABEL: Record<Affinity, string> = {
  vulnerable: 'Vulnerável',
  resistant: 'Resistente',
  immune: 'Imune',
  absorbs: 'Absorve',
};
export const AFFINITY_ORDER: readonly Affinity[] = [
  'vulnerable',
  'resistant',
  'immune',
  'absorbs',
];

/** "Vulnerável a gelo", "Absorve fogo". */
export const affinityLabel = (damage: DamageType, affinity: Affinity) =>
  affinity === 'absorbs'
    ? `Absorve ${DAMAGE_LABEL[damage]}`
    : `${AFFINITY_LABEL[affinity]} a ${DAMAGE_LABEL[damage]}`;

/** "físico", "de fogo": how the bestiary names the type after "de dano". */
export const damageTypeText = (damage: DamageType) =>
  damage === 'physical' ? 'físico' : `de ${DAMAGE_LABEL[damage]}`;

/** The Rule that holds the shared Quick Assembly numbers, and one Rule per Role. */
export const QUICK_ASSEMBLY_SLUG = 'montagem-rapida';
/** The Rule with the Livro Básico list of NPC spells. */
export const NPC_SPELLS_SLUG = 'feiticos-de-npc';
export const ROLE_RULE_SLUG: Record<Role, string> = {
  brute: 'montagem-rapida-bruto',
  hunter: 'montagem-rapida-cacador',
  mage: 'montagem-rapida-mago',
  saboteur: 'montagem-rapida-sabotador',
  sentinel: 'montagem-rapida-sentinela',
  support: 'montagem-rapida-apoio',
};

export const VILLAIN_TIER_LABEL = {
  minor: 'Menor',
  major: 'Maior',
  supreme: 'Supremo',
} as const;

export const capitalize = (text: string) =>
  `${text[0].toUpperCase()}${text.slice(1)}`;

const STATUS_PT: Record<string, string> = {
  dazed: 'atordoado',
  enraged: 'enfurecido',
  poisoned: 'envenenado',
  shaken: 'abalado',
  slow: 'lento',
  weak: 'fraco',
};

const joinE = (items: string[]) =>
  items.length <= 1
    ? (items[0] ?? '')
    : `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`;

/** What a Species always has, in a line: "Resistência a dano de terra; Imunidade a dano de veneno". */
export function speciesAlways(rule: SpeciesRule): string {
  const noun = {
    resistant: 'Resistência',
    immune: 'Imunidade',
    vulnerable: 'Vulnerabilidade',
    absorbs: 'Absorção',
  } as const;
  const type = (t: DamageType) =>
    t === 'physical' ? 'físico' : `de ${DAMAGE_LABEL[t]}`;
  return [
    ...Object.entries(rule.affinities).map(
      ([t, affinity]) => `${noun[affinity]} a dano ${type(t as DamageType)}`,
    ),
    ...(rule.statusImmunities.length > 0
      ? [
          `imunidade ${rule.statusImmunities.length > 1 ? 'às condições' : 'à condição'} ${joinE(rule.statusImmunities.map((c) => STATUS_PT[c] ?? c))}`,
        ]
      : []),
    ...(rule.resistances
      ? [`Resistência a ${rule.resistances} tipos de dano à sua escolha`]
      : []),
    ...(rule.immunities
      ? [`Imunidade a mais ${rule.immunities} tipo de dano à sua escolha`]
      : []),
  ].join('; ');
}
