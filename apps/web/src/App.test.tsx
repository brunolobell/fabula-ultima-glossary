import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from './App';
import { mockApi } from './test/fixtures';

afterEach(() => vi.unstubAllGlobals());

function renderAt(path: string) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

describe('Home', () => {
  it('shows the title, the guide cards and the type grid with counts', async () => {
    mockApi();
    renderAt('/');

    expect(
      screen.getByRole('heading', { level: 1, name: 'Códice do Cristal' }),
    ).toBeInTheDocument();
    const main = within(screen.getByRole('main'));
    const guide = await main.findByRole('link', { name: /criar um personagem/i });
    expect(guide).toHaveAttribute('href', '/guias/criar-um-personagem');

    const grid = screen.getByRole('region', { name: 'Navegar por tipo' });
    expect(await within(grid).findByRole('link', { name: /regras.*2 entradas/i }))
      .toHaveAttribute('href', '/regras');
    expect(within(grid).getByRole('link', { name: /classes.*1 entrada\b/i })).toBeInTheDocument();
  });

  it('has a sidebar with the classes and a skip link', async () => {
    mockApi();
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    expect(await within(nav).findByRole('link', { name: 'Elementalista' }))
      .toHaveAttribute('href', '/classes/elementalista');
    expect(screen.getByRole('link', { name: /ir para o conteúdo/i })).toBeInTheDocument();
  });

  it('toggles the mobile menu', () => {
    mockApi();
    renderAt('/');
    const open = screen.getByRole('button', { name: 'Abrir menu' });
    expect(open).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(open);
    expect(open).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(open).toHaveAttribute('aria-expanded', 'false');
  });
});

describe('Entry page', () => {
  it('shows a Class with its benefits, Poderes and Feitiços inline', async () => {
    mockApi();
    renderAt('/classes/elementalista');

    expect(await screen.findByRole('heading', { level: 1, name: 'Elementalista' }))
      .toBeInTheDocument();
    expect(screen.getAllByText(/ver Livro Básico, página/)[0]).toHaveTextContent('186');
    expect(screen.getByRole('heading', { name: 'Benefícios iniciais' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Poderes' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Feitiços' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Magia Elemental' })).toBeInTheDocument();

    const raio = screen.getByRole('region', { name: 'Raio' });
    expect(within(raio).getByText('Ofensivo')).toBeInTheDocument();
    expect(within(raio).getByText('Uma criatura')).toBeInTheDocument();
    expect(raio.querySelector('.check')).toHaveTextContent('RA + 25');
  });

  it('resolves [[slug]] links by entry name and lists them under "Veja também"', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    await screen.findByRole('heading', { level: 1, name: 'Elementalista' });

    const links = await screen.findAllByRole('link', { name: 'Como lançar um feitiço' });
    expect(links.length).toBeGreaterThanOrEqual(2);
    links.forEach((l) => expect(l).toHaveAttribute('href', '/regras/como-lancar-um-feitico'));
    expect(screen.getByText('Veja também:')).toBeInTheDocument();
  });

  it('renders an example blockquote as the example highlight', async () => {
    mockApi();
    renderAt('/regras/como-lancar-um-feitico');
    await screen.findByRole('heading', { level: 1, name: 'Como lançar um feitiço' });
    expect(document.querySelector('.highlight-example')).toHaveTextContent('Exemplo: o Raio exige teste.');
  });

  it('shows a weapon stat bar', async () => {
    mockApi();
    renderAt('/equipamento/katana');
    await screen.findByRole('heading', { level: 1, name: 'Katana' });
    expect(screen.getByText('Duas mãos, corpo a corpo')).toBeInTheDocument();
    expect(screen.getByText('200z')).toBeInTheDocument();
    expect(screen.getByText('Marcial')).toBeInTheDocument();
  });

  it('redirects to the canonical URL when the type segment is wrong', async () => {
    mockApi();
    renderAt('/regras/elementalista');
    expect(await screen.findByRole('heading', { level: 1, name: 'Elementalista' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Classes' })).toHaveAttribute('href', '/classes');
  });

  it('says so when an entry does not exist', async () => {
    mockApi();
    renderAt('/regras/nao-existe');
    expect(await screen.findByText(/não encontramos essa entrada/i)).toBeInTheDocument();
  });

  it('shows an error with a retry button when the API fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }));
    renderAt('/regras/tracos');
    expect(await screen.findByRole('alert')).toHaveTextContent(/não foi possível carregar/i);
    expect(screen.getByRole('button', { name: /tentar de novo/i })).toBeInTheDocument();
  });
});

describe('Guide page', () => {
  it('renders ordered steps with the entries to read', async () => {
    mockApi();
    renderAt('/guias/criar-um-personagem');
    expect(await screen.findByRole('heading', { level: 1, name: 'Criar um personagem' })).toBeInTheDocument();

    const steps = within(screen.getByRole('main')).getAllByRole('heading', { level: 2 });
    expect(steps.map((h) => h.textContent)).toEqual(['Identidade', 'Classes']);
    expect(await screen.findByRole('link', { name: /traços/i })).toHaveAttribute('href', '/regras/tracos');
  });
});

describe('Type list and not found', () => {
  it('lists the entries of a type', async () => {
    mockApi();
    renderAt('/feiticos');
    expect(screen.getByRole('heading', { level: 1, name: 'Feitiços' })).toBeInTheDocument();
    expect(await screen.findByRole('link', { name: /raio/i })).toHaveAttribute('href', '/feiticos/raio');
  });

  it('shows not found for an unknown type', () => {
    mockApi();
    renderAt('/banana');
    expect(screen.getByText(/não encontramos essa página/i)).toBeInTheDocument();
  });
});

describe('Search', () => {
  it('filters by the type in the URL and reports the count', async () => {
    mockApi();
    renderAt('/buscar?q=raio&tipo=feiticos');
    await waitFor(() => expect(screen.getByText(/1 resultado/)).toHaveTextContent('“raio”'));
    expect(screen.getByRole('button', { name: /feitiços/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('link', { name: /raio/i }).length).toBeGreaterThan(0);
  });

  it('ignores accents in the query', async () => {
    const fetchMock = mockApi();
    renderAt('/buscar?q=traco');
    expect(await screen.findByText(/1 resultado/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/api/entries?search=traco');
  });

  it('explains an empty result and how to fix it', async () => {
    mockApi();
    renderAt('/buscar?q=zzzz');
    expect(await screen.findByText(/nenhuma entrada encontrada para “zzzz”/i)).toBeInTheDocument();
  });

  it('prompts when there is no query', () => {
    mockApi();
    renderAt('/buscar');
    expect(screen.getByText(/digite no campo de busca/i)).toBeInTheDocument();
  });

  it('goes to the search page when submitting from another page', async () => {
    mockApi();
    renderAt('/');
    const input = screen.getAllByRole('combobox')[0];
    fireEvent.change(input, { target: { value: 'raio' } });
    fireEvent.submit(input.closest('form')!);
    expect(await screen.findByRole('heading', { level: 1, name: 'Busca' })).toBeInTheDocument();
    expect(await screen.findByText(/resultados? para “raio”/)).toBeInTheDocument();
  });
});
