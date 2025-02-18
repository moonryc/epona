import { OllamaClient } from '@epona/ollama';
import EponaBrain from './EponaBrain';

const eponaBrain =  new EponaBrain()

export default class EponaClient extends OllamaClient {
  private readonly brain: EponaBrain;

  constructor() {
    super(eponaBrain);
    this.brain = eponaBrain;
  }

  get currentEmotion() {
    return this.brain.emotions.currentEmotion;
  }


  async chatConverse(message: string) {
    return super.converse({message});
  }

  streamchat(message: string) {
    return super.streamConverse({ message });
  }
}
