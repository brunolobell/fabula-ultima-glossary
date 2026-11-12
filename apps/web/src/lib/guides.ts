import type { EntrySummary, GuideDetails } from '../api/types';

/** The guides in the order of the book (world, party, character, play). */
export function sortedGuides(entries: EntrySummary[]): EntrySummary[] {
  return entries
    .filter((e) => e.type === 'guide')
    .sort(
      (a, b) =>
        (a.details as GuideDetails).order - (b.details as GuideDetails).order,
    );
}

/**
 * A guide's summary cut to its first clause, for a list row: up to the first
 * colon, opening parenthesis or full stop. The whole summary stays on the
 * guide's own page.
 */
export function guideBlurb(summary: string): string {
  const cut = summary.search(/[:(]|\.(\s|$)/);
  const clause = (cut > 0 ? summary.slice(0, cut) : summary)
    .trim()
    .replace(/[,;]$/, '');
  return clause.length >= 20 ? clause : summary;
}
