import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1763214562737 implements MigrationInterface {
    name = 'Migration1763214562737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productimages" DROP CONSTRAINT "FK_b06e37169308a684e8e945a485d"`);
        await queryRunner.query(`ALTER TABLE "productimages" ADD CONSTRAINT "FK_b06e37169308a684e8e945a485d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productimages" DROP CONSTRAINT "FK_b06e37169308a684e8e945a485d"`);
        await queryRunner.query(`ALTER TABLE "productimages" ADD CONSTRAINT "FK_b06e37169308a684e8e945a485d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
