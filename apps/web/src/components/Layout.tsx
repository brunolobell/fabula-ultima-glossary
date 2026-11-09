import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, search } = useLocation();

  useEffect(() => setMenuOpen(false), [pathname, search]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#conteudo" className="skip-link">
        Ir para o conteúdo
      </a>
      <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((o) => !o)} />
      <div className="flex flex-1">
        <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
        <main id="conteudo" className="min-w-0 flex-1 px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-reading">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
