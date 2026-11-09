import { useMemo } from 'react';
import type { EntrySummary } from '../api/types';
import { useEntries } from './useEntries';

/** Every entry without bodies, indexed by slug. Cached across the app. */
export function useEntryIndex() {
  const query = useEntries('');
  const bySlug = useMemo(
    () =>
      new Map<string, EntrySummary>(
        (query.data ?? []).map((entry) => [entry.slug, entry]),
      ),
    [query.data],
  );
  return { ...query, entries: query.data ?? [], bySlug };
}
