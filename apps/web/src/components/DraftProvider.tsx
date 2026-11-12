import { useState, type ReactNode } from 'react';
import { DraftContext } from '../lib/forgeDraft';

/** Holds the forge drafts for the session (see `useDraft`). Sits above the routes. */
export function DraftProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => new Map<string, unknown>());
  return (
    <DraftContext.Provider value={store}>{children}</DraftContext.Provider>
  );
}
