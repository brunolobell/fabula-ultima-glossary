import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import type {
  CustomWeaponRuleDetails,
  EntrySummary,
  EquipmentDetails,
  RareWeaponRuleDetails,
} from '../../api/types';
import { toggleSelection } from '../../lib/forgeFilters';
import { useDraft } from '../../lib/forgeDraft';
import { equipmentPath } from '../../lib/equipmentKinds';
import type { ForgeTab } from '../../lib/forgeTab';
import type { Selection } from '../../lib/listFilters';
import {
  baseFromBasic,
  baseFromCustom,
  computeCustom,
  computeRare,
  emptyForms,
  emptyRareChoice,
  sanitizeChoice,
  type CustomForms,
  type RareChoice,
} from '../../lib/weaponForge';
import { CustomTab } from './CustomTab';
import { RareTab, type BaseKind, type RareFilterKey } from './RareTab';
import { ResultCard } from './ResultCard';
import { ResultPanel } from './ResultPanel';
import { WeaponStatBlocks } from './WeaponStatBlocks';

type FilterKey = 'custom' | RareFilterKey;
type AllFilters = Record<FilterKey, Selection>;
const NO_FILTERS: AllFilters = { custom: {}, bases: {}, features: {} };

interface Props {
  customRules: CustomWeaponRuleDetails;
  rareRules: RareWeaponRuleDetails;
  /** Every Equipment entry; the basic weapons are picked out here. */
  equipment: EntrySummary[];
  /** The open tab. */
  tab: ForgeTab;
  onTab: (tab: ForgeTab) => void;
}

/**
 * The Weapon Forge page: builds a Custom Weapon or a Rare Weapon. The draft is
 * kept in memory for the session (`useDraft`): nothing is saved, and a reload
 * discards it.
 */
export function WeaponForge({
  customRules,
  rareRules,
  equipment,
  tab,
  onTab,
}: Props) {
  const [forms, setForms] = useDraft<CustomForms>('weapon:forms', () =>
    emptyForms(customRules),
  );
  const [baseKind, setBaseKind] = useDraft<BaseKind>(
    'weapon:base-kind',
    () => 'basic',
  );
  const [baseSlug, setBaseSlug] = useDraft<string | null>(
    'weapon:base',
    () => null,
  );
  const [rawChoice, setRawChoice] = useDraft<RareChoice>(
    'weapon:choice',
    emptyRareChoice,
  );
  const [filters, setFilters] = useDraft<AllFilters>(
    'weapon:filters',
    () => NO_FILTERS,
  );

  const basics = useMemo(
    () =>
      equipment.filter((e) => {
        const d = e.details as EquipmentDetails;
        return (
          d.kind === 'weapon' &&
          d.rarity === 'basic' &&
          !rareRules.excludedBases.includes(e.slug)
        );
      }),
    [equipment, rareRules],
  );

  const custom = useMemo(
    () => computeCustom(customRules, forms),
    [customRules, forms],
  );

  const basic = basics.find((e) => e.slug === baseSlug);
  const base =
    baseKind === 'custom'
      ? baseFromCustom('Arma personalizada', custom)
      : basic
        ? baseFromBasic(basic.name, basic.details as EquipmentDetails)
        : null;
  // A choice that no longer fits the base is ignored, not erased: it comes back
  // if the Reader goes back to a base where it fits. Only the field the Reader
  // edits is rewritten (a patch on `rawChoice`), so the others survive.
  const choice = base ? sanitizeChoice(rareRules, base, rawChoice) : rawChoice;
  const rare = base ? computeRare(rareRules, base, choice) : null;

  const toggleFilter = (key: FilterKey) => (param: string, value: string) =>
    setFilters((prev) => ({
      ...prev,
      [key]: toggleSelection(prev[key], param, value),
    }));
  const clearFilters = (key: FilterKey) =>
    setFilters((prev) => ({ ...prev, [key]: {} }));

  const reset = () => {
    setForms(emptyForms(customRules));
    setBaseKind('basic');
    setBaseSlug(null);
    setRawChoice(emptyRareChoice());
    setFilters(NO_FILTERS);
  };

  const tabs: { id: ForgeTab; label: string }[] = [
    { id: 'personalizada', label: 'Arma personalizada' },
    { id: 'rara', label: 'Arma rara' },
  ];
  const active = tab;

  const result = active === 'personalizada' ? custom : rare;

  return (
    <div>
      <h1 className="h-main">Forja de Armas</h1>
      <div className="mt-3 flex items-center justify-between gap-3">
        <Link to={equipmentPath('armas')} className="tap">← Armas</Link>
        <button type="button" className="chip" onClick={reset}>
          Recomeçar
        </button>
      </div>
      <p className="mt-2 text-meta text-muted">
        Nada é salvo; o rascunho some ao recarregar.
      </p>
      <div
        role="tablist"
        aria-label="O que forjar"
        className="mt-3 flex flex-wrap gap-2"
      >
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`forja-aba-${id}`}
            aria-selected={active === id}
            aria-controls={`forja-painel-${id}`}
            className="chip"
            onClick={() => onTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid gap-x-8 md:grid-cols-[minmax(0,1fr)_20rem]">
        <div
          role="tabpanel"
          id={`forja-painel-${active}`}
          aria-labelledby={`forja-aba-${active}`}
          className="min-w-0 pt-3"
        >
          {active === 'personalizada' ? (
            <CustomTab
              rules={customRules}
              forms={forms}
              onChange={setForms}
              filters={filters.custom}
              onToggleFilter={toggleFilter('custom')}
              onClearFilters={() => clearFilters('custom')}
            />
          ) : (
            <RareTab
              rules={rareRules}
              basics={basics}
              custom={custom}
              baseKind={baseKind}
              onBaseKind={setBaseKind}
              baseSlug={baseSlug}
              onBaseSlug={setBaseSlug}
              base={base}
              choice={choice}
              onChoice={(patch) =>
                setRawChoice((prev) => ({ ...prev, ...patch }))
              }
              filters={{ bases: filters.bases, features: filters.features }}
              onToggleFilter={(key, param, value) =>
                toggleFilter(key)(param, value)
              }
              onClearFilters={clearFilters}
            />
          )}
        </div>
        {result ? (
          <ResultPanel total={result.total} problems={result.problems.length}>
            <ResultCard
              cost={result.cost}
              total={result.total}
              problems={result.problems}
              notes={active === 'personalizada' ? custom.notes : []}
            >
              <WeaponStatBlocks
                kind={active === 'personalizada' ? 'custom' : 'rare'}
                forms={result.forms}
              />
            </ResultCard>
          </ResultPanel>
        ) : (
          <div className="sticky bottom-0 z-10 bg-bg md:top-0 md:self-start md:pt-3">
            <div className="highlight-key">
              <p>
                {baseKind === 'custom'
                  ? 'Complete a arma personalizada para usá-la como base.'
                  : 'Escolha uma arma básica para começar.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
