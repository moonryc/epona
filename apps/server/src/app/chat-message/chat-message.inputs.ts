import { MessageSource } from "@epona/epona-db";
import { Field, InputType, registerEnumType } from "@nestjs/graphql";

registerEnumType(MessageSource, {
    name: 'MessageSource',
});

@InputType()
export class CreateChatMessageInput {

    @Field(() => Boolean, { nullable: true })
    isSummary?: boolean = false;

    @Field()
    content: string;

    @Field(() => [String], { nullable: true })
    images?: string[];

    @Field(() => MessageSource)
    role: MessageSource;

    @Field()
    conversationId: string;
}

@InputType()
export class UpdateChatMessageInput {
    @Field()
    id: string;

    @Field(()=>String,{ nullable: true })
    content?: string;

    @Field(() => [String], { nullable: true })
    images?: string[];

    @Field(() => Boolean, { nullable: true })
    isSummary?: boolean;

    @Field(() => MessageSource, { nullable: true })
    role?: MessageSource;
}

@InputType()
export class ChatMessageWhereInput {
    @Field(() => [String], { nullable: true })
    ids?: string[];

    @Field({ nullable: true })
    conversationId?: string;

    @Field(() => Boolean, { nullable: true })
    isSummary?: boolean;

    @Field(() => MessageSource, { nullable: true })
    role?: MessageSource;
}

@InputType()
export class ChatMessagesInput {
    @Field(() => ChatMessageWhereInput, { nullable: true })
    where?: ChatMessageWhereInput;

    @Field({ nullable: true })
    skip?: number;

    @Field({ nullable: true })
    take?: number;

}
