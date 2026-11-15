---
status: accepted
---

# Codex Extra and the two Fabula Bonus PDFs are in-scope Sources

The table plays with Classes that neither the Livro Básico nor the three Atlas books have. The Brazilian *Codex Extra* (Jambô, 2025) prints six of them (Astrólogo, Bandoleiro, Cavaleiro Mágico, Forjador de Almas, Lâmina Carmesim, Malandro) plus "Novos Poderes Heroicos". Two more, the Ace of Cards and the Necromancer, come from the free English *Fabula Ultima Bonus* PDFs (Need Games); the Codex prints Portuguese versions of those two as well. `CLAUDE.md` said other books were out of scope, with the Bestiary Vol. I as the one exception (ADR 0004). We add these books as Sources and take a second exception.

Decision:

- Three new Sources: `codex-extra` (official, PT-BR), `bonus-ace-of-cards` and `bonus-necromancer` (English, translated by us, unofficial). They are two Bonus Sources, not one, because both PDFs have a page 3 and a Page Reference must be unambiguous.
- Labels shown to Readers: "Codex Extra", "Fabula Bonus: Ace of Cards (inglês)", "Fabula Bonus: Necromancer (inglês)". As with the Bestiary Vol. I, the "(inglês)" suffix is the marking; the site-wide "não oficial" footer covers the rest.
- Page Reference is the printed page: Codex Extra is PDF index − 2; both Bonus PDFs are PDF index (offset 0).
- Content: 8 Classes (6 from the Codex, Carteador and Necromante from the Bonus) and 30 Heroic Skills (23 Codex, 4 Ace of Cards, 3 Necromancer).

Rules for the Bonus content:

- The Bonus text is the authority for Carteador, Necromante and the 7 Heroic Skills the two Bonus PDFs share with the Codex (Preto e Branco, Vanguarda das Cartas, Mestre de Duelos, Rito Proibido, Nascimento da Crueldade, Ceifeiro do Pesar, Pulso das Larvas). The Codex's own printed copies of those are not seeded, because the Codex copy is considered an older version.
- Bonus Entries use the Codex's Portuguese names, terms and slugs (`carteador`, `necromante`, `ceifeiro-do-pesar`…); we never coin a term the Codex or the Livro Básico already has. The English name stays in `tags` and is searchable. Mechanics come from the Bonus text.
- Everything from the English PDFs is translated into PT-BR, in our own words, with exact rules and numbers (the rules of ADR 0004 apply). Any term we had to coin would be marked unofficial in the glossary; none was needed.

## Considered options

- **Two Sources (`codex-extra` plus one `fabula-bonus`).** Fewer enum values, but a Page Reference of "p. 3" would not say which PDF.
- **Everything under `codex-extra`.** Simplest, but it labels unofficial English text as the Jambô book and loses the page citation.
- **Seed the Codex's Carteador and Necromante and skip the Bonus.** Official and Portuguese, but it is the older version of the rules and the user's table uses the Bonus one.
- **Seed both versions.** Two Classes with the same name and diverging rules; confusing and a slug clash.

## Consequences

- Skipped on purpose: the Codex's Arcanos, its Peculiaridades, "Novos Personagens Clássicos", the Lady Carmilla Creature (also printed in the Necromancer Bonus) and the sample characters in the Bonus PDFs. Any could be a later request.
- `ENTRY_SOURCES` (API), `EntrySource` and `lib/sources.ts` (web) gain the three values, and the migration `CodexExtraAndBonusSources` adds them to `entries_source_enum`. On every database run `npm run build --workspace @fug/api`, then `npm run migration:run --workspace @fug/api`, then `npm run db:seed`.
- The "never invent a Portuguese term" rule in `CLAUDE.md` now has two exceptions (Vol. I and the Bonus PDFs). It still holds for the Livro Básico, the Atlas books and the Codex Extra.
- Known inconsistencies in the sources, recorded so nobody "fixes" them by accident:
  - The Codex's table of Heroic Skills (p. 16) says Raízes Simbióticas needs a Companheiro Fiel of species "planta", but its Requisitos line (p. 23) says "(construto)". We follow the Requisitos line.
  - The Bonus Ceifeiro do Pesar gives Drenar Espírito a normal value of (RA + 15), raised to (RA + 20) at level 20 and (RA + 25) at level 40, while the seeded Livro Básico spell (p. 193) prints (RA + 20) as its base. We seed the Bonus text as printed; the discrepancy is unresolved.
- The Bonus PDFs are free downloads for this private table. If the app were ever shared beyond it, this ADR and the use of those books must be revisited. If Jambô publishes official versions, their terms replace ours.
