import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1715868843135 implements MigrationInterface {
    name = 'migrations1715868843135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "execute_history" ("id" SERIAL NOT NULL, "name" character varying, "status" integer, "payload" jsonb, "execute_id" integer, "executeId" integer, CONSTRAINT "PK_1982df5c6cefd4c4c28f192dd7a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "execute_history" ADD CONSTRAINT "FK_9d483ad0acbcb399187c9913fa7" FOREIGN KEY ("executeId") REFERENCES "execute"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "execute_history" DROP CONSTRAINT "FK_9d483ad0acbcb399187c9913fa7"`);
        await queryRunner.query(`DROP TABLE "execute_history"`);
    }

}
