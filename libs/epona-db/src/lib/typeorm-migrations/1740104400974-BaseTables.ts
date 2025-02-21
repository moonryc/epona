import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseTables1740104400974 implements MigrationInterface {
    name = 'BaseTables1740104400974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."conversations_owner_enum" AS ENUM('Epona')`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "prompt" text NOT NULL, "owner" "public"."conversations_owner_enum" NOT NULL, CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."epona_chats_role_enum" AS ENUM('System', 'User', 'Assistant')`);
        await queryRunner.query(`CREATE TABLE "epona_chats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_summary" boolean NOT NULL DEFAULT false, "content" text NOT NULL, "images" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."epona_chats_role_enum" NOT NULL, "conversation_id" uuid, CONSTRAINT "PK_dce8be23bc7237ee9c7119ed24e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8a058ed8703e71f6fcb264cd3d" ON "epona_chats" ("is_summary") `);
        await queryRunner.query(`ALTER TABLE "epona_chats" ADD CONSTRAINT "FK_e41ddab9044b6a2edd70bcad192" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "epona_chats" DROP CONSTRAINT "FK_e41ddab9044b6a2edd70bcad192"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a058ed8703e71f6fcb264cd3d"`);
        await queryRunner.query(`DROP TABLE "epona_chats"`);
        await queryRunner.query(`DROP TYPE "public"."epona_chats_role_enum"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TYPE "public"."conversations_owner_enum"`);
    }

}
