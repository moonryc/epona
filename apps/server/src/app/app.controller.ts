import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/healthCheck')
  healthCheck() {
    return this.appService.healthCheck();
  }

  @Get('/saveMemory')
  saveMemory() {
    return this.appService.saveMemory();
  }

  @Get('/loadMemory')
  loadMemory() {
    return this.appService.loadMemory();
  }

  // @Get()
  // getData() {
  //   return this.appService.getData();
  // }
}

