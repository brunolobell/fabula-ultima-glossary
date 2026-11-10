# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Códice do Cristal: a private, unofficial, Portuguese (PT-BR) reference for the Fabula Ultima tabletop RPG, Nethys-style (search first, then browse by type). Content comes from the *Livro Básico* plus the three Atlas supplements (High Fantasy, Natural Fantasy, Techno Fantasy). Domain vocabulary is in `GLOSSARY.md`, the visual system in `DESIGN.md`, and the storage decision in `docs/adr/0001-single-entry-table.md`. npm-workspaces monorepo:

- `apps/web` — React + TypeScript + Vite + Tailwind CSS frontend (workspace `@fug/web`)
- `apps/api` — NestJS + TypeORM + PostgreSQL backend (workspace `@fug/api`)

## Commands

Run from the repo root. Workspace-specific scripts use `--workspace @fug/web` or `--workspace @fug/api`.

```bash
npm install                 # installs both workspaces
npm run db:up               # start PostgreSQL (Docker); db:down to stop
npm run db:seed             # validate + idempotent seed of Entries from src/database/seed-data (requires DB up)
npm run dev                 # run web (:5173) + api (:3000) together via concurrently
npm run dev:web             # frontend only
npm run dev:api             # backend only (nest start --watch)
npm run build               # builds api then web
npm run lint                # lint all workspaces
npm run test                # test all workspaces
```

Single test / focused runs:

```bash
# API (Jest) — by file or by name
npm run test --workspace @fug/api -- entries.service
npm run test --workspace @fug/api -- -t "slug"

# Web (Vitest) — by file or by name
npm run test --workspace @fug/web -- src/App.test.tsx
npm run test --workspace @fug/web -- -t "heading"
```

Frontend type-checking happens as part of `npm run build --workspace @fug/web` (`tsc --noEmit && vite build`).

## Architecture

**Request flow:** web `fetch` → `/api/entries` → `EntriesController` → `EntriesService` → `Entry` entity (PostgreSQL).

### Backend (`apps/api`)
- Single feature module, `EntriesModule` (`src/entries/`): `entries.controller.ts` (REST, **read-only**), `entries.service.ts`, `entities/entry.entity.ts`, `entry-types.ts` (the typed `details` per Entry Type), `slug.ts`.
- **All routes are under the global `/api` prefix** (set in `src/main.ts`), so the endpoint is `/api/entries`, not `/entries`.
- `main.ts` enables a global `ValidationPipe` with `whitelist` + `forbidNonWhitelisted` — unknown properties are rejected (400), including unknown query params like `?foo=1` and an invalid `?type=`. DTOs use `class-validator`.
- **`src/database/data-source.ts` is the single source of DB config**, used by both the Nest app (`app.module.ts` imports `dataSourceOptions`) and the standalone TypeORM CLI / seed script. It reads `.env` directly via `dotenv` so it works outside the Nest runtime.
- **`slug`, not `id`, is the public identifier** used in routes (`GET /api/entries/:slug`). Slugs come from `slugify(name)` in `src/entries/slug.ts`; the seed sets an explicit `slug` only to resolve a collision. A Class response also carries its Skills then Spells as `children`.
- Search (`?search=`, `?type=`) matches accent- and case-insensitively against `nameSearch`/`searchText` columns that the entity computes on save (`normalizeText`), with name matches ranked first. There is no `unaccent` extension. List responses omit `body` but keep `details` (small; the menu and the requirement lines read them).
- **No write endpoints.** Content changes only through the seed files; do not add POST/PATCH/DELETE without revisiting this.

### Frontend (`apps/web`)
- `src/api/client.ts` is the only place that talks to the backend; `src/hooks/useEntries.ts` wraps it in a TanStack Query hook. Server state is managed by TanStack Query (no Redux/global store).
- In dev, Vite proxies `/api` → `http://localhost:3000` (see `vite.config.ts`), so no CORS config is needed locally. `VITE_API_URL` overrides the base URL for production builds.
- Routing is `react-router-dom`: `/`, `/buscar?q=&tipo=`, `/guias/:slug`, `/:tipo` (type list), `/:tipo/:slug` (entry). `:tipo` is the Portuguese slug from `src/lib/entryTypes.ts` (`regras`, `classes`, `poderes`, `poderes-heroicos`, `feiticos`, `equipamento`, `servicos`, `transportes`, `guias`); a mismatched type segment redirects to the canonical URL. Layout (header, lateral menu, footer) is `components/Layout.tsx`. The lateral menu (`components/Sidebar.tsx`) is two collapsible groups (Criação de Personagem, Equipamento) plus Regras; Equipment Kind filters live in the URL as `/equipamento?item=armas` (`lib/equipmentKinds.ts`). The Equipamento group also holds one "Serviços e transporte" link to `/servicos`; both `service` and `transport` lists show a "Serviços | Transportes" switch (`components/TravelTabs.tsx`). Every type list page (`pages/TypeList.tsx`) filters in the browser with a single bar of filter buttons (`components/ListFilters.tsx`: each opens a checkbox panel) defined in `lib/listFilters.ts`: values are comma-separated in the URL (`/feiticos?classe=a,b&ofensivo=sim`), OR inside a filter, AND between filters. To add a filter, add a row spec there.
- **Weapon Forge** ("Forja de Armas", `components/forge/`; arithmetic in `lib/weaponForge.ts`): a "Forjar arma" button on `/equipamento?item=armas` opens a native `<dialog>` (`components/Modal.tsx`) that builds a Custom Weapon or a Rare Weapon. Nothing is saved: the draft is React state in `WeaponForge`, only the open tab is in the URL (`&forja=personalizada|rara`, `lib/forgeTab.ts`), so the two Rules can deep-link to it. Its numbers come from the `details` of the Rules `armas-personalizadas` and `criar-armas-raras` (`TypeList` finds them by slug in the entry index); nothing is hard-coded in the web app. The filters inside it reuse `ListFilters` with local state (`buildRowsFor` / `applyRowSpecs` in `lib/listFilters.ts`, specs in `lib/forgeFilters.ts`). `lib/weaponForge.test.ts` and `WeaponForge.test.tsx` import `apps/api/.../weapon-forge-data.ts` and `armas-basicas.ts` to test against the books' own examples, so `weapon-forge-data.ts` must keep importing only types and constants.
- **No Prettier config in `apps/web`** (the API has one, single quotes). A bare `npx prettier --write` on a web file rewrites its quotes; use `--single-quote --trailing-comma all` and only on files you wrote.
- **Styling follows `DESIGN.md`.** Colors are CSS variables in `src/index.css` and Tailwind's `colors` are mapped to them (`tailwind.config.js` replaces the default palette), so there are no `dark:` variants and no opacity modifiers like `bg-primary/50`. The theme is `data-theme` on `<html>`, set before first paint by the inline script in `index.html` (keep its storage key in sync with `src/lib/theme.ts`).
- Entry bodies are Markdown rendered by `components/EntryBody.tsx`: `[[slug]]` becomes a link labelled by the entry's name, `> **Exemplo:** …` becomes the example highlight, and `(DES + VIG)` / `(RA + 25)` get CSS brackets (`lib/check.tsx`).
- Credit Valley is served unmodified from `src/assets/fonts/` (its licence forbids altering the font); keep the licence file beside it.
- **After editing `tailwind.config.js`, restart `npm run dev`**: a running Vite server can keep serving the old config (symptom: default gray borders, missing colors).
- `src/api/types.ts` mirrors the backend `Entry` entity and `entry-types.ts` — **keep these in sync manually** when changing either.

## Database & migrations

- Config comes from `apps/api/.env` (copy from `.env.example`). Defaults match `docker-compose.yml` (user/pass/db = `fug`/`fug`/`fabula_glossary`).
- **Dev uses `DB_SYNC=true`** → TypeORM `synchronize` auto-creates the schema from entities. Do not rely on synchronize in production; use migrations there instead.
- Migrations load from the **compiled** `dist/database/migrations/*.js`, so `npm run build --workspace @fug/api` before `migration:run`. Generate/run/revert via `migration:generate` / `migration:run` / `migration:revert` in `apps/api`.
- **`DATABASE_URL` in `apps/api/.env` overrides every `DB_*` value** (`data-source.ts`), and it points at Neon. So `npm run dev`, `db:seed` and `migration:run` hit the hosted database, not the Docker one, whenever it is set. Comment it out to work locally.
- `entries.type` and `entries.source` are Postgres enums (`entries_type_enum`, `entries_source_enum`) built from `ENTRY_TYPES` / `ENTRY_SOURCES`. Adding a type or a book means editing those constants **and** running `migration:generate` (dev `synchronize` also alters the enum, but production does not). `tags` has a GIN index (`IDX_entries_tags`) that only the migration can make GIN; the entity declares the name so `synchronize` leaves it alone. Nothing queries `tags` directly yet. **A database that predates the enums must run `npm run build --workspace @fug/api` then `npm run migration:run --workspace @fug/api` before the API starts**: `synchronize` cannot convert a populated `varchar` column and fails with `column "type" ... contains null values`. The migrations work from any state: `BaselineEntries` creates `entries` on an empty database (it is a no-op when the table exists) and `EntryEnumsAndTagsIndex` converts only columns that are still `varchar`.
- `/api/entries` responses carry `Cache-Control: public, max-age=300, stale-while-revalidate=86400` (`cache-control.interceptor.ts`, success only) plus Express's ETag, so revalidation is a 304.
- The seed (`src/database/seed.ts`) validates `seed-data/` first (`seed-validation.ts`: duplicate slugs, dangling `classSlug`/`[[slug]]` links, missing page numbers, malformed `details`), then upserts by `slug` and **deletes entries no longer in the seed files**. It is safe to re-run.
- The old `terms` table is not dropped by `synchronize`; drop it by hand if it is still there.

## Content

- **Sources:** the *Livro Básico* and the Jambô PT-BR *Atlas* supplements for High Fantasy, Natural Fantasy and Techno Fantasy. Other books (Codex Extra, Nova Gênesis…) are out of scope, with one exception: the English *Bestiary Vol. I* (source `bestiary-vol-1`), which we translate and mark unofficial (`docs/adr/0004-english-bestiary-as-a-translated-source.md`). Never invent a Portuguese term for the Livro Básico or the Atlas; use the book's ("Laços", "Pontos de Mana", "Poderes", "Feitiços", "Astúcia"…).
- **Creatures (v2, slice 1 built):** the Bestiário (Livro Básico p. 319-353; creation rules p. 302-310) and Bestiary Vol. I become `creature` Entries, each with a 1:1 `creature_stats` row (`docs/adr/0003-creature-stats-table.md`; `entities/creature-stats.entity.ts`). The seed splits a Creature into the Entry (empty `details`) and its stats; the API joins them and serves the stat block as `details` (the list sends only the scalar stats plus `hasSpells`, the entry endpoint everything). Build one with `creature()` in `seed-data/helpers.ts`; Livro Básico ones live in `seed-data/creatures/livro-basico.ts`. `creatureSearchTerms` adds Species, Rank, Traits and ability names (and a Vol. I `originalName`) to `searchText`; the Entry entity has a transient `searchTerms` for it. The web side is `components/StatBlock.tsx`, `lib/creatures.ts` (labels) and the `creature` rows in `lib/listFilters.ts`. **All 56 Livro Básico Creatures are seeded** (`seed-data/creatures/livro-basico.ts`, p. 324-353); the Atirador creature has the explicit slug `atirador-criatura` because the Class owns `atirador`, and the book prints "Vigmiga-bombardeira" in the title but "formiga-bombardeira" in the text. An attack's `damageType` is `null` when a rule sets the type (a die roll, a choice). **Not built yet:** Creature Groups (`groupSlug`, stat-less group Entries), the builder "Montar criatura" (Quick Assembly only, nothing saved) and every Vol. I Creature. Domain terms are in `GLOSSARY.md` ("Building Creatures"). Atlas creatures are out of scope.
- **Every Entry has a `source`** (`livro-basico` by default, or `high-fantasy` / `natural-fantasy` / `techno-fantasy`) and its `page` is printed in *that* book. Supplement entries are seeded under `seed-data/classes/<book>/` and `seed-data/equipment/<book>/`; wrap them with `inBook()` (classes) or use the builders in `equipment/rare-helpers.ts` (items), which set `source`. When adding a book, extend `ENTRY_SOURCES` (API), `EntrySource` and `lib/sources.ts` (web).
- **Atlas items:** rare weapons/armor/shields/accessories/artifacts are `equipment` entries (`kind` includes `artifact`; armor and shields carry `defense`, `magicDefense`, and armor `initiative`). Piloto vehicle modules are rare weapons/shields tagged `módulo`.
- **Services and Transports** (`service`, `transport`; Livro Básico p. 124-125, Techno Fantasy p. 79) are one Entry per table row, built with `service()` / `transport()` in `seed-data/services-transport.ts`. Their shared rules are the Rules "Serviços e Transporte" and "Serviços e Transporte (viagem espacial)", which every row links to. `details.distance` holds the Travel-day multipliers per scale (`null` where the Transport cannot go); `details.approximate` marks passenger counts the book gives as "cerca de N" (shown "Cerca de N", otherwise "Até N"). The Transport tables inside the two Rules are generated from the Transport entries, so edit a number in the `transport()` call only. Labels live in `web/src/lib/travel.ts`.
- **Weapon Forge rules** are two `rule` Entries whose `details` carry the numbers (`RuleDetails` is a union discriminated by `forge`; see `docs/adr/0002-weapon-forge-rule-data.md`): "Armas Personalizadas" (Atlas High Fantasy p. 106; Natural Fantasy and Techno Fantasy p. 112 reprint it) and "Criar armas raras" (Livro Básico p. 266-269). The data is in `seed-data/weapon-forge-data.ts`, the entries in `weapon-forge.ts`, and the tables in their bodies are generated from the data, so edit a number there only. `seed-validation.ts` checks the shape. The printed rule allows **one** alteration in step 3 (p. 268), but the Atlas "evolutions" (Grimório do Vento, Sentinela da Rainha) apply two; the Forge enforces one by default and offers a "mais de uma alteração" opt-in.
- **Heroic Skills** (`heroic-skill`, shown "Poder Heroico") belong to no Class and have no NP. They live in `seed-data/heroic-skills/<book>.ts` (build them with `heroicSkill()`; Atlas files are wrapped with `inBook()`) and carry `details.requirements` (`classes`, `required` = how many must be mastered, `alsoRequires` Skill/Spell slugs, `note`) and `repeatable`. The requirement sentence is built by `lib/requirements.ts`. The Livro Básico list is p. 232-241; each Atlas has "Novos Poderes Heroicos".
- Write **summaries in our own words** with exact rules and numbers; never paste book text. Every Entry except guides needs `page`. Class sub-systems that are not Poderes (Danças, Símbolos, Versos, magissementes, iguarias, Mananciais, terioformas, dons, veículos/módulos) live in the class `body`.
- **`page` is the printed page number.** In the Livro Básico it is the PDF page index minus 4; **in the three Atlas PDFs it is the PDF index minus 2, and in the Bestiary Vol. I PDF minus 1.** In the Livro Básico the offset is not constant: from the Mestre chapter on it is minus 3 (the Cactonto is PDF index 355, printed p. 352), so read the number in the footer of every Creature page. Verify against the printed number in the page footer.
- The PDF's text extraction is unreliable for icons (the repeat symbol shows as "çç", the martial icon as "W", the offensive icon as "O"). When a table or numbering matters, render the page to an image and look at it.
- Body text is Markdown. `[[slug]]` links to another Entry; an example is a blockquote starting with `**Exemplo:**`.

## Gotchas

- Running the API/seed requires Postgres up (`npm run db:up`), which requires Docker Desktop running.
- Because of the `/api` global prefix + ValidationPipe whitelist, endpoint paths and request shapes are stricter than they look — check `main.ts` before debugging 404s/400s.
