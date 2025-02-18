import { Inject, Injectable } from '@nestjs/common';
import { SuccessResponse } from './Responses';
import { EponaSingleton } from './epona/epona.singleton';

@Injectable()
export class AppService {
  constructor(
    @Inject('EPONA_SINGLETON') private readonly eponaSingleton: EponaSingleton
  ) {}
  async healthCheck() {
    return new SuccessResponse({ success: true, message: 'Healthy' });
  }

  async chat(){

  }

  saveMemory() {
    return new SuccessResponse({ success: true });
  }

  loadMemory() {
    return new SuccessResponse({ success: true });
  }
}
