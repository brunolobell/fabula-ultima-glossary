import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { EntryType } from './entry-types';
import { normalizeText } from './slug';

export type EntrySummary = Pick<
  Entry,
  'id' | 'slug' | 'name' | 'type' | 'summary' | 'page' | 'tags'
>;

export type EntryWithChildren = Entry & {
  /** For a Class: its Skills then its Spells, in full. Empty otherwise. */
  children: Entry[];
};

const SUMMARY_COLUMNS = [
  'id',
  'slug',
  'name',
  'type',
  'summary',
  'page',
  'tags',
];

const escapeLike = (value: string) => value.replace(/[\\%_]/g, '\\$&');

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entries: Repository<Entry>,
  ) {}

  /**
   * Lists entries without their bodies. A search matches name, summary, body
   * and tags ignoring case and accents, with name matches ranked first.
   */
  findAll(search?: string, type?: EntryType): Promise<EntrySummary[]> {
    const qb = this.entries
      .createQueryBuilder('entry')
      .select(SUMMARY_COLUMNS.map((column) => `entry.${column}`));

    if (type) {
      qb.andWhere('entry.type = :type', { type });
    }

    const term = search ? normalizeText(search.trim()) : '';
    if (term) {
      qb.setParameter('like', `%${escapeLike(term)}%`)
        .andWhere('entry.searchText LIKE :like')
        .orderBy('CASE WHEN entry.nameSearch LIKE :like THEN 0 ELSE 1 END')
        .addOrderBy('entry.name');
    } else {
      qb.orderBy('entry.name');
    }

    return qb.getMany();
  }

  async findOne(slug: string): Promise<EntryWithChildren> {
    const entry = await this.entries.findOne({ where: { slug } });
    if (!entry) {
      throw new NotFoundException(`Entry "${slug}" not found`);
    }
    const children =
      entry.type === 'class' ? await this.findClassChildren(entry.slug) : [];
    return Object.assign(entry, { children });
  }

  private findClassChildren(classSlug: string): Promise<Entry[]> {
    return this.entries
      .createQueryBuilder('entry')
      .where('entry.type IN (:...types)', { types: ['skill', 'spell'] })
      .andWhere("entry.details ->> 'classSlug' = :classSlug", { classSlug })
      .orderBy('entry.type', 'ASC')
      .addOrderBy('entry.name')
      .getMany();
  }
}
