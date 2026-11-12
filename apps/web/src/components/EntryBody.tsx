import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import type { Element } from 'hast';
import { decorateChecks } from '../lib/check';
import { outline } from '../lib/headings';
import { resolveEntryLinks } from '../lib/links';
import type { EntrySummary } from '../api/types';

function textOf(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return textOf(node.props.children);
  }
  return '';
}

const HEADING_CLASS = ['h-secondary', 'h-tertiary', 'h-minor'];

function buildComponents(
  headingShift: number,
  idByLine: ReadonlyMap<number, string>,
): Components {
  // Secondary headings take the ids of `outline`, found by their line in the
  // body, so the "Nesta página" links can reach them. A shifted body sits under
  // a heading of its own and gets none.
  const heading =
    (level: 2 | 3 | 4) =>
    ({ node, children }: { node?: Element; children?: ReactNode }) => {
      const tag = `h${Math.min(level + headingShift, 6)}` as 'h2';
      const Tag = tag;
      const style = headingShift > 0 ? 'h-minor' : HEADING_CLASS[level - 2];
      const id =
        level === 2 && headingShift === 0
          ? idByLine.get(node?.position?.start.line ?? -1)
          : undefined;
      return (
        <Tag id={id} className={style}>
          {children}
        </Tag>
      );
    };

  return {
    h2: heading(2),
    h3: heading(3),
    h4: heading(4),
    p: ({ children }) => <p>{decorateChecks(children)}</p>,
    li: ({ children }) => <li>{decorateChecks(children)}</li>,
    td: ({ children }) => <td>{decorateChecks(children)}</td>,
    strong: ({ children }) => <strong>{decorateChecks(children)}</strong>,
    a: ({ href, children }) =>
      href?.startsWith('/') ? (
        <Link to={href}>{children}</Link>
      ) : (
        <a href={href} target="_blank" rel="noreferrer noopener">
          {children}
        </a>
      ),
    table: ({ children }) => (
      <div className="table-wrap">
        <table>{children}</table>
      </div>
    ),
    blockquote: ({ children }) =>
      textOf(Children.toArray(children)).trim().startsWith('Exemplo:') ? (
        <div className="highlight-example">{children}</div>
      ) : (
        <blockquote>{children}</blockquote>
      ),
  };
}

interface Props {
  body: string;
  index: ReadonlyMap<string, EntrySummary>;
  /** Push headings down when the body sits under another heading. */
  headingShift?: number;
}

export function EntryBody({ body, index, headingShift = 0 }: Props) {
  if (!body.trim()) return null;
  const idByLine = new Map(
    outline(body, index).map((item) => [item.line, item.id]),
  );
  return (
    <div className="entry-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={buildComponents(headingShift, idByLine)}
      >
        {resolveEntryLinks(body, index)}
      </ReactMarkdown>
    </div>
  );
}
