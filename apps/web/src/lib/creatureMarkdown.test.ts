import { describe, expect, it } from 'vitest';
import type { CreatureDetails } from '../api/types';
import { creatureToMarkdown } from './creatureMarkdown';

const base: CreatureDetails = {
  level: 30,
  species: 'construct',
  rank: 'elite',
  role: 'brute',
  villain: false,
  traits: ['bulky', 'destructive'],
  attributes: { DES: 8, AST: 8, VIG: 10, VON: 8 },
  hp: 260,
  crisis: 130,
  mp: 70,
  initiative: 10,
  defense: { value: 0, fixed: false },
  magicDefense: 0,
  hasSpells: false,
  affinities: {
    dark: 'resistant',
    bolt: 'vulnerable',
    ice: 'vulnerable',
    air: 'immune',
  },
  attacks: [
    {
      name: 'Missile Salvo',
      range: 'ranged',
      accuracy: 'DES + VIG',
      accuracyBonus: 3,
      damage: 10,
      damageType: 'fire',
      effect: 'O ataque tem multi (2).',
    },
    {
      name: 'Steel Bash',
      range: 'melee',
      accuracy: 'VIG + VIG',
      accuracyBonus: 3,
      damage: 15,
      damageType: 'physical',
    },
  ],
  spells: [],
  otherActions: [],
  specialRules: [],
};

describe('creatureToMarkdown', () => {
  it('writes the stat block in the order the bestiary prints it, in PT-BR', () => {
    expect(creatureToMarkdown('Juggernaut', base, null)).toBe(
      [
        '# Juggernaut',
        'Nível 30 · Construto · Elite · Função: Bruto',
        '',
        '**Traços típicos:** bulky, destructive.',
        '',
        '**DES** d8 · **AST** d8 · **VIG** d10 · **VON** d8',
        '**PV** 260 (Crise 130) · **PM** 70 · **Inic.** 10 · **Defesa** +0 · **Def. Mágica** +0',
        '**Afinidades:** Imune a ar, Vulnerável a raio, Resistente a trevas, Vulnerável a gelo',
        '',
        '## Ataques básicos',
        '- **Missile Salvo** (à distância): (DES + VIG) +3 · (RA + 10) de dano de fogo. O ataque tem multi (2).',
        '- **Steel Bash** (corpo a corpo): (VIG + VIG) +3 · (RA + 15) de dano físico.',
      ].join('\n'),
    );
  });

  it('adds the Villain and its Ultima Points', () => {
    const text = creatureToMarkdown(
      'Juggernaut',
      { ...base, villain: true },
      10,
    );
    expect(text).toContain(
      'Nível 30 · Construto · Elite · Função: Bruto · Vilão',
    );
    expect(text).toContain('**Pontos de Ultima:** 10');
  });

  it('writes spells, other actions and special rules when there are some', () => {
    const text = creatureToMarkdown(
      'Mestre',
      {
        ...base,
        role: undefined,
        hasSpells: true,
        affinities: {},
        attacks: [],
        defense: { value: 11, fixed: true },
        magicDefense: -1,
        spells: [
          {
            name: 'Fulgur',
            mpCost: '10 × A',
            target: 'Até três criaturas',
            duration: 'Instantânea',
            offensive: true,
            accuracy: 'AST + VON',
            accuracyBonus: 3,
            effect: 'Causa (RA + 20) de dano de raio a cada alvo.',
          },
        ],
        otherActions: [{ name: 'Guarda Alta', effect: 'Ganha Resistência.' }],
        specialRules: [{ name: 'Planta', effect: 'Imune a abalado.' }],
      },
      null,
    );
    expect(text).toBe(
      [
        '# Mestre',
        'Nível 30 · Construto · Elite',
        '',
        '**Traços típicos:** bulky, destructive.',
        '',
        '**DES** d8 · **AST** d8 · **VIG** d10 · **VON** d8',
        '**PV** 260 (Crise 130) · **PM** 70 · **Inic.** 10 · **Defesa** 11 · **Def. Mágica** -1',
        '**Afinidades:** nenhuma',
        '',
        '## Feitiços',
        '- **Fulgur** (ofensivo · 10 × A PM · Até três criaturas · Instantânea): (AST + VON) +3. Causa (RA + 20) de dano de raio a cada alvo.',
        '',
        '## Outras ações',
        '- **Guarda Alta**: Ganha Resistência.',
        '',
        '## Regras especiais',
        '- **Planta**: Imune a abalado.',
      ].join('\n'),
    );
  });
});
