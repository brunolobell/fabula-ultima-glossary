import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';

/**
 * What the Reader is building in a forge, kept in memory for the session so a
 * mistaken tap on a link (then Back) does not lose the build. Never written to
 * disk: a reload clears it, and "Recomeçar" resets it.
 */
export const DraftContext = createContext<Map<string, unknown> | null>(null);

/** `useState` whose value outlives the page: the last value comes back on return. */
export function useDraft<T>(
  key: string,
  initial: () => T,
): [T, Dispatch<SetStateAction<T>>] {
  const store = useContext(DraftContext);
  const [value, setValue] = useState<T>(() =>
    store?.has(key) ? (store.get(key) as T) : initial(),
  );
  useEffect(() => {
    store?.set(key, value);
  }, [store, key, value]);
  const set = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => setValue(next),
    [],
  );
  return [value, set];
}
