import { Link } from 'react-router-dom';
import { CreatureAssembler } from '../components/assembler/CreatureAssembler';
import { ErrorState, PageSkeleton } from '../components/States';
import { useAssemblyRules } from '../hooks/useAssemblyRules';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { typePath } from '../lib/entryTypes';
import { useDocumentTitle } from '../lib/useDocumentTitle';

/** The Laboratório Oroboros: builds a Creature by Quick Assembly. Saves nothing. */
export function CreatureLab() {
  useDocumentTitle('Laboratório Oroboros');
  const index = useEntryIndex();
  const { assembly, ...rules } = useAssemblyRules();

  if (index.isError || rules.isError) {
    return (
      <ErrorState
        onRetry={() => {
          if (index.isError) index.refetch();
          if (rules.isError) rules.refetch();
        }}
      />
    );
  }
  if (index.isLoading || rules.isLoading) return <PageSkeleton />;

  if (!assembly) {
    return (
      <div>
        <h1 className="h-main">Laboratório Oroboros</h1>
        <p className="mt-4">
          As regras da Montagem Rápida ainda não chegaram completas. Recarregue
          a página; se continuar assim, o banco precisa ser atualizado.
        </p>
        <p className="mt-4">
          <Link to={typePath('creature')} className="underline text-primary">
            Voltar às criaturas
          </Link>
        </p>
      </div>
    );
  }

  return (
    <CreatureAssembler
      rules={assembly.rules}
      roles={assembly.roles}
      npcSpells={assembly.npcSpells}
      entries={index.bySlug}
    />
  );
}
