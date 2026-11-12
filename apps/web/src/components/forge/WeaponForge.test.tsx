import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
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

const openForge = async (path = '/forja-de-armas') => {
  renderAt(path);
  await screen.findByRole('heading', { level: 1, name: 'Forja de Armas' });
  return screen.getByRole('main');
};

const total = (dialog: HTMLElement) =>
  within(
    within(dialog).getByRole('region', { name: 'Resultado' })
      .parentElement as HTMLElement,
  ).getByText('Custo total').parentElement;

describe('Weapon Forge page', () => {
  it('is linked from the weapons list only', async () => {
    renderAt('/equipamento?item=armas');
    const link = await screen.findByRole('link', { name: 'Forjar arma' });
    expect(link).toHaveAttribute('href', '/forja-de-armas');
  });

  it('is absent from the full equipment list', async () => {
    renderAt('/equipamento');
    await screen.findByRole('link', { name: /Machado de guerra/ });
    expect(screen.queryByRole('link', { name: 'Forjar arma' })).toBeNull();
  });

  it('opens on the custom tab, or on the tab named in the URL', async () => {
    const { unmount } = renderAt('/forja-de-armas');
    expect(
      await screen.findByRole('tab', { name: 'Arma personalizada', selected: true }),
    ).toBeInTheDocument();
    unmount();
    renderAt('/forja-de-armas?forja=rara');
    expect(
      await screen.findByRole('tab', { name: 'Arma rara', selected: true }),
    ).toBeInTheDocument();
  });

  it('sends the old modal links to the page', async () => {
    renderAt('/equipamento?item=armas&forja=rara');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Forja de Armas' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: 'Arma rara', selected: true }),
    ).toBeInTheDocument();
  });

  it('is a tool in the menu, current on its page', async () => {
    const page = await openForge();
    const nav = within(screen.getByRole('navigation', { name: 'Navegação principal' }));
    const link = nav.getByRole('link', { name: 'Forja de Armas' });
    expect(link).toHaveAttribute('aria-current', 'page');
    expect(nav.getByRole('button', { name: 'Ferramentas' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(page).toBeInTheDocument();
  });

  it('keeps the draft when the Reader leaves the page and comes back', async () => {
    const page = await openForge();
    fireEvent.click(within(page).getByRole('checkbox', { name: /^Certeira/ }));
    const nav = within(screen.getByRole('navigation', { name: 'Navegação principal' }));
    fireEvent.click(nav.getByRole('link', { name: 'Início' }));
    await screen.findByRole('heading', { level: 2, name: 'Ferramentas' });

    fireEvent.click(
      within(screen.getByRole('main')).getByRole('link', {
        name: /^Forja de Armas/,
      }),
    );
    await screen.findByRole('heading', { level: 1, name: 'Forja de Armas' });
    expect(
      within(screen.getByRole('main')).getByRole('checkbox', {
        name: /^Certeira/,
      }),
    ).toBeChecked();
  });

  it('says the draft is not saved, and Recomeçar clears it', async () => {
    const page = await openForge();
    expect(
      within(page).getByText(/Nada é salvo; o rascunho some ao recarregar/),
    ).toBeInTheDocument();
    fireEvent.click(within(page).getByRole('checkbox', { name: /^Certeira/ }));
    fireEvent.click(within(page).getByRole('button', { name: 'Recomeçar' }));
    expect(
      within(page).getByRole('checkbox', { name: /^Certeira/ }),
    ).not.toBeChecked();
  });

  it('folds the result into a one-line strip that opens on tap', async () => {
    const page = await openForge();
    const toggle = within(page).getByRole('button', { name: /^Resultado/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveTextContent('300z');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
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

  it('filters the customizations on the page', async () => {
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
    const dialog = await openForge('/forja-de-armas?forja=rara');
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

  it('filters the base weapons and the features on the page', async () => {
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
