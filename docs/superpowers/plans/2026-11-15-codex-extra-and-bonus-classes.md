# Codex Extra and Bonus classes, with their heroic skills — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Seed 8 new classes (6 from Codex Extra, Carteador and Necromante from the English Bonus PDFs) and 30 heroic skills, under three new Sources.

**Architecture:** Three new values in `ENTRY_SOURCES` (+ enum migration, + web label). Content is plain seed files wrapped with `inBook()`, built with the existing `classEntry()`, `skill()` and `heroicSkill()` helpers; no new Entry types, no new `details` shapes. A new spec file pins names, pages, skill levels, sources and translation hygiene.

**Tech Stack:** NestJS + TypeORM + Postgres (Jest), React + Vite (Vitest), `pymupdf` to read PDFs.

**Spec:** `docs/superpowers/specs/2026-11-15-codex-extra-and-bonus-classes-design.md` (executors read it too: it has the 23/4/3 heroic-skill split and the requirement rules).

## Global Constraints

- All content from the English PDFs is PT-BR: names, summaries, bodies, tables, notes, prompts. English survives only in `tags` (for search) and the "(inglês)" source label.
- Bonus-sourced Entries use the Codex's Portuguese names and slugs; mechanics come from the Bonus text. The Codex's own Carteador/Necromante and the 7 duplicate heroic skills are NOT seeded from the Codex.
- Write summaries and bodies in our own words with exact rules and numbers. Never paste book text.
- Never invent a Portuguese term the Codex/Livro Básico already has. Terms we must coin are unofficial and go in `GLOSSARY.md`.
- `page` is the printed page: Codex = PDF index − 2; both Bonus PDFs = PDF index. Check the footer. Every Entry needs `page`.
- Content changes only through seed files; no write endpoints; no new Entry type; keep `apps/web/src/api/types.ts` in sync by hand.
- `freeBenefits` wording must match the trait regexes in `seed-validation.spec.ts` ("class traits … consistent with its freeBenefits"): `PV`, `PM`, `PI`, `corpo a corpo`, `à distância`, `armaduras`, `escudos`; and must not contain a word that triggers an extra trait.
- A skill's Poder-variant requirement ("Companheiro Fiel (construto)") goes in `alsoRequires` as the base skill name plus the variant in `note`; "3 Skill Levels" requirements go in `note`.
- `DATABASE_URL` in `apps/api/.env` points at Neon. Do NOT run `db:seed` or `migration:run` in this plan; validation is by Jest (`validateSeed`).
- Work on a branch `feat/codex-extra-and-bonus-classes`, not `main`. Commit steps are on that branch.
- Reading PDFs: create a venv in the scratchpad, `pip install pymupdf`, extract text with `fitz` per page; render a page to PNG and view it for icons, NP markers and tables (text extraction mangles them). Paths: Codex `/Users/brunolobell/Downloads/PT-BR/Fabula Ultima [PT-BR] - Codex-Extra.pdf`; Ace of Cards `/Users/brunolobell/Downloads/Fabula-Bonus-Ace-of-Cards.pdf`; Necromancer `/Users/brunolobell/Downloads/Fabula-Ultima-Bonus-01-Necromancer.pdf`.

## Review Focus

- English leaking into a Bonus Entry's summary/body/note (the user's standing requirement) → test: heuristic English-word check over every Bonus-sourced Entry (Task 2).
- A Bonus heroic skill seeded twice (once from the Codex, once from the Bonus) or a Codex-only skill requiring Carteador/Necromante → duplicate-slug and requirement tests (Tasks 2, 11, 12).
- Class sub-system tables dropped from the `body` (Carteador's seven set effects, Cavaleiro Mágico's motivação/aura/focos, Forjador's species table) → body assertions in Tasks 5, 6, 7.
- Wrong page offset (Codex −2, Bonus 0) → exact `page` assertions per Entry in each task.
- The enum migration failing on a database that already has the values (dev `synchronize`) → `ADD VALUE IF NOT EXISTS` and a `down` that deletes the new Sources' rows first (Task 1).

---

### Task 1: Sources (API enum, migration, web label)

**Files:**
- Modify: `apps/api/src/entries/entry-types.ts` (`ENTRY_SOURCES`, around line 17)
- Create: `apps/api/src/database/migrations/1794323092000-CodexExtraAndBonusSources.ts`
- Modify: `apps/web/src/api/types.ts` (`EntrySource`, line ~22), `apps/web/src/lib/sources.ts`
- Test: `apps/api/src/database/seed-validation.spec.ts`, create `apps/web/src/lib/sources.test.ts`

**Interfaces:**
- Produces: `EntrySource` accepts `'codex-extra' | 'bonus-ace-of-cards' | 'bonus-necromancer'`; `SOURCE_LABEL['codex-extra'] === 'Codex Extra'`, `['bonus-ace-of-cards'] === 'Fabula Bonus: Ace of Cards (inglês)'`, `['bonus-necromancer'] === 'Fabula Bonus: Necromancer (inglês)'`.

- [ ] **Step 1: Create the branch** `git switch -c feat/codex-extra-and-bonus-classes`.
- [ ] **Step 2: Write failing tests.** In `seed-validation.spec.ts`, next to "rejects an unknown source book", add `it('accepts the Codex Extra and Fabula Bonus sources')` that runs `validateSeed` on one minimal class + skill (copy the `guardiao` fixture pattern) with `source` set to each of the three values and expects `[]`. In `apps/web/src/lib/sources.test.ts` assert the three labels above.
- [ ] **Step 3: Run** `npm run test --workspace @fug/api -- seed-validation` and `npm run test --workspace @fug/web -- src/lib/sources.test.ts`; expect FAIL (unknown source / undefined label).
- [ ] **Step 4: Implement.** Append the three values to `ENTRY_SOURCES` after `'bestiary-vol-1'`; mirror in web `EntrySource` and `SOURCE_LABEL`. Migration class `CodexExtraAndBonusSources1794323092000`: `up` runs `ALTER TYPE "entries_source_enum" ADD VALUE IF NOT EXISTS '<value>'` for each of the three; `down` deletes `entries` rows with those sources then rebuilds the enum without them (copy the rename/create/alter/drop pattern of `1794323091000-PeculiarityType.ts`, with the full previous source list).
- [ ] **Step 5: Run** both test commands (PASS), then `npm run build --workspace @fug/api` and `npm run build --workspace @fug/web` (both succeed; web `tsc` proves `SOURCE_LABEL` is exhaustive).
- [ ] **Step 6: Commit** `feat: add Codex Extra and Fabula Bonus sources`.

### Task 2: Shared spec for the new content

**Files:**
- Create: `apps/api/src/database/seed-data/codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Produces (used and extended by Tasks 3–12): in that file, `const NEW_SOURCES = ['codex-extra','bonus-ace-of-cards','bonus-necromancer'] as const`; `const skillsOf = (className: string): [name: string, maxLevel: number, page: number][]` (skills whose `details.classSlug === slugify(className)`, sorted by name); `const heroicOf = (source: EntrySource): { name: string; page: number; classes: string[]; alsoRequires: string[] }[]` sorted by name; `const classOf = (name: string)` returning the class `SeedEntry` or `undefined`.

- [ ] **Step 1: Write the spec file** with the helpers above and these always-on invariants (they pass vacuously until content exists):
  - every Entry whose `source` is `bonus-ace-of-cards` or `bonus-necromancer` that is a class or heroic skill has the English name, lower-case, in `tags` (the Bonus English names are listed per task);
  - no Bonus-sourced Entry's `summary` or `body` matches `/\b(the|you|your|when|each|damage|spell|magic|card|cards|deck)\b/i` (translation hygiene);
  - no heroic skill with `source === 'codex-extra'` has `classes` containing `carteador` or `necromante`;
  - `validateSeed(seedEntries)` returns `[]`.
- [ ] **Step 2: Run** `npm run test --workspace @fug/api -- codex-extra-and-bonus`; expect PASS (vacuous).
- [ ] **Step 3: Commit** `test: add shared spec for Codex Extra and Bonus content`.

### Task 3: Codex classes Astrólogo and Bandoleiro

**Files:**
- Create: `apps/api/src/database/seed-data/classes/codex-extra/astrologo.ts`, `.../bandoleiro.ts`
- Modify: `apps/api/src/database/seed-data/index.ts` (imports; add `...inBook('codex-extra', [...astrologo, ...bandoleiro])` after the Techno Fantasy classes)
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Consumes: `classEntry`, `skill` from `../../helpers`, `SeedEntry` from `../../types`.
- Produces: `export const astrologo: SeedEntry[]`, `export const bandoleiro: SeedEntry[]`.

Source pages (printed): Astrólogo class p. 40, skills p. 41. Bandoleiro class p. 42, skills p. 43.

- [ ] **Step 1: Write failing tests** in the spec: `it('seeds Astrólogo')` expects `classOf('Astrólogo')` to have `source 'codex-extra'`, `page 40`, `details.traits` `['mp']`, and `skillsOf('Astrólogo')` equal to `[['Constelação da Rasga-mortalha',1,41],['Constelação do Boitatá',3,41],['Constelação do Boto',3,41],['Constelação do Cão Dourado',3,41],['Constelação do Saci',3,41]]` (sorted by name as the helper does); `it('seeds Bandoleiro')` expects page 42, traits `['ip','melee-weapon','ranged-weapon']`, skills `[['Cabra da Peste',5,43],['Líder de Bando',1,43],['Redistribuir Riquezas',3,43],['Sertanejo',1,43],['Valhacouto',3,43]]`.
- [ ] **Step 2: Run** the spec; expect FAIL (class undefined).
- [ ] **Step 3: Implement** both files from the Codex pages (`classEntry` with `otherNames`, `quote`, "Para pensar no personagem" prompts in the body as in `dancarino.ts`; `freeBenefits` worded to satisfy the trait regexes; cargas (celeste/estelar/meteórica/solar) explained in the Astrólogo body). Wire `index.ts`.
- [ ] **Step 4: Run** the spec and `npm run test --workspace @fug/api -- seed-validation`; expect PASS.
- [ ] **Step 5: Commit** `feat(api): seed Codex Extra classes Astrólogo and Bandoleiro`.

### Task 4: Codex classes Lâmina Carmesim and Malandro

**Files:**
- Create: `.../classes/codex-extra/lamina-carmesim.ts`, `.../malandro.ts`
- Modify: `seed-data/index.ts` (extend the `inBook('codex-extra', [...])` array)
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Produces: `export const laminaCarmesim: SeedEntry[]`, `export const malandro: SeedEntry[]`.

Pages: Lâmina Carmesim class 56, skills 57. Malandro class 58, skills 59.

- [ ] **Step 1: Write failing tests:** Lâmina Carmesim page 56, traits `['hp','melee-weapon','shield']`, skills `[['Arsenal Vermelho',1,57],['Dobrar Sangue',1,57],['Escudo Escarlate',2,57],['Frenesi Sanguinolento',4,57],['Hemofagia',5,57]]`. Malandro page 58, traits `['ip','ranged-weapon']`, skills `[['Engabelar',3,59],['Explorar Fraqueza',1,59],['Gambiarra',4,59],['Golpe Aproveitador',3,59],['Jeitinho',2,59]]`.
- [ ] **Step 2: Run;** expect FAIL.
- [ ] **Step 3: Implement** the two files and wire them. If a skill slug collides with an existing entry, set an explicit `slug` (validator reports it).
- [ ] **Step 4: Run** the spec and `seed-validation`; PASS.
- [ ] **Step 5: Commit** `feat(api): seed Codex Extra classes Lâmina Carmesim and Malandro`.

### Task 5: Codex class Cavaleiro Mágico

**Files:**
- Create: `.../classes/codex-extra/cavaleiro-magico.ts`
- Modify: `seed-data/index.ts`
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Produces: `export const cavaleiroMagico: SeedEntry[]`.

Pages: class 48, skills 49, Forma Mágica p. 50–51.

- [ ] **Step 1: Write failing test:** page 48, traits `['mp','armor','shield']`, skills `[['Alma Ferida',5,49],['Coração Ardente',3,49],['Impulso do Coração',1,49],['Magitransformação',3,49],['Transformação Aprimorada',3,49]]`; the class `body` contains the 2 motivações (Afeto, Raiva), the 4 auras (Fraqueza, Coragem, Tolice, Zelo) and the 7 focos (Ardente, Brilhante, Celeste, Congelante, Eletrizante, Rochoso, Sombrio).
- [ ] **Step 2: Run;** FAIL.
- [ ] **Step 3: Implement.** Body sections "Forma Mágica" with the motivação/aura table and a focus table (focus, item to choose, damage type), as tables like `dancarino.ts`; Magitransformação links to it with `[[cavaleiro-magico]]`.
- [ ] **Step 4: Run;** PASS.
- [ ] **Step 5: Commit** `feat(api): seed Codex Extra class Cavaleiro Mágico`.

### Task 6: Codex class Forjador de Almas

**Files:**
- Create: `.../classes/codex-extra/forjador-de-almas.ts`
- Modify: `seed-data/index.ts`
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Produces: `export const forjadorDeAlmas: SeedEntry[]`.

Pages: class 52, skills 53, Pontos de Alma p. 54–55.

- [ ] **Step 1: Write failing test:** page 52, traits `['ip']`, skills `[['Animar Arma',4,53],['Coletar Almas',5,53],['Forjar Característica',1,53],['Forjar Feitiço',5,53],['Manifestar Arma',1,53]]`; `body` contains the 8 species (Construto, Demônio, Elemental, Fera, Humanoide, Monstro, Morto-vivo, Planta).
- [ ] **Step 2: Run;** FAIL.
- [ ] **Step 3: Implement,** with a "Pontos de Alma" section (what a Ponto de Alma carries, effect per power) and the species benefit table.
- [ ] **Step 4: Run;** PASS.
- [ ] **Step 5: Commit** `feat(api): seed Codex Extra class Forjador de Almas`.

### Task 7: Bonus class Carteador (from Ace of Cards)

**Files:**
- Create: `.../classes/bonus-ace-of-cards/carteador.ts`
- Modify: `seed-data/index.ts` (add `...inBook('bonus-ace-of-cards', [...carteador])`)
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Produces: `export const carteador: SeedEntry[]`.

Source: Ace of Cards PDF; class p. 2, skills p. 3, "Managing the deck" p. 4, set effects p. 5. English name for tags: `ace of cards`.

- [ ] **Step 1: Write failing test:** `classOf('Carteador')` has `source 'bonus-ace-of-cards'`, `page 2`, traits `['hp','mp']`, tags include `ace of cards`; skills `[['Altos e Baixos',1,3],['Carta Armadilha',4,3],['Cartas Mágicas',3,3],['Dobro ou Nada',1,3],['Mulligan',5,3]]`; `body` contains all seven effects (Grande Prêmio, Flush Mágico, Flush Ofuscante, Full Status, Trinca de Suporte, Encrenca em Dobro, Par Mágico) and the numbers `777`, `30 cartas`.
- [ ] **Step 2: Run;** FAIL.
- [ ] **Step 3: Implement** from the **Bonus** text (not the Codex's Carteador), translated, with Codex names for terms (baralho, mão, pilha de descarte, naipe, curinga, conjunto). Body: "Gerenciando o Baralho" rules, "Usando um conjunto", and the effects table with level 20/40 extra damage note. If Bonus and Codex mechanics differ, Bonus wins.
- [ ] **Step 3b: Check page rendering** of p. 5 as an image for the suit icons and the effect table.
- [ ] **Step 4: Run** the spec (including the hygiene invariant); PASS.
- [ ] **Step 5: Commit** `feat(api): seed Bonus class Carteador (Ace of Cards, translated)`.

### Task 8: Bonus class Necromante (from Necromancer)

**Files:**
- Create: `.../classes/bonus-necromancer/necromante.ts`
- Modify: `seed-data/index.ts` (add `...inBook('bonus-necromancer', [...necromante])`)
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Produces: `export const necromante: SeedEntry[]`.

Source: Necromancer PDF; class p. 2, skills p. 3. English name for tags: `necromancer`. Lady Carmilla (p. 6–7) is out of scope.

- [ ] **Step 1: Write failing test:** page 2, source `bonus-necromancer`, traits `['hp','mp']`, tags include `necromancer`; skills `[['Além do Reino da Morte',5,3],['Filhos da Sepultura',1,3],['Medo é a Chave',3,3],['Por Quem os Sinos Dobram',3,3],['Rondó do Pesadelo',1,3]]`.
- [ ] **Step 2: Run;** FAIL.
- [ ] **Step 3: Implement** from the **Bonus** text, translated, with Codex terms (Pontos de Túmulo, morto-vivo, crise).
- [ ] **Step 4: Run** spec and `seed-validation` (class traits and "every class has skills from the same book" must pass); PASS.
- [ ] **Step 5: Commit** `feat(api): seed Bonus class Necromante (Necromancer, translated)`.

### Task 9: Codex heroic skills that need the new classes (11)

**Files:**
- Create: `apps/api/src/database/seed-data/heroic-skills/codex-extra.ts`
- Modify: `seed-data/index.ts` (add `...inBook('codex-extra', poderesHeroicosCodexExtra)`)
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Consumes: `heroicSkill` from `../helpers`.
- Produces: `export const poderesHeroicosCodexExtra: SeedEntry[]` (this task: 11 entries; Task 10 appends 12 more).

Codex pages (printed): Cancela do Lampião 17, Cargas Radiantes 17, Constelação da Cruz Austral 18, Fluxo de Yin e Yang 19, Forja Entrelaçada 19, Instinto Assassino 20, Lido Como um Livro 20, Multifunção 21, Papinho Amigável 22, Poder da Amizade 22, Redistribuição Aprimorada 23.

- [ ] **Step 1: Write failing test:** `heroicOf('codex-extra')` contains exactly those 11 `{name, page}` pairs and, for each, the requirement classes (names → slugs): Cancela [bandoleiro]; Cargas Radiantes [astrologo]; Constelação [astrologo]; Fluxo de Yin e Yang [astrologo, elementalista, esper, dancarino, invocador]; Forja Entrelaçada [forjador-de-almas]; Instinto Assassino [lamina-carmesim]; Lido Como um Livro [erudito, esper, ladino, malandro] with alsoRequires [roubo-de-alma]; Multifunção [forjador-de-almas]; Papinho Amigável [malandro, orador]; Poder da Amizade [cavaleiro-magico]; Redistribuição Aprimorada [bandoleiro] with alsoRequires [redistribuir-riquezas].
- [ ] **Step 2: Run;** FAIL.
- [ ] **Step 3: Implement** with `heroicSkill()`: `classes` the names above (the helper slugifies), `alsoRequires` as listed, summary and body in our own words from the Codex text. Wire `index.ts`.
- [ ] **Step 4: Run** the spec and `seed-validation` (dangling `alsoRequires` slugs fail there); PASS.
- [ ] **Step 5: Commit** `feat(api): seed Codex Extra heroic skills for the new classes`.

### Task 10: Codex heroic skills that need only existing classes (12)

**Files:**
- Modify: `apps/api/src/database/seed-data/heroic-skills/codex-extra.ts`
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Consumes: `poderesHeroicosCodexExtra` from Task 9.

Pages and requirements (Codex p. 17–25): Anatomista 17 [atirador, erudito, furioso, mestre-de-armas] + conhecimento-e-poder, repeatable up to 3; Corte Infernal 18 [elementalista, guerreiro-sombrio, piloto] + golpe-das-sombras; Dragão Empalador 18 [comandante, guerreiro-sombrio], requires **both** skills carga-de-cavalaria and golpe-das-sombras; Está Vivo! 18 [andarilho, inventor] + companheiro-fiel (note: espécie construto) + visionario; Fagomago 19 [entropista, gourmet, mutante, quimerista]; Maestria de Ofuda 20 [arcanista, mercador, simbolista] + simbolismo; Raízes Simbióticas 23 [andarilho, floralista, mutante, quimerista] + companheiro-fiel (note: construto); Sacrifício Arcano 24 [arcanista, guardiao]; Segredo do Grande Caldeirão 24 [inventor] + engenhocas (note: Alquimia superior); Tática da Asa Quebrada 24 [comandante, guardiao]; Truque do Caçador 24 [atirador, mestre-de-armas]; Voz da Bruxaria 25 [orador, virtuoso].

- [ ] **Step 1: Extend the test:** `heroicOf('codex-extra')` now has 23 entries; assert the 12 above (names, pages, class slugs, `alsoRequires`), plus Anatomista `repeatable === true`.
- [ ] **Step 2: Run;** FAIL (12 missing).
- [ ] **Step 3: Implement** the 12 with `heroicSkill()`. If a required skill name does not resolve to an existing slug (for example Companheiro Fiel's exact slug), read the existing class file and use its slug; do not add an entry to satisfy a link.
- [ ] **Step 4: Run** the spec and `seed-validation`; PASS.
- [ ] **Step 5: Commit** `feat(api): seed Codex Extra heroic skills for existing classes`.

### Task 11: Bonus heroic skills from Ace of Cards (4)

**Files:**
- Create: `apps/api/src/database/seed-data/heroic-skills/bonus-ace-of-cards.ts`
- Modify: `seed-data/index.ts` (add `...inBook('bonus-ace-of-cards', poderesHeroicosAceOfCards)` beside Carteador)
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Produces: `export const poderesHeroicosAceOfCards: SeedEntry[]`.

Ace of Cards PDF pages: Preto e Branco (Black & White) 6, Vanguarda das Cartas (Card Vanguard) 6, Mestre de Duelos (Duel Master) 6, Rito Proibido (Forbidden Rite) 7. English names for tags: `black & white`, `card vanguard`, `duel master`, `forbidden rite`.

- [ ] **Step 1: Write failing test:** `heroicOf('bonus-ace-of-cards')` equals: Preto e Branco [carteador, guerreiro-sombrio, entropista, espiritualista] + [cartas-magicas]; Vanguarda das Cartas [carteador] + [cartas-magicas]; Mestre de Duelos [carteador, furioso, ladino, atirador, mestre-de-armas] + [cartas-magicas]; Rito Proibido [carteador, arcanista] + [cartas-magicas] with a `note` mentioning NP 3 in Cartas Mágicas. Rito Proibido `body` contains `Monarca Proibido` and `777`. The Codex file (Tasks 9–10) must not contain any of these four slugs (the shared `validateSeed` duplicate-slug rule enforces it).
- [ ] **Step 2: Run;** FAIL.
- [ ] **Step 3: Implement** from the Bonus text, translated.
- [ ] **Step 4: Run** spec and `seed-validation`; PASS.
- [ ] **Step 5: Commit** `feat(api): seed Bonus heroic skills for Carteador (translated)`.

### Task 12: Bonus heroic skills from Necromancer (3)

**Files:**
- Create: `apps/api/src/database/seed-data/heroic-skills/bonus-necromancer.ts`
- Modify: `seed-data/index.ts` (add `...inBook('bonus-necromancer', poderesHeroicosNecromancer)`)
- Test: `codex-extra-and-bonus.spec.ts`

**Interfaces:**
- Produces: `export const poderesHeroicosNecromancer: SeedEntry[]`.

Necromancer PDF pages: Nascimento da Crueldade (Birth of the Cruel) 4, Ceifeiro do Pesar (Harvester of Sorrow) 4, Pulso das Larvas (Pulse of the Maggots) 5. Tags: `birth of the cruel`, `harvester of sorrow`, `pulse of the maggots`.

- [ ] **Step 1: Write failing test:** Nascimento da Crueldade [necromante]; Ceifeiro do Pesar [entropista, necromante] + alsoRequires [drenar-espirito, drenar-vigor] (confirm the Livro Básico spell slugs); Pulso das Larvas [necromante]. Also assert the whole seed now has 30 heroic skills across the three new sources (23 + 4 + 3).
- [ ] **Step 2: Run;** FAIL.
- [ ] **Step 3: Implement** from the Bonus text, translated. The Minion rules of Nascimento da Crueldade keep the Livro Básico p. 305 reference as written there.
- [ ] **Step 4: Run** spec and `seed-validation`; PASS.
- [ ] **Step 5: Commit** `feat(api): seed Bonus heroic skills for Necromante (translated)`.

### Task 13: ADR, CLAUDE.md, glossary

**Files:**
- Create: `docs/adr/0005-codex-extra-and-fabula-bonus-as-sources.md`
- Modify: `CLAUDE.md` (Content: "Sources" bullet and the page-offset bullet), `GLOSSARY.md` (new Source entries; "Page Reference" offset sentence)

- [ ] **Step 1: Write the ADR** in the style of ADR 0004: context (table plays with these classes), decision (three Sources, Codex PT official; Bonus English translated, unofficial, marked by the "(inglês)" label), rules (Bonus text is authority over the Codex's old Carteador/Necromante; Codex Portuguese names reused; own words), skipped content (Arcanos, Peculiaridades, Carmilla, sample characters), consequences (enum migration; `migration:run` then `db:seed` on every database).
- [ ] **Step 2: Update `CLAUDE.md`:** Sources sentence (Codex Extra and the two Bonus PDFs are in scope, with Vol. I); page offsets ("Codex Extra PDF minus 2, Bonus PDFs 0"); add `codex-extra` / `bonus-*` to the "When adding a book" note; remove Codex Extra from the "out of scope" list.
- [ ] **Step 3: Update `GLOSSARY.md`:** a Source entry for Codex Extra and one for Fabula Bonus; extend the Page Reference sentence with the new offsets; list any coined unofficial terms found during Tasks 7–12.
- [ ] **Step 4: Commit** `docs: record Codex Extra and Fabula Bonus as Sources (ADR 0005)`.

### Task 14: Whole-repo verification

- [ ] **Step 1: Run** `npm run lint`, `npm run test`, `npm run build`; all succeed.
- [ ] **Step 2: Confirm counts** with a one-off Jest or ts-node check (not committed): 8 new classes, 30 new heroic skills, every new skill's `source` equals its class's source (the existing "every class has at least one Poder from the same book" test covers it).
- [ ] **Step 3: Do not seed.** Report that `npm run build --workspace @fug/api` then `npm run migration:run --workspace @fug/api` and `npm run db:seed` must be run by the user on each database (the Neon `DATABASE_URL` is set in `apps/api/.env`; comment it out to use the local Docker database).
