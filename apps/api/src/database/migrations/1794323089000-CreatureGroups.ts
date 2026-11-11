import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Creature Groups (ADR 0003): a member of a group points to it by `groupSlug`
 * and keeps its place with `groupOrder`. A group is a Creature Entry with no
 * `creature_stats` row, so it needs nothing here.
 *
 * Safe on a database built by `synchronize` in dev, which already has them.
 */
export class CreatureGroups1794323089000 implements MigrationInterface {
  name = 'CreatureGroups1794323089000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creature_stats" ADD COLUMN IF NOT EXISTS "groupSlug" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "creature_stats" ADD COLUMN IF NOT EXISTS "groupOrder" integer`,
    );
    await queryRunner.query(
      `CREATE INDEX IF NOT EXISTS "IDX_creature_stats_groupSlug" ON "creature_stats" ("groupSlug")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_creature_stats_groupSlug"`,
    );
    await queryRunner.query(
      `ALTER TABLE "creature_stats" DROP COLUMN IF EXISTS "groupOrder"`,
    );
    await queryRunner.query(
      `ALTER TABLE "creature_stats" DROP COLUMN IF EXISTS "groupSlug"`,
    );
  }
}
