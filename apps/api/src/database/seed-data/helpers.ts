import {
  CreatureDetails,
  EntrySource,
  Medium,
} from '../../entries/entry-types';
import { slugify } from '../../entries/slug';
import { SeedEntry } from './types';

type Of<T extends SeedEntry['type']> = Extract<SeedEntry, { type: T }>;

export const rule = (
  name: string,
  page: number,
  summary: string,
  body: string,
  tags: string[] = [],
): Of<'rule'> => ({
  type: 'rule',
  name,
  page,
  summary,
  body,
  tags,
  details: {},
});

export interface ClassInput {
  name: string;
  page: number;
  summary: string;
  body: string;
  otherNames: string[];
  quote: string | null;
  freeBenefits: string[];
}

export const classEntry = ({
  otherNames,
  quote,
  freeBenefits,
  ...rest
}: ClassInput): Of<'class'> => ({
  type: 'class',
  tags: ['classe'],
  details: { otherNames, quote, freeBenefits },
  ...rest,
});

/** A Skill ("Poder"); `maxLevel` is the number after the repeat symbol. */
export const skill = (
  className: string,
  name: string,
  page: number,
  maxLevel: number,
  summary: string,
  body = '',
): Of<'skill'> => ({
  type: 'skill',
  name,
  page,
  summary,
  body,
  tags: ['poder', className.toLowerCase()],
  details: { classSlug: slugify(className), maxLevel },
});

export interface HeroicSkillInput {
  name: string;
  /** Set it only to resolve a slug collision (e.g. with a Spell of the same name). */
  slug?: string;
  page: number;
  summary: string;
  body: string;
  /** Class names whose Mastery counts; leave empty for "available to everyone". */
  classes?: string[];
  /** How many of `classes` must be mastered; defaults to 1 ("any of") when there are classes. */
  required?: number;
  /** Names of Skills or Spells that must also be known. */
  alsoRequires?: string[];
  note?: string;
  repeatable?: boolean;
}

/** A Heroic Skill ("Poder Heroico"): taken on mastering a Class, with optional requirements. */
export const heroicSkill = ({
  classes = [],
  required = classes.length > 0 ? 1 : 0,
  alsoRequires = [],
  note,
  repeatable = false,
  ...rest
}: HeroicSkillInput): Of<'heroic-skill'> => ({
  type: 'heroic-skill',
  tags: ['poder heroico', ...classes.map((c) => c.toLowerCase())],
  details: {
    requirements: {
      classes: classes.map(slugify),
      required,
      alsoRequires: alsoRequires.map(slugify),
      note: note ?? null,
    },
    repeatable,
  },
  ...rest,
});

export interface SpellInput {
  name: string;
  page: number;
  mpCost: string;
  target: string;
  duration: string;
  offensive?: boolean;
  summary: string;
  body?: string;
}

/** A Spell ("Feitiço") belonging to a Class. */
export const spell = (
  className: string,
  { offensive = false, body = '', ...rest }: SpellInput,
): Of<'spell'> => {
  const { name, page, summary, mpCost, target, duration } = rest;
  return {
    type: 'spell',
    name,
    page,
    summary,
    body,
    tags: ['feitiço', className.toLowerCase()],
    details: {
      classSlug: slugify(className),
      mpCost,
      target,
      duration,
      offensive,
    },
  };
};

export interface ServiceInput {
  name: string;
  page: number;
  /** Cost in zênites. */
  cost: number;
  group: 'settlement' | 'travel';
  /** Travel fares only. */
  medium?: Medium;
  summary: string;
  body: string;
}

/** A Service ("Serviço"): something paid for and not kept. */
export const service = ({
  cost,
  group,
  medium,
  ...rest
}: ServiceInput): Of<'service'> => ({
  type: 'service',
  tags: ['serviço', group === 'travel' ? 'viagem' : 'assentamento'],
  details: medium ? { group, cost, medium } : { group, cost },
  ...rest,
});

export interface TransportInput {
  name: string;
  page: number;
  transportClass: 'mount' | 'vehicle';
  medium: Medium;
  cost: number;
  /** The most passengers it carries. */
  passengers: number;
  /** The book says "cerca de N" instead of an exact limit. */
  approximate?: boolean;
  /** Distance multipliers as `[planetary, interplanetary, interstellar]`; null where it cannot go. */
  distance: [number | null, number | null, number | null];
  summary: string;
  body: string;
}

/** A Transport ("Transporte"): a Mount or a Vehicle that multiplies a day of Travel. */
export const transport = ({
  transportClass,
  medium,
  cost,
  passengers,
  approximate,
  distance: [planetary, interplanetary, interstellar],
  ...rest
}: TransportInput): Of<'transport'> => ({
  type: 'transport',
  tags: ['transporte', transportClass === 'mount' ? 'montaria' : 'veículo'],
  details: {
    transportClass,
    medium,
    cost,
    passengers,
    ...(approximate && { approximate }),
    distance: { planetary, interplanetary, interstellar },
  },
  ...rest,
});

export interface GuideInput {
  name: string;
  /** Position among the guides, following the book (world, party, character, play). */
  order: number;
  page: number | null;
  summary: string;
  body: string;
  steps: { title: string; intro: string; entries: string[] }[];
}

/** A Guide: an ordered list of steps, each pointing at entries to read. */
export const guide = ({ steps, order, ...rest }: GuideInput): Of<'guide'> => ({
  type: 'guide',
  tags: ['guia'],
  details: { order, steps },
  ...rest,
});

export interface CreatureInput extends CreatureDetails {
  name: string;
  /** Set it only to resolve a slug collision. */
  slug?: string;
  page: number;
  /** Our own words. */
  summary: string;
  body?: string;
}

/** A Creature ("criatura"): its stat block is `details`; the seed stores it in `creature_stats`. */
export const creature = ({
  name,
  slug,
  page,
  summary,
  body = '',
  ...details
}: CreatureInput): Of<'creature'> => ({
  type: 'creature',
  name,
  ...(slug && { slug }),
  page,
  summary,
  body,
  tags: ['criatura'],
  details,
});

/** Marks every entry as coming from a supplement book (`page` is that book's printed page). */
export const inBook = (
  source: EntrySource,
  entries: SeedEntry[],
): SeedEntry[] => entries.map((entry) => ({ ...entry, source }));
