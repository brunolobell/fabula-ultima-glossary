import { describe, expect, it } from 'vitest';
import type { ClassTrait } from '../api/types';
import { classTraitLabels } from './classTraits';

describe('classTraitLabels', () => {
  it('returns the labels in canonical order', () => {
    expect(classTraitLabels(['shield', 'hp', 'ranged-weapon'])).toEqual([
      'Aumento de PV',
      'Armas à distância marciais',
      'Escudos marciais',
    ]);
  });

  it('returns nothing for no traits', () => {
    expect(classTraitLabels([])).toEqual([]);
  });

  it('drops unknown codes', () => {
    expect(classTraitLabels(['mp', 'flying' as ClassTrait])).toEqual([
      'Aumento de PM',
    ]);
  });
});
