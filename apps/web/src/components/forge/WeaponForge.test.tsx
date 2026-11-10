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
import { armasBasicas } from '../../../../api/src/database/seed-data/equipment/armas-basicas';
import {
  customWeaponRules,
  rareWeaponRules,
} from '../../../../api/src/database/seed-data/weapon-forge-data';
import { slugify } from '../../../../api/src/entries/slug';
import { App } from '../../App';

afterEach(() => vi.unstubAllGlobals());

const summary = (
  e: { name: string; type: string; details: unknown },
  slug = slugify(e.name),
) => ({
  id: slug,
  slug,
  name: e.name,
  type: e.type,
  summary: '',
  source: 'livro-basico',
  page: 1,
  tags: [],
  details: e.details,
});

const ENTRIES = [
  ...armasBasicas.map((e) => summary(e)),
  summary({
    name: 'Armas Personalizadas',
    type: 'rule',
    details: customWeaponRules,
  }),
  summary({
    name: 'Criar armas raras',
    type: 'rule',
    details: rareWeaponRules,
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

const openForge = async (path = '/equipamento?item=armas') => {
  renderAt(path);
  // A deep link opens the Forge by itself; otherwise the Reader clicks the button.
  if (!path.includes('forja=')) {
    fireEvent.click(await screen.findByRole('button', { name: 'Forjar arma' }));
  }
  return screen.findByRole('dialog', { name: 'Forja de Armas' });
};

const total = (dialog: HTMLElement) =>
  within(
    within(dialog).getByRole('region', { name: 'Resultado' })
      .parentElement as HTMLElement,
  ).getByText('Custo total').parentElement;

describe('Weapon Forge launcher', () => {
  it('is offered on the weapons list only, closed until asked', async () => {
    renderAt('/equipamento?item=armas');
    const button = await screen.findByRole('button', { name: 'Forjar arma' });
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(button);
    expect(
      await screen.findByRole('dialog', { name: 'Forja de Armas' }),
    ).toBeInTheDocument();
  });

  it('is absent from the full equipment list', async () => {
    renderAt('/equipamento');
    await screen.findByRole('link', { name: /Machado de guerra/ });
    expect(screen.queryByRole('button', { name: 'Forjar arma' })).toBeNull();
  });

  it('opens on the tab named in the URL', async () => {
    renderAt('/equipamento?item=armas&forja=rara');
    expect(
      await screen.findByRole('tab', { name: 'Arma rara', selected: true }),
    ).toBeInTheDocument();
  });

  it('closes on Fechar and on Esc, and keeps the draft when reopened', async () => {
    const dialog = await openForge();
    fireEvent.click(
      within(dialog).getByRole('checkbox', { name: /^Certeira/ }),
    );
    fireEvent.click(within(dialog).getByRole('button', { name: 'Fechar' }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());

    fireEvent.click(screen.getByRole('button', { name: 'Forjar arma' }));
    const again = await screen.findByRole('dialog', { name: 'Forja de Armas' });
    expect(
      within(again).getByRole('checkbox', { name: /^Certeira/ }),
    ).toBeChecked();

    fireEvent(again, new Event('cancel', { cancelable: true }));
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  });

  it('says nothing is saved, and Recomeçar clears the draft', async () => {
    const dialog = await openForge();
    expect(
      within(dialog).getByText(/Nada do que você montar aqui é salvo/),
    ).toBeInTheDocument();
    fireEvent.click(
      within(dialog).getByRole('checkbox', { name: /^Certeira/ }),
    );
    fireEvent.click(within(dialog).getByRole('button', { name: 'Recomeçar' }));
    expect(
      within(dialog).getByRole('checkbox', { name: /^Certeira/ }),
    ).not.toBeChecked();
  });
});

describe('Custom Weapon tab', () => {
  it('starts at 300z and explains what is missing', async () => {
    const dialog = await openForge();
    expect(total(dialog)).toHaveTextContent('300z');
    expect(
      within(dialog).getByText(/faltam 3 personalizações/),
    ).toBeInTheDocument();
  });

  it('blocks Poderosa on a dagger and unblocks it on a sword', async () => {
    const dialog = await openForge();
    const poderosa = () =>
      within(dialog).getByRole('checkbox', { name: /^Poderosa/ });
    expect(poderosa()).toBeDisabled();
    expect(
      within(dialog).getByText(/Poderosa não vale para adagas/),
    ).toBeInTheDocument();
    fireEvent.change(
      within(dialog).getByRole('combobox', { name: 'Categoria' }),
      {
        target: { value: 'Espadas' },
      },
    );
    expect(poderosa()).toBeEnabled();
  });

  it('stops at three slots, counting Rápida twice', async () => {
    const dialog = await openForge();
    fireEvent.click(within(dialog).getByRole('checkbox', { name: /^Rápida/ }));
    fireEvent.click(
      within(dialog).getByRole('checkbox', { name: /^Certeira/ }),
    );
    expect(
      within(dialog).getByRole('checkbox', { name: /^Mutável/ }),
    ).toBeDisabled();
    expect(
      within(dialog).getByText(
        /Sem espaço: Mutável ocupa 1 e não resta nenhum/,
      ),
    ).toBeInTheDocument();
    expect(within(dialog).queryByText(/faltam/)).toBeNull();
  });

  it('adds a second form and 100z when Mutável is chosen', async () => {
    const dialog = await openForge();
    fireEvent.click(within(dialog).getByRole('checkbox', { name: /^Mutável/ }));
    expect(
      within(dialog).getByRole('heading', { name: 'Forma II' }),
    ).toBeInTheDocument();
    expect(total(dialog)).toHaveTextContent('400z');
  });

  it('filters the customizations inside the modal', async () => {
    const dialog = await openForge();
    fireEvent.click(within(dialog).getByRole('button', { name: /^Marcial/ }));
    fireEvent.click(within(dialog).getByRole('checkbox', { name: /^Marcial/ }));
    expect(
      within(dialog).queryByRole('checkbox', { name: /^Certeira/ }),
    ).toBeNull();
    expect(
      within(dialog).getByRole('checkbox', { name: /^Rápida/ }),
    ).toBeInTheDocument();
  });
});

describe('Rare Weapon tab', () => {
  const openRare = async () => {
    const dialog = await openForge('/equipamento?item=armas&forja=rara');
    return dialog;
  };

  it('asks for a base, then adds up the four steps', async () => {
    const dialog = await openRare();
    expect(
      within(dialog).getByText('Escolha uma arma básica para começar.'),
    ).toBeInTheDocument();

    fireEvent.click(
      within(dialog).getByRole('radio', { name: /^Machado de guerra/ }),
    );
    expect(total(dialog)).toHaveTextContent('250z');

    fireEvent.change(
      within(dialog).getByRole('combobox', { name: /Tipo de dano/ }),
      {
        target: { value: 'fogo' },
      },
    );
    expect(total(dialog)).toHaveTextContent('350z');

    fireEvent.click(
      within(dialog).getByRole('checkbox', { name: /^Dano \+4/ }),
    );
    expect(total(dialog)).toHaveTextContent('550z');

    fireEvent.click(within(dialog).getByRole('radio', { name: /^Multi(?!c)/ }));
    expect(total(dialog)).toHaveTextContent('1.550z');
  });

  it('keeps to one alteration unless the Reader opts in', async () => {
    const dialog = await openRare();
    fireEvent.click(
      within(dialog).getByRole('radio', { name: /^Machado de guerra/ }),
    );
    fireEvent.click(
      within(dialog).getByRole('checkbox', { name: /^Dano \+4/ }),
    );
    const accuracy = () =>
      within(dialog).getByRole('checkbox', { name: /^Precisão \+1/ });
    expect(accuracy()).toBeDisabled();
    expect(
      within(dialog).getAllByText(/uma só alteração/).length,
    ).toBeGreaterThan(0);
    fireEvent.click(
      within(dialog).getByRole('checkbox', { name: /Permitir mais de uma/ }),
    );
    expect(accuracy()).toBeEnabled();
  });

  it('does not offer unarmed or improvised attacks as a base', async () => {
    const dialog = await openRare();
    expect(
      within(dialog).getByRole('radio', { name: /^Katana/ }),
    ).toBeInTheDocument();
    expect(
      within(dialog).queryByRole('radio', { name: /^Ataque desarmado/ }),
    ).toBeNull();
    expect(
      within(dialog).queryByRole('radio', { name: /^Improvisada/ }),
    ).toBeNull();
  });

  it('filters the base weapons and the features inside the modal', async () => {
    const dialog = await openRare();
    fireEvent.click(within(dialog).getByRole('button', { name: /^Categoria/ }));
    fireEvent.click(
      within(dialog).getByRole('checkbox', { name: /Armas Pesadas/ }),
    );
    expect(
      within(dialog).getByRole('radio', { name: /^Machado de guerra/ }),
    ).toBeInTheDocument();
    expect(within(dialog).queryByRole('radio', { name: /^Katana/ })).toBeNull();

    fireEvent.click(
      within(dialog).getByRole('radio', { name: /^Machado de guerra/ }),
    );
    fireEvent.click(within(dialog).getByRole('button', { name: /^Tipo$/ }));
    fireEvent.click(
      within(dialog).getByRole('checkbox', { name: /Defensiva/ }),
    );
    expect(
      within(dialog).getByRole('radio', { name: /^Baluarte/ }),
    ).toBeInTheDocument();
    expect(
      within(dialog).queryByRole('radio', { name: /^Multi(?!c)/ }),
    ).toBeNull();
  });

  it('asks the Reader to finish the custom weapon before using it as a base', async () => {
    const dialog = await openRare();
    fireEvent.click(
      within(dialog).getByRole('radio', { name: 'Arma personalizada' }),
    );
    expect(
      within(dialog).getByText(/Complete a arma personalizada na outra aba/),
    ).toBeInTheDocument();
  });
});
