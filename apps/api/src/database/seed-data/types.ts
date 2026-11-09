import { DetailsByType, EntryType } from '../../entries/entry-types';

interface SeedBase {
  name: string;
  /** Defaults to slugify(name); set it only to resolve a collision. */
  slug?: string;
  summary: string;
  /** Markdown. `[[slug]]` links to another entry. */
  body?: string;
  /** Printed page number in the Livro Básico (not the PDF index). */
  page: number | null;
  tags?: string[];
}

export type SeedEntry = {
  [T in EntryType]: SeedBase & { type: T; details: DetailsByType[T] };
}[EntryType];
