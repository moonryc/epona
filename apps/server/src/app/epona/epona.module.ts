import { Module } from '@nestjs/common/decorators';
import { EponaSingleton } from './epona.singleton';
import { Provider } from '@nestjs/common';
import { EponaController } from './epona.controller';
import { EponaService } from './epona.service';

const EPONA_PROVIDER:Provider = {
  provide: 'EPONA_SINGLETON',
  useClass: EponaSingleton,
}

@Module({
  providers: [EPONA_PROVIDER, EponaService],
  controllers: [EponaController],
  exports: ['EPONA_SINGLETON', EponaService],
})
export class EponaModule {}
