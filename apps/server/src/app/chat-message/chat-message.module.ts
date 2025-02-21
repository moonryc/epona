import { ChatMessageModuleDB } from '@epona/epona-db';
import { Module } from '@nestjs/common';
import { ChatMessageResolver } from './chat-message.resolver';
import ChatMessageService from './chat-message.service';

@Module({
    imports: [ChatMessageModuleDB],
  providers: [ChatMessageResolver, ChatMessageService],
  exports: [ChatMessageService]
})
export class ChatMessageModule {}
