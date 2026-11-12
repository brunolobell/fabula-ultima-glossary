import { useId, type ReactNode } from 'react';

interface Props {
  type: 'checkbox' | 'radio';
  name?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
  label: ReactNode;
  /** The price or tag at the right of the label ("+100z"). */
  tag?: string;
  summary?: ReactNode;
  /** Why it cannot be chosen; also read out by screen readers. */
  reason?: string;
  /** Extra controls shown under the row while it is chosen. */
  children?: ReactNode;
}

/** One choice of the Forge: a checkbox or radio with its summary and, when off, its reason. */
export function OptionRow({
  type,
  name,
  checked,
  disabled,
  onChange,
  label,
  tag,
  summary,
  reason,
  children,
}: Props) {
  const reasonId = useId();
  return (
    <li className="border-b border-line">
      <label
        className={`flex min-h-[44px] cursor-pointer items-start gap-3 py-2 ${
          disabled && !checked ? 'text-muted' : ''
        }`}
      >
        <input
          type={type}
          name={name}
          className="mt-1.5"
          style={{ accentColor: 'var(--primary)' }}
          checked={checked}
          disabled={disabled}
          aria-describedby={reason ? reasonId : undefined}
          onChange={onChange}
        />
        <span className="min-w-0 flex-1">
          <span className="font-bold">{label}</span>
          {tag && <span className="ml-2 text-muted">{tag}</span>}
          {summary && (
            <span className="block text-meta text-muted">{summary}</span>
          )}
          {reason && (
            <span id={reasonId} className="block text-meta text-accent-ink">
              {reason}
            </span>
          )}
        </span>
      </label>
      {checked && children && <div className="pb-3 pl-8">{children}</div>}
    </li>
  );
}
