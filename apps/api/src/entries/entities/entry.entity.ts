import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DetailsByType, EntryType } from '../entry-types';
import { normalizeText } from '../slug';

@Entity('entries')
export class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column()
  slug: string;

  @Column()
  name: string;

  @Index()
  @Column({ type: 'varchar' })
  type: EntryType;

  /** Short account of the rules in our own words. */
  @Column({ type: 'text' })
  summary: string;

  /** Markdown. `[[slug]]` links to another entry. */
  @Column({ type: 'text', default: '' })
  body: string;

  /** Printed page number in the Core Rulebook; null only for guides. */
  @Column({ type: 'int', nullable: true })
  page: number | null;

  @Column('text', { array: true, default: () => "'{}'" })
  tags: string[];

  /** Shape depends on `type`; see entry-types.ts. */
  @Column({ type: 'jsonb', default: () => "'{}'" })
  details: DetailsByType[EntryType];

  /** Accent- and case-folded name, used to search and rank. */
  @Column({ type: 'text', select: false })
  nameSearch: string;

  /** Accent- and case-folded name, summary and body, used to search. */
  @Column({ type: 'text', select: false })
  searchText: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  buildSearchColumns() {
    this.nameSearch = normalizeText(this.name);
    this.searchText = normalizeText(
      [this.name, this.summary, this.body, ...(this.tags ?? [])].join(' '),
    );
  }
}
