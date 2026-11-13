import type { ClassDetails, ClassTrait, EntrySummary } from '../api/types';

/** What a Class's free benefits can grant, in the order the lists show them. */
export const CLASS_TRAIT_ORDER: readonly ClassTrait[] = [
  'hp',
  'mp',
  'ip',
  'melee-weapon',
  'ranged-weapon',
  'armor',
  'shield',
  'rituals',
  'projects',
];

export const CLASS_TRAIT_LABEL: Record<ClassTrait, string> = {
  hp: 'Aumento de PV',
  mp: 'Aumento de PM',
  ip: 'Aumento de PI',
  'melee-weapon': 'Armas corpo a corpo marciais',
  'ranged-weapon': 'Armas à distância marciais',
  armor: 'Armaduras marciais',
  shield: 'Escudos marciais',
  rituals: 'Rituais',
  projects: 'Projetos',
};

/** Labels in canonical order; codes the web app does not know are dropped. */
export const classTraitLabels = (traits: readonly ClassTrait[]): string[] =>
  CLASS_TRAIT_ORDER.filter((trait) => traits.includes(trait)).map(
    (trait) => CLASS_TRAIT_LABEL[trait],
  );

/**
 * A Class's traits. `?? []` is deliberate: older seeded databases and cached
 * list responses (stale-while-revalidate) can lack `traits`, and /classes must
 * not throw.
 */
export const classTraitsOf = (entry: EntrySummary): ClassTrait[] =>
  (entry.details as ClassDetails).traits ?? [];
