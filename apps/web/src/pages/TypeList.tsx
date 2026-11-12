import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { WeaponForge } from '../components/forge/WeaponForge';
import { EquipmentOrder } from '../components/EquipmentOrder';
import { ListFilters } from '../components/ListFilters';
import { ResultRow } from '../components/ResultRow';
import { TravelTabs } from '../components/TravelTabs';
import { ErrorState, ListSkeleton, NotFoundState } from '../components/States';
import { useEntryIndex } from '../hooks/useEntryIndex';
import { kindFromParam } from '../lib/equipmentKinds';
import {
  DEFAULT_ORDER,
  MAX_PRICE_PARAM,
  ORDER_PARAM,
  filterByMaxPrice,
  maxPriceFromParam,
  orderFromParam,
  sortEquipment,
  type EquipmentOrder as Order,
} from '../lib/equipmentOrder';
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
  LAB_PATH,
  LEGACY_ASSEMBLER_PARAM,
  LEGACY_ASSEMBLER_VALUE,
} from '../lib/laboratory';
import { FORGE_PARAM, forgeTabFromParam, type ForgeTab } from '../lib/forgeTab';
import { QUICK_ASSEMBLY_SLUG } from '../lib/creatures';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type {
  CustomWeaponRuleDetails,
  RareWeaponRuleDetails,
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
  // The old modal link (`/criaturas?montagem=rapida`) now goes to the page.
  if (
    type === 'creature' &&
    params.get(LEGACY_ASSEMBLER_PARAM) === LEGACY_ASSEMBLER_VALUE
  )
    return <Navigate to={LAB_PATH} replace />;

  const ofType = entries.filter((e) => e.type === type);
  const selection = readSelection(type, params);
  const rows = buildRows(type, ofType, bySlug, selection);
  // Equipment can also be sorted and capped by price (both live in the URL).
  const isEquipment = type === 'equipment';
  const order = orderFromParam(params.get(ORDER_PARAM));
  const maxPrice = isEquipment ? maxPriceFromParam(params.get(MAX_PRICE_PARAM)) : null;
  const filtering = hasActiveFilters(selection) || maxPrice !== null;
  const filtered = applyFilters(type, ofType, selection);
  const shown = isEquipment
    ? sortEquipment(filterByMaxPrice(filtered, maxPrice), order)
    : filtered;

  const toggle = (param: string, value: string) =>
    setParams((prev) => toggleValue(prev, param, value), { replace: true });
  const clear = () =>
    setParams(
      (prev) => {
        const next = clearFilters(type, prev);
        next.delete(MAX_PRICE_PARAM);
        return next;
      },
      { replace: true },
    );
  const setQuery = (param: string, value: string | null) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === null) next.delete(param);
        else next.set(param, value);
        return next;
      },
      { replace: true },
    );
  const setOrder = (next: Order) =>
    setQuery(ORDER_PARAM, next === DEFAULT_ORDER ? null : next);
  const setMaxPrice = (max: number | null) =>
    setQuery(MAX_PRICE_PARAM, max === null ? null : String(max));

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

  // The Laboratório Oroboros (the Creature Assembler) is a page of its own, linked
  // from the Creatures list once the Quick Assembly Rule is in the index. The page
  // fetches the Rules and says so when they are incomplete.
  const assembler = type === 'creature' && bySlug.has(QUICK_ASSEMBLY_SLUG);

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
        <p className="mt-4">
          <Link to={LAB_PATH} className="btn-primary">
            Laboratório Oroboros
          </Link>{' '}
          <span className="text-[15px] text-muted">
            Monte uma criatura pela Montagem Rápida. Nada é salvo.
          </span>
        </p>
      )}

      <ListFilters
        key={type}
        rows={rows}
        selection={selection}
        onToggle={toggle}
        onClear={filtering && (isLoading || shown.length > 0) ? clear : undefined}
      />

      {isEquipment && (
        <EquipmentOrder
          order={order}
          onOrder={setOrder}
          maxPrice={maxPrice}
          onMaxPrice={setMaxPrice}
        />
      )}

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
