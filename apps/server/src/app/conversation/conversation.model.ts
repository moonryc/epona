import { ConversationOwner } from '@epona/epona-db';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Conversation {
  @Field(() => String)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  name: string;

  @Field()
  prompt: string;

  @Field(() => ConversationOwner)
  owner: ConversationOwner;
}

@ObjectType()
export class ConversationWithCount {
  @Field(() => Conversation)
  conversation: Conversation;

  @Field(() => Number)
  count: number;
}
