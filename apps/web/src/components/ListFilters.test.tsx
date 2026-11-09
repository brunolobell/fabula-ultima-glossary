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

const setup = (rows: FilterRow[], selection = {}, onToggle = vi.fn(), onClear?: () => void) =>
  render(<ListFilters rows={rows} selection={selection} onToggle={onToggle} onClear={onClear} />);

const button = (name: string | RegExp) => screen.getByRole('button', { name });

describe('ListFilters', () => {
  it('shows one closed button per filter, with no options until one is opened', () => {
    setup([row('classe', 26), row('livro', 3)]);
    expect(button(/^classe/)).toHaveAttribute('aria-expanded', 'false');
    expect(button(/^livro/)).toBeInTheDocument();
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
  });

  it('opens a panel with every option and its count, and toggles one', () => {
    const onToggle = vi.fn();
    setup([row('classe', 26)], {}, onToggle);
    fireEvent.click(button(/^classe/));
    expect(button(/^classe/)).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('checkbox')).toHaveLength(26);
    fireEvent.click(screen.getByRole('checkbox', { name: /^classe 3/ }));
    expect(onToggle).toHaveBeenCalledWith('classe', 'classe3');
  });

  it('keeps the panel open while ticking, and opens one panel at a time', () => {
    setup([row('classe', 4), row('livro', 3)]);
    fireEvent.click(button(/^classe/));
    fireEvent.click(screen.getByRole('checkbox', { name: /^classe 1/ }));
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    fireEvent.click(button(/^livro/));
    expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    expect(button(/^classe/)).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on its button and on Escape, which returns focus to the button', () => {
    setup([row('classe', 4)]);
    fireEvent.click(button(/^classe/));
    fireEvent.click(button(/^classe/));
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);

    fireEvent.click(button(/^classe/));
    fireEvent.keyDown(screen.getByRole('checkbox', { name: /^classe 0/ }), { key: 'Escape' });
    expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
    expect(button(/^classe/)).toHaveFocus();
  });

  it('summarises the chosen values on the button', () => {
    const { rerender } = setup([row('classe', 4)], { classe: ['classe2'] });
    expect(button('classe: classe 2')).toHaveAttribute('data-active', 'true');
    rerender(
      <ListFilters rows={[row('classe', 4)]} selection={{ classe: ['classe1', 'classe2', 'classe3'] }} onToggle={vi.fn()} />,
    );
    expect(button('classe: 3')).toBeInTheDocument();
  });

  it('hides a menu-duplicated filter only on wide screens', () => {
    setup([row('item', 5, true), row('marcial', 2)]);
    expect(button(/^item/).className).toContain('lg:hidden');
    expect(button(/^marcial/).className).not.toContain('lg:hidden');
  });

  it('offers "Limpar filtros" only when given a clear action', () => {
    const onClear = vi.fn();
    const { rerender } = setup([row('classe', 4)]);
    expect(screen.queryByText('Limpar filtros')).toBeNull();
    rerender(<ListFilters rows={[row('classe', 4)]} selection={{}} onToggle={vi.fn()} onClear={onClear} />);
    fireEvent.click(screen.getByText('Limpar filtros'));
    expect(onClear).toHaveBeenCalled();
  });
});
