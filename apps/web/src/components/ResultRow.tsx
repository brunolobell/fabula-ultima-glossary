import { Link } from 'react-router-dom';
import type { EntrySummary } from '../api/types';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { decorateChecks } from '../lib/check';
import { entryPath } from '../lib/entryTypes';
import { requirementText } from '../lib/requirements';
import type { HeroicSkillDetails } from '../api/types';
import { PageRef } from './PageRef';
import { TypeBadge } from './TypeBadge';

function HeroicRequirement({ entry }: { entry: EntrySummary }) {
  const { bySlug } = useEntryIndex();
  const { requirements } = entry.details as HeroicSkillDetails;
  return (
    <p className="mt-1 text-[15px] text-muted">
      {requirementText(requirements, bySlug)}
    </p>
  );
}

export function ResultRow({ entry }: { entry: EntrySummary }) {
  return (
    <li>
      <Link to={entryPath(entry)} className="result-row">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="result-name">{entry.name}</span>
          <TypeBadge type={entry.type} />
        </div>
        <p className="mt-1 line-clamp-2">{decorateChecks(entry.summary)}</p>
        {entry.type === 'heroic-skill' && <HeroicRequirement entry={entry} />}
        <p className="mt-1 text-[15px]">
          <PageRef page={entry.page} source={entry.source} />
        </p>
      </Link>
    </li>
  );
}
