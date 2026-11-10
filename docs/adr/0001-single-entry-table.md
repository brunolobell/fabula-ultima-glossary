---
status: accepted
---

# One `Entry` table with typed `details`, instead of one table per Entry Type

The app grows from a flat glossary of `Term`s into a Nethys-style reference covering Rules, Classes, Skills, Spells, Equipment and Guides (the Bestiary and Atlas come in v2). We store all of them in a single `entries` table with common columns (slug, name, type, Summary, body, Page Reference, tags) plus a `details` JSON column validated per Entry Type. Global search and one list endpoint stay trivial, and adding a type needs no new table (only a new value in the `entries.type` enum, which does need a migration). Relations (a Skill or Spell to its Class, a Guide Step to its Entries) are held as slug references inside `details`.

## Considered options

- **One table per Entry Type.** Stricter columns and real foreign keys, but cross-type search needs a `UNION`, every new type or field needs a migration, and for a small private app that is more machinery than the data justifies.

## Consequences

- `Term` becomes `Entry` and `/api/terms` becomes `/api/entries`; `apps/web/src/api/types.ts` must be kept in sync by hand with the entity, as already required.
- The database cannot enforce `details` or slug references; the validation lives in the API's DTOs and the seed script must fail on a dangling slug.
- If a type later needs heavy relational querying, that type can be split out into its own table without touching the others.
