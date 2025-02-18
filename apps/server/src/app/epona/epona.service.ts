import { Inject, Injectable } from '@nestjs/common';
import { ChatDto } from './epona.input';
import { EponaSingleton } from './epona.singleton';
import { SuccessResponse } from '../Responses';
import { EponaClient } from '@epona/epona-client';

@Injectable()
export class EponaService {
  private epona: EponaClient

  constructor(
    @Inject('EPONA_SINGLETON') private readonly eponaSingleton: EponaSingleton
  ) {
    this.epona = eponaSingleton.getInstance();
  }
  async healthCheck() {
    return new SuccessResponse({ success: true, message: 'Healthy' });
  }

  async chat(input:ChatDto){
    if (!input.message){
      return
    }
    const stream = await this.epona.chatConverse(input.message)
    return stream
    // return new Response(
    //   new ReadableStream({
    //     start: async (controller)=>{
    //       for await (const chunk of stream){
    //         console.log(chunk);
    //         const textEncoder = new TextEncoder();
    //         controller.enqueue(textEncoder.encode(chunk.message.content));
    //       }
    //       controller.close()
    //     }
    //   }),
    //   { headers: { "Content-Type": "text/plain" } } // Ensure proper response type
    // )
  }

  saveMemory() {
    return new SuccessResponse({ success: true });
  }

  loadMemory() {
    return new SuccessResponse({ success: true });
  }
}
