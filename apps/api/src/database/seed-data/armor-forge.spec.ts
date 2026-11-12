import { seedEntries } from '.';
import { validateSeed } from '../seed-validation';
import { rareArmorRule } from './armor-forge';
import { rareArmorRules } from './armor-forge-data';
import { SeedEntry } from './types';

const withDetails = (entry: SeedEntry, details: object): SeedEntry =>
  ({ ...entry, details }) as SeedEntry;

describe('Armor Forge rule', () => {
  it('is a Livro Básico Rule on its printed page', () => {
    expect(rareArmorRule).toMatchObject({ type: 'rule', page: 280 });
    expect(rareArmorRule.source ?? 'livro-basico').toBe('livro-basico');
    expect(seedEntries).toContain(rareArmorRule);
  });

  it('carries the feature table (Livro Básico p. 280)', () => {
    const prices = Object.fromEntries(
      rareArmorRules.features.map((f) => [f.id, f.cost]),
    );
    expect(prices).toEqual({
      anticondicao: 500,
      resistencia: 700,
      'dupla-resistencia': 1000,
      'quebra-laminas': 1000,
      imunidade: 1500,
      'saude-perfeita': 2000,
      'mais-iniciativa': 500,
      'mais-precisao': 1000,
      'mais-magia': 1000,
      'mais-vitalidade': 1000,
      'mais-cura': 1500,
      'mais-conjuracao': 2000,
      'mais-dano': 2000,
    });
    expect(
      rareArmorRules.features.find((f) => f.id === 'mais-iniciativa')
        ?.initiative,
    ).toBe(4);
  });

  it('generates the Rule tables from the same data and links the weapon rule', () => {
    expect(rareArmorRule.body).toContain('| **Mais Iniciativa** | +500z |');
    expect(rareArmorRule.body).toContain('[[criar-armas-raras]]');
    expect(rareArmorRule.body).toContain('[[equipamento]]');
  });
});

describe('validateSeed on Armor Forge details', () => {
  it('accepts the real rule', () => {
    expect(validateSeed(seedEntries)).toEqual([]);
  });

  it('rejects a repeated feature, a bad cost and an unknown group', () => {
    const [first] = rareArmorRules.features;
    const errors = (features: unknown[]) =>
      validateSeed([
        withDetails(rareArmorRule, { ...rareArmorRules, features }),
      ]);
    expect(
      errors([...rareArmorRules.features, first]).some((e) =>
        e.includes('is repeated'),
      ),
    ).toBe(true);
    expect(
      errors([{ ...first, cost: -1 }]).some((e) => e.includes('bad cost')),
    ).toBe(true);
    expect(
      errors([{ ...first, group: 'offensive' }]).some((e) =>
        e.includes('unknown group'),
      ),
    ).toBe(true);
  });
});
