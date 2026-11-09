import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useEntryIndex } from '../hooks/useEntryIndex';
import {
  BROWSE_TYPES,
  TYPE_INFO,
  entryPath,
  typePath,
} from '../lib/entryTypes';
import { CloseIcon } from './Icons';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded px-3 py-2 min-h-[44px] leading-snug no-underline hover:bg-tint-key hover:no-underline ${
    isActive ? 'bg-tint-key font-bold text-primary' : 'text-ink'
  }`;

function Section({ title, children }: { title: string; children: ReactNode }) {
  const id = `menu-${title.toLowerCase()}`;
  return (
    <div className="mt-6">
      <p
        id={id}
        className="px-3 pb-1 font-heading text-[15px] uppercase tracking-wider text-muted"
      >
        {title}
      </p>
      <ul aria-labelledby={id}>{children}</ul>
    </div>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: Props) {
  const { entries, isLoading } = useEntryIndex();
  const guides = entries.filter((e) => e.type === 'guide');
  const classes = entries.filter((e) => e.type === 'class');
  const count = (type: string) => entries.filter((e) => e.type === type).length;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-scrim lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}
      <aside
        id="menu"
        className={`fixed inset-y-0 left-0 z-40 w-72 max-w-[85vw] overflow-y-auto border-r border-line bg-bg px-3 py-4 lg:sticky lg:top-0 lg:z-auto lg:block lg:h-screen lg:w-64 lg:max-w-none lg:shrink-0 ${
          open ? 'block' : 'hidden'
        }`}
      >
        <div className="flex items-center justify-between px-3 lg:hidden">
          <span className="font-display text-xl uppercase text-heading">Menu</span>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Navegação principal">
          <ul className="mt-4 lg:mt-0">
            <li>
              <NavLink to="/" end className={linkClass}>
                Início
              </NavLink>
            </li>
          </ul>

          {guides.length > 0 && (
            <Section title="Guias">
              {guides.map((guide) => (
                <li key={guide.slug}>
                  <NavLink to={entryPath(guide)} className={linkClass}>
                    {guide.name}
                  </NavLink>
                </li>
              ))}
            </Section>
          )}

          <Section title="Conteúdo">
            {BROWSE_TYPES.map((type) => (
              <li key={type}>
                <NavLink to={typePath(type)} end className={linkClass}>
                  <span className="flex items-baseline justify-between gap-2">
                    {TYPE_INFO[type].plural}
                    {!isLoading && (
                      <span className="text-[15px] font-normal text-muted">
                        {count(type)}
                      </span>
                    )}
                  </span>
                </NavLink>
              </li>
            ))}
          </Section>

          {classes.length > 0 && (
            <Section title="Classes">
              {classes.map((cls) => (
                <li key={cls.slug}>
                  <NavLink to={entryPath(cls)} className={linkClass}>
                    {cls.name}
                  </NavLink>
                </li>
              ))}
            </Section>
          )}

          {isLoading && (
            <div aria-busy="true" aria-label="Carregando menu" className="mt-6 px-3">
              <span className="skeleton w-3/4" />
              <span className="skeleton mt-3 w-2/3" />
              <span className="skeleton mt-3 w-1/2" />
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
