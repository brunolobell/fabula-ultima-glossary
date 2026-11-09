import {
  DetailsByType,
  EntrySource,
  EntryType,
} from '../../entries/entry-types';

interface SeedBase {
  name: string;
  /** Defaults to slugify(name); set it only to resolve a collision. */
  slug?: string;
  summary: string;
  /** Markdown. `[[slug]]` links to another entry. */
  body?: string;
  /** Book that `page` refers to; defaults to the Livro Básico. */
  source?: EntrySource;
  /** Printed page number in `source` (not the PDF index). */
  page: number | null;
  tags?: string[];
}

export type SeedEntry = {
  [T in EntryType]: SeedBase & { type: T; details: DetailsByType[T] };
}[EntryType];
