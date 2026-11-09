import { In, Not } from 'typeorm';
import { Entry } from '../entries/entities/entry.entity';
import dataSource from './data-source';
import { seedEntries } from './seed-data';
import { resolveSlug, validateSeed } from './seed-validation';

/**
 * Idempotent seed: validates the content, upserts entries by slug and removes
 * entries that are no longer in the seed files (the seed files own the content).
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
  for (const { slug: _slug, ...data } of seedEntries) {
    const slug = resolveSlug({ name: data.name, slug: _slug });
    slugs.push(slug);
    const existing = await repo.findOne({ where: { slug } });
    if (existing) {
      repo.merge(existing, {
        ...data,
        slug,
        body: data.body ?? '',
        tags: data.tags ?? [],
      });
      await repo.save(existing);
    } else {
      await repo.save(
        repo.create({
          ...data,
          slug,
          body: data.body ?? '',
          tags: data.tags ?? [],
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
