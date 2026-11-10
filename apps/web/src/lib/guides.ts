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
