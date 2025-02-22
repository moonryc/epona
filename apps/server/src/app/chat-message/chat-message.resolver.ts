import { ChatMessage } from './chat-message.model';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChatMessagesInput, CreateChatMessageInput, UpdateChatMessageInput } from './chat-message.inputs';
import ChatMessageService from './chat-message.service';
import { ChatMessageWithCount } from './chat-message.model';
import { SuccessResponse } from '../Responses';

@Resolver(() => ChatMessage)
export class ChatMessageResolver {
    constructor(
        private readonly chatMessageService: ChatMessageService,
    ) { }

    @Query(() => [ChatMessage])
    async chatMessages(
        @Args('input', { nullable: true }) options?: ChatMessagesInput,
    ) {
        return this.chatMessageService.find(options || {});
    }

    @Query(() => [ChatMessageWithCount])
    async chatMessagesWithCount(
        @Args('input', { nullable: true }) options?: ChatMessagesInput,
    ) {
        return this.chatMessageService.findAndCount(options || {});
    }

    @Mutation(() => ChatMessage)
    async createChatMessage(
        @Args('input') input: CreateChatMessageInput,
    ) {
        return this.chatMessageService.create(input);
    }

    @Mutation(() => ChatMessage)
    async updateChatMessage(
        @Args('input') input: UpdateChatMessageInput,
    ) {
        return this.chatMessageService.updateById(input);
    }

    @Mutation(() => SuccessResponse)
    async deleteChatMessages(
        @Args('ids', { type: () => [String] }) ids: string[],
    ) {
        try{
            await this.chatMessageService.hardDelete(ids);
            return new SuccessResponse({ success: true });
        }catch(error){
            return new SuccessResponse({ success: false, message:JSON.stringify(error, null, 2) });
        }
    }
}