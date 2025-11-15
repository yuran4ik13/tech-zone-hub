import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1763216528956 implements MigrationInterface {
    name = 'Migration1763216528956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "price" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "price"`);
    }

}
