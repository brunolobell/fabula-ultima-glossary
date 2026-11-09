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
    await waitFor(() => expect(screen.getByText(/1 resultado/)).toHaveTextContent('“raio”'));
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

  it('includes Poderes Heroicos among the types', async () => {
    mockApi();
    renderAt('/buscar?q=poderoso');
    expect(await screen.findByRole('button', { name: /^Poderes Heroicos/ })).toBeInTheDocument();
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

const menu = () => screen.getByRole('navigation', { name: 'Navegação principal' });

describe('Sidebar groups', () => {
  it('lists the groups alphabetically, collapsed, with Regras as a plain link', async () => {
    mockApi();
    renderAt('/');
    const nav = within(menu());
    const headers = await nav.findAllByRole('button', { expanded: false });
    expect(headers.map((h) => h.textContent)).toEqual([
      'Criação de Personagem',
      'Equipamento',
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
      'Feitiços1',
      'Poderes1',
      'Poderes Heroicos2',
    ]);
    expect(links[3]).toHaveAttribute('href', '/poderes-heroicos');
  });

  it('opens the group of the current page by itself and marks the item', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const nav = within(menu());
    const header = await nav.findByRole('button', { name: 'Criação de Personagem' });
    await waitFor(() => expect(header).toHaveAttribute('aria-expanded', 'true'));
    expect(nav.getByRole('link', { name: /^Classes/ })).toHaveAttribute('aria-current', 'page');
    expect(nav.getByRole('button', { name: 'Equipamento' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('keeps several groups open at once', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Equipamento' }));
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
    await waitFor(() =>
      expect(nav.getByRole('button', { name: 'Equipamento' })).toHaveAttribute(
        'aria-expanded',
        'true',
      ),
    );
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
    fireEvent.click(main.getByRole('button', { name: /^Armas/ }));
    expect(main.getByRole('button', { name: /^Armas/ })).toHaveAttribute('aria-pressed', 'true');
    expect(main.getByText('Katana')).toBeInTheDocument();
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

    fireEvent.click(main.getByRole('button', { name: /^Disponíveis a todos/ }));
    expect(main.getByText('PV Extras')).toBeInTheDocument();
    expect(main.queryByText('Feitiço Poderoso')).toBeNull();

    // Chips in one row are OR: both on shows both; turn the first off to narrow.
    fireEvent.click(main.getByRole('button', { name: /^Exigem classe/ }));
    expect(main.getByText('Feitiço Poderoso')).toBeInTheDocument();
    expect(main.getByText('PV Extras')).toBeInTheDocument();
    fireEvent.click(main.getByRole('button', { name: /^Disponíveis a todos/ }));
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
    expect(await screen.findByText(/1 resultado/)).toBeInTheDocument();
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
    const row = (await screen.findByRole('link', { name: /traços/i })).closest('a')!;
    expect(row).not.toHaveTextContent('·');
  });
});

