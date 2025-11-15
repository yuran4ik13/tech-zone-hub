import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1763207742570 implements MigrationInterface {
  name = 'Migration1763207742570';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "productparams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" text NOT NULL, "value" text NOT NULL, "productId" uuid, CONSTRAINT "PK_dd3e3f34d58643c00e55775400d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "productimages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "path" text NOT NULL, "productId" uuid, CONSTRAINT "PK_123db434163b5ccc60afeb537f0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" text NOT NULL, "description" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "productparams" ADD CONSTRAINT "FK_539e770b979f76c8cb7d2e7ea9e" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "productimages" ADD CONSTRAINT "FK_b06e37169308a684e8e945a485d" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "productimages" DROP CONSTRAINT "FK_b06e37169308a684e8e945a485d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "productparams" DROP CONSTRAINT "FK_539e770b979f76c8cb7d2e7ea9e"`,
    );
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TABLE "productimages"`);
    await queryRunner.query(`DROP TABLE "productparams"`);
  }
}
