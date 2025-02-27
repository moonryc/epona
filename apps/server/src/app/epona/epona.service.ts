import { EponaClient } from '@epona/epona-client';
import {
  ChatMessageServiceDB,
  ConversationOwner,
  ConversationServiceDB,
} from '@epona/epona-db';
import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { Socket } from 'socket.io';
import { SuccessResponse } from '../Responses';
import sortChatMessages from '../util/sortMessages.util';
import {
  ChatDto,
  LoadEponaMemoryInput,
  SaveEponaMemoryInput,
} from './epona.input';
import { EponaSingleton } from './epona.singleton';

@Injectable()
export class EponaService {
  private epona: EponaClient;

  constructor(
    @Inject('EPONA_SINGLETON') private readonly eponaSingleton: EponaSingleton,
    private readonly chatMessageServiceDB: ChatMessageServiceDB,
    private readonly conversationServiceDB: ConversationServiceDB
  ) {
    this.epona = eponaSingleton.getInstance();
  }

  async healthCheck() {
    return new SuccessResponse({ success: true, message: 'Healthy' });
  }

  async chat(input: ChatDto, res: Response) {
    if (!input.message) {
      input.message = 'whats the weather?';
    }
    await this.epona.chatStream({
      message: input.message,
      streamCallback: async (stream) => {
        let aiReponse = '';
        for await (const ch of stream) {
          console.log('Sending chunk:', ch.message.content);
          aiReponse += ch.message.content;
          res.write(`${ch.message.content}\n`);
        }
        return aiReponse;
      }
    });
    return res.end();
  }

  async chatSocket(input: { message: string, socketClient: Socket }) {
    try {
      await this.epona.chatStream({
        message: input.message,
        streamCallback: async (stream) => {
          let aiResponse = '';
          for await (const ch of stream) {
            console.log('Sending socket chunk:', ch.message.content);
            aiResponse += ch.message.content;
            input.socketClient.emit('chatResponse', { content: ch.message.content });
          }
          // Send a completion message when the stream is done
          input.socketClient.emit('chatComplete', { 
            success: true, 
            fullResponse: aiResponse 
          });
          return aiResponse;
        }
      });
    } catch (error) {
      console.error('Error in chatSocket:', error);
      input.socketClient.emit('chatError', { 
        success: false, 
        message: 'Error processing chat request. Is OLLAMA running?' 
      });
    }
  }

  async saveEponaMemory(input: SaveEponaMemoryInput) {
    try {
      const chatHistoryExport = this.epona.saveMemory();
      const chatHistoryWithConversationId = chatHistoryExport.map(
        (message) => ({
          ...message,
          conversationId: input.conversationId,
          images: message.images?.map((img) =>
            img instanceof Uint8Array
              ? Buffer.from(img).toString('base64')
              : img
          ),
        })
      );
      await this.chatMessageServiceDB.upsertMany(chatHistoryWithConversationId);
      return new SuccessResponse({ success: true, message: 'Saved memory' });
    } catch (e) {
      console.error(e);
      return new SuccessResponse({
        success: false,
        message: 'Failed to save memory',
      });
    }
  }

  async loadEponaMemory(input: LoadEponaMemoryInput) {
    try {
      const messagesPerConversationWithSummaries =
        await this.chatMessageServiceDB.find({
          where: [
            { conversationId: input.conversationId },
            {
              isSummary: true,
              conversation: { owner: ConversationOwner.EPONA },
            },
          ],
        });
      if (messagesPerConversationWithSummaries.length === 0) {
        return new SuccessResponse({
          success: false,
          message: 'No messages found',
        });
      }
      const conversation = await this.conversationServiceDB.findById(
        input.conversationId
      );
      if (!conversation) {
        return new SuccessResponse({
          success: false,
          message: 'Conversation not found',
        });
      }
      const organizedMessages = sortChatMessages(
        messagesPerConversationWithSummaries
      );
      await this.epona.loadMemory({
        messages: organizedMessages,
        conversationPrompt: conversation.prompt,
      });
      return new SuccessResponse({
        success: true,
        message: 'Successfully loaded memory',
      });
    } catch (e) {
      console.error(e);
      return new SuccessResponse({
        success: false,
        message: 'Failed to load memory',
      });
    }
  }
}
