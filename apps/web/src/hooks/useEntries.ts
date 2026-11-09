import { useQuery } from '@tanstack/react-query';
import { fetchEntries } from '../api/client';
import type { EntryType } from '../api/types';

export function useEntries(search: string, type?: EntryType) {
  return useQuery({
    queryKey: ['entries', search, type ?? null],
    queryFn: () => fetchEntries(search, type),
  });
}
