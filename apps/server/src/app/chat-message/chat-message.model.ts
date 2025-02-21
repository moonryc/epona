import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ChatMessage as DBChatMessage } from '@epona/epona-db';

@ObjectType()
export class ChatMessage implements Partial<DBChatMessage> {
    @Field(() => ID)
    id: string;

    @Field()
    content: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => String, { nullable: true })
    userId?: string;

    @Field(() => String, { nullable: true })
    conversationId?: string;
}

@ObjectType()
export class ChatMessageWithCount {
    @Field(() => [ChatMessage])
    items: ChatMessage[];

    @Field()
    count: number;
}