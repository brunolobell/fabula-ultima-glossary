import type {
  EntrySummary,
  EquipmentDetails,
  WeaponCustomization,
  WeaponFeature,
} from '../api/types';
import type { RowSpec, Selection } from './listFilters';

// The filters inside the Weapon Forge. They live in component state (nothing
// in the Forge is saved, so nothing goes in the URL) and reuse the list-filter
// engine: OR inside a row, AND between rows.

const yesNo = (value: string, yes: string, no: string) =>
  value === 'sim' ? yes : no;

const detailsOf = (entry: EntrySummary) => entry.details as EquipmentDetails;

/** The basic weapons the Rare tab can start from. */
export const baseWeaponSpecs: RowSpec<EntrySummary>[] = [
  {
    param: 'categoria',
    label: 'Categoria',
    values: (e) => [detailsOf(e).category ?? ''],
    labelOf: (value) => value,
  },
  {
    param: 'maos',
    label: 'Mãos',
    values: (e) => [String(detailsOf(e).hands ?? 1)],
    labelOf: (value) => (value === '1' ? 'Uma mão' : 'Duas mãos'),
    order: ['1', '2'],
  },
  {
    param: 'alcance',
    label: 'Alcance',
    values: (e) => [detailsOf(e).range ?? 'melee'],
    labelOf: (value) => (value === 'melee' ? 'Corpo a corpo' : 'À distância'),
    order: ['melee', 'ranged'],
  },
  {
    param: 'marcial',
    label: 'Marcial',
    values: (e) => [detailsOf(e).martial ? 'sim' : 'nao'],
    labelOf: (value) => yesNo(value, 'Marcial', 'Não marcial'),
    order: ['sim', 'nao'],
  },
];

const costBand = (cost: number) =>
  cost <= 500 ? 'ate-500' : cost <= 1000 ? 'ate-1000' : 'mais';

/** The weapon features (Livro Básico p. 269). */
export const featureSpecs: RowSpec<WeaponFeature>[] = [
  {
    param: 'tipo',
    label: 'Tipo',
    values: (f) => [f.group],
    labelOf: (value) => (value === 'defensive' ? 'Defensiva' : 'Ofensiva'),
    order: ['defensive', 'offensive'],
  },
  {
    param: 'custo',
    label: 'Custo',
    values: (f) => [costBand(f.cost)],
    labelOf: (value) =>
      value === 'ate-500'
        ? 'Até 500z'
        : value === 'ate-1000'
          ? '501z a 1.000z'
          : 'Acima de 1.000z',
    order: ['ate-500', 'ate-1000', 'mais'],
  },
];

/** The customizations; `available` says whether one can be chosen right now. */
export const customizationSpecs = (
  available: (c: WeaponCustomization) => boolean,
): RowSpec<WeaponCustomization>[] => [
  {
    param: 'marcial',
    label: 'Marcial',
    values: (c) => [c.martial ? 'sim' : 'nao'],
    labelOf: (value) => yesNo(value, 'Marcial', 'Não marcial'),
    order: ['sim', 'nao'],
  },
  {
    param: 'disponivel',
    label: 'Disponibilidade',
    values: (c) => [available(c) ? 'sim' : 'nao'],
    labelOf: (value) => yesNo(value, 'Compatíveis agora', 'Bloqueadas agora'),
    order: ['sim', 'nao'],
  },
];

/** A copy of `selection` with `value` added to or removed from the row. */
export function toggleSelection(
  selection: Selection,
  param: string,
  value: string,
): Selection {
  const current = selection[param] ?? [];
  const next = current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
  return { ...selection, [param]: next };
}
