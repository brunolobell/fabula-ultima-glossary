import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { FilterRow } from '../lib/listFilters';
import { ListFilters } from './ListFilters';

const row = (param: string, n: number, menuRow = false): FilterRow => ({
  param,
  label: param,
  menuRow,
  options: Array.from({ length: n }, (_, i) => ({ value: `${param}${i}`, label: `${param} ${i}`, count: i })),
});

const setup = (rows: FilterRow[], selection = {}) =>
  render(<ListFilters rows={rows} selection={selection} onToggle={vi.fn()} />);

const toggle = () => screen.getByRole('button', { name: /^Filtrar/ });

describe('ListFilters', () => {
  it('shows only a few chips of a long row until "Mostrar todas"', () => {
    setup([row('classe', 26)], { classe: ['classe20'] });
    // 6 first chips, plus the chosen one past the cut.
    expect(screen.getAllByRole('button', { name: /^classe \d/ })).toHaveLength(7);
    expect(screen.getByRole('button', { name: /^classe 20/ })).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar todas (26)' }));
    expect(screen.getAllByRole('button', { name: /^classe \d/ })).toHaveLength(26);
    expect(screen.getByRole('button', { name: 'Mostrar menos' })).toBeInTheDocument();
  });

  it('leaves a short row complete, with no "Mostrar todas"', () => {
    setup([row('livro', 4)]);
    expect(screen.getAllByRole('button', { name: /^livro \d/ })).toHaveLength(4);
    expect(screen.queryByText(/Mostrar todas/)).toBeNull();
  });

  it('puts the whole block behind "Filtrar" at every width when there are many chips', () => {
    setup([row('classe', 8), row('livro', 4)]);
    expect(toggle().className).not.toContain('md:hidden');
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle());
    expect(toggle()).toHaveAttribute('aria-expanded', 'true');
  });

  it('keeps the toggle phone-only for a small set of chips', () => {
    setup([row('efeito', 2), row('livro', 3)]);
    expect(toggle().className).toContain('md:hidden');
  });

  it('opens already when a filter is set, and hides a menu-duplicated row only on wide screens', () => {
    setup([row('item', 5, true), row('marcial', 2)], { marcial: ['marcial0'] });
    expect(toggle()).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('group', { name: 'item' }).className).toContain('lg:hidden');
    expect(screen.getByRole('group', { name: 'marcial' }).className).not.toContain('lg:hidden');
  });

  it('opens for a URL filter even when the rows only arrive after the first render', () => {
    const selection = { marcial: ['marcial0'] };
    const { rerender } = render(
      <ListFilters rows={[]} selection={selection} onToggle={vi.fn()} onClear={vi.fn()} />,
    );
    rerender(
      <ListFilters rows={[row('marcial', 2)]} selection={selection} onToggle={vi.fn()} onClear={vi.fn()} />,
    );
    expect(toggle()).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(toggle());
    expect(toggle()).toHaveAttribute('aria-expanded', 'false');
  });
});
