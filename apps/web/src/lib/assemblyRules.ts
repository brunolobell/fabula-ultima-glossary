import type {
  EntrySummary,
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

/**
 * The Quick Assembly Rules out of the entry index, or `null` while they are
 * missing or incomplete (an older cached response can lack parts of them).
 */
export function readAssemblyRules(
  bySlug: ReadonlyMap<string, EntrySummary>,
): AssemblyRules | null {
  const rules = bySlug.get(QUICK_ASSEMBLY_SLUG)?.details as
    QuickAssemblyRuleDetails | undefined;
  if (!rules) return null;
  const roles = Object.fromEntries(
    ROLE_ORDER.map((role) => [role, bySlug.get(ROLE_RULE_SLUG[role])?.details]),
  ) as Record<Role, QuickAssemblyRoleDetails>;
  if (!assemblyRulesComplete(rules, roles)) return null;
  return {
    rules,
    roles,
    npcSpells: bySlug.get(NPC_SPELLS_SLUG)?.details as
      NpcSpellsRuleDetails | undefined,
  };
}
