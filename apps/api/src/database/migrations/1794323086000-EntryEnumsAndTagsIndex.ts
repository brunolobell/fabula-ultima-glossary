import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Turns `entries.type` and `entries.source` from free text into Postgres enums
 * (named as TypeORM names them, so `synchronize` sees nothing to change) and
 * adds the GIN index on `tags`, which TypeORM cannot declare on the entity.
 *
 * Safe on every database state: it skips the conversion when the columns are
 * already enums (new databases, or ones built by `synchronize`).
 *
 * The values are frozen here on purpose: a later change to ENTRY_TYPES or
 * ENTRY_SOURCES gets its own migration (`migration:generate`).
 */
export class EntryEnumsAndTagsIndex1794323086000 implements MigrationInterface {
  name = 'EntryEnumsAndTagsIndex1794323086000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // A database built by `BaselineEntries` or by `synchronize` already has
    // the enums and the converted columns; only a legacy varchar table needs them.
    if (await this.isText(queryRunner, 'type')) {
      await this.createEnum(
        queryRunner,
        'entries_type_enum',
        `'rule', 'class', 'skill', 'heroic-skill', 'spell', 'equipment', 'guide'`,
      );
      await queryRunner.query(
        `ALTER TABLE "entries" ALTER COLUMN "type" TYPE "entries_type_enum" USING "type"::"entries_type_enum"`,
      );
    }
    if (await this.isText(queryRunner, 'source')) {
      await this.createEnum(
        queryRunner,
        'entries_source_enum',
        `'livro-basico', 'high-fantasy', 'natural-fantasy', 'techno-fantasy'`,
      );
      await queryRunner.query(
        `ALTER TABLE "entries" ALTER COLUMN "source" DROP DEFAULT`,
      );
      await queryRunner.query(
        `ALTER TABLE "entries" ALTER COLUMN "source" TYPE "entries_source_enum" USING "source"::"entries_source_enum"`,
      );
      await queryRunner.query(
        `ALTER TABLE "entries" ALTER COLUMN "source" SET DEFAULT 'livro-basico'`,
      );
    }
    // On a database built by `synchronize`, a plain btree of this name may exist.
    await queryRunner.query(`DROP INDEX IF EXISTS "IDX_entries_tags"`);
    await queryRunner.query(
      `CREATE INDEX "IDX_entries_tags" ON "entries" USING GIN ("tags")`,
    );
  }

  private async isText(
    queryRunner: QueryRunner,
    column: string,
  ): Promise<boolean> {
    const rows: unknown[] = await queryRunner.query(
      `SELECT 1 FROM information_schema.columns WHERE table_name = 'entries' AND column_name = $1 AND data_type = 'character varying'`,
      [column],
    );
    return rows.length > 0;
  }

  // CREATE TYPE has no IF NOT EXISTS.
  private async createEnum(
    queryRunner: QueryRunner,
    name: string,
    values: string,
  ): Promise<void> {
    await queryRunner.query(
      `DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = '${name}') THEN CREATE TYPE "${name}" AS ENUM(${values}); END IF; END $$`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_entries_tags"`);
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "source" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "source" TYPE character varying USING "source"::text`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "source" SET DEFAULT 'livro-basico'`,
    );
    await queryRunner.query(
      `ALTER TABLE "entries" ALTER COLUMN "type" TYPE character varying USING "type"::text`,
    );
    await queryRunner.query(`DROP TYPE "entries_source_enum"`);
    await queryRunner.query(`DROP TYPE "entries_type_enum"`);
  }
}
