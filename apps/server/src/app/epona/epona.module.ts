import { ChatMessageModuleDB } from '@epona/epona-db';
import { Provider } from '@nestjs/common';
import { Module } from '@nestjs/common/decorators';
import { EponaController } from './epona.controller';
import { EponaResolver } from './epona.resolver';
import { EponaService } from './epona.service';
import { EponaSingleton } from './epona.singleton';

const EPONA_PROVIDER: Provider = {
  provide: 'EPONA_SINGLETON',
  useClass: EponaSingleton,
}

@Module({
  imports: [ChatMessageModuleDB],
  providers: [EPONA_PROVIDER, EponaService, EponaResolver],
  controllers: [EponaController],
  exports: ['EPONA_SINGLETON', EponaService],
})
export class EponaModule { }