enum MessageSource {
  SYSTEM = 'System',
  USER = 'User',
  ASSISTANT = 'Assistant',
}


export class BaseMemoryMessage {
  public readonly source: MessageSource = MessageSource.SYSTEM
  public readonly message: string

  constructor(message: string) {
    this.message = message
  }
}

export class SystemMessage extends BaseMemoryMessage {
  override source = MessageSource.SYSTEM;
}

export class UserMessage extends BaseMemoryMessage {
  override source = MessageSource.USER;
}

export class AssistantMessage extends BaseMemoryMessage {
  override source = MessageSource.ASSISTANT;
}
