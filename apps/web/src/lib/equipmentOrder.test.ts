import { describe, expect, it } from 'vitest';
import type { EntrySummary } from '../api/types';
import {
  filterByMaxPrice,
  maxPriceFromParam,
  orderFromParam,
  sortEquipment,
} from './equipmentOrder';

const item = (name: string, cost: number | null): EntrySummary => ({
  id: name,
  slug: name,
  name,
  type: 'equipment',
  summary: '',
  source: 'livro-basico',
  page: 1,
  tags: [],
  details: { kind: 'weapon', rarity: 'basic', martial: false, cost },
});

const names = (entries: EntrySummary[]) => entries.map((e) => e.name);

describe('orderFromParam', () => {
  it('reads the four orders and falls back to name A→Z', () => {
    expect(orderFromParam('nome-desc')).toBe('nome-desc');
    expect(orderFromParam('preco-asc')).toBe('preco-asc');
    expect(orderFromParam('preco-desc')).toBe('preco-desc');
    expect(orderFromParam('nome-asc')).toBe('nome-asc');
    expect(orderFromParam(null)).toBe('nome-asc');
    expect(orderFromParam('xyz')).toBe('nome-asc');
  });
});

describe('maxPriceFromParam', () => {
  it('accepts whole numbers of zero or more', () => {
    expect(maxPriceFromParam('500')).toBe(500);
    expect(maxPriceFromParam('0')).toBe(0);
  });
  it('ignores anything else', () => {
    expect(maxPriceFromParam(null)).toBeNull();
    expect(maxPriceFromParam('')).toBeNull();
    expect(maxPriceFromParam('abc')).toBeNull();
    expect(maxPriceFromParam('-5')).toBeNull();
    expect(maxPriceFromParam('10.5')).toBeNull();
  });
});

describe('filterByMaxPrice', () => {
  const list = [item('A', 100), item('B', 500), item('C', 501), item('D', null)];
  it('keeps items up to and including the maximum', () => {
    expect(names(filterByMaxPrice(list, 500))).toEqual(['A', 'B']);
  });
  it('drops items with no price once a maximum is set', () => {
    expect(names(filterByMaxPrice(list, 100000))).toEqual(['A', 'B', 'C']);
  });
  it('changes nothing without a maximum', () => {
    expect(filterByMaxPrice(list, null)).toHaveLength(4);
  });
});

describe('sortEquipment', () => {
  const list = [
    item('Éter', 100),
    item('Arco', 300),
    item('Bastão', null),
    item('Adaga', 100),
    item('Zarabatana', 50),
  ];
  it('sorts by name A→Z, ignoring accents like the rest of the app', () => {
    expect(names(sortEquipment(list, 'nome-asc'))).toEqual([
      'Adaga',
      'Arco',
      'Bastão',
      'Éter',
      'Zarabatana',
    ]);
  });
  it('sorts by name Z→A', () => {
    expect(names(sortEquipment(list, 'nome-desc'))[0]).toBe('Zarabatana');
  });
  it('sorts by price ascending, ties by name, no price last', () => {
    expect(names(sortEquipment(list, 'preco-asc'))).toEqual([
      'Zarabatana',
      'Adaga',
      'Éter',
      'Arco',
      'Bastão',
    ]);
  });
  it('sorts by price descending, ties by name, no price still last', () => {
    expect(names(sortEquipment(list, 'preco-desc'))).toEqual([
      'Arco',
      'Adaga',
      'Éter',
      'Zarabatana',
      'Bastão',
    ]);
  });
  it('does not change the list it is given', () => {
    const copy = [...list];
    sortEquipment(list, 'preco-desc');
    expect(list).toEqual(copy);
  });
});
