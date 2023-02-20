import { MigrationInterface, QueryRunner } from "typeorm";

export class default1676831320714 implements MigrationInterface {
    name = 'default1676831320714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" character varying NOT NULL, "name" character varying NOT NULL, "classes" text array NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "specialAttack" integer NOT NULL, "specialDefense" integer NOT NULL, "speed" integer NOT NULL, "health" integer NOT NULL, "picture" character varying NOT NULL, "origin" "public"."pokemon_origin_enum" NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1cb8fc72a68e5a601312c642c82" UNIQUE ("name"), CONSTRAINT "CHK_da20f18314fe189c1affe163ee" CHECK ("attack">0), CONSTRAINT "CHK_1a621b66e482f748b40181b4ef" CHECK ("defense">0), CONSTRAINT "CHK_d80e7ac3847f368bae5c21264e" CHECK ("specialAttack">0), CONSTRAINT "CHK_0d57cbb6dcf7ee77badc37142e" CHECK ("specialDefense">0), CONSTRAINT "CHK_a49d5288e39176be515d85db58" CHECK ("speed">0), CONSTRAINT "CHK_3460fe6f82d488d119c80683c7" CHECK ("health">0), CONSTRAINT "PK_0b503db1369f46c43f8da0a6a0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "type" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40410d6bf0bedb43f9cadae6fef" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "type"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
    }

}
