import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { CreatureDetails } from '../api/types';
import { StatBlock } from './StatBlock';

const base: CreatureDetails = {
  level: 5,
  species: 'construct',
  rank: 'soldier',
  villain: false,
  traits: ['brilhante'],
  attributes: { DES: 8, AST: 8, VIG: 6, VON: 10 },
  hp: 40,
  crisis: 20,
  mp: 55,
  initiative: 8,
  defense: { value: 1, fixed: false },
  magicDefense: 2,
  hasSpells: false,
  affinities: {},
  attacks: [],
  spells: [],
  otherActions: [],
  specialRules: [],
};

const show = (details: Partial<CreatureDetails>) =>
  render(
    <MemoryRouter>
      <StatBlock details={{ ...base, ...details }} />
    </MemoryRouter>,
  );

describe('StatBlock', () => {
  it('shows an attack whose damage type is set by a rule without naming one', () => {
    show({
      attacks: [
        {
          name: 'Descarga Elemental',
          range: 'ranged',
          accuracy: 'DES + AST',
          accuracyBonus: 0,
          damage: 5,
          damageType: null,
          effect: 'Um d6 define o tipo: 1-2 fogo, 3-4 gelo, 5-6 raio.',
        },
      ],
    });
    const attack = within(
      screen.getByRole('region', { name: 'Ataques básicos' }),
    );
    expect(attack.getByText('Descarga Elemental')).toBeInTheDocument();
    expect(attack.getByText(/de dano$/)).toBeInTheDocument();
    expect(attack.getByText(/Um d6 define o tipo/)).toBeInTheDocument();
  });

  it('shows a fixed Defesa without a sign and a bonus with one', () => {
    show({ defense: { value: 11, fixed: true }, magicDefense: -1 });
    const numbers = within(
      screen.getByRole('group', { name: 'Atributos e defesas' }),
    );
    const cell = (label: string) =>
      numbers.getByText(label, { selector: 'dt' }).nextElementSibling
        ?.textContent;
    expect(cell('Defesa')).toBe('11');
    expect(cell('Def. Mágica')).toBe('-1');
  });

  it('says so when a Creature has no Affinity', () => {
    show({});
    expect(screen.getByText('Nenhuma Afinidade a dano.')).toBeInTheDocument();
  });
});
