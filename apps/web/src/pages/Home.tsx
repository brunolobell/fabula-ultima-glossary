import type { EntryType } from '../api/types';
import { HomeRow } from '../components/HomeRow';
import { FeatherIcon } from '../components/Icons';
import { RecentEntries } from '../components/RecentEntries';
import { SearchBox } from '../components/SearchBox';
import { ErrorState, RowGridSkeleton } from '../components/States';
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

/** The guides' title style, shared by their rows and the skeleton that holds their place. */
const GUIDE_TITLE_CLASS = 'font-display text-[1.375rem] uppercase';

/** The few types whose name alone does not say what is inside; the others carry no line on Home. */
const TYPE_HINTS: Partial<Record<EntryType, string>> = {
  rule: 'Como o jogo funciona: Traços, recursos, condições e magia.',
  'heroic-skill': 'Poderes que se adquirem ao dominar uma classe.',
  peculiarity: 'Regra opcional dos suplementos Atlas: uma marca única para cada personagem.',
};

export function Home() {
  useDocumentTitle();
  const { entries, isLoading, isError, refetch } = useEntryIndex();
  const guides = sortedGuides(entries);
  const countsKnown = !isLoading && !isError;

  return (
    <div>
      <section aria-labelledby="titulo">
        <h1 id="titulo" className="sr-only">
          Códice do Cristal
        </h1>
        <div className="flex items-start gap-3">
          <FeatherIcon size={32} className="mt-1 shrink-0" />
          <div>
            <p className="text-[1.75rem] font-bold leading-tight sm:text-[2rem]">
              Tudo o que você precisa para criar um personagem e jogar Fabula
              Ultima.
            </p>
            <p className="mt-1 text-muted">
              Referência não oficial, feita por fãs.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <SearchBox size="lg" label="Buscar em todo o conteúdo" recents={false} />
        </div>
        <RecentEntries className="mt-3" />
      </section>

      {isError && (
        <div className="mt-8">
          <ErrorState onRetry={() => refetch()} />
        </div>
      )}

      {/* Reserve the guides' place while they load, so the page below does
          not jump when they arrive. After a failed load the error above says so. */}
      {(isLoading || guides.length > 0) && (
        <section aria-labelledby="guias" className="mt-10">
          <h2 id="guias" className="h-tertiary mt-0">
            Por onde começar
          </h2>
          {isLoading ? (
            <RowGridSkeleton titleClass={GUIDE_TITLE_CLASS} />
          ) : (
            <ul className="grid gap-x-6 sm:grid-cols-2">
              {guides.map((guide) => (
                <HomeRow
                  key={guide.slug}
                  to={entryPath(guide)}
                  title={guide.name}
                  titleClass={GUIDE_TITLE_CLASS}
                >
                  {guideBlurb(guide.summary)}
                </HomeRow>
              ))}
            </ul>
          )}
        </section>
      )}

      <section aria-labelledby="tipos" className="mt-10">
        <h2 id="tipos" className="h-tertiary mt-0">
          Navegar por tipo
        </h2>
        {/* Columns, not a grid: a row with a gloss is taller than its
            neighbour, and a grid would stretch the neighbour to match. */}
        <ul className="sm:columns-2 sm:gap-x-6">
          {BROWSE_TYPES.map((type) => (
            <HomeRow
              key={type}
              to={typePath(type)}
              title={TYPE_INFO[type].plural}
              // A count is shown only when it is known: while loading, or after
              // a failed load, "0 entradas" would be a false fact.
              aside={
                countsKnown
                  ? countLabel(entries.filter((e) => e.type === type).length)
                  : undefined
              }
            >
              {TYPE_HINTS[type]}
            </HomeRow>
          ))}
        </ul>
      </section>

      <section aria-labelledby="ferramentas" className="mt-10">
        <h2 id="ferramentas" className="h-tertiary mt-0">
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
    </div>
  );
}
