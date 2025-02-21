import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ChatMessage from './chat-message.entity';
import ChatMessageService from './chat-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  providers: [ChatMessageService],
  exports: [ChatMessageService],
})
export default class ChatMessageModuleDB {}
