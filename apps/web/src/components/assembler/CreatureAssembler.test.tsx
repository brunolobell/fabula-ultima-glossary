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
import { App } from '../../App';
import { mockApi } from '../../test/fixtures';

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

const openDialog = async () => {
  mockApi();
  renderAt('/criaturas?montagem=rapida');
  const dialog = await screen.findByRole('dialog', {
    name: 'Montagem de Criaturas',
  });
  return within(dialog);
};

const stat = (dialog: ReturnType<typeof within>, label: string) =>
  dialog.getByText(label, { selector: 'dt' }).nextElementSibling?.textContent;

describe('Creature Assembler: opening and closing', () => {
  it('is offered on the Creatures list, closed until asked, and opened by the button', async () => {
    mockApi();
    renderAt('/criaturas');
    const main = within(screen.getByRole('main'));
    fireEvent.click(
      await main.findByRole('button', { name: 'Montar criatura' }),
    );
    expect(
      await screen.findByRole('dialog', { name: 'Montagem de Criaturas' }),
    ).toBeInTheDocument();
  });

  it('opens straight from a link with ?montagem=rapida, as the Rules link to it', async () => {
    const dialog = await openDialog();
    expect(
      dialog.getByRole('heading', { name: 'Montagem de Criaturas' }),
    ).toBeInTheDocument();
  });

  it('closes with the close button', async () => {
    const dialog = await openDialog();
    fireEvent.click(dialog.getByRole('button', { name: 'Fechar' }));
    await waitFor(() =>
      expect(
        screen.queryByRole('heading', { name: 'Montagem de Criaturas' }),
      ).toBeNull(),
    );
  });

  it('is not offered on the other lists', async () => {
    mockApi();
    renderAt('/regras');
    await screen.findByRole('heading', { level: 1, name: 'Regras' });
    expect(
      screen.queryByRole('button', { name: 'Montar criatura' }),
    ).toBeNull();
  });
});

describe('Creature Assembler: the build', () => {
  it('starts as a level 5 brute soldier, with the profile of the book', async () => {
    const dialog = await openDialog();
    const preview = within(dialog.getByRole('region', { name: 'Ficha' }));
    expect(stat(preview, 'PV')).toBe('70');
    expect(stat(preview, 'Crise')).toBe('35');
    expect(stat(preview, 'PM')).toBe('45');
    expect(stat(preview, 'Inic.')).toBe('7');
  });

  it('follows the level and the Rank (a level 30 elite brute has 240 PV and 70 PM)', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Nível'), {
      target: { value: '30' },
    });
    fireEvent.change(dialog.getByLabelText('Patente'), {
      target: { value: 'elite' },
    });
    const preview = within(dialog.getByRole('region', { name: 'Ficha' }));
    expect(stat(preview, 'PV')).toBe('240');
    expect(stat(preview, 'PM')).toBe('70');
    expect(stat(preview, 'AST')).toBe('d8');
  });

  it('changes the profile with the Role', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Função'), {
      target: { value: 'mage' },
    });
    const preview = within(dialog.getByRole('region', { name: 'Ficha' }));
    expect(stat(preview, 'PV')).toBe('40');
    expect(stat(preview, 'PM')).toBe('55');
  });

  it('asks how many soldiers a champion replaces, and multiplies by it', async () => {
    const dialog = await openDialog();
    expect(dialog.queryByLabelText('Soldados substituídos (X)')).toBeNull();
    fireEvent.change(dialog.getByLabelText('Patente'), {
      target: { value: 'champion' },
    });
    fireEvent.change(dialog.getByLabelText('Soldados substituídos (X)'), {
      target: { value: '3' },
    });
    const preview = within(dialog.getByRole('region', { name: 'Ficha' }));
    expect(stat(preview, 'PV')).toBe('210');
    expect(stat(preview, 'PM')).toBe('90');
  });

  it('names the Creature in the stat block', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Nome'), {
      target: { value: 'Juggernaut' },
    });
    expect(
      within(dialog.getByRole('region', { name: 'Ficha' })).getByRole(
        'heading',
        {
          name: 'Juggernaut',
        },
      ),
    ).toBeInTheDocument();
  });

  it('gives a Villain Ultima Points that follow the Tier', async () => {
    const dialog = await openDialog();
    const preview = within(dialog.getByRole('region', { name: 'Ficha' }));
    expect(preview.queryByText(/Pontos de Ultima/)).toBeNull();
    fireEvent.click(dialog.getByRole('checkbox', { name: 'Vilão' }));
    expect(preview.getByText('Pontos de Ultima: 5')).toBeInTheDocument();
    fireEvent.change(dialog.getByLabelText('Grau do vilão'), {
      target: { value: 'supreme' },
    });
    expect(preview.getByText('Pontos de Ultima: 15')).toBeInTheDocument();
  });

  it('turns the picked damage types into Afinidades, and stops warning once complete', async () => {
    const dialog = await openDialog();
    const warnings = dialog.getByRole('status', { name: 'Pendências' });
    expect(warnings).toHaveTextContent('Escolha 2 Vulnerabilidades (há 0).');

    const vulnerabilities = within(
      dialog.getByRole('group', { name: /Vulnerabilidades/ }),
    );
    fireEvent.click(vulnerabilities.getByRole('button', { name: 'Raio' }));
    fireEvent.click(vulnerabilities.getByRole('button', { name: 'Gelo' }));
    expect(
      vulnerabilities.getByRole('button', { name: 'Gelo' }),
    ).toHaveAttribute('aria-pressed', 'true');
    expect(warnings).not.toHaveTextContent('Vulnerabilidades');
    const list = within(
      dialog.getByRole('list', { name: 'Afinidades a dano' }),
    );
    expect(list.getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      'Vulnerável a raio',
      'Vulnerável a gelo',
    ]);
  });

  it("builds a basic attack from the Reader's picks", async () => {
    const dialog = await openDialog();
    const attack = within(dialog.getByRole('group', { name: 'Ataque Normal' }));
    fireEvent.change(attack.getByLabelText('Nome do ataque'), {
      target: { value: 'Salva de Mísseis' },
    });
    fireEvent.change(attack.getByLabelText('Alcance'), {
      target: { value: 'ranged' },
    });
    fireEvent.change(attack.getByLabelText('Tipo de dano'), {
      target: { value: 'fire' },
    });
    const preview = within(dialog.getByRole('region', { name: 'Ficha' }));
    const region = within(
      preview.getByRole('region', { name: 'Ataques básicos' }),
    );
    expect(region.getByText('Salva de Mísseis')).toBeInTheDocument();
    expect(region.getByText(/à distância/)).toBeInTheDocument();
    expect(region.getByText(/de dano de fogo/)).toBeInTheDocument();
  });

  it("offers the options and choices of a Role's attack (saboteur)", async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Função'), {
      target: { value: 'saboteur' },
    });
    const attack = within(dialog.getByRole('group', { name: 'Ataque Normal' }));
    expect(
      dialog.getByRole('status', { name: 'Pendências' }),
    ).toHaveTextContent('Escolha uma opção para o Ataque Normal.');
    fireEvent.click(attack.getByRole('radio', { name: 'Causa uma condição' }));
    fireEvent.change(attack.getByLabelText('Condição'), {
      target: { value: 'enraged' },
    });
    const preview = within(dialog.getByRole('region', { name: 'Ficha' }));
    expect(
      preview.getByText(/sofre a condição enfurecido/),
    ).toBeInTheDocument();
    // Enraged asks for one more Vulnerability.
    expect(
      dialog.getByRole('status', { name: 'Pendências' }),
    ).toHaveTextContent('Escolha 2 Vulnerabilidades (há 0).');
  });

  it('says how many Role Skills the build gets, which this version does not offer yet', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Nível'), {
      target: { value: '30' },
    });
    fireEvent.change(dialog.getByLabelText('Patente'), {
      target: { value: 'elite' },
    });
    expect(dialog.getByText(/2 poderes de função/)).toBeInTheDocument();
  });
});

describe('Creature Assembler: copying', () => {
  it('copies the stat block as Markdown and says so', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Nome'), {
      target: { value: 'Juggernaut' },
    });
    fireEvent.click(dialog.getByRole('button', { name: 'Copiar ficha' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    const text = writeText.mock.calls[0][0] as string;
    expect(
      text.startsWith(
        '# Juggernaut\nNível 5 · Monstro · Soldado · Função: Bruto',
      ),
    ).toBe(true);
    expect(text).toContain('**PV** 70 (Crise 35)');
    expect(await dialog.findByText('Ficha copiada.')).toBeInTheDocument();
  });
});
