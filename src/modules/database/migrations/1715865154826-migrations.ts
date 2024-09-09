import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1715865154826 implements MigrationInterface {
    name = 'migrations1715865154826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "execute" ("id" SERIAL NOT NULL, "name" character varying, "robot_name" character varying, "interval" integer, "payload" jsonb, CONSTRAINT "PK_9222476b670b36f558de9d16e91" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "execute"`);
    }

}
