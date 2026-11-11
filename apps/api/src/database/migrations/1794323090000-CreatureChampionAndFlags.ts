import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Bestiary Vol. I Creatures: how many soldiers a champion replaces (`championX`)
 * and the Solo, Unique and Part marks (`flags`). Safe on a database built by
 * `synchronize` in dev, which already has them.
 */
export class CreatureChampionAndFlags1794323090000 implements MigrationInterface {
  name = 'CreatureChampionAndFlags1794323090000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creature_stats" ADD COLUMN IF NOT EXISTS "championX" smallint`,
    );
    await queryRunner.query(
      `ALTER TABLE "creature_stats" ADD COLUMN IF NOT EXISTS "flags" text array NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creature_stats" DROP COLUMN IF EXISTS "flags"`,
    );
    await queryRunner.query(
      `ALTER TABLE "creature_stats" DROP COLUMN IF EXISTS "championX"`,
    );
  }
}
