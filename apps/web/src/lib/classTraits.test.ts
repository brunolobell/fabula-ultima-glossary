import { describe, expect, it } from 'vitest';
import { CLASS_TRAITS } from '../../../api/src/entries/entry-types';
import type { ClassTrait } from '../api/types';
import { CLASS_TRAIT_ORDER, classTraitLabels } from './classTraits';

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

describe('CLASS_TRAIT_ORDER', () => {
  it('lists the same traits, in the same order, as the API', () => {
    expect([...CLASS_TRAIT_ORDER]).toEqual([...CLASS_TRAITS]);
  });
});
