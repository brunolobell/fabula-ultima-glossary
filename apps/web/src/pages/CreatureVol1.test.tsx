import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, within } from '@testing-library/react';
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
const cell = (label: string) =>
  main().getByText(label, { selector: 'dt' }).nextElementSibling?.textContent;

describe('Bestiary Vol. I Creatures', () => {
  it('shows a champion with the number of soldiers it replaces, and its marks', async () => {
    mockApi({ vol1: true });
    renderAt('/criaturas/dragao-arboreo');
    await screen.findByRole('heading', { level: 1, name: 'Dragão Arbóreo' });

    expect(cell('Patente')).toBe('Campeão 3');
    expect(cell('Função')).toBe('Apoio');
    expect(cell('Marcas')).toBe('Solitário, Único');
    expect(cell('Nome original')).toBe('Arboreal Dragon');
  });

  it('says "Campeão 3" in the list row too', async () => {
    mockApi({ vol1: true });
    renderAt('/criaturas');
    const row = (
      await main().findByRole('link', { name: /Dragão Arbóreo/ })
    ).closest('a')!;
    expect(row).toHaveTextContent('Nível 40 · Planta · Campeão 3 · PV');
  });
});
