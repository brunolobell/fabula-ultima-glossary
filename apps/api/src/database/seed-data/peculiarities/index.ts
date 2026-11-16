import { inBook } from '../helpers';
import { SeedEntry } from '../types';
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
 * A Peculiarity that a later Atlas prints again, word for word, is one Entry:
 * the one of the earliest book. This lists where else it appears, by name, so
 * its page says so ("Também em:"). `note` records a difference in the reprint.
 */
const REPRINTS: Record<
  string,
  { label: (typeof BOOKS)[number]['label']; page: number; note?: string }[]
> = {
  Amaldiçoado: [{ label: 'Atlas Natural Fantasy', page: 120 }],
  Arbóreo: [{ label: 'Atlas Natural Fantasy', page: 121 }],
  'Cerne Elemental': [{ label: 'Atlas Natural Fantasy', page: 121 }],
  'De Um Mundo Distante': [{ label: 'Atlas Techno Fantasy', page: 120 }],
  'Fera Falante': [{ label: 'Atlas Techno Fantasy', page: 123 }],
  Robô: [
    { label: 'Atlas Natural Fantasy', page: 127 },
    {
      label: 'Atlas Techno Fantasy',
      page: 127,
      note: 'nessa versão, descreve o Robô como um humanoide parcial ou totalmente mecânico',
    },
  ],
  Sobrevivente: [
    {
      label: 'Atlas Techno Fantasy',
      page: 127,
      note: 'nessa versão, a catástrofe pode ser também um ataque militar ou uma invasão corporativa',
    },
  ],
  Voo: [{ label: 'Atlas Natural Fantasy', page: 128 }],
};

const alsoIn = (name: string): string | null => {
  const reprints = REPRINTS[name];
  if (!reprints) return null;
  return reprints
    .map((r) => `${r.label} (p. ${r.page}${r.note ? `; ${r.note}` : ''})`)
    .join('; ');
};

/**
 * Peculiarities of the three Atlases, in book order, one Entry per name (the
 * earliest book keeps it; see `REPRINTS`).
 */
export const peculiarities: SeedEntry[] = BOOKS.flatMap((book) =>
  inBook(
    book.source,
    book.entries.map((entry) => {
      const also = alsoIn(entry.name);
      if (!also) return entry;
      return {
        ...entry,
        body: `${entry.body}\n\n**Também em:** ${also}.`,
      } as SeedEntry;
    }),
  ),
);
