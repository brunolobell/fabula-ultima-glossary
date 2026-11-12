import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FORGE_PATHS } from '../lib/tools';
import { SearchIcon } from './Icons';

/** How far down, in screens, before the shortcut appears. */
const SHOW_AFTER = 1.2;

/**
 * On a phone the search box is at the top of a header that scrolls away, so
 * deep in a long page it is a long swipe back. This pill, in the thumb zone,
 * jumps to the top and puts the cursor in the search box. It shows only below
 * `lg` (where the menu becomes a drawer) and after a screen or so of scrolling.
 * The forges keep the bottom edge for their result strip.
 */
export function SearchShortcut() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setVisible(window.scrollY > window.innerHeight * SHOW_AFTER),
      );
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
    };
  }, []);

  if (!visible || FORGE_PATHS.includes(pathname)) return null;

  return (
    <button
      type="button"
      className="btn-primary fixed right-4 z-20 rounded-full px-4 lg:hidden"
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
      }}
      aria-label="Buscar: voltar ao topo da página"
      onClick={() => {
        // Instant, so the jump and the keyboard do not fight over the scroll.
        window.scrollTo?.(0, 0);
        document
          .querySelector<HTMLInputElement>('[role="search"] input')
          ?.focus({ preventScroll: true });
      }}
    >
      <SearchIcon />
      Buscar
    </button>
  );
}
