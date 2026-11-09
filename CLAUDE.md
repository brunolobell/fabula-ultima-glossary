# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Códice do Cristal: a private, unofficial, Portuguese (PT-BR) reference for the Fabula Ultima tabletop RPG, Nethys-style (search first, then browse by type). Content comes only from the *Livro Básico*. Domain vocabulary is in `GLOSSARY.md`, the visual system in `DESIGN.md`, and the storage decision in `docs/adr/0001-single-entry-table.md`. npm-workspaces monorepo:

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
- Search (`?search=`, `?type=`) matches accent- and case-insensitively against `nameSearch`/`searchText` columns that the entity computes on save (`normalizeText`), with name matches ranked first. There is no `unaccent` extension. List responses omit `body` and `details`.
- **No write endpoints.** Content changes only through the seed files; do not add POST/PATCH/DELETE without revisiting this.

### Frontend (`apps/web`)
- `src/api/client.ts` is the only place that talks to the backend; `src/hooks/useEntries.ts` wraps it in a TanStack Query hook. Server state is managed by TanStack Query (no Redux/global store).
- In dev, Vite proxies `/api` → `http://localhost:3000` (see `vite.config.ts`), so no CORS config is needed locally. `VITE_API_URL` overrides the base URL for production builds.
- Routing is `react-router-dom`: `/`, `/buscar?q=&tipo=`, `/guias/:slug`, `/:tipo` (type list), `/:tipo/:slug` (entry). `:tipo` is the Portuguese slug from `src/lib/entryTypes.ts` (`regras`, `classes`, `poderes`, `feiticos`, `equipamento`, `guias`); a mismatched type segment redirects to the canonical URL. Layout (header, lateral menu, footer) is `components/Layout.tsx`.
- **Styling follows `DESIGN.md`.** Colors are CSS variables in `src/index.css` and Tailwind's `colors` are mapped to them (`tailwind.config.js` replaces the default palette), so there are no `dark:` variants and no opacity modifiers like `bg-primary/50`. The theme is `data-theme` on `<html>`, set before first paint by the inline script in `index.html` (keep its storage key in sync with `src/lib/theme.ts`).
- Entry bodies are Markdown rendered by `components/EntryBody.tsx`: `[[slug]]` becomes a link labelled by the entry's name, `> **Exemplo:** …` becomes the example highlight, and `(DES + VIG)` / `(RA + 25)` get CSS brackets (`lib/check.tsx`).
- Credit Valley is served unmodified from `src/assets/fonts/` (its licence forbids altering the font); keep the licence file beside it.
- **After editing `tailwind.config.js`, restart `npm run dev`**: a running Vite server can keep serving the old config (symptom: default gray borders, missing colors).
- `src/api/types.ts` mirrors the backend `Entry` entity and `entry-types.ts` — **keep these in sync manually** when changing either.

## Database & migrations

- Config comes from `apps/api/.env` (copy from `.env.example`). Defaults match `docker-compose.yml` (user/pass/db = `fug`/`fug`/`fabula_glossary`).
- **Dev uses `DB_SYNC=true`** → TypeORM `synchronize` auto-creates the schema from entities. Do not rely on synchronize in production; use migrations there instead.
- Migrations load from the **compiled** `dist/database/migrations/*.js`, so `npm run build --workspace @fug/api` before `migration:run`. Generate/run/revert via `migration:generate` / `migration:run` / `migration:revert` in `apps/api`.
- The seed (`src/database/seed.ts`) validates `seed-data/` first (`seed-validation.ts`: duplicate slugs, dangling `classSlug`/`[[slug]]` links, missing page numbers, malformed `details`), then upserts by `slug` and **deletes entries no longer in the seed files**. It is safe to re-run.
- The old `terms` table is not dropped by `synchronize`; drop it by hand if it is still there.

## Content

- **Source: only the Livro Básico** (Jambô, PT-BR). Other books are out of scope. Never invent a Portuguese term; use the book's ("Laços", "Pontos de Mana", "Poderes", "Feitiços", "Astúcia"…).
- Write **summaries in our own words** with exact rules and numbers; never paste book text. Every Entry except guides needs `page`.
- **`page` is the printed page number, which is the PDF page index minus 4.** Verify numbers against the printed number.
- The PDF's text extraction is unreliable for icons (the repeat symbol shows as "çç", the martial icon as "W", the offensive icon as "O"). When a table or numbering matters, render the page to an image and look at it.
- Body text is Markdown. `[[slug]]` links to another Entry; an example is a blockquote starting with `**Exemplo:**`.

## Gotchas

- Running the API/seed requires Postgres up (`npm run db:up`), which requires Docker Desktop running.
- Because of the `/api` global prefix + ValidationPipe whitelist, endpoint paths and request shapes are stricter than they look — check `main.ts` before debugging 404s/400s.
