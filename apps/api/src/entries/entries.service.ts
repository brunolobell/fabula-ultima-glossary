import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  creatureDetailsFromStats,
  creatureSummaryFromStats,
} from './creature-stats.mapper';
import { CreatureStats } from './entities/creature-stats.entity';
import { Entry } from './entities/entry.entity';
import { EntryType, isCreatureGroup } from './entry-types';
import { normalizeText } from './slug';

export type EntrySummary = Pick<
  Entry,
  | 'id'
  | 'slug'
  | 'name'
  | 'type'
  | 'summary'
  | 'source'
  | 'page'
  | 'tags'
  | 'details'
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
  'source',
  'page',
  'tags',
  'details',
];

/** Every `creature_stats` column except the abilities, which the list leaves out. */
const CREATURE_SUMMARY_COLUMNS: (keyof CreatureStats)[] = [
  'entryId',
  'level',
  'species',
  'rank',
  'role',
  'villain',
  'originalName',
  'groupSlug',
  'traits',
  'des',
  'ast',
  'vig',
  'von',
  'hp',
  'crisis',
  'mp',
  'initiative',
  'defense',
  'defenseFixed',
  'magicDefense',
  'hasSpells',
  'affinities',
];

const escapeLike = (value: string) => value.replace(/[\\%_]/g, '\\$&');

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entries: Repository<Entry>,
    @InjectRepository(CreatureStats)
    private readonly creatureStats: Repository<CreatureStats>,
  ) {}

  /**
   * Lists entries without their bodies (details are small and stay: they
   * drive the menu and the requirement lines). A search matches name, summary, body
   * and tags ignoring case and accents, with name matches ranked first.
   */
  async findAll(search?: string, type?: EntryType): Promise<EntrySummary[]> {
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

    return this.withCreatureSummaries(await qb.getMany());
  }

  /** Replaces the details of each listed Creature with its scalar stats (no abilities). */
  private async withCreatureSummaries(
    entries: EntrySummary[],
  ): Promise<EntrySummary[]> {
    const ids = entries.filter((e) => e.type === 'creature').map((e) => e.id);
    if (ids.length === 0) return entries;

    const rows = await this.creatureStats.find({
      where: { entryId: In(ids) },
      select: CREATURE_SUMMARY_COLUMNS,
    });
    const byEntry = new Map(rows.map((row) => [row.entryId, row]));
    for (const entry of entries) {
      const row = byEntry.get(entry.id);
      // The summary is a subset of the stat block; the web types it separately.
      if (row)
        entry.details = creatureSummaryFromStats(
          row,
        ) as unknown as EntrySummary['details'];
    }
    return entries;
  }

  async findOne(slug: string): Promise<EntryWithChildren> {
    const entry = await this.entries.findOne({ where: { slug } });
    if (!entry) {
      throw new NotFoundException(`Entry "${slug}" not found`);
    }
    let children: Entry[] = [];
    if (entry.type === 'class') {
      children = await this.findClassChildren(entry.slug);
    } else if (entry.type === 'creature' && isCreatureGroup(entry.details)) {
      children = await this.findGroupMembers(entry.slug);
    } else if (entry.type === 'creature') {
      const row = await this.creatureStats.findOne({
        where: { entryId: entry.id },
      });
      if (row) entry.details = creatureDetailsFromStats(row);
    }
    return Object.assign(entry, { children });
  }

  /** The members of a Creature Group, each with its whole stat block as `details`. */
  private async findGroupMembers(groupSlug: string): Promise<Entry[]> {
    const rows = await this.creatureStats.find({
      where: { groupSlug },
      relations: { entry: true },
      order: { groupOrder: 'ASC' },
    });
    return rows.map((row) =>
      Object.assign(row.entry, { details: creatureDetailsFromStats(row) }),
    );
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
