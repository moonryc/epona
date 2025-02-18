import { BaseMemoryMessage } from '../messages';

export default class BaseMemory {
  protected messagesHistory: BaseMemoryMessage[] = [];

  public get messages(): readonly BaseMemoryMessage[] {
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

  createSnapshot(): unknown {
    throw new Error("Method not implemented.");
  }

  loadSnapshot(state: ReturnType<typeof this.createSnapshot>): void {
    throw new Error("Method not implemented.");
  }
}
