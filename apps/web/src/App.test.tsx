import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
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
  it('holds the guides\' place while they load, so the page below does not jump', async () => {
    mockApi();
    renderAt('/');
    const guides = screen.getByRole('region', { name: 'Por onde começar' });
    expect(within(guides).getByRole('status', { name: 'Carregando' })).toBeInTheDocument();
    expect(await within(guides).findByRole('link', { name: /criar um personagem/i })).toBeInTheDocument();
    expect(within(guides).queryByRole('status')).toBeNull();
  });

  it('shows no counts when the list could not load, never "0 entradas"', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500, json: async () => ({}) }));
    renderAt('/');
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    const types = screen.getByRole('region', { name: 'Navegar por tipo' });
    expect(within(types).getByRole('link', { name: /regras/i })).toHaveAttribute('href', '/regras');
    expect(within(types).queryByText(/entradas?$/)).toBeNull();
  });

  it('leaves out a recent entry that the index no longer has', async () => {
    localStorage.setItem(
      'codice-recentes',
      JSON.stringify([
        { slug: 'raio', name: 'Raio', type: 'spell' },
        { slug: 'foi-removido', name: 'Foi removido', type: 'rule' },
      ]),
    );
    mockApi();
    renderAt('/');
    const recents = within(screen.getByRole('navigation', { name: 'Vistos recentemente' }));
    await waitFor(() => expect(recents.queryByRole('link', { name: 'Foi removido' })).toBeNull());
    expect(recents.getByRole('link', { name: 'Raio' })).toBeInTheDocument();
    localStorage.clear();
  });

  it('lists what the Reader opened last under the search box, and puts the types before the tools', async () => {
    localStorage.setItem(
      'codice-recentes',
      JSON.stringify([{ slug: 'raio', name: 'Raio', type: 'spell' }]),
    );
    mockApi();
    renderAt('/');
    const recents = within(screen.getByRole('navigation', { name: 'Vistos recentemente' }));
    expect(recents.getByRole('link', { name: 'Raio' })).toHaveAttribute('href', '/feiticos/raio');
    const types = screen.getByRole('region', { name: 'Navegar por tipo' });
    const tools = screen.getByRole('region', { name: 'Ferramentas' });
    expect(types.compareDocumentPosition(tools) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    localStorage.clear();
  });

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
    expect(await within(grid).findByRole('link', { name: /regras.*10 entradas/i }))
      .toHaveAttribute('href', '/regras');
    expect(within(grid).getByRole('link', { name: /classes.*1 entrada\b/i })).toBeInTheDocument();
  });

  it('keeps "Navegar por tipo" compact: a line only for the names that do not explain themselves', async () => {
    mockApi();
    renderAt('/');
    const types = screen.getByRole('region', { name: 'Navegar por tipo' });
    await within(types).findByRole('link', { name: /regras.*10 entradas/i });
    const withLine = ['Regras', 'Poderes Heroicos', 'Peculiaridades'];
    for (const name of withLine) {
      const link = within(types).getByRole('link', { name: new RegExp(`^${name}`) });
      expect(link.querySelectorAll(':scope > span')).toHaveLength(2);
    }
    const classes = within(types).getByRole('link', { name: /^classes/i });
    expect(classes.querySelectorAll(':scope > span')).toHaveLength(1);
    expect(within(types).queryByText(/as classes do livro/i)).toBeNull();
    expect(within(types).queryByText(/armas, armaduras/i)).toBeNull();
  });

  it('has a skip link and no longer lists every Class in the sidebar', async () => {
    mockApi();
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Navegação principal' });
    await within(nav).findByRole('button', { name: 'Criação de Personagem' });
    expect(within(nav).queryByRole('link', { name: 'Elementalista' })).toBeNull();
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
  it('indexes the sections of a long entry in a closed "Nesta página" disclosure', async () => {
    mockApi();
    renderAt('/regras/tracos');
    const summary = await screen.findByText('Nesta página', { selector: 'summary' });
    const details = summary.closest('details') as HTMLElement;
    expect(details).not.toHaveAttribute('open');
    expect(summary).toHaveTextContent('4 seções');
    const links = within(details).getAllByRole('link', { hidden: true });
    expect(links.map((l) => l.getAttribute('href'))).toEqual([
      '#os-tres-tracos',
      '#identidade',
      '#tema',
      '#origem',
    ]);
    for (const link of links) {
      const id = link.getAttribute('href')!.slice(1);
      expect(document.getElementById(id)).toHaveProperty('tagName', 'H2');
    }
  });

  it('indexes a Class page in the same closed disclosure, with counts, above the Siglas', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const summary = await screen.findByText('Nesta página', { selector: 'summary' });
    const details = summary.closest('details') as HTMLElement;
    expect(details).not.toHaveAttribute('open');
    const links = within(details).getAllByRole('link', { hidden: true });
    expect(links.map((l) => l.getAttribute('href'))).toEqual([
      '#beneficios',
      '#poderes',
      '#feiticos',
      '#poderes-heroicos',
    ]);
    expect(links[1]).toHaveTextContent('Poderes1');
    const siglas = screen.queryByText(/^Siglas nesta página/, { selector: 'summary' });
    if (siglas) {
      expect(
        details.compareDocumentPosition(siglas.closest('details') as HTMLElement) &
          Node.DOCUMENT_POSITION_FOLLOWING,
      ).toBeTruthy();
    }
  });

  it('narrows the column of a prose entry, and keeps the full one for a Class', async () => {
    mockApi();
    const { unmount } = renderAt('/regras/tracos');
    const article = (await screen.findByRole('heading', { level: 1, name: 'Traços' })).closest('article')!;
    expect(article.className).toContain('max-w-[34rem]');
    unmount();
    renderAt('/classes/elementalista');
    const wide = (await screen.findByRole('heading', { level: 1, name: 'Elementalista' })).closest('article')!;
    expect(wide.className).not.toContain('max-w-[34rem]');
  });

  it('does not index a short entry', async () => {
    mockApi();
    renderAt('/regras/como-lancar-um-feitico');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.queryByText('Nesta página', { selector: 'summary' })).toBeNull();
  });

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
    expect(steps.map((h) => h.textContent)).toEqual(['Identidade', 'Tema', 'Classes']);
    expect((await screen.findAllByRole('link', { name: /traços/i }))[0]).toHaveAttribute('href', '/regras/tracos');
  });

  it('shows an entry in full once, then only a link back from later steps', async () => {
    mockApi();
    renderAt('/guias/criar-um-personagem');
    const main = within(await screen.findByRole('main'));
    await main.findAllByRole('link', { name: /traços/i });

    // The full result row (with its Summary) appears once, in step 1.
    expect(main.getAllByText(/Todo personagem tem três Traços/i)).toHaveLength(1);
    // Step 2 only points back to it.
    const back = main.getByText('Ver de novo:').parentElement!;
    expect(within(back).getByRole('link', { name: 'Traços' })).toHaveAttribute('href', '/regras/tracos');
    expect(within(back).getByRole('link', { name: 'passo 1' })).toHaveAttribute('href', '#passo-1');
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
    await waitFor(() => expect(screen.getByText(/^1 resultado para/)).toHaveTextContent('“raio”'));
    expect(screen.getByRole('button', { name: /feitiços/i })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('link', { name: /raio/i }).length).toBeGreaterThan(0);
  });

  it('offers only the types that have results, plus Todos', async () => {
    mockApi();
    renderAt('/buscar?q=raio');
    await screen.findByText(/resultados? para “raio”/);
    const chips = within(screen.getByRole('group', { name: 'Filtrar por tipo' })).getAllByRole('button');
    expect(chips[0]).toHaveTextContent(/^Todos/);
    expect(chips.length).toBeGreaterThan(1);
    // Every other chip leads somewhere: none reads 0.
    for (const chip of chips.slice(1)) expect(chip.textContent).not.toMatch(/\b0$/);
    // Types the fixtures have nothing for are not offered at all.
    expect(screen.queryByRole('button', { name: /^Guias/ })).toBeNull();
  });

  it('says what a chip count counts, for a screen reader', async () => {
    mockApi();
    renderAt('/buscar?q=raio');
    await screen.findByText(/resultados? para “raio”/);
    const spells = await screen.findByRole('button', { name: /^Feitiços/ });
    // "Feitiços, 1 resultado", not "Feitiços 1".
    expect(spells).toHaveAccessibleName(/^Feitiços\s*, \d+ resultados?$/);
  });

  it('does not repeat a zero count above the empty message', async () => {
    mockApi();
    renderAt('/buscar?q=zzzz');
    const message = await screen.findByText(/nenhuma entrada encontrada para “zzzz”/i);
    expect(message).toHaveAttribute('role', 'status');
    expect(screen.queryByText(/^0 resultados/)).toBeNull();
  });

  it('leaves out the type filter when nothing matches at all', async () => {
    mockApi();
    renderAt('/buscar?q=zzzz');
    await screen.findByText(/nenhuma entrada encontrada para “zzzz”/i);
    expect(screen.queryByRole('group', { name: 'Filtrar por tipo' })).toBeNull();
  });

  it('includes Poderes Heroicos among the types', async () => {
    mockApi();
    renderAt('/buscar?q=poderoso');
    expect(await screen.findByRole('button', { name: /^Poderes Heroicos/ })).toBeInTheDocument();
  });

  it('ignores accents in the query', async () => {
    const fetchMock = mockApi();
    renderAt('/buscar?q=traco');
    expect(await screen.findByText(/^1 resultado para/)).toBeInTheDocument();
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

  it('offers the types, and what was opened last, when there is no query', () => {
    localStorage.setItem(
      'codice-recentes',
      JSON.stringify([{ slug: 'raio', name: 'Raio', type: 'spell' }]),
    );
    mockApi();
    renderAt('/buscar');
    const recents = within(screen.getByRole('navigation', { name: 'Vistos recentemente' }));
    expect(recents.getByRole('link', { name: 'Raio' })).toHaveAttribute('href', '/feiticos/raio');
    const types = within(screen.getByRole('navigation', { name: 'Tipos de entrada' }));
    expect(types.getByRole('link', { name: 'Regras' })).toHaveAttribute('href', '/regras');
    localStorage.clear();
  });

  it('shows no recents box on a first visit', () => {
    localStorage.clear();
    mockApi();
    renderAt('/buscar');
    expect(screen.queryByRole('navigation', { name: 'Vistos recentemente' })).toBeNull();
    expect(screen.getByRole('navigation', { name: 'Tipos de entrada' })).toBeInTheDocument();
  });

  it('leads out of an empty result to the types', async () => {
    mockApi();
    renderAt('/buscar?q=zzzz');
    await screen.findByText(/nenhuma entrada encontrada para “zzzz”/i);
    const types = within(screen.getByRole('navigation', { name: 'Tipos de entrada' }));
    expect(types.getByRole('link', { name: 'Feitiços' })).toHaveAttribute('href', '/feiticos');
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

const menu = () => screen.getByRole('navigation', { name: 'Navegação principal' });

describe('Sidebar groups', () => {
  it('lists the groups alphabetically, collapsed, with Regras as a plain link', async () => {
    mockApi();
    renderAt('/');
    const nav = within(menu());
    const headers = await nav.findAllByRole('button', { expanded: false });
    expect(headers.map((h) => h.textContent)).toEqual([
      'Bestiário',
      'Criação de Personagem',
      'Equipamento',
      'Ferramentas',
    ]);
    expect(nav.getByRole('link', { name: /^Regras/ })).toHaveAttribute('href', '/regras');
    expect(nav.queryByRole('link', { name: /^Classes/ })).toBeNull();
  });

  it('expands a group to its type lists, in alphabetical order, with counts', async () => {
    mockApi();
    renderAt('/');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Criação de Personagem' }));
    const links = within(
      nav.getByRole('button', { name: 'Criação de Personagem' }).nextElementSibling as HTMLElement,
    ).getAllByRole('link');
    expect(links.map((l) => l.textContent)).toEqual([
      'Classes1',
      'Feitiços2',
      'Peculiaridades0',
      'Poderes1',
      'Poderes Heroicos2',
    ]);
    expect(links[2]).toHaveAttribute('href', '/peculiaridades');
    expect(links[4]).toHaveAttribute('href', '/poderes-heroicos');
  });

  it('opens only the group that holds the current page on load', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const nav = within(menu());
    const header = await nav.findByRole('button', { name: 'Criação de Personagem' });
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(nav.getByRole('button', { name: 'Equipamento' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(nav.getByRole('button', { name: 'Bestiário' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(nav.getByRole('link', { name: /^Classes/ })).toHaveAttribute('aria-current', 'page');
  });

  it('lets the Reader close the current group, and opens the next group on arriving in it', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const nav = within(menu());
    const criacao = await nav.findByRole('button', { name: 'Criação de Personagem' });
    fireEvent.click(criacao);
    expect(criacao).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(nav.getByRole('link', { name: /^Regras/ }));
    expect(criacao).toHaveAttribute('aria-expanded', 'false');
    expect(nav.getByRole('button', { name: 'Equipamento' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('keeps several groups open at once', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const nav = within(menu());
    await nav.findByRole('button', { name: 'Criação de Personagem' });
    fireEvent.click(nav.getByRole('button', { name: 'Equipamento' }));
    expect(nav.getByRole('button', { name: 'Criação de Personagem' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(nav.getByRole('button', { name: 'Equipamento' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  it('links the Equipment Kinds to a filtered list and highlights the right one', async () => {
    mockApi();
    renderAt('/equipamento?item=armas');
    const nav = within(menu());
    await nav.findByRole('link', { name: /^Armas/ });
    expect(nav.getByRole('link', { name: /^Armas/ })).toHaveAttribute('href', '/equipamento?item=armas');
    expect(nav.getByRole('link', { name: /^Armas/ })).toHaveAttribute('aria-current', 'page');
    expect(nav.getByRole('link', { name: /^Todo o equipamento/ })).not.toHaveAttribute('aria-current');
    expect(nav.getByRole('link', { name: /^Escudos/ })).toHaveAttribute('href', '/equipamento?item=escudos');
  });

  it('highlights "Todo o equipamento" on the unfiltered list', async () => {
    mockApi();
    renderAt('/equipamento');
    const nav = within(menu());
    const all = await nav.findByRole('link', { name: /^Todo o equipamento/ });
    expect(all).toHaveAttribute('aria-current', 'page');
  });

  it('highlights the kind of an Equipment entry page', async () => {
    mockApi();
    renderAt('/equipamento/katana');
    const nav = within(menu());
    const armas = await nav.findByRole('link', { name: /^Armas/ });
    // The Kind of the entry is known once the index has loaded.
    await waitFor(() => expect(armas).toHaveAttribute('aria-current', 'page'));
    expect(nav.getByRole('link', { name: /^Todo o equipamento/ })).not.toHaveAttribute('aria-current');
  });
});

describe('Equipment list filter', () => {
  it('reads the kind from the URL and shows only that kind', async () => {
    mockApi();
    renderAt('/equipamento?item=escudos');
    const main = within(screen.getByRole('main'));
    expect(await main.findByRole('heading', { level: 1, name: 'Escudos' })).toBeInTheDocument();
    expect(await main.findByText('Nenhuma entrada com esses filtros.')).toBeInTheDocument();
    expect(main.queryByText('Katana')).toBeNull();
  });

  it('writes the chosen kind to the URL', async () => {
    mockApi();
    renderAt('/equipamento');
    const main = within(screen.getByRole('main'));
    expect(await main.findByText('Katana')).toBeInTheDocument();
    fireEvent.click(main.getByRole('button', { name: /^Tipo de item/ }));
    fireEvent.click(main.getByRole('checkbox', { name: /^Armas/ }));
    expect(main.getByRole('checkbox', { name: /^Armas/ })).toBeChecked();
    expect(main.getByRole('button', { name: 'Tipo de item: Armas' })).toBeInTheDocument();
    expect(main.getByText('Katana')).toBeInTheDocument();
  });

  it('does not reopen a filter panel after leaving the list and coming back', async () => {
    mockApi();
    let go: (path: string) => void = () => {};
    function Navigator() {
      const navigate = useNavigate();
      go = navigate;
      return null;
    }
    render(
      <QueryClientProvider client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}>
        <MemoryRouter initialEntries={['/equipamento']}>
          <Navigator />
          <App />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    const main = within(screen.getByRole('main'));
    expect(await main.findByText('Katana')).toBeInTheDocument();
    fireEvent.click(main.getByRole('button', { name: /^Tipo de item/ }));
    expect(main.getAllByRole('checkbox').length).toBeGreaterThan(0);

    act(() => go('/classes'));
    await main.findByRole('heading', { level: 1, name: /Classes/ });
    act(() => go('/equipamento'));
    expect(await main.findByText('Katana')).toBeInTheDocument();
    expect(main.getByRole('button', { name: /^Tipo de item/ })).toHaveAttribute('aria-expanded', 'false');
    expect(main.queryAllByRole('checkbox')).toHaveLength(0);
  });
});

describe('Per-target spell cost', () => {
  it('says "por alvo" in text, on the list row and on the page, not in a hover title', async () => {
    mockApi();
    const { unmount } = renderAt('/feiticos');
    const row = (await screen.findByRole('link', { name: /Fulgur/ })).closest('a')!;
    expect(row).toHaveTextContent('PM 10 × A por alvo');
    expect(row.querySelector('[title]')).toBeNull();
    unmount();

    renderAt('/feiticos/fulgur');
    await screen.findByRole('heading', { level: 1, name: 'Fulgur' });
    const bar = document.querySelector('.stat-bar') as HTMLElement;
    expect(within(bar).getByText('PM').nextElementSibling).toHaveTextContent(
      '10 × A por alvo',
    );
  });
});

describe('Heroic Skills', () => {
  it('lists them with their requirements and filters by whether a Class is needed', async () => {
    mockApi();
    renderAt('/poderes-heroicos');
    const main = within(screen.getByRole('main'));
    expect(await main.findByText('Feitiço Poderoso')).toBeInTheDocument();
    expect(main.getByText('Dominar Elementalista · Também exige: Raio')).toBeInTheDocument();
    expect(main.getByText('Disponível a todos os personagens')).toBeInTheDocument();

    fireEvent.click(main.getByRole('button', { name: /^Requisito/ }));
    fireEvent.click(main.getByRole('checkbox', { name: /^Disponíveis a todos/ }));
    expect(main.getByText('PV Extras')).toBeInTheDocument();
    expect(main.queryByText('Feitiço Poderoso')).toBeNull();

    // Options in one filter are OR: both on shows both; turn the first off to narrow.
    fireEvent.click(main.getByRole('checkbox', { name: /^Exigem classe/ }));
    expect(main.getByText('Feitiço Poderoso')).toBeInTheDocument();
    expect(main.getByText('PV Extras')).toBeInTheDocument();
    fireEvent.click(main.getByRole('checkbox', { name: /^Disponíveis a todos/ }));
    expect(main.getByText('Feitiço Poderoso')).toBeInTheDocument();
    expect(main.queryByText('PV Extras')).toBeNull();

    fireEvent.click(main.getByRole('button', { name: 'Limpar filtros' }));
    expect(main.getByText('PV Extras')).toBeInTheDocument();
  });

  it('shows the requirements on the entry page with links to the Class and the Spell', async () => {
    mockApi();
    renderAt('/poderes-heroicos/feitico-poderoso');
    const main = within(screen.getByRole('main'));
    const stat = (await main.findByText('Requisitos')).closest('div') as HTMLElement;
    expect(within(stat).getByRole('link', { name: 'Elementalista' })).toHaveAttribute(
      'href',
      '/classes/elementalista',
    );
    expect(within(stat).getByRole('link', { name: 'Raio' })).toHaveAttribute('href', '/feiticos/raio');
  });

  it('is listed on a Class page that it requires', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const main = within(screen.getByRole('main'));
    const section = await main.findByRole('region', {
      name: 'Poderes Heroicos que exigem esta classe',
    });
    expect(within(section).getByRole('link', { name: 'Feitiço Poderoso' })).toHaveAttribute(
      'href',
      '/poderes-heroicos/feitico-poderoso',
    );
    expect(within(section).queryByText('PV Extras')).toBeNull();
  });
});

describe('Peculiarities', () => {
  it('lists them in the Criação de Personagem menu and filters the list by book', async () => {
    mockApi({ peculiarities: true });
    renderAt('/peculiaridades');
    const main = within(screen.getByRole('main'));
    expect(await main.findByText('Grilhões do Coração')).toBeInTheDocument();
    expect(main.getByText('Voo')).toBeInTheDocument();
    expect(main.getByRole('button', { name: /^Livro/ })).toBeInTheDocument();
    expect(main.queryByRole('button', { name: /^Classe/ })).toBeNull();
    const nav = within(menu());
    expect(nav.getByRole('link', { name: /^Peculiaridades/ })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('shows the requirement on the entry page', async () => {
    mockApi({ peculiarities: true });
    renderAt('/peculiaridades/grilhoes-do-coracao');
    const main = within(screen.getByRole('main'));
    const stat = (await main.findByText('Requisito')).closest('div') as HTMLElement;
    expect(within(stat).getByText('Só com o Tema Dúvida; o Tema não pode mudar.')).toBeInTheDocument();
  });

  it('shows no requirement for a Peculiarity open to everyone', async () => {
    mockApi({ peculiarities: true });
    renderAt('/peculiaridades/voo');
    const main = within(screen.getByRole('main'));
    expect(await main.findByRole('heading', { name: 'Voo' })).toBeInTheDocument();
    expect(main.queryByText('Requisito')).toBeNull();
  });
});

describe('Siglas legend', () => {
  it('names the abbreviations a page uses, in the book\'s terms', async () => {
    mockApi();
    renderAt('/feiticos/raio');
    const summary = await screen.findByText('Siglas nesta página');
    // The one line already says which: here only the check formula's RA.
    expect(summary.parentElement).toHaveTextContent('RA');
    const legend = summary.closest('details')!;
    expect(legend).not.toHaveAttribute('open');
    expect(within(legend).getByText('rolagem alta')).toBeInTheDocument();
  });

  it('reads the Class page benefits and its Skills too', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const summary = await screen.findByText('Siglas nesta página');
    expect(summary.parentElement).toHaveTextContent(/PM/);
    expect(within(summary.closest('details')!).getByText('Pontos de Mana')).toBeInTheDocument();
  });

  it('is absent when a page uses none', async () => {
    mockApi();
    renderAt('/regras/tracos');
    await screen.findByRole('heading', { level: 1, name: 'Traços' });
    expect(screen.queryByText('Siglas nesta página')).toBeNull();
  });
});

describe('Empty states offer the way out', () => {
  it('lets a filtered list be cleared from the message itself', async () => {
    mockApi();
    renderAt('/equipamento?item=escudos');
    const main = within(screen.getByRole('main'));
    expect(await main.findByText(/Nenhuma entrada com esses filtros/)).toBeInTheDocument();
    fireEvent.click(main.getByRole('button', { name: 'Limpar filtros' }));
    expect(await main.findByText('Katana')).toBeInTheDocument();
  });

  it('offers to search every type when a type filter hides all results', async () => {
    mockApi();
    renderAt('/buscar?q=traco&tipo=feiticos');
    fireEvent.click(await screen.findByRole('button', { name: 'Buscar em todos os tipos' }));
    expect(await screen.findByText(/^1 resultado para/)).toBeInTheDocument();
  });
});

describe('Equipment sort and maximum price', () => {
  const order = (main: ReturnType<typeof within>): (string | undefined)[] =>
    main.getAllByRole('link', { name: /^(Katana|Anel de Prata)/ }).map((a: HTMLElement) => a.textContent?.slice(0, 5));

  it('sorts by name by default and by price on request, keeping it in the URL', async () => {
    mockApi();
    renderAt('/equipamento');
    const main = within(screen.getByRole('main'));
    await main.findByText('Katana');
    expect(order(main)).toEqual(['Anel ', 'Katan']);

    // Sort and price share one button and one panel, closed until asked.
    expect(main.queryByLabelText('Ordenar por')).toBeNull();
    const button = main.getByRole('button', { name: /^Ordenar e preço/ });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');

    fireEvent.change(main.getByLabelText('Ordenar por'), { target: { value: 'preco-desc' } });
    await waitFor(() => expect(order(main)).toEqual(['Katan', 'Anel ']));
    expect(button).toHaveTextContent('Ordenar e preço: 1');
    expect(button).toHaveAttribute('data-active', 'true');
    fireEvent.change(main.getByLabelText('Ordenar por'), { target: { value: 'nome-asc' } });
    await waitFor(() => expect(order(main)).toEqual(['Anel ', 'Katan']));
    expect(button).not.toHaveTextContent(': 1');
  });

  it('hides what costs more than the maximum and clears with the filters', async () => {
    mockApi();
    renderAt('/equipamento?ate=150');
    const main = within(screen.getByRole('main'));
    expect(await main.findByText('Anel de Prata')).toBeInTheDocument();
    expect(main.queryByText('Katana')).toBeNull();
    fireEvent.click(main.getByRole('button', { name: /^Ordenar e preço: 1/ }));
    expect(main.getByLabelText(/Preço máximo/)).toHaveValue(150);

    fireEvent.click(main.getByRole('button', { name: 'Limpar filtros' }));
    expect(await main.findByText('Katana')).toBeInTheDocument();
    expect(main.getByLabelText(/Preço máximo/)).toHaveValue(null);
  });

  it('does not offer "Limpar filtros" for the kind alone, and keeps the kind when clearing', async () => {
    mockApi();
    renderAt('/equipamento?item=armas');
    const main = within(screen.getByRole('main'));
    await main.findByText('Katana');
    expect(main.queryByRole('button', { name: 'Limpar filtros' })).toBeNull();

    fireEvent.click(main.getByRole('button', { name: /^Ordenar e preço/ }));
    fireEvent.change(main.getByLabelText(/Preço máximo/), { target: { value: '99999' } });
    fireEvent.click(await main.findByRole('button', { name: 'Limpar filtros' }));
    expect(await main.findByText('Katana')).toBeInTheDocument();
    expect(main.getByRole('heading', { level: 1, name: 'Armas' })).toBeInTheDocument();
  });

  it('is not offered on other lists', async () => {
    mockApi();
    renderAt('/feiticos');
    const main = within(screen.getByRole('main'));
    await main.findByText(/Raio/);
    expect(main.queryByLabelText('Ordenar por')).toBeNull();
    expect(main.queryByRole('button', { name: /^Ordenar e preço/ })).toBeNull();
  });
});

describe('Skill and Spell rows show what identifies them', () => {
  it('names the Class and the PM cost on a Spell row', async () => {
    mockApi();
    renderAt('/feiticos');
    const row = (await screen.findByRole('link', { name: /raio/i })).closest('a')!;
    await waitFor(() => expect(row).toHaveTextContent('Elementalista · PM 20 · ver Livro Básico'));
  });

  it('names the Class on a Skill row', async () => {
    mockApi();
    renderAt('/poderes');
    const row = (await screen.findByRole('link', { name: /magia elemental/i })).closest('a')!;
    await waitFor(() => expect(row).toHaveTextContent('Elementalista · ver Livro Básico'));
    expect(row).not.toHaveTextContent('PM');
  });

  it('leaves other types with just the book reference', async () => {
    mockApi();
    renderAt('/regras');
    const row = (await screen.findAllByRole('link', { name: /traços/i })).find((a) =>
      a.classList.contains('result-row'),
    )!;
    expect(row).not.toHaveTextContent('·');
  });

  it('puts an overview of the Rules above the /regras list, linking each Rule', async () => {
    mockApi();
    renderAt('/regras');
    const overview = await screen.findByRole('region', { name: /Visão geral das regras/ });
    expect(within(overview).getByRole('heading', { name: 'Semáforo' })).toBeInTheDocument();
    expect(within(overview).getByRole('link', { name: 'Traços' })).toHaveAttribute(
      'href',
      '/regras/tracos',
    );
  });
});


describe('Services and transports', () => {
  it('adds one "Serviços e transporte" link to the Equipamento group, counting both lists', async () => {
    mockApi();
    renderAt('/equipamento');
    const nav = within(menu());
    const link = await nav.findByRole('link', { name: /^Serviços e transporte/ });
    expect(link).toHaveAttribute('href', '/servicos');
    await waitFor(() => expect(link).toHaveTextContent('4'));
    expect(link).not.toHaveAttribute('aria-current');
  });

  it('marks that link on the service list and on a Transport page', async () => {
    mockApi();
    renderAt('/transportes/montaria-terrestre');
    const nav = within(menu());
    const link = await nav.findByRole('link', { name: /^Serviços e transporte/ });
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('lists Services with a switch to Transports at the top of both lists', async () => {
    mockApi();
    renderAt('/servicos');
    const main = within(screen.getByRole('main'));
    expect(await main.findByRole('heading', { level: 1, name: 'Serviços' })).toBeInTheDocument();
    expect(await main.findByText('Viagem aérea')).toBeInTheDocument();
    expect(main.getByText('Descanso (vila)')).toBeInTheDocument();
    expect(main.queryByText('Montaria terrestre')).toBeNull();

    const switcher = main.getByRole('navigation', { name: 'Serviços e transporte' });
    expect(within(switcher).getByRole('link', { name: /^Serviços/ })).toHaveAttribute(
      'aria-current',
      'page',
    );
    fireEvent.click(within(switcher).getByRole('link', { name: /^Transportes/ }));
    expect(await main.findByRole('heading', { level: 1, name: 'Transportes' })).toBeInTheDocument();
    expect(await main.findByText('Montaria terrestre')).toBeInTheDocument();
    expect(
      within(main.getByRole('navigation', { name: 'Serviços e transporte' })).getByRole('link', {
        name: /^Transportes/,
      }),
    ).toHaveAttribute('aria-current', 'page');
  });

  it('does not show the switch on other lists', async () => {
    mockApi();
    renderAt('/regras');
    await screen.findByRole('heading', { level: 1, name: 'Regras' });
    expect(screen.queryByRole('navigation', { name: 'Serviços e transporte' })).toBeNull();
  });

  it('shows cost and where each row goes', async () => {
    mockApi();
    renderAt('/transportes');
    const row = (await screen.findByRole('link', { name: /montaria terrestre/i })).closest('a')!;
    await waitFor(() =>
      expect(row).toHaveTextContent('Montaria · Terrestre · 200z · ver Livro Básico'),
    );
  });

  it('shows a Transport stat bar with the distance on each scale', async () => {
    mockApi();
    renderAt('/transportes/veiculo-planetario');
    await screen.findByRole('heading', { level: 1, name: 'Veículo planetário' });
    expect(screen.getByText('20.000z')).toBeInTheDocument();
    expect(screen.getByText('Cerca de 50')).toBeInTheDocument();
    expect(screen.getByText('Planetária ×4 · Interplanetária ×2 · Interestelar ×1')).toBeInTheDocument();
  });

  it('leaves out the scales a Transport cannot reach', async () => {
    mockApi();
    renderAt('/transportes/montaria-terrestre');
    await screen.findByRole('heading', { level: 1, name: 'Montaria terrestre' });
    expect(screen.getByText('Planetária ×2')).toBeInTheDocument();
    expect(screen.getByText('Até 2')).toBeInTheDocument();
  });

  it('shows a Service stat bar', async () => {
    mockApi();
    renderAt('/servicos/viagem-aerea');
    await screen.findByRole('heading', { level: 1, name: 'Viagem aérea' });
    expect(screen.getByText('40z')).toBeInTheDocument();
    expect(screen.getByText('Viagem')).toBeInTheDocument();
    expect(screen.getByText('Aéreo')).toBeInTheDocument();
  });

  it('is offered on the home page next to the other types', async () => {
    mockApi();
    renderAt('/');
    const grid = screen.getByRole('region', { name: 'Navegar por tipo' });
    expect(await within(grid).findByRole('link', { name: /serviços.*2 entradas/i })).toHaveAttribute(
      'href',
      '/servicos',
    );
    expect(within(grid).getByRole('link', { name: /transportes.*2 entradas/i })).toHaveAttribute(
      'href',
      '/transportes',
    );
  });
});

describe('Creatures', () => {
  it('shows the stat block of a Creature with its numbers and Affinities', async () => {
    mockApi();
    renderAt('/criaturas/cactonto');
    const main = within(screen.getByRole('main'));
    expect(await main.findByRole('heading', { level: 1, name: 'Cactonto' })).toBeInTheDocument();
    expect(main.getByText('ver Livro Básico, página', { exact: false })).toHaveTextContent('352');

    // The stat bar: level, Species, Rank.
    const bar = (label: string) => main.getByText(label, { selector: 'dt' }).nextElementSibling;
    expect(bar('Nível')).toHaveTextContent('15');
    expect(bar('Espécie')).toHaveTextContent('Planta');
    expect(bar('Patente')).toHaveTextContent('Soldado');
    expect(main.getByText(/assustador, enorme, sensível à água, territorial/)).toBeInTheDocument();

    // Attributes, resources and defenses as the book prints them.
    const numbers = within(main.getByRole('group', { name: 'Atributos e defesas' }));
    const cell = (label: string) =>
      numbers.getByText(label, { selector: 'dt' }).nextElementSibling?.textContent;
    expect(cell('DES')).toBe('d8');
    expect(cell('AST')).toBe('d6');
    expect(cell('VIG')).toBe('d12');
    expect(cell('VON')).toBe('d6');
    expect(cell('PV')).toBe('90');
    expect(cell('Crise')).toBe('45');
    expect(cell('PM')).toBe('55');
    expect(cell('Inic.')).toBe('7');
    expect(cell('Defesa')).toBe('+0');
    expect(cell('Def. Mágica')).toBe('+0');

    const affinities = within(main.getByRole('list', { name: 'Afinidades a dano' }));
    expect(affinities.getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'Resistente a ar',
      'Resistente a terra',
      'Resistente a fogo',
      'Vulnerável a gelo',
      'Resistente a luz',
    ]);
  });

  it('lists the attacks, spells, other actions and special rules', async () => {
    mockApi();
    renderAt('/criaturas/cactonto');
    const main = within(screen.getByRole('main'));
    await main.findByRole('heading', { level: 1, name: 'Cactonto' });

    const attacks = within(main.getByRole('region', { name: 'Ataques básicos' }));
    expect(attacks.getByText('Abraço Perfurador')).toBeInTheDocument();
    expect(attacks.getByText(/corpo a corpo/)).toBeInTheDocument();
    expect(attacks.getByText(/à distância/)).toBeInTheDocument();
    expect(attacks.getAllByText(/RA \+ 10/)[0]).toBeInTheDocument();
    expect(attacks.getAllByText(/de dano físico/)).toHaveLength(2);

    const spells = within(main.getByRole('region', { name: 'Feitiços' }));
    expect(spells.getByText('Drenar Umidade')).toBeInTheDocument();
    expect(spells.getByText('PM 10')).toBeInTheDocument();
    expect(spells.getByText('Ofensivo')).toBeInTheDocument();

    expect(within(main.getByRole('region', { name: 'Outras ações' })).getByText('Seiva de Cactonto')).toBeInTheDocument();
    expect(within(main.getByRole('region', { name: 'Regras especiais' })).getByText('Planta')).toBeInTheDocument();
  });

  it('lists Creatures in a Bestiário menu group, with a count', async () => {
    mockApi();
    renderAt('/');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Bestiário' }));
    const link = within(
      nav.getByRole('button', { name: 'Bestiário' }).nextElementSibling as HTMLElement,
    ).getByRole('link', { name: /^Criaturas/ });
    expect(link).toHaveAttribute('href', '/criaturas');
    await waitFor(() => expect(link).toHaveTextContent('Criaturas1'));
  });

  it('lists the tools in a Ferramentas group, the lab among them, current only on its page', async () => {
    mockApi();
    renderAt('/criaturas');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Ferramentas' }));
    const tools = within(
      nav.getByRole('button', { name: 'Ferramentas' }).nextElementSibling as HTMLElement,
    ).getAllByRole('link');
    expect(tools.map((l) => l.textContent)).toEqual([
      'Forja de Armaduras e Escudos',
      'Forja de Armas',
      'Laboratório Oroboros',
    ]);
    const shortcut = nav.getByRole('link', { name: 'Laboratório Oroboros' });
    expect(shortcut).toHaveAttribute('href', '/laboratorio-oroboros');
    expect(shortcut).not.toHaveAttribute('aria-current');
    expect(nav.getByRole('link', { name: /^Criaturas/ })).toHaveAttribute('aria-current', 'page');
  });

  it('marks the Laboratório Oroboros link as current on its page, and not Criaturas', async () => {
    mockApi();
    renderAt('/laboratorio-oroboros');
    const nav = within(menu());
    expect(await nav.findByRole('link', { name: 'Laboratório Oroboros' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    expect(nav.getByRole('button', { name: 'Bestiário' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('shows the three tools on Home', async () => {
    mockApi();
    renderAt('/');
    const main = within(screen.getByRole('main'));
    const section = await main.findByRole('heading', { level: 2, name: 'Ferramentas' });
    const links = within(section.parentElement as HTMLElement).getAllByRole('link');
    expect(links.map((l) => l.getAttribute('href'))).toEqual([
      '/forja-de-armaduras',
      '/forja-de-armas',
      '/laboratorio-oroboros',
    ]);
  });

  it('marks the Creatures link on the list and on a Creature page', async () => {
    mockApi();
    renderAt('/criaturas/cactonto');
    const nav = within(menu());
    expect(await nav.findByRole('link', { name: /^Criaturas/ })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('shows what identifies a Creature on its list row', async () => {
    mockApi();
    renderAt('/criaturas');
    expect(screen.getByRole('heading', { level: 1, name: 'Criaturas' })).toBeInTheDocument();
    const row = (await screen.findByRole('link', { name: /cactonto/i })).closest('a')!;
    expect(row).toHaveAttribute('href', '/criaturas/cactonto');
    expect(row).toHaveTextContent('Nível 15 · Planta · Soldado · PV 90 · ver Livro Básico, página 352');
  });
});

describe('Creature legend', () => {
  it('names the abbreviations of the stat block in the book\'s terms', async () => {
    mockApi();
    renderAt('/criaturas/cactonto');
    const summary = await screen.findByText('Siglas nesta página');
    const legend = within(summary.closest('details')!);
    expect(legend.getByText('Pontos de Vida')).toBeInTheDocument();
    expect(legend.getByText('Pontos de Mana')).toBeInTheDocument();
    expect(legend.getByText('rolagem alta')).toBeInTheDocument();
  });
});
