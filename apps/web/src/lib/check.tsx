import { Children, type ReactNode } from 'react';

// "(DES + VIG)", "(AST + VON) +2" and "(RA + 25)" are check formulas; the
// book prints them between brackets, so we draw brackets with CSS.
const CHECK =
  /\(((?:DES|VIG|AST|VON) \+ (?:DES|VIG|AST|VON)|RA \+ \d+)\)((?: \+\d+)?)/g;

function splitChecks(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(CHECK)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <span key={start} className="check">
        {match[1]}
      </span>,
      match[2],
    );
    last = start + match[0].length;
  }
  if (last === 0) return text;
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/** Wraps check formulas found in text children; other nodes pass through. */
export function decorateChecks(children: ReactNode): ReactNode {
  return Children.map(children, (child) =>
    typeof child === 'string' ? splitChecks(child) : child,
  );
}
