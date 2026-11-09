import type { EntryType } from '../api/types';
import { TYPE_INFO } from '../lib/entryTypes';

export function TypeBadge({ type }: { type: EntryType }) {
  return <span className="badge">{TYPE_INFO[type].label}</span>;
}
