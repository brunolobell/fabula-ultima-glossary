import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Adds the `service` and `transport` Entry Types to `entries_type_enum`, placed
 * before `guide` so the enum keeps the order of ENTRY_TYPES (which is what
 * `synchronize` and `migration:generate` compare against).
 *
 * Safe to run on a database that already has the values (one built by
 * `synchronize` in dev).
 */
export class ServiceAndTransportTypes1794323087000 implements MigrationInterface {
  name = 'ServiceAndTransportTypes1794323087000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "entries_type_enum" ADD VALUE IF NOT EXISTS 'service' BEFORE 'guide'`,
    );
    await queryRunner.query(
      `ALTER TYPE "entries_type_enum" ADD VALUE IF NOT EXISTS 'transport' BEFORE 'guide'`,
    );
  }

  // Postgres cannot drop an enum value, so the type is rebuilt without them.
  // Entries of those two types are deleted first: the seed puts them back.
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "entries" WHERE "type" IN ('service', 'transport')`,
    );
    await queryRunner.query(
      `ALTER TYPE "entries_type_enum" RENAME TO "entries_type_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "entries_type_enum" AS ENUM('rule', 'class', 'skill', 'heroic-skill', 'spell', 'equipment', 'guide')`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "type" TYPE "entries_type_enum" USING "type"::text::"entries_type_enum"`,
    );
    await queryRunner.query(`DROP TYPE "entries_type_enum_old"`);
  }
}
