import type {
  AssemblySlot,
  LevelGrant,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  Role,
  RoleAttackTemplate,
} from '../../entries/entry-types';

import { quickAssemblySkills } from './quick-assembly-skills';

/**
 * Numbers of Quick Assembly (Bestiary Vol. I, English, printed p. 25-53), with the
 * texts in our own words. Keep this file importing only types: the web tests
 * read it to check the builder against the book's own example (p. 28).
 */

export const quickAssemblyRules: QuickAssemblyRuleDetails = {
  forge: 'quick-assembly',
  levels: [5, 10, 20, 30, 40, 50, 60],
  amounts: [
    { fromLevel: 5, minor: 10, heavy: 30, massive: 40 },
    { fromLevel: 20, minor: 20, heavy: 40, massive: 60 },
    { fromLevel: 40, minor: 30, heavy: 50, massive: 80 },
  ],
  elite: { hpMultiplier: 2, initiative: 2, roleSkills: 1 },
  champion: { mpMultiplier: 2, bossSkills: 1 },
  extraHp: 10,
  villainTiers: { minor: 5, major: 10, supreme: 15 },
};

const status = (id: string, count = 1, only?: string[]): AssemblySlot => {
  const all = [
    ['dazed', 'atordoado'],
    ['enraged', 'enfurecido'],
    ['poisoned', 'envenenado'],
    ['shaken', 'abalado'],
    ['slow', 'lento'],
    ['weak', 'fraco'],
  ];
  return {
    id,
    label: count === 1 ? 'Condição' : 'Condições',
    count,
    options: all
      .filter(([value]) => !only || only.includes(value))
      .map(([value, label]) => ({ value, label })),
  };
};

const ACTION = 'Ataque';

const row = (
  level: number,
  attributes: QuickAssemblyRoleDetails['progression'][number]['attributes'],
  hp: number,
  mp: number,
  extraDamage: number,
): QuickAssemblyRoleDetails['progression'][number] => ({
  level,
  attributes,
  hp,
  mp,
  accuracy: level / 10,
  extraDamage,
});

const skillsAt = (...levels: number[]): LevelGrant[] =>
  levels.map((level) => ({ level, roleSkills: 1 }));

const normal = (
  extra: Partial<RoleAttackTemplate> &
    Pick<RoleAttackTemplate, 'accuracies' | 'damage'>,
): RoleAttackTemplate => ({
  id: 'normal',
  name: `${ACTION} Normal`,
  ranges: ['melee', 'ranged'],
  ...extra,
});

const strong = (
  extra: Partial<RoleAttackTemplate> &
    Pick<RoleAttackTemplate, 'accuracies' | 'damage'>,
): RoleAttackTemplate => ({
  id: 'strong',
  name: `${ACTION} Forte`,
  ranges: ['melee'],
  ...extra,
});

const brute: QuickAssemblyRoleDetails = {
  forge: 'quick-assembly-role',
  role: 'brute',
  base: {
    attributes: { DES: 8, AST: 6, VIG: 10, VON: 8 },
    hp: 70,
    mp: 45,
    initiative: 7,
    defense: 0,
    magicDefense: 0,
    vulnerabilities: 2,
  },
  progression: [
    row(10, {}, 80, 50, 0),
    row(20, { AST: 8 }, 100, 60, 5),
    row(30, { AST: 8 }, 120, 70, 5),
    row(40, { AST: 8, VIG: 12 }, 150, 80, 10),
    row(50, { AST: 8, VIG: 12 }, 180, 90, 10),
    row(60, { AST: 8, VIG: 12, VON: 10 }, 200, 110, 15),
  ],
  grants: [
    { level: 10, resistances: 2 },
    ...skillsAt(20),
    { level: 30, immunities: 1 },
    ...skillsAt(40),
    ...skillsAt(60),
  ],
  attacks: [
    normal({
      accuracies: ['DES + VIG'],
      damage: 5,
      effect: 'O ataque tem multi (2).',
    }),
    strong({ accuracies: ['VIG + VIG'], damage: 10 }),
  ],
  ...quickAssemblySkills.brute,
};

const hunter: QuickAssemblyRoleDetails = {
  forge: 'quick-assembly-role',
  role: 'hunter',
  base: {
    attributes: { DES: 10, AST: 8, VIG: 8, VON: 6 },
    hp: 50,
    mp: 35,
    initiative: 9,
    defense: 0,
    magicDefense: 0,
    vulnerabilities: 1,
  },
  progression: [
    row(10, {}, 60, 40, 0),
    row(20, { VON: 8 }, 80, 60, 5),
    row(30, { VON: 8 }, 100, 70, 5),
    row(40, { DES: 12, VON: 8 }, 120, 80, 10),
    row(50, { DES: 12, VON: 8 }, 140, 90, 10),
    row(60, { DES: 12, AST: 10, VON: 8 }, 160, 100, 15),
  ],
  grants: [
    { level: 10, accuracy: 3 },
    ...skillsAt(20),
    {
      level: 30,
      rule: 'Enquanto estiver em crise, o dano do ataque normal ignora Resistências.',
    },
    ...skillsAt(40),
    { level: 50, resistances: 2 },
    ...skillsAt(60),
  ],
  attacks: [
    normal({
      accuracies: ['DES + AST', 'DES + VIG'],
      damage: 10,
      options: [
        {
          id: 'drain',
          label: 'Recupera PV',
          effect:
            'Se o ataque fizer um ou mais inimigos perderem PV, o NPC recupera PV iguais à metade do total perdido por eles.',
        },
        {
          id: 'bonus',
          label: 'Dano extra contra alvos em certa situação',
          effect: 'Causa 5 de dano adicional contra inimigos que {situation}.',
          slots: [
            {
              id: 'situation',
              label: 'Situação',
              count: 1,
              options: [
                ['status', 'estejam sofrendo uma condição específica'],
                ['two-statuses', 'estejam sofrendo duas ou mais condições'],
                ['not-crisis', 'não estejam em crise'],
                ['crisis', 'estejam em crise'],
                ['acted', 'já tenham agido nesta rodada'],
                [
                  'scene-spells',
                  'estejam sob efeito de feitiços com duração Cena',
                ],
                ['armor', 'estejam usando armadura marcial'],
                ['no-armor', 'não estejam usando armadura marcial'],
              ].map(([value, label]) => ({ value, label })),
            },
          ],
        },
      ],
    }),
  ],
  ...quickAssemblySkills.hunter,
};

const mage: QuickAssemblyRoleDetails = {
  forge: 'quick-assembly-role',
  role: 'mage',
  base: {
    attributes: { DES: 8, AST: 8, VIG: 6, VON: 10 },
    hp: 40,
    mp: 55,
    initiative: 8,
    defense: 1,
    magicDefense: 2,
    vulnerabilities: 1,
  },
  progression: [
    row(10, {}, 50, 60, 0),
    row(20, { AST: 10 }, 70, 70, 5),
    row(30, { AST: 10 }, 90, 80, 5),
    row(40, { AST: 10, VON: 12 }, 110, 100, 10),
    row(50, { AST: 10, VON: 12 }, 130, 110, 10),
    row(60, { AST: 10, VIG: 8, VON: 12 }, 160, 120, 15),
  ],
  grants: [
    {
      level: 10,
      rule: 'O ataque normal atinge a Defesa Mágica em vez da Defesa.',
    },
    ...skillsAt(20),
    { level: 30, immunities: 1 },
    ...skillsAt(40),
    { level: 50, rule: 'Recebe +3 em testes de Magia.' },
    ...skillsAt(60),
  ],
  attacks: [normal({ accuracies: ['DES + AST', 'AST + VON'], damage: 5 })],
  ...quickAssemblySkills.mage,
};

const saboteur: QuickAssemblyRoleDetails = {
  forge: 'quick-assembly-role',
  role: 'saboteur',
  base: {
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 50,
    mp: 45,
    initiative: 8,
    defense: 2,
    magicDefense: 1,
    vulnerabilities: 1,
  },
  progression: [
    row(10, {}, 60, 50, 0),
    row(20, { VON: 10 }, 80, 70, 5),
    row(30, { VON: 10 }, 100, 80, 5),
    row(40, { AST: 10, VON: 10 }, 120, 90, 10),
    row(50, { AST: 10, VON: 10 }, 140, 100, 10),
    row(60, { DES: 10, AST: 10, VON: 10 }, 160, 110, 15),
  ],
  grants: [
    {
      level: 10,
      rule: 'Recebe +3 em testes de {bonus}.',
      slots: [
        {
          id: 'bonus',
          label: 'Bônus de +3 em',
          count: 1,
          options: [
            { value: 'accuracy', label: 'Precisão' },
            { value: 'magic', label: 'Magia' },
          ],
        },
      ],
    },
    ...skillsAt(20),
    {
      level: 30,
      rule: 'Enquanto não estiver em crise, o dano do ataque normal ignora Resistências.',
    },
    ...skillsAt(40),
    { level: 50, immunities: 1 },
    ...skillsAt(60),
  ],
  attacks: [
    normal({
      accuracies: ['DES + AST', 'DES + VON'],
      damage: 5,
      options: [
        {
          id: 'mp',
          label: 'Drena PM',
          effect: 'Cada alvo atingido perde {minor} PM.',
        },
        {
          id: 'inventory',
          label: 'Drena PI',
          effect: 'Cada alvo atingido perde 1 PI.',
        },
        {
          id: 'status',
          label: 'Causa uma condição',
          effect: 'Cada alvo atingido sofre a condição {status}.',
          slots: [status('status')],
          extraVulnerability: {
            slot: 'status',
            values: ['enraged', 'poisoned'],
          },
        },
      ],
    }),
  ],
  ...quickAssemblySkills.saboteur,
};

const sentinel: QuickAssemblyRoleDetails = {
  forge: 'quick-assembly-role',
  role: 'sentinel',
  base: {
    attributes: { DES: 8, AST: 8, VIG: 8, VON: 8 },
    hp: 50,
    mp: 45,
    initiative: 8,
    defense: 2,
    magicDefense: 1,
    vulnerabilities: 2,
  },
  progression: [
    row(10, {}, 60, 50, 0),
    row(20, { VIG: 10 }, 90, 60, 5),
    row(30, { VIG: 10 }, 110, 70, 5),
    row(40, { VIG: 10, VON: 10 }, 130, 90, 10),
    row(50, { VIG: 10, VON: 10 }, 150, 100, 10),
    row(60, { DES: 10, VIG: 10, VON: 10 }, 170, 110, 15),
  ],
  grants: [
    { level: 10, resistances: 2, notPhysical: true },
    ...skillsAt(20),
    { level: 30, defense: 2, magicDefense: 1 },
    ...skillsAt(40),
    {
      level: 50,
      rule: 'Imune às condições {immune}.',
      slots: [
        {
          ...status('immune', 2, ['poisoned', 'shaken', 'weak']),
          label: 'Imunidade a',
        },
      ],
    },
    ...skillsAt(60),
  ],
  attacks: [
    normal({
      accuracies: ['DES + VIG'],
      damage: 5,
      effect: 'Cada alvo atingido sofre a condição {status}.',
      slots: [status('status', 1, ['dazed', 'shaken', 'slow', 'weak'])],
    }),
    strong({
      ranges: ['melee', 'ranged'],
      accuracies: ['DES + VIG'],
      damage: 10,
    }),
  ],
  ...quickAssemblySkills.sentinel,
};

const support: QuickAssemblyRoleDetails = {
  forge: 'quick-assembly-role',
  role: 'support',
  base: {
    attributes: { DES: 8, AST: 8, VIG: 6, VON: 10 },
    hp: 50,
    mp: 55,
    initiative: 8,
    defense: 0,
    magicDefense: 0,
    vulnerabilities: 1,
  },
  progression: [
    row(10, {}, 60, 60, 0),
    row(20, { AST: 10 }, 80, 70, 5),
    row(30, { AST: 10 }, 100, 80, 5),
    row(40, { AST: 10, VIG: 8 }, 130, 90, 10),
    row(50, { AST: 10, VIG: 8 }, 150, 100, 10),
    row(60, { AST: 12, VIG: 8 }, 170, 110, 15),
  ],
  grants: [
    { level: 10, resistances: 2, notPhysical: true },
    ...skillsAt(20),
    { level: 30, defense: 1, magicDefense: 2 },
    ...skillsAt(40),
    { level: 50, immunities: 1, notPhysical: true },
    ...skillsAt(60),
  ],
  attacks: [normal({ accuracies: ['DES + VON', 'AST + VON'], damage: 5 })],
  ...quickAssemblySkills.support,
};

export const quickAssemblyRoles: Record<Role, QuickAssemblyRoleDetails> = {
  brute,
  hunter,
  mage,
  saboteur,
  sentinel,
  support,
};
