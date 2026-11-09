import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { rememberEntry } from '../lib/recent';
import { SearchBox } from './SearchBox';

afterEach(() => {
  vi.unstubAllGlobals();
  localStorage.clear();
});

const entry = (n: number, over: Record<string, unknown> = {}) => ({
  id: String(n),
  slug: `entrada-${n}`,
  name: `Entrada ${n}`,
  type: 'rule',
  summary: `Resumo ${n}`,
  page: n,
  tags: [],
  ...over,
});

function stubSearch(results: unknown[]) {
  const fetchMock = vi.fn(async () => ({
    ok: true,
    status: 200,
    json: async () => results,
  }));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

function Where() {
  const { pathname, search } = useLocation();
  return <p data-testid="where">{pathname + search}</p>;
}

function setup(path = '/') {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <SearchBox />
        <Where />
      </MemoryRouter>
    </QueryClientProvider>,
  );
  return screen.getByRole('combobox');
}

const where = () => screen.getByTestId('where').textContent;

describe('SearchBox type-ahead', () => {
  it('shows at most 10 suggestions under the box, plus a link to all results', async () => {
    stubSearch(Array.from({ length: 14 }, (_, i) => entry(i + 1)));
    const input = setup();
    fireEvent.change(input, { target: { value: 'entr' } });

    const list = await screen.findByRole('listbox');
    const options = within(list).getAllByRole('option');
    expect(options).toHaveLength(11); // 10 entries + "ver todos"
    expect(options[0]).toHaveTextContent('Entrada 1');
    expect(options[9]).toHaveTextContent('Entrada 10');
    expect(options[10]).toHaveTextContent('Ver todos os 14 resultados');
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not search for a single character', async () => {
    const fetchMock = stubSearch([entry(1)]);
    const input = setup();
    fireEvent.change(input, { target: { value: 'e' } });
    await new Promise((r) => setTimeout(r, 350));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the search page on Enter', async () => {
    stubSearch([entry(1), entry(2)]);
    const input = setup();
    fireEvent.change(input, { target: { value: 'traços' } });
    await screen.findByRole('listbox');

    fireEvent.submit(input.closest('form')!);

    expect(where()).toBe('/buscar?q=tra%C3%A7os');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens the highlighted suggestion when you arrow down and press Enter', async () => {
    stubSearch([entry(1), entry(2), entry(3, { type: 'spell', slug: 'raio', name: 'Raio' })]);
    const input = setup();
    fireEvent.change(input, { target: { value: 'ra' } });
    await screen.findByRole('listbox');

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input.getAttribute('aria-activedescendant')).toBe(
      screen.getAllByRole('option')[2].id,
    );
    expect(screen.getAllByRole('option')[2]).toHaveAttribute('aria-selected', 'true');

    fireEvent.submit(input.closest('form')!);
    expect(where()).toBe('/feiticos/raio');
  });

  it('wraps ArrowUp from nothing to the last option and back to nothing', async () => {
    stubSearch([entry(1), entry(2)]);
    const input = setup();
    fireEvent.change(input, { target: { value: 'en' } });
    await screen.findByRole('listbox');

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(screen.getAllByRole('option')[2]).toHaveAttribute('aria-selected', 'true'); // "ver todos"
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).not.toHaveAttribute('aria-activedescendant');
  });

  it('opens an entry when a suggestion is clicked and clears the box', async () => {
    stubSearch([entry(1)]);
    const input = setup();
    fireEvent.change(input, { target: { value: 'en' } });
    const option = (await screen.findAllByRole('option'))[0];

    fireEvent.click(option);

    expect(where()).toBe('/regras/entrada-1');
    expect(input).toHaveValue('');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    stubSearch([entry(1)]);
    const input = setup();
    fireEvent.change(input, { target: { value: 'en' } });
    await screen.findByRole('listbox');
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('says so when nothing matches', async () => {
    stubSearch([]);
    const input = setup();
    fireEvent.change(input, { target: { value: 'zzzz' } });
    expect(await screen.findByText(/nenhuma entrada encontrada para “zzzz”/i)).toBeInTheDocument();
  });

  it('does not touch the URL or results while typing on the search page', async () => {
    const fetchMock = stubSearch([entry(1)]);
    const input = setup('/buscar?q=raio');
    expect(input).toHaveValue('raio');

    fireEvent.change(input, { target: { value: 'traços' } });
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(where()).toBe('/buscar?q=raio');
  });
});

describe('SearchBox shortcut and recents', () => {
  it('focuses the box when "/" is pressed outside a text field', () => {
    stubSearch([]);
    const input = setup();
    expect(input).not.toHaveFocus();
    fireEvent.keyDown(document.body, { key: '/' });
    expect(input).toHaveFocus();
  });

  it('leaves "/" alone while typing in a field', () => {
    stubSearch([]);
    const input = setup();
    const other = document.createElement('input');
    document.body.appendChild(other);
    other.focus();
    fireEvent.keyDown(other, { key: '/' });
    expect(input).not.toHaveFocus();
    other.remove();
  });

  it('offers the last opened entries when the empty box is focused', async () => {
    const fetchMock = stubSearch([]);
    rememberEntry({ slug: 'raio', name: 'Raio', type: 'spell' });
    rememberEntry({ slug: 'tracos', name: 'Traços', type: 'rule' });
    const input = setup();
    fireEvent.focus(input);

    const options = within(await screen.findByRole('listbox', { name: 'Vistos recentemente' })).getAllByRole('option');
    expect(options.map((o) => o.textContent)).toEqual(['TraçosRegra', 'RaioFeitiço']);
    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.submit(input.closest('form')!);
    expect(where()).toBe('/feiticos/raio');
  });

  it('shows nothing extra when there are no recents', () => {
    stubSearch([]);
    const input = setup();
    fireEvent.focus(input);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('does not let a query grow past what the API accepts', () => {
    stubSearch([]);
    expect(setup()).toHaveAttribute('maxlength', '100');
  });
});

