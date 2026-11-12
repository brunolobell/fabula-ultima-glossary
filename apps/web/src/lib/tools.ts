import { LAB_PATH } from './laboratory';

/** The page of the Weapon Forge (a Custom Weapon or a Rare Weapon). */
export const WEAPON_FORGE_PATH = '/forja-de-armas';
/** The page of the Armor Forge (a Rare Armor or a Rare Shield). */
export const ARMOR_FORGE_PATH = '/forja-de-armaduras';

export type ToolId = 'weapon-forge' | 'armor-forge' | 'laboratory';

export interface Tool {
  id: ToolId;
  label: string;
  path: string;
  /** One line for Home: what the Reader gets. */
  summary: string;
}

/** The builders, alphabetical (PT-BR). Each is a page of its own and saves nothing. */
export const TOOLS: readonly Tool[] = [
  {
    id: 'armor-forge',
    label: 'Forja de Armaduras e Escudos',
    path: ARMOR_FORGE_PATH,
    summary:
      'Monte uma armadura ou um escudo raro a partir de uma base básica.',
  },
  {
    id: 'weapon-forge',
    label: 'Forja de Armas',
    path: WEAPON_FORGE_PATH,
    summary:
      'Monte uma arma personalizada ou rara, com custo e regras conferidos.',
  },
  {
    id: 'laboratory',
    label: 'Laboratório Oroboros',
    path: LAB_PATH,
    summary: 'Monte uma criatura pela Montagem Rápida.',
  },
];

/** The forge pages, which keep the bottom edge of a phone for their result strip. */
export const FORGE_PATHS: readonly string[] = [WEAPON_FORGE_PATH, ARMOR_FORGE_PATH];

/** Paths whose page uses the wide column (a form beside a result). */
export const WIDE_PATHS: readonly string[] = TOOLS.map((tool) => tool.path);

/**
 * The forges used to open as a modal on the equipment lists
 * (`/equipamento?item=armas&forja=rara`). Those links live in Rule texts of
 * databases that were not re-seeded, and in bookmarks, so the list sends them
 * to the page. `null` when the link does not ask for a forge.
 */
export function legacyForgePath(
  item: string | null,
  forja: string | null,
): string | null {
  if (!forja) return null;
  if (item === 'armas') {
    return `${WEAPON_FORGE_PATH}?forja=${encodeURIComponent(forja)}`;
  }
  if ((item === 'armaduras' || item === 'escudos') && forja === 'rara') {
    return ARMOR_FORGE_PATH;
  }
  return null;
}
