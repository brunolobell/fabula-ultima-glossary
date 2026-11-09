import { normalizeText, slugify } from './slug';

describe('normalizeText', () => {
  it('lowercases and strips accents so searches ignore both', () => {
    expect(normalizeText('Perícia')).toBe('pericia');
    expect(normalizeText('ASTÚCIA')).toBe('astucia');
    expect(normalizeText('Lâmina Mágica')).toBe('lamina magica');
  });
});

describe('slugify', () => {
  it('strips accents and non-alphanumerics', () => {
    expect(slugify('Pontos de Fabula!')).toBe('pontos-de-fabula');
    expect(slugify('Guarda-costas')).toBe('guarda-costas');
    expect(slugify('Improvisada (dist.)')).toBe('improvisada-dist');
  });
});
