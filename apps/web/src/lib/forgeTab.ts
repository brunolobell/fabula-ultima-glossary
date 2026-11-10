/** The query parameter that holds the Weapon Forge's open tab. */
export const FORGE_PARAM = 'forja';

export type ForgeTab = 'personalizada' | 'rara';

export const forgeTabFromParam = (value: string | null): ForgeTab | null =>
  value === 'personalizada' || value === 'rara' ? value : null;
