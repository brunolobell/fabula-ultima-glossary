import { useParams, useSearchParams } from 'react-router-dom';
import { CreatureAssembler } from '../components/assembler/CreatureAssembler';
import { assemblyRulesComplete } from '../lib/creatureAssembly';
import { WeaponForge } from '../components/forge/WeaponForge';
import { ListFilters } from '../components/ListFilters';
import { ResultRow } from '../components/ResultRow';
import { TravelTabs } from '../components/TravelTabs';
import { ErrorState, ListSkeleton, NotFoundState } from '../components/States';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { kindFromParam } from '../lib/equipmentKinds';
import {
  TRAVEL_TYPES,
  TYPE_INFO,
  countLabel,
  typeFromSlug,
} from '../lib/entryTypes';
import {
  applyFilters,
  buildRows,
  clearFilters,
  hasActiveFilters,
  readSelection,
  toggleValue,
} from '../lib/listFilters';
import {
  ASSEMBLER_METHOD,
  ASSEMBLER_PARAM,
  isAssemblerOpen,
} from '../lib/assemblerParam';
import {
  NPC_SPELLS_SLUG,
  QUICK_ASSEMBLY_SLUG,
  ROLE_ORDER,
  ROLE_RULE_SLUG,
} from '../lib/creatures';
import { FORGE_PARAM, forgeTabFromParam, type ForgeTab } from '../lib/forgeTab';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type {
  CustomWeaponRuleDetails,
  NpcSpellsRuleDetails,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  RareWeaponRuleDetails,
  Role,
} from '../api/types';

/** Slugs of the two Rules whose `details` feed the Weapon Forge. */
const CUSTOM_WEAPON_RULE = 'armas-personalizadas';
const RARE_WEAPON_RULE = 'criar-armas-raras';

export function TypeList() {
  const { tipo } = useParams();
  const type = typeFromSlug(tipo);
  const { entries, bySlug, isLoading, isError, refetch } = useEntryIndex();
  const [params, setParams] = useSearchParams();

  useDocumentTitle(type ? TYPE_INFO[type].plural : 'Não encontrado');
  if (!type) return <NotFoundState />;

  const ofType = entries.filter((e) => e.type === type);
  const selection = readSelection(type, params);
  const rows = buildRows(type, ofType, bySlug, selection);
  const filtering = hasActiveFilters(selection);
  const shown = applyFilters(type, ofType, selection);

  const toggle = (param: string, value: string) =>
    setParams((prev) => toggleValue(prev, param, value), { replace: true });
  const clear = () =>
    setParams((prev) => clearFilters(type, prev), { replace: true });

  const items = selection.item ?? [];
  const kind = type === 'equipment' && items.length === 1 ? kindFromParam(items[0]) : undefined;
  const title = kind ? kind.label : TYPE_INFO[type].plural;

  // The Weapon Forge is offered on the weapons list only. Its open tab is in
  // the URL (so the Rules can link to it and Back closes it); what the Reader
  // builds is not.
  const customRules = bySlug.get(CUSTOM_WEAPON_RULE)?.details as
    | CustomWeaponRuleDetails
    | undefined;
  const rareRules = bySlug.get(RARE_WEAPON_RULE)?.details as
    | RareWeaponRuleDetails
    | undefined;
  const forge =
    kind?.kind === 'weapon' &&
    customRules?.forge === 'custom-weapon' &&
    rareRules?.forge === 'rare-weapon'
      ? { customRules, rareRules }
      : null;
  const forgeTab = forge ? forgeTabFromParam(params.get(FORGE_PARAM)) : null;
  const setForgeTab = (next: ForgeTab | null, replace: boolean) =>
    setParams(
      (prev) => {
        const copy = new URLSearchParams(prev);
        if (next) copy.set(FORGE_PARAM, next);
        else copy.delete(FORGE_PARAM);
        return copy;
      },
      { replace },
    );

  // The Creature Assembler is offered on the Creatures list once the Quick Assembly
  // Rules are loaded. Its open state is in the URL (so the Rules can link to it);
  // what the Reader builds is not.
  const assemblyRules = bySlug.get(QUICK_ASSEMBLY_SLUG)?.details as
    | QuickAssemblyRuleDetails
    | undefined;
  const roleRules = ROLE_ORDER.map(
    (role) =>
      [role, bySlug.get(ROLE_RULE_SLUG[role])?.details] as [
        Role,
        QuickAssemblyRoleDetails | undefined,
      ],
  );
  const roles = Object.fromEntries(roleRules) as Record<
    Role,
    QuickAssemblyRoleDetails
  >;
  // Offered only with complete Rules: an older response can lack parts of them.
  const assembler =
    type === 'creature' && assemblyRules && assemblyRulesComplete(assemblyRules, roles)
      ? { rules: assemblyRules, roles }
      : null;
  const assemblerOpen = assembler
    ? isAssemblerOpen(params.get(ASSEMBLER_PARAM))
    : false;
  const setAssemblerOpen = (next: boolean, replace: boolean) =>
    setParams(
      (prev) => {
        const copy = new URLSearchParams(prev);
        if (next) copy.set(ASSEMBLER_PARAM, ASSEMBLER_METHOD);
        else copy.delete(ASSEMBLER_PARAM);
        return copy;
      },
      { replace },
    );

  return (
    <div>
      <h1 className="h-main">{title}</h1>
      {TRAVEL_TYPES.includes(type) && <TravelTabs />}
      <p className="mt-4">{TYPE_INFO[type].description}</p>

      {forge && (
        <>
          <p className="mt-4">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setForgeTab('personalizada', false)}
            >
              Forjar arma
            </button>{' '}
            <span className="text-[15px] text-muted">
              Monte uma arma personalizada ou rara. Nada é salvo.
            </span>
          </p>
          <WeaponForge
            customRules={forge.customRules}
            rareRules={forge.rareRules}
            equipment={ofType}
            tab={forgeTab}
            onTab={(next) => setForgeTab(next, true)}
            onClose={() => setForgeTab(null, true)}
          />
        </>
      )}

      {assembler && (
        <>
          <p className="mt-4">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setAssemblerOpen(true, false)}
            >
              Montar criatura
            </button>{' '}
            <span className="text-[15px] text-muted">
              Monte uma criatura pela Montagem Rápida. Nada é salvo.
            </span>
          </p>
          <CreatureAssembler
            rules={assembler.rules}
            roles={assembler.roles}
            npcSpells={
              bySlug.get(NPC_SPELLS_SLUG)?.details as NpcSpellsRuleDetails | undefined
            }
            entries={bySlug}
            open={assemblerOpen}
            onClose={() => setAssemblerOpen(false, true)}
          />
        </>
      )}

      <ListFilters
        key={type}
        rows={rows}
        selection={selection}
        onToggle={toggle}
        onClear={filtering && (isLoading || shown.length > 0) ? clear : undefined}
      />

      {isError ? (
        <div className="mt-6">
          <ErrorState onRetry={() => refetch()} />
        </div>
      ) : isLoading ? (
        <ListSkeleton />
      ) : shown.length === 0 ? (
        <p className="mt-6">
          {filtering ? (
            <>
              Nenhuma entrada com esses filtros.{' '}
              <button type="button" className="underline text-primary" onClick={clear}>
                Limpar filtros
              </button>
            </>
          ) : (
            'Ainda não há entradas neste tipo.'
          )}
        </p>
      ) : (
        <>
          <p className="mt-6 text-muted">{countLabel(shown.length)}</p>
          <ul className="mt-2">
            {shown.map((entry) => (
              <ResultRow key={entry.id} entry={entry} showType={false} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
