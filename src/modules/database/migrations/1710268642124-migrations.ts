import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1710268642124 implements MigrationInterface {
    name = 'migrations1710268642124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying, "password" character varying, "firstName" character varying, "lastName" character varying, "isActive" boolean DEFAULT true, "email" character varying, "is_admin" character varying DEFAULT true, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
