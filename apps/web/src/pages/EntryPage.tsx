import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ApiError } from '../api/client';
import type {
  ClassDetails,
  CreatureDetails,
  Entry,
  EntrySummary,
  EntryWithChildren,
  HeroicSkillDetails,
} from '../api/types';
import { EntryBody } from '../components/EntryBody';
import { PageRef } from '../components/PageRef';
import { SiglasLegend } from '../components/SiglasLegend';
import {
  ErrorState,
  NotFoundState,
  PageSkeleton,
} from '../components/States';
import { StatBar } from '../components/StatBar';
import { StatBlock } from '../components/StatBlock';
import { TypeBadge } from '../components/TypeBadge';
import { useEntry } from '../hooks/useEntry';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { decorateChecks } from '../lib/check';
import {
  TYPE_INFO,
  entryPath,
  typeFromSlug,
  typePath,
} from '../lib/entryTypes';
import { extractLinkedSlugs } from '../lib/links';
import { rememberEntry } from '../lib/recent';
import { statBlockTexts } from '../lib/statBlock';
import { statCells } from '../lib/statCells';
import { useDocumentTitle } from '../lib/useDocumentTitle';

type Index = ReadonlyMap<string, EntrySummary>;

/** In-page jump links at the top of a Class page. */
function ClassIndex({
  links,
}: {
  links: { href: string; label: string; count?: number }[];
}) {
  return (
    <nav aria-label="Nesta página" className="mt-6 border-b border-line pb-3">
      <p className="font-heading text-[15px] uppercase tracking-wider text-muted">
        Nesta página
      </p>
      <ul className="mt-1 flex flex-wrap gap-x-5">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="inline-flex min-h-[44px] items-center gap-1.5"
            >
              {link.label}
              {link.count !== undefined && (
                <span className="text-[15px] text-muted">{link.count}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Names of the Skills or Spells below, as jump links under their header. */
function ChildIndex({ items, label }: { items: Entry[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-x-4 text-[15px]">
        {items.map((child) => (
          <li key={child.slug}>
            <a href={`#${child.slug}`} className="jump-link">
              {child.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ChildSection({ child, index }: { child: Entry; index: Index }) {
  const cells = statCells(child, index).filter((c) => c.label !== 'Classe');
  // One fact does not earn a full-width bar: it joins the meta line.
  const inline = cells.length === 1 ? cells[0] : null;
  return (
    <section id={child.slug} aria-labelledby={`${child.slug}-titulo`}>
      <h3 id={`${child.slug}-titulo`} className="h-tertiary">
        {child.name}
      </h3>
      <p className={`text-[15px] text-muted ${inline ? 'mb-3' : ''}`}>
        {inline && (
          <>
            {inline.label} <strong className="text-ink">{inline.value}</strong>
            {' · '}
          </>
        )}
        <PageRef page={child.page} source={child.source} /> ·{' '}
        <Link to={entryPath(child)}>Abrir página</Link>
      </p>
      {!inline && <StatBar cells={cells} />}
      {child.body.trim() ? (
        <EntryBody body={child.body} index={index} headingShift={2} />
      ) : (
        <p>{decorateChecks(child.summary)}</p>
      )}
    </section>
  );
}

function ClassContent({ entry, index }: { entry: EntryWithChildren; index: Index }) {
  const heroic = [...index.values()].filter(
    (e) =>
      e.type === 'heroic-skill' &&
      (e.details as HeroicSkillDetails).requirements.classes.includes(entry.slug),
  );
  const skills = entry.children.filter((c) => c.type === 'skill');
  const spells = entry.children.filter((c) => c.type === 'spell');
  const details = entry.details as ClassDetails;

  const links = [
    { href: '#beneficios', label: 'Benefícios iniciais' },
    ...(skills.length > 0
      ? [{ href: '#poderes', label: 'Poderes', count: skills.length }]
      : []),
    ...(spells.length > 0
      ? [{ href: '#feiticos', label: 'Feitiços', count: spells.length }]
      : []),
    ...(heroic.length > 0
      ? [
          {
            href: '#poderes-heroicos',
            label: 'Poderes Heroicos',
            count: heroic.length,
          },
        ]
      : []),
  ];

  return (
    <>
      <ClassIndex links={links} />
      <h2 id="beneficios" className="h-secondary">
        Benefícios iniciais
      </h2>
      <ul className="bullets">
        {details.freeBenefits.map((benefit) => (
          <li key={benefit}>{decorateChecks(benefit)}</li>
        ))}
      </ul>

      <EntryBody body={entry.body} index={index} />

      {skills.length > 0 && (
        <section aria-labelledby="poderes">
          <h2 id="poderes" className="h-secondary">
            Poderes
          </h2>
          <ChildIndex items={skills} label="Poderes desta classe" />
          {skills.map((child) => (
            <ChildSection key={child.slug} child={child} index={index} />
          ))}
        </section>
      )}
      {spells.length > 0 && (
        <section aria-labelledby="feiticos">
          <h2 id="feiticos" className="h-secondary">
            Feitiços
          </h2>
          <ChildIndex items={spells} label="Feitiços desta classe" />
          {spells.map((child) => (
            <ChildSection key={child.slug} child={child} index={index} />
          ))}
        </section>
      )}
      {heroic.length > 0 && (
        <section aria-labelledby="poderes-heroicos">
          <h2 id="poderes-heroicos" className="h-secondary">
            Poderes Heroicos que exigem esta classe
          </h2>
          <p>
            Ao dominar {entry.name}, você pode escolher um destes (ou um dos{' '}
            <Link to={typePath('heroic-skill')}>demais Poderes Heroicos</Link>
            ).
          </p>
          <ul className="bullets">
            {heroic.map((power) => (
              <li key={power.slug}>
                <Link to={entryPath(power)}>{power.name}</Link>:{' '}
                {decorateChecks(power.summary)}
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

function SeeAlso({ entry, index }: { entry: EntryWithChildren; index: Index }) {
  const own = new Set([entry.slug, ...entry.children.map((c) => c.slug)]);
  const related = extractLinkedSlugs(
    entry.body,
    entry.summary,
    ...entry.children.map((c) => c.body),
  )
    .filter((slug) => !own.has(slug))
    .map((slug) => index.get(slug))
    .filter((e): e is EntrySummary => Boolean(e));

  if (related.length === 0) return null;
  return (
    <p className="mt-10">
      <strong>Veja também:</strong>{' '}
      {related.map((e, i) => (
        <span key={e.slug}>
          {i > 0 && ', '}
          <Link to={entryPath(e)}>{e.name}</Link>
        </span>
      ))}
      .
    </p>
  );
}

export function EntryPage() {
  const { tipo, slug } = useParams();
  const urlType = typeFromSlug(tipo);
  const { data: entry, isLoading, error, refetch } = useEntry(slug);
  const { bySlug } = useEntryIndex();
  useDocumentTitle(entry?.name);
  useEffect(() => {
    if (entry && entry.type === urlType) {
      rememberEntry({ slug: entry.slug, name: entry.name, type: entry.type });
    }
  }, [entry, urlType]);

  if (!urlType) return <NotFoundState />;
  if (isLoading) return <PageSkeleton />;
  if (error instanceof ApiError && error.status === 404) {
    return <NotFoundState what="entrada" />;
  }
  if (error || !entry) return <ErrorState onRetry={() => refetch()} />;
  if (entry.type !== urlType) return <Navigate to={entryPath(entry)} replace />;

  const isClass = entry.type === 'class';
  const classDetails = isClass ? (entry.details as ClassDetails) : null;

  return (
    <article>
      <nav aria-label="Você está em" className="text-[15px] text-muted">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li>
            <Link to={typePath(entry.type)}>{TYPE_INFO[entry.type].plural}</Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page">{entry.name}</li>
        </ol>
      </nav>

      <h1 className="h-main mt-3">{entry.name}</h1>
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px]">
        <TypeBadge type={entry.type} />
        <PageRef page={entry.page} source={entry.source} />
      </p>
      {classDetails && (
        <p className="mt-2 text-muted">
          {classDetails.quote && (
            <em className="block">“{classDetails.quote}”</em>
          )}
          {classDetails.otherNames.length > 0 && (
            <span className="block">
              Outros nomes: {classDetails.otherNames.join(', ')}
            </span>
          )}
        </p>
      )}

      <div className="highlight-key">
        <p>{decorateChecks(entry.summary)}</p>
      </div>

      <StatBar cells={statCells(entry, bySlug)} />
      <SiglasLegend
        texts={[
          entry.summary,
          entry.body,
          ...(classDetails?.freeBenefits ?? []),
          ...(entry.type === 'creature'
            ? statBlockTexts(entry.details as CreatureDetails)
            : []),
          ...statCells(entry, bySlug).map((c) => c.label),
          ...entry.children.flatMap((c) => [
            c.summary,
            c.body,
            ...statCells(c, bySlug).map((cell) => cell.label),
          ]),
        ]}
      />

      {isClass ? (
        <ClassContent entry={entry} index={bySlug} />
      ) : (
        <>
          {entry.type === 'creature' && (
            <StatBlock details={entry.details as CreatureDetails} />
          )}
          <EntryBody body={entry.body} index={bySlug} />
        </>
      )}

      <SeeAlso entry={entry} index={bySlug} />
    </article>
  );
}
