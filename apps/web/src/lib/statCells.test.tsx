import { describe, expect, it } from 'vitest';
import type { Entry } from '../api/types';
import { statCells } from './statCells';

const peculiarity = (requirement: string | null): Entry => ({
  id: '1',
  slug: 'grilhoes-do-coracao',
  name: 'Grilhões do Coração',
  type: 'peculiarity',
  summary: '',
  body: '',
  source: 'high-fantasy',
  page: 118,
  tags: [],
  createdAt: '',
  updatedAt: '',
  details: { requirement },
});

describe('statCells for a Peculiarity', () => {
  it('shows the requirement when the Peculiarity has one', () => {
    expect(statCells(peculiarity('Só com o Tema Dúvida.'), new Map())).toEqual([
      { label: 'Requisito', value: 'Só com o Tema Dúvida.' },
    ]);
  });

  it('shows nothing when it is open to everyone', () => {
    expect(statCells(peculiarity(null), new Map())).toEqual([]);
  });
});
