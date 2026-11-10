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

  it('asks for the Role Skills a level and rank give, and counts the ones picked', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Nível'), {
      target: { value: '30' },
    });
    fireEvent.change(dialog.getByLabelText('Patente'), {
      target: { value: 'elite' },
    });
    const warnings = dialog.getByRole('status', { name: 'Pendências' });
    expect(warnings).toHaveTextContent('Escolha 2 poderes de função (há 0).');
    const skills = within(
      dialog.getByRole('group', { name: /Poderes de função/ }),
    );
    expect(skills.getByText(/0 de 2/)).toBeInTheDocument();
    fireEvent.click(
      skills.getByRole('checkbox', { name: /Recuperação Constante/ }),
    );
    expect(skills.getByText(/1 de 2/)).toBeInTheDocument();
    expect(warnings).toHaveTextContent('Escolha 1 poder de função (há 1).');
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

describe('Creature Assembler: Skills and customization', () => {
  const setup = async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Nível'), {
      target: { value: '20' },
    });
    return dialog;
  };
  const preview = (dialog: ReturnType<typeof within>) =>
    within(dialog.getByRole('region', { name: 'Ficha' }));

  it('puts a picked Skill in the stat block', async () => {
    const dialog = await setup();
    const skills = within(
      dialog.getByRole('group', { name: /Poderes de função/ }),
    );
    fireEvent.click(
      skills.getByRole('checkbox', { name: /Recuperação Constante/ }),
    );
    const rules = within(
      preview(dialog).getByRole('region', { name: 'Regras especiais' }),
    );
    expect(rules.getByText('Recuperação Constante')).toBeInTheDocument();
  });

  it('asks for the choices of a picked Skill and fills them into its text', async () => {
    const dialog = await setup();
    const skills = within(
      dialog.getByRole('group', { name: /Poderes de função/ }),
    );
    fireEvent.click(skills.getByRole('checkbox', { name: /Mau Perdedor/ }));
    fireEvent.change(skills.getByLabelText('Condição'), {
      target: { value: 'slow' },
    });
    expect(
      preview(dialog).getByText(/sofre a condição lento/),
    ).toBeInTheDocument();
  });

  it('says who may take a Skill', async () => {
    const dialog = await setup();
    const skills = within(
      dialog.getByRole('group', { name: /Poderes de função/ }),
    );
    expect(
      skills.getByText(/Relógio de Colapso/).closest('label'),
    ).toHaveTextContent('só elite e campeão');
  });

  it('offers +10 PV, or a customization, to a soldier or elite', async () => {
    const dialog = await openDialog();
    const custom = dialog.getByLabelText('Personalização');
    fireEvent.change(custom, { target: { value: 'extra' } });
    expect(
      stat(within(dialog.getByRole('region', { name: 'Ficha' })), 'PV'),
    ).toBe('80');
    fireEvent.change(custom, { target: { value: 'c:die-hard' } });
    expect(
      stat(within(dialog.getByRole('region', { name: 'Ficha' })), 'PV'),
    ).toBe('70');
    expect(preview(dialog).getByText('Vida Dura')).toBeInTheDocument();
  });

  it('fills the choice of a customization', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Personalização'), {
      target: { value: 'c:bad-temper' },
    });
    fireEvent.change(dialog.getByLabelText('Benefício'), {
      target: { value: 'damage' },
    });
    expect(
      preview(dialog).getByText(
        /causa 5 de dano adicional com o ataque normal/,
      ),
    ).toBeInTheDocument();
  });

  it('does not offer a customization to a champion', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Patente'), {
      target: { value: 'champion' },
    });
    expect(dialog.queryByLabelText('Personalização')).toBeNull();
  });

  it('adds the strong attack a Skill gives, with its own editor', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Função'), {
      target: { value: 'hunter' },
    });
    fireEvent.change(dialog.getByLabelText('Nível'), {
      target: { value: '20' },
    });
    expect(dialog.queryByRole('group', { name: 'Ataque Forte' })).toBeNull();
    const skills = within(
      dialog.getByRole('group', { name: /Poderes de função/ }),
    );
    fireEvent.click(skills.getByRole('checkbox', { name: /^Ataque forte$/ }));
    const editor = within(dialog.getByRole('group', { name: 'Ataque Forte' }));
    fireEvent.change(editor.getByLabelText('Nome do ataque'), {
      target: { value: 'Golpe Mortal' },
    });
    expect(preview(dialog).getByText('Golpe Mortal')).toBeInTheDocument();
  });

  it('starts the Skills over when the Role changes', async () => {
    const dialog = await setup();
    const skills = within(
      dialog.getByRole('group', { name: /Poderes de função/ }),
    );
    fireEvent.click(
      skills.getByRole('checkbox', { name: /Recuperação Constante/ }),
    );
    fireEvent.change(dialog.getByLabelText('Função'), {
      target: { value: 'sentinel' },
    });
    const next = within(
      dialog.getByRole('group', { name: /Poderes de função/ }),
    );
    expect(next.getByText(/0 de 1/)).toBeInTheDocument();
  });
});

describe('Creature Assembler: spells', () => {
  const asMage = async (level = '5') => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Função'), {
      target: { value: 'mage' },
    });
    fireEvent.change(dialog.getByLabelText('Nível'), {
      target: { value: level },
    });
    return dialog;
  };
  const preview = (dialog: ReturnType<typeof within>) =>
    within(dialog.getByRole('region', { name: 'Ficha' }));

  it('offers the base spells to a mage, and asks for the option first', async () => {
    const dialog = await asMage();
    expect(
      dialog.getByRole('status', { name: 'Pendências' }),
    ).toHaveTextContent('Escolha a opção de feitiços (Feitiços).');
    const spells = within(dialog.getByRole('group', { name: 'Feitiços' }));
    fireEvent.click(spells.getByRole('radio', { name: 'Dois feitiços' }));
    fireEvent.click(spells.getByRole('button', { name: 'Fulgur' }));
    fireEvent.click(spells.getByRole('button', { name: 'Sopro' }));
    expect(spells.getByRole('button', { name: 'Fulgur' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(
      dialog.getByRole('status', { name: 'Pendências' }),
    ).not.toHaveTextContent('feitiço');
    const region = within(
      preview(dialog).getByRole('region', { name: 'Feitiços' }),
    );
    expect(region.getByText('Fulgur')).toBeInTheDocument();
    expect(region.getByText('Sopro')).toBeInTheDocument();
  });

  it('takes the +10 PM of "um feitiço e +10 PM" and lets only one spell be picked', async () => {
    const dialog = await asMage();
    const spells = within(dialog.getByRole('group', { name: 'Feitiços' }));
    fireEvent.click(spells.getByRole('radio', { name: 'Um feitiço e +10 PM' }));
    fireEvent.click(spells.getByRole('button', { name: 'Fulgur' }));
    fireEvent.click(spells.getByRole('button', { name: 'Sopro' }));
    // Mage level 5 has 55 PM; one spell and +10 PM is 65, and the second pick is refused.
    expect(stat(preview(dialog), 'PM')).toBe('65');
    expect(spells.getByRole('button', { name: 'Sopro' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('asks for the damage type of an NPC spell and writes it into the text', async () => {
    const dialog = await asMage();
    const spells = within(dialog.getByRole('group', { name: 'Feitiços' }));
    fireEvent.click(spells.getByRole('radio', { name: 'Um feitiço e +10 PM' }));
    fireEvent.click(spells.getByRole('button', { name: 'Sopro' }));
    fireEvent.change(spells.getByLabelText('Tipo de dano'), {
      target: { value: 'ice' },
    });
    expect(
      preview(dialog).getByText(/de dano do tipo gelo ao alvo/),
    ).toBeInTheDocument();
  });

  it('marks the spells that need level 30', async () => {
    const dialog = await asMage();
    const spells = within(dialog.getByRole('group', { name: 'Feitiços' }));
    expect(
      spells.getByRole('button', { name: /Clarão.*nível 30/ }),
    ).toBeInTheDocument();
  });

  it('offers the Magic check once there is an offensive spell', async () => {
    const dialog = await asMage();
    expect(dialog.queryByLabelText('Teste de Magia')).toBeNull();
    const spells = within(dialog.getByRole('group', { name: 'Feitiços' }));
    fireEvent.click(spells.getByRole('radio', { name: 'Um feitiço e +10 PM' }));
    fireEvent.click(spells.getByRole('button', { name: 'Fulgur' }));
    fireEvent.change(dialog.getByLabelText('Teste de Magia'), {
      target: { value: 'VIG + VON' },
    });
    expect(preview(dialog).getByText(/VIG \+ VON/)).toBeInTheDocument();
  });

  it('offers no base spells to a Role that has none (brute)', async () => {
    const dialog = await openDialog();
    expect(dialog.queryByRole('group', { name: 'Feitiços' })).toBeNull();
  });

  it('offers the spells of a Skill under the Skill once it is picked', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Função'), {
      target: { value: 'sentinel' },
    });
    fireEvent.change(dialog.getByLabelText('Nível'), {
      target: { value: '20' },
    });
    const skills = within(
      dialog.getByRole('group', { name: /Poderes de função/ }),
    );
    expect(skills.queryByRole('button', { name: 'Concha' })).toBeNull();
    fireEvent.click(skills.getByRole('checkbox', { name: /^Feitiços/ }));
    fireEvent.click(skills.getByRole('button', { name: 'Concha' }));
    expect(preview(dialog).getByText('Concha')).toBeInTheDocument();
    expect(stat(preview(dialog), 'PM')).toBe('70');
  });
});

describe('Creature Assembler: Negative Skill', () => {
  const preview = (dialog: ReturnType<typeof within>) =>
    within(dialog.getByRole('region', { name: 'Ficha' }));

  it('offers the eight Negative Skills, with none as the starting point', async () => {
    const dialog = await openDialog();
    const select = dialog.getByLabelText('Poder negativo') as HTMLSelectElement;
    expect([...select.options].map((o) => o.textContent)).toEqual([
      'Nenhum',
      'Atraso Final',
      'Detonação Final',
      'Restauração Final',
      'Condição Final',
      'Enfraquecimento Final',
      'Pouso Forçado',
      'Erro Doloroso',
      'Amarras de Condição',
    ]);
    expect(select.value).toBe('');
  });

  it('shows what the book says the Skill is for and asks for its choices', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Poder negativo'), {
      target: { value: 'final-detonation' },
    });
    expect(
      dialog.getByText(/explodem e ferem os aliados ao serem derrotados/),
    ).toBeInTheDocument();
    const negative = within(
      dialog.getByRole('group', { name: 'Escolhas do poder negativo' }),
    );
    fireEvent.change(negative.getByLabelText('Tipo de dano'), {
      target: { value: 'fire' },
    });
    const rules = within(
      preview(dialog).getByRole('region', { name: 'Regras especiais' }),
    );
    expect(rules.getByText('Detonação Final')).toBeInTheDocument();
    expect(rules.getByText(/dano do tipo fogo/)).toBeInTheDocument();
  });

  it('buys one more Role Skill', async () => {
    const dialog = await openDialog();
    const skills = () =>
      within(dialog.getByRole('group', { name: /Poderes de função/ }));
    expect(skills().getByText(/0 de 0/)).toBeInTheDocument();
    fireEvent.change(dialog.getByLabelText('Poder negativo'), {
      target: { value: 'final-delay' },
    });
    expect(skills().getByText(/0 de 1/)).toBeInTheDocument();
    expect(
      dialog.getByRole('status', { name: 'Pendências' }),
    ).toHaveTextContent('Escolha 1 poder de função (há 0).');
  });

  it('keeps the Negative Skill and its choices when the Role changes', async () => {
    const dialog = await openDialog();
    fireEvent.change(dialog.getByLabelText('Poder negativo'), {
      target: { value: 'final-detonation' },
    });
    const negative = within(
      dialog.getByRole('group', { name: 'Escolhas do poder negativo' }),
    );
    fireEvent.change(negative.getByLabelText('Tipo de dano'), {
      target: { value: 'fire' },
    });
    fireEvent.change(dialog.getByLabelText('Função'), {
      target: { value: 'mage' },
    });
    expect(
      dialog.getByRole('status', { name: 'Pendências' }),
    ).not.toHaveTextContent('tipo de dano em Detonação Final');
    expect(preview(dialog).getByText('Detonação Final')).toBeInTheDocument();
  });
});

describe('Creature Assembler: older Rule data', () => {
  // A browser can hold a cached list from before a re-seed: the Rules then lack what
  // a later step added. The Assembler must not crash on them; it is just not offered.
  it('is not offered, and does not crash, when the Rules lack the Negative Skills', async () => {
    mockApi({ stale: true });
    renderAt('/criaturas');
    const main = within(screen.getByRole('main'));
    await main.findByText('Cactonto');
    expect(main.queryByRole('button', { name: 'Montar criatura' })).toBeNull();
  });

  it('does not open from a link either', async () => {
    mockApi({ stale: true });
    renderAt('/criaturas?montagem=rapida');
    await screen.findByText('Cactonto');
    expect(
      screen.queryByRole('dialog', { name: 'Montagem de Criaturas' }),
    ).toBeNull();
  });
});
