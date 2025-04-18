import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { FindManyOptions } from 'typeorm';
import { Conversation, ConversationOwner } from '@epona/epona-db';

registerEnumType(ConversationOwner, {
    name: 'ConversationOwner',
});

@InputType()
export class CreateConversationInput {
    @Field()
    name: string;

    @Field()
    prompt: string;

    @Field(() => ConversationOwner)
    owner: ConversationOwner;
}

@InputType()
export class UpdateConversationInput {
    @Field(()=>String)
    id: string;

    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    prompt?: string;

    @Field(() => ConversationOwner, { nullable: true })
    owner?: ConversationOwner;
}

@InputType()
export class ConversationWhere {
    @Field(() => ConversationOwner, { nullable: true })
    owner?: ConversationOwner;
}

@InputType()
export class ConversationsInput implements Partial<FindManyOptions<Conversation>> {
    @Field(() => Number, { nullable: true })
    take?: number;

    @Field(() => Number, { nullable: true })
    skip?: number;

    @Field(() => Boolean, { nullable: true })
    withDeleted?: boolean;

    @Field(() => ConversationWhere, { nullable: true })
    where?: ConversationWhere;
}
