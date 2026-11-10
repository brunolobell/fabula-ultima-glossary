import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import {
  Affinity,
  CreatureAbility,
  CreatureAttack,
  CreatureSpell,
  DamageType,
  Die,
  RANKS,
  ROLES,
  Rank,
  Role,
  SPECIES,
  Species,
} from '../entry-types';
import { Entry } from './entry.entity';

/**
 * The stat block of a Creature (ADR 0003): one row per `creature` Entry that has
 * stats. The filterable numbers are columns; Affinities and abilities are jsonb.
 * The API serves this row as the Entry's `details`.
 */
@Entity('creature_stats')
export class CreatureStats {
  @PrimaryColumn('uuid')
  entryId: string;

  @OneToOne(() => Entry, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'entryId' })
  entry: Entry;

  @Column({ type: 'int' })
  level: number;

  @Column({ type: 'enum', enum: SPECIES })
  species: Species;

  @Column({ type: 'enum', enum: RANKS })
  rank: Rank;

  /** Quick Assembly Role; null for the Livro Básico Creatures. */
  @Column({ type: 'enum', enum: ROLES, nullable: true })
  role: Role | null;

  @Column({ type: 'boolean', default: false })
  villain: boolean;

  /** English name of a Bestiary Vol. I Creature. */
  @Column({ type: 'text', nullable: true })
  originalName: string | null;

  @Column('text', { array: true, default: () => "'{}'" })
  traits: string[];

  @Column({ type: 'smallint' })
  des: Die;

  @Column({ type: 'smallint' })
  ast: Die;

  @Column({ type: 'smallint' })
  vig: Die;

  @Column({ type: 'smallint' })
  von: Die;

  @Column({ type: 'int' })
  hp: number;

  @Column({ type: 'int' })
  crisis: number;

  @Column({ type: 'int' })
  mp: number;

  @Column({ type: 'int' })
  initiative: number;

  @Column({ type: 'int' })
  defense: number;

  /** `defense` is a fixed number (martial armor), not a bonus to the Destreza die. */
  @Column({ type: 'boolean', default: false })
  defenseFixed: boolean;

  @Column({ type: 'int' })
  magicDefense: number;

  /** Derived from `spells` when seeding, so the list can filter without the abilities. */
  @Column({ type: 'boolean', default: false })
  hasSpells: boolean;

  @Column({ type: 'jsonb', default: () => "'{}'" })
  affinities: Partial<Record<DamageType, Affinity>>;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  attacks: CreatureAttack[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  spells: CreatureSpell[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  otherActions: CreatureAbility[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  specialRules: CreatureAbility[];
}
