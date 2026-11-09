import { useQuery } from '@tanstack/react-query';
import { fetchEntry } from '../api/client';

export function useEntry(slug: string | undefined) {
  return useQuery({
    queryKey: ['entry', slug],
    queryFn: () => fetchEntry(slug as string),
    enabled: Boolean(slug),
    retry: false,
  });
}
