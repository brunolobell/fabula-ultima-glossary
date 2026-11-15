# Codex Extra and Bonus classes, with their heroic skills — design

Date: 2026-11-15. Status: approved by the user on 2026-11-15.

**Standing requirement (from the user):** all content that comes from the English PDFs is translated to Portuguese. Names, summaries, bodies, tables, requirement notes and prompts are all PT-BR. The only English left is the original name kept in `originalName`/search terms and the "(inglês)" source label.

## Intent

The user's table plays with classes the Livro Básico and the three Atlas books do not have. They want those classes, and the heroic skills that go with them, in the Códice do Cristal so the table can look them up like any other class.

Eight classes:

- **From Codex Extra** (Jambô, PT-BR, 2025, official): Astrólogo, Bandoleiro, Cavaleiro Mágico, Forjador de Almas, Lâmina Carmesim, Malandro.
- **From the two English Bonus PDFs** (Need Games, free, 2022/2023): Ace of Cards (app name **Carteador**) and Necromancer (app name **Necromante**). The Codex also prints these two, but the user says that Codex version is an old one, so it is **not** used. The Bonus text is the authority.

Plus the heroic skills ("poderes heroicos") that the Codex and the Bonus PDFs add.

## Goals

- All 8 classes appear in the Classes list and on their own pages, each with its skills, exactly like the existing 22 classes (free benefits, "Outros nomes", quote, prompts, skills with maximum Skill Level and page).
- All 30 heroic skills of Codex "Novos Poderes Heroicos" (p. 15–25) appear as `heroic-skill` Entries with correct requirements, so the existing requirement sentence and list filters work.
- The seven that exist in both books come from the Bonus (English, translated) and not from the Codex: Black & White (Preto e Branco), Card Vanguard (Vanguarda das Cartas), Duel Master (Mestre de Duelos), Forbidden Rite (Rito Proibido) from Ace of Cards; Birth of the Cruel (Nascimento da Crueldade), Harvester of Sorrow (Ceifeiro do Pesar), Pulse of the Maggots (Pulso das Larvas) from Necromancer. The other 23 come from the Codex.
- Every Entry says which book it comes from and cites the page printed in that book.

## Non-goals

- Codex Extra's Arcanos (12), Peculiaridades (9), "Novos Personagens Clássicos", the Lady Carmilla creature (also in the Necromancer Bonus) and the Foundry/Fultimator export of classes. Out of this change; any could be a later request.
- The sample builds printed in the Bonus PDFs.
- No new Entry types, no new routes, no new list filters beyond what the Source column already gives.
- No write endpoints, no change to the Creature Assembler or the Forges.

## Anti-goals

- Mixing the old Codex Carteador/Necromante text into the Bonus-sourced classes.
- Pasting book text. Summaries and bodies are our own words with exact rules and numbers (existing content rule).
- Inventing Portuguese terms where Jambô already has one. The Bonus translations take their vocabulary from the Codex (and Livro Básico), not from us.
- Presenting translated Bonus text as official.

## Constraints

- `CLAUDE.md` says other books are out of scope, with Bestiary Vol. I as the one exception. This change adds a second exception and must update that line, add an ADR (0005) and a glossary entry.
- Content changes only through seed files. No migration for content; one migration for the new Source enum values.
- `entries.source` is a Postgres enum built from `ENTRY_SOURCES`; production does not synchronize, so the migration is required.
- `src/api/types.ts` (web) mirrors the API types by hand.
- Page numbers: Codex printed page = PDF index − 2 (p. 40 is PDF 42). Bonus PDFs: printed page = PDF index (Ace of Cards p. 3 is PDF 3; Necromancer p. 3 is PDF 3). Verify against the footer.
- PDF text extraction mangles icons (offensive-spell marker, NP star, etc.). Where a number or a marker matters, render the page to an image and look at it.
- The Bonus PDFs on disk are English and unofficial for this app; Vol. I's rules for translation apply (ADR 0004).

## Approaches considered

1. **Three Sources (chosen):** `codex-extra`, `bonus-ace-of-cards`, `bonus-necromancer`. Each Entry cites the page printed in its own PDF; the two Bonus books both have a "page 3", so one shared Source would be ambiguous. Cost: three enum values, one migration, three labels.
2. **Two Sources:** `codex-extra` plus one `fabula-bonus` for both PDFs. Rejected: ambiguous page citation.
3. **One Source, `codex-extra`, for everything.** Rejected: mislabels English unofficial text as Codex and loses the page citation.

## Design

### Sources

Add to `ENTRY_SOURCES` (API), `EntrySource` and `SOURCE_LABEL` (web), and the Postgres enum via a new migration (`migration:generate`, same shape as the one that added `bestiary-vol-1`):

| Source | Label shown to the Reader | Language / status | Page offset |
| --- | --- | --- | --- |
| `codex-extra` | Codex Extra | PT-BR, official (Jambô) | PDF − 2 |
| `bonus-ace-of-cards` | Fabula Bonus: Ace of Cards (inglês) | English, translated by us, unofficial | PDF − 0 |
| `bonus-necromancer` | Fabula Bonus: Necromancer (inglês) | English, translated by us, unofficial | PDF − 0 |

Anywhere the web app lists or filters by Source ("Livro" filters, source badges, test fixtures) picks the new values up through `SOURCE_LABEL`; the builder confirms no other list of Sources exists (`listFilters.test.ts` and `test/fixtures.ts` mention them).

### Classes

Seed files, wrapped with `inBook()`:

- `seed-data/classes/codex-extra/{astrologo,bandoleiro,cavaleiro-magico,forjador-de-almas,lamina-carmesim,malandro}.ts` (Codex p. 40–61 printed).
- `seed-data/classes/bonus-ace-of-cards/carteador.ts` and `seed-data/classes/bonus-necromancer/necromante.ts`.

Each built with `classEntry()` and `skill()`. `traits` come from the free benefits: Astrólogo `mp`; Bandoleiro `ip`, `melee-weapon`, `ranged-weapon`; Carteador `hp`, `mp`; Cavaleiro Mágico `mp`, `armor`, `shield`; Forjador de Almas `ip`; Lâmina Carmesim `hp`, `melee-weapon`, `shield`; Malandro `ip`, `ranged-weapon`; Necromante `hp`, `mp`. Existing `CLASS_TRAITS` already cover these; a new trait is not needed.

Sub-systems go in the class `body`, as for existing classes: Carteador "Gerenciando o Baralho" (deck rules and the table of seven set effects, from the Bonus), Cavaleiro Mágico "Forma Mágica" (motivation, aura and focus tables), Forjador de Almas "Pontos de Alma" (and the per-species benefit table).

A class Skill that grants a Class's choices (Magitransformação, Forjar Feitiço, Constelações) is modelled like Dança in Dançarino: one Skill with a maximum Skill Level and the repeated choice described in its body.

### Heroic skills

- `seed-data/heroic-skills/codex-extra.ts` (23 skills, wrapped with `inBook('codex-extra', …)`).
- `seed-data/heroic-skills/bonus-ace-of-cards.ts` (4) and `bonus-necromancer.ts` (3).
- Built with `heroicSkill()` using `classes`, `required`, `alsoRequires` and `note`. Class names resolve to slugs through `slugify`, so references to the new classes need those slugs to exist (the seed validator already fails on dangling links).
- Bonus skills use the English requirement lists but the Codex's Portuguese skill and class names, e.g. Ace of Cards → Carteador, Entropist → Entropista, Spiritist → Espiritualista, Darkblade → Guerreiro Sombrio. Where a requirement says "Magic Cards" the slug is `cartas-magicas`. Where the Bonus requires "3 Skill Levels" of a skill, that goes in `note` (as Rito Proibido already does in the Codex), since `alsoRequires` has no level.
- Some Codex skills have requirements that mix a new class with an existing one or one skill from an existing class (for example Lido Como um Livro needs Roubo de Alma). These are Codex-sourced and follow the Codex wording.

### Names and slugs

- The English-sourced classes take the Codex Portuguese names: slugs `carteador`, `necromante`.
- The seven Bonus-sourced heroic skills take the Codex Portuguese names: slugs `preto-e-branco`, `vanguarda-das-cartas`, `mestre-de-duelos`, `rito-proibido`, `nascimento-da-crueldade`, `ceifeiro-do-pesar`, `pulso-das-larvas`. The original English name goes in `originalName` where the Entry type supports it (as for Vol. I creatures), so it stays searchable; otherwise it is added to `searchText` / the body, builder's call.
- Skill names inside Carteador/Necromante use the Codex Portuguese names (Altos e Baixos, Carta Armadilha, Cartas Mágicas, Dobro ou Nada, Mulligan; Além do Reino da Morte, Filhos da Sepultura, Medo é a Chave, Por Quem os Sinos Dobram, Rondó do Pesadelo). The Bonus English is the source of **mechanics**; if it differs from the Codex, the Bonus wins and the difference is noted in the summary or body.
- Ace of Cards / Necromancer descriptive and flavour text is written in our own words.

### Unofficial marking

Checked in the web app: Vol. I's only marking on Entries is the "(inglês)" suffix in `SOURCE_LABEL` (the rest is the site-wide "não oficial" footer). The Bonus Sources do the same: the "(inglês)" suffix in the label is the marking, and no new UI is added. The ADR and glossary carry the fuller "translated by us, unofficial" statement.

### Source files on disk

- Codex Extra: `/Users/brunolobell/Downloads/PT-BR/Fabula Ultima [PT-BR] - Codex-Extra.pdf`
- Ace of Cards: `/Users/brunolobell/Downloads/Fabula-Bonus-Ace-of-Cards.pdf`
- Necromancer: `/Users/brunolobell/Downloads/Fabula-Ultima-Bonus-01-Necromancer.pdf`

Read them with `pymupdf` as in the existing project notes (text extraction for prose; render a page to PNG to check icons, set-effect tables and the NP markers).

### The 30 heroic skills, split by source

Codex "Novos Poderes Heroicos" (printed p. 15–25) lists exactly 30. Seven of them are the Bonus ones and are replaced by the Bonus versions, so the total stays 30: 23 from the Codex plus 7 from the Bonus (4 Ace of Cards, 3 Necromancer).

- **Codex-sourced (23):** Anatomista, Cancela do Lampião, Cargas Radiantes, Constelação da Cruz Austral, Corte Infernal, Dragão Empalador, Está Vivo!, Fagomago, Fluxo de Yin e Yang, Forja Entrelaçada, Instinto Assassino, Lido Como um Livro, Maestria de Ofuda, Multifunção, Papinho Amigável, Poder da Amizade, Raízes Simbióticas, Redistribuição Aprimorada, Sacrifício Arcano, Segredo do Grande Caldeirão, Tática da Asa Quebrada, Truque do Caçador, Voz da Bruxaria.
- **Bonus Ace of Cards (4):** Preto e Branco, Vanguarda das Cartas, Mestre de Duelos, Rito Proibido.
- **Bonus Necromancer (3):** Nascimento da Crueldade, Ceifeiro do Pesar, Pulso das Larvas.

None of the 23 Codex-sourced skills requires Carteador or Necromante (checked against the Codex table, p. 15–16). Several Codex-sourced skills require other Codex-sourced classes (for example Cargas Radiantes → Astrólogo, Instinto Assassino → Lâmina Carmesim). The Bonus-sourced skills require the Bonus-sourced Carteador skill Cartas Mágicas and the Livro Básico spells Drenar Espírito and Drenar Vigor, which already exist or are seeded in this change.

### No new `details` shapes

The Bonus classes' skills are plain text (no structured choices or spell grants), so Skills keep the existing `SkillDetails` (`classSlug`, `maxLevel`) and nothing new is added to the types or the validator beyond the Source values.

### Docs and housekeeping

- ADR `docs/adr/0005-codex-extra-and-fabula-bonus-as-sources.md`: why these books are now in scope, the three-Source decision, translation rules (same as ADR 0004), which Codex content is intentionally skipped (old Carteador/Necromante, plus what is out of scope above).
- `CLAUDE.md`: update the "out of scope" sentence in Content, the Sources paragraph, and the page-offset sentence (Codex −2, Bonus 0).
- `GLOSSARY.md`: Source entries for Codex Extra and Fabula Bonus; page-offset sentence in "Page Reference".
- Seed validation spec: add cases for the new class and heroic-skill files if the existing spec enumerates Sources or classes.
- After deploy: `migration:run` then `db:seed` on every database.

## Testing and verification

- `npm run test` and `npm run lint` in both workspaces; `npm run build` (web type-checks).
- `npm run db:seed` with the DB up: the validator must pass (no dangling `classSlug`/`[[slug]]`, every Entry has `page`, `details` well-formed).
- Spot check in the app: the Classes list shows 30 classes with the right trait lines; Source filter lists the new books; a heroic skill page shows its requirement sentence and the book/page; a Carteador skill page and the "Gerenciando o Baralho" table render.
- Page numbers verified against the printed footer for a sample from each book.

## Left to the builder

- Splitting the work into tasks (suggested order: Sources and migration; Codex classes; Bonus classes; heroic skills; docs).
- Exact summary text for each Entry (own words, exact numbers).
- Choosing whether `originalName` or `searchText` carries the English names, based on what the Entry type supports.
- Whether anything beyond `SOURCE_LABEL` in the web app enumerates Sources.
- The Portuguese rendering of the few Bonus terms with no Codex equivalent; mark such terms unofficial in the glossary.

## Calls I made (not discussed with the user)

- Added after the reviewer pass: where the PDFs are; the explicit 23/4/3 split of the 30 heroic skills; the "(inglês)" label suffix as the only unofficial marking (matches Vol. I); no new `details` shapes. If a class's free benefit ever has no matching `CLASS_TRAITS` code, the book wins and the builder adds the trait (none found for these eight).

- All 30 Codex heroic skills are in, including those whose requirements are only existing classes (Anatomista, Corte Infernal, Dragão Empalador, Está Vivo!, Fagomago, Fluxo de Yin e Yang, Maestria de Ofuda, Raízes Simbióticas, Sacrifício Arcano, Segredo do Grande Caldeirão, Tática da Asa Quebrada, Truque do Caçador, Voz da Bruxaria, Poder da Amizade, Papinho Amigável, Lido Como um Livro, Multifunção, …). "Heroic skills too" was read as the Codex's whole list.
- Bonus Entries use the Codex Portuguese names for names and slugs.
- Source labels as in the table above.
- Arcanos, Peculiaridades, Carmilla and sample characters are not included.
