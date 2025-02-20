import { OllamaClient, UserMessage } from '@epona/ollama';
import EponaBrain from './EponaBrain';
import { AbortableAsyncIterator, ChatResponse, Message } from 'ollama';

function tee(iterable: AbortableAsyncIterator<ChatResponse>) {
  // @ts-ignore
  const source = iterable[Symbol.iterator]();
  const buffers = [[], []]; // substitute in queue type for efficiency
  const DONE = Object.create(null);

  const next = (i:unknown) => {
    // @ts-ignore
    if (buffers[i].length !== 0) {
      // @ts-ignore
      return buffers[i].shift();
    }

    const x = source.next();

    if (x.done) {
      return DONE;
    }

    // @ts-ignore
    buffers[1 - i].push(x.value);
    return x.value;
  };

  return buffers.map(function* (_, i) {
    for (;;) {
      const x = next(i);

      if (x === DONE) {
        break;
      }

      yield x;
    }
  });
}

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
    const userMessage = new UserMessage(message)
    const messages: Message[] = [...this._memory.messagesWithPrompt, userMessage]
    const stream = await this.streamChat(messages)
    this._memory.add(userMessage);
    // const [a,b] = tee(stream)
    // void super.saveStreamToMemory(b as unknown as  typeof stream);
    return stream
  }


  //region MEMORY
  public async saveMemory(){
    const memorySnapshot = await this._brain.memory.createSnapshot()
    console.log(memorySnapshot)
  }

  public async loadMemory(){
    // await this.brain.memory.loadSnapshot()
  }
  //endregion
}
