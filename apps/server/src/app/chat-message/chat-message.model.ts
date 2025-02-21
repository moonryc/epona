import { Field, ObjectType } from '@nestjs/graphql';
import { Conversation } from '../conversation/conversation.model';

@ObjectType()
export class ChatMessage {
  @Field(() => String)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  content: string;

  @Field()
  role: string;

  @Field(() => Conversation)
  conversation: Conversation;

  @Field(() => String)
  conversationId: string;
}

@ObjectType()
export class ChatMessageWithCount {
  @Field(() => ChatMessage)
  chatMessage: ChatMessage;

  @Field(() => Number)
  count: number;
}