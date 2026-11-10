import { Link } from 'react-router-dom';
import { SearchBox } from '../components/SearchBox';
import { ErrorState, ListSkeleton } from '../components/States';
import { useEntryIndex } from '../hooks/useEntryIndex';
import {
  BROWSE_TYPES,
  TYPE_INFO,
  countLabel,
  entryPath,
  typePath,
} from '../lib/entryTypes';
import { sortedGuides } from '../lib/guides';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function Home() {
  useDocumentTitle();
  const { entries, isLoading, isError, refetch } = useEntryIndex();
  const guides = sortedGuides(entries);

  return (
    <div>
      <section aria-labelledby="titulo">
        <h1 id="titulo" className="sr-only">
          Códice do Cristal
        </h1>
        <p className="text-[1.75rem] font-bold leading-tight sm:text-[2rem]">
          Tudo o que você precisa para criar um personagem e jogar Fabula Ultima.
        </p>
        <p className="mt-1 text-muted">Referência não oficial, feita por fãs.</p>
        <div className="mt-6">
          <SearchBox size="lg" label="Buscar em todo o conteúdo" />
        </div>
      </section>

      {isError && (
        <div className="mt-8">
          <ErrorState onRetry={() => refetch()} />
        </div>
      )}

      {guides.length > 0 && (
        <section aria-labelledby="guias" className="mt-10">
          <h2 id="guias" className="h-tertiary" style={{ marginTop: 0 }}>
            Por onde começar
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  to={entryPath(guide)}
                  className="block h-full p-5 text-ink no-underline hover:no-underline"
                  style={{ background: 'var(--grad-key)' }}
                >
                  <span className="block font-display text-2xl uppercase leading-tight text-heading">
                    {guide.name}
                  </span>
                  <span className="mt-2 block">{guide.summary}</span>
                  <span className="mt-3 block font-heading text-[15px] uppercase tracking-wider text-primary">
                    Abrir o guia →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="tipos" className="mt-10">
        <h2 id="tipos" className="h-tertiary" style={{ marginTop: 0 }}>
          Navegar por tipo
        </h2>
        {isLoading ? (
          <ListSkeleton rows={3} />
        ) : (
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {BROWSE_TYPES.map((type) => {
              const count = entries.filter((e) => e.type === type).length;
              return (
                <li key={type}>
                  <Link
                    to={typePath(type)}
                    className="block border-b border-line py-4 text-ink no-underline hover:bg-tint-key hover:no-underline"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="font-heading text-xl uppercase tracking-wide text-primary">
                        {TYPE_INFO[type].plural}
                      </span>
                      <span className="text-[15px] text-muted">
                        {countLabel(count)}
                      </span>
                    </span>
                    <span className="mt-1 block">
                      {TYPE_INFO[type].description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
