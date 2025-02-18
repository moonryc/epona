import { UnconstrainedMemory } from '@epona/ollama';

export default class EponaEmotions {
  private memory: UnconstrainedMemory;

  constructor(memory:UnconstrainedMemory) {
    this.memory = memory;
  }

  private get lastTenMessages(){
    return this.memory.messages.slice(-10);
  }

  public get currentEmotion(){
    return "HARDCODED HAPPY"
  }

}
