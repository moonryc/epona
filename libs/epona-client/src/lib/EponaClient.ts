import { BaseMemoryMessage, OllamaClient, SystemMessage, UserMessage } from '@epona/ollama';
import { Message } from 'ollama';
import EponaBrain from './EponaBrain';


export default class EponaClient extends OllamaClient {
  private readonly _brain: EponaBrain;
  private conversationPrompt: string;

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
    const aggPrompt = [this._brain.prompt]
    if(this.conversationPrompt) aggPrompt.push(new SystemMessage({content:this.conversationPrompt}))
    const messages: Message[] = [...aggPrompt, ...this._memory.messages, userMessage]
    const stream = await this.streamChat(messages)
    this._memory.add(userMessage);
    return stream
  }


  //region MEMORY
  public saveMemory(){
    return this._brain.memory.createSnapshot()
  }

  public async loadMemory({messages, conversationPrompt}:{messages:BaseMemoryMessage[], conversationPrompt:string}){
    this.conversationPrompt = conversationPrompt
    await this._brain.memory.loadSnapshot(messages)
  }
  //endregion
}
