import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { ThemeToggle } from './ThemeToggle';

afterEach(() => {
  delete document.documentElement.dataset.theme;
  localStorage.clear();
});

describe('ThemeToggle', () => {
  it('switches the theme, reflects it in aria-pressed and remembers the choice', () => {
    document.documentElement.dataset.theme = 'light';
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /alternar tema/i });
    expect(button).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(localStorage.getItem('codice-tema')).toBe('dark');

    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe('light');
  });
});
