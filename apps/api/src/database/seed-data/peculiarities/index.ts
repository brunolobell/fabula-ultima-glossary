import { inBook } from '../helpers';
import { SeedEntry } from '../types';
import { resolveSlug } from '../../seed-validation';
import { peculiaridadesHighFantasy } from './high-fantasy';
import { peculiaridadesNaturalFantasy } from './natural-fantasy';
import { peculiaridadesTechnoFantasy } from './techno-fantasy';

export { peculiaritiesRule } from './rule';

const BOOKS = [
  {
    source: 'high-fantasy',
    label: 'Atlas High Fantasy',
    entries: peculiaridadesHighFantasy,
  },
  {
    source: 'natural-fantasy',
    label: 'Atlas Natural Fantasy',
    entries: peculiaridadesNaturalFantasy,
  },
  {
    source: 'techno-fantasy',
    label: 'Atlas Techno Fantasy',
    entries: peculiaridadesTechnoFantasy,
  },
] as const;

/**
 * Peculiarities of the three Atlases, in book order. A name that a later Atlas
 * reprints keeps its own Entry (its own wording and page); each one ends with a
 * line pointing to the other versions.
 */
export const peculiarities: SeedEntry[] = BOOKS.flatMap((book) =>
  inBook(
    book.source,
    book.entries.map((entry) => {
      const others = BOOKS.filter((b) => b !== book).flatMap((b) =>
        b.entries
          .filter((e) => e.name === entry.name)
          .map((e) => `${b.label} (p. ${e.page}): [[${resolveSlug(e)}]]`),
      );
      if (others.length === 0) return entry;
      return {
        ...entry,
        body: `${entry.body}\n\n**Também em:** ${others.join('; ')}.`,
      } as SeedEntry;
    }),
  ),
);
