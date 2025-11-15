import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1763214884522 implements MigrationInterface {
    name = 'Migration1763214884522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('laptop', 'smartphone', 'headphone', 'smartwatch', 'accesory')`);
        await queryRunner.query(`ALTER TABLE "products" ADD "category" "public"."products_category_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
    }

}
