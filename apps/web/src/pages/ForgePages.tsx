import { Link, useSearchParams } from 'react-router-dom';
import type {
  CustomWeaponRuleDetails,
  RareArmorRuleDetails,
  RareWeaponRuleDetails,
} from '../api/types';
import { ArmorForge } from '../components/forge/ArmorForge';
import { WeaponForge } from '../components/forge/WeaponForge';
import { ErrorState, PageSkeleton } from '../components/States';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { FORGE_PARAM, forgeTabFromParam } from '../lib/forgeTab';
import { useDocumentTitle } from '../lib/useDocumentTitle';

/** Slugs of the Rules whose `details` feed the forges. */
const CUSTOM_WEAPON_RULE = 'armas-personalizadas';
const RARE_WEAPON_RULE = 'criar-armas-raras';
const RARE_ARMOR_RULE = 'criar-armaduras-e-escudos-raros';

/** Said when the index loaded but a Rule the forge needs is not in it. */
function MissingRules({ title }: { title: string }) {
  return (
    <div>
      <h1 className="h-main">{title}</h1>
      <p className="mt-4">
        As regras desta forja ainda não chegaram completas. Recarregue a página;
        se continuar assim, o banco precisa ser atualizado.
      </p>
      <p className="mt-4">
        <Link to="/equipamento" className="underline text-primary">
          Voltar ao equipamento
        </Link>
      </p>
    </div>
  );
}

/** The Forja de Armas: builds a Custom Weapon or a Rare Weapon. Saves nothing. */
export function WeaponForgePage() {
  useDocumentTitle('Forja de Armas');
  const { entries, bySlug, isLoading, isError, refetch } = useEntryIndex();
  const [params, setParams] = useSearchParams();

  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (isLoading) return <PageSkeleton />;

  const custom = bySlug.get(CUSTOM_WEAPON_RULE)?.details as
    CustomWeaponRuleDetails | undefined;
  const rare = bySlug.get(RARE_WEAPON_RULE)?.details as
    RareWeaponRuleDetails | undefined;
  if (custom?.forge !== 'custom-weapon' || rare?.forge !== 'rare-weapon') {
    return <MissingRules title="Forja de Armas" />;
  }

  return (
    <WeaponForge
      customRules={custom}
      rareRules={rare}
      equipment={entries.filter((e) => e.type === 'equipment')}
      tab={forgeTabFromParam(params.get(FORGE_PARAM)) ?? 'personalizada'}
      onTab={(next) =>
        setParams(
          (prev) => {
            const copy = new URLSearchParams(prev);
            copy.set(FORGE_PARAM, next);
            return copy;
          },
          { replace: true },
        )
      }
    />
  );
}

/** The Forja de Armaduras e Escudos: builds a Rare Armor or a Rare Shield. Saves nothing. */
export function ArmorForgePage() {
  useDocumentTitle('Forja de Armaduras e Escudos');
  const { entries, bySlug, isLoading, isError, refetch } = useEntryIndex();

  if (isError) return <ErrorState onRetry={() => refetch()} />;
  if (isLoading) return <PageSkeleton />;

  const rules = bySlug.get(RARE_ARMOR_RULE)?.details as
    RareArmorRuleDetails | undefined;
  if (rules?.forge !== 'rare-armor') {
    return <MissingRules title="Forja de Armaduras e Escudos" />;
  }

  return (
    <ArmorForge
      rules={rules}
      equipment={entries.filter((e) => e.type === 'equipment')}
    />
  );
}
