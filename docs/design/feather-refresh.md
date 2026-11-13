# Design changes: the Feather and its teal

Status: **applied**. The owner accepted section 0 (a small private group, not a product), the teal of section 3.1, both Feather placements, the document updates, and a footer notice saying this is an independent system. The code, `DESIGN.md` and `PRODUCT.md` were changed to match. Section 0 and 5 are kept as the record of the trade-off.

Asset made for this proposal: [`feather.svg`](./feather.svg), the Fabula Ultima Feather (`need.games/wp-content/uploads/2024/02/Feather-big.png`) rebuilt as a themable vector.

## Revision: teal primary, apricot accent

After the first pass the owner judged that indigo did not sit well next to the Feather. The palette was rebuilt around it: a deep blue-leaning teal is now the primary hue (`--primary #1A6366`, `--primary-deep #164B4E`; dark `#81CED3` and `#1A5F63`), neutrals are tinted toward teal, and apricot is back as the accent (selection marker, example highlight). Sections 1, 3.1 and 3.2 below describe the first pass; **the current values are in `DESIGN.md` §3 and `apps/web/src/index.css`**, with their measured contrast. The Feather placements (3.3) are unchanged. The favicon and `theme-color` follow the new primary.

## 0. Decision needed first

This change goes against three things the project already says:

| Source | What it says |
| --- | --- |
| Style Guide, p. 1 | Third-party content "cannot reproduce the Fabula Ultima trade dress (such as its color palette, graphics, and cover layout) and must not give the impression of being an official product". |
| `PRODUCT.md`, Anti-references | The official trade dress, "green palette ... The product must not look official." |
| `DESIGN.md` §1 | "No green palette. Ours is indigo-violet and apricot." |

The Feather is a Need Games graphic, and its teal is part of the official palette. Using the file is a use of that graphic, even on a private site. This proposal keeps the risk small and visible:

- Indigo stays the primary hue and carries every surface. The teal is a small accent, not a theme, so the site does not read as the official green.
- The Feather appears in two places only (section 3.3). No logotype, filigree, corner ornaments or cover layout, as before.
- The unofficial notice in the footer stays on every page.
- The Feather slot is a single component. If permission is not available, swap the sprite for an original feather glyph and nothing else changes (section 5).

If you would rather not take that risk at all, keep the teal and skip the sprite. The tokens in section 3.1 work without it.

## 1. What the Feather gives us

The sprite is a 16 x 16 pixel icon (the PNG is 200 x 200, so each pixel is 12.5 px; it is dithered a little, which is why a palette dump shows dozens of near-duplicates). Quantized to the colors it actually uses:

| Role | Observed values | Used for here |
| --- | --- | --- |
| Outline | `#070606` | Sprite outline only |
| Shade | `#2C473F`, `#3E6F5F`, `#477C66`, `#538471` | `--accent-ink`, `--accent` (light theme) |
| Mid teal | `#579EA5`, `#63ADB3`, `#71B1AA`, `#7BC4CB` | Sprite body |
| Light teal | `#8DC7BE` to `#C3E1DF` | `--accent` (dark theme), sprite body |
| Pale mint | `#D1E7E8` to `#F6FAFC` | `--tint-example` |
| White | `#FFFFFF` | Sprite highlight |

This is a muted, pastel teal-mint with a dark green shadow. That is what the Style Guide asks for on p. 5 ("muted, pastel-like colors ... one or two main colors at most ... gradients for variety"). It is not the saturated emerald of the official logo, which we do not use.

## 2. What the Style Guide asks for, and how this stays inside it

| Guide rule | Status |
| --- | --- |
| One or two main colors (p. 5) | Kept. Indigo (primary) plus teal (secondary). Teal **replaces** apricot; it does not join it, so there are still two hues. |
| Gradients for variety, highlights without contours (p. 5) | Kept. The example highlight stays a left-to-right fade, only its tint changes. |
| Black text stays readable (p. 5) | Kept. Every pair below is at least 4.5:1. |
| Sans-serif for everything but main headers (p. 5) | Untouched. |
| Header hierarchy (p. 4) | Untouched. |
| No trade dress (p. 1) | Reduced, not removed. See section 0. |

## 3. Changes

### 3.1 Tokens: teal replaces apricot (`apps/web/src/index.css`)

The secondary hue keeps its roles exactly: example highlight surface, "you are here / selected" mark, the label on errors and blocked choices. Only the values change, so no component needs a new class.

```css
:root {                                 /* light */
  --tint-example: #e4f1ef;              /* was #fceee2 */
  --accent-ink:   #2c5a4c;              /* was #8a4a1f */
  --accent:       #3f7a69;              /* was #c2661f */
}

:root[data-theme='dark'] {
  --tint-example: rgba(113, 177, 170, 0.14);   /* was rgba(242, 167, 119, 0.14); about #212930 on --bg */
  --accent-ink:   #a9d8cf;                     /* was #f2b48a */
  --accent:       #8dc7be;                     /* was #f2a777 */
}
```

Measured contrast (WCAG, same method as `DESIGN.md` §3.4):

| Pair | Light | Dark |
| --- | --- | --- |
| `--ink` on example highlight | 14.57 | 12.08 |
| `--ink-muted` on example highlight | 5.87 | 6.25 |
| `--accent-ink` on example highlight | 6.78 | 9.41 |
| `--accent-ink` on `--bg` | 7.85 | n/a |
| `--primary` on example highlight | 7.12 | not measured |
| `--accent` glyph on `--bg` (graphic, needs 3:1) | 5.00 | 9.69 |
| `--accent` glyph on key tint | 4.19 | 7.57 |

Re-measure the dark `--primary` on the example highlight when you apply this; it is the only pair not computed here.

Do not take the sprite's own mid teal (`#71B1AA`) as `--accent` in the light theme: it measures 2.45:1 on white and fails the 3:1 graphic floor. That is why the light `--accent` is the sprite's shade green, lightened a touch.

Teal and indigo differ in hue by about 100 degrees, so the marker still reads against indigo links. The marker is a shape (the crystal), never color alone, as `DESIGN.md` §3 already requires.

### 3.2 Sprite tokens (new, `index.css`)

Used only by the Feather component. They give dark mode a sprite that does not vanish.

```css
:root {
  --feather-ink:   #070606;
  --feather-eye:   #595755;
  --feather-shade: #3e6f5f;
  --feather-mid:   #63adb3;
  --feather-light: #bfdfda;
  --feather-pale:  #e6f2f2;
  --feather-white: #ffffff;
}
:root[data-theme='dark'] {
  --feather-ink: var(--line);     /* #070606 would be invisible on --bg (#14131c) */
  --feather-eye: var(--ink-muted);
}
```

On the dark theme the outline fades into the page and the pale body carries the shape. Check this by eye before shipping; if the silhouette is weak, raise `--feather-ink` toward `--ink-muted`.

### 3.3 Where the Feather appears

Two places, both with a reason. No decorative repeats.

1. **Home hero**, left of the tagline "Referência não oficial para Fabula Ultima". The tagline is 28 px (32 px from `sm`) bold, so a 32 px Feather (2x) sits level with its first line at every width and adds no height on phones. It is `aria-hidden`.
2. **Empty and not-found states** ("Nenhuma entrada encontrada para ...", "Não encontramos essa página."), 48 px (3x) above the message, left-aligned like the rest of the site. A quill fits "nothing written here yet", and it makes a dead end friendlier, which is the guide's "friendly but honest" tone (p. 3).

Not used: header logo, favicon, list rows, buttons, the "you are here" marker. The name is "Códice do Cristal", so the crystal stays the logo and the favicon (`DESIGN.md` §2). The marker stays a 6 x 10 px crystal; a 16 px sprite does not fit the 6 px gutter the menu and chips give it.

Size rule: render the sprite only at 16, 32 or 48 px (whole multiples of its 16 x 16 grid) with `shape-rendering="crispEdges"`. At any other size the pixels smear.

### 3.4 Component

Add `FeatherIcon` to `apps/web/src/components/Icons.tsx`, next to `CrystalIcon`. It must be inline SVG, not an `<img>`, because CSS variables do not cross into an image and the dark theme needs them.

```tsx
/** The Fabula Ultima Feather, 16 x 16 pixel sprite. Use at 32 or 48 px only. */
export const FeatherIcon = ({ size = 32, className }: { size?: 16 | 32 | 48; className?: string }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} shapeRendering="crispEdges" aria-hidden className={className}>
    {/* paste the <path class="f-..."> elements from docs/design/feather.svg,
        replacing each class with fill="var(--feather-...)" */}
  </svg>
);
```

`feather.svg` already holds the seven path groups (outline, eye, shade, mid, light, pale, white), one run per row, with the same `var(--feather-...)` names and the light-theme values as fallbacks. It renders correctly on its own.

### 3.5 Copy

No new user-facing strings, except a credit line if permission asks for one:

- Footer, after the existing notice, only if Need Games' permission requires it: "A pena é arte de Need Games." (adjust to their wording).

## 4. Documents to update when this is applied

These all say apricot or "no green"; they would be false after the change.

| File | Edit |
| --- | --- |
| `DESIGN.md` §1 | Replace "No green palette. Ours is indigo-violet and apricot." with indigo-violet and a muted teal that is smaller than the primary, and state the Feather's two placements. Keep "no logotype, no filigree, no cover layout". |
| `DESIGN.md` §2 | "Logo: ... No other mark." becomes "No other mark in the header; the Feather appears only on Home and in empty states." |
| `DESIGN.md` §3 intro, §3.1, §3.4 | Rename "apricot" to "feather teal"; replace the token values and the contrast rows with section 3.1 above. |
| `DESIGN.md` §6.2 | "This is the only use of apricot as a surface" becomes teal. |
| `PRODUCT.md` Anti-references | Narrow the first bullet: the official green palette as a theme, filigree, corner ornaments, logotype and cover layout stay banned; the Feather and its teal as an accent are the one allowed exception. |
| `PRODUCT.md` Principle 4 | "Two hues" stays true (indigo, teal). No edit needed beyond the word apricot if present. |
| `apps/web/src/index.css` | Tokens (3.1, 3.2). The comment "Apricot crystal" above the marker rule becomes "Teal crystal". |
| `CLAUDE.md` | No edit expected; `grep -rni apricot` the repo to be sure. |

## 5. Fallback without the official sprite

If permission is not there, keep sections 3.1, 3.2 (minus the sprite tokens) and 3.3, and draw an original feather: a leaning leaf shape with a quill line, in the same SVG slot, using only `--accent` and `--tint-example`. The placements, sizes and token changes do not depend on the sprite.

## 6. Checklist to apply

1. Decide section 0.
2. Edit `index.css` tokens; run `npm run dev`, look at Home, a Rule with an Exemplo highlight, `/buscar?q=zzzz`, the menu's current item and a pressed chip, in both themes.
3. Add `FeatherIcon`; place it on Home and in the empty/not-found states.
4. Re-measure the contrast table in `DESIGN.md` §3.4.
5. Update the documents in section 4.
6. `npm run test --workspace @fug/web` and `npm run build --workspace @fug/web`.

## 7. Out of scope

Typography, layout, header hierarchy, the stat bar's HP/MP colors, the favicon and the forge pages are unchanged by this proposal.
