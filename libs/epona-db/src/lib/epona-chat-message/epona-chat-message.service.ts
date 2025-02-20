import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { EntityManager, FindManyOptions } from 'typeorm';
import { In, Repository } from "typeorm";
import EponaChatMessage from './epona-chat-message.entity';

@Injectable()
export default class EponaChatMessageService {
  constructor(
    @InjectRepository(EponaChatMessage)
    private eponaChatMessageRepository: Repository<EponaChatMessage>,
  ) {}

  private repository(trx?: EntityManager) {
    return trx ? trx.getRepository(EponaChatMessage) : this.eponaChatMessageRepository;
  }

  async create(eponaChatMessage: EponaChatMessage, trx?: EntityManager) {
    return this.repository(trx).save(eponaChatMessage);
  }

  async updateById(eponaChatMessage: Pick<EponaChatMessage, "id"> &  Partial<EponaChatMessage>, trx?: EntityManager) {
    await this.repository(trx).update(eponaChatMessage.id, eponaChatMessage);
    return this.repository(trx).findOne({ where: { id: eponaChatMessage.id } });
  }

  async find(input: FindManyOptions<EponaChatMessage>, trx?: EntityManager) {
    return this.repository(trx).find(input);
  }

  async findAndCount(input: FindManyOptions<EponaChatMessage>, trx?: EntityManager) {
    const [items, count] = await this.repository(trx).findAndCount(input);
    return {
      count,
      items,
    };
  }

  async findById(id: EponaChatMessage["id"], trx?: EntityManager) {
    return this.repository(trx).findOne({ where: { id } });
  }

  async hardDelete(ids: number[], trx?: EntityManager) {
    const accounts = await this.repository(trx).find({where: { id: In(ids) },});
    await this.repository(trx).remove(accounts);
    const deleteCheck = await this.repository(trx).find({ where: { id: In(ids) } });
    if (deleteCheck.length > 0) {
      throw new Error(`Failed to delete accounts with ids: ${ids.join(", ")}`);
    }
  }
}
