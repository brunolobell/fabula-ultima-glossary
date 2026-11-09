import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import type { EntryType, EquipmentDetails } from '../api/types';
import { useEntryIndex } from '../hooks/useEntryIndex';
import {
  EQUIPMENT_KIND_FILTERS,
  equipmentPath,
  kindFromParam,
} from '../lib/equipmentKinds';
import { TYPE_INFO, entryPath, typeFromSlug, typePath } from '../lib/entryTypes';
import { ChevronIcon, CloseIcon } from './Icons';

const itemClass = (isActive: boolean) =>
  `block rounded px-3 py-2 min-h-[44px] leading-snug no-underline hover:bg-tint-key hover:no-underline ${
    isActive ? 'bg-tint-key font-bold text-primary' : 'text-ink'
  }`;

const linkClass = ({ isActive }: { isActive: boolean }) => itemClass(isActive);

const headingClass =
  'font-heading text-[17px] uppercase tracking-wide';

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

interface MenuItem {
  label: string;
  to: string;
  type: EntryType;
  /** Equipment Kind this item filters by; `null` is "all equipment". */
  kind?: string | null;
}

interface MenuGroup {
  id: string;
  title: string;
  items: MenuItem[];
}

// Alphabetical (PT-BR), as in the Archives of Nethys; "all" always leads.
const GROUPS: MenuGroup[] = [
  {
    id: 'criacao',
    title: 'Criação de Personagem',
    items: [
      { label: 'Classes', to: typePath('class'), type: 'class' },
      { label: 'Feitiços', to: typePath('spell'), type: 'spell' },
      { label: 'Poderes', to: typePath('skill'), type: 'skill' },
      {
        label: 'Poderes Heroicos',
        to: typePath('heroic-skill'),
        type: 'heroic-skill',
      },
    ],
  },
  {
    id: 'equipamento',
    title: 'Equipamento',
    items: [
      {
        label: 'Todo o equipamento',
        to: equipmentPath(),
        type: 'equipment',
        kind: null,
      },
      ...EQUIPMENT_KIND_FILTERS.map(
        (f): MenuItem => ({
          label: f.label,
          to: equipmentPath(f.param),
          type: 'equipment',
          kind: f.kind,
        }),
      ),
    ],
  },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: Props) {
  const { entries, bySlug, isLoading } = useEntryIndex();
  const { pathname, search } = useLocation();
  const guides = entries.filter((e) => e.type === 'guide');

  // Where the Reader is: the Entry Type and, for Equipment, the Kind.
  const [first, second] = pathname.split('/').filter(Boolean);
  const currentType = typeFromSlug(first);
  const onList = Boolean(currentType) && !second;
  let currentKind: string | null = null;
  if (currentType === 'equipment') {
    currentKind = onList
      ? (kindFromParam(new URLSearchParams(search).get('item'))?.kind ?? null)
      : ((bySlug.get(second ?? '')?.details as EquipmentDetails | undefined)
          ?.kind ?? null);
  }

  const isActive = (item: MenuItem) => {
    if (item.type !== currentType) return false;
    if (item.kind === undefined) return true;
    if (item.kind === null) return onList && currentKind === null;
    return item.kind === currentKind;
  };

  const activeGroup = GROUPS.find((g) => g.items.some(isActive))?.id;
  const [openGroups, setOpenGroups] = useState<ReadonlySet<string>>(new Set());

  // The group holding the current page opens itself; the others stay as the
  // Reader left them.
  useEffect(() => {
    if (!activeGroup) return;
    setOpenGroups((prev) =>
      prev.has(activeGroup) ? prev : new Set(prev).add(activeGroup),
    );
  }, [activeGroup]);

  const toggle = (id: string) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  const count = (item: MenuItem) =>
    entries.filter(
      (e) =>
        e.type === item.type &&
        (!item.kind || (e.details as EquipmentDetails).kind === item.kind),
    ).length;

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

          <ul className="mt-6 space-y-1">
            {GROUPS.map((group) => {
              const expanded = openGroups.has(group.id);
              const listId = `menu-${group.id}`;
              return (
                <li key={group.id}>
                  <button
                    type="button"
                    className={`flex w-full min-h-[44px] items-center justify-between gap-2 rounded px-3 py-2 text-left text-heading hover:bg-tint-key ${headingClass}`}
                    aria-expanded={expanded}
                    aria-controls={listId}
                    onClick={() => toggle(group.id)}
                  >
                    {group.title}
                    <ChevronIcon
                      className={`shrink-0 text-muted transition-transform ${
                        expanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <ul id={listId} hidden={!expanded} className="pb-2 pl-3">
                    {group.items.map((item) => {
                      const active = isActive(item);
                      return (
                        <li key={item.to}>
                          <Link
                            to={item.to}
                            className={itemClass(active)}
                            aria-current={active ? 'page' : undefined}
                          >
                            <span className="flex items-baseline justify-between gap-2">
                              {item.label}
                              {!isLoading && (
                                <span className="text-[15px] font-normal text-muted">
                                  {count(item)}
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
            <li>
              <Link
                to={typePath('rule')}
                className={`${itemClass(currentType === 'rule')} ${headingClass}`}
                aria-current={currentType === 'rule' && onList ? 'page' : undefined}
              >
                <span className="flex items-baseline justify-between gap-2">
                  {TYPE_INFO.rule.plural}
                  {!isLoading && (
                    <span className="font-body text-[15px] normal-case tracking-normal text-muted">
                      {entries.filter((e) => e.type === 'rule').length}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          </ul>

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
