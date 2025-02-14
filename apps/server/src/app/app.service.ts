import { Injectable } from '@nestjs/common';
import { EponaClient } from '@epona/epona-client';

@Injectable()
export class AppService {
  async getData() {
    const epona = new EponaClient();
    const a = await epona.converse({ message: "what is 3 plus 5" });
    console.log(a)
    return { message: 'Hello API' };
  }
}
