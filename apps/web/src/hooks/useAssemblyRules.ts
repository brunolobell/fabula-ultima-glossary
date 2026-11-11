import { useQueries } from '@tanstack/react-query';
import { fetchEntry } from '../api/client';
import { ASSEMBLY_RULE_SLUGS, readAssemblyRules } from '../lib/assemblyRules';

/** Fetches the Rules of the Quick Assembly by slug (the entry list leaves their `details` out). */
export function useAssemblyRules() {
  const queries = useQueries({
    queries: ASSEMBLY_RULE_SLUGS.map((slug) => ({
      queryKey: ['entry', slug],
      queryFn: () => fetchEntry(slug),
      retry: false,
    })),
  });
  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const assembly =
    isLoading || isError
      ? null
      : readAssemblyRules(
          new Map(
            queries.flatMap((q) =>
              q.data ? [[q.data.slug, q.data.details] as const] : [],
            ),
          ),
        );
  return {
    assembly,
    isLoading,
    isError,
    refetch: () => queries.forEach((q) => q.refetch()),
  };
}
