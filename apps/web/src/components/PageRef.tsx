import type { EntrySource } from '../api/types';
import { SOURCE_LABEL } from '../lib/sources';

export function PageRef({
  page,
  source,
}: {
  page: number | null;
  source: EntrySource;
}) {
  if (page === null) return null;
  return (
    <span className="text-muted">
      ver {SOURCE_LABEL[source]}, página{' '}
      <strong className="text-ink">{page}</strong>
    </span>
  );
}
