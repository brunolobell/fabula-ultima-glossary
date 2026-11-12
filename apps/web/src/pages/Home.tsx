import { HomeRow } from '../components/HomeRow';
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
import { guideBlurb, sortedGuides } from '../lib/guides';
import { TOOLS } from '../lib/tools';
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
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {guides.map((guide) => (
              <HomeRow
                key={guide.slug}
                to={entryPath(guide)}
                title={guide.name}
                titleClass="font-display text-[1.375rem] uppercase"
              >
                {guideBlurb(guide.summary)}
              </HomeRow>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="ferramentas" className="mt-10">
        <h2 id="ferramentas" className="h-tertiary" style={{ marginTop: 0 }}>
          Ferramentas
        </h2>
        <ul className="grid gap-x-6 sm:grid-cols-2">
          {TOOLS.map((tool) => (
            <HomeRow key={tool.id} to={tool.path} title={tool.label}>
              {tool.summary}
            </HomeRow>
          ))}
        </ul>
      </section>

      <section aria-labelledby="tipos" className="mt-10">
        <h2 id="tipos" className="h-tertiary" style={{ marginTop: 0 }}>
          Navegar por tipo
        </h2>
        {isLoading ? (
          <ListSkeleton rows={3} />
        ) : (
          <ul className="grid gap-x-6 sm:grid-cols-2">
            {BROWSE_TYPES.map((type) => (
              <HomeRow
                key={type}
                to={typePath(type)}
                title={TYPE_INFO[type].plural}
                aside={countLabel(
                  entries.filter((e) => e.type === type).length,
                )}
              >
                {TYPE_INFO[type].description}
              </HomeRow>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
