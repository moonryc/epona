import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EponaModule } from './epona/epona.module';
import { AppGateway } from './app.gateway';
import { EponaDbModule } from '@epona/epona-db';

@Module({
  imports: [
    EponaModule,
    //TODO: Huh I think this is broken
    EponaDbModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
