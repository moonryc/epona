import { BaseMemoryMessage, SystemMessage } from '../messages';

export default class BaseMemory {
  protected messagesHistory: BaseMemoryMessage[] = [];
  protected prompt: SystemMessage;

  constructor(prompt: SystemMessage) {
    this.prompt = prompt;
  }

  public get messages(): readonly BaseMemoryMessage[] {
    throw new Error("Method not implemented.");
  }

  get messagesWithPrompt(): readonly BaseMemoryMessage[] {
    throw new Error("Method not implemented.");
  }

  public add(message: BaseMemoryMessage, index?: number) {
    throw new Error("Method not implemented.");
  }

  delete(message: BaseMemoryMessage) {
    throw new Error("Method not implemented.");
  }

  reset(): void {
    throw new Error("Method not implemented.");
  }

  async createSnapshot(): Promise<BaseMemoryMessage[]> {
    throw new Error("Method not implemented.");
  }

  async loadSnapshot(state: BaseMemoryMessage[]): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
