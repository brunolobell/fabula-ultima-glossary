import { describe, expect, it } from 'vitest';
import { armasBasicas } from '../../../api/src/database/seed-data/equipment/armas-basicas';
import {
  customWeaponRules as custom,
  rareWeaponRules as rare,
} from '../../../api/src/database/seed-data/weapon-forge-data';
import type { EquipmentDetails } from '../api/types';
import {
  alterationState,
  baseFromBasic,
  baseFromCustom,
  computeCustom,
  computeRare,
  customizationState,
  emptyCustomForm,
  emptyRareChoice,
  formatZ,
  sanitizeForm,
  statLine,
  type CustomForm,
  type RareBase,
  type RareChoice,
} from './weaponForge';

const form = (
  category: string,
  customizations: string[],
  extra: Partial<CustomForm> = {},
): CustomForm => ({
  ...emptyCustomForm(custom),
  category,
  customizations,
  ...extra,
});

const single = (f: CustomForm) =>
  computeCustom(custom, [f, emptyCustomForm(custom)]);

const basic = (name: string): RareBase => {
  const entry = armasBasicas.find((e) => e.name === name);
  if (!entry || entry.type !== 'equipment') throw new Error(name);
  return baseFromBasic(name, entry.details as EquipmentDetails);
};

const choice = (c: Partial<RareChoice> = {}): RareChoice => ({
  ...emptyRareChoice(),
  ...c,
});

const completeBase = (result: ReturnType<typeof computeCustom>) => {
  const base = baseFromCustom('Arma personalizada', result);
  if (!base) throw new Error('incomplete custom weapon');
  return base;
};

describe('Custom Weapon', () => {
  it('starts as the Atlas describes: 300z, two hands, (RA + 5) physical', () => {
    const r = single(emptyCustomForm(custom));
    expect(r.total).toBe(300);
    expect(r.forms[0]).toMatchObject({
      hands: 2,
      damage: 5,
      damageType: 'físico',
      attributes: ['DES', 'AST'],
      accuracyBonus: 0,
      martial: false,
    });
    expect(r.complete).toBe(false);
    expect(r.forms).toHaveLength(1);
  });

  it('Grimório da Força: arcana, rápida + Aumento na Def. Mágica = 300z, martial', () => {
    const r = single(
      form('Armas Arcanas', ['rapida', 'aumento-na-defesa-magica']),
    );
    expect(r.complete).toBe(true);
    expect(r.total).toBe(300);
    expect(r.forms[0]).toMatchObject({
      damage: 5,
      magicDefense: 2,
      martial: true,
      doubleAttack: true,
    });
  });

  it('Rápida takes two slots, so a fourth slot is refused with a reason', () => {
    const f = form('Espadas', ['rapida', 'certeira']);
    expect(customizationState(custom, f, false, 'elemental')).toMatchObject({
      disabled: true,
      reason: expect.stringContaining('espaço'),
    });
    expect(customizationState(custom, f, false, 'certeira')).toMatchObject({
      selected: true,
      disabled: false,
    });
  });

  it('Poderosa is refused on arcana, dagger and Rápida weapons, in both directions', () => {
    for (const category of ['Armas Arcanas', 'Adagas']) {
      expect(
        customizationState(custom, form(category, []), false, 'poderosa'),
      ).toMatchObject({ disabled: true });
    }
    expect(
      customizationState(
        custom,
        form('Espadas', ['rapida']),
        false,
        'poderosa',
      ),
    ).toMatchObject({ disabled: true });
    expect(
      customizationState(
        custom,
        form('Espadas', ['poderosa']),
        false,
        'rapida',
      ),
    ).toMatchObject({ disabled: true });
  });

  it('Poderosa adds 5 damage, or 7 on a heavy weapon', () => {
    expect(single(form('Espadas', ['poderosa'])).forms[0].damage).toBe(10);
    expect(single(form('Armas Pesadas', ['poderosa'])).forms[0].damage).toBe(
      12,
    );
  });

  it('Elemental adds 2 damage and replaces the damage type', () => {
    const r = single(form('Espadas', ['elemental'], { damageType: 'raio' }));
    expect(r.forms[0]).toMatchObject({ damage: 7, damageType: 'raio' });
    const missing = single(form('Espadas', ['elemental']));
    expect(missing.problems.join(' ')).toContain('tipo de dano');
  });

  it('Certeira is +2 Precisão; the Defesa options add to the defenses', () => {
    const r = single(
      form('Espadas', [
        'certeira',
        'aumento-na-defesa',
        'aumento-na-defesa-magica',
      ]),
    );
    expect(r.forms[0]).toMatchObject({
      accuracyBonus: 2,
      defense: 2,
      magicDefense: 2,
      martial: true,
    });
  });

  it('changing the category drops what no longer fits', () => {
    const f = form('Espadas', ['poderosa', 'certeira']);
    const next = { ...f, category: 'Adagas' };
    expect(sanitizeForm(custom, next, false).customizations).toEqual([
      'certeira',
    ]);
  });

  it('Adagas Dançarinas: two forms, 400z, Forma II is a ranged malho at RA + 10', () => {
    const formI = form('Adagas', ['rapida', 'mutavel'], {
      accuracy: 'DES + VIG',
    });
    const formII = form('Malhos', ['certeira', 'poderosa'], {
      range: 'ranged',
      accuracy: 'DES + VIG',
    });
    const r = computeCustom(custom, [formI, formII]);
    expect(r.complete).toBe(true);
    expect(r.total).toBe(400);
    expect(r.forms).toHaveLength(2);
    expect(r.forms[0]).toMatchObject({ damage: 5, doubleAttack: true });
    expect(r.forms[1]).toMatchObject({
      damage: 10,
      accuracyBonus: 2,
      range: 'ranged',
      category: 'Malhos',
    });
    expect(r.cost.filter((l) => l.amount > 0).map((l) => l.amount)).toEqual([
      300, 100,
    ]);
  });

  it('Form II always carries Mutável and cannot toggle it', () => {
    const formII = form('Espadas', ['certeira']);
    expect(customizationState(custom, formII, true, 'mutavel')).toMatchObject({
      selected: true,
      disabled: true,
    });
    // Mutável + two free slots: a Rápida (2 slots) no longer fits.
    expect(customizationState(custom, formII, true, 'rapida').disabled).toBe(
      true,
    );
  });

  it('Machado Hoplita: Forma II (heavy, Elemental raio, Poderosa) reaches RA + 14 for 400z', () => {
    const formI = form('Espadas', ['certeira', 'aumento-na-defesa', 'mutavel']);
    const formII = form('Armas Pesadas', ['elemental', 'poderosa'], {
      damageType: 'raio',
    });
    const r = computeCustom(custom, [formI, formII]);
    expect(r.total).toBe(400);
    expect(r.forms[1].damage).toBe(14);
  });

  it('warns when the two forms differ, and stays quiet otherwise', () => {
    const different = computeCustom(custom, [
      form('Espadas', ['certeira', 'aumento-na-defesa', 'mutavel']),
      form('Arcos', ['certeira', 'aumento-na-defesa'], { range: 'ranged' }),
    ]);
    expect(different.notes.join(' ')).toContain('uma de cada vez');
    const same = computeCustom(custom, [
      form('Espadas', ['certeira', 'aumento-na-defesa', 'mutavel']),
      form('Espadas', ['certeira', 'aumento-na-defesa']),
    ]);
    expect(same.notes.join(' ')).not.toContain('uma de cada vez');
  });

  it('an incomplete weapon cannot be a base for a Rare Weapon', () => {
    expect(baseFromCustom('x', single(emptyCustomForm(custom)))).toBeNull();
  });
});

describe('Rare Weapon', () => {
  it('a basic weapon with no changes costs its own price', () => {
    const base = basic('Machado de guerra');
    const r = computeRare(rare, base, choice());
    expect(r.total).toBe(250);
    expect(r.forms[0]).toMatchObject({ damage: 14, martial: true });
  });

  it('a damage type other than physical costs +100z', () => {
    const r = computeRare(
      rare,
      basic('Machado de guerra'),
      choice({ damageType: 'ar' }),
    );
    expect(r.total).toBe(350);
    expect(r.forms[0].damageType).toBe('ar');
  });

  it('allows one alteration and explains why the others are off', () => {
    const base = basic('Machado de guerra');
    const c = choice({ alterations: ['damage'] });
    expect(alterationState(rare, base, c, 'accuracy')).toMatchObject({
      disabled: true,
      reason: expect.stringContaining('uma só alteração'),
    });
    expect(alterationState(rare, base, c, 'damage')).toMatchObject({
      selected: true,
      disabled: false,
    });
    const lifted = choice({ alterations: ['damage'], allowSeveral: true });
    expect(alterationState(rare, base, lifted, 'accuracy').disabled).toBe(
      false,
    );
  });

  it('Correntes Ardentes: Adagas Dançarinas + fire + 4 damage + Dupla caçadora = 1.200z, both forms', () => {
    const dancing = computeCustom(custom, [
      form('Adagas', ['rapida', 'mutavel'], { accuracy: 'DES + VIG' }),
      form('Malhos', ['certeira', 'poderosa'], {
        range: 'ranged',
        accuracy: 'DES + VIG',
      }),
    ]);
    const r = computeRare(
      rare,
      completeBase(dancing),
      choice({
        damageType: 'fogo',
        alterations: ['damage'],
        featureId: 'dupla-cacadora',
      }),
    );
    expect(r.total).toBe(1200);
    expect(r.forms.map((f) => f.damage)).toEqual([9, 14]);
    expect(r.forms.every((f) => f.damageType === 'fogo')).toBe(true);
  });

  it('Grimório do Vento: 1.200z needs both +1 Precisão and +4 damage (opt-in)', () => {
    const grimoire = single(
      form('Armas Arcanas', ['rapida', 'aumento-na-defesa-magica']),
    );
    const c = choice({
      damageType: 'ar',
      alterations: ['accuracy', 'damage'],
      featureId: 'anticondicao',
      allowSeveral: true,
    });
    const r = computeRare(rare, completeBase(grimoire), c);
    expect(r.total).toBe(1200);
    expect(r.forms[0]).toMatchObject({
      accuracyBonus: 1,
      damage: 9,
      damageType: 'ar',
      magicDefense: 2,
    });
    // Without the opt-in the same choice is reported as a problem.
    const strict = computeRare(rare, completeBase(grimoire), {
      ...c,
      allowSeveral: false,
    });
    expect(strict.problems.join(' ')).toContain('uma só alteração');
  });

  it('Sentinela da Rainha: Claymore Guardiã + Omniescudo = 2.700z', () => {
    const claymore = single(
      form(
        'Espadas',
        ['poderosa', 'aumento-na-defesa', 'aumento-na-defesa-magica'],
        {
          accuracy: 'DES + VIG',
        },
      ),
    );
    const r = computeRare(
      rare,
      completeBase(claymore),
      choice({
        damageType: 'luz',
        alterations: ['accuracy', 'damage'],
        featureId: 'omniescudo',
        allowSeveral: true,
      }),
    );
    expect(r.total).toBe(2700);
    expect(r.forms[0]).toMatchObject({
      damage: 14,
      accuracyBonus: 1,
      defense: 3,
      magicDefense: 3,
      damageType: 'luz',
    });
  });

  it('Precisão +1 is refused when the weapon already gives +1 or more', () => {
    const certeira = single(
      form('Espadas', [
        'certeira',
        'aumento-na-defesa',
        'aumento-na-defesa-magica',
      ]),
    );
    expect(
      alterationState(rare, completeBase(certeira), choice(), 'accuracy'),
    ).toMatchObject({ disabled: true });
  });

  it('a Custom Weapon never becomes a one-handed weapon', () => {
    const base = completeBase(
      single(
        form('Espadas', [
          'certeira',
          'aumento-na-defesa',
          'aumento-na-defesa-magica',
        ]),
      ),
    );
    expect(alterationState(rare, base, choice(), 'one-handed')).toMatchObject({
      disabled: true,
      reason: expect.stringContaining('personalizada'),
    });
  });

  it('two-handed is refused for daggers, thrown and fighting weapons, but works for a one-hand hammer', () => {
    expect(
      alterationState(rare, basic('Adaga de aço'), choice(), 'two-handed')
        .disabled,
    ).toBe(true);
    const hammer = basic('Martelo de ferro');
    expect(alterationState(rare, hammer, choice(), 'two-handed').disabled).toBe(
      false,
    );
    const r = computeRare(
      rare,
      hammer,
      choice({ alterations: ['two-handed'] }),
    );
    expect(r.forms[0]).toMatchObject({ hands: 2, damage: 10 });
    expect(r.total).toBe(200);
  });

  it('one-handed lowers the damage by 4 on a two-handed basic weapon', () => {
    const r = computeRare(
      rare,
      basic('Machado de guerra'),
      choice({ alterations: ['one-handed'] }),
    );
    expect(r.forms[0]).toMatchObject({ hands: 1, damage: 10 });
  });

  it('a damage modifier of +10 or more makes the weapon martial', () => {
    const base: RareBase = {
      ...basic('Martelo de ferro'),
      forms: [
        { ...basic('Martelo de ferro').forms[0], martial: false, damage: 6 },
      ],
    };
    expect(computeRare(rare, base, choice()).forms[0].martial).toBe(false);
    const r = computeRare(rare, base, choice({ alterations: ['damage'] }));
    expect(r.forms[0]).toMatchObject({ damage: 10, martial: true });
  });

  it('changing the Precisão attributes costs +50z only for a single attribute', () => {
    const base = basic('Machado de guerra');
    const pair = computeRare(
      rare,
      base,
      choice({ alterations: ['attributes'], attributes: ['DES', 'VIG'] }),
    );
    expect(pair.total).toBe(250);
    expect(pair.forms[0].attributes).toEqual(['DES', 'VIG']);
    const one = computeRare(
      rare,
      base,
      choice({ alterations: ['attributes'], attributes: ['DES', 'DES'] }),
    );
    expect(one.total).toBe(300);
  });

  it('a feature adds its price and its Defesa bonus; a custom effect uses the typed price', () => {
    const base = basic('Machado de guerra');
    const wall = computeRare(rare, base, choice({ featureId: 'baluarte' }));
    expect(wall.total).toBe(1050);
    expect(wall.forms[0].defense).toBe(1);
    const own = computeRare(
      rare,
      base,
      choice({
        featureId: 'custom',
        customEffect: { text: 'Recupera 5 PV ao atingir', cost: 900 },
      }),
    );
    expect(own.total).toBe(1150);
    expect(own.forms[0].feature?.summary).toContain('Recupera 5 PV');
  });

  it('a custom effect with no text is reported', () => {
    const r = computeRare(
      rare,
      basic('Machado de guerra'),
      choice({ featureId: 'custom', customEffect: { text: '  ', cost: 100 } }),
    );
    expect(r.problems.join(' ')).toContain('efeito');
  });

  it('the damage type is refused when the weapon already has one', () => {
    const fire = completeBase(
      single(
        form('Espadas', ['elemental', 'certeira', 'aumento-na-defesa'], {
          damageType: 'fogo',
        }),
      ),
    );
    const r = computeRare(rare, fire, choice({ damageType: 'gelo' }));
    expect(r.problems.join(' ')).toContain('dano');
  });

  it('explains its steps with a cost breakdown that adds up', () => {
    const r = computeRare(
      rare,
      basic('Machado de guerra'),
      choice({ damageType: 'ar', alterations: ['damage'], featureId: 'multi' }),
    );
    expect(r.cost.map((l) => l.amount)).toEqual([250, 100, 200, 1000]);
    expect(r.cost.reduce((sum, l) => sum + l.amount, 0)).toBe(r.total);
  });
});

describe('formatting', () => {
  it('prints zenites with the Brazilian thousands separator', () => {
    expect(formatZ(1200)).toBe('1.200z');
    expect(formatZ(300)).toBe('300z');
  });

  it('prints the stat line like the entries do', () => {
    const r = computeRare(
      rare,
      completeBase(
        single(
          form(
            'Espadas',
            ['poderosa', 'aumento-na-defesa', 'aumento-na-defesa-magica'],
            { accuracy: 'DES + VIG' },
          ),
        ),
      ),
      choice({ damageType: 'luz', alterations: ['damage'] }),
    );
    expect(statLine(r.forms[0], 'rare')).toBe(
      'Arma rara marcial (Espadas), duas mãos, corpo a corpo. Precisão (DES + VIG), dano (RA + 14) luz.',
    );
    const plain = single(form('Arcos', [], { range: 'ranged' }));
    expect(statLine(plain.forms[0], 'custom')).toBe(
      'Arma personalizada (Arcos), duas mãos, à distância. Precisão (DES + AST), dano (RA + 5) físico.',
    );
  });
});
