---
status: accepted
---

# The English Bestiary Vol. I is an in-scope Source, translated and marked unofficial

Until now the app's Sources were the Brazilian Livro Básico and the three Brazilian Atlas books, and the content rules were: other books are out of scope, and never invent a Portuguese term. The Livro Básico's Bestiário has only about 56 Creatures and no builder beyond its basic NPC procedure. The Bestiary Vol. I (English, 2026, no Brazilian edition) has the Quick Assembly method that the Creature Assembler follows, and about 150 more Creatures. The app is PT-BR and private, so we take the book as a fifth Source (`bestiary-vol-1`) and translate it ourselves.

Rules for that translation:

- Mechanics vocabulary comes from the Livro Básico (PV, PM, Defesa, Afinidades, patentes, Estudo…). Where the Livro Básico or an Atlas has the term, we use it; a Creature name that already exists in Portuguese keeps that name.
- Standard Portuguese names are used for well-known mythological creatures (Hidra, Minotauro, Fênix). Proper names and coinages stay in English.
- Any term we had to coin is marked unofficial in the glossary and in the UI ("Montagem Rápida", "função", "poder de chefe", "poder negativo", and translated Creature names).
- Every Entry from this Source keeps its original English name, shown on the page and indexed for search.
- Entries label their Source "Bestiary Vol. I (inglês)" and cite the page printed in the English book (PDF index − 1).
- We still write our own summaries: stats and rules exact, no lore, advice or reward text copied or translated.

## Considered options

- **Wait for a Brazilian edition.** Nothing invented, but the builder, and half of the Bestiary, would not exist for an unknown time.
- **Add the creatures in English, untranslated.** No invented terms, but it breaks the app's PT-BR promise and mixes two languages on one screen.

## Consequences

- The "never invent a Portuguese term" rule in `CLAUDE.md` gets one exception: Vol. I Entries, with the marking above. It still holds for the Livro Básico and the Atlas books.
- `ENTRY_SOURCES` (API), `EntrySource` and `lib/sources.ts` (web) gain `bestiary-vol-1`; the migration adds the enum value.
- The PDF on disk is a Kickstarter "KS PREVIEW" copy. Everything seeded from it is for this private table; if the app were ever shared beyond it, this ADR and the use of the book must be revisited.
- If Jambô publishes a Brazilian Vol. I, its terms replace ours. Slugs derive from the Portuguese names we chose, so renaming a Creature is a slug change and needs a redirect; we keep `originalName` so entries can be matched to the new edition.
