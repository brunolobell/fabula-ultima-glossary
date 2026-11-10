import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Creates `entries` in its current shape on a database that has none (a new
 * production database never ran `synchronize`). A database that already has
 * the table is left alone: `EntryEnumsAndTagsIndex` upgrades it.
 *
 * Names match what TypeORM generates for the entity, so `synchronize` sees
 * nothing to change. The enum values are frozen here, like in the next migration.
 */
export class BaselineEntries1794323085000 implements MigrationInterface {
  name = 'BaselineEntries1794323085000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('entries')) return;

    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.query(
      `CREATE TYPE "entries_type_enum" AS ENUM('rule', 'class', 'skill', 'heroic-skill', 'spell', 'equipment', 'guide')`,
    );
    await queryRunner.query(
      `CREATE TYPE "entries_source_enum" AS ENUM('livro-basico', 'high-fantasy', 'natural-fantasy', 'techno-fantasy')`,
    );
    await queryRunner.query(
      `CREATE TABLE "entries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "name" character varying NOT NULL, "type" "entries_type_enum" NOT NULL, "summary" text NOT NULL, "body" text NOT NULL DEFAULT '', "source" "entries_source_enum" NOT NULL DEFAULT 'livro-basico', "page" integer, "tags" text array NOT NULL DEFAULT '{}', "details" jsonb NOT NULL DEFAULT '{}', "nameSearch" text NOT NULL, "searchText" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_23d4e7e9b58d9939f113832915b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1264035de794b4915a498ac77c" ON "entries" ("slug")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1e11ce8868db4cc237e17328e3" ON "entries" ("type")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_entries_tags" ON "entries" USING GIN ("tags")`,
    );
  }

  // Not reverted: on a database that already had the table this would drop the content.
  public async down(): Promise<void> {}
}
