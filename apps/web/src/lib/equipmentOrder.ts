import type { EntrySummary, EquipmentDetails } from '../api/types';

/** Query parameters of the equipment list's sort and maximum price. */
export const ORDER_PARAM = 'ordem';
export const MAX_PRICE_PARAM = 'ate';

export const ORDER_OPTIONS = [
  { value: 'nome-asc', label: 'Nome (A→Z)' },
  { value: 'nome-desc', label: 'Nome (Z→A)' },
  { value: 'preco-asc', label: 'Preço (menor→maior)' },
  { value: 'preco-desc', label: 'Preço (maior→menor)' },
] as const;

export type EquipmentOrder = (typeof ORDER_OPTIONS)[number]['value'];

export const DEFAULT_ORDER: EquipmentOrder = 'nome-asc';

export const orderFromParam = (value: string | null): EquipmentOrder =>
  ORDER_OPTIONS.find((o) => o.value === value)?.value ?? DEFAULT_ORDER;

/** A whole number of zênites, or null when the parameter is absent or invalid. */
export const maxPriceFromParam = (value: string | null): number | null =>
  value !== null && /^\d+$/.test(value) ? Number(value) : null;

const costOf = (entry: EntrySummary) => (entry.details as EquipmentDetails).cost;

/** Items that cost at most `max` zênites; an item with no price never passes. */
export function filterByMaxPrice(
  entries: readonly EntrySummary[],
  max: number | null,
): EntrySummary[] {
  if (max === null) return [...entries];
  return entries.filter((entry) => {
    const cost = costOf(entry);
    return cost !== null && cost <= max;
  });
}

const byName = (a: EntrySummary, b: EntrySummary) =>
  a.name.localeCompare(b.name, 'pt-BR');

/** A sorted copy. Sorting by price puts items with no price last, either way. */
export function sortEquipment(
  entries: readonly EntrySummary[],
  order: EquipmentOrder,
): EntrySummary[] {
  const copy = [...entries];
  switch (order) {
    case 'nome-asc':
      return copy.sort(byName);
    case 'nome-desc':
      return copy.sort((a, b) => byName(b, a));
    case 'preco-asc':
    case 'preco-desc': {
      const sign = order === 'preco-asc' ? 1 : -1;
      return copy.sort((a, b) => {
        const costA = costOf(a);
        const costB = costOf(b);
        if (costA === null || costB === null) {
          if (costA === costB) return byName(a, b);
          return costA === null ? 1 : -1;
        }
        return sign * (costA - costB) || byName(a, b);
      });
    }
  }
}
