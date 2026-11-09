import { Link } from 'react-router-dom';
import type { EntrySummary } from '../api/types';
import { decorateChecks } from '../lib/check';
import { entryPath } from '../lib/entryTypes';
import { PageRef } from './PageRef';
import { TypeBadge } from './TypeBadge';

export function ResultRow({ entry }: { entry: EntrySummary }) {
  return (
    <li>
      <Link to={entryPath(entry)} className="result-row">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="result-name">{entry.name}</span>
          <TypeBadge type={entry.type} />
        </div>
        <p className="mt-1 line-clamp-2">{decorateChecks(entry.summary)}</p>
        <p className="mt-1 text-[15px]">
          <PageRef page={entry.page} />
        </p>
      </Link>
    </li>
  );
}
