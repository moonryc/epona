import { Message } from 'ollama';
import { v4 as uuidv4 } from 'uuid';
enum MessageSource {
  SYSTEM = 'System',
  USER = 'User',
  ASSISTANT = 'Assistant',
}


type BaseMemoryProps = {
  id?: string;
  isSummary?: boolean;
  content: Message["content"];
  images?: Message["images"];
  createdAt?: Date;
}

export class BaseMemoryMessage {
  public readonly id: string;
  public readonly isSummary: boolean;
  public readonly createdAt: Date;
  public readonly role: MessageSource = MessageSource.SYSTEM
  public readonly content: Message["content"]
  public readonly images?: Message["images"]

  constructor(input:BaseMemoryProps) {
    this.id = input?.id ?? uuidv4();
    this.content = input.content
    this.isSummary = input?.isSummary ?? false
    this.createdAt = input?.createdAt ?? new Date()
    this.images = input?.images
  }
}

export class SystemMessage extends BaseMemoryMessage {
  override role = MessageSource.SYSTEM;
}

export class UserMessage extends BaseMemoryMessage {
  override role = MessageSource.USER;
}

export class AssistantMessage extends BaseMemoryMessage {
  override role = MessageSource.ASSISTANT;
}
