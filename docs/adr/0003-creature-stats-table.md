---
status: accepted
---

# Creatures are an `entries` row plus a 1:1 `creature_stats` table

ADR 0001 keeps every Entry Type in one `entries` table with typed `details`, and says a type can be split out later if it needs heavy relational querying. Creatures are the first type that pushes on that: a stat block has many fields no other type has (level, Species, four Attribute dice, PV, PM, Initiative, two defenses, nine Affinities, Rank, Role, a villain flag), and the two books together hold roughly 200 of them. We give each Creature an `entries` row (slug, name, type `creature`, Summary, body, Source, Page Reference, tags, search columns) and a one-to-one `creature_stats` row for the stat block.

The filterable scalars are real columns on `creature_stats`. Affinities and the abilities (attacks, spells, other actions, special rules, Traits, Study lines, routine) are jsonb on the same row. A Creature Group is an `entries` row of type `creature` with no `creature_stats` row; its members point to it by `groupSlug` in their stats.

The API joins the two tables and serves the stats as `details`, so the web contract from ADR 0001 does not change. The list endpoint returns only the scalars, not the abilities, and the browser filters, as it does for every other list.

## Considered options

- **Keep Creatures in `entries.details` only (ADR 0001 unchanged).** Least machinery, and the list payload is the only worry at about 200 rows. Rejected because the stat block is large and creature-only, the scalar fields cannot be indexed or constrained, and the list response would carry every ability of every Creature.
- **A separate `creatures` table with its own endpoint.** Real columns and foreign keys, but global search across Entries and Creatures needs a `UNION` or two requests, and the seed, validation and cache machinery would be written twice.

## Consequences

- The seed upserts two tables per Creature, in one transaction, and still deletes anything no longer in the seed files. `seed-validation.ts` checks the stat block as well as the Entry.
- `entries.type` gains `creature` and `entries.source` gains `bestiary-vol-1` (ADR 0004): both need a migration, not only `synchronize`. `creature_stats` needs one too, with `entry_id` as a unique foreign key that cascades on delete.
- `apps/web/src/api/types.ts` mirrors the joined shape by hand, as before. The Creature-specific columns never reach `EntryDetails` unless they appear in the joined `details`.
- Search stays on the `entries` row; `searchText` is built from the name, Species, Traits, ability names and the original English name.
- If another type later needs the same treatment, this is the pattern to copy; if several do, revisit ADR 0001.
