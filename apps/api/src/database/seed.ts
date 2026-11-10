import { In, Not } from 'typeorm';
import { creatureSearchTerms } from '../entries/creature-search';
import { statsFromCreatureDetails } from '../entries/creature-stats.mapper';
import { CreatureStats } from '../entries/entities/creature-stats.entity';
import { Entry } from '../entries/entities/entry.entity';
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
  const statsRepo = dataSource.getRepository(CreatureStats);

  const slugs: string[] = [];
  for (const { slug: _slug, ...data } of seedEntries) {
    const slug = resolveSlug({ name: data.name, slug: _slug });
    slugs.push(slug);

    const fields = {
      ...data,
      slug,
      source: data.source ?? 'livro-basico',
      body: data.body ?? '',
      tags: data.tags ?? [],
      // The stat block lives in `creature_stats`, not in the Entry.
      details: data.type === 'creature' ? {} : data.details,
    };
    const existing = await repo.findOne({ where: { slug } });
    const entry = existing
      ? repo.merge(existing, fields as Partial<Entry>)
      : repo.create(fields as Partial<Entry>);
    if (data.type === 'creature') {
      entry.searchTerms = creatureSearchTerms(data.details);
    }
    const saved = await repo.save(entry);

    if (data.type === 'creature') {
      await statsRepo.save(
        statsRepo.create({
          entryId: saved.id,
          ...statsFromCreatureDetails(data.details),
        }),
      );
    }
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
