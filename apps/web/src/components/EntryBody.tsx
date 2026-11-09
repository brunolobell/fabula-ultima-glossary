import { Children, isValidElement, type ReactNode } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import { Link } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import { decorateChecks } from '../lib/check';
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

function buildComponents(headingShift: number): Components {
  const heading =
    (level: 2 | 3 | 4) =>
    ({ children }: { children?: ReactNode }) => {
      const tag = `h${Math.min(level + headingShift, 6)}` as 'h2';
      const Tag = tag;
      const style = headingShift > 0 ? 'h-minor' : HEADING_CLASS[level - 2];
      return <Tag className={style}>{children}</Tag>;
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
  return (
    <div className="entry-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={buildComponents(headingShift)}
      >
        {resolveEntryLinks(body, index)}
      </ReactMarkdown>
    </div>
  );
}
