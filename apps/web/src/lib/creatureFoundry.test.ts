import { describe, expect, it } from 'vitest';
import type { CreatureDetails } from '../api/types';
import { creatureToFoundry } from './creatureFoundry';

/** The "Black Ram" the Fultimator database exports, as the Laboratório would assemble it. */
const blackRam: CreatureDetails = {
  level: 30,
  species: 'demon',
  rank: 'champion',
  role: 'brute',
  villain: false,
  traits: ['Otherworldly', 'Stoic', 'Menacing', 'Powerful'],
  attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
  hp: 330,
  crisis: 165,
  mp: 140,
  initiative: 11,
  defense: { value: 4, fixed: false },
  magicDefense: 2,
  hasSpells: true,
  affinities: {
    ice: 'resistant',
    earth: 'absorbs',
    dark: 'resistant',
    fire: 'vulnerable',
    bolt: 'resistant',
    poison: 'resistant',
    physical: 'resistant',
    light: 'vulnerable',
  },
  attacks: [
    {
      name: 'Normal Attack - Ram',
      range: 'melee',
      accuracy: 'DES + VIG',
      accuracyBonus: 3,
      damage: 10,
      damageType: 'physical',
      effect: 'Each target hit by this attack suffers Dazed.',
    },
    {
      name: 'Strong Attack - Corrupted Land',
      range: 'ranged',
      accuracy: 'DES + VIG',
      accuracyBonus: 3,
      damage: 15,
      damageType: 'earth',
    },
  ],
  spells: [
    {
      name: 'Terminal Corruption',
      mpCost: '30',
      target: 'Special',
      duration: 'Instantaneous',
      offensive: false,
      effect:
        'Each creature the Black Ram can see suffers 10 points of dark damage.',
    },
  ],
  otherActions: [],
  specialRules: [{ name: 'Retaliation', effect: 'Free attack.' }],
};

const options = { championX: 3, tier: 'minor' } as const;

describe('creatureToFoundry', () => {
  it('reproduces the Fultimator Black Ram: no extra HP, MP or Initiative', () => {
    const { npc, warnings } = creatureToFoundry('Black Ram', blackRam, options);
    expect(warnings).toEqual([]);
    expect(npc).toMatchObject({
      name: 'Black Ram',
      species: 'Demon',
      lvl: 30,
      rank: 'champion3',
      villain: '',
      dataType: 'npc',
      attributes: { might: 10, will: 8, dexterity: 8, insight: 8 },
      extra: { def: 4, mDef: 2 },
      affinities: {
        ice: 'rs',
        earth: 'ab',
        dark: 'rs',
        fire: 'vu',
        bolt: 'rs',
        poison: 'rs',
        physical: 'rs',
        light: 'vu',
      },
    });
  });

  it('keeps only the part of an attack that Fultimator does not already add', () => {
    const { npc } = creatureToFoundry('Black Ram', blackRam, options);
    const [normal, strong] = npc.attacks;
    expect(normal).toMatchObject({
      range: 'melee',
      attr1: 'dexterity',
      attr2: 'might',
      type: 'physical',
    });
    expect(normal.extraDamage).toBeUndefined();
    expect(normal.flatdmg).toBeUndefined();
    expect(normal.flathit).toBeUndefined();
    expect(normal.special).toEqual([
      'Each target hit by this attack suffers Dazed.',
    ]);
    expect(strong).toMatchObject({
      range: 'distance',
      type: 'earth',
      extraDamage: true,
    });
    expect(strong.flatdmg).toBeUndefined();
  });

  it('writes the difference when the assembled numbers are above the book formulas', () => {
    const { npc } = creatureToFoundry(
      'Juggernaut',
      {
        ...blackRam,
        rank: 'elite',
        hp: 260, // (60 + 50 + 20) × 2
        mp: 80, // 30 + 40 + 10
        initiative: 12, // 8 + 2 + 2
        defense: { value: 12, fixed: true },
        attacks: [{ ...blackRam.attacks[0], accuracyBonus: 4, damage: 17 }],
      },
      options,
    );
    expect(npc.rank).toBe('elite');
    expect(npc.extra).toMatchObject({
      hp: '20',
      mp: '10',
      extrainit: 2,
      defOverride: true,
      def: 12,
    });
    expect(npc.attacks[0]).toMatchObject({
      extraDamage: true,
      flatdmg: '2',
      flathit: '1',
    });
  });

  it('maps air to wind, villain tier and condition immunities', () => {
    const { npc } = creatureToFoundry(
      'Golem',
      { ...blackRam, villain: true, affinities: { air: 'immune' } },
      { championX: 1, tier: 'major', statusImmunities: ['poisoned'] },
    );
    expect(npc.affinities).toEqual({ wind: 'im' });
    expect(npc.villain).toBe('major');
    expect(npc.rank).toBe('champion1');
    expect(npc.immunities).toEqual({ poisoned: true });
  });

  it('warns when the HP cannot be held exactly', () => {
    const { warnings } = creatureToFoundry(
      'Odd',
      { ...blackRam, hp: 331 },
      options,
    );
    expect(warnings[0]).toMatch(/PV 331/);
  });

  it('marks a damage-less attack and a rule-set type', () => {
    const { npc, warnings } = creatureToFoundry(
      'X',
      {
        ...blackRam,
        attacks: [
          { ...blackRam.attacks[0], damage: null },
          { ...blackRam.attacks[1], damageType: null },
        ],
      },
      options,
    );
    expect(npc.attacks[0].type).toBe('nodmg');
    expect(npc.attacks[1].type).toBe('physical');
    expect(warnings).toHaveLength(1);
  });
});
