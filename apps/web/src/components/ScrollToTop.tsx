import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * A single-page app keeps the scroll offset across routes, so tapping a result
 * far down a list opened the next page halfway down. Going to another page
 * starts at the top; Back and Forward are left to the browser; a change of
 * query (a filter, a tab) or of hash (a jump link) keeps the Reader where they are.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const type = useNavigationType();
  useEffect(() => {
    if (type === 'POP' || hash) return;
    window.scrollTo?.(0, 0);
    // Only a new path: `type` and `hash` are read at that moment.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return null;
}
