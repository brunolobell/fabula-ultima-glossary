import type {
  CreatureSummaryDetails,
  DamageType,
  Affinity,
  EntrySummary,
  EntryType,
  EquipmentDetails,
  HeroicSkillDetails,
  SkillDetails,
  ServiceDetails,
  SpellDetails,
  TransportDetails,
} from '../api/types';
import {
  AFFINITY_ORDER,
  DAMAGE_ORDER,
  RANK_LABEL,
  RANK_ORDER,
  ROLE_LABEL,
  ROLE_ORDER,
  SPECIES_LABEL,
  affinityLabel,
  isCreatureGroup,
} from './creatures';
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
export interface RowSpec<T = EntrySummary> {
  param: string;
  label: string;
  /** The values an item has in this row (a Heroic Skill can require several Classes). */
  values: (item: T) => string[];
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

// Every level a Creature can have, so the options keep a numeric order.
const LEVELS = [5, 10, 15, 20, 30, 40, 50, 60].map(String);
// Damage type by Affinity, in the order the bestiary prints them.
const AFFINITY_VALUES = AFFINITY_ORDER.flatMap((affinity) =>
  DAMAGE_ORDER.map((damage) => `${damage}:${affinity}`),
);

const stats = (e: EntrySummary) => e.details as CreatureSummaryDetails;

// A Creature Group has no stat block, so it has no value in the rows about stats
// (only in "Livro"): any of those filters leaves it out, and keeps its members.
const statRow = (spec: RowSpec): RowSpec => ({
  ...spec,
  values: (e) => (isCreatureGroup(e.details) ? [] : spec.values(e)),
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
  peculiarity: [bookRow],
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
      // Weapons only: armor, shields and the rest have no category, so they
      // drop out as soon as one is chosen.
      param: 'categoria',
      label: 'Tipo de arma',
      values: (e) => {
        const { category } = e.details as EquipmentDetails;
        return category ? [category] : [];
      },
      labelOf: (value) => value,
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
  creature: [
    statRow({
      param: 'especie',
      label: 'Espécie',
      values: (e) => [stats(e).species],
      labelOf: (value) =>
        SPECIES_LABEL[value as keyof typeof SPECIES_LABEL] ?? value,
    }),
    statRow({
      param: 'nivel',
      label: 'Nível',
      values: (e) => [String(stats(e).level)],
      labelOf: (value) => `Nível ${value}`,
      order: LEVELS,
    }),
    statRow({
      param: 'afinidade',
      label: 'Afinidade',
      // "gelo:vulnerable": the damage type, then how the Creature fares against it.
      values: (e) =>
        Object.entries(stats(e).affinities).map(
          ([damage, affinity]) => `${damage}:${affinity}`,
        ),
      labelOf: (value) => {
        const [damage, affinity] = value.split(':');
        return affinityLabel(damage as DamageType, affinity as Affinity);
      },
      order: AFFINITY_VALUES,
    }),
    statRow({
      param: 'feiticos',
      label: 'Feitiços',
      values: (e) => [stats(e).hasSpells ? 'sim' : 'nao'],
      labelOf: (value) => (value === 'sim' ? 'Lança feitiços' : 'Não lança feitiços'),
      order: ['sim', 'nao'],
    }),
    statRow({
      param: 'patente',
      label: 'Patente',
      values: (e) => [stats(e).rank],
      labelOf: (value) => RANK_LABEL[value as keyof typeof RANK_LABEL] ?? value,
      order: RANK_ORDER,
    }),
    statRow({
      param: 'funcao',
      label: 'Função',
      // Only Quick Assembly (Bestiary Vol. I) Creatures have a Role.
      values: (e) => {
        const { role } = stats(e);
        return role ? [role] : [];
      },
      labelOf: (value) => ROLE_LABEL[value as keyof typeof ROLE_LABEL] ?? value,
      order: ROLE_ORDER,
    }),
    statRow({
      param: 'vilao',
      label: 'Vilão',
      values: (e) => [stats(e).villain ? 'sim' : 'nao'],
      labelOf: (value) => (value === 'sim' ? 'Vilão' : 'Não é vilão'),
      order: ['sim', 'nao'],
    }),
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
 * The rows to show for a list of `items`: only values that some item has, in a
 * stable order, and only rows with a real choice (a single option filters
 * nothing). Counts follow the current `selection` (see FilterOption).
 */
export function buildRowsFor<T>(
  specs: readonly RowSpec<T>[],
  items: readonly T[],
  index: Index,
  selection: Selection = {},
): FilterRow[] {
  return specs
    .map((spec) => {
      // Options come from the whole list, so a chip never vanishes...
      const counts = new Map<string, number>();
      for (const item of items) {
        for (const value of spec.values(item)) counts.set(value, 0);
      }
      // ...and its number comes from what the other rows already allow.
      const others = specs.filter(
        (other) => other !== spec && (selection[other.param] ?? []).length > 0,
      );
      for (const item of items) {
        const allowed = others.every((other) =>
          other.values(item).some((v) => selection[other.param].includes(v)),
        );
        if (!allowed) continue;
        for (const value of new Set(spec.values(item))) {
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

/** The rows of a type list page (see buildRowsFor). */
export function buildRows(
  type: EntryType,
  ofType: readonly EntrySummary[],
  index: Index,
  selection: Selection = {},
): FilterRow[] {
  return buildRowsFor(specsOf(type), ofType, index, selection);
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
export function applyRowSpecs<T>(
  specs: readonly RowSpec<T>[],
  items: readonly T[],
  selection: Selection,
): T[] {
  const active = specs.filter((spec) => (selection[spec.param] ?? []).length > 0);
  return items.filter((item) =>
    active.every((spec) => {
      const chosen = selection[spec.param];
      return spec.values(item).some((value) => chosen.includes(value));
    }),
  );
}

export const applyFilters = (
  type: EntryType,
  entries: readonly EntrySummary[],
  selection: Selection,
): EntrySummary[] => applyRowSpecs(specsOf(type), entries, selection);

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
