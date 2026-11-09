import { Link, Navigate, useParams } from 'react-router-dom';
import { ApiError } from '../api/client';
import type { GuideDetails } from '../api/types';
import { EntryBody } from '../components/EntryBody';
import { PageRef } from '../components/PageRef';
import { ResultRow } from '../components/ResultRow';
import { ErrorState, NotFoundState, PageSkeleton } from '../components/States';
import { TypeBadge } from '../components/TypeBadge';
import { useEntry } from '../hooks/useEntry';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { decorateChecks } from '../lib/check';
import { entryPath, typePath } from '../lib/entryTypes';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function GuidePage() {
  const { slug } = useParams();
  const { data: entry, isLoading, error, refetch } = useEntry(slug);
  const { bySlug } = useEntryIndex();
  useDocumentTitle(entry?.name);

  if (isLoading) return <PageSkeleton />;
  if (error instanceof ApiError && error.status === 404) {
    return <NotFoundState what="guia" />;
  }
  if (error || !entry) return <ErrorState onRetry={() => refetch()} />;
  if (entry.type !== 'guide') return <Navigate to={entryPath(entry)} replace />;

  const { steps } = entry.details as GuideDetails;

  return (
    <article>
      <nav aria-label="Você está em" className="text-[15px] text-muted">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li>
            <Link to={typePath('guide')}>Guias</Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page">{entry.name}</li>
        </ol>
      </nav>

      <h1 className="h-main mt-3">{entry.name}</h1>
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
        <TypeBadge type="guide" />
        <PageRef page={entry.page} />
      </p>

      <div className="highlight-key">
        <p>{decorateChecks(entry.summary)}</p>
      </div>
      <EntryBody body={entry.body} index={bySlug} />

      <ol className="stepper">
        {steps.map((step, i) => {
          const linked = step.entries
            .map((s) => bySlug.get(s))
            .filter((e) => e !== undefined);
          return (
            <li key={step.title} className="step">
              <span className="step-marker" aria-hidden>
                {i + 1}
              </span>
              <h2 className="h-tertiary" style={{ marginTop: 0 }}>
                {step.title}
              </h2>
              <p>{decorateChecks(step.intro)}</p>
              {linked.length > 0 && (
                <ul>
                  {linked.map((e) => (
                    <ResultRow key={e.slug} entry={e} />
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>
    </article>
  );
}
