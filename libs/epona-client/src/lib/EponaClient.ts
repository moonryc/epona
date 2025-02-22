import { BaseMemoryMessage, OllamaClient, UserMessage } from '@epona/ollama';
import { Message } from 'ollama';
import EponaBrain from './EponaBrain';


export default class EponaClient extends OllamaClient {
  private readonly _brain: EponaBrain;

  constructor() {
    const eponaBrain =  new EponaBrain()
    super(eponaBrain);
    this._brain = eponaBrain;
  }

  get currentEmotion() {
    return this._brain.emotions.currentEmotion;
  }

  async chatStream(message: string) {
    const userMessage = new UserMessage({content:message})
    const messages: Message[] = [...this._memory.messagesWithPrompt, userMessage]
    const stream = await this.streamChat(messages)
    this._memory.add(userMessage);
    // const [a,b] = tee(stream)
    // void super.saveStreamToMemory(b as unknown as  typeof stream);
    return stream
  }


  //region MEMORY
  public saveMemory(){
    return this._brain.memory.createSnapshot()
  }

  public async loadMemory(messages:BaseMemoryMessage[]){
    await this._brain.memory.loadSnapshot(messages)
  }
  //endregion
}
