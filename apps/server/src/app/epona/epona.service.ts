import { EponaClient } from '@epona/epona-client';
import { ChatMessageServiceDB, ConversationOwner } from '@epona/epona-db';
import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { SuccessResponse } from '../Responses';
import { ChatDto, LoadEponaMemoryInput, SaveEponaMemoryInput,  } from './epona.input';
import { EponaSingleton } from './epona.singleton';
import sortChatMessages from '../util/sortMessages.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '@epona/epona-db';

@Injectable()
export class EponaService {
  private epona: EponaClient

  constructor(
    @Inject('EPONA_SINGLETON') private readonly eponaSingleton: EponaSingleton,
    private readonly chatMessageServiceDB: ChatMessageServiceDB,
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

  async saveEponaMemory(input: SaveEponaMemoryInput) {
    try{
      const chatHistoryExport =  this.epona.saveMemory()
      const chatHistoryWithConversationId = chatHistoryExport.map(message => ({
        ...message,
        conversationId: input.conversationId,
        images: message.images?.map(img => img instanceof Uint8Array ? Buffer.from(img).toString('base64') : img)
      }))
      await this.chatMessageServiceDB.upsertMany(chatHistoryWithConversationId)
      return new SuccessResponse({ success: true, message: 'Saved memory' });
    }catch(e){
      console.error(e);
      return new SuccessResponse({ success: false, message: 'Failed to save memory' });
    }
  }

  async loadEponaMemory(input: LoadEponaMemoryInput) {
    try{
      const messagesPerConversationWithSummaries = await this.chatMessageServiceDB.find({ 
        where: [
          {conversationId: input.conversationId},
          {isSummary: true, conversation:{owner: ConversationOwner.EPONA}}
        ]
      })
      if(messagesPerConversationWithSummaries.length === 0){
        return new SuccessResponse({ success: false, message: 'No messages found' });
      }
      const organizedMessages = sortChatMessages(messagesPerConversationWithSummaries)
      await this.epona.loadMemory(organizedMessages)
      return new SuccessResponse({ success: true, message: 'Successfully loaded memory' });
    }catch(e){
      console.error(e);
      return new SuccessResponse({ success: false, message: 'Failed to load memory' });
    }
  }
}
