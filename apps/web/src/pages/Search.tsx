import { useSearchParams } from 'react-router-dom';
import { FeatherIcon } from '../components/Icons';
import { RecentEntries } from '../components/RecentEntries';
import { ResultRow } from '../components/ResultRow';
import { ErrorState, ListSkeleton } from '../components/States';
import { TypeLinks } from '../components/TypeLinks';
import { useEntries } from '../hooks/useEntries';
import { TYPE_INFO, typeFromSlug } from '../lib/entryTypes';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type { EntryType } from '../api/types';

const FILTERS: EntryType[] = [
  'rule',
  'class',
  'skill',
  'heroic-skill',
  'peculiarity',
  'spell',
  'equipment',
  'service',
  'transport',
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
  const countOf = (type: EntryType) =>
    all.filter((e) => e.type === type).length;
  // With nothing found (or the load failed) a lone "Todos" chip filters
  // nothing; the message below is the way out.
  const showFilters = isLoading || (!isError && all.length > 0);

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
        <>
          <p className="mt-6">
            Digite no campo de busca para procurar em regras, classes, poderes,
            feitiços e equipamento. A busca ignora acentos e maiúsculas.
          </p>
          <RecentEntries className="mt-6" />
          <p className="mt-6 text-meta text-muted">Ou navegue por tipo</p>
          <TypeLinks />
        </>
      ) : (
        <>
          {showFilters && (
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
              {/* Only types that have results: a chip with 0 leads nowhere. The
                  chosen type stays, so the state is never hidden. */}
              {FILTERS.filter(
                (type) =>
                  tipo === type || (!isLoading && !isError && countOf(type) > 0),
              ).map((type) => (
                <button
                  key={type}
                  type="button"
                  className="chip"
                  aria-pressed={tipo === type}
                  onClick={() => chooseType(type)}
                >
                  {TYPE_INFO[type].plural}
                  {!isLoading && !isError && (
                    <>
                      <span aria-hidden className="text-muted">
                        {countOf(type)}
                      </span>
                      <span className="sr-only">
                        , {countOf(type)}{' '}
                        {countOf(type) === 1 ? 'resultado' : 'resultados'}
                      </span>
                    </>
                  )}
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
          ) : (
            <>
              {/* With nothing found, the message below says it (and is the
                  live status), so a "0 resultados" line would only repeat it. */}
              {results.length > 0 && (
                <p role="status" className="mt-6 break-words text-muted">
                  {results.length === 1
                    ? '1 resultado'
                    : `${results.length} resultados`}{' '}
                  para “{query}”
                </p>
              )}
              {results.length === 0 ? (
                <div className="mt-6">
                  <FeatherIcon size={48} className="mb-3" />
                  <p role="status" className="break-words">
                    Nenhuma entrada encontrada para “{query}”.{' '}
                    {tipo && all.length > 0 ? (
                      <>
                        <button
                          type="button"
                          className="underline text-primary"
                          onClick={() => chooseType(undefined)}
                        >
                          Buscar em todos os tipos
                        </button>
                        , ou confira a grafia.
                      </>
                    ) : (
                      'Confira a grafia.'
                    )}
                  </p>
                  <p className="mt-4 text-meta text-muted">
                    Ou navegue por tipo
                  </p>
                  <TypeLinks />
                </div>
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
