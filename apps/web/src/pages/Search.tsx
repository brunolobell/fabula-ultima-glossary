import { useSearchParams } from 'react-router-dom';
import { ResultRow } from '../components/ResultRow';
import { ErrorState, ListSkeleton } from '../components/States';
import { useEntries } from '../hooks/useEntries';
import { TYPE_INFO, typeFromSlug } from '../lib/entryTypes';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type { EntryType } from '../api/types';

const FILTERS: EntryType[] = [
  'rule',
  'class',
  'skill',
  'spell',
  'equipment',
  'guide',
];

export function Search() {
  const [params, setParams] = useSearchParams();
  const query = (params.get('q') ?? '').trim();
  const tipo = typeFromSlug(params.get('tipo') ?? undefined);

  useDocumentTitle(query ? `Busca: ${query}` : 'Busca');
  const { data, isLoading, isError, refetch } = useEntries(query);

  const all = query ? (data ?? []) : [];
  const results = tipo ? all.filter((e) => e.type === tipo) : all;
  const countOf = (type: EntryType) => all.filter((e) => e.type === type).length;

  function chooseType(type: EntryType | undefined) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (type) next.set('tipo', TYPE_INFO[type].slug);
        else next.delete('tipo');
        return next;
      },
      { replace: true },
    );
  }

  return (
    <div>
      <h1 className="h-main">Busca</h1>

      {!query ? (
        <p className="mt-6">
          Digite no campo de busca para procurar em regras, classes, poderes,
          feitiços e equipamento. A busca ignora acentos e maiúsculas.
        </p>
      ) : (
        <>
          <div
            role="group"
            aria-label="Filtrar por tipo"
            className="mt-6 flex flex-wrap gap-2"
          >
            <button
              type="button"
              className="chip"
              aria-pressed={!tipo}
              onClick={() => chooseType(undefined)}
            >
              Todos
            </button>
            {FILTERS.map((type) => (
              <button
                key={type}
                type="button"
                className="chip"
                aria-pressed={tipo === type}
                onClick={() => chooseType(type)}
              >
                {TYPE_INFO[type].plural}
                {!isLoading && !isError && (
                  <span className="text-muted">{countOf(type)}</span>
                )}
              </button>
            ))}
          </div>

          {isError ? (
            <div className="mt-6">
              <ErrorState onRetry={() => refetch()} />
            </div>
          ) : isLoading ? (
            <ListSkeleton />
          ) : (
            <>
              <p role="status" className="mt-6 text-muted">
                {results.length === 1
                  ? '1 resultado'
                  : `${results.length} resultados`}{' '}
                para “{query}”
              </p>
              {results.length === 0 ? (
                <p className="mt-4">
                  Nenhuma entrada encontrada para “{query}”. Confira a grafia ou
                  remova os filtros.
                </p>
              ) : (
                <ul className="mt-2">
                  {results.map((entry) => (
                    <ResultRow key={entry.id} entry={entry} />
                  ))}
                </ul>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
