import { Link } from 'react-router-dom';
import type { EntrySummary } from '../api/types';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { decorateChecks } from '../lib/check';
import { entryPath } from '../lib/entryTypes';
import { requirementText } from '../lib/requirements';
import type { HeroicSkillDetails, SkillDetails, SpellDetails } from '../api/types';
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

/** The Class a Skill or Spell belongs to, with a trailing separator. Plain text:
 *  the whole row is already a link, and links cannot nest. */
function ClassName({ slug }: { slug: string }) {
  const { bySlug } = useEntryIndex();
  const entry = bySlug.get(slug);
  return entry ? <span className="text-ink">{entry.name} · </span> : null;
}

/** The facts a Reader scans for, then where it is in the book. */
function RowMeta({ entry }: { entry: EntrySummary }) {
  return (
    <p className="mt-1 text-[15px] text-muted">
      {entry.type === 'skill' && (
        <ClassName slug={(entry.details as SkillDetails).classSlug} />
      )}
      {entry.type === 'spell' && (
        <>
          <ClassName slug={(entry.details as SpellDetails).classSlug} />
          <span title={(entry.details as SpellDetails).mpCost.includes('×') ? 'Custo por alvo' : undefined}>
            PM <strong className="text-ink">{(entry.details as SpellDetails).mpCost}</strong>
            {' · '}
          </span>
        </>
      )}
      <PageRef page={entry.page} source={entry.source} />
    </p>
  );
}

/** `showType` is off on lists that hold one Entry Type, where the badge repeats the page title. */
export function ResultRow({
  entry,
  showType = true,
}: {
  entry: EntrySummary;
  showType?: boolean;
}) {
  return (
    <li>
      <Link to={entryPath(entry)} className="result-row">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="result-name">{entry.name}</span>
          {showType && <TypeBadge type={entry.type} />}
        </div>
        <p className="mt-1 line-clamp-2">{decorateChecks(entry.summary)}</p>
        {entry.type === 'heroic-skill' && <HeroicRequirement entry={entry} />}
        <RowMeta entry={entry} />
      </Link>
    </li>
  );
}
