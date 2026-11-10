import { describe, expect, it } from 'vitest';
import {
  quickAssemblyRoles,
  quickAssemblyRules,
} from '../../../api/src/database/seed-data/quick-assembly-data';
import { assembleCreature, type AssemblyInput } from './creatureAssembly';

const input = (over: Partial<AssemblyInput> = {}): AssemblyInput => ({
  name: 'Criatura',
  level: 5,
  rank: 'soldier',
  championX: 2,
  customization: null,
  skills: {},
  species: 'monster',
  traits: [],
  villain: false,
  tier: 'minor',
  vulnerabilities: [],
  resistances: [],
  immunities: [],
  attacks: {},
  choices: {},
  ...over,
});

const assemble = (
  role: keyof typeof quickAssemblyRoles,
  over?: Partial<AssemblyInput>,
) =>
  assembleCreature(quickAssemblyRules, quickAssemblyRoles[role], input(over));

describe('assembleCreature: the Juggernaut of the book (Bestiary Vol. I p. 28)', () => {
  // "a level 30 elite brute enemy, a bright red construct": Insight d8, Initiative
  // +3 (2 for elite, 1 for the die), 240 Hit Points and 70 Mind Points, then +10 Hit
  // Points doubled by the rank (260). Both attacks deal 5 extra damage and have +3.
  const juggernaut = () =>
    assemble('brute', {
      name: 'Juggernaut',
      level: 30,
      rank: 'elite',
      customization: 'extra',
      species: 'construct',
      traits: ['bulky', 'destructive', 'predictable', 'watchful'],
      vulnerabilities: ['bolt', 'ice'],
      resistances: ['dark', 'physical'],
      immunities: ['air'],
      // "Enhancing Guard (tied to the missile salvo) and Steady Recovery".
      skills: {
        'enhancing-guard': { attack: ['normal'] },
        'steady-recovery': {},
      },
      attacks: {
        normal: {
          name: 'Missile Salvo',
          range: 'ranged',
          accuracy: 'DES + VIG',
          damageType: 'fire',
          choices: {},
        },
        strong: {
          name: 'Steel Bash',
          range: 'melee',
          accuracy: 'VIG + VIG',
          damageType: 'physical',
          choices: {},
        },
      },
    });

  it('has the numbers the book works out', () => {
    const { details } = juggernaut();
    expect(details.attributes).toEqual({ DES: 8, AST: 8, VIG: 10, VON: 8 });
    expect(details.hp).toBe(260);
    expect(details.crisis).toBe(130);
    expect(details.mp).toBe(70);
    // 7 at level 5 for a brute, plus 3.
    expect(details.initiative).toBe(10);
    expect(details.level).toBe(30);
    expect(details.rank).toBe('elite');
    expect(details.role).toBe('brute');
  });

  it('gives both attacks +3 accuracy and 5 extra damage', () => {
    const { details } = juggernaut();
    expect(
      details.attacks.map((a) => [
        a.name,
        a.range,
        a.accuracyBonus,
        a.damage,
        a.damageType,
      ]),
    ).toEqual([
      ['Missile Salvo', 'ranged', 3, 10, 'fire'],
      ['Steel Bash', 'melee', 3, 15, 'physical'],
    ]);
  });

  it('keeps the two Role Skills the book adds (level 20 and elite)', () => {
    const result = juggernaut();
    expect(result.roleSkills).toBe(2);
    expect(result.bossSkills).toBe(0);
  });

  it('turns the chosen types into Vulnerabilities, Resistances and Immunities', () => {
    expect(juggernaut().details.affinities).toEqual({
      bolt: 'vulnerable',
      ice: 'vulnerable',
      dark: 'resistant',
      physical: 'resistant',
      air: 'immune',
    });
  });

  it('is complete: no warnings', () => {
    expect(juggernaut().warnings).toEqual([]);
  });
});

describe('assembleCreature: ranks and levels', () => {
  it('multiplies by X for a champion that replaces X soldiers', () => {
    // Hunter, level 20 (table: 80 PV, 60 PM, WLP d8): base Initiative 9, so +3 for X = 3.
    const result = assemble('hunter', {
      level: 20,
      rank: 'champion',
      championX: 3,
    });
    expect(result.details.hp).toBe(240);
    expect(result.details.mp).toBe(120);
    expect(result.details.initiative).toBe(12);
    // One Role Skill for level 20, plus X; one Boss Skill.
    expect(result.roleSkills).toBe(4);
    expect(result.bossSkills).toBe(1);
  });

  it('does not add the +10 Hit Points to a champion', () => {
    const result = assemble('brute', {
      level: 10,
      rank: 'champion',
      championX: 2,
      customization: 'extra',
    });
    expect(result.details.hp).toBe(160);
  });

  it('keeps the level 5 profile for a soldier', () => {
    const { details } = assemble('mage');
    expect(details.attributes).toEqual({ DES: 8, AST: 8, VIG: 6, VON: 10 });
    expect([
      details.hp,
      details.crisis,
      details.mp,
      details.initiative,
    ]).toEqual([40, 20, 55, 8]);
    expect([details.defense, details.magicDefense]).toEqual([
      { value: 1, fixed: false },
      2,
    ]);
  });

  it('adds the level bonuses to Defesa (sentinel, level 30)', () => {
    const { details } = assemble('sentinel', { level: 30 });
    expect([details.defense.value, details.magicDefense]).toEqual([4, 2]);
  });

  it('adds the Precisão bonus a level grants (hunter, level 10)', () => {
    const { details } = assemble('hunter', { level: 10 });
    // +1 for the level, +3 granted at level 10.
    expect(details.attacks[0].accuracyBonus).toBe(4);
  });

  it("adds the special rules a level grants, with the Reader's choice filled in", () => {
    const hunter = assemble('hunter', { level: 30 });
    expect(hunter.details.specialRules.map((r) => r.effect)).toEqual([
      'Enquanto estiver em crise, o dano do ataque normal ignora Resistências.',
    ]);
    const sentinel = assemble('sentinel', {
      level: 50,
      choices: { immune: ['poisoned', 'weak'] },
    });
    expect(sentinel.details.specialRules.map((r) => r.effect)).toContain(
      'Imune às condições envenenado e fraco.',
    );
  });
});

describe('assembleCreature: villains', () => {
  it('gives Ultima Points by tier, and none to an ordinary Creature', () => {
    expect(assemble('brute').ultimaPoints).toBeNull();
    expect(
      assemble('brute', { villain: true, tier: 'minor' }).ultimaPoints,
    ).toBe(5);
    expect(
      assemble('brute', { villain: true, tier: 'major' }).ultimaPoints,
    ).toBe(10);
    expect(
      assemble('brute', { villain: true, tier: 'supreme' }).ultimaPoints,
    ).toBe(15);
    expect(assemble('brute', { villain: true }).details.villain).toBe(true);
  });
});

describe('assembleCreature: basic attacks', () => {
  it("fills the Reader's choices into the text of the chosen option", () => {
    const sabotage = (option: string, choices: Record<string, string[]> = {}) =>
      assemble('saboteur', {
        level: 20,
        attacks: {
          normal: {
            range: 'melee',
            accuracy: 'DES + VON',
            damageType: 'poison',
            option,
            choices,
          },
        },
      }).details.attacks[0];

    // The minor amount is 20 from level 20.
    expect(sabotage('mp').effect).toBe('Cada alvo atingido perde 20 PM.');
    expect(sabotage('inventory').effect).toBe('Cada alvo atingido perde 1 PI.');
    expect(sabotage('status', { status: ['slow'] }).effect).toBe(
      'Cada alvo atingido sofre a condição lento.',
    );
  });

  it('fills a choice of the attack itself (sentinel)', () => {
    const { details } = assemble('sentinel', {
      attacks: {
        normal: {
          range: 'melee',
          accuracy: 'DES + VIG',
          damageType: 'physical',
          choices: { status: ['shaken'] },
        },
      },
    });
    expect(details.attacks[0].effect).toBe(
      'Cada alvo atingido sofre a condição abalado.',
    );
  });

  it('names the attacks "Ataque Normal" and "Ataque Forte" until the Reader renames them', () => {
    const { details } = assemble('brute');
    expect(details.attacks.map((a) => a.name)).toEqual([
      'Ataque Normal',
      'Ataque Forte',
    ]);
    expect(details.attacks[0].effect).toBe('O ataque tem multi (2).');
  });

  it("prints the damage of a basic attack as RA plus the table value and the level's extra", () => {
    const { details } = assemble('brute', { level: 40 });
    // Normal RA + 5, strong RA + 10, plus 10 extra damage at level 40.
    expect(details.attacks.map((a) => a.damage)).toEqual([15, 20]);
  });
});

describe('assembleCreature: what is still missing', () => {
  it('asks for the Vulnerabilities, Resistances and Immunities the Role and level require', () => {
    const result = assemble('brute', { level: 30 });
    expect(result.required).toEqual({
      vulnerabilities: 2,
      resistances: 2,
      immunities: 1,
    });
    expect(result.warnings).toEqual([
      'Escolha 2 Vulnerabilidades (há 0).',
      'Escolha 2 Resistências (há 0).',
      'Escolha 1 Imunidade (há 0).',
      'Escolha 1 poder de função (há 0).',
    ]);
  });

  it('asks for one more Vulnerability when the Reader picks enraged or poisoned', () => {
    const base = {
      vulnerabilities: ['fire'] as const,
      attacks: {
        normal: {
          range: 'melee' as const,
          accuracy: 'DES + AST',
          damageType: 'physical' as const,
          option: 'status',
        },
      },
    };
    const calm = assemble('saboteur', {
      vulnerabilities: [...base.vulnerabilities],
      attacks: {
        normal: { ...base.attacks.normal, choices: { status: ['slow'] } },
      },
    });
    const angry = assemble('saboteur', {
      vulnerabilities: [...base.vulnerabilities],
      attacks: {
        normal: { ...base.attacks.normal, choices: { status: ['enraged'] } },
      },
    });
    expect(calm.required.vulnerabilities).toBe(1);
    expect(calm.warnings).toEqual([]);
    expect(angry.required.vulnerabilities).toBe(2);
    expect(angry.warnings).toEqual(['Escolha 2 Vulnerabilidades (há 1).']);
  });

  it('warns, never blocks, when a damage type has two Affinities', () => {
    const result = assemble('mage', {
      vulnerabilities: ['fire'],
      resistances: ['fire'],
    });
    expect(result.warnings).toContain('Fogo tem mais de uma Afinidade.');
    expect(result.details.affinities.fire).toBe('vulnerable');
  });

  it('asks the Reader to pick a basic-attack option the Role requires', () => {
    const result = assemble('saboteur', { vulnerabilities: ['fire'] });
    expect(result.warnings).toEqual([
      'Escolha uma opção para o Ataque Normal.',
    ]);
  });

  it('rejects an illegal level only by warning', () => {
    const result = assemble('mage', { level: 15, vulnerabilities: ['fire'] });
    expect(result.warnings).toContain(
      'O nível deve ser 5, 10, 20, 30, 40, 50 ou 60.',
    );
  });
});

describe('assembleCreature: Role Skills', () => {
  const brute = (over: Partial<AssemblyInput> = {}) => assemble('brute', over);
  const sentinel = (over: Partial<AssemblyInput> = {}) =>
    assemble('sentinel', over);

  it('adds a named Skill as a special rule or an "outra ação"', () => {
    const { details } = brute({
      level: 20,
      skills: { 'steady-recovery': {}, crush: {} },
    });
    expect(details.specialRules.map((r) => r.name)).toContain(
      'Recuperação Constante',
    );
    const crush = details.otherActions.find((a) => a.name === 'Esmagar');
    expect(crush?.effect).toContain(
      'perder 20 PV (30 PV se o NPC for de nível 30 ou mais)',
    );
  });

  it('writes a Skill that changes an attack into the text of that attack', () => {
    const { details } = brute({
      level: 20,
      skills: { crush: {}, 'normal-magic-defense': {} },
    });
    const [normal, strong] = details.attacks;
    expect(normal.effect).toBe(
      'O ataque tem multi (2). Atinge a Defesa Mágica em vez da Defesa.',
    );
    expect(strong.effect).toContain('ficam envolvidas');
  });

  it('lets a Skill turn the strong attack ranged with another formula', () => {
    const { details } = brute({
      level: 20,
      skills: { 'ranged-strong': { condition: ['slow'] } },
    });
    const strong = details.attacks[1];
    expect([strong.range, strong.accuracy]).toEqual(['ranged', 'DES + VIG']);
    expect(strong.effect).toBe('Cada alvo atingido sofre a condição lento.');
  });

  it('fills the choices of a Skill into its text, joining several with "e"', () => {
    const { details } = sentinel({
      level: 20,
      skills: { barricade: { types: ['fire', 'ice'] } },
    });
    expect(details.otherActions[0]).toEqual({
      name: 'Barricada',
      effect: expect.stringContaining('Resistentes a dano do tipo fogo e gelo'),
    });
  });

  it('accepts one damage type for the Barricada, but asks for at least one', () => {
    const one = sentinel({
      level: 20,
      skills: { barricade: { types: ['fire'] } },
    });
    expect(one.warnings.join(' ')).not.toContain('Tipos de dano');
    const none = sentinel({ level: 20, skills: { barricade: { types: [] } } });
    expect(none.warnings).toContain('Escolha tipos de dano em Barricada.');
  });

  it("adds the strong attack a Skill gives (hunter), with the Reader's picks", () => {
    const { details } = assemble('hunter', {
      level: 20,
      skills: { 'strong-attack': {} },
      attacks: {
        strong: {
          name: 'Golpe Mortal',
          range: 'melee',
          accuracy: 'DES + VIG',
          damageType: 'dark',
          choices: {},
        },
      },
    });
    const strong = details.attacks.find((a) => a.name === 'Golpe Mortal');
    // RA + 15, plus 5 extra damage at level 20; +2 from the table and +3 the hunter gets at level 10.
    expect([strong?.damage, strong?.accuracyBonus, strong?.damageType]).toEqual(
      [20, 5, 'dark'],
    );
    expect(strong?.effect).toContain('multi (2)');
  });

  it('applies a Skill to the strong attack only when there is one', () => {
    const result = assemble('hunter', {
      level: 20,
      skills: { 'strong-magic-defense': {} },
    });
    expect(result.warnings).toContain(
      'Ataque forte contra Defesa Mágica precisa de um ataque forte.',
    );
    const withStrong = assemble('hunter', {
      level: 20,
      skills: { 'strong-attack': {}, 'strong-magic-defense': {} },
    });
    expect(withStrong.details.attacks[1].effect).toContain(
      'Atinge a Defesa Mágica',
    );
  });

  it('warns when a soldier takes a Skill that is for elites and champions only', () => {
    const result = brute({
      level: 20,
      skills: { collapse: { type: ['fire'] } },
    });
    expect(result.warnings).toContain(
      'Relógio de Colapso é só para elite e campeão.',
    );
    const elite = brute({
      level: 20,
      rank: 'elite',
      skills: { collapse: { type: ['fire'] } },
    });
    expect(elite.warnings.join(' ')).not.toContain('só para');
  });

  it('counts the Skills against what the level and rank give', () => {
    // A level 5 soldier gets none; an elite gets one.
    expect(brute({ skills: { 'steady-recovery': {} } }).warnings).toContain(
      'Há 1 poder de função, mas o perfil dá 0.',
    );
    expect(brute({ rank: 'elite' }).warnings).toContain(
      'Escolha 1 poder de função (há 0).',
    );
    const done = brute({ rank: 'elite', skills: { 'steady-recovery': {} } });
    expect(done.warnings.join(' ')).not.toContain('poder de função');
  });

  it('asks for the choices of a picked Skill', () => {
    const result = brute({ level: 20, skills: { 'ranged-strong': {} } });
    expect(result.warnings).toContain(
      'Escolha condição em Ataque forte à distância.',
    );
  });

  it('ignores a Skill id the Role does not have', () => {
    expect(
      brute({ level: 20, skills: { nonsense: {} } }).details.specialRules,
    ).toEqual([]);
  });

  it('asks for more Resistances and Vulnerabilities when a Skill adds them', () => {
    // The 2 the level 10 grant already asks for, plus the 2 of the Skill.
    expect(
      sentinel({ level: 20, skills: { 'resist-two': {} } }).required
        .resistances,
    ).toBe(4);
    const support = assemble('support', {
      level: 40,
      rank: 'champion',
      championX: 2,
      skills: {
        'advise-and-inspire': { resource: ['hp'], attribute: ['VON'] },
      },
    });
    expect(support.required.vulnerabilities).toBe(2);
    expect(support.details.otherActions.map((a) => a.name)).toEqual([
      'Aconselhar',
      'Inspirar',
    ]);
    // The minor amount of level 40 is 30.
    expect(support.details.otherActions[1].effect).toContain(
      'uma quantidade pequena (30) de PV',
    );
    expect(support.details.otherActions[1].effect).toContain('dado de Vontade');
  });
});

describe('assembleCreature: customization', () => {
  it('gives a brute +10 Hit Points (before the Rank multiplier) and nothing for a champion', () => {
    const soldier = assemble('brute', { customization: 'extra' });
    expect(soldier.details.hp).toBe(80);
    const champion = assemble('brute', {
      rank: 'champion',
      customization: 'extra',
    });
    expect(champion.details.hp).toBe(140);
    expect(champion.warnings).toContain(
      'Campeões não escolhem personalização.',
    );
  });

  it('gives a mage an Immunity to choose, and the others one more Role Skill', () => {
    expect(
      assemble('mage', { customization: 'extra' }).required.immunities,
    ).toBe(1);
    const hunter = assemble('hunter', {
      rank: 'elite',
      customization: 'extra',
    });
    // Elite 1 + customization 1 = 2 Skills to pick.
    expect(hunter.warnings).toContain('Escolha 2 poderes de função (há 0).');
  });

  it('adds a customization as a special rule, with its choice filled in', () => {
    const { details } = assemble('brute', {
      customization: 'c:bad-temper',
      skills: { 'c:bad-temper': { benefit: ['damage'] } },
    });
    expect(details.specialRules).toEqual([
      {
        name: 'Mau Humor',
        effect:
          'Enquanto estiver em crise, o NPC causa 5 de dano adicional com o ataque normal.',
      },
    ]);
  });
});
