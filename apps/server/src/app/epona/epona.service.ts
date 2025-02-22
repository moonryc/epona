import { Inject, Injectable } from '@nestjs/common';
import { ChatDto, SaveMemoryInput } from './epona.input';
import { EponaSingleton } from './epona.singleton';
import { SuccessResponse } from '../Responses';
import { EponaClient } from '@epona/epona-client';
import {Response} from 'express';
import ChatMessageService from '../chat-message/chat-message.service';

@Injectable()
export class EponaService {
  private epona: EponaClient

  constructor(
    @Inject('EPONA_SINGLETON') private readonly eponaSingleton: EponaSingleton,
    private readonly chatMessageService: ChatMessageService
  ) {
    this.epona = eponaSingleton.getInstance();
  }

  async healthCheck() {
    return new SuccessResponse({ success: true, message: 'Healthy' });
  }

  async chat(input: ChatDto, res: Response) {
    if (!input.message) {
      input.message = "whats the weather?";
    }
    const stream = await this.epona.chatStream(input.message);
    let aiReponse = ''
    for await (const ch of stream) {
      console.log("Sending chunk:", ch.message.content);
      aiReponse += ch.message.content;
      res.write(`${ch.message.content}\n`);
    }
    this.epona.saveResponseToMemory(aiReponse);
    return res.end();
  }

  async saveMemory(input: SaveMemoryInput) {
    try{
      const chatHistoryExport =  this.epona.saveMemory()
      const chatHistoryWithConversationId = chatHistoryExport.map(message => ({
        ...message,
        conversationId: input.conversationId,
        images: message.images?.map(img => img instanceof Uint8Array ? Buffer.from(img).toString('base64') : img)
      }))
      await this.chatMessageService.upsertMany(chatHistoryWithConversationId)
      return new SuccessResponse({ success: true, message: 'Saved memory' });
    }catch(e){
      console.error(e);
      return new SuccessResponse({ success: false, message: 'Failed to save memory' });
    }
  }

  async loadMemory() {
    try{
      await this.epona.loadMemory()
      return new SuccessResponse({ success: true, message: 'Successfully loaded memory' });
    }catch(e){
      console.error(e);
      return new SuccessResponse({ success: false, message: 'Failed to load memory' });
    }
  }
}
