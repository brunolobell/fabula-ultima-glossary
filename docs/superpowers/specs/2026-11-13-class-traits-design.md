# Class traits on the Classes list (short design)

Status: approved by the user in conversation, 2026-11-13.

## Intent and why
A Reader choosing a Class on `/classes` should see at a glance what each Class gives
at the start, and filter by it. Example row: "Atirador — <summary> — Aumento de PV ·
Armas à distância marciais · Escudos marciais — Livro Básico, p. 184".

## Goals
- Each Class row shows its summary (already shown, 2-line clamp), a one-line list of
  starting-benefit traits, and the page reference.
- A "Benefício" filter on the Classes list.

## Non-goals
- No change to the Class page body or `freeBenefits` text.
- No write endpoints, no migration.

## Approaches
1. **Parse `freeBenefits` sentences in the web app.** Rejected: breaks when wording changes.
2. **Structured `traits` field in `ClassDetails`, filled in the seed (chosen).** Stable codes, labels in the web app.

## Design
- `ClassDetails.traits: ClassTrait[]` in `apps/api/src/entries/entry-types.ts`, with
  `CLASS_TRAITS` = `hp`, `mp`, `ip`, `melee-weapon`, `ranged-weapon`, `armor`, `shield`,
  `rituals`, `projects`. Mirror in `apps/web/src/api/types.ts`.
- Filled for every Class of all four books (Livro Básico, High/Natural/Techno Fantasy).
  "PV ou PM à escolha" = both `hp` and `mp`. Martial equipment traits mean "marcial".
- `seed-validation.ts` rejects unknown trait codes and a Class with no traits.
- Web: trait labels in a lib file (e.g. `lib/classTraits.ts`: "Aumento de PV", "Armas à
  distância marciais", "Escudos marciais"…), a trait line in `ResultRow` for `class`,
  and a `class` row spec in `lib/listFilters.ts` (`param: 'beneficio'`, OR inside the
  filter, AND with "Livro").
- Tests: validator, row rendering, filter.

## Left to the builder
Exact label wording for the less common traits (rituals, projects, PI) and trait order
on the row (suggest: PV/PM/PI first, then equipment, then rituals/projects).
Run `db:seed` on each database after merging.
