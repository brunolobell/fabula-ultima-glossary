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
import {
  DetailsByType,
  ENTRY_SOURCES,
  ENTRY_TYPES,
  EntrySource,
  EntryType,
} from '../entry-types';
import { normalizeText } from '../slug';

// Declared so `synchronize` keeps the index; the migration makes it GIN (TypeORM cannot).
@Index('IDX_entries_tags', ['tags'])
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
  @Column({ type: 'enum', enum: ENTRY_TYPES })
  type: EntryType;

  /** Short account of the rules in our own words. */
  @Column({ type: 'text' })
  summary: string;

  /** Markdown. `[[slug]]` links to another entry. */
  @Column({ type: 'text', default: '' })
  body: string;

  /** Which book `page` refers to. */
  @Column({ type: 'enum', enum: ENTRY_SOURCES, default: 'livro-basico' })
  source: EntrySource;

  /** Printed page number in `source`; null only for guides. */
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

  /**
   * Extra words to find the Entry by, set by the seed for a Creature (its Species,
   * Traits and ability names). Not a column: only `searchText` keeps them.
   */
  searchTerms?: string[];

  @BeforeInsert()
  @BeforeUpdate()
  buildSearchColumns() {
    this.nameSearch = normalizeText(this.name);
    this.searchText = normalizeText(
      [
        this.name,
        this.summary,
        this.body,
        ...(this.tags ?? []),
        ...(this.searchTerms ?? []),
      ].join(' '),
    );
  }
}
