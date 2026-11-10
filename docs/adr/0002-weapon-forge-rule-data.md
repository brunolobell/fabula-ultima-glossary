---
status: accepted
---

# The Weapon Forge reads its numbers from typed `details` on two Rule Entries

The Weapon Forge (the modal that builds a Custom Weapon or a Rare Weapon, never saved) needs structured data: Customizations and Weapon Features with their costs and limits. We store that data once, as optional typed `details` on the two Rules "Armas Personalizadas" and "Criar armas raras", and generate the tables in the Rule bodies from it (as the Transport tables are generated from the Transport Entries). The Forge fetches those Rules through the existing read-only API and computes everything in the browser; nothing it builds is sent anywhere or stored.

## Considered options

- **Hard-code the tables in the web app** (`lib/weaponForge.ts`) and write the same numbers in the Rule text. Simplest, but the two copies drift apart the first time a number is corrected, and nothing would flag it.
- **One Entry per Customization and per Weapon Feature.** Real links and search hits, but about 25 near-empty Entries that the Reader never asked for, and they would pollute global search and the Equipamento menu.

## Consequences

- `RuleDetails` stops being `Record<string, never>`: it becomes a union (or optional fields) that only these two Rules fill. `apps/web/src/api/types.ts` must be updated by hand, and `seed-validation.ts` must validate the new shape (costs are non-negative integers, every Customization and Feature has a page reference through its Rule).
- A mistake in a price is fixed in one seed edit and shows up in both the text and the Forge.
- The Forge's calculation is a pure function tested against the books' own worked examples, so a wrong number in the data fails a test.
- If other Rules later need structured data for a calculator, they use the same mechanism; that is the signal to revisit whether Rules deserve their own `details` per slug.
