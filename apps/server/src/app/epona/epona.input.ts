import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

export class ChatDto {
  @IsString()
  message: string | undefined;
}

@InputType()
export class SaveMemoryInput {
  @Field(() => String)
  conversationId: string;
}
