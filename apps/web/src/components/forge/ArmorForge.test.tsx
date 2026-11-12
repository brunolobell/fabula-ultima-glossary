import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
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

const openForge = async (path = '/equipamento?item=armaduras') => {
  renderAt(path);
  if (!path.includes('forja=')) {
    fireEvent.click(
      await screen.findByRole('button', { name: 'Forjar armadura ou escudo' }),
    );
  }
  return screen.findByRole('dialog', { name: NAME });
};

const result = (dialog: HTMLElement) =>
  within(dialog).getByRole('region', { name: 'Resultado' });

describe('Armor Forge launcher', () => {
  it('is offered on the armors and shields lists, closed until asked', async () => {
    renderAt('/equipamento?item=armaduras');
    const button = await screen.findByRole('button', {
      name: 'Forjar armadura ou escudo',
    });
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(button);
    expect(
      await screen.findByRole('dialog', { name: NAME }),
    ).toBeInTheDocument();
  });

  it('is offered on the shields list too, and opens from the URL', async () => {
    renderAt('/equipamento?item=escudos&forja=rara');
    expect(
      await screen.findByRole('dialog', { name: NAME }),
    ).toBeInTheDocument();
  });

  it('is absent from the weapons list and the full equipment list', async () => {
    const { unmount } = renderAt('/equipamento?item=armas');
    await screen.findByRole('link', { name: /Machado de guerra/ });
    expect(
      screen.queryByRole('button', { name: 'Forjar armadura ou escudo' }),
    ).toBeNull();
    unmount();
    renderAt('/equipamento');
    await screen.findByRole('link', { name: /Machado de guerra/ });
    expect(
      screen.queryByRole('button', { name: 'Forjar armadura ou escudo' }),
    ).toBeNull();
  });

  it('does not open the weapon Forge on the armors list', async () => {
    renderAt('/equipamento?item=armaduras&forja=rara');
    await screen.findByRole('dialog', { name: NAME });
    expect(screen.queryByRole('dialog', { name: 'Forja de Armas' })).toBeNull();
  });

  it('closes, says nothing is saved, and Recomeçar clears the draft', async () => {
    const dialog = await openForge();
    expect(
      within(dialog).getByText(/Nada do que você montar aqui é salvo/),
    ).toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole('radio', { name: /^Brigantina/ }));
    fireEvent.click(within(dialog).getByRole('button', { name: 'Recomeçar' }));
    expect(
      within(dialog).getByRole('radio', { name: /^Brigantina/ }),
    ).not.toBeChecked();
    fireEvent.click(within(dialog).getByRole('button', { name: 'Fechar' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });
});

describe('Armor Forge build', () => {
  it('lists armors and shields together and asks for a base first', async () => {
    const dialog = await openForge('/equipamento?item=escudos');
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
    const dialog = await openForge('/equipamento?item=escudos');
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
