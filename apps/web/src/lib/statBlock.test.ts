import { describe, expect, it } from 'vitest';
import type { CreatureDetails } from '../api/types';
import { numberCells } from './statBlock';

const companion: CreatureDetails = {
  level: 5,
  species: 'beast',
  rank: 'soldier',
  flags: ['companion'],
  villain: false,
  traits: ['elegante'],
  attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
  hp: 26,
  crisis: 13,
  mp: 45,
  defense: { value: 1, fixed: false },
  magicDefense: 2,
  hasSpells: true,
  affinities: {},
  attacks: [],
  spells: [],
  otherActions: [],
  specialRules: [],
};

describe('numberCells', () => {
  it('has no Initiative cell when the Creature has no Initiative', () => {
    const labels = numberCells(companion).map((c) => c.label);
    expect(labels).not.toContain('Inic.');
    expect(labels).toContain('Def. Mágica');
  });

  it('shows the Initiative between PM and Defesa when there is one', () => {
    const labels = numberCells({ ...companion, initiative: 9 }).map(
      (c) => c.label,
    );
    expect(labels.slice(6, 9)).toEqual(['PM', 'Inic.', 'Defesa']);
  });
});
