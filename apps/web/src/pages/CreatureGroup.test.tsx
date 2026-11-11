import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from '../App';
import { mockApi } from '../test/fixtures';

afterEach(() => vi.unstubAllGlobals());

function renderAt(path: string) {
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

const main = () => within(screen.getByRole('main'));

describe('Creature Group page', () => {
  it('shows the shared text, then the stat block of each member, in order', async () => {
    mockApi({ groups: true });
    renderAt('/criaturas/fantasmas');

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Fantasmas' }),
    ).toBeInTheDocument();
    expect(main().getByText('sempre')).toBeInTheDocument();

    const espectro = main().getByRole('region', { name: 'Espectro' });
    const aparicao = main().getByRole('region', { name: 'Aparição' });
    // Document order: the member listed first comes first.
    expect(
      espectro.compareDocumentPosition(aparicao) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    // Every member has its own stat block: the Group has none above them.
    for (const member of [espectro, aparicao])
      expect(
        within(member).getAllByText('PV', { selector: 'dt' }),
      ).toHaveLength(1);
    expect(
      within(espectro).getByRole('link', { name: 'Abrir página' }),
    ).toHaveAttribute('href', '/criaturas/espectro');
    expect(within(espectro).getByText(/Nível 20/)).toBeInTheDocument();
    // Section ids are kept apart, so each heading labels its own section.
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('links a member back to its Group', async () => {
    mockApi({ groups: true });
    renderAt('/criaturas/espectro');

    const link = await main().findByRole('link', { name: 'Fantasmas' });
    expect(link).toHaveAttribute('href', '/criaturas/fantasmas');
    expect(link.closest('p')).toHaveTextContent('Parte do grupo Fantasmas');
  });
});

describe('Creature Groups on the list', () => {
  it('shows the Group as a row without stats, and tells each member its Group', async () => {
    mockApi({ groups: true });
    renderAt('/criaturas');

    const group = (
      await main().findByRole('link', { name: /^Fantasmas/ })
    ).closest('a')!;
    expect(group).toHaveAttribute('href', '/criaturas/fantasmas');
    expect(group).toHaveTextContent('Grupo de criaturas');
    expect(group).not.toHaveTextContent('Nível');

    const member = main()
      .getByRole('link', { name: /Espectro/ })
      .closest('a')!;
    expect(member).toHaveTextContent('Grupo Fantasmas');
    expect(member).toHaveTextContent('Nível 20');
  });

  it('leaves the Group out when a filter on the stats is on, and keeps its members', async () => {
    mockApi({ groups: true });
    renderAt('/criaturas?especie=undead');

    await main().findByRole('link', { name: /Espectro/ });
    expect(main().getByRole('link', { name: /Aparição/ })).toBeInTheDocument();
    expect(main().queryByRole('link', { name: /^Fantasmas/ })).toBeNull();
    expect(main().queryByRole('link', { name: /Cactonto/ })).toBeNull();
  });

  it('finds a member by name in the search, like any Creature', async () => {
    mockApi({ groups: true });
    renderAt('/buscar?q=espectro');
    expect(
      await main().findByRole('link', { name: /Espectro/ }),
    ).toBeInTheDocument();
    fireEvent.click(main().getByRole('link', { name: /Espectro/ }));
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Espectro' }),
    ).toBeInTheDocument();
  });
});
