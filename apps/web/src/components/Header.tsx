import { Link, useLocation } from 'react-router-dom';
import { CrystalIcon, MenuIcon } from './Icons';
import { SearchBox } from './SearchBox';
import { ThemeToggle } from './ThemeToggle';

interface Props {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

export function Header({ menuOpen, onToggleMenu }: Props) {
  // The Home hero has its own, larger search box.
  const showSearch = useLocation().pathname !== '/';
  return (
    <header className="border-b border-line bg-bg">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3 px-4 py-3 sm:gap-x-4 sm:px-6">
        <button
          type="button"
          className="icon-btn lg:hidden"
          onClick={onToggleMenu}
          aria-label="Abrir menu"
          aria-controls="menu"
          aria-expanded={menuOpen}
        >
          <MenuIcon />
        </button>

        <Link
          to="/"
          className="flex min-h-[44px] items-center gap-2 text-heading no-underline hover:no-underline"
        >
          <CrystalIcon className="text-primary" />
          <span className="font-display text-xl uppercase leading-none tracking-wide sm:text-2xl">
            Códice do Cristal
          </span>
        </Link>

        {showSearch && (
          <div className="order-last w-full md:order-none md:ml-auto md:w-96">
            <SearchBox />
          </div>
        )}

        <ThemeToggle className={showSearch ? 'ml-auto md:ml-0' : 'ml-auto'} />
      </div>
    </header>
  );
}
