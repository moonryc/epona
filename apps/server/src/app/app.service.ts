import { Injectable } from '@nestjs/common';
import { EponaClient } from '@epona/epona-client';
import { SuccessResponse } from './Responses';

@Injectable()
export class AppService {

  healthCheck(){
    // const epona = new EponaClient();
    // new EponaClient()
    // const a = await epona.converse({ message: "what is 3 plus 5" });
    // console.log(a)

    return new SuccessResponse({success:true, message: "Healthy"})
  }

  saveMemory(){
    return new SuccessResponse({success:true})
  }

  loadMemory(){
    return new SuccessResponse({success:true})
  }
}
