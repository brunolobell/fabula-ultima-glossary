# DESIGN.md — Códice do Cristal

Design system for **Códice do Cristal**, a private, unofficial, Portuguese-language (PT-BR) reference for the Fabula Ultima tabletop RPG, in the spirit of Archives of Nethys. It is used by Players and Game Masters at one table to find what they need to create a character and to play. Domain vocabulary (Entry, Entry Type, Guide, Page Reference, Summary…) is defined in [GLOSSARY.md](./GLOSSARY.md); the storage decision is in [ADR 0001](./docs/adr/0001-single-entry-table.md).

This document is written in English for the codebase. All user-facing copy is PT-BR; examples below are the real strings to use.

## 1. Principles

The source is the *Fabula Ultima Third Party License — Style Guide*. We follow its **principles** and deliberately do **not** copy its **trade dress**.

### Followed from the style guide

- **Single column, short bits.** One column, frequent bullets and breaks, so the reader "catches their breath" between sections.
- **Self-contained sections.** A reader never has to leave a page to understand it. A Class page shows its Skills and Spells inline; related facts are repeated rather than only linked.
- **Four-level header hierarchy** (main, secondary, tertiary, minor), well spaced.
- **Muted, pastel colors.** One or two main hues; variety comes from **gradients**. Black (ink) text stays readable.
- **Highlights without lines or contours** for important rules, summaries and examples. Never boxes with borders.
- **Sans-serif body**, a decorative face only for main headers.
- **Bold** marks core concepts and keywords, guiding the eye on return visits.
- **Friendly but honest tone.** Not intimidating; says plainly when something may cause trouble.
- **No real-world measures** in rules text (Cena, Turno, dias de viagem — never minutes, hours or meters).

### Deliberately not copied (trade dress)

The guide states third-party work "cannot reproduce the Fabula Ultima trade dress (such as its color palette, graphics, and cover layout) and must not give the impression of being an official product".

- **No green palette.** Ours is indigo-violet and apricot.
- **No filigree/flourish borders, corner curl ornaments, logo, or cover layout.** Our ornaments are a crystal-shaped bullet, a thin gradient rule, and a small crystal that leads each main header.
- **No official logotype, no "Fabula Ultima" lettering treatment.** The game's name appears only as plain text in the tagline and notice.
- **Every page carries the unofficial notice** (see §2).

## 2. Identity

- **Name:** Códice do Cristal
- **Tagline:** Referência não oficial para Fabula Ultima
- **Footer notice (every page):**
  > Códice do Cristal é uma referência não oficial, feita por fãs e de uso privado. Não é afiliada à Need Games, à Rooster Games nem à Jambô Editora. Fabula Ultima © Need Games e Rooster Games; edição brasileira © Jambô Editora.
- **Font credit (footer):** "Títulos em Credit Valley, de Ray Larabie (Larabie Fonts)."
- **Logo:** text only — the name set in Credit Valley with a small crystal glyph (an inline SVG, rotated square elongated vertically). No other mark.

## 3. Color

Two main hues: **indigo-violet** (primary) and **apricot** (secondary, used sparingly: example highlights, and one small mark that always means "this is where you are / what is selected": a crystal glyph in `--accent` on the current menu item (its count in `--accent-ink`), a pressed chip or a filter button with chosen values, and the highlighted search suggestion). Apricot is never decoration. Variety comes from gradients that fade to transparent, left to right, like the guide's highlights. Light is the default only until the Reader chooses; see §3.3.

### 3.1 Tokens

```css
:root {                               /* light */
  --bg:            #FFFFFF;
  --surface:       #F7F6FC;           /* stat bar, table header, cards */
  --ink:           #1D1B2B;           /* body text */
  --ink-muted:     #5B5873;           /* meta text, captions */
  --line:          #D8D4E8;           /* hairlines only (rules, table rows) */
  --primary:       #4A4398;           /* links, buttons, focus ring */
  --primary-deep:  #363074;           /* header bars, main-header rule */
  --on-primary:    #FFFFFF;
  --on-bar:        #FFFFFF;           /* text on gradient bars, both themes */
  --tint-key:      #ECE9F8;           /* key-rule highlight (indigo) */
  --tint-example:  #FCEEE2;           /* example highlight (apricot) */
  --accent-ink:    #8A4A1F;           /* "Exemplo:" label on apricot */
  --accent:        #C2661F;           /* apricot crystal marker (graphics, ≥ 3:1) */
  --hp:            #A83D4E;           /* stat bar: Pontos de Vida */
  --mp:            #2F5F9E;           /* stat bar: Pontos de Mente */
  --on-stat:       #FFFFFF;
}

:root[data-theme="dark"] {
  --bg:            #14131C;           /* indigo-tinted near-black, never #000 */
  --surface:       #1C1B27;
  --ink:           #E9E7F4;
  --ink-muted:     #A9A6C0;
  --line:          #37354D;
  --primary:       #B4AEF2;
  --primary-deep:  #4A4398;
  --on-primary:    #14131C;
  --tint-key:      rgba(155, 144, 240, 0.16);   /* ≈ #2A273E on --bg */
  --tint-example:  rgba(242, 167, 119, 0.14);   /* ≈ #332829 on --bg */
  --accent-ink:    #F2B48A;
  --accent:        #F2A777;
  --hp:            #E2788A;
  --mp:            #7BA6E6;
  --on-stat:       #14131C;
}
```

### 3.2 Gradients

Gradients are the only decoration on color. All fade **left → right to transparent**, so a highlight is never a closed shape.

| Token | Definition | Used for |
| --- | --- | --- |
| `--grad-key` | `linear-gradient(90deg, var(--tint-key), transparent)` | Key-rule highlight, secondary-header band |
| `--grad-example` | `linear-gradient(90deg, var(--tint-example), transparent)` | Example highlight |
| `--grad-rule` | `linear-gradient(90deg, var(--primary-deep), transparent)` (2px tall) | Main-header underline |

### 3.3 Light/dark toggle

- The first visit follows `prefers-color-scheme`.
- A button in the header toggles light ↔ dark (two states, not three). The choice is saved in `localStorage` and overrides the system setting from then on.
- Implementation: set `data-theme="light|dark"` on `<html>`. A tiny inline script in `index.html` sets it **before first paint** (no flash). Tailwind's `colors` are replaced by the CSS variables above (no raw palette, no `dark:` variants), so one class works in both themes. Consequence: Tailwind opacity modifiers such as `bg-primary/50` do not work; define a token instead (e.g. `--scrim`).
- Toggle button: icon only (sun/moon), `aria-label="Alternar tema claro/escuro"`, `aria-pressed` reflecting dark, 44×44 px target.

### 3.4 Contrast (WCAG AA, measured)

| Pair | Light | Dark |
| --- | --- | --- |
| `--ink` on `--bg` | 16.88 | 15.09 |
| `--ink-muted` on `--bg` | 6.80 | 7.81 |
| `--primary` on `--bg` (links) | 8.24 | 9.02 |
| `--ink` on key highlight | 14.13 | 11.80 |
| `--primary` on key highlight | 6.90 | 7.05 |
| `--ink-muted` on key highlight | 5.69 | 6.11 |
| `--ink` on example highlight | 14.85 | 11.65 |
| `--accent-ink` on example highlight | 6.00 | 7.91 |
| `--on-bar` on `--primary-deep` (bar start) | 11.46 | 8.24 |
| `--on-primary` on `--primary` (buttons) | 8.24 | 9.02 |
| `--accent` glyph on `--bg` (graphic, ≥ 3:1) | 4.03 | 9.27 |
| `--accent` glyph on key tint | 3.37 | 7.25 |
| `--accent-ink` count on key tint | 5.71 | 8.00 |
| `--on-stat` on `--hp` | 6.10 | 6.39 |
| `--on-stat` on `--mp` | 6.46 | 7.41 |

Every text pair is ≥ 4.5:1. Re-measure when changing any token. Text on a gradient must sit on the **opaque end** (left); never let text run into the transparent end of a dark bar.

## 4. Typography

All three fonts are free and self-hosted (no external font requests).

| Role | Font | Source and license |
| --- | --- | --- |
| **Main header** (page title, once per page) | **Credit Valley**, regular only, uppercase | Ray Larabie, Larabie Freeware EULA: free for personal and commercial use, **must not be altered**. Serve the original `.ttf` unmodified (no WOFF2 conversion, no subsetting); keep `Larabie Fonts License.txt` next to it in the repo. Not on npm. |
| **Secondary, tertiary, minor headers**, labels, badges, stat-bar labels | **Antonio**, uppercase | OFL 1.1, via `@fontsource/antonio` |
| **Body**, bullets, tables, highlights, buttons, inputs | **PT Sans Narrow** | OFL, via `@fontsource/pt-sans-narrow` (400, 700) |

Notes:

- **Portuguese coverage verified.** Credit Valley contains every accented letter (ç ã õ á à â é ê í ó ô ú ü, both cases) and « » “ ” ’ – —. It lacks only **º and ª**; the stack falls back to Antonio for them (`font-family: "Credit Valley", "Antonio", sans-serif`).
- **No faux bold on Credit Valley.** Set `font-synthesis: none` on main headers; only the regular face is shipped.
- **Bold in body text** uses PT Sans Narrow 700, never a color change, to mark core concepts and keywords.
- Use `font-display: swap`; preload Credit Valley and PT Sans Narrow 400.

### Scale

PT Sans Narrow is small for its nominal size, so the body is larger than the guide's 10 pt equivalent of 16 px.

| Element | Size / line-height | Notes |
| --- | --- | --- |
| Body | **18 px / 1.6** | Never below 15 px anywhere (the guide's "don't go under 9 pt"). |
| Small / meta | 15 px / 1.5 | Page Reference, captions, footer. |
| Main header | 40 px / 1.1 (32 px under 640 px) | Credit Valley, uppercase, letter-spacing 0.02em. |
| Secondary header | 26 px / 1.2 | Antonio, uppercase, letter-spacing 0.04em. |
| Tertiary header | 21 px / 1.2 | Antonio, uppercase, 0.04em. |
| Minor header | 18 px / 1.2 | Antonio, uppercase, 0.03em. |

Header weight follows rank (a lower level never looks louder than the one above it): secondary is the only saturated bar, tertiary a pale band, minor a hairline. Numbers in tables and stat bars use `tabular-nums`.

## 5. Header hierarchy

Mirrors the guide's four levels. **Main and secondary are the common ones**; tertiary separates important sections inside one secondary header; minor is rare, used when a tertiary was already used or anything heavier would hurt readability. Headers of the same level are ordered by what best serves the explanation, otherwise generic → specific, otherwise alphabetical.

| Level | HTML | Look |
| --- | --- | --- |
| **Main** | `h1` | Credit Valley, `--primary-deep` (dark mode: `--ink`), a small `--primary` crystal before the title (0.3 em × 0.5 em, scales with the type; no side stripe), `--grad-rule` underline spanning the content width. One per page. |
| **Secondary** | `h2` | Antonio, `--on-bar` (white in both themes) on a `--primary-deep` bar that hugs its text (`width: fit-content`). A 3 rem right padding holds a tail where the bar fades to transparent, so text never enters the fade. 8 px vertical, 12 px left padding. |
| **Tertiary** | `h3` | Antonio, `--heading` on a `--grad-key` band (full width, 6×12 px padding), no border. |
| **Minor** | `h4` | Antonio, `--primary-deep` (dark: `--primary`), a 1 px `--line` underline only. |

Note: `--on-bar` is `#FFFFFF` in both themes. Do not use `--on-primary` for bars; in dark mode it is a dark ink meant for text on the (light) `--primary` button.

**Spacing:** keep headers and sections well apart. `margin-top` before a secondary header is 40 px, before a tertiary 28 px, before a minor 20 px; 12 px below any header. The reader should breathe between "mini-achievements".

## 6. Components

### 6.1 Key highlight
Important rule, advice, or a Summary. Background `--grad-key`, 16×20 px padding, no border, no radius. Used for the Entry's **Summary** directly under the title.

### 6.2 Example highlight
Separates examples. Background `--grad-example`, begins with a bold **Exemplo:** label in `--accent-ink`. Same shape as 6.1. This is the only use of apricot as a surface. In an Entry's Markdown body, an example is a blockquote that starts with `**Exemplo:**`; the renderer turns that blockquote into this component.

> **Ending rule.** If a header comes directly after a highlight, the section must end with non-highlighted text first (the guide: "otherwise, it will look a bit unfinished"). The Entry layout (§8.3) bakes this in: "Veja também" is plain text.

### 6.3 Bullet list
A crystal-shaped marker (an inline SVG or CSS shape, ~6×9 px rotated square, `--primary`) replaces the disc. Two forms, as in the guide:

- **Default:** `**Título.** Texto` on a `--grad-key` background row, for lists of rules.
- **Light:** same text with no background, for when the default would be heavy on the eyes.

Use bullets for things that share one header. If steps must happen in order, use the **stepper** (6.7), not bullets.

### 6.4 Stat bar
For structured `details`, modeled on the guide's NPC profile. A single row (wrapping on phones) on `--surface`, hairline `--line` top and bottom, labels in Antonio uppercase, values in PT Sans Narrow bold.

- **Spell ("Feitiço"):** PM (the cost; may scale, e.g. "10 × A" for per-target), Alvo, Duração, and an offensive marker. The book marks offensive spells with a lightning-bolt icon; we show a small bolt (inline SVG) with an "Ofensivo" text label for screen readers.
- **Skill ("Poder"):** NP máximo (the book's "(NP)" is the Skill Level).
- **Equipment:** varies by Kind (e.g. weapon: Categoria, Precisão, Dano).
- **HP/MP cells** use `--hp` / `--mp` backgrounds with `--on-stat` text.
- **Check formulas** (the book prints them like `(DES + VIG) +2`) use the `.check` component: bold text between decorative brackets drawn in CSS (`::before`/`::after`), not the 【】 glyphs, since our fonts lack them. Attribute abbreviations are exactly the book's: **DES**, **VIG**, **AST**, **VON**.

### 6.5 Entry Type badge
Small uppercase Antonio label (e.g. CLASSE, PODER, FEITIÇO, EQUIPAMENTO) on `--tint-key` with `--primary` text, 4×8 px padding, pill-less (radius 2 px). One style for all types; the label carries the meaning, not a new hue (keeps to one or two main colors).

### 6.6 Entry link
`[[slug]]` in body Markdown renders as an inline link: `--primary`, underline on hover/focus, bold only if the author bolded it. No auto-linking.

### 6.7 Stepper (Guide steps)
The guide says ordered steps deserve a flowchart. A Guide renders as a **vertical stepper**: a numbered crystal marker per step connected by a 2 px `--line` rail; each step has a tertiary-style title, a short intro, and its Entries as compact result rows (6.9).

### 6.8 Buttons and inputs
- **Primary button:** `--primary` background, `--on-primary` text, Antonio uppercase, radius 4 px, min-height 44 px.
- **Ghost button / chip:** transparent, 1 px `--line`; selected state `--tint-key` background + `--primary` text + the crystal. A toggle chip (search type filter) uses `aria-pressed="true"`; a type-list filter button is a disclosure, so it uses `aria-expanded` and marks "has chosen values" with `data-active`.
- **Search input:** 48 px tall (the Home hero box: 56 px, 18 px text, 20 px from `sm`), 1 px `--line`, 4 px radius, 18 px text; placeholder "Buscar regras, classes, poderes, feitiços…".
- **Focus:** 2 px `--primary` outline with 2 px offset on every interactive element. Never remove it.

### 6.9 Result row
Used in search, type lists and steppers. Badge (omitted on a type list, where every row has the same type and the badge would repeat the page title), name (PT Sans Narrow 700, 20 px, `--primary`, not Antonio), a two-line Summary snippet in `--ink`, and a meta line in `--ink-muted` (15 px): for a Skill or Spell the Class name in `--ink` and, for a Spell, "PM **cost**" (a per-target cost such as "5 × A" carries a "Custo por alvo" hint), then "Livro Básico, p. **X**", separated by " · ". The Class is plain text, not a link, because the whole row is already a link. Rows are separated by hairlines, not cards; the whole row is the link.

### 6.10 Tables
Header row on `--surface` with Antonio labels; rows separated by `--line` hairlines; no vertical lines, no zebra. On phones a wide table scrolls horizontally inside its own container, never the page.

### 6.11 Siglas legend
Under the stat bar of an Entry or Guide that uses abbreviations, a closed native `<details>`: "Siglas nesta página" in `--primary`, followed by the abbreviations actually used, in `--ink-muted` (for example "PM, RA"). Open, it lists each one as `SIGLA` (Antonio, `--ink-muted`) and **the book's term**, then a short gloss in our own words. The summary row is 44 px tall; it is plain text, never a highlight. The table lives in `src/lib/abbreviations.ts` and holds only terms from the Livro Básico (NP nível de poder, PV, PM, PI, DES, VIG, AST, VON, RA rolagem alta, ND nível de dificuldade, PJ, NPC). Detection is whole-word and case-sensitive, over the summary, body, Class free benefits, children and stat labels. A page that uses none shows nothing.

### 6.12 Modal (Weapon Forge)
A native `<dialog>` opened with `showModal()`, so the browser traps focus, makes the page inert and returns focus to the opener. The backdrop is `--scrim`. From `sm` it is a centered panel (at most 64 rem wide, 92 vh tall, 4 px radius, 1 px `--line` outline); on a phone it fills the screen. A title bar holds the title (Antonio, uppercase, `--heading`), the action chips ("Recomeçar") and a "Fechar" chip, over a hairline; the body scrolls under it. Esc, "Fechar" and a click on the backdrop close it. Tabs inside it are chips with `role="tab"` and `aria-selected`. The page behind does not scroll while it is open.

The Forge's form and result sit in two columns from `md`: the choices on the left, the result card (6.1 key highlight, `aria-live="polite"`) pinned on the right. On a phone the result card is pinned to the bottom on an opaque `--bg` strip, at most 40 vh tall, so the gradient never lets the list show through. Choices are 44 px rows (checkbox or radio, bold name, price tag in `--ink-muted`, summary in 15 px `--ink-muted`); a choice that is blocked is muted and says why in `--accent-ink` under its summary, so the reason never depends on colour alone.

## 7. Layout and responsive

- **Mobile first.** Players use phones at the table. Design at 360 px first.
- **Single column of content.** Reading width is capped at **44 rem** (≈ 70 characters at 18 px). Navigation lives in a **lateral menu** (see below), not in a second content column.
- **Lateral menu** (decided after the first design pass, replacing "no sidebar in v1"): from `lg` (1024 px) a fixed 16 rem sidebar on the left, sticky to the viewport height; below `lg` a slide-in drawer opened by a menu button in the header, closed by its button, the overlay, `Esc`, or navigating. Structure, in the style of the Archives of Nethys, alphabetical (PT-BR) at every level: **Início** followed by the guides, all plain links with no heading of their own; then collapsible groups **Criação de Personagem** (Classes, Feitiços, Poderes, Poderes Heroicos) and **Equipamento** (Todo o equipamento, then Acessórios, Armaduras, Armas, Artefatos, Escudos), and **Regras** as a plain link. A group heading is only a toggle button (`aria-expanded`, chevron), not a page; groups start open from `lg` (the column has room) and collapsed in the drawer, several can be open at once, the group holding the current page opens itself, and the open state is not remembered between visits. Group toggles are the only uppercase headings in the menu; pages (Início, guides, Regras) are plain body-font links. Items are links to a type list (or to `/equipamento?item=<kind>`), each with its entry count, and the menu never lists individual entries or Classes. Search is not in the menu: it lives only in the header box. The current page is highlighted and exposed with `aria-current`.
- **Gutters:** 16 px on phones, 24 px from 640 px up.
- **Touch targets:** at least 44×44 px.
- **Breakpoints:** `sm` 640 px, `md` 768 px. Only the header layout and stat-bar wrapping change; the page remains one column.
- **No horizontal page scroll** at any width.
- **Header:** menu button (below `lg`), logo/name, search box and theme toggle. The logo is 20 px below `sm` (24 px from there) so the menu button, logo and theme toggle share one row at 360 px. On Home the search box is left out of the header, because the hero already holds a larger one. From `md` the search box sits beside the logo; on phones it wraps to its own full-width row. The header is not sticky (it costs too much height on phones); the sidebar is sticky instead.
- **Footer:** unofficial notice and font credit (§2).

## 8. Pages

Client-side routing is required (the app is currently a single page).

### 8.1 Home — `/`
1. Hero: the tagline as large plain text (28 px, 32 px from `sm`, bold; the game's name is never set in the display face) and a large search box. It is the largest type on the page, so the hero leads. The logo in the header already carries the site name, so the `h1` is visually hidden (`sr-only`). The section headers below it use the quiet tertiary style, not the solid secondary bar.
2. Two **Guide cards**: "Criar um personagem" and "Como jogar". Surfaces are `--grad-key` rows with a Credit Valley title and a one-line promise; the whole card is the link.
3. **"Navegar por tipo"**: a grid of the five Entry Types (Regras, Classes, Poderes, Feitiços, Equipamento), each with a count.

### 8.2 Search — `/buscar?q=…&tipo=…`
- **The search box is a type-ahead** (header and Home hero). From 2 characters, after a ~200 ms pause, a panel under the box lists **at most 10 matches** (name, Entry Type badge, one-line Summary), name matches first, with a last row "Ver todos os N resultados" (or "Abrir a página de busca" when there are 10 or fewer). **Enter opens this search page** (`/buscar?q=`); if the Reader arrowed to a suggestion, Enter opens that Entry instead. Click opens an Entry; `Esc` or leaving the box closes the panel. The box never changes this page's results while typing. With the box empty and focused, the panel instead lists the last 5 entries the Reader opened ("Vistos recentemente", kept in `localStorage`, newest first, same keyboard behaviour). **`/`** focuses the box from anywhere that is not a text field (a small `/` hint sits inside the box from `md`, and the input carries `aria-keyshortcuts`). The box accepts at most 100 characters, the limit the API enforces. It is an ARIA combobox (`role="combobox"`, `aria-activedescendant`, a `listbox` of `option`s) with an empty state ("Nenhuma entrada encontrada para “…”. Confira a grafia.").
- Matching is **case- and accent-insensitive** ("pericia" finds "Perícia"); the API matches against accent- and case-folded columns computed when an Entry is saved, so no PostgreSQL extension is needed.
- One **ranked list** (name matches first, then body matches) of result rows (6.9).
- Filter chips by Entry Type (every browsable type, Poderes Heroicos included), each with its count; only types that have results are offered, plus **Todos** (a chosen type stays visible even at 0). Both the query and the filter live in the URL so a Reader can paste a link into the group chat.
- Result count in plain words: "12 resultados para “perícia”".

### 8.3 Entry — `/:tipo/:slug`
Top to bottom:
1. Breadcrumb back to the type list ("Feitiços › Clarão").
2. **Main header**: the Entry name.
3. Meta row: type badge and "ver Livro Básico, página **X**".
4. **Summary** as a key highlight.
5. **Stat bar** if the type has `details` to show.
6. **Body** (Markdown): secondary headers, bullets, example highlights.
7. **Class pages only:** a plain-text "Nesta página" index (Benefícios iniciais, Poderes, Feitiços, Poderes Heroicos, with counts), then free benefits, then **Skills** and **Spells** inline, each as a tertiary-header section. Under the Poderes and Feitiços headers a row of jump links lists every name. A section with a single fact (a Skill's NP máximo) shows it in the meta line instead of a stat bar. The Class page is fully readable without clicking away.
8. **"Veja também"** at the end as **plain text** links (never a highlight; see the ending rule in 6.2).

### 8.4 Guide — `/guias/:slug`
Main header, intro as key highlight, then the stepper (6.7). Examples: *Criar um personagem*, *Como jogar*. An Entry is shown as a full result row only in the first step that lists it; a later step shows a one-line "Ver de novo: Traços (passo 1)" with a link to the Entry and an anchor to that step, so a guide never repeats a card.

### 8.5 Type list — `/:tipo`
Main header with the type's name, then result rows, alphabetical unless the type has a natural order. Filters are **one line of buttons** under the description, one button per filter (`Classe ▾`, `Efeito ▾`, `Livro ▾`), 44 px tall, with no row labels. A filter appears only when it has at least two options (a single option filters nothing). The button reads `Nome` when off, `Nome: valor` with one value and `Nome: N` with several, and takes the selected state when it has values. A button opens its options in a panel **under the bar** (inline, pushing the list; one panel at a time): checkbox rows with the label on the left and, in `--ink-muted` on the right, the count the option would show given the other filters' chosen values (zero is shown muted, not hidden, and stays selectable). The panel has a 1 px `--line` outline and no card background, uses 2 columns from `sm` and 3 from `md`, and scrolls past 16 rem. It stays open while the Reader ticks options and closes on its button, on Esc (focus returns to the button) or when another filter opens; a click outside does not close it. OR inside a filter, AND between filters. "Limpar filtros" is a text link at the end of the bar, shown only while a filter is on. On phones the buttons wrap. The Equipment "Tipo de item" filter is hidden from `lg`, where the menu offers the same choice. Equipment lists add filter by Kind (acessórios, armaduras, armas, artefatos, escudos), kept in the URL as `?item=armas` so the menu and the filter agree. The Heroic Skills list adds the "Requisito" filter ("Disponíveis a todos / Exigem classe") and shows each skill's requirement under its summary.

The weapons list (`?item=armas`) also carries a primary "Forjar arma" button under the description, with a muted "Nada é salvo." beside it. It opens the Weapon Forge (6.12); the open tab is in the URL (`&forja=personalizada` or `&forja=rara`), the weapon being built is not.

### 8.6 Not found
"Não encontramos essa página." with the search box and a link to Home.

## 9. Writing conventions (the guide adapted to PT-BR)

Game vocabulary comes **only** from the Portuguese Core Rulebook (*Fabula Ultima TTJRPG: Livro Básico*, Jambô, 1ª ed., nov. 2025); never invent a translation. If the book is missing a term, flag it instead of guessing. Content is **our own summary** with exact rules and numbers, plus a Page Reference on every Entry. Never paste book text (the book's copyright page forbids reproduction). The Page Reference format is "ver **Livro Básico**, página **X**", where X is the **printed** page number (PDF index − 4); verify it against the printed number, not the PDF viewer's.

| Convention | Rule |
| --- | --- |
| Singular they | The guide uses singular *they*. In PT-BR use neutral wording ("a pessoa", "quem joga", "o personagem", "todos na mesa"). Prefer rewording over "@" or "x". |
| Players and Game Master | **Jogadores** and **Mestre**, always capitalized, equal in importance. Use "participantes" or "todos" when meaning both. If the book uses other terms, use the book's. |
| Durations | Only **Cena**, **Turno**, or a unique timing ("até o início do seu próximo turno", "até o amanhecer"). No minutes or hours. |
| Distances | Only **Cena** (everyone present), **dias de viagem** on the map, **visão** and **audição**. No meters or feet. |
| Formatting by term type | The guide's per-type rules, mapped to the book's names and still to be **checked against how the Portuguese book actually formats each type** before the seeds are written. Confirmed vocabulary: **Traços** (Identidade, Tema, Origem), **Laços** (not "Vínculos"), **Pontos de Vida (PV)**, **Pontos de Mana (PM)**, **Pontos de Fabula**, **Pontos de Ultima**, **Pontos de Inventário**, **Poderes** (with **NP**), **Feitiços**, **Rituais**, **Relógios**, **Testes**, **Crise**, **Condições** (Abalado, Atordoado, Enfurecido, Envenenado, Fraco, Lento). Attributes: **Destreza (DES)**, **Vigor (VIG)**, **Astúcia (AST)**, **Vontade (VON)**. |
| Writing an effect | Order is conditions → costs ("você pode…") → effects. State clearly when something is optional; otherwise it is mandatory. |
| Tone | Friendly but honest: say when a rule can cause confusion or discomfort. No intimidating jargon walls. |

**Migration note.** The 8 seed terms written earlier are English and partly wrong for this edition ("Mind Points" is "Pontos de Mana", "Bond" is "Laço", "Insight" is "Astúcia", and the book defines Crise as current PV at or below half the maximum, rounded down). Rewrite them in PT-BR from the book rather than translating them literally.

## 10. States and accessibility

- **Empty search:** "Nenhuma entrada encontrada para “…”. Confira a grafia." Always offer a clear action: with a type chosen, the message itself carries "Buscar em todos os tipos". An empty filtered list says "Nenhuma entrada com esses filtros." with "Limpar filtros" inside the message (the separate clear link is hidden then, so there is one).
- **Retries:** a 4xx response is never retried (a missing entry shows "não encontrado" at once); other failures are retried twice before the error state appears.
- **Error:** say what happened and what to try: "Não foi possível carregar o conteúdo. Verifique sua conexão e tente de novo." (Only mention the API in development builds.)
- **Loading:** skeleton blocks shaped like result rows or the Entry layout, not a bare "Carregando…". Announce with `aria-busy`.
- **Contrast:** WCAG AA in both themes (§3.4), visible focus rings, color never the only carrier of meaning (the offensive-spell marker also has a text label for screen readers).
- **Semantics:** one `h1` per page, headings in order, landmarks (`header`, `main`, `nav`, `footer`), the search field is `role="search"`.
- **Motion:** gradients and the crystal bullet are static. Transitions are limited to color and opacity at ≤ 150 ms and are disabled under `prefers-reduced-motion`.
- **Language:** `<html lang="pt-BR">`.

## 11. Implementation notes

- Colors, gradients and fonts live as CSS variables in `apps/web/src/index.css`; `tailwind.config.js` maps theme colors to those variables, so components never reference raw hex values.
- Credit Valley files go in `apps/web/src/assets/fonts/` with their license file; Antonio and PT Sans Narrow come from `@fontsource`.
- The API this design depends on exists: read-only `GET /api/entries` (`?search=`, `?type=`) and `GET /api/entries/:slug` (a Class also returns its Skills then Spells as `children`). Content lives in seed files under `apps/api/src/database/seed-data/`.
- The UI is built: routes, pages and components live in `apps/web/src` (see `CLAUDE.md` for the map). Keep this document and `src/index.css` in step when a token or component changes.
