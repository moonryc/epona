import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/healthCheck')
  healthCheck() {
    this.appService.healthCheck();
  }

  @Get()
  getData() {
    return this.appService.getData();
  }
}

