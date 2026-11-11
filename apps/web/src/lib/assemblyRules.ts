import type {
  NpcSpellsRuleDetails,
  QuickAssemblyRoleDetails,
  QuickAssemblyRuleDetails,
  Role,
} from '../api/types';
import { assemblyRulesComplete } from './creatureAssembly';
import {
  NPC_SPELLS_SLUG,
  QUICK_ASSEMBLY_SLUG,
  ROLE_ORDER,
  ROLE_RULE_SLUG,
} from './creatures';

export interface AssemblyRules {
  rules: QuickAssemblyRuleDetails;
  roles: Record<Role, QuickAssemblyRoleDetails>;
  npcSpells?: NpcSpellsRuleDetails;
}

/** The Rules the Assembler reads. The list sends only their marker, so each is fetched by slug. */
export const ASSEMBLY_RULE_SLUGS = [
  QUICK_ASSEMBLY_SLUG,
  NPC_SPELLS_SLUG,
  ...ROLE_ORDER.map((role) => ROLE_RULE_SLUG[role]),
];

/**
 * The Quick Assembly Rules out of their fetched `details`, or `null` while they are
 * missing or incomplete (an older cached response can lack parts of them).
 */
export function readAssemblyRules(
  detailsBySlug: ReadonlyMap<string, unknown>,
): AssemblyRules | null {
  const rules = detailsBySlug.get(QUICK_ASSEMBLY_SLUG) as
    QuickAssemblyRuleDetails | undefined;
  if (!rules) return null;
  const roles = Object.fromEntries(
    ROLE_ORDER.map((role) => [role, detailsBySlug.get(ROLE_RULE_SLUG[role])]),
  ) as Record<Role, QuickAssemblyRoleDetails>;
  if (!assemblyRulesComplete(rules, roles)) return null;
  return {
    rules,
    roles,
    npcSpells: detailsBySlug.get(NPC_SPELLS_SLUG) as
      NpcSpellsRuleDetails | undefined,
  };
}
