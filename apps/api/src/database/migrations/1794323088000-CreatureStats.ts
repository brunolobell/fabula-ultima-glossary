import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Creatures (ADR 0003): the `creature` Entry Type, the `bestiary-vol-1` Source
 * (ADR 0004) and the one-to-one `creature_stats` table.
 *
 * Safe on a database that already has any of it (one built by `synchronize`
 * in dev). The new enum values are placed where ENTRY_TYPES / ENTRY_SOURCES
 * put them, which is what `migration:generate` compares against.
 */
export class CreatureStats1794323088000 implements MigrationInterface {
  name = 'CreatureStats1794323088000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "entries_type_enum" ADD VALUE IF NOT EXISTS 'creature' BEFORE 'service'`,
    );
    await queryRunner.query(
      `ALTER TYPE "entries_source_enum" ADD VALUE IF NOT EXISTS 'bestiary-vol-1'`,
    );

    const enums: Record<string, string[]> = {
      creature_stats_species_enum: [
        'construct',
        'demon',
        'elemental',
        'beast',
        'humanoid',
        'monster',
        'undead',
        'plant',
      ],
      creature_stats_rank_enum: ['soldier', 'elite', 'champion'],
      creature_stats_role_enum: [
        'brute',
        'hunter',
        'mage',
        'saboteur',
        'sentinel',
        'support',
      ],
    };
    for (const [name, values] of Object.entries(enums)) {
      const list = values.map((value) => `'${value}'`).join(', ');
      await queryRunner.query(
        `DO $$ BEGIN CREATE TYPE "public"."${name}" AS ENUM(${list}); EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
      );
    }

    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "creature_stats" ("entryId" uuid NOT NULL, "level" integer NOT NULL, "species" "public"."creature_stats_species_enum" NOT NULL, "rank" "public"."creature_stats_rank_enum" NOT NULL, "role" "public"."creature_stats_role_enum", "villain" boolean NOT NULL DEFAULT false, "originalName" text, "traits" text array NOT NULL DEFAULT '{}', "des" smallint NOT NULL, "ast" smallint NOT NULL, "vig" smallint NOT NULL, "von" smallint NOT NULL, "hp" integer NOT NULL, "crisis" integer NOT NULL, "mp" integer NOT NULL, "initiative" integer NOT NULL, "defense" integer NOT NULL, "defenseFixed" boolean NOT NULL DEFAULT false, "magicDefense" integer NOT NULL, "hasSpells" boolean NOT NULL DEFAULT false, "affinities" jsonb NOT NULL DEFAULT '{}', "attacks" jsonb NOT NULL DEFAULT '[]', "spells" jsonb NOT NULL DEFAULT '[]', "otherActions" jsonb NOT NULL DEFAULT '[]', "specialRules" jsonb NOT NULL DEFAULT '[]', CONSTRAINT "PK_48fedb0ed8d1a49793675227d79" PRIMARY KEY ("entryId"))`,
    );
    await queryRunner.query(
      `DO $$ BEGIN ALTER TABLE "creature_stats" ADD CONSTRAINT "FK_48fedb0ed8d1a49793675227d79" FOREIGN KEY ("entryId") REFERENCES "entries"("id") ON DELETE CASCADE ON UPDATE NO ACTION; EXCEPTION WHEN duplicate_object THEN NULL; END $$`,
    );
  }

  // Postgres cannot drop an enum value, so both enums are rebuilt without them.
  // Creature Entries and Entries from the Bestiary Vol. I are deleted first
  // (their stats go with them): the seed puts them back.
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "entries" WHERE "type" = 'creature' OR "source" = 'bestiary-vol-1'`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS "creature_stats"`);
    for (const name of [
      'creature_stats_role_enum',
      'creature_stats_rank_enum',
      'creature_stats_species_enum',
    ]) {
      await queryRunner.query(`DROP TYPE IF EXISTS "public"."${name}"`);
    }

    await queryRunner.query(
      `ALTER TYPE "entries_type_enum" RENAME TO "entries_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "entries_type_enum" AS ENUM('rule', 'class', 'skill', 'heroic-skill', 'spell', 'equipment', 'service', 'transport', 'guide')`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "type" TYPE "entries_type_enum" USING "type"::text::"entries_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "entries_type_enum_old"`);

    await queryRunner.query(
      `ALTER TYPE "entries_source_enum" RENAME TO "entries_source_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "entries_source_enum" AS ENUM('livro-basico', 'high-fantasy', 'natural-fantasy', 'techno-fantasy')`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "source" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "source" TYPE "entries_source_enum" USING "source"::text::"entries_source_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "source" SET DEFAULT 'livro-basico'`,
    );
    await queryRunner.query(`DROP TYPE "entries_source_enum_old"`);
  }
}
