import { BaseMemoryMessage } from '../messages';

export default class BaseMemory {
  get messages(): readonly BaseMemoryMessage[] {
    throw new Error("Method not implemented.");
  }

  add(message: BaseMemoryMessage, index?: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(message: BaseMemoryMessage): Promise<boolean> {
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
