import { CreatureDetails, Rank, Species } from './entry-types';

/** Portuguese names, as the Livro Básico prints them (p. 303-305, 293). */
const SPECIES_NAMES: Record<Species, string> = {
  construct: 'Construto',
  demon: 'Demônio',
  elemental: 'Elemental',
  beast: 'Fera',
  humanoid: 'Humanoide',
  monster: 'Monstro',
  undead: 'Morto-vivo',
  plant: 'Planta',
};

const RANK_NAMES: Record<Rank, string> = {
  soldier: 'soldado',
  elite: 'elite',
  champion: 'campeão',
};

/**
 * The words a Reader may search a Creature by, beyond its name and Summary:
 * Species, Rank, Villain, Traits, the name of every attack, spell and ability,
 * and the English name of a Bestiary Vol. I Creature. The entity folds
 * accents and case when it builds `searchText`.
 */
export function creatureSearchTerms(details: CreatureDetails): string[] {
  return [
    SPECIES_NAMES[details.species],
    RANK_NAMES[details.rank],
    ...(details.villain ? ['vilão'] : []),
    ...(details.originalName ? [details.originalName] : []),
    ...details.traits,
    ...details.attacks.map((attack) => attack.name),
    ...details.spells.map((spell) => spell.name),
    ...details.otherActions.map((action) => action.name),
    ...details.specialRules.map((rule) => rule.name),
  ];
}
