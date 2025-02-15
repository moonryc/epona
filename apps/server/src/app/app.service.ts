import { Injectable } from '@nestjs/common';
import { EponaClient } from '@epona/epona-client';
import { SuccessResponse } from './Responses';

@Injectable()
export class AppService {

  healthCheck(){
    return new SuccessResponse({success:true})
  }

  async getData() {
    const epona = new EponaClient();
    // const a = await epona.converse({ message: "what is 3 plus 5" });
    // console.log(a)
    return { message: 'Hello API' };
  }
}
