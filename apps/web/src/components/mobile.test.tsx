import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Link, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EntryBody } from './EntryBody';
import { ScrollToTop } from './ScrollToTop';
import { SearchShortcut } from './SearchShortcut';

const scrollTo = vi.fn();

beforeEach(() => {
  scrollTo.mockClear();
  window.scrollTo = scrollTo as unknown as typeof window.scrollTo;
});
afterEach(() => {
  vi.unstubAllGlobals();
  Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
});

describe('ScrollToTop', () => {
  const app = () =>
    render(
      <MemoryRouter initialEntries={['/lista']}>
        <ScrollToTop />
        <Link to="/entrada">entrada</Link>
        <Link to="/lista?filtro=a">filtro</Link>
        <Link to="/lista#secao">secao</Link>
        <Routes>
          <Route path="*" element={null} />
        </Routes>
      </MemoryRouter>,
    );

  it('starts a new page at the top', () => {
    app();
    scrollTo.mockClear();
    fireEvent.click(screen.getByText('entrada'));
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it('leaves the Reader where they are for a filter or a jump link', () => {
    app();
    scrollTo.mockClear();
    fireEvent.click(screen.getByText('filtro'));
    fireEvent.click(screen.getByText('secao'));
    expect(scrollTo).not.toHaveBeenCalled();
  });
});

describe('SearchShortcut', () => {
  const scrolledTo = async (y: number) => {
    Object.defineProperty(window, 'scrollY', { value: y, configurable: true });
    await act(async () => {
      window.dispatchEvent(new Event('scroll'));
    });
  };
  const page = (path = '/classes') =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <form role="search">
          <input aria-label="Buscar" />
        </form>
        <SearchShortcut />
      </MemoryRouter>,
    );

  it('shows after a screen or so of scrolling, and jumps to the search box', async () => {
    vi.stubGlobal('innerHeight', 800);
    page();
    expect(screen.queryByRole('button', { name: /Buscar/ })).toBeNull();
    await scrolledTo(2000);
    const button = await screen.findByRole('button', { name: /^Buscar/ });
    expect(button).toHaveTextContent('Buscar');
    fireEvent.click(button);
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    expect(screen.getByLabelText('Buscar')).toHaveFocus();
  });

  it('hides again near the top', async () => {
    vi.stubGlobal('innerHeight', 800);
    page();
    await scrolledTo(2000);
    await screen.findByRole('button', { name: /^Buscar/ });
    await scrolledTo(100);
    await waitFor(() =>
      expect(screen.queryByRole('button', { name: /^Buscar/ })).toBeNull(),
    );
  });

  it('stays off the forge pages, which use the bottom edge', async () => {
    vi.stubGlobal('innerHeight', 800);
    page('/forja-de-armas');
    await scrolledTo(2000);
    expect(screen.queryByRole('button', { name: /^Buscar/ })).toBeNull();
  });
});

describe('EntryBody section ids', () => {
  it('gives each secondary heading the id of the index', () => {
    const client = new QueryClient();
    render(
      <QueryClientProvider client={client}>
        <MemoryRouter>
          <EntryBody
            body={
              '## Os três Traços\n\ntexto\n\n### Fundo\n\n## Os três Traços\n'
            }
            index={new Map()}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const h2 = screen.getAllByRole('heading', { level: 2 });
    expect(h2.map((h) => h.id)).toEqual(['os-tres-tracos', 'os-tres-tracos-2']);
    expect(screen.getByRole('heading', { level: 3 }).id).toBe('');
  });
});
