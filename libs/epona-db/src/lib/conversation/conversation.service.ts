import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { EntityManager, FindManyOptions } from 'typeorm';
import { In, Repository } from "typeorm";
import Conversation from './conversation.entity';

@Injectable()
export default class ConversationServiceDB {
  constructor(
    @InjectRepository(Conversation)
    private eponaConversationRepository: Repository<Conversation>,
  ) {}

  private repository(trx?: EntityManager) {
    return trx ? trx.getRepository(Conversation) : this.eponaConversationRepository;
  }

  async create(eponaConversation: Omit<Conversation, "id" | "createdAt"| "messages">, trx?: EntityManager) {
    return this.repository(trx).save(eponaConversation);
  }

  async updateById(eponaConversation: Pick<Conversation, "id"> & Partial<Conversation>, trx?: EntityManager) {
    await this.repository(trx).update(eponaConversation.id, eponaConversation);
    return this.repository(trx).findOne({ where: { id: eponaConversation.id } });
  }

  async find(input: FindManyOptions<Conversation>, trx?: EntityManager) {
    return this.repository(trx).find(input);
  }

  async findAndCount(input: FindManyOptions<Conversation>, trx?: EntityManager) {
    const [items, count] = await this.repository(trx).findAndCount(input);
    return {
      count,
      items,
    };
  }

  async findById(id: Conversation["id"], trx?: EntityManager) {
    return this.repository(trx).findOne({ where: { id } });
  }

  async hardDelete(ids: Conversation["id"][], trx?: EntityManager) {
    const conversations = await this.repository(trx).find({ where: { id: In(ids) } });
    await this.repository(trx).remove(conversations);
    const deleteCheck = await this.repository(trx).find({ where: { id: In(ids) } });
    if (deleteCheck.length > 0) {
      throw new Error(`Failed to delete conversations with ids: ${ids.join(", ")}`);
    }
  }
} 