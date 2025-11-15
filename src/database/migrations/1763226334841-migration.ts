import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1763226334841 implements MigrationInterface {
    name = 'Migration1763226334841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orderitems" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" uuid NOT NULL, "productTitle" text NOT NULL, "quantity" integer NOT NULL, "price" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "orderId" uuid, CONSTRAINT "PK_a7484ed934f1d9b4eca50530961" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')`);
        await queryRunner.query(`CREATE TYPE "public"."orders_paymentmethod_enum" AS ENUM('card', 'paypal', 'cash_on_delivery')`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderNumber" text NOT NULL, "trackingNumber" text NOT NULL, "status" "public"."orders_status_enum" NOT NULL DEFAULT 'pending', "customerFirstName" text NOT NULL, "customerLastName" text NOT NULL, "customerEmail" text NOT NULL, "customerPhone" text NOT NULL, "shippingAddress" text NOT NULL, "shippingCity" text NOT NULL, "shippingPostalCode" text NOT NULL, "shippingCountry" text NOT NULL, "paymentMethod" "public"."orders_paymentmethod_enum" NOT NULL, "subtotal" numeric(10,2) NOT NULL, "shippingCost" numeric(10,2) NOT NULL, "total" numeric(10,2) NOT NULL, "notes" text, "carrier" text NOT NULL DEFAULT 'DHL Express', "estimatedDelivery" TIMESTAMP, "deliveredAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_59b0c3b34ea0fa5562342f24143" UNIQUE ("orderNumber"), CONSTRAINT "UQ_763b782b539c971c65f759b49c8" UNIQUE ("trackingNumber"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."trackingevents_status_enum" AS ENUM('Order Placed', 'Processing', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered', 'Failed Delivery Attempt', 'Returned to Sender')`);
        await queryRunner.query(`CREATE TABLE "trackingevents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."trackingevents_status_enum" NOT NULL, "description" text NOT NULL, "location" text NOT NULL, "isCompleted" boolean NOT NULL DEFAULT false, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "orderId" uuid, CONSTRAINT "PK_388ee66f796f6a5c83608b4813b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orderitems" ADD CONSTRAINT "FK_8b76857021ffdf7fd0ac0026652" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "trackingevents" ADD CONSTRAINT "FK_85af8545e4b3bd1153eaca4e5ad" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "trackingevents" DROP CONSTRAINT "FK_85af8545e4b3bd1153eaca4e5ad"`);
        await queryRunner.query(`ALTER TABLE "orderitems" DROP CONSTRAINT "FK_8b76857021ffdf7fd0ac0026652"`);
        await queryRunner.query(`DROP TABLE "trackingevents"`);
        await queryRunner.query(`DROP TYPE "public"."trackingevents_status_enum"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_paymentmethod_enum"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TABLE "orderitems"`);
    }

}
