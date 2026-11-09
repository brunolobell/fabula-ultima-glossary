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
import type { EntrySummary } from '../api/types';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { MIN_SUGGESTION_CHARS, useSuggestions } from '../hooks/useSuggestions';
import { entryPath } from '../lib/entryTypes';
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
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const optionId = (index: number) => `${listId}-opcao-${index}`;

  const query = value.trim();
  const debounced = useDebouncedValue(query, DEBOUNCE_MS);
  const { data, isError } = useSuggestions(debounced);

  const matches = data ?? [];
  const items = matches.slice(0, MAX_SUGGESTIONS);
  const optionCount = items.length > 0 ? items.length + 1 : 0; // + "ver todos"
  const settled = debounced === query;
  const showPanel = open && query.length >= MIN_SUGGESTION_CHARS;

  // Follow the URL when it changes from elsewhere (back button, a link).
  useEffect(() => setValue(urlQuery), [urlQuery]);

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

  function openEntry(entry: EntrySummary) {
    setOpen(false);
    setValue('');
    navigate(entryPath(entry));
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (active >= 0 && active < items.length) openEntry(items[active]);
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
    if (query.length < MIN_SUGGESTION_CHARS) return;
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
          id={`${listId}-campo`}
          type="search"
          role="combobox"
          aria-expanded={showPanel && optionCount > 0}
          aria-controls={showPanel && optionCount > 0 ? listId : undefined}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? optionId(active) : undefined}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Buscar regras, classes, poderes, feitiços…"
          autoComplete="off"
          className="search-input"
          style={size === 'lg' ? { minHeight: 56, fontSize: '1.25rem' } : undefined}
        />
      </form>

      {showPanel && (
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
