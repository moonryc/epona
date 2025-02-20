import BaseMemory from './BaseMemory';
import { BaseMemoryMessage, SystemMessage } from '../messages';

export default class UnconstrainedMemory extends BaseMemory {

  constructor(prompt: SystemMessage) {
    super(prompt);
  }

  override get messages(): readonly BaseMemoryMessage[] {
    return this._messages;
  }

  override get messagesWithPrompt(): readonly BaseMemoryMessage[] {
    return [this._prompt, ...this._messages];
  }

  public override add(message: BaseMemoryMessage, index?: number) {
    if (!index) {
      this._messages.push(message);
      return;
    }
    this._messages = this._messages.splice(index, 0, message);
  }

  public override delete(message: BaseMemoryMessage) {
    const indexToRemove = this._messages.indexOf(message);
    if (indexToRemove !== -1) {
      return false;
    }
    this._messages = this._messages.splice(indexToRemove, 1);
    return true;
  }

  public override reset() {
    this._messages = [];
  }

  public override async createSnapshot() {
    return this._messages;
  }

  public override async loadSnapshot(state: BaseMemoryMessage[]) {
    this._messages = state;
  }
}
