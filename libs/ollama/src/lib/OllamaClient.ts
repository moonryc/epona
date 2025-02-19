import BaseMemory from './memory/BaseMemory';
import OllamaConnection from './ollamaConnection';
import { AbortableAsyncIterator, ChatResponse, Message, Ollama, ToolCall } from 'ollama';
import { OllamaModels } from './models';
import { OllamaTools, ToolMaker } from '@epona/tools';
import { OllamaChatParams } from './types';
import { Options as ChatModelOptions } from 'ollama';
import { AssistantMessage, UserMessage } from './messages';
import { PassThrough } from 'stream';

export type OllamaClientProps = {
  host: string
  model: OllamaModels
  memory: BaseMemory
  tools?: ToolMaker[]
  keepAlive?: number | true
  chatModelOptions?: ChatModelOptions;
}

export default class OllamaClient {
  protected client: Ollama;
  protected ollamaTools: OllamaTools;
  protected memory: OllamaClientProps["memory"];
  protected model: OllamaClientProps["model"];
  private unparsedKeepAlive: OllamaClientProps["keepAlive"];
  private chatModelOptions: OllamaClientProps["chatModelOptions"];

  constructor({host,model, memory, tools, keepAlive, chatModelOptions}:OllamaClientProps) {
    this.memory = memory
    this.client = OllamaConnection(host)
    this.model = model;
    this.ollamaTools = new OllamaTools(tools ? tools : [])
    this.unparsedKeepAlive = keepAlive
    this.chatModelOptions = chatModelOptions
  }

  private get parsedKeepAlive(): number | string | undefined {
    if(!this.unparsedKeepAlive) {
      return undefined
    }
    if(this.unparsedKeepAlive === true){
      return -1
    }
    return this.unparsedKeepAlive
  }

  protected async chat(messages: Message[]) {
    return this.client.chat({
      model: this.model,
      tools: this.ollamaTools.definitions,
      keep_alive: this.parsedKeepAlive,
      messages,
      options: this.chatModelOptions,
    });
  }

  protected async streamChat(messages: Message[]) {
    return this.client.chat({
      model: this.model,
      tools: this.ollamaTools.definitions,
      stream: true,
      keep_alive: this.parsedKeepAlive,
      messages,
      options: this.chatModelOptions,
    });
  }

  async runTools({response,toolCalls}:{response:ChatResponse,toolCalls:ToolCall[]}) {
    const messages: Message[] = [];

    // Process tool calls from the response
    for (const tool of toolCalls) {
      const functionToCall = this.ollamaTools.getFunctionByFunctionName(tool.function.name);
      if (functionToCall) {
        console.log('Epona is calling function:', tool.function.name,' Arguments:', tool.function.arguments);
        console.log();
        const output:string = functionToCall(tool.function.arguments);
        console.log('Function output:', output);

        // Add the function response to messages for the model to use
        messages.push(response.message);
        messages.push({
          role: 'tool',
          content: output,
        });
      } else {
        console.log('Function', tool.function.name, 'not found');
      }
    }
    return messages;
  }

  async converse(input: OllamaChatParams) {
    const userMessage = new UserMessage(input.message)
    const messages: Message[] = [...this.memory.messagesWithPrompt, userMessage]
    const response = await this.chat(messages);

    // if (response.message.tool_calls) {
    //   const toolMessages =  await this.runTools({ response, toolCalls: response.message.tool_calls });
    //   return this.chat(toolMessages);
    // }

    this.memory.add(userMessage);
    this.memory.add(new AssistantMessage(response.message.content));
    return response;
  }

  async saveStreamToMemory(stream: AbortableAsyncIterator<ChatResponse>) {
    let response = ''
    for await (const ch of stream) {
      response += ch.message.content;
    }
    const newAIMessage = new AssistantMessage(response)
    this.memory.add(newAIMessage);
  }

  async streamConverse(input: OllamaChatParams) {
    const userMessage = new UserMessage(input.message)
    const messages: Message[] = [...this.memory.messagesWithPrompt, userMessage]
    this.memory.add(userMessage);
    const stream = await this.streamChat(messages)
    //@ts-ignore
    void this.saveStreamToMemory(stream);
    //@ts-ignore
    return stream as typeof stream;
  }

}
