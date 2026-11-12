import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ApiError } from '../api/client';
import type {
  ClassDetails,
  EquipmentDetails,
  CreatureDetails,
  Entry,
  EntrySummary,
  EntryWithChildren,
  HeroicSkillDetails,
} from '../api/types';
import { EntryBody } from '../components/EntryBody';
import { PageIndex, type PageLink } from '../components/PageIndex';
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
import { outline } from '../lib/headings';
import {
  TYPE_INFO,
  entryPath,
  typeFromSlug,
  typePath,
} from '../lib/entryTypes';
import { SPECIES_LABEL, isCreatureGroup, rankText } from '../lib/creatures';
import { extractLinkedSlugs } from '../lib/links';
import { rememberEntry } from '../lib/recent';
import { statBlockTexts } from '../lib/statBlock';
import { equipmentPrice, statCells } from '../lib/statCells';
import { useDocumentTitle } from '../lib/useDocumentTitle';

type Index = ReadonlyMap<string, EntrySummary>;

/**
 * Entries that read as prose get a narrower column (title rule, headers and text
 * share one edge); Classes, Creatures and bodies with a table keep the full one.
 */
const PROSE_COLUMN = 'max-w-[34rem]';
const hasTable = (body: string) => /^\s*\|.+\|\s*$/m.test(body);

/** Fewer sections than this read fine without an index. */
const MIN_INDEXED_SECTIONS = 4;

/** Names of the Skills or Spells below, as jump links under their header. */
function ChildIndex({ items, label }: { items: Entry[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-x-4 text-meta">
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
      <p className={`text-meta text-muted ${inline ? 'mb-3' : ''}`}>
        {inline && (
          <>
            {inline.label} <strong className="text-ink">{inline.value}</strong>
            {' · '}
          </>
        )}
        <PageRef page={child.page} source={child.source} /> ·{' '}
        <Link to={entryPath(child)} className="tap">
          Abrir página
        </Link>
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

/** The members of a Creature Group: a heading, the facts and the whole stat block of each. */
function GroupMembers({ members }: { members: Entry[] }) {
  return (
    <>
      {members.map((member) => {
        const d = member.details as CreatureDetails;
        return (
          <section
            key={member.slug}
            id={member.slug}
            aria-labelledby={`${member.slug}-titulo`}
          >
            <h2 id={`${member.slug}-titulo`} className="h-secondary">
              {member.name}
            </h2>
            <p className="text-meta text-muted">
              Nível {d.level} · {SPECIES_LABEL[d.species]} · {rankText(d)}
              {' · '}
              <PageRef page={member.page} source={member.source} /> ·{' '}
              <Link to={entryPath(member)} className="tap">
                Abrir página
              </Link>
            </p>
            <p>{decorateChecks(member.summary)}</p>
            <StatBlock details={d} idPrefix={`${member.slug}-`} nested />
          </section>
        );
      })}
    </>
  );
}

/** The Heroic Skills that name this Class among their requirements. */
function heroicFor(entry: Entry, index: Index): EntrySummary[] {
  return [...index.values()].filter(
    (e) =>
      e.type === 'heroic-skill' &&
      (e.details as HeroicSkillDetails).requirements.classes.includes(
        entry.slug,
      ),
  );
}

/** The sections of a Class page, for its "Nesta página" index. */
function classSections(
  entry: EntryWithChildren,
  index: Index,
): PageLink[] {
  const skills = entry.children.filter((c) => c.type === 'skill').length;
  const spells = entry.children.filter((c) => c.type === 'spell').length;
  const heroic = heroicFor(entry, index).length;
  return [
    { href: '#beneficios', label: 'Benefícios iniciais' },
    ...(skills > 0 ? [{ href: '#poderes', label: 'Poderes', count: skills }] : []),
    ...(spells > 0
      ? [{ href: '#feiticos', label: 'Feitiços', count: spells }]
      : []),
    ...(heroic > 0
      ? [{ href: '#poderes-heroicos', label: 'Poderes Heroicos', count: heroic }]
      : []),
  ];
}

function ClassContent({ entry, index }: { entry: EntryWithChildren; index: Index }) {
  const heroic = heroicFor(entry, index);
  const skills = entry.children.filter((c) => c.type === 'skill');
  const spells = entry.children.filter((c) => c.type === 'spell');
  const details = entry.details as ClassDetails;

  return (
    <>
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
                <Link to={entryPath(power)} className="tap">
                  {power.name}
                </Link>
                :{' '}
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
  const isGroup = entry.type === 'creature' && isCreatureGroup(entry.details);
  const groupSlug =
    entry.type === 'creature' && !isGroup
      ? (entry.details as CreatureDetails).groupSlug
      : undefined;
  const parentGroup = groupSlug ? bySlug.get(groupSlug) : undefined;
  const classDetails = isClass ? (entry.details as ClassDetails) : null;

  // A long entry (a Rule with many sections, a Creature Group with its members)
  // gets a "Nesta página" index. Classes have their own, at the top of the page.
  const sections: PageLink[] = isClass
    ? classSections(entry, bySlug)
    : [
        ...(entry.type === 'creature' && !isGroup
          ? []
          : outline(entry.body, bySlug).map((s) => ({
              href: `#${s.id}`,
              label: s.text,
            }))),
        ...(isGroup
          ? entry.children.map((m) => ({ href: `#${m.slug}`, label: m.name }))
          : []),
      ];

  const prose =
    entry.type !== 'class' && entry.type !== 'creature' && !hasTable(entry.body);

  return (
    <article className={prose ? PROSE_COLUMN : undefined}>
      <nav aria-label="Você está em" className="text-meta text-muted">
        <ol className="flex flex-wrap items-center gap-x-2">
          <li>
            <Link to={typePath(entry.type)} className="tap">
              {TYPE_INFO[entry.type].plural}
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page">{entry.name}</li>
        </ol>
      </nav>

      {entry.type === 'equipment' ? (
        <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h1 className="h-main">{entry.name}</h1>
          <p
            className="font-semibold text-ink text-[1.375rem]"
            aria-label={`Custo ${equipmentPrice(entry.details as EquipmentDetails)}`}
          >
            {equipmentPrice(entry.details as EquipmentDetails)}
          </p>
        </div>
      ) : (
        <h1 className="h-main mt-3">{entry.name}</h1>
      )}
      <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-meta">
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

      {parentGroup && (
        <p className="mt-2">
          Parte do grupo <Link to={entryPath(parentGroup)}>{parentGroup.name}</Link>
        </p>
      )}

      <div className="highlight-key">
        <p>{decorateChecks(entry.summary)}</p>
      </div>

      <StatBar cells={statCells(entry, bySlug)} />
      {isClass && <PageIndex links={sections} />}
      <SiglasLegend
        texts={[
          entry.summary,
          entry.body,
          ...(classDetails?.freeBenefits ?? []),
          ...(entry.type === 'creature' && !isGroup
            ? statBlockTexts(entry.details as CreatureDetails)
            : []),
          ...(isGroup
            ? entry.children.flatMap((m) =>
                statBlockTexts(m.details as CreatureDetails),
              )
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
          {sections.length >= MIN_INDEXED_SECTIONS && (
            <PageIndex links={sections} />
          )}
          {entry.type === 'creature' && !isGroup && (
            <StatBlock details={entry.details as CreatureDetails} />
          )}
          <EntryBody body={entry.body} index={bySlug} />
          {isGroup && <GroupMembers members={entry.children} />}
        </>
      )}

      <SeeAlso entry={entry} index={bySlug} />
    </article>
  );
}
