import { Message } from 'ollama';

enum MessageSource {
  SYSTEM = 'System',
  USER = 'User',
  ASSISTANT = 'Assistant',
}


export class BaseMemoryMessage {
  public readonly timestamp: number = new Date().getMilliseconds();
  public readonly role: MessageSource = MessageSource.SYSTEM
  public readonly content: Message["content"]
  public readonly images?: Message["images"]

  constructor(message: string) {
    this.content = message
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
