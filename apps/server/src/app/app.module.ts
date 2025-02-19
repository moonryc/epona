import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EponaModule } from './epona/epona.module';
import { AppGateway } from './AppGateway';

@Module({
  imports: [EponaModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
