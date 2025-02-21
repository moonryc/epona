import { ConversationModuleDB } from '@epona/epona-db';
import { Module } from '@nestjs/common';
import { ConversationResolver } from './conversation.resolver';
import ConversationService from './conversation.service';

@Module({
    imports: [ConversationModuleDB],
    providers: [ConversationResolver, ConversationService],
    exports: [ConversationService],
})
export class ConversationModule { }
