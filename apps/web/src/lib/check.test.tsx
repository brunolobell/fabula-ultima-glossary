import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { decorateChecks } from './check';

describe('decorateChecks', () => {
  it('draws brackets around attribute and RA formulas, keeping the bonus outside', () => {
    const { container } = render(
      <p>{decorateChecks('Usa (DES + AST) +1 e causa (RA + 25) de dano.')}</p>,
    );
    const checks = [...container.querySelectorAll('.check')].map((e) => e.textContent);
    expect(checks).toEqual(['DES + AST', 'RA + 25']);
    expect(container.textContent).toBe('Usa DES + AST +1 e causa RA + 25 de dano.');
  });

  it('leaves other parenthesised text alone', () => {
    const { container } = render(<p>{decorateChecks('Aumenta em (NP × 3).')}</p>);
    expect(container.querySelector('.check')).toBeNull();
    expect(container.textContent).toBe('Aumenta em (NP × 3).');
  });
});
