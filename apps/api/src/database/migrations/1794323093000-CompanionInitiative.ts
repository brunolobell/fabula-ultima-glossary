import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * A sample Faithful Companion (Bestiary Vol. I) has no Initiative: it acts when its
 * Wayfarer spends an action. `creature_stats.initiative` becomes nullable. The new
 * `companion` flag needs no change: `flags` is a plain text array.
 */
export class CompanionInitiative1794323093000 implements MigrationInterface {
  name = 'CompanionInitiative1794323093000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creature_stats" ALTER COLUMN "initiative" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "creature_stats" SET "initiative" = 0 WHERE "initiative" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "creature_stats" ALTER COLUMN "initiative" SET NOT NULL`,
    );
  }
}
