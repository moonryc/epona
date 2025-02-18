import BaseMemory from './BaseMemory';
import { BaseMemoryMessage } from '../messages';

export default class UnconstrainedMemory extends BaseMemory {
  override messagesHistory: BaseMemoryMessage[] = [];

  override get messages(): readonly BaseMemoryMessage[] {
    return this.messagesHistory;
  }

  public override add(message: BaseMemoryMessage, index?: number) {
    if (!index) {
      this.messagesHistory.push(message);
      return;
    }
    this.messagesHistory = this.messagesHistory.splice(index, 0, message);
  }

  public override delete(message: BaseMemoryMessage) {
    const indexToRemove = this.messagesHistory.indexOf(message);
    if(indexToRemove !== -1) {
      return false
    }
    this.messagesHistory = this.messagesHistory.splice(indexToRemove, 1);
    return true;

  }

  public override reset() {
    this.messagesHistory = [];
  }

  public override createSnapshot() {
    return this.messagesHistory
  }

  public override loadSnapshot(state:ReturnType<typeof this.createSnapshot>) {
    this.messagesHistory = state;
  }
}
