import { In, Not } from 'typeorm';
import { creatureSearchTerms } from '../entries/creature-search';
import { statsFromCreatureDetails } from '../entries/creature-stats.mapper';
import { CreatureStats } from '../entries/entities/creature-stats.entity';
import { Entry } from '../entries/entities/entry.entity';
import { isCreatureGroup } from '../entries/entry-types';
import dataSource from './data-source';
import { seedEntries } from './seed-data';
import { resolveSlug, validateSeed } from './seed-validation';

/**
 * Idempotent seed: validates the content, upserts entries by slug and removes
 * entries that are no longer in the seed files (the seed files own the content).
 * A Creature is two rows (ADR 0003): the Entry, with empty `details`, and its
 * `creature_stats`; deleting a stale Entry cascades to its stats.
 * Run with `npm run db:seed` from the repo root.
 */
async function run() {
  const errors = validateSeed(seedEntries);
  if (errors.length > 0) {
    throw new Error(`Invalid seed data:\n- ${errors.join('\n- ')}`);
  }

  await dataSource.initialize();
  const repo = dataSource.getRepository(Entry);

  const slugs: string[] = [];
  // Members of a Creature Group keep the order of the seed file.
  const membersSeen = new Map<string, number>();
  for (const { slug: _slug, ...data } of seedEntries) {
    const slug = resolveSlug({ name: data.name, slug: _slug });
    slugs.push(slug);

    const fields = {
      ...data,
      slug,
      source: data.source ?? 'livro-basico',
      body: data.body ?? '',
      tags: data.tags ?? [],
      // The stat block lives in `creature_stats`, not in the Entry; a Creature
      // Group has none, so its marker stays in the Entry.
      details:
        data.type === 'creature' && !isCreatureGroup(data.details)
          ? {}
          : data.details,
    };
    const existing = await repo.findOne({ where: { slug } });
    const entry = existing
      ? repo.merge(existing, fields as Partial<Entry>)
      : repo.create(fields as Partial<Entry>);
    const stats =
      data.type === 'creature' && !isCreatureGroup(data.details)
        ? data.details
        : null;
    if (stats) {
      entry.searchTerms = creatureSearchTerms(stats);
      // The terms are not a column, so a stats-only change would not fire
      // @BeforeUpdate and `searchText` would go stale.
      entry.buildSearchColumns();
    }

    if (!stats) {
      await repo.save(entry);
      continue;
    }
    const order = membersSeen.get(stats.groupSlug ?? '') ?? 0;
    if (stats.groupSlug) membersSeen.set(stats.groupSlug, order + 1);
    // One transaction: an Entry without its stats would be served with `details: {}`.
    await dataSource.transaction(async (manager) => {
      const saved = await manager.save(entry);
      await manager.save(
        manager.create(CreatureStats, {
          entryId: saved.id,
          ...statsFromCreatureDetails(stats, order),
        }),
      );
    });
  }

  const removed = await repo.delete({ slug: Not(In(slugs)) });

  // eslint-disable-next-line no-console
  console.log(
    `Seeded ${slugs.length} entries, removed ${removed.affected ?? 0} stale`,
  );
  await dataSource.destroy();
}

run().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
