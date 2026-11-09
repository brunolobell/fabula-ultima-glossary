import type { EntryType } from '../api/types';
import { entryPath } from './entryTypes';

const LINK = /\[\[([^\]]+)\]\]/g;

type Index = ReadonlyMap<string, { name: string; type: EntryType }>;

/** Turns `[[slug]]` into a Markdown link to that entry, labelled by its name. */
export function resolveEntryLinks(text: string, index: Index): string {
  return text.replace(LINK, (_match, slug: string) => {
    const entry = index.get(slug);
    if (entry) {
      return `[${entry.name}](${entryPath({ type: entry.type, slug })})`;
    }
    return `[${slug.replace(/-/g, ' ')}](/buscar?q=${encodeURIComponent(slug)})`;
  });
}

/** Slugs referenced with `[[slug]]`, unique, in order of appearance. */
export function extractLinkedSlugs(...texts: string[]): string[] {
  const found = new Set<string>();
  for (const text of texts) {
    for (const [, slug] of text.matchAll(LINK)) found.add(slug);
  }
  return [...found];
}
