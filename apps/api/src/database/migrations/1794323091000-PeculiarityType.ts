import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Adds the `peculiarity` Entry Type to `entries_type_enum`, placed before `spell`
 * so the enum keeps the order of ENTRY_TYPES (which is what `synchronize` and
 * `migration:generate` compare against).
 *
 * Safe to run on a database that already has the value (one built by
 * `synchronize` in dev).
 */
export class PeculiarityType1794323091000 implements MigrationInterface {
  name = 'PeculiarityType1794323091000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "entries_type_enum" ADD VALUE IF NOT EXISTS 'peculiarity' BEFORE 'spell'`,
    );
  }

  // Postgres cannot drop an enum value, so the type is rebuilt without it.
  // Peculiarities are deleted first: the seed puts them back.
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "entries" WHERE "type" = 'peculiarity'`,
    );
    await queryRunner.query(
      `ALTER TYPE "entries_type_enum" RENAME TO "entries_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "entries_type_enum" AS ENUM('rule', 'class', 'skill', 'heroic-skill', 'spell', 'equipment', 'creature', 'service', 'transport', 'guide')`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "type" TYPE "entries_type_enum" USING "type"::text::"entries_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "entries_type_enum_old"`);
  }
}
