import { useParams, useSearchParams } from 'react-router-dom';
import { ListFilters } from '../components/ListFilters';
import { ResultRow } from '../components/ResultRow';
import { ErrorState, ListSkeleton, NotFoundState } from '../components/States';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { kindFromParam } from '../lib/equipmentKinds';
import { TYPE_INFO, countLabel, typeFromSlug } from '../lib/entryTypes';
import {
  applyFilters,
  buildRows,
  clearFilters,
  hasActiveFilters,
  readSelection,
  toggleValue,
} from '../lib/listFilters';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function TypeList() {
  const { tipo } = useParams();
  const type = typeFromSlug(tipo);
  const { entries, bySlug, isLoading, isError, refetch } = useEntryIndex();
  const [params, setParams] = useSearchParams();

  useDocumentTitle(type ? TYPE_INFO[type].plural : 'Não encontrado');
  if (!type) return <NotFoundState />;

  const ofType = entries.filter((e) => e.type === type);
  const rows = buildRows(type, ofType, bySlug);
  const selection = readSelection(type, params);
  const filtering = hasActiveFilters(selection);
  const shown = applyFilters(type, ofType, selection);

  const toggle = (param: string, value: string) =>
    setParams((prev) => toggleValue(prev, param, value), { replace: true });
  const clear = () =>
    setParams((prev) => clearFilters(type, prev), { replace: true });

  const items = selection.item ?? [];
  const kind = type === 'equipment' && items.length === 1 ? kindFromParam(items[0]) : undefined;
  const title = kind ? kind.label : TYPE_INFO[type].plural;

  return (
    <div>
      <h1 className="h-main">{title}</h1>
      <p className="mt-4">{TYPE_INFO[type].description}</p>

      <ListFilters
        rows={rows}
        selection={selection}
        onToggle={toggle}
        onClear={filtering ? clear : undefined}
      />

      {isError ? (
        <div className="mt-6">
          <ErrorState onRetry={() => refetch()} />
        </div>
      ) : isLoading ? (
        <ListSkeleton />
      ) : shown.length === 0 ? (
        <p className="mt-6">
          {filtering
            ? 'Nenhuma entrada com esses filtros.'
            : 'Ainda não há entradas neste tipo.'}
        </p>
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
