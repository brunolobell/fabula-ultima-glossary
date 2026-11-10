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
      'Bestiário',
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
      'Feitiços2',
      'Poderes1',
      'Poderes Heroicos2',
    ]);
    expect(links[3]).toHaveAttribute('href', '/poderes-heroicos');
  });

  it('keeps every group closed on load, even on a page inside one', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const nav = within(menu());
    const header = await nav.findByRole('button', { name: 'Criação de Personagem' });
    expect(header).toHaveAttribute('aria-expanded', 'false');
    expect(nav.getByRole('button', { name: 'Equipamento' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(nav.queryByRole('link', { name: /^Classes/ })).toBeNull();
  });

  it('keeps several groups open at once', async () => {
    mockApi();
    renderAt('/classes/elementalista');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Criação de Personagem' }));
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
    fireEvent.click(await nav.findByRole('button', { name: 'Equipamento' }));
    expect(nav.getByRole('link', { name: /^Armas/ })).toHaveAttribute('href', '/equipamento?item=armas');
    expect(nav.getByRole('link', { name: /^Armas/ })).toHaveAttribute('aria-current', 'page');
    expect(nav.getByRole('link', { name: /^Todo o equipamento/ })).not.toHaveAttribute('aria-current');
    expect(nav.getByRole('link', { name: /^Escudos/ })).toHaveAttribute('href', '/equipamento?item=escudos');
  });

  it('highlights "Todo o equipamento" on the unfiltered list', async () => {
    mockApi();
    renderAt('/equipamento');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Equipamento' }));
    const all = nav.getByRole('link', { name: /^Todo o equipamento/ });
    expect(all).toHaveAttribute('aria-current', 'page');
  });

  it('highlights the kind of an Equipment entry page', async () => {
    mockApi();
    renderAt('/equipamento/katana');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Equipamento' }));
    const armas = nav.getByRole('link', { name: /^Armas/ });
    expect(armas).toHaveAttribute('aria-current', 'page');
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


describe('Services and transports', () => {
  it('adds one "Serviços e transporte" link to the Equipamento group, counting both lists', async () => {
    mockApi();
    renderAt('/equipamento');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Equipamento' }));
    const link = nav.getByRole('link', { name: /^Serviços e transporte/ });
    expect(link).toHaveAttribute('href', '/servicos');
    await waitFor(() => expect(link).toHaveTextContent('4'));
    expect(link).not.toHaveAttribute('aria-current');
  });

  it('marks that link on the service list and on a Transport page', async () => {
    mockApi();
    renderAt('/transportes/montaria-terrestre');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Equipamento' }));
    const link = nav.getByRole('link', { name: /^Serviços e transporte/ });
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

  it('adds a "Laboratório Oroboros" shortcut that opens the Assembler and is never the current page', async () => {
    mockApi();
    renderAt('/criaturas');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Bestiário' }));
    const shortcut = nav.getByRole('link', { name: 'Laboratório Oroboros' });
    expect(shortcut).toHaveAttribute('href', '/criaturas?montagem=rapida');
    expect(shortcut).not.toHaveAttribute('aria-current');
    expect(nav.getByRole('link', { name: /^Criaturas/ })).toHaveAttribute('aria-current', 'page');
  });

  it('marks the Creatures link on the list and on a Creature page', async () => {
    mockApi();
    renderAt('/criaturas/cactonto');
    const nav = within(menu());
    fireEvent.click(await nav.findByRole('button', { name: 'Bestiário' }));
    expect(nav.getByRole('link', { name: /^Criaturas/ })).toHaveAttribute('aria-current', 'page');
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
