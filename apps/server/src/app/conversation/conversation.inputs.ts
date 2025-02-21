import { Field, InputType } from '@nestjs/graphql';
import { FindManyOptions } from 'typeorm';
import { Conversation, ConversationOwner } from '@epona/epona-db';

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
export class ConversationFilterInput implements Partial<FindManyOptions<Conversation>> {
    @Field(() => Number, { nullable: true })
    take?: number;

    @Field(() => Number, { nullable: true })
    skip?: number;

    @Field(() => Boolean, { nullable: true })
    withDeleted?: boolean;
}
