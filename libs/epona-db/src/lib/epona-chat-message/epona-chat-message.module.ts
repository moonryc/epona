import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EponaChatMessage from './epona-chat-message.entity';
import EponaChatMessageService from './epona-chat-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([EponaChatMessage])],
  providers: [EponaChatMessageService],
  exports: [EponaChatMessageService],
})
export default class EponaChatMessageModuleDB {}
