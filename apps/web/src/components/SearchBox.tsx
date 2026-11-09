import {
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { MAX_SEARCH_CHARS } from '../api/client';
import type { EntrySummary } from '../api/types';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { MIN_SUGGESTION_CHARS, useSuggestions } from '../hooks/useSuggestions';
import { entryPath } from '../lib/entryTypes';
import { readRecents, type Recent } from '../lib/recent';
import { SearchIcon } from './Icons';
import { TypeBadge } from './TypeBadge';

const MAX_SUGGESTIONS = 10;
const DEBOUNCE_MS = 200;

interface Props {
  size?: 'md' | 'lg';
  label?: string;
}

/**
 * Type-ahead search: up to 10 matches appear under the box as you type.
 * Enter opens the search page; Arrow keys + Enter open a highlighted match.
 */
export function SearchBox({ size = 'md', label = 'Buscar' }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const urlQuery = pathname === '/buscar' ? (params.get('q') ?? '') : '';

  const [value, setValue] = useState(urlQuery);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [recents, setRecents] = useState<Recent[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const optionId = (index: number) => `${listId}-opcao-${index}`;

  const query = value.trim();
  const debounced = useDebouncedValue(query, DEBOUNCE_MS);
  const { data, isError } = useSuggestions(debounced);

  const matches = data ?? [];
  const items = matches.slice(0, MAX_SUGGESTIONS);
  const settled = debounced === query;
  const showResults = query.length >= MIN_SUGGESTION_CHARS;
  // With nothing typed yet, offer what the Reader opened last.
  const showRecents = !showResults && recents.length > 0;
  const showPanel = open && (showResults || showRecents);
  const navItems: Pick<EntrySummary, 'slug' | 'type'>[] = showResults ? items : recents;
  const optionCount = showResults
    ? items.length > 0
      ? items.length + 1 // + "ver todos"
      : 0
    : recents.length;

  // Follow the URL when it changes from elsewhere (back button, a link).
  useEffect(() => setValue(urlQuery), [urlQuery]);

  // "/" jumps to the box from anywhere that is not already a text field.
  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target?.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? '')) {
        return;
      }
      event.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Close when the page changes.
  useEffect(() => {
    setOpen(false);
    setActive(-1);
  }, [pathname, params]);

  useEffect(() => {
    if (active >= 0) {
      document
        .getElementById(`${listId}-opcao-${active}`)
        ?.scrollIntoView?.({ block: 'nearest' });
    }
  }, [active, listId]);

  function openSearchPage() {
    setOpen(false);
    navigate({
      pathname: '/buscar',
      search: query ? `?q=${encodeURIComponent(query)}` : '',
    });
  }

  function openEntry(entry: Pick<EntrySummary, 'slug' | 'type'>) {
    setOpen(false);
    setValue('');
    navigate(entryPath(entry));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (active >= 0 && active < navItems.length) openEntry(navItems[active]);
    else openSearchPage();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      if (showPanel) {
        event.preventDefault();
        setOpen(false);
        setActive(-1);
      }
      return;
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    if (!showResults && recents.length === 0) return;
    event.preventDefault();
    if (!open) {
      setOpen(true);
      return;
    }
    if (optionCount === 0) return;
    const step = event.key === 'ArrowDown' ? 1 : -1;
    // Positions cycle through -1 (nothing highlighted) and every option.
    const cycle = optionCount + 1;
    setActive((current) => ((((current + 1 + step) % cycle) + cycle) % cycle) - 1);
  }

  function onBlur(event: FocusEvent) {
    if (!rootRef.current?.contains(event.relatedTarget)) {
      setOpen(false);
      setActive(-1);
    }
  }

  const keep = (event: { preventDefault: () => void }) => event.preventDefault();

  return (
    <div ref={rootRef} className="relative" onBlur={onBlur}>
      <form role="search" onSubmit={onSubmit}>
        <label htmlFor={`${listId}-campo`} className="sr-only">
          {label}
        </label>
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          ref={inputRef}
          id={`${listId}-campo`}
          type="search"
          role="combobox"
          aria-expanded={showPanel && optionCount > 0}
          aria-controls={showPanel && optionCount > 0 ? listId : undefined}
          aria-autocomplete="list"
          aria-keyshortcuts="/"
          maxLength={MAX_SEARCH_CHARS}
          aria-activedescendant={active >= 0 ? optionId(active) : undefined}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => {
            setRecents(readRecents());
            setOpen(true);
          }}
          onKeyDown={onKeyDown}
          placeholder="Buscar regras, classes, poderes, feitiços…"
          autoComplete="off"
          className={size === 'lg' ? 'search-input search-input-lg' : 'search-input'}
        />
        {!value && (
          <kbd aria-hidden className="search-hint hidden md:block">
            /
          </kbd>
        )}
      </form>

      {showPanel && showRecents && (
        <div className="suggest-panel">
          <p className="suggest-heading" aria-hidden>
            Vistos recentemente
          </p>
          <ul
            id={listId}
            role="listbox"
            aria-label="Vistos recentemente"
            className="suggest-list"
          >
            {recents.map((entry, index) => (
              <li
                key={entry.slug}
                id={optionId(index)}
                role="option"
                aria-selected={active === index}
                onMouseDown={keep}
                onMouseEnter={() => setActive(index)}
                onClick={() => openEntry(entry)}
                className="suggest-option"
              >
                <span className="flex flex-wrap items-center gap-x-2">
                  <span className="suggest-name">{entry.name}</span>
                  <TypeBadge type={entry.type} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showPanel && showResults && (
        <div className="suggest-panel">
          {items.length > 0 ? (
            <ul
              id={listId}
              role="listbox"
              aria-label="Sugestões de busca"
              className="suggest-list"
            >
              {items.map((entry, index) => (
                <li
                  key={entry.slug}
                  id={optionId(index)}
                  role="option"
                  aria-selected={active === index}
                  onMouseDown={keep}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => openEntry(entry)}
                  className="suggest-option"
                >
                  <span className="flex flex-wrap items-center gap-x-2">
                    <span className="suggest-name">{entry.name}</span>
                    <TypeBadge type={entry.type} />
                  </span>
                  <span className="suggest-summary">
                    {entry.summary}
                  </span>
                </li>
              ))}
              <li
                id={optionId(items.length)}
                role="option"
                aria-selected={active === items.length}
                onMouseDown={keep}
                onMouseEnter={() => setActive(items.length)}
                onClick={openSearchPage}
                className="suggest-option suggest-all"
              >
                {matches.length > MAX_SUGGESTIONS
                  ? `Ver todos os ${matches.length} resultados`
                  : 'Abrir a página de busca'}
              </li>
            </ul>
          ) : (
            <p role="status" className="suggest-message">
              {isError
                ? 'Não foi possível buscar agora. Pressione Enter para abrir a busca.'
                : settled && data
                  ? `Nenhuma entrada encontrada para “${query}”. Confira a grafia.`
                  : 'Buscando…'}
            </p>
          )}
          <p role="status" className="sr-only">
            {items.length > 0
              ? `${Math.min(matches.length, MAX_SUGGESTIONS)} de ${matches.length} sugestões`
              : ''}
          </p>
        </div>
      )}
    </div>
  );
}
