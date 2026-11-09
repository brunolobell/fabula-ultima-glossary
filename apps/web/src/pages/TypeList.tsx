import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ResultRow } from '../components/ResultRow';
import { ErrorState, ListSkeleton, NotFoundState } from '../components/States';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { TYPE_INFO, countLabel, typeFromSlug } from '../lib/entryTypes';
import { useDocumentTitle } from '../lib/useDocumentTitle';

// Equipment entries carry their kind as a tag.
const EQUIPMENT_KINDS = [
  { tag: 'arma', label: 'Armas' },
  { tag: 'armadura', label: 'Armaduras' },
  { tag: 'escudo', label: 'Escudos' },
  { tag: 'acessório', label: 'Acessórios' },
  { tag: 'artefato', label: 'Artefatos' },
];

export function TypeList() {
  const { tipo } = useParams();
  const type = typeFromSlug(tipo);
  const { entries, isLoading, isError, refetch } = useEntryIndex();
  const [kind, setKind] = useState<string | null>(null);

  useDocumentTitle(type ? TYPE_INFO[type].plural : 'Não encontrado');
  if (!type) return <NotFoundState />;

  const ofType = entries.filter((e) => e.type === type);
  const kinds =
    type === 'equipment'
      ? EQUIPMENT_KINDS.filter((k) => ofType.some((e) => e.tags.includes(k.tag)))
      : [];
  const shown = kind ? ofType.filter((e) => e.tags.includes(kind)) : ofType;

  return (
    <div>
      <h1 className="h-main">{TYPE_INFO[type].plural}</h1>
      <p className="mt-4">{TYPE_INFO[type].description}</p>

      {kinds.length > 0 && (
        <div role="group" aria-label="Filtrar por tipo de item" className="mt-4 flex flex-wrap gap-2">
          <button type="button" className="chip" aria-pressed={kind === null} onClick={() => setKind(null)}>
            Todos
          </button>
          {kinds.map((k) => (
            <button
              key={k.tag}
              type="button"
              className="chip"
              aria-pressed={kind === k.tag}
              onClick={() => setKind(k.tag)}
            >
              {k.label}
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
