import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1763213217327 implements MigrationInterface {
  name = 'Migration1763213217327';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "productimages" DROP COLUMN "slug"`);
    await queryRunner.query(`ALTER TABLE "products" ADD "slug" text NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "slug"`);
    await queryRunner.query(
      `ALTER TABLE "productimages" ADD "slug" text NOT NULL`,
    );
  }
}
