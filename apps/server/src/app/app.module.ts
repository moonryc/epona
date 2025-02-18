import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EponaModule } from './epona/epona.module';

@Module({
  imports: [EponaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
