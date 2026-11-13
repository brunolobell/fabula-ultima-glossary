import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import type { ClassTrait, EntrySummary } from '../api/types';
import { ResultRow } from './ResultRow';

const classEntry = (traits: ClassTrait[]): EntrySummary => ({
  id: 'atirador',
  slug: 'atirador',
  name: 'Atirador',
  type: 'class',
  summary: 'Especialista em armas de fogo.',
  source: 'livro-basico',
  page: 184,
  tags: [],
  details: { otherNames: [], quote: null, freeBenefits: [], traits },
});

const renderRow = (traits: ClassTrait[]) =>
  render(
    <MemoryRouter>
      <ResultRow entry={classEntry(traits)} showType={false} />
    </MemoryRouter>,
  );

describe('ResultRow of a Class', () => {
  it('shows the traits in canonical order, then the page', () => {
    const { container } = renderRow(['shield', 'hp', 'ranged-weapon']);
    expect(
      screen.getByText(
        /Aumento de PV · Armas à distância marciais · Escudos marciais/,
      ),
    ).toBeInTheDocument();
    const meta = container.querySelector('p.text-meta') as HTMLElement;
    expect(meta.textContent).toBe(
      'Aumento de PV · Armas à distância marciais · Escudos marciais · ver Livro Básico, página 184',
    );
  });

  it('shows no stray separator without traits', () => {
    const { container } = renderRow([]);
    const meta = container.querySelector('p.text-meta') as HTMLElement;
    expect(meta.textContent).not.toContain('·');
    expect(meta.textContent).toContain('184');
  });
});
