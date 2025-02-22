import { ChatMessage, ChatMessageServiceDB } from "@epona/epona-db";
import { Injectable } from "@nestjs/common";
import type { EntityManager } from 'typeorm';
import { ChatMessageFilterInput, CreateChatMessageInput, UpdateChatMessageInput } from './chat-message.inputs';

@Injectable()
export default class ChatMessageService {
    constructor(
        private readonly chatMessageServiceDB: ChatMessageServiceDB,
    ) {}

    async create(input: CreateChatMessageInput) {
        return this.chatMessageServiceDB.create({...input, isSummary: input?.isSummary ?? false});
    }

    async updateById(input: UpdateChatMessageInput) {
        return this.chatMessageServiceDB.updateById(input);
    }

    async upsertMany(input: ChatMessage[] | Omit<ChatMessage, "id" | "conversation">[]) {
        return this.chatMessageServiceDB.upsertMany(input);
    }
    
    async find(input: ChatMessageFilterInput) {
        return this.chatMessageServiceDB.find(input);
    }

    async findAndCount(input: ChatMessageFilterInput) {
        return this.chatMessageServiceDB.findAndCount(input);
    }

    async findById(id: ChatMessage["id"], trx?: EntityManager) {
        return this.chatMessageServiceDB.findById(id, trx);
    }

    async hardDelete(ids: ChatMessage["id"][], trx?: EntityManager) {
        return this.chatMessageServiceDB.hardDelete(ids, trx);
    }
}