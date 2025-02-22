import { ConversationServiceDB, Conversation } from "@epona/epona-db";
import { Injectable } from "@nestjs/common";
import type { EntityManager } from 'typeorm';
import { CreateConversationInput, UpdateConversationInput, ConversationsInput } from './conversation.inputs';

@Injectable()
export default class ConversationService {
    constructor(
        private readonly conversationServiceDB: ConversationServiceDB,
    ) {}

    async create(input: CreateConversationInput) {
        return this.conversationServiceDB.create(input);
    }

    async updateById(input: UpdateConversationInput) {
        return this.conversationServiceDB.updateById(input);
    }

    async find(input: ConversationsInput) {
        return this.conversationServiceDB.find(input);
    }

    async findAndCount(input: ConversationsInput) {
        return this.conversationServiceDB.findAndCount(input);
    }

    async findById(id: Conversation["id"], trx?: EntityManager) {
        return this.conversationServiceDB.findById(id, trx);
    }

    async hardDelete(ids: Conversation["id"][], trx?: EntityManager) {
        return this.conversationServiceDB.hardDelete(ids, trx);
    }
}
