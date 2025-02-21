import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { EntityManager, FindManyOptions } from 'typeorm';
import { In, Repository } from "typeorm";
import ChatMessage from './chat-message.entity';

@Injectable()
export default class ChatMessageServiceDB {
  constructor(
    @InjectRepository(ChatMessage)
    private eponaChatMessageRepository: Repository<ChatMessage>,
  ) {}

  private repository(trx?: EntityManager) {
    return trx ? trx.getRepository(ChatMessage) : this.eponaChatMessageRepository;
  }

  async create(eponaChatMessage: Omit<ChatMessage, "id" | "createdAt">, trx?: EntityManager) {
    return this.repository(trx).save(eponaChatMessage);
  }

  async updateById(eponaChatMessage: Pick<ChatMessage, "id"> &  Partial<ChatMessage>, trx?: EntityManager) {
    await this.repository(trx).update(eponaChatMessage.id, eponaChatMessage);
    return this.repository(trx).findOne({ where: { id: eponaChatMessage.id } });
  }

  async find(input: FindManyOptions<ChatMessage>, trx?: EntityManager) {
    return this.repository(trx).find(input);
  }

  async findAndCount(input: FindManyOptions<ChatMessage>, trx?: EntityManager) {
    const [items, count] = await this.repository(trx).findAndCount(input);
    return {
      count,
      items,
    };
  }

  async findById(id: ChatMessage["id"], trx?: EntityManager) {
    return this.repository(trx).findOne({ where: { id } });
  }

  async hardDelete(ids: ChatMessage["id"][], trx?: EntityManager) {
    const accounts = await this.repository(trx).find({where: { id: In(ids) },});
    await this.repository(trx).remove(accounts);
    const deleteCheck = await this.repository(trx).find({ where: { id: In(ids) } });
    if (deleteCheck.length > 0) {
      throw new Error(`Failed to delete chats with ids: ${ids.join(", ")}`);
    }
  }
}
