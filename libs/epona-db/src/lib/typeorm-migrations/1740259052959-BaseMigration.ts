import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1740259052959 implements MigrationInterface {
    name = 'BaseMigration1740259052959'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."chat_messages_role_enum" AS ENUM('System', 'User', 'Assistant')`);
        await queryRunner.query(`CREATE TABLE "chat_messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_summary" boolean NOT NULL DEFAULT false, "content" text NOT NULL, "images" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."chat_messages_role_enum" NOT NULL, "conversation_id" uuid NOT NULL, CONSTRAINT "PK_40c55ee0e571e268b0d3cd37d10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_25f2ebd71bc226b4362e6c4722" ON "chat_messages" ("is_summary") `);
        await queryRunner.query(`CREATE INDEX "IDX_52d89390506ed998a56a73c04c" ON "chat_messages" ("created_at") `);
        await queryRunner.query(`CREATE INDEX "IDX_3d623662d4ee1219b23cf61e64" ON "chat_messages" ("conversation_id") `);
        await queryRunner.query(`CREATE TYPE "public"."conversations_owner_enum" AS ENUM('Epona')`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "prompt" text NOT NULL, "owner" "public"."conversations_owner_enum" NOT NULL, CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chat_messages" ADD CONSTRAINT "FK_3d623662d4ee1219b23cf61e649" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_messages" DROP CONSTRAINT "FK_3d623662d4ee1219b23cf61e649"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TYPE "public"."conversations_owner_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d623662d4ee1219b23cf61e64"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_52d89390506ed998a56a73c04c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_25f2ebd71bc226b4362e6c4722"`);
        await queryRunner.query(`DROP TABLE "chat_messages"`);
        await queryRunner.query(`DROP TYPE "public"."chat_messages_role_enum"`);
    }

}
