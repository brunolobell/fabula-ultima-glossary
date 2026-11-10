import type {
  EntrySummary,
  EntryType,
  EquipmentDetails,
  HeroicSkillDetails,
  SkillDetails,
  ServiceDetails,
  SpellDetails,
  TransportDetails,
} from '../api/types';
import { EQUIPMENT_KIND_FILTERS, kindFromParam } from './equipmentKinds';
import { isOpenToAll } from './requirements';
import { SOURCE_LABEL } from './sources';
import {
  MEDIUM_LABEL,
  MEDIUM_ORDER,
  SERVICE_GROUP_LABEL,
  SERVICE_GROUP_ORDER,
  TRANSPORT_CLASS_LABEL,
  TRANSPORT_CLASS_ORDER,
} from './travel';

type Index = ReadonlyMap<string, EntrySummary>;

/** One row of chips on a type list page. The `param` is its query-string key. */
interface RowSpec {
  param: string;
  label: string;
  /** The values an entry has in this row (a Heroic Skill can require several Classes). */
  values: (entry: EntrySummary) => string[];
  labelOf: (value: string, index: Index) => string;
  /** Fixed option order; alphabetical by label when absent. */
  order?: readonly string[];
  /** The side menu already offers these choices, so a wide screen hides the row. */
  menuRow?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
  /**
   * Entries that have this value and also pass the *other* rows' chosen chips,
   * so the number is what choosing it would show. Zero when it would show none.
   */
  count: number;
}

export interface FilterRow {
  param: string;
  label: string;
  options: FilterOption[];
  /** See RowSpec.menuRow. */
  menuRow?: boolean;
}

/** Chosen values per row param. A row with no values is off. */
export type Selection = Readonly<Record<string, readonly string[]>>;

const className = (slug: string, index: Index) => index.get(slug)?.name ?? slug;

const bookRow: RowSpec = {
  param: 'livro',
  label: 'Livro',
  values: (e) => [e.source],
  labelOf: (value) => SOURCE_LABEL[value as keyof typeof SOURCE_LABEL] ?? value,
  order: Object.keys(SOURCE_LABEL),
};

const classRow = (label: string, values: (e: EntrySummary) => string[]): RowSpec => ({
  param: 'classe',
  label,
  values,
  labelOf: className,
});

const kindParamOf = (kind: EquipmentDetails['kind']) =>
  EQUIPMENT_KIND_FILTERS.find((f) => f.kind === kind)?.param ?? kind;

const mediumRow = (values: (e: EntrySummary) => string[]): RowSpec => ({
  param: 'meio',
  label: 'Meio',
  values,
  labelOf: (value) => MEDIUM_LABEL[value as keyof typeof MEDIUM_LABEL] ?? value,
  order: MEDIUM_ORDER,
});

const ROWS: Partial<Record<EntryType, RowSpec[]>> = {
  class: [bookRow],
  skill: [
    classRow('Classe', (e) => [(e.details as SkillDetails).classSlug]),
    bookRow,
  ],
  'heroic-skill': [
    {
      param: 'requisito',
      label: 'Requisito',
      values: (e) => [
        isOpenToAll((e.details as HeroicSkillDetails).requirements)
          ? 'livres'
          : 'classe',
      ],
      labelOf: (value) =>
        value === 'livres' ? 'Disponíveis a todos' : 'Exigem classe',
      order: ['livres', 'classe'],
    },
    classRow(
      'Classe exigida',
      (e) => (e.details as HeroicSkillDetails).requirements.classes,
    ),
    bookRow,
  ],
  spell: [
    classRow('Classe', (e) => [(e.details as SpellDetails).classSlug]),
    {
      param: 'ofensivo',
      label: 'Efeito',
      values: (e) => [(e.details as SpellDetails).offensive ? 'sim' : 'nao'],
      labelOf: (value) => (value === 'sim' ? 'Ofensivo' : 'Não ofensivo'),
      order: ['sim', 'nao'],
    },
    bookRow,
  ],
  equipment: [
    {
      param: 'item',
      label: 'Tipo de item',
      values: (e) => [kindParamOf((e.details as EquipmentDetails).kind)],
      labelOf: (value) => kindFromParam(value)?.label ?? value,
      order: EQUIPMENT_KIND_FILTERS.map((f) => f.param),
      menuRow: true,
    },
    {
      param: 'raridade',
      label: 'Raridade',
      values: (e) => [
        (e.details as EquipmentDetails).rarity === 'rare' ? 'raro' : 'basico',
      ],
      labelOf: (value) => (value === 'raro' ? 'Raro' : 'Básico'),
      order: ['basico', 'raro'],
    },
    {
      param: 'marcial',
      label: 'Marcial',
      values: (e) => [(e.details as EquipmentDetails).martial ? 'sim' : 'nao'],
      labelOf: (value) => (value === 'sim' ? 'Marcial' : 'Não marcial'),
      order: ['sim', 'nao'],
    },
    bookRow,
  ],
  service: [
    {
      param: 'grupo',
      label: 'Grupo',
      values: (e) => [(e.details as ServiceDetails).group],
      labelOf: (value) =>
        SERVICE_GROUP_LABEL[value as keyof typeof SERVICE_GROUP_LABEL] ?? value,
      order: SERVICE_GROUP_ORDER,
    },
    // Only travel fares go anywhere, so the other Services have no Meio.
    mediumRow((e) => {
      const { medium } = e.details as ServiceDetails;
      return medium ? [medium] : [];
    }),
  ],
  transport: [
    {
      param: 'classe',
      label: 'Classe',
      values: (e) => [(e.details as TransportDetails).transportClass],
      labelOf: (value) =>
        TRANSPORT_CLASS_LABEL[value as keyof typeof TRANSPORT_CLASS_LABEL] ??
        value,
      order: TRANSPORT_CLASS_ORDER,
    },
    mediumRow((e) => [(e.details as TransportDetails).medium]),
    bookRow,
  ],
};

const specsOf = (type: EntryType) => ROWS[type] ?? [];

/**
 * The rows to show for a list: only values that some entry has, in a stable
 * order, and only rows with a real choice (a single option filters nothing).
 * Counts follow the current `selection` (see FilterOption).
 */
export function buildRows(
  type: EntryType,
  ofType: readonly EntrySummary[],
  index: Index,
  selection: Selection = {},
): FilterRow[] {
  const specs = specsOf(type);
  return specs
    .map((spec) => {
      // Options come from the whole list, so a chip never vanishes...
      const counts = new Map<string, number>();
      for (const entry of ofType) {
        for (const value of spec.values(entry)) counts.set(value, 0);
      }
      // ...and its number comes from what the other rows already allow.
      const others = specs.filter(
        (other) => other !== spec && (selection[other.param] ?? []).length > 0,
      );
      for (const entry of ofType) {
        const allowed = others.every((other) =>
          other.values(entry).some((v) => selection[other.param].includes(v)),
        );
        if (!allowed) continue;
        for (const value of new Set(spec.values(entry))) {
          counts.set(value, (counts.get(value) ?? 0) + 1);
        }
      }
      const options = [...counts].map(([value, count]) => ({
        value,
        label: spec.labelOf(value, index),
        count,
      }));
      const rank = (value: string) => spec.order?.indexOf(value) ?? -1;
      options.sort((a, b) =>
        spec.order
          ? rank(a.value) - rank(b.value)
          : a.label.localeCompare(b.label, 'pt-BR'),
      );
      return { param: spec.param, label: spec.label, options, menuRow: spec.menuRow };
    })
    .filter((row) => row.options.length > 1);
}

/** Reads the chosen values of this type's rows from the query string (`a,b`). */
export function readSelection(type: EntryType, params: URLSearchParams): Selection {
  return Object.fromEntries(
    specsOf(type).map((spec) => {
      const values = (params.get(spec.param) ?? '')
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean);
      return [spec.param, [...new Set(values)]];
    }),
  );
}

export const hasActiveFilters = (selection: Selection) =>
  Object.values(selection).some((values) => values.length > 0);

/** OR inside a row, AND between rows. */
export function applyFilters(
  type: EntryType,
  entries: readonly EntrySummary[],
  selection: Selection,
): EntrySummary[] {
  const active = specsOf(type).filter(
    (spec) => (selection[spec.param] ?? []).length > 0,
  );
  return entries.filter((entry) =>
    active.every((spec) => {
      const chosen = selection[spec.param];
      return spec.values(entry).some((value) => chosen.includes(value));
    }),
  );
}

/** A copy of `params` with `value` added to or removed from the row. */
export function toggleValue(
  params: URLSearchParams,
  param: string,
  value: string,
): URLSearchParams {
  const next = new URLSearchParams(params);
  const current = (next.get(param) ?? '').split(',').filter(Boolean);
  const updated = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  if (updated.length > 0) next.set(param, updated.join(','));
  else next.delete(param);
  return next;
}

/** A copy of `params` without this type's filter rows. */
export function clearFilters(type: EntryType, params: URLSearchParams) {
  const next = new URLSearchParams(params);
  for (const spec of specsOf(type)) next.delete(spec.param);
  return next;
}
