import { Injectable } from '@nestjs/common';
import { SuccessResponse } from './Responses';

@Injectable()
export class AppService {
  async healthCheck() {
    return new SuccessResponse({ success: true, message: 'Healthy' });
  }
}
