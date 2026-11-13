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

- **Teal, not the official green.** Ours is a deep blue-leaning teal (hue about 180) taken from the Feather sprite, with apricot as the accent (§2, §3). It is not the official logo's saturated emerald, and there are no filigree borders, no logotype and no cover layout.
- **No filigree/flourish borders, corner curl ornaments, logo, or cover layout.** Our ornaments are a crystal-shaped bullet, a thin gradient rule, and a small crystal that leads each main header.
- **No official logotype, no "Fabula Ultima" lettering treatment.** The game's name appears only as plain text in the tagline and notice.
- **Every page carries the unofficial notice** (see §2).

## 2. Identity

- **Name:** Códice do Cristal
- **Tagline:** Referência não oficial para Fabula Ultima
- **Footer notice (every page):**
  > Códice do Cristal é um sistema independente, não oficial, feito por fãs e de uso privado. Não é afiliado, aprovado nem endossado pela Need Games, pela Rooster Games nem pela Jambô Editora. Fabula Ultima, seu nome, a pena e demais marcas e materiais do jogo são © Need Games e Rooster Games; edição brasileira © Jambô Editora.
- **Font credit:** not shown in the footer (removed on purpose in commit `02b0183`); the licence file stays beside the font in the repo.
- **Logo:** text only — the name set in Credit Valley with a small crystal glyph (an inline SVG, rotated square elongated vertically). No other mark in the header.
- **The Feather:** the Fabula Ultima Feather, a 16 × 16 pixel sprite (`FeatherIcon` in `components/Icons.tsx`, drawn from `docs/design/feather.svg`), used in two places only: beside the Home tagline (32 px) and above the message of a not-found or empty-search state (48 px). Only at 16, 32 or 48 px (whole multiples of its grid), `shape-rendering: crispEdges`, `aria-hidden`. It is inline SVG so the `--feather-*` tokens can recolor it in the dark theme. Its use is a deliberate, owner-approved exception for a private group, covered by the notice below.
- **Favicon and browser colour:** the logo crystal as an SVG (`public/favicon.svg`, deep teal on light, light teal on dark by `prefers-color-scheme`), and a `theme-color` of `--bg` for each scheme.

## 3. Color

Two main hues: **feather teal** (primary, a deep blue-leaning teal drawn from the Feather sprite) and **apricot** (secondary, used sparingly: example highlights, and one small mark that always means "this is where you are / what is selected": a crystal glyph in `--accent` on the current menu item (its count in `--accent-ink`), a pressed chip or a filter button with chosen values, and the highlighted search suggestion). Apricot is never decoration (the Feather sprite is the one exception, §2). Variety comes from gradients that fade to transparent, left to right, like the guide's highlights. Light is the default only until the Reader chooses; see §3.3.

### 3.1 Tokens

```css
:root {                               /* light */
  --bg:            #FFFFFF;
  --surface:       #F3F8F7;           /* stat bar, table header, cards */
  --ink:           #172625;           /* body text */
  --ink-muted:     #4B6361;           /* meta text, captions */
  --line:          #D0E0DE;           /* hairlines only (rules, table rows) */
  --line-control:  #7A9693;           /* border of a text field or select (≥ 3:1 on --bg) */
  --primary:       #1A6366;           /* links, buttons, focus ring */
  --primary-deep:  #164B4E;           /* header bars, main-header rule */
  --on-primary:    #FFFFFF;
  --on-bar:        #FFFFFF;           /* text on gradient bars, both themes */
  --tint-key:      #E3F1F0;   /* key-rule highlight (teal) */
  --tint-example:  #FCEEE2;   /* example highlight (apricot) */
  --accent-ink:    #8A4A1F;   /* "Exemplo:" label on apricot */
  --accent:        #C2661F;   /* apricot crystal marker (graphics, ≥ 3:1) */
  --hp:            #A83D4E;           /* stat bar: Pontos de Vida */
  --mp:            #2F5F9E;           /* stat bar: Pontos de Mente */
  --on-stat:       #FFFFFF;
}

:root[data-theme="dark"] {
  --bg:            #101A1B;   /* teal-tinted near-black, never #000 */
  --surface:       #172324;
  --ink:           #E4F0F0;
  --ink-muted:     #9CB5B5;
  --line:          #2B4042;
  --line-control:  #5D7E80;
  --primary:       #81CED3;
  --primary-deep:  #1A5F63;
  --on-primary:    #101A1B;
  --tint-key:      rgba(111, 193, 198, 0.16);   /* ≈ #1F3536 on --bg */
  --tint-example:  rgba(242, 167, 119, 0.14);   /* ≈ #302E28 on --bg */
  --accent-ink:    #F2B48A;
  --accent:        #F2A777;
  --hp:            #E2788A;
  --mp:            #7BA6E6;
  --on-stat:       #101A1B;
}
```

The teal family keeps one hue in both themes (OKLCH hue about 199-201, HSL about 183): the dark `--primary`, `--primary-deep`, `--line-control` and `--tint-key` were moved from about 189 (which read mint) to match the light `--primary`. `--bg`, `--surface` and `--line` stay near hue 203. Lightness is unchanged, so contrast holds (§3.4).

The Feather sprite has its own tokens (`--feather-ink`, `-eye`, `-shade`, `-mid`, `-light`, `-pale`, `-white`) in `index.css`; in the dark theme `--feather-ink` is `--line` and `--feather-eye` is `--ink-muted`, so the outline does not vanish on `--bg`. They are used by `FeatherIcon` only.

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
| `--ink` on `--bg` | 15.67 | 15.20 |
| `--ink-muted` on `--bg` | 6.45 | 8.17 |
| `--primary` on `--bg` (links) | 6.95 | 9.87 |
| `--ink` on key highlight | 13.51 | 11.12 |
| `--primary` on key highlight | 5.99 | 7.22 |
| `--ink-muted` on key highlight | 5.56 | 5.98 |
| `--ink` on example highlight | 13.78 | 11.65 |
| `--accent-ink` on example highlight | 6.00 | 7.54 |
| `--on-bar` on `--primary-deep` (bar start) | 9.76 | 7.34 |
| `--on-primary` on `--primary` (buttons) | 6.95 | 9.87 |
| `--accent` glyph on `--bg` (graphic, ≥ 3:1) | 4.03 | 8.91 |
| `--accent` glyph on key tint | 3.47 | 6.52 |
| `--accent-ink` count on key tint | 5.88 | 7.20 |
| `--line-control` on `--bg` (field boundary, graphic, ≥ 3:1) | 3.18 | 4.02 |
| `--on-stat` on `--hp` | 6.10 | 6.39 |
| `--on-stat` on `--mp` | 6.46 | 7.41 |

Every text pair is ≥ 4.5:1. Re-measure when changing any token. Text on a gradient must sit on the **opaque end** (left); never let text run into the transparent end of a dark bar.

## 4. Typography

All three fonts are free and self-hosted (no external font requests).

| Role | Font | Source and license |
| --- | --- | --- |
| **Main header** (page title, once per page) | **Credit Valley**, regular only, uppercase | Ray Larabie, Larabie Freeware EULA: free for personal and commercial use, **must not be altered**. Serve the original `.ttf` unmodified (no WOFF2 conversion, no subsetting); keep `Larabie Fonts License.txt` next to it in the repo. Not on npm. |
| **Secondary, tertiary, minor headers**, labels, badges, stat-bar labels (not buttons or chips) | **Antonio**, uppercase | OFL 1.1, via `@fontsource/antonio` |
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
| Body | **18 px / 1.6** | PT Sans Narrow is small for its nominal size, so it never goes below 16 px (the guide's "don't go under 9 pt"). Uppercase Antonio labels may be 15 px. |
| Small / meta | **16 px** / 1.6 (`text-meta`, 1 rem) | Page Reference, captions, row facts, footer, option summaries. Body face, muted colour. |
| Label | 15 px (`text-label`, 0.9375 rem) | Antonio uppercase only: badges, stat-bar labels, the key cap in the search box. |
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
- **HP/MP cells** (the PV and PM of a Creature's stat block) are filled chips: `--hp` / `--mp` backgrounds with `--on-stat` text, set by `tone: 'hp' | 'mp'` on a `Cell`. A chip is at least 5 rem wide, left-aligned, and bleeds 10 px into the bar's gap so its text lines up with the cells around it.
- **Check formulas** (the book prints them like `(DES + VIG) +2`) use the `.check` component: bold text between decorative brackets drawn in CSS (a 2 px `--primary` border on each side, rounded), not the 【】 glyphs, since our fonts lack them. Attribute abbreviations are exactly the book's: **DES**, **VIG**, **AST**, **VON**.

### 6.5 Entry Type badge
Small uppercase Antonio label (e.g. CLASSE, PODER, FEITIÇO, EQUIPAMENTO) on `--tint-key` with `--primary` text, 4×8 px padding, pill-less (radius 2 px). One style for all types; the label carries the meaning, not a new hue (keeps to one or two main colors).

### 6.6 Entry link
`[[slug]]` in body Markdown renders as an inline link: `--primary`, underline on hover/focus, bold only if the author bolded it. No auto-linking.

### 6.7 Stepper (Guide steps)
The guide says ordered steps deserve a flowchart. A Guide renders as a **vertical stepper**: a numbered crystal marker per step connected by a 2 px `--line` rail; each step has a tertiary-style title, a short intro, and its Entries as compact result rows (6.9).

### 6.8 Buttons and inputs
- **Primary button:** `--primary` background, `--on-primary` text, PT Sans Narrow 700 at 18 px, sentence case, radius 4 px, min-height 44 px. Controls are read, not scanned, so they use the body face; Antonio caps are for headings and labels.
- **Ghost button / chip:** PT Sans Narrow 700 at 16 px, sentence case (a value such as "Guardião" keeps its capital); transparent, 1 px `--line`; selected state `--tint-key` background + `--primary` text + the crystal. A toggle chip (search type filter) uses `aria-pressed="true"`; a type-list filter button is a disclosure, so it uses `aria-expanded` and marks "has chosen values" with `data-active`.
- **Search input:** 48 px tall (the Home hero box: 56 px, 18 px text, 20 px from `sm`), 1 px `--line-control` (a hairline `--line` is only about 1.5:1, too faint for the boundary of the main control; the same token borders `.field`, the select, number and text fields of the forms), 4 px radius, 18 px text; placeholder "Buscar regras, classes, poderes, feitiços…".
- **Focus:** 2 px `--primary` outline with 2 px offset on every interactive element. Never remove it.
- **Touch targets:** a standalone link (breadcrumb, back link, "Abrir página", a rule in a list, the Class in a stat bar) has class `tap`: a full 44 px target under `(pointer: coarse)`, compact with a mouse. Links inside a sentence are exempt.

### 6.9 Result row
Used in search, type lists and steppers. Badge (omitted on a type list, where every row has the same type and the badge would repeat the page title), name (PT Sans Narrow 700, 20 px, `--primary`, not Antonio), a two-line Summary snippet in `--ink`, and a meta line in `--ink-muted` (16 px): for a Skill or Spell the Class name in `--ink` and, for a Spell, "PM **cost**" (a per-target cost such as "5 × A" is followed by the words "por alvo", visible text, never a hover title), then "Livro Básico, p. **X**", separated by " · ". The Class is plain text, not a link, because the whole row is already a link. Rows are separated by hairlines, not cards; the whole row is the link.

### 6.10 Tables
Header row on `--surface` with Antonio labels; rows separated by `--line` hairlines; no vertical lines, no zebra. On phones a wide table scrolls horizontally inside its own container, never the page.

### 6.11 Siglas legend and page index
Under the stat bar of an Entry or Guide that uses abbreviations, a closed native `<details>`: "Siglas nesta página" in `--primary`, followed by the abbreviations actually used, in `--ink-muted` (for example "PM, RA"). Open, it lists each one as `SIGLA` (Antonio, `--ink-muted`) and **the book's term**, then a short gloss in our own words. The summary row is 44 px tall; it is plain text, never a highlight. The table lives in `src/lib/abbreviations.ts` and holds only terms from the Livro Básico (NP nível de poder, PV, PM, PI, DES, VIG, AST, VON, RA rolagem alta, ND nível de dificuldade, PJ, NPC). Detection is whole-word and case-sensitive, over the summary, body, Class free benefits, children and stat labels. A page that uses none shows nothing.

The same closed `<details>` (class `.disclosure`) holds **"Nesta página"** on a long entry: jump links to its secondary headings, 44 px rows, one column on a phone and two from `sm`, with "N seções" in the summary. It appears from four sections (a Rule, or a Creature Group counting its members); Classes use the same disclosure, with counts (8.3). Headings get their ids from `lib/headings.ts`, which both the index and `EntryBody` read, so a link always lands.

### 6.12 Forge pages (Forja de Armas, Forja de Armaduras e Escudos)
The forges are pages of their own, like the Laboratório Oroboros, with the wide column (`max-w-5xl`): `/forja-de-armas` (tabs "Arma personalizada" and "Arma rara", the open tab in `?forja=personalizada|rara`) and `/forja-de-armaduras`. They used to be modals; a modal trapped the Reader in half a phone screen and hid the tools from the menu. A page has the main header, one row with a plain back link to its list ("← Armas", "← Armaduras") at the left and a "Recomeçar" chip at the right, then one muted line (16 px): "Nada é salvo; o rascunho some ao recarregar." Tabs are chips with `role="tab"` and `aria-selected`.

The draft is kept in memory for the session (`lib/forgeDraft.ts`, a provider above the routes), so following a link and pressing Back restores the build. It is never written to disk; a reload or "Recomeçar" clears it.

The form and result sit in two columns from `md`: the choices on the left, the result (6.1 key highlight, `aria-live="polite"`) sticky on the right. On a phone the result is a strip pinned to the bottom on an opaque `--bg`, folded to one line ("Resultado", the total and the number of pending items; the card's own "Resultado" heading is then visually hidden, so the word is not said twice) and opened by a 44 px disclosure button (`aria-expanded`), up to 40 vh when open; a hidden polite status line carries the changes while it is folded. Choices are 44 px rows (checkbox or radio, bold name, price tag in `--ink-muted`, summary in 15 px `--ink-muted`); a choice that is blocked is muted and says why in `--accent-ink` under its summary, so the reason never depends on colour alone. The old modal links (`/equipamento?item=armas&forja=rara`) redirect to the pages.

## 7. Layout and responsive

- **Mobile first.** Players use phones at the table. Design at 360 px first.
- **Single column of content.** The column is **44 rem** wide for lists, tables, stat blocks and result rows. An entry that reads as prose (not a Class, a Creature or a body with a table) sits in a **34 rem** column so the title rule, headers and text share one edge, and its prose stops at **32 rem** (`--measure`: paragraphs, bullet lists, blockquotes, key and example highlights). Measured on PT Sans Narrow at 18 px, 44 rem holds about 110 characters per line and 32 rem about 82, near the top of a comfortable 65 to 80 range; the earlier "≈ 70 characters" was wrong for this narrow face. Highlights and bands fade to transparent, so a shorter one looks the same. Navigation lives in a **lateral menu** (see below), not in a second content column.
- **Lateral menu** (decided after the first design pass, replacing "no sidebar in v1"): from `lg` (1024 px) a fixed 16 rem sidebar on the left, sticky to the viewport height; below `lg` a slide-in drawer opened by a menu button in the header, closed by its button, the overlay, `Esc`, or navigating. Structure, in the style of the Archives of Nethys, alphabetical (PT-BR) at every level: **Início** followed by the guides, all plain links with no heading of their own; then collapsible groups **Bestiário** (Criaturas), **Criação de Personagem** (Classes, Feitiços, Peculiaridades, Poderes, Poderes Heroicos), **Equipamento** (Todo o equipamento, then Acessórios, Armaduras, Armas, Artefatos, Escudos, Serviços e transporte) and **Ferramentas** (Forja de Armaduras e Escudos, Forja de Armas, Laboratório Oroboros; pages without a count), and **Regras** as a plain link. A group heading is only a toggle button (`aria-expanded`, chevron), not a page; groups start closed on every screen size, except the one holding the current page, which is open on arrival so the "you are here" mark is never hidden; arriving in another group opens that one too, several can be open at once, the Reader can close any of them (moving inside a group does not reopen it), and the open state is not remembered between visits. Group toggles are the only uppercase headings in the menu; pages (Início, guides, Regras) are plain body-font links. Items are links to a type list (or to `/equipamento?item=<kind>`), each with its entry count, and the menu never lists individual entries or Classes. Search is not in the menu: it lives only in the header box. The current page is highlighted and exposed with `aria-current`.
- **Gutters:** 16 px on phones, 24 px from 640 px up.
- **Touch targets:** at least 44×44 px.
- **Breakpoints:** `sm` 640 px, `md` 768 px. Only the header layout and stat-bar wrapping change; the page remains one column.
- **No horizontal page scroll** at any width.
- **Header:** menu button (below `lg`), logo/name, search box and theme toggle. The logo is 20 px below `sm` (24 px from there) so the menu button, logo and theme toggle share one row at 360 px. On Home the search box is left out of the header, because the hero already holds a larger one. From `md` the search box sits beside the logo; on phones it wraps to its own full-width row. The header is not sticky (it costs too much height on phones); the sidebar is sticky instead.
- **Phone navigation.** The header is not sticky, so deep in a long page the search box is a long swipe away. A pill "Buscar" (primary button, 44 px, bottom right inside the safe area, below `lg` only) appears after about one and a quarter screens of scrolling; one tap jumps to the top and puts the cursor in the search box. It stays off the Forge pages, which use the bottom edge for their result strip. Going to another page starts at the top of it (`ScrollToTop`); Back and Forward, a filter or tab change (query) and a jump link (hash) keep the scroll position.
- **Footer:** the unofficial notice (§2).

## 8. Pages

Client-side routing is required (the app is currently a single page).

### 8.1 Home — `/`
1. Hero: the tagline as large plain text (28 px, 32 px from `sm`, bold; the game's name is never set in the display face) and a large search box. A 32 px Feather (§2) sits left of the tagline, level with its first line. It is the largest type on the page, so the hero leads. The logo in the header already carries the site name, so the `h1` is visually hidden (`sr-only`). The section headers below it use the quiet tertiary style, not the solid secondary bar. The tagline and its muted line ("Referência não oficial, feita por fãs.") share one column beside the Feather, so both start at the same edge.
   Under the search box, **"Vistos recentemente"** (`RecentEntries`): the last 5 entries the Reader opened (the same `localStorage` list as the type-ahead), as plain bold links with the type in muted text after each. It is read once on mount, so it never shifts the page, and it renders nothing on a first visit (no empty box, no tour). It exists because the commonest visit is a return to settle a rule. The hero box therefore does not open its own "Vistos recentemente" panel when focused empty (`recents={false}` on `SearchBox`): the panel would repeat this row and cover it. Typing 2 or more characters still opens the suggestions.
2. **"Por onde começar"**: the guides as rows, not cards (no gradient, no contour), two columns from `sm`: a Credit Valley title (22 px, `--primary`; the guides are the one list on Home whose titles are not a plain result name, because a Guide is a path through the book rather than an entry) and the first clause of the guide's summary (`guideBlurb`: up to the first colon, parenthesis or full stop; at most two lines). While the index loads the rows are skeletons in the same grid (`RowGridSkeleton`), each as tall as a row with a title line and a two-line blurb (bars sized in `1lh`, same `py-4`), so nothing below jumps; after a failed load the section is left out and the error above says why. The whole summary is on the guide's own page. The row has no "Abrir o guia" line; the hover tint and the hairline say it is a link.
3. **"Navegar por tipo"**: one compact `HomeRow` per Entry Type, two CSS columns from `sm` (not a grid, so a row with a gloss does not stretch its neighbour): the type name in the shared `.result-name` and the entry count at the right. Only the types whose name does not explain itself keep a one-line gloss under the name: Regras, Poderes Heroicos and Peculiaridades (`TYPE_HINTS` in `Home.tsx`); the other types show no line, and their descriptions (`TYPE_INFO`) live on their own list pages. A row without a gloss is `py-3`, one with it `py-4`. The rows are static, so they render at once; a count appears only when it is known (never while loading, never after a failed load, where "0 entradas" would be false). It comes before the tools because on a phone the menu is closed and this list is the only way to browse a type without opening it; search first, then browse by type.
4. **"Ferramentas"**: the three builders in the same row component (`HomeRow`), with the name in the result-row style of 6.9 (PT Sans Narrow 700, 20 px, `--primary`, sentence case, the shared `.result-name`) and a one-line promise. "Navegar por tipo" uses the same title style, so a name looks the same on Home and in a list; Antonio caps stay for headings and the menu's group toggles.

### 8.2 Search — `/buscar?q=…&tipo=…`
- **The search box is a type-ahead** (header and Home hero). From 2 characters, after a ~200 ms pause, a panel under the box lists **at most 10 matches** (name, Entry Type badge, one-line Summary), name matches first, with a last row "Ver todos os N resultados" (or "Abrir a página de busca" when there are 10 or fewer). **Enter opens this search page** (`/buscar?q=`); if the Reader arrowed to a suggestion, Enter opens that Entry instead. Click opens an Entry; `Esc` or leaving the box closes the panel. The box never changes this page's results while typing. With the box empty and focused, the panel instead lists the last 5 entries the Reader opened ("Vistos recentemente", kept in `localStorage`, newest first, same keyboard behaviour), on every page except Home, where the row under the hero box already shows them and the box is opened with `recents={false}` (typing still suggests). **`/`** focuses the box from anywhere that is not a text field (a small `/` hint sits inside the box from `md`, and the input carries `aria-keyshortcuts`). The box accepts at most 100 characters, the limit the API enforces. It is an ARIA combobox (`role="combobox"`, `aria-activedescendant`, a `listbox` of `option`s) with an empty state ("Nenhuma entrada encontrada para “…”. Confira a grafia.").
- Matching is **case- and accent-insensitive** ("pericia" finds "Perícia"); the API matches against accent- and case-folded columns computed when an Entry is saved, so no PostgreSQL extension is needed.
- One **ranked list** (name matches first, then body matches) of result rows (6.9).
- Filter chips by Entry Type (every browsable type, Poderes Heroicos included), each with its count; only types that have results are offered, plus **Todos** (a chosen type stays visible even at 0). Both the query and the filter live in the URL so a Reader can paste a link into the group chat.
- Result count in plain words: "12 resultados para “perícia”". With nothing found there is no count line; the empty message is the live status, so the query is not said twice. Each chip count is visual only (`aria-hidden`) and followed by hidden text, so a screen reader hears "Feitiços, 1 resultado", not "Feitiços 1".
- **No query** (`/buscar`): the one-line prompt, then "Vistos recentemente" (as on Home, absent on a first visit), then "Ou navegue por tipo" with every browsable type as a plain link (`TypeLinks`, nav "Tipos de entrada", 44 px targets on touch). **No results** ends with the same "Ou navegue por tipo" links, so a misspelt query is never a dead end.

### 8.3 Entry — `/:tipo/:slug`
Top to bottom:
1. Breadcrumb back to the type list ("Feitiços › Clarão").
2. **Main header**: the Entry name.
3. Meta row: type badge and "ver Livro Básico, página **X**".
4. **Summary** as a key highlight.
5. **Stat bar** if the type has `details` to show.
6. **Body** (Markdown): secondary headers, bullets, example highlights.
7. **Class pages only:** the closed "Nesta página" disclosure (6.11: Benefícios iniciais, Poderes, Feitiços, Poderes Heroicos, with counts) above the Siglas one, then free benefits, then **Skills** and **Spells** inline, each as a tertiary-header section. Under the Poderes and Feitiços headers a row of jump links lists every name. A section with a single fact (a Skill's NP máximo) shows it in the meta line instead of a stat bar. The Class page is fully readable without clicking away.
8. **"Veja também"** at the end as **plain text** links (never a highlight; see the ending rule in 6.2).

### 8.4 Guide — `/guias/:slug`
Main header, intro as key highlight, then the stepper (6.7). Examples: *Criar um personagem*, *Como jogar*. An Entry is shown as a full result row only in the first step that lists it; a later step shows a one-line "Ver de novo: Traços (passo 1)" with a link to the Entry and an anchor to that step, so a guide never repeats a card.

### 8.5 Type list — `/:tipo`
Main header with the type's name, then result rows, alphabetical unless the type has a natural order. Filters are **one line of buttons** under the description, one button per filter (`Classe ▾`, `Efeito ▾`, `Livro ▾`), 44 px tall, with no row labels. A filter appears only when it has at least two options (a single option filters nothing). The button reads `Nome` when off, `Nome: valor` with one value and `Nome: N` with several, and takes the selected state when it has values. A button opens its options in a panel **under the bar** (inline, pushing the list; one panel at a time): checkbox rows with the label on the left and, in `--ink-muted` on the right, the count the option would show given the other filters' chosen values (zero is shown muted, not hidden, and stays selectable). The panel has a 1 px `--line` outline and no card background, uses 2 columns from `sm` and 3 from `md`, and scrolls past 16 rem. It stays open while the Reader ticks options and closes on its button, on Esc (focus returns to the button) or when another filter opens; a click outside does not close it. OR inside a filter, AND between filters. "Limpar filtros" is a text link at the end of the bar, shown only while a filter is on. On phones the buttons wrap. The Equipment "Tipo de item" filter is hidden from `lg`, where the menu offers the same choice. Equipment lists add filter by Kind (acessórios, armaduras, armas, artefatos, escudos), kept in the URL as `?item=armas` so the menu and the filter agree. "Ordenar e preço" is one more button on the filter bar (same chip, same panel, one open at a time): its panel holds "Ordenar por" (a native select) and "Preço máximo" (a number field, in zênites). The button reads "Ordenar e preço: N" and takes the selected state while either is off its default; "Limpar filtros" clears the price too, and sorting and price are in the URL. The Heroic Skills list adds the "Requisito" filter ("Disponíveis a todos / Exigem classe") and shows each skill's requirement under its summary.

The weapons list (`?item=armas`) carries a primary "Forjar arma" link button at the right of the count line ("75 entradas"), and the armors and shields lists a "Forjar armadura ou escudo" one; the Creatures list does the same with "Laboratório Oroboros". They are shortcuts to the tool pages (6.12) and show only once the Rules that feed the tool are in the index. The page itself says "Nada é salvo", so the list does not repeat it.

### 8.6 Not found
A 48 px Feather (§2) above the heading, then "Não encontramos essa página." with links to the search page and to Home (the header already carries the search box on every page but Home).

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

- **Empty search:** "Nenhuma entrada encontrada para “…”. Confira a grafia." Always offer a clear action: with a type chosen, the message itself carries "Buscar em todos os tipos", and the type links ("Ou navegue por tipo") always follow it. An empty filtered list says "Nenhuma entrada com esses filtros." with "Limpar filtros" inside the message (the separate clear link is hidden then, so there is one).
- **Retries:** a 4xx response is never retried (a missing entry shows "não encontrado" at once); other failures are retried twice before the error state appears.
- **Error:** say what happened and what to try: "Não foi possível carregar o conteúdo. Verifique sua conexão e tente de novo." The block is the key highlight with a warning triangle and the first line in `--accent-ink`, so it never passes for a Summary; the "Tentar de novo" chip follows. (Only mention the API in development builds.)
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
