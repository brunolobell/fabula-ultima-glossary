import { Link } from 'react-router-dom';
import type { EntrySummary } from '../api/types';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { decorateChecks } from '../lib/check';
import { entryPath } from '../lib/entryTypes';
import { requirementText } from '../lib/requirements';
import type {
  ClassDetails,
  CreatureSummaryDetails,
  EquipmentDetails,
  HeroicSkillDetails,
  ServiceDetails,
  SkillDetails,
  SpellDetails,
  TransportDetails,
} from '../api/types';
import { classTraitLabels } from '../lib/classTraits';
import { SPECIES_LABEL, isCreatureGroup, rankText } from '../lib/creatures';
import {
  MEDIUM_LABEL,
  SERVICE_GROUP_LABEL,
  TRANSPORT_CLASS_LABEL,
  costLabel,
} from '../lib/travel';
import { equipmentPrice } from '../lib/statCells';
import { PageRef } from './PageRef';
import { TypeBadge } from './TypeBadge';

function HeroicRequirement({ entry }: { entry: EntrySummary }) {
  const { bySlug } = useEntryIndex();
  const { requirements } = entry.details as HeroicSkillDetails;
  return (
    <p className="mt-1 text-meta text-muted">
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

/** "Viagem · Aéreo · 40z · ": what a Service or Transport is, then its cost in bold. */
function CostFacts({
  labels,
  cost,
}: {
  labels: (string | undefined)[];
  cost: number;
}) {
  return (
    <>
      {labels.filter(Boolean).join(' · ')}
      {' · '}
      <strong className="text-ink">{costLabel(cost)}</strong>
      {' · '}
    </>
  );
}

function ServiceFacts({ entry }: { entry: EntrySummary }) {
  const d = entry.details as ServiceDetails;
  return (
    <CostFacts
      labels={[SERVICE_GROUP_LABEL[d.group], d.medium && MEDIUM_LABEL[d.medium]]}
      cost={d.cost}
    />
  );
}

function TransportFacts({ entry }: { entry: EntrySummary }) {
  const d = entry.details as TransportDetails;
  return (
    <CostFacts
      labels={[TRANSPORT_CLASS_LABEL[d.transportClass], MEDIUM_LABEL[d.medium]]}
      cost={d.cost}
    />
  );
}

/** The Creature Group of a member, plain text (the row is already a link). */
function GroupName({ slug }: { slug: string }) {
  const { bySlug } = useEntryIndex();
  const entry = bySlug.get(slug);
  return entry ? <span className="text-ink">Grupo {entry.name} · </span> : null;
}

/** "Nível 15 · Planta · Soldado · PV 90 · ": what a Creature is, at a glance. */
function CreatureFacts({ entry }: { entry: EntrySummary }) {
  if (isCreatureGroup(entry.details)) return <>Grupo de criaturas · </>;
  const d = entry.details as CreatureSummaryDetails;
  return (
    <>
      Nível {d.level} · {SPECIES_LABEL[d.species]} · {rankText(d)} · PV{' '}
      <strong className="text-ink">{d.hp}</strong>
      {' · '}
      {d.groupSlug && <GroupName slug={d.groupSlug} />}
    </>
  );
}

/** "Aumento de PV · Escudos marciais · ": what a Class's free benefits grant. */
function ClassFacts({ entry }: { entry: EntrySummary }) {
  // `?? []` is deliberate: older seeded databases and cached list responses
  // (stale-while-revalidate) can lack `traits`, and /classes must not throw.
  const labels = classTraitLabels((entry.details as ClassDetails).traits ?? []);
  return labels.length > 0 ? <>{labels.join(' · ')}{' · '}</> : null;
}

/** The facts a Reader scans for, then where it is in the book. */
function RowMeta({ entry }: { entry: EntrySummary }) {
  return (
    <p className="mt-1 text-meta text-muted">
      {entry.type === 'skill' && (
        <ClassName slug={(entry.details as SkillDetails).classSlug} />
      )}
      {entry.type === 'spell' && (
        <>
          <ClassName slug={(entry.details as SpellDetails).classSlug} />
          <span>
            PM <strong className="text-ink">{(entry.details as SpellDetails).mpCost}</strong>
            {(entry.details as SpellDetails).mpCost.includes('×') && ' por alvo'}
            {' · '}
          </span>
        </>
      )}
      {entry.type === 'class' && <ClassFacts entry={entry} />}
      {entry.type === 'creature' && <CreatureFacts entry={entry} />}
      {entry.type === 'service' && <ServiceFacts entry={entry} />}
      {entry.type === 'transport' && <TransportFacts entry={entry} />}
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
          {entry.type === 'equipment' && (
            <>
              <span aria-hidden className="text-muted">
                ·
              </span>
              <strong className="text-ink">
                {equipmentPrice(entry.details as EquipmentDetails)}
              </strong>
            </>
          )}
          {showType && <TypeBadge type={entry.type} />}
        </div>
        <p className="mt-1 line-clamp-2">{decorateChecks(entry.summary)}</p>
        {entry.type === 'heroic-skill' && <HeroicRequirement entry={entry} />}
        <RowMeta entry={entry} />
      </Link>
    </li>
  );
}
