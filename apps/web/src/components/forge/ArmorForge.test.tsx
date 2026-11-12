import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { rareArmorRules } from '../../../../api/src/database/seed-data/armor-forge-data';
import { armadurasEscudosBasicos } from '../../../../api/src/database/seed-data/equipment/armaduras-escudos-basicos';
import { armasBasicas } from '../../../../api/src/database/seed-data/equipment/armas-basicas';
import { slugify } from '../../../../api/src/entries/slug';
import { App } from '../../App';

afterEach(() => vi.unstubAllGlobals());

const summary = (e: { name: string; type: string; details: unknown }) => ({
  id: slugify(e.name),
  slug: slugify(e.name),
  name: e.name,
  type: e.type,
  summary: '',
  source: 'livro-basico',
  page: 1,
  tags: [],
  details: e.details,
});

const ENTRIES = [
  ...armasBasicas.map(summary),
  ...armadurasEscudosBasicos.map(summary),
  summary({
    name: 'Criar armaduras e escudos raros',
    type: 'rule',
    details: rareArmorRules,
  }),
];

function renderAt(path: string) {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => ({ ok: true, status: 200, json: async () => ENTRIES })),
  );
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

const NAME = 'Forja de Armaduras e Escudos';

const openForge = async (path = '/forja-de-armaduras') => {
  renderAt(path);
  await screen.findByRole('heading', { level: 1, name: NAME });
  return screen.getByRole('main');
};

const result = (dialog: HTMLElement) =>
  within(dialog).getByRole('region', { name: 'Resultado' });

describe('Armor Forge page', () => {
  it('is linked from the armors and shields lists', async () => {
    const { unmount } = renderAt('/equipamento?item=armaduras');
    const link = await screen.findByRole('link', {
      name: 'Forjar armadura ou escudo',
    });
    expect(link).toHaveAttribute('href', '/forja-de-armaduras');
    unmount();
    renderAt('/equipamento?item=escudos');
    expect(
      await screen.findByRole('link', { name: 'Forjar armadura ou escudo' }),
    ).toBeInTheDocument();
  });

  it('is absent from the weapons list and the full equipment list', async () => {
    const { unmount } = renderAt('/equipamento?item=armas');
    await screen.findByRole('link', { name: /Machado de guerra/ });
    expect(
      screen.queryByRole('link', { name: 'Forjar armadura ou escudo' }),
    ).toBeNull();
    unmount();
    renderAt('/equipamento');
    await screen.findByRole('link', { name: /Machado de guerra/ });
    expect(
      screen.queryByRole('link', { name: 'Forjar armadura ou escudo' }),
    ).toBeNull();
  });

  it('sends the old modal links to the page, for armors and shields', async () => {
    const { unmount } = renderAt('/equipamento?item=escudos&forja=rara');
    expect(
      await screen.findByRole('heading', { level: 1, name: NAME }),
    ).toBeInTheDocument();
    unmount();
    renderAt('/equipamento?item=armaduras&forja=rara');
    expect(
      await screen.findByRole('heading', { level: 1, name: NAME }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 1, name: 'Forja de Armas' }),
    ).toBeNull();
  });

  it('says the draft is not saved, and Recomeçar clears it', async () => {
    const page = await openForge();
    expect(
      within(page).getByText(/Nada é salvo; o rascunho some ao recarregar/),
    ).toBeInTheDocument();
    fireEvent.click(within(page).getByRole('radio', { name: /^Brigantina/ }));
    fireEvent.click(within(page).getByRole('button', { name: 'Recomeçar' }));
    expect(
      within(page).getByRole('radio', { name: /^Brigantina/ }),
    ).not.toBeChecked();
  });

  it('keeps the draft when the Reader leaves the page and comes back', async () => {
    const page = await openForge();
    fireEvent.click(within(page).getByRole('radio', { name: /^Brigantina/ }));
    const nav = within(screen.getByRole('navigation', { name: 'Navegação principal' }));
    fireEvent.click(nav.getByRole('link', { name: 'Início' }));
    await screen.findByRole('heading', { level: 2, name: 'Ferramentas' });
    fireEvent.click(
      within(screen.getByRole('main')).getByRole('link', {
        name: /^Forja de Armaduras e Escudos/,
      }),
    );
    await screen.findByRole('heading', { level: 1, name: NAME });
    expect(
      within(screen.getByRole('main')).getByRole('radio', {
        name: /^Brigantina/,
      }),
    ).toBeChecked();
  });
});

describe('Armor Forge build', () => {
  it('lists armors and shields together and asks for a base first', async () => {
    const dialog = await openForge();
    expect(
      within(dialog).getByRole('radio', { name: /^Túnica de combate/ }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole('radio', { name: /^Escudo de bronze/ }),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText(/Escolha uma armadura ou um escudo básico/),
    ).toBeInTheDocument();
    expect(within(dialog).queryByText('Mais Iniciativa')).toBeNull();
  });

  it('builds the Túnica Sombria: 650z, Iniciativa +4', async () => {
    const dialog = await openForge();
    fireEvent.click(
      within(dialog).getByRole('radio', { name: /^Túnica de combate/ }),
    );
    expect(
      within(result(dialog)).getByText('Escolha uma característica.'),
    ).toBeInTheDocument();
    fireEvent.click(
      within(dialog).getByRole('radio', { name: /^Mais Iniciativa/ }),
    );
    const card = result(dialog);
    expect(
      within(card).getByText('Iniciativa +4.', { exact: false }),
    ).toBeInTheDocument();
    expect(within(card).getByText(/já contabilizado/)).toBeInTheDocument();
    expect(card.textContent).toContain('650z');
    expect(within(card).queryByText('Escolha uma característica.')).toBeNull();
  });

  it('builds Égide, Ignis from a shield: 800z', async () => {
    const dialog = await openForge();
    fireEvent.click(
      within(dialog).getByRole('radio', { name: /^Escudo de bronze/ }),
    );
    fireEvent.click(
      within(dialog).getByRole('radio', { name: /^Resistência/ }),
    );
    const card = result(dialog);
    expect(card.textContent).toContain('Escudo raro.');
    expect(
      within(card).getByText('Custo total').parentElement?.textContent,
    ).toContain('800z');
  });

  it('prices a custom effect and asks for its description', async () => {
    const dialog = await openForge();
    fireEvent.click(within(dialog).getByRole('radio', { name: /^Brigantina/ }));
    fireEvent.click(
      within(dialog).getByRole('radio', { name: /^Efeito personalizado/ }),
    );
    expect(
      within(result(dialog)).getByText('Descreva o efeito personalizado.'),
    ).toBeInTheDocument();
    fireEvent.change(within(dialog).getByLabelText('Efeito'), {
      target: { value: 'Brilha no escuro.' },
    });
    fireEvent.change(within(dialog).getByLabelText('Custo (z)'), {
      target: { value: '300' },
    });
    expect(
      within(result(dialog)).getByText('Custo total').parentElement
        ?.textContent,
    ).toContain('450z');
  });
});
