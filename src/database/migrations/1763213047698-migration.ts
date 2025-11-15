import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1763213047698 implements MigrationInterface {
  name = 'Migration1763213047698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "productimages" ADD "slug" text NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "productimages" DROP COLUMN "slug"`);
  }
}
