import { seedEntries } from '.';
import { validateSeed } from '../seed-validation';
import { SeedEntry } from './types';
import { customWeaponRule, rareWeaponRule } from './weapon-forge';
import { customWeaponRules, rareWeaponRules } from './weapon-forge-data';

const withDetails = (entry: SeedEntry, details: object): SeedEntry =>
  ({ ...entry, details }) as SeedEntry;

describe('Weapon Forge rules', () => {
  it('are two Rule Entries with their book and printed page', () => {
    expect(customWeaponRule).toMatchObject({
      type: 'rule',
      source: 'high-fantasy',
      page: 106,
    });
    expect(rareWeaponRule).toMatchObject({ type: 'rule', page: 268 });
    expect(rareWeaponRule.source ?? 'livro-basico').toBe('livro-basico');
    for (const rule of [customWeaponRule, rareWeaponRule]) {
      expect(seedEntries).toContain(rule);
    }
  });

  it('carry the numbers printed in the books (Atlas p. 106-107)', () => {
    expect(customWeaponRules.base).toEqual({
      cost: 300,
      damage: 5,
      slots: 3,
      accuracies: ['DES + AST', 'DES + VIG'],
    });
    const byId = Object.fromEntries(
      customWeaponRules.customizations.map((c) => [c.id, c]),
    );
    expect(Object.keys(byId).sort()).toEqual([
      'aumento-na-defesa',
      'aumento-na-defesa-magica',
      'certeira',
      'elemental',
      'mutavel',
      'poderosa',
      'rapida',
    ]);
    expect(byId['mutavel'].cost).toBe(100);
    expect(byId['rapida']).toMatchObject({ slots: 2, martial: true });
    expect(byId['poderosa']).toMatchObject({
      damage: 5,
      heavyDamage: 7,
      martial: true,
    });
    expect(byId['elemental'].damage).toBe(2);
    expect(byId['certeira'].accuracy).toBe(2);
    expect(byId['aumento-na-defesa'].martial).toBe(false);
    expect(byId['aumento-na-defesa-magica'].martial).toBe(true);
  });

  it('carry the weapon feature table (Livro Básico p. 269)', () => {
    const prices = Object.fromEntries(
      rareWeaponRules.features.map((f) => [f.id, f.cost]),
    );
    expect(prices).toEqual({
      anticondicao: 500,
      resistencia: 700,
      amuleto: 800,
      baluarte: 800,
      'dupla-resistencia': 1000,
      'quebra-laminas': 1000,
      imunidade: 1500,
      omniescudo: 2000,
      'saude-perfeita': 2000,
      magica: 100,
      cacadora: 300,
      perfuradora: 400,
      'dupla-cacadora': 500,
      multi: 1000,
      condicional: 1500,
      multicondicional: 2000,
    });
  });

  it('carry the creation steps (Livro Básico p. 268)', () => {
    expect(rareWeaponRules).toMatchObject({
      damageTypeCost: 100,
      maxAlterations: 1,
      martialDamage: 10,
    });
    const alterations = Object.fromEntries(
      rareWeaponRules.alterations.map((a) => [a.id, a]),
    );
    expect(alterations['one-handed']).toMatchObject({ damage: -4, cost: 0 });
    expect(alterations['two-handed']).toMatchObject({ damage: 4, cost: 0 });
    expect(alterations['accuracy']).toMatchObject({ accuracy: 1, cost: 100 });
    expect(alterations['damage']).toMatchObject({ damage: 4, cost: 200 });
    expect(alterations['attributes'].cost).toBe(50);
  });

  it('link to each other and to the equipment rule', () => {
    expect(customWeaponRule.body).toContain('[[criar-armas-raras]]');
    expect(rareWeaponRule.body).toContain('[[armas-personalizadas]]');
    expect(rareWeaponRule.body).toContain('[[equipamento]]');
  });

  it('generate the Rule tables from the same data', () => {
    expect(rareWeaponRule.body).toContain('| **Omniescudo** | +2.000z |');
    expect(customWeaponRule.body).toContain('| **Mutável** |');
  });
});

describe('validateSeed on Weapon Forge details', () => {
  it('accepts the real rules', () => {
    expect(validateSeed(seedEntries)).toEqual([]);
  });

  it('rejects a repeated customization id and an unknown block', () => {
    const [first] = customWeaponRules.customizations;
    const repeated = {
      ...customWeaponRules,
      customizations: [...customWeaponRules.customizations, first],
    };
    expect(
      validateSeed([withDetails(customWeaponRule, repeated)]).some((e) =>
        e.includes('is repeated'),
      ),
    ).toBe(true);

    const blocked = {
      ...customWeaponRules,
      customizations: customWeaponRules.customizations.map((c) =>
        c.id === 'certeira' ? { ...c, blockedWith: ['nao-existe'] } : c,
      ),
    };
    expect(
      validateSeed([withDetails(customWeaponRule, blocked)]).some((e) =>
        e.includes('unknown "nao-existe"'),
      ),
    ).toBe(true);
  });

  it('rejects a negative cost and a base that is not an equipment entry', () => {
    const negative = {
      ...rareWeaponRules,
      features: rareWeaponRules.features.map((f) =>
        f.id === 'multi' ? { ...f, cost: -1 } : f,
      ),
    };
    expect(
      validateSeed([withDetails(rareWeaponRule, negative)]).some((e) =>
        e.includes('feature "multi" has a bad cost'),
      ),
    ).toBe(true);

    const dangling = { ...rareWeaponRules, excludedBases: ['nao-existe'] };
    expect(
      validateSeed([withDetails(rareWeaponRule, dangling)]).some((e) =>
        e.includes('"nao-existe" is not a equipment entry'),
      ),
    ).toBe(true);
  });

  it('needs exactly one customization that adds a second form', () => {
    const none = {
      ...customWeaponRules,
      customizations: customWeaponRules.customizations.map((c) => ({
        ...c,
        secondForm: undefined,
      })),
    };
    expect(
      validateSeed([withDetails(customWeaponRule, none)]).some((e) =>
        e.includes('second form'),
      ),
    ).toBe(true);
  });
});
