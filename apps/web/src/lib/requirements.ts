import type { ReactNode } from 'react';
import type { EntrySummary, HeroicSkillRequirements } from '../api/types';

type Index = ReadonlyMap<string, EntrySummary>;

/** "A", "A e B", "A, B e C": items interleaved with separators. */
function joinWith(items: ReactNode[], word: 'e' | 'ou'): ReactNode[] {
  return items.flatMap((item, i) => {
    if (i === 0) return [item];
    return [i === items.length - 1 ? ` ${word} ` : ', ', item];
  });
}

/** True when any character can take the Heroic Skill (no Class is required). */
export const isOpenToAll = (r: HeroicSkillRequirements) => r.classes.length === 0;

/** The Classes part of the sentence: "A", "A ou B", "A e B" or "2 entre A, B e C". */
function classPhrase(r: HeroicSkillRequirements, names: ReactNode[]): ReactNode[] {
  if (names.length === 1) return names;
  if (r.required === 1) return joinWith(names, 'ou');
  if (r.required >= names.length) return joinWith(names, 'e');
  return [`${r.required} entre `, ...joinWith(names, 'e')];
}

/** The whole sentence; `name` turns a slug into the node shown for it. */
export function sentence(
  r: HeroicSkillRequirements,
  name: (slug: string) => ReactNode,
): ReactNode[] {
  if (isOpenToAll(r)) return ['Disponível a todos os personagens'];
  return [
    'Dominar ',
    ...classPhrase(r, r.classes.map(name)),
    ...(r.alsoRequires.length > 0
      ? [' · Também exige: ', ...joinWith(r.alsoRequires.map(name), 'e')]
      : []),
    ...(r.note ? [` · ${r.note}`] : []),
  ];
}

/** Plain-text summary, for rows that are links themselves. */
export function requirementText(r: HeroicSkillRequirements, index: Index): string {
  return sentence(r, (slug) => index.get(slug)?.name ?? slug).join('');
}
