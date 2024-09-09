import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1715886366693 implements MigrationInterface {
    name = 'migrations1715886366693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "execute_history" RENAME COLUMN "execute_id" TO "response_data"`);
        await queryRunner.query(`ALTER TABLE "execute_history" DROP COLUMN "response_data"`);
        await queryRunner.query(`ALTER TABLE "execute_history" ADD "response_data" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "execute_history" DROP COLUMN "response_data"`);
        await queryRunner.query(`ALTER TABLE "execute_history" ADD "response_data" integer`);
        await queryRunner.query(`ALTER TABLE "execute_history" RENAME COLUMN "response_data" TO "execute_id"`);
    }

}
