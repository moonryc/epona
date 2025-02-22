import { Module } from '@nestjs/common/decorators';
import { EponaSingleton } from './epona.singleton';
import { Provider } from '@nestjs/common';
import { EponaController } from './epona.controller';
import { EponaService } from './epona.service';
import { ChatMessageModule } from '../chat-message/chat-message.module';
import { EponaResolver } from './epona.resolver';

const EPONA_PROVIDER: Provider = {
  provide: 'EPONA_SINGLETON',
  useClass: EponaSingleton,
}

@Module({
  imports: [ChatMessageModule],
  providers: [EPONA_PROVIDER, EponaService, EponaResolver],
  controllers: [EponaController],
  exports: ['EPONA_SINGLETON', EponaService],
})
export class EponaModule {}
