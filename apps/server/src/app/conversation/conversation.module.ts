import { ConversationServiceDB } from '@epona/epona-db';
import { Module } from '@nestjs/common';
import { ConversationResolver } from './conversation.resolver';
import ConversationService from './conversation.service';

@Module({
  providers: [ConversationResolver, ConversationService, ConversationServiceDB],
  exports: [ConversationService],
})
export class ConversationModule {}
