import { useEffect, useState, type ReactNode } from 'react';
import type { IconType } from 'react-icons';
import {
  GiBackpack,
  GiBookCover,
  GiBroadsword,
  GiChestArmor,
  GiCharacter,
  GiCheckedShield,
  GiCrown,
  GiHelmet,
  GiHouse,
  GiMagicSwirl,
  GiOpenTreasureChest,
  GiRelicBlade,
  GiRing,
  GiSpellBook,
  GiStarsStack,
} from 'react-icons/gi';
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
  `nav-item block rounded px-3 py-2 min-h-[44px] leading-snug no-underline hover:bg-tint-key hover:no-underline ${
    isActive ? 'bg-tint-key font-bold text-primary' : 'text-ink'
  }`;

const linkClass = ({ isActive }: { isActive: boolean }) => itemClass(isActive);

// Group toggles are the only uppercase headings in the menu; everything that
// is a page (Início, the guides, Regras) is a plain link.
const headingClass =
  'font-heading text-[17px] uppercase tracking-wide';

/** From `lg` the menu is a fixed column with room to spare, so groups start open. */
const startsOpen = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(min-width: 1024px)').matches;

/** Icon beside a menu label; decorative, the label carries the meaning. */
function MenuLabel({ icon: Icon, children }: { icon: IconType; children: ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <Icon className="shrink-0" size={18} aria-hidden />
      {children}
    </span>
  );
}

const KIND_ICONS: Record<string, IconType> = {
  accessory: GiRing,
  armor: GiChestArmor,
  weapon: GiBroadsword,
  artifact: GiRelicBlade,
  shield: GiCheckedShield,
};

interface MenuItem {
  label: string;
  icon: IconType;
  to: string;
  type: EntryType;
  /** Equipment Kind this item filters by; `null` is "all equipment". */
  kind?: string | null;
}

interface MenuGroup {
  id: string;
  title: string;
  icon: IconType;
  items: MenuItem[];
}

// Alphabetical (PT-BR), as in the Archives of Nethys; "all" always leads.
const GROUPS: MenuGroup[] = [
  {
    id: 'criacao',
    title: 'Criação de Personagem',
    icon: GiCharacter,
    items: [
      { label: 'Classes', icon: GiHelmet, to: typePath('class'), type: 'class' },
      { label: 'Feitiços', icon: GiMagicSwirl, to: typePath('spell'), type: 'spell' },
      { label: 'Poderes', icon: GiStarsStack, to: typePath('skill'), type: 'skill' },
      {
        label: 'Poderes Heroicos',
        icon: GiCrown,
        to: typePath('heroic-skill'),
        type: 'heroic-skill',
      },
    ],
  },
  {
    id: 'equipamento',
    title: 'Equipamento',
    icon: GiBackpack,
    items: [
      {
        label: 'Todo o equipamento',
        icon: GiOpenTreasureChest,
        to: equipmentPath(),
        type: 'equipment',
        kind: null,
      },
      ...EQUIPMENT_KIND_FILTERS.map(
        (f): MenuItem => ({
          label: f.label,
          icon: KIND_ICONS[f.kind],
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
  const [openGroups, setOpenGroups] = useState<ReadonlySet<string>>(
    () => new Set(startsOpen() ? GROUPS.map((g) => g.id) : []),
  );

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
                <MenuLabel icon={GiHouse}>Início</MenuLabel>
              </NavLink>
            </li>
            {guides.map((guide) => (
              <li key={guide.slug}>
                <NavLink to={entryPath(guide)} className={linkClass}>
                  <MenuLabel icon={GiBookCover}>{guide.name}</MenuLabel>
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="mt-5 space-y-1">
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
                    <MenuLabel icon={group.icon}>{group.title}</MenuLabel>
                    <ChevronIcon
                      className={`shrink-0 text-muted ${
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
                            <span className="flex items-center justify-between gap-2">
                              <MenuLabel icon={item.icon}>{item.label}</MenuLabel>
                              {!isLoading && (
                                <span
                                  className={`text-[15px] font-normal ${
                                    active ? 'text-accent-ink' : 'text-muted'
                                  }`}
                                >
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
                className={itemClass(currentType === 'rule')}
                aria-current={currentType === 'rule' ? 'page' : undefined}
              >
                <span className="flex items-center justify-between gap-2">
                  <MenuLabel icon={GiSpellBook}>{TYPE_INFO.rule.plural}</MenuLabel>
                  {!isLoading && (
                    <span
                      className={`text-[15px] font-normal ${
                        currentType === 'rule' ? 'text-accent-ink' : 'text-muted'
                      }`}
                    >
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
