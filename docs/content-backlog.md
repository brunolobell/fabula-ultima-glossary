# Content backlog: what the source books have that the app does not

Audit date: 2026-11-16. Compared the table of contents (PDF bookmarks) and page text of every source PDF against the entries that `seedEntries` produces (885 entries, dumped by running the seed module, not read from a database).

Page numbers are the **printed** page of that book (Livro Básico: PDF index − 4; Atlas and Codex Extra: − 2; Bestiary Vol. I: − 1), as in `CLAUDE.md`. In the Livro Básico the offset becomes −3 inside the Bestiário, so check the footer before seeding anything there.

## How priority was decided

The app is a Nethys-style reference for one table: people search for a thing mid-session, then browse by type. So:

1. **Rules and items that are looked up during play** come first. A gap there makes the app look broken, and the books and the seeded Classes already cross-reference those pages ("Livro Básico, página 74").
2. **Content that fits an existing Entry Type** (`rule`, `equipment`, `peculiarity`, `creature`, `class`) is cheaper than content that needs a new type or a new tool. Cost is a tie-breaker, not the main criterion.
3. **Optional rules and Game Master advice** come after the core rules; they matter only to tables that use them.
4. **Setting material** (worlds, villains, pre-made heroes) is last. It was already deferred to "v2" in the project notes and is mostly fiction, not rules.

| Priority | Meaning |
| --- | --- |
| **P1** | Core gap: a player or GM will search for it in the first session. |
| **P2** | Real mechanics that are missing, but only for some tables or some roles. |
| **P3** | Useful, mostly advice or optional; do after P1 and P2. |
| **P4** | Setting or flavour content, or out of the agreed scope. |

---

## P1: do first

### P1.1 Livro Básico play rules that are not seeded

Why first: this is the book every table owns, and the rules chapter is what people search mid-session. Today only some of it exists as Entries (Testes and its detail pages, Relógios, Pontos de Vida/Mana, Zero PV, Condições, Fabula/Ultima, Rituais, Projetos, Equipamento, Serviços). The missing parts below are the ones used every turn. They are all `rule` Entries, so no schema work.

| Section | Printed pages | What is missing |
| --- | --- | --- |
| ~~Ações~~ | 66-75 | **Done** (`seed-data/actions.ts`: the hub "Ações" plus Ataque, Estudo, Guarda, Impedimento, Objetivo, Inventário and "Equipamento (ação)"; Poder, Feitiço and Outro live in the hub). Still open from the same pages: Trabalho em equipe (76), Encerrando conflitos and Efeitos e turnos (77), and the p. 78+ objective-clock examples. |
| Cenas de conflito | 58-65 | How to structure a conflict, Iniciativa, Rodadas e turno, Espaço e distâncias. |
| ~~Testes (detail)~~ | 38-51 | **Done** (`seed-data/checks.ts` plus the expanded hub "Testes" in `rules.ts`: Oportunidades, Nível de dificuldade, Evocando Traços e Laços, Testes opostos, Testes em grupo and Testes frequentes, with the optional rules Sucesso custoso, Evocando falhas and Escolha compartilhada de atributo). |
| ~~Descanso~~ | 90-91 | **Done** (`seed-data/rest-and-travel.ts`, with the Natural Fantasy camp rule as a separate linked Rule). |
| Dano | 92-93 | Dano and improvised damage. |
| ~~Jornadas e viagens~~ | 106-109 | **Done** (one Rule: Etapas, nível de ameaça, Perigos, Descobertas, map updates). |
| ~~Pontos de inventário~~ | 104-105 | **Done** (one Rule with the item table and the barraca mágica). |
| Masmorras (for players) | 110-111 | Dungeon exploration. |
| Trabalho em equipe | 76-77 | Group checks and help. |
| Optional conflict rules, objective-clock examples | 78-83 | Short; bundle with Ações. |

Suggested shape: one Entry per section, written in our own words with exact numbers, in the style of the existing "Relógios" and "Pontos de Fabula" Rules.

### ~~P1.2~~ Livro Básico rare items, accessories and artifacts — **Done**

Seeded 2026-11-16: all 187 items, the Rules "Criar acessórios raros" and "Artefatos", the 21 Atlas rare evolutions with their 21 basic Custom Weapon examples, 3 Bestiary Vol. I accessories and the Rule "Qualidades de recompensa". The audit found the Atlas rare-item lists (45, 45 and 59 items) already complete and correct. Still out: Bestiary rewards that are artifacts, magiseeds or consumables, and the Codex and Bonus sample-character weapons. The text below is the original audit.

Why first: the Atlas versions of all of these are seeded (`equipment`, 149 entries) and the Weapon and Armor Forges generate rare gear, but the **Livro Básico's own example list is absent**. A table with only the core book cannot look up "Yoichi" or "Anel do Ovo". Roughly **185 items**, all `equipment`, and `equipment/rare-helpers.ts` already has the builders.

| Block | Printed pages | Approx. count |
| --- | --- | --- |
| Rare weapons by category (arcanas, arcos, luta, adagas, fogo, malhos, pesadas, lanças, espadas, arremesso) | 270-279 | ~110 |
| Rare armors | 281-282 | ~22 |
| Rare shields | 283 | ~12 |
| Accessories (plus the feature table on 284-285) | 285-287 | ~29 |
| Artifacts: Astroscópio, Bastão da Terra Ascendente, Elmo dos Pensamentos, Escama do Vento, Fragmento de Voz, Pena Final, Rasga-Almas, Sangue Preto, Tomo do Portão, Varinha dos Ermos, Zênite do Homem Morto | 288-291 | 11 |

The Weapon Forge tests already import the books' own examples, so seeding these also gives the forge a second source of truth.

---

## P2: real mechanics, narrower audience

| # | Content | Where | Why this level |
| --- | --- | --- | --- |
| P2.1 | **Poderes de NPCs and Espécies de NPC**; **Campeões**, enxames and ondas; **Batalhas de chefe**; the worked boss examples | LB p.292-318 (Feitiços de NPC p.310 is done) | GM-side rules the app half-covers: the Laboratório Oroboros replaces them for Quick Assembly, but the Livro Básico's own rules for Campeões, Enxames (cited by the Atlas as "p. 297") and Batalhas de chefe are not searchable. |
| P2.2 | **Experiência e níveis**, Criando PJs de nível alto, Regras de avanço opcionais | LB p.226-231 | Level thresholds and what each level grants. The seeded "Nível e Experiência" is a 318-character stub. |
| P2.3 | **Novos Arcanos** (12: Anhangá, Airmid, Baihu, Dâmocles, Fafnir, Huginn e Muninn, Lady Higabana, Maneki-Neko, Marchosias, Rangda, Rondolo, Tiamat) | Codex Extra p.8-14 | Class content for a Class we already seed, in a book already in scope. The six Vol. I arcana are already in the Arcanista `body` (`## Arcanos do Bestiary Vol. I`); this is the same pattern and small. |
| P2.4 | **Novas Peculiaridades** (about 9) | Codex Extra p.26-35 | The `peculiarity` type, list filters and "Livro" filter exist; each Codex entry fits as-is. Needs `CodexExtra` in the filter and the "Também em:" check against the Atlas names. |
| P2.5 | **Tecnosferas**: Mnemosferas (classes stored in gear), Hoplosferas (36 effects on a d66 table), alternative rules, tokens and cards | Techno Fantasy p.130-145 | A whole optional subsystem that rewrites equipment and advancement; Techno Fantasy tables that use it cannot play without it. Biggest single Atlas gap. Needs a design decision (own Entry type vs. Rules plus `equipment`). |
| P2.6 | **Materiais e Fabricação** and the **Gerador de Materiais** tables | Natural Fantasy p.74-83 | Crafting economy for Natural Fantasy campaigns; the generator is table-driven, so it could reuse the forge-style tooling. |
| ~~P2.7~~ | **Done.** **Atividades de Acampamento** (a list of camp activities; count not taken) | Natural Fantasy p.130-133 | Optional rule that changes what a rest scene does; one `rule` plus one Entry per activity, or a single Rule with a table. |
| ~~P2.8~~ | **Done** (one Rule, Gladsheimr as a text example). **Escala Veicular** and **Veículo de grupo** (creating one, vehicle conflicts, the worked "Gladsheimr") | Techno Fantasy p.65-69 | Real mechanics, and the seeded Piloto Class refers to vehicles and modules. |
| P2.9 | **Making Adjustments** (adjusting a creature's rank: soldiers, elites, champions 2 and up) | Bestiary Vol. I p.81-84 | Explains how to use all 140 seeded Vol. I stat blocks at a different rank. Short. |

---

## P3: advice, optional, or niche

| Content | Where | Note |
| --- | --- | --- |
| **Poderes Zero** (creating and using them, Estopins/Efeitos tables, naming tables, variants) | High Fantasy p.124-133 | Optional rule, about 10 pages. The earlier decision was to keep it out; reopen only if the user wants it. |
| **Prólogos** | LB p.220-225 | Character-introduction scenes; used once per character, at creation. |
| **Dinâmicas de grupo** | LB p.140-144 | Group dynamics and play tips. |
| **Cenas, Cenas de Interlúdio, Sessões e campanhas**, "Material de jogo" | LB p.30-33, 22-27 | Scene structure; mostly orientation. |
| **Mestre chapter advice**: Papel do mestre, Classes de personagem (per-Class tips), A arte dos vilões, Masmorras, Recompensas | LB p.244-265 | GM craft, not rules lookups. Recompensas (p.264) was not read for numbers; check it when seeding. |
| **Lady Carmilla** (two stat blocks) | Codex Extra p.62-65; Necromancer Bonus p.6-7 | Two printings of the same boss; creature type exists. Seed once, source `codex-extra`, mention the Bonus. |
| **Per-creature extras**: Enemy Information, Special Rewards, Guidelines, Environments, Allies, "In your campaign" | Bestiary Vol. I, each family | Already noted in `CLAUDE.md` as not seeded. Large (140 blocks) and prose-heavy. |
| **Sample Formations** (about 27 ready-made encounters) | Bestiary Vol. I p.358-362 | Useful for prep; needs an encounter shape (a Group-like Entry of members). |
| **Atlas "Conflitos", "Magia e Rituais" (NF/TF parts), "Tecnologia"** chapters | HF p.60-65, 74-75; NF p.62-69, 72-73; TF p.60-64, 76-81 | Mostly GM advice. Magia e Rituais is already one Rule covering all three; the TF **Cibernéticos** (p.77) and "Máquinas colossais" bits are the only mechanical parts. |

---

## P4: setting, flavour, or out of scope

| Content | Where | Why last |
| --- | --- | --- |
| World locations (10 per Atlas, 30 total) | HF p.16-59; NF p.16-61; TF p.16-59 | Setting fiction; the project placed the Atlas world chapters in v2. |
| Pre-made heroes (10 per Atlas) | HF p.90-101; NF p.96-107; TF p.96-107 | Characters, not rules. |
| Villains (5 per Atlas, with stat blocks) | HF p.164-197; NF p.172-205; TF p.180-213 | Stat blocks would fit `creature`, but `CLAUDE.md` says Atlas creatures are out of scope. |
| Novos Personagens Clássicos (HF, NF, TF, Codex) | HF p.132-137; Codex p.36-39 | Pre-built archetypes; the "Criar um personagem" Guide already covers the idea. |
| Bonus sample characters (Collector, Trickster, Deathmage, Reaper) | Ace of Cards p.7; Necromancer p.5 | Builds, not rules. |
| Bestiary Vol. I Introduction and Troubleshooting (GM philosophy) | p.8-24 | Advice prose. |
| Bestiary Vol. I Profile Lists | p.353-357 | The `creature` list filters already give these views. |
| Atlas pillars, "Antes de começar", Inspirations, Index | each Atlas | Orientation or reference-only. |
| *Nova Gênesis*, *Spelunca Ultima*, *Viligante* | `~/Downloads/PT-BR/` | Out of scope by project decision. Not audited. |

---

## Covered: nothing to do

| Book | Seeded |
| --- | --- |
| Livro Básico | 15 Classes (75 Poderes, 38 Feitiços), 31 Heroic Skills, basic weapons, armor and shields, 56 Creatures, 25 Rules, 4 Guides, 7 Services, 8 Transports, Feitiços de NPC, Weapon and Armor Forge rules |
| High Fantasy | 4 Classes, Heroic Skills, rare items and artifacts, Peculiaridades, Armas Personalizadas, Magia e Rituais |
| Natural Fantasy | 4 Classes, Heroic Skills, rare items and artifacts, Peculiaridades |
| Techno Fantasy | 3 Classes, Heroic Skills, rare items, artifacts and Piloto modules, Peculiaridades, space-travel Services and Transports |
| Codex Extra | 6 Classes, Heroic Skills |
| Fabula Bonus (Ace of Cards, Necromancer) | Carteador and Necromante, 7 Heroic Skills |
| Bestiary Vol. I | 140 stat blocks, 32 Creature Groups, 9 Sample Companions, Quick Assembly (7 Rules, all Skills and Species), 4 variant Rules, the 6 new Arcana (inside Arcanista) |

## Method and limits

- Compared PDF bookmarks and page text (PyMuPDF) with the entry names, types and pages of the seed module. Sections are "missing" when no Entry or Rule body covers them; the Rule bodies were scanned for headings and key terms ("Iniciativa", "Descanso", "Estudo", "Prólogo"…).
- Counts for P1.2 are page-level estimates (rows of the example tables); the exact number is known only after seeding.
- **Not re-verified item by item:** the Atlas rare-item lists, the Heroic Skill lists and the Class power lists were checked for plausible counts, not against every row. The earlier seeding sessions cross-checked them, but this audit did not repeat that.
- The Bestiary Vol. I PDF is the Kickstarter **preview** copy; the final book may add content.
- The Codex Extra "Novos Poderes Heroicos" list has 7 skills replaced by the Fabula Bonus copies (ADR 0005), so the seeded 23 + 7 should match the Codex's 30 pages of entries; this was not recounted.

## Suggested order

1. P1.1 play rules (largest user-visible gain, no new code).
2. P1.2 Livro Básico rare items (mechanical, builders exist).
3. P2.3 and P2.4 (small Codex additions).
4. P2.2, P2.1, P2.9 (rules that finish the core book and Vol. I).
5. P2.5 to P2.8 (Atlas subsystems; each needs a short design conversation first).
6. P3 and P4 on demand.
