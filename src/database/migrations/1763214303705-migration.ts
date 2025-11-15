import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1763214303705 implements MigrationInterface {
    name = 'Migration1763214303705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productparams" DROP CONSTRAINT "FK_539e770b979f76c8cb7d2e7ea9e"`);
        await queryRunner.query(`ALTER TABLE "productparams" ADD CONSTRAINT "FK_539e770b979f76c8cb7d2e7ea9e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productparams" DROP CONSTRAINT "FK_539e770b979f76c8cb7d2e7ea9e"`);
        await queryRunner.query(`ALTER TABLE "productparams" ADD CONSTRAINT "FK_539e770b979f76c8cb7d2e7ea9e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
