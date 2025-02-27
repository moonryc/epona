import {
  AssistantMessage,
  BaseMemoryMessage,
  OllamaClient,
  SystemMessage,
  UserMessage,
} from '@epona/ollama';
import { AbortableAsyncIterator, ChatResponse, Message } from 'ollama';
import EponaBrain from './EponaBrain';

export default class EponaClient extends OllamaClient {
  private readonly _brain: EponaBrain;
  private conversationPrompt: string;
  private interrupted = false;

  constructor() {
    const eponaBrain = new EponaBrain();
    super(eponaBrain);
    this._brain = eponaBrain;
  }

  get currentEmotion() {
    return this._brain.emotions.currentEmotion;
  }

  public toggleInterrupted() {
    this.interrupted = true;
  }

  async chatStream({
    message,
    streamCallback,
  }: {
    message: string;
    streamCallback: (
      stream: AbortableAsyncIterator<ChatResponse>
    ) => Promise<string>;
  }) {
    const userMessage = new UserMessage({ content: message });
    const aggPrompt = [this._brain.prompt];
    if (this.conversationPrompt)
      aggPrompt.push(new SystemMessage({ content: this.conversationPrompt }));
    const messages: Message[] = [
      ...aggPrompt,
      ...this._memory.messages,
      userMessage,
    ];
    const stream = await this.streamChat(messages);
    const assistantResponse = await streamCallback(stream);
    this._memory.add(userMessage);
    this._memory.add(new AssistantMessage({ content: assistantResponse }));
    this.interrupted = false;
  }

  //region MEMORY
  public saveMemory() {
    return this._brain.memory.createSnapshot();
  }

  public async loadMemory({
    messages,
    conversationPrompt,
  }: {
    messages: BaseMemoryMessage[];
    conversationPrompt: string;
  }) {
    this.conversationPrompt = conversationPrompt;
    await this._brain.memory.loadSnapshot(messages);
  }
  //endregion
}
