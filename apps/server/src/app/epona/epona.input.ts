import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

export class ChatDto {
  @IsString()
  message: string | undefined;
}

@InputType()
export class SaveEponaMemoryInput {
  @Field(() => String)
  conversationId: string;
}

@InputType()
export class LoadEponaMemoryInput {
  @Field(() => String)
  conversationId: string;
}