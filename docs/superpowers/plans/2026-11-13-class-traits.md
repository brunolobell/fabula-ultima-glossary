# Class Traits on the Classes List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Each Class row on `/classes` shows a one-line list of starting-benefit traits ("Aumento de PV · Armas à distância marciais · Escudos marciais"), and the list has a "Benefício" filter over those traits.

**Architecture:** A structured `traits: ClassTrait[]` field in `ClassDetails` (codes, filled in each Class seed file); labels and display order live in the web app. The list already receives `details` for every row, so the web only adds a label line in `ResultRow` and one row spec in `lib/listFilters.ts`. No endpoint or migration change.

**Tech Stack:** NestJS + TypeORM seed (Jest), React + Vite (Vitest), TypeScript.

**Spec:** `docs/superpowers/specs/2026-11-13-class-traits-design.md`

## Global Constraints

- `traits` codes (exactly these, in this canonical order): `hp`, `mp`, `ip`, `melee-weapon`, `ranged-weapon`, `armor`, `shield`, `rituals`, `projects`.
- Labels come from the book's wording, in Portuguese: "Aumento de PV", "Aumento de PM", "Aumento de PI", "Armas corpo a corpo marciais", "Armas à distância marciais", "Armaduras marciais", "Escudos marciais", "Rituais", "Projetos".
- "PV ou PM à escolha" = both `hp` and `mp`.
- Filter URL param is `beneficio`, values comma-separated, OR inside the filter, AND with "Livro" (the existing `ListFilters` behaviour).
- `src/api/types.ts` (web) must be kept in sync by hand with `entry-types.ts` (API).
- Web: no Tailwind opacity modifiers or `dark:` variants; use existing `text-meta` / `text-muted` classes. Prettier in web: only on files you wrote, with `--single-quote --trailing-comma all`.
- Do not commit unless the user asks.

## Review Focus

- A seed Class lists traits in non-canonical order: the row shows them in canonical order anyway (test in Task 2).
- A Class with an unknown or duplicated trait code, or no traits: the seed validator rejects it (Task 1).
- A "PV ou PM" Class (Dançarino, Floralista, Invocador): appears under both the PV and PM filter (Task 2).
- Selecting two traits shows the union; adding a "Livro" choice narrows it (Task 2).
- Existing Class tests/fixtures that build a Class without `traits` still type-check (Tasks 1 and 2 update them).

---

### Task 1: API — `traits` in `ClassDetails`, validator, seed data

**Files:**
- Modify: `apps/api/src/entries/entry-types.ts` (near `ClassDetails`, ~line 38)
- Modify: `apps/api/src/database/seed-data/helpers.ts` (`ClassInput`, `classEntry`, lines 27-47)
- Modify: `apps/api/src/database/seed-validation.ts` (`case 'class'`, ~line 552)
- Modify: the 26 files `apps/api/src/database/seed-data/classes/*.ts` and `classes/{high-fantasy,natural-fantasy,techno-fantasy}/*.ts` (add `traits` next to `freeBenefits`)
- Test: `apps/api/src/database/seed-validation.spec.ts`

**Interfaces:**
- Produces: `CLASS_TRAITS` (readonly tuple, canonical order above), `type ClassTrait`, `ClassDetails.traits: ClassTrait[]`, `ClassInput.traits: ClassTrait[]` — all in the names above, exported from `entry-types.ts`.

- [ ] **Step 1: Write the failing tests** in `seed-validation.spec.ts`, reusing the file's existing Class builder (the `guardiao` const at line 16 and the helpers it uses; add `traits: ['hp']` to every existing `classEntry({...})` call there so it still compiles):
  - `it('rejects a class with no traits')` → build a valid Class with `traits: []`; expect the validator's message to contain `details.traits must be a non-empty list`.
  - `it('rejects a class with an unknown trait')` → `traits: ['flying' as never]`; message contains `unknown trait "flying"`.
  - `it('rejects a class with a repeated trait')` → `traits: ['hp', 'hp']`; message contains `details.traits has duplicates`.
  - `it('gives every seeded class traits that are consistent with its freeBenefits')`: for each seeded `class` entry, assert `traits.includes('hp')` iff some `freeBenefits` text matches `/\bPV\b/`; same for `mp` (`/\bPM\b/`) and `ip` (`/\bPI\b/`). This pins the data table below against the book text.

- [ ] **Step 2: Run** `npm run test --workspace @fug/api -- seed-validation` → FAIL (type errors / missing messages).

- [ ] **Step 3: Implement.**
  - `entry-types.ts`: export `CLASS_TRAITS` and `ClassTrait` (same `as const` + `typeof [number]` style as `EQUIPMENT_KINDS`); add `traits: ClassTrait[]` to `ClassDetails` with a doc comment ("Machine-readable view of `freeBenefits`; drives the Classes list line and the Benefício filter").
  - `helpers.ts`: add `traits: ClassTrait[]` to `ClassInput`; `classEntry` passes it into `details`.
  - `seed-validation.ts`: in `case 'class'`, after the existing checks, `fail` with the three messages from Step 1 (non-empty array; each member in `CLASS_TRAITS`; no duplicates). Import `CLASS_TRAITS` the way `TRANSPORT_CLASSES` is imported.
  - Seed files: add `traits: [...]` to each `classEntry` call from this table (file → traits):

    | File | traits |
    |---|---|
    | andarilho | `ip` |
    | arcanista | `mp` |
    | atirador | `hp`, `ranged-weapon`, `shield` |
    | elementalista | `mp`, `rituals` |
    | entropista | `mp`, `rituals` |
    | erudito | `mp` |
    | espiritualista | `mp`, `rituals` |
    | furioso | `hp`, `melee-weapon`, `armor` |
    | guardiao | `hp`, `armor`, `shield` |
    | guerreiro-sombrio | `hp`, `melee-weapon`, `armor` |
    | inventor | `ip`, `projects` |
    | ladino | `ip` |
    | mestre-de-armas | `hp`, `melee-weapon`, `shield` |
    | orador | `mp` |
    | quimerista | `mp`, `rituals` |
    | high-fantasy/comandante | `hp`, `melee-weapon`, `ranged-weapon` |
    | high-fantasy/dancarino | `hp`, `mp` |
    | high-fantasy/simbolista | `ip` |
    | high-fantasy/virtuoso | `mp` |
    | natural-fantasy/floralista | `hp`, `mp` |
    | natural-fantasy/gourmet | `ip`, `projects` |
    | natural-fantasy/invocador | `hp`, `mp` |
    | natural-fantasy/mercador | `ip` |
    | techno-fantasy/esper | `mp` |
    | techno-fantasy/mutante | `hp` |
    | techno-fantasy/piloto | `hp`, `melee-weapon`, `ranged-weapon` |

    (Atirador: the book's "armas à distância e escudos marciais" is read as both marcial, matching the user's example row.)

- [ ] **Step 4: Run** `npm run test --workspace @fug/api` and `npm run build --workspace @fug/api` → PASS, no type errors.

---

### Task 2: Web — labels, row line, "Benefício" filter

**Files:**
- Modify: `apps/web/src/api/types.ts` (`ClassDetails`, line 31)
- Create: `apps/web/src/lib/classTraits.ts`
- Modify: `apps/web/src/components/ResultRow.tsx` (`RowMeta`)
- Modify: `apps/web/src/lib/listFilters.ts` (`ROWS.class`, line ~118)
- Modify: `apps/web/src/test/fixtures.ts` (the `elementalista` Class details, line ~85: add `traits: ['mp']`)
- Test: `apps/web/src/lib/classTraits.test.ts` (create), `apps/web/src/lib/listFilters.test.ts`, `apps/web/src/components/ResultRow.test.tsx` (create)

**Interfaces:**
- Consumes: the `traits` field from Task 1 (the API serves it in `details` on list rows).
- Produces in `lib/classTraits.ts`:
  - `type ClassTrait` (the nine codes; mirrored from the API in `api/types.ts` and re-used here)
  - `CLASS_TRAIT_ORDER: readonly ClassTrait[]` (canonical order)
  - `CLASS_TRAIT_LABEL: Record<ClassTrait, string>` (labels from Global Constraints)
  - `classTraitLabels(traits: readonly ClassTrait[]): string[]` — labels sorted by `CLASS_TRAIT_ORDER`, unknown codes dropped.

- [ ] **Step 1: Write the failing tests.**
  - `classTraits.test.ts`: `classTraitLabels(['shield', 'hp', 'ranged-weapon'])` equals `['Aumento de PV', 'Armas à distância marciais', 'Escudos marciais']`; `classTraitLabels([])` equals `[]`.
  - `listFilters.test.ts` (reuse its `entry()` helper and `readSelection`/`applyFilters`/`buildRowsFor` imports; build a few `class` entries with `details: { otherNames: [], quote: null, freeBenefits: [], traits: [...] }`): Atirador `['hp','ranged-weapon','shield']`, Guardião `['hp','armor','shield']`, Dançarino `['hp','mp']` with `source: 'high-fantasy'`, Arcanista `['mp']`.
    - `beneficio=shield` → Atirador, Guardião.
    - `beneficio=mp` → Dançarino, Arcanista; `beneficio=hp` includes Dançarino (both-trait case).
    - `beneficio=armor,ranged-weapon` → Guardião, Atirador (OR).
    - `beneficio=hp&livro=high-fantasy` → Dançarino only (AND).
    - `buildRowsFor` for `class` has a row with `param: 'beneficio'`, `label: 'Benefício'`, options labelled with the Global Constraints labels in canonical order, only for traits some listed Class has.
  - `ResultRow.test.tsx`: render `<ResultRow entry={...}/>` inside `MemoryRouter` (no QueryClient needed: a Class row uses no hooks) with a Class whose `details.traits` is `['shield','hp','ranged-weapon']` and `page: 184`; expect text "Aumento de PV · Armas à distância marciais · Escudos marciais" in that order, and the page reference still rendered. A second case with `traits: []` renders no stray " · ".

- [ ] **Step 2: Run** `npm run test --workspace @fug/web -- classTraits listFilters ResultRow` → FAIL.

- [ ] **Step 3: Implement.**
  - `api/types.ts`: add `traits: ClassTrait[]` to `ClassDetails`, with `ClassTrait` defined as a string-literal union of the nine codes (the web app does not import the API package; keep in sync by hand, as the file already does).
  - `lib/classTraits.ts` as in Interfaces.
  - `ResultRow.tsx` `RowMeta`: for `entry.type === 'class'`, render `classTraitLabels(traits).join(' · ')` followed by `' · '` before `PageRef`, only when there is at least one label (same trailing-separator pattern as `ClassName` / `CostFacts`).
  - `listFilters.ts`: `class: [traitRow, bookRow]`, where `traitRow` is a `RowSpec` with `param: 'beneficio'`, `label: 'Benefício'`, `values: (e) => (e.details as ClassDetails).traits`, `labelOf: (v) => CLASS_TRAIT_LABEL[v as ClassTrait] ?? v`, `order: CLASS_TRAIT_ORDER`.

- [ ] **Step 4: Run** `npm run test --workspace @fug/web` and `npm run build --workspace @fug/web` (type-check) → PASS.

- [ ] **Step 5: Manual check.** Run `npm run db:seed` (against a database the user is fine with; `DATABASE_URL` in `apps/api/.env` points at Neon, so ask first or comment it out and use Docker via `db:up`), then `npm run dev`, open `/classes`: each row shows its trait line and page; choose "Escudos marciais" in the new filter and confirm only Atirador, Guardião and Mestre de Armas remain; check the row on a phone-width viewport wraps cleanly.

---

## Self-review notes
- Spec coverage: structured field + all four books (Task 1), validator (Task 1), labels/row/filter (Task 2), tests (both), `db:seed` note (Task 2 Step 5). The Class page body and `freeBenefits` are untouched (non-goal).
- Names are consistent: `ClassTrait`, `CLASS_TRAITS` (API) / `CLASS_TRAIT_ORDER`, `CLASS_TRAIT_LABEL`, `classTraitLabels` (web), param `beneficio`.
