import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConversationFilterInput as Conversations, CreateConversationInput, UpdateConversationInput } from './conversation.inputs';
import ConversationService from './conversation.service';
import { Conversation, ConversationWithCount } from './conversation.model';
import { SuccessResponse } from '../Responses';

@Resolver(() => Conversation)
export class ConversationResolver {
    constructor(
        private readonly conversationService: ConversationService,
    ) { }

    @Query(() => [Conversation])
    async conversations(
        @Args('input', { nullable: true }) options?: Conversations,
    ) {
        return this.conversationService.find(options || {});
    }

    @Query(() => [ConversationWithCount])
    async conversationsWithCount(
        @Args('input', { nullable: true }) options?: Conversations,
    ) {
        return this.conversationService.findAndCount(options || {});
    }

    @Mutation(() => Conversation)
    async createConversation(
        @Args('input') input: CreateConversationInput,
    ) {
        return this.conversationService.create(input);
    }

    @Mutation(() => Conversation)
    async updateConversation(
        @Args('input') input: UpdateConversationInput,
    ) {
        return this.conversationService.updateById(input);
    }

    @Mutation(() => SuccessResponse)
    async deleteConversations(
        @Args('ids', { type: () => [String] }) ids: string[],
    ) {
        try{
            await this.conversationService.hardDelete(ids);
            return new SuccessResponse({ success: true });
        }catch(error){
            return new SuccessResponse({ success: false, message:JSON.stringify(error, null, 2) });
        }
    }
}
