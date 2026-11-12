import { Link, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { EquipmentOrder } from '../components/EquipmentOrder';
import { ListFilters } from '../components/ListFilters';
import { ResultRow } from '../components/ResultRow';
import { RulesOverview } from '../components/RulesOverview';
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
import { FORGE_PARAM } from '../lib/forgeTab';
import {
  ARMOR_FORGE_PATH,
  WEAPON_FORGE_PATH,
  legacyForgePath,
} from '../lib/tools';
import { QUICK_ASSEMBLY_SLUG } from '../lib/creatures';
import { useDocumentTitle } from '../lib/useDocumentTitle';
import type {
  CustomWeaponRuleDetails,
  RareArmorRuleDetails,
  RareWeaponRuleDetails,
} from '../api/types';

/** Slugs of the Rules whose `details` feed the forges (the lists link to them only once these are in the index). */
const CUSTOM_WEAPON_RULE = 'armas-personalizadas';
const RARE_WEAPON_RULE = 'criar-armas-raras';
const RARE_ARMOR_RULE = 'criar-armaduras-e-escudos-raros';

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
  // The kind of equipment (`item`) is where the Reader is: the menu offers it
  // from `lg`, so the bar's "Limpar filtros" leaves it alone. The empty-state
  // link clears everything, so a kind with no entries can still be left.
  const clear = (keepKind = false) =>
    setParams(
      (prev) => {
        const next = clearFilters(type, prev);
        next.delete(MAX_PRICE_PARAM);
        const kind = prev.get('item');
        if (keepKind && isEquipment && kind) next.set('item', kind);
        return next;
      },
      { replace: true },
    );
  const clearable =
    hasActiveFilters(
      isEquipment ? { ...selection, item: [] } : selection,
    ) || maxPrice !== null;
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

  // The forges are pages of their own (`/forja-de-armas`, `/forja-de-armaduras`);
  // the lists link to them. The old modal links (`?forja=`) go to the pages.
  const legacyForge = legacyForgePath(
    items[0] ?? null,
    params.get(FORGE_PARAM),
  );
  if (type === 'equipment' && items.length === 1 && legacyForge) {
    return <Navigate to={legacyForge} replace />;
  }
  const weaponRulesReady =
    (bySlug.get(CUSTOM_WEAPON_RULE)?.details as CustomWeaponRuleDetails | undefined)
      ?.forge === 'custom-weapon' &&
    (bySlug.get(RARE_WEAPON_RULE)?.details as RareWeaponRuleDetails | undefined)
      ?.forge === 'rare-weapon';
  const armorRulesReady =
    (bySlug.get(RARE_ARMOR_RULE)?.details as RareArmorRuleDetails | undefined)
      ?.forge === 'rare-armor';
  const forgeLink =
    kind?.kind === 'weapon' && weaponRulesReady
      ? { to: WEAPON_FORGE_PATH, label: 'Forjar arma' }
      : (kind?.kind === 'armor' || kind?.kind === 'shield') && armorRulesReady
        ? { to: ARMOR_FORGE_PATH, label: 'Forjar armadura ou escudo' }
        : null;

  // The Laboratório Oroboros (the Creature Assembler) is a page of its own, linked
  // from the Creatures list once the Quick Assembly Rule is in the index. The page
  // fetches the Rules and says so when they are incomplete.
  const assembler = type === 'creature' && bySlug.has(QUICK_ASSEMBLY_SLUG);
  const tool = forgeLink
    ? forgeLink
    : assembler
      ? { to: LAB_PATH, label: 'Laboratório Oroboros' }
      : null;
  // Filters of the "Ordenar e preço" button that are not at their default.
  const sortCount = (order !== DEFAULT_ORDER ? 1 : 0) + (maxPrice !== null ? 1 : 0);

  return (
    <div>
      <h1 className="h-main">{title}</h1>
      {TRAVEL_TYPES.includes(type) && <TravelTabs />}
      <p className="mt-4">{TYPE_INFO[type].description}</p>

      {type === 'rule' && <RulesOverview bySlug={bySlug} />}

      <ListFilters
        key={type}
        rows={rows}
        selection={selection}
        onToggle={toggle}
        onClear={
          clearable && (isLoading || shown.length > 0)
            ? () => clear(true)
            : undefined
        }
        extraPanel={
          isEquipment
            ? {
                label: `Ordenar e preço${sortCount > 0 ? `: ${sortCount}` : ''}`,
                active: sortCount > 0,
                content: (
                  <EquipmentOrder
                    order={order}
                    onOrder={setOrder}
                    maxPrice={maxPrice}
                    onMaxPrice={setMaxPrice}
                  />
                ),
              }
            : undefined
        }
      />

      {/* The count, with the tool that builds one of these at the other end. */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p className="text-muted">
          {!isError && !isLoading && shown.length > 0
            ? countLabel(shown.length)
            : null}
        </p>
        {tool && (
          <Link to={tool.to} className="btn-primary ml-auto">
            {tool.label}
          </Link>
        )}
      </div>

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
              <button
                type="button"
                className="underline text-primary"
                onClick={() => clear()}
              >
                Limpar filtros
              </button>
            </>
          ) : (
            'Ainda não há entradas neste tipo.'
          )}
        </p>
      ) : (
        <ul className="mt-2">
          {shown.map((entry) => (
            <ResultRow key={entry.id} entry={entry} showType={false} />
          ))}
        </ul>
      )}
    </div>
  );
}
