import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchEntries } from '../api/client';

export const MIN_SUGGESTION_CHARS = 2;

/** Matches for the type-ahead; keeps the previous list while a new one loads. */
export function useSuggestions(query: string) {
  return useQuery({
    queryKey: ['entries', query, null],
    queryFn: () => fetchEntries(query),
    enabled: query.length >= MIN_SUGGESTION_CHARS,
    placeholderData: keepPreviousData,
  });
}
