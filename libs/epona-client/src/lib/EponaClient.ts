import { OllamaClient } from '@epona/ollama';
import EponaBrain from './EponaBrain';
import { OllamaChatParams } from 'libs/ollama/src/lib/types';
import { UserMessage } from 'bee-agent-framework/dist/backend/message';

const eponaBrain =  new EponaBrain()

export default class EponaClient extends OllamaClient {
  private readonly brain: EponaBrain;

  constructor() {
    super(eponaBrain);
    this.brain = eponaBrain;
  }

  get currentEmotion(){
    return this.brain.emotions.currentEmotion;
  }

  chat(input: OllamaChatParams){
    const message = new UserMessage(input.message)
    return super.converse(message)
  }

}
