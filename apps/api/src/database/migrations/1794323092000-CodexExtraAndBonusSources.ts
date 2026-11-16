import { MigrationInterface, QueryRunner } from 'typeorm';

const NEW_SOURCES = ['codex-extra', 'bonus-ace-of-cards', 'bonus-necromancer'];

/**
 * Adds the Codex Extra and the two Fabula Bonus books to `entries_source_enum`,
 * after `bestiary-vol-1`, which keeps the order of ENTRY_SOURCES (what
 * `synchronize` and `migration:generate` compare against).
 *
 * Safe to run on a database that already has the values (one built by
 * `synchronize` in dev).
 */
export class CodexExtraAndBonusSources1794323092000 implements MigrationInterface {
  name = 'CodexExtraAndBonusSources1794323092000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const source of NEW_SOURCES) {
      await queryRunner.query(
        `ALTER TYPE "entries_source_enum" ADD VALUE IF NOT EXISTS '${source}'`,
      );
    }
  }

  // Postgres cannot drop an enum value, so the type is rebuilt without them.
  // Entries from these books are deleted first: the seed puts them back.
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM "entries" WHERE "source" IN ('codex-extra', 'bonus-ace-of-cards', 'bonus-necromancer')`,
    );
    await queryRunner.query(
      `ALTER TYPE "entries_source_enum" RENAME TO "entries_source_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "entries_source_enum" AS ENUM('livro-basico', 'high-fantasy', 'natural-fantasy', 'techno-fantasy', 'bestiary-vol-1')`,
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
