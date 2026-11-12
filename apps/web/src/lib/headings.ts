import { resolveEntryLinks } from './links';

type Index = Parameters<typeof resolveEntryLinks>[1];

/** The text a Markdown heading shows: links, emphasis and code marks removed. */
export function plainHeading(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** "Os três Traços" -> "os-tres-tracos". */
export function headingSlug(text: string): string {
  return (
    text
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'secao'
  );
}

/** Makes ids unique within one page: the second "Exemplos" becomes "exemplos-2". */
export function uniqueIds(texts: readonly string[]): string[] {
  const seen = new Map<string, number>();
  return texts.map((text) => {
    const slug = headingSlug(text);
    const count = (seen.get(slug) ?? 0) + 1;
    seen.set(slug, count);
    return count === 1 ? slug : `${slug}-${count}`;
  });
}

export interface Outline {
  id: string;
  text: string;
  /** 1-based line of the heading in the body, as the Markdown parser reports it. */
  line: number;
}

/**
 * The secondary (`##`) headings of a Markdown body with the ids `EntryBody`
 * gives them, in order. Both read the same text, so a jump link always lands.
 */
export function outline(body: string, index: Index): Outline[] {
  const resolved = resolveEntryLinks(body, index);
  const texts: string[] = [];
  const lines: number[] = [];
  let fenced = false;
  resolved.split('\n').forEach((line, i) => {
    if (/^\s*```/.test(line)) fenced = !fenced;
    if (fenced) return;
    const match = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      texts.push(plainHeading(match[1]));
      lines.push(i + 1);
    }
  });
  const ids = uniqueIds(texts);
  return texts.map((text, i) => ({ id: ids[i], text, line: lines[i] }));
}
