import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SuccessResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String, { nullable: true })
  message?: string;

  constructor({ success, message }: { success: boolean; message?: string }) {
    this.success = success;
    this.message = message;
  }
}
