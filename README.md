# Fabula Ultima Glossary

A searchable glossary for the [Fabula Ultima](https://www.needgames.it/fabula-ultima-en/)
tabletop RPG. Monorepo with a React (Vite) frontend and a NestJS API backed by
PostgreSQL.

## Stack

- **apps/web** — React + TypeScript + Vite + Tailwind CSS, data fetching via TanStack Query
- **apps/api** — NestJS + TypeORM + PostgreSQL
- **Database** — PostgreSQL (via Docker Compose)

## Getting started

```bash
# 1. Install dependencies (npm workspaces, installs both apps)
npm install

# 2. Start Postgres
npm run db:up

# 3. Configure env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# 4. Seed the reference Entries (from apps/api/src/database/seed-data)
npm run db:seed

# 5. Run both apps (web on :5173, api on :3000)
npm run dev
```

The web dev server proxies `/api` to the NestJS server, so the frontend works
without CORS configuration in development.

## Scripts (root)

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Run web + api together                           |
| `npm run dev:web`  | Run only the frontend                            |
| `npm run dev:api`  | Run only the backend                             |
| `npm run build`    | Build api then web                               |
| `npm run lint`     | Lint all workspaces                              |
| `npm run test`     | Test all workspaces                              |
| `npm run db:up`    | Start PostgreSQL in Docker                        |
| `npm run db:down`  | Stop PostgreSQL                                   |
| `npm run db:seed`  | Load seed terms into the database                |
