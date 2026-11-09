import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import type { EquipmentDetails, HeroicSkillDetails } from '../api/types';
import { ResultRow } from '../components/ResultRow';
import { ErrorState, ListSkeleton, NotFoundState } from '../components/States';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { EQUIPMENT_KIND_FILTERS, kindFromParam } from '../lib/equipmentKinds';
import { TYPE_INFO, countLabel, typeFromSlug } from '../lib/entryTypes';
import { isOpenToAll } from '../lib/requirements';
import { useDocumentTitle } from '../lib/useDocumentTitle';

type HeroicFilter = 'todos' | 'livres' | 'classe';

const HEROIC_FILTERS: { value: HeroicFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'livres', label: 'Disponíveis a todos' },
  { value: 'classe', label: 'Exigem classe' },
];

export function TypeList() {
  const { tipo } = useParams();
  const type = typeFromSlug(tipo);
  const { entries, isLoading, isError, refetch } = useEntryIndex();
  const [params, setParams] = useSearchParams();
  const [heroicFilter, setHeroicFilter] = useState<HeroicFilter>('todos');

  useDocumentTitle(type ? TYPE_INFO[type].plural : 'Não encontrado');
  if (!type) return <NotFoundState />;

  const ofType = entries.filter((e) => e.type === type);
  const kinds =
    type === 'equipment'
      ? EQUIPMENT_KIND_FILTERS.filter((k) =>
          ofType.some((e) => (e.details as EquipmentDetails).kind === k.kind),
        )
      : [];
  const kind = type === 'equipment' ? kindFromParam(params.get('item')) : undefined;
  const setKind = (param: string | null) =>
    setParams(param ? { item: param } : {}, { replace: true });

  const shown = ofType.filter((e) => {
    if (kind) return (e.details as EquipmentDetails).kind === kind.kind;
    if (type === 'heroic-skill' && heroicFilter !== 'todos') {
      const open = isOpenToAll((e.details as HeroicSkillDetails).requirements);
      return heroicFilter === 'livres' ? open : !open;
    }
    return true;
  });

  const title =
    type === 'equipment' && kind ? kind.label : TYPE_INFO[type].plural;

  return (
    <div>
      <h1 className="h-main">{title}</h1>
      <p className="mt-4">{TYPE_INFO[type].description}</p>

      {kinds.length > 0 && (
        <div role="group" aria-label="Filtrar por tipo de item" className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="chip" aria-pressed={!kind} onClick={() => setKind(null)}>
            Todos
          </button>
          {kinds.map((k) => (
            <button
              key={k.param}
              type="button"
              className="chip"
              aria-pressed={kind?.param === k.param}
              onClick={() => setKind(k.param)}
            >
              {k.label}
            </button>
          ))}
        </div>
      )}

      {type === 'heroic-skill' && (
        <div role="group" aria-label="Filtrar por requisito" className="mt-4 flex flex-wrap gap-2">
          {HEROIC_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              className="chip"
              aria-pressed={heroicFilter === f.value}
              onClick={() => setHeroicFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      {isError ? (
        <div className="mt-6">
          <ErrorState onRetry={() => refetch()} />
        </div>
      ) : isLoading ? (
        <ListSkeleton />
      ) : shown.length === 0 ? (
        <p className="mt-6">Ainda não há entradas neste tipo.</p>
      ) : (
        <>
          <p className="mt-6 text-muted">{countLabel(shown.length)}</p>
          <ul className="mt-2">
            {shown.map((entry) => (
              <ResultRow key={entry.id} entry={entry} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
