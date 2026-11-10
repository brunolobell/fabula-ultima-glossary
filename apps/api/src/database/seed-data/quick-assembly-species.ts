import type {
  DamageType,
  SpeciesOption,
  SpeciesRule,
  SpellGrant,
  SpellRef,
} from '../../entries/entry-types';
import { damage, status } from './assembly-slots';

/**
 * The Species rules of Quick Assembly (Bestiary Vol. I, English, printed p. 70-73), in
 * our own words. They replace the Livro Básico's Species rules (p. 304-305) for a
 * Creature built this way. The book names the spells in English; each is the Livro
 * Básico NPC spell of the same effect. Keep this file importing only types and the
 * slot helpers.
 */

const OPTION_ONE: SpellGrant['options'] = [
  { id: 'one', label: 'Um feitiço e +10 PM', count: 1, mp: 10 },
];

const npc = (id: string, name: string): SpellRef => ({ kind: 'npc', id, name });

const NAMES: Record<string, string> = {
  'lick-wounds': 'Lamber Feridas',
  shell: 'Concha',
  'war-cry': 'Brado de Guerra',
  breath: 'Sopro',
  'curse-xl': 'Ultramaldição',
  'mind-theft': 'Roubo de Mana',
  weaken: 'Enfraquecer',
  'cursed-breath': 'Sopro Amaldiçoado',
  'life-theft': 'Roubo de Vida',
  poison: 'Envenenar',
  curse: 'Maldição',
};

const spell = (...ids: string[]): SpeciesOption => ({
  id: 'spell',
  label: 'Aprende um feitiço e ganha +10 PM',
  kind: 'spell',
  spells: { from: ids.map((id) => npc(id, NAMES[id])), options: OPTION_ONE },
});

const hp: SpeciesOption = {
  id: 'hp',
  label: '+10 PV máximos',
  kind: 'hp',
  amount: 10,
};

const flying: SpeciesOption = {
  id: 'flying',
  label: 'Poder Voo',
  kind: 'rule',
  rule: {
    name: 'Voo',
    text: 'Segue o poder de NPC Voo (Livro Básico, p. 309).',
  },
};

const roleSkill = (max?: number): SpeciesOption => ({
  id: 'role-skill',
  label: 'Um poder de função a mais',
  kind: 'role-skill',
  ...(max && { max }),
});

const resistances: SpeciesOption = {
  id: 'resistances',
  label: 'Resistência a dois tipos de dano (exceto físico)',
  kind: 'resistances',
};

const opposed = (context: string): SpeciesOption => ({
  id: 'opposed',
  label: 'Bônus de +3 em testes opostos',
  kind: 'rule',
  rule: {
    name: 'Bônus em testes opostos',
    text: `Recebe +3 em testes opostos ${context}.`,
  },
});

const absorb = (
  label: string,
  swaps: 'resistant' | 'immune',
  swapType?: DamageType,
): SpeciesOption => ({
  id: 'absorb',
  label,
  kind: 'absorb',
  swaps,
  // The book fixes the type only for the undead; otherwise the Reader picks it.
  ...(swapType ? { swapType } : { slots: [damage('type')] }),
});

const AIR_BOLT_FIRE_ICE: DamageType[] = ['air', 'bolt', 'fire', 'ice'];

export const speciesRules: SpeciesRule[] = [
  {
    species: 'beast',
    affinities: {},
    statusImmunities: [],
    picks: 2,
    options: [
      hp,
      spell('lick-wounds', 'shell', 'war-cry'),
      opposed(
        'em contextos que favoreçam as habilidades físicas da fera ou o seu comportamento natural e os seus instintos',
      ),
      flying,
      roleSkill(2),
    ],
  },
  {
    species: 'construct',
    affinities: { earth: 'resistant', poison: 'immune' },
    statusImmunities: ['poisoned'],
    picks: 0,
    extra: { vulnerability: AIR_BOLT_FIRE_ICE, picks: 1 },
    options: [
      {
        id: 'status-immunity',
        label: 'Imunidade a duas condições',
        kind: 'rule',
        rule: {
          name: 'Imunidade a condições',
          text: 'Imune às condições {conditions}.',
        },
        slots: [status('conditions', 2)],
      },
      opposed(
        'em contextos que favoreçam o projeto único, as ferramentas ou a programação do construto',
      ),
      flying,
      roleSkill(),
    ],
  },
  {
    species: 'demon',
    affinities: {},
    statusImmunities: [],
    resistances: 2,
    picks: 1,
    options: [
      absorb('Troca uma Resistência por uma Absorção', 'resistant'),
      spell('breath', 'curse-xl', 'mind-theft', 'weaken'),
      flying,
      roleSkill(),
    ],
  },
  {
    species: 'elemental',
    affinities: { poison: 'immune' },
    statusImmunities: ['poisoned'],
    immunities: 1,
    picks: 0,
    // "A damage type that is at odds with their nature" (fire for a frost spirit): any type.
    extra: {
      vulnerability: [
        'physical',
        'air',
        'bolt',
        'dark',
        'earth',
        'fire',
        'ice',
        'light',
        'poison',
      ],
      picks: 1,
    },
    options: [
      absorb('Troca uma Imunidade por uma Absorção', 'immune'),
      spell('breath', 'cursed-breath', 'lick-wounds'),
      flying,
      roleSkill(),
    ],
  },
  {
    species: 'humanoid',
    affinities: {},
    statusImmunities: [],
    vulnerability: ['dark', 'light', 'physical', 'poison'],
    picks: 3,
    options: [
      resistances,
      spell('lick-wounds', 'shell', 'war-cry'),
      opposed(
        'em testes relacionados ao passado ou ao treinamento do humanoide',
      ),
      flying,
      roleSkill(2),
    ],
  },
  {
    species: 'monster',
    affinities: {},
    statusImmunities: [],
    picks: 2,
    options: [
      hp,
      resistances,
      spell('breath', 'cursed-breath', 'lick-wounds'),
      flying,
      roleSkill(2),
    ],
  },
  {
    species: 'plant',
    affinities: {},
    statusImmunities: ['dazed', 'enraged', 'shaken'],
    vulnerability: AIR_BOLT_FIRE_ICE,
    picks: 1,
    options: [
      hp,
      resistances,
      spell('breath', 'cursed-breath', 'life-theft', 'poison'),
      {
        id: 'thorns',
        label: 'Espinhos',
        kind: 'rule',
        rule: {
          name: 'Espinhos',
          text: 'Quando um inimigo acerta o NPC com um ataque corpo a corpo, depois de resolvido o ataque, o NPC causa 5 de dano físico a esse inimigo (10 se o NPC for de nível 30 ou mais).',
        },
      },
      flying,
      roleSkill(),
    ],
  },
  {
    species: 'undead',
    affinities: { light: 'vulnerable', dark: 'immune', poison: 'immune' },
    statusImmunities: ['poisoned'],
    note: 'Efeitos que recuperam PV podem ferir um morto-vivo (Livro Básico, p. 305).',
    picks: 0,
    extra: { vulnerability: ['air', 'bolt', 'earth', 'fire', 'ice'], picks: 1 },
    options: [
      absorb(
        'Troca a Imunidade a trevas por Absorção de trevas',
        'immune',
        'dark',
      ),
      spell('breath', 'curse', 'life-theft', 'poison'),
      flying,
      roleSkill(),
    ],
  },
];
