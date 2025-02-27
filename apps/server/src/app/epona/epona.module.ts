import { ChatMessageModuleDB } from '@epona/epona-db';
import { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common/decorators';
import { EponaController } from './epona.controller';
import { EponaResolver } from './epona.resolver';
import { EponaService } from './epona.service';
import { EponaSingleton } from './epona.singleton';
import { ConversationModuleDB } from '@epona/epona-db';
import { EponaGateway } from './epona.gateway';

const EPONA_PROVIDER: Provider = {
  provide: 'EPONA_SINGLETON',
  useClass: EponaSingleton,
}

@Module({
  imports: [ChatMessageModuleDB, ConversationModuleDB],
  providers: [
    EponaSingleton,
    EPONA_PROVIDER,
    EponaService,
    EponaResolver,
    EponaGateway
  ],
  controllers: [EponaController],
  exports: ['EPONA_SINGLETON', EponaService, EponaSingleton],
})
export class EponaModule { }