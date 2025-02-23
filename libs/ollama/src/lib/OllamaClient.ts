import { OllamaTools, ToolMaker } from '@epona/tools';
import {
  Options as ChatModelOptions,
  ChatResponse,
  Message,
  Ollama,
  ToolCall
} from 'ollama';
import BaseMemory from './memory/BaseMemory';
import { AssistantMessage } from './messages';
import { OllamaModels } from './models';
import OllamaConnection from './ollamaConnection';

export type OllamaClientProps = {
  host: string;
  model: OllamaModels;
  memory: BaseMemory;
  tools?: ToolMaker[];
  keepAlive?: number | true;
  chatModelOptions?: ChatModelOptions;
};

export default class OllamaClient {
  protected _client: Ollama;
  protected _ollamaTools: OllamaTools;
  protected _memory: OllamaClientProps["memory"];
  protected _model: OllamaClientProps["model"];
  private _unparsedKeepAlive: OllamaClientProps["keepAlive"];
  private _chatModelOptions: OllamaClientProps["chatModelOptions"];

  constructor({host,model, memory, tools, keepAlive, chatModelOptions}:OllamaClientProps) {
    this._memory = memory
    this._client = OllamaConnection(host)
    this._model = model;
    this._ollamaTools = new OllamaTools(tools ? tools : [])
    this._unparsedKeepAlive = keepAlive
    this._chatModelOptions = chatModelOptions
  }

  private get parsedKeepAlive(): number | string | undefined {
    if(!this._unparsedKeepAlive) {
      return undefined
    }
    if(this._unparsedKeepAlive === true){
      return -1
    }
    return this._unparsedKeepAlive
  }

  protected async chat(messages: Message[]) {
    return this._client.chat({
      model: this._model,
      tools: this._ollamaTools.definitions,
      keep_alive: this.parsedKeepAlive,
      messages,
      options: this._chatModelOptions,
    });
  }

  protected async streamChat(messages: Message[]) {
    return this._client.chat({
      model: this._model,
      tools: this._ollamaTools.definitions,
      stream: true,
      keep_alive: this.parsedKeepAlive,
      messages,
      options: this._chatModelOptions,
    });
  }

  async runTools({response,toolCalls}:{response:ChatResponse,toolCalls:ToolCall[]}) {
    const messages: Message[] = [];

    // Process tool calls from the response
    for (const tool of toolCalls) {
      const functionToCall = this._ollamaTools.getFunctionByFunctionName(tool.function.name);
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

  /**
   * Use this Post streamChat
   */
  public saveResponseToMemory(aiMessage:string){
    this._memory.add(new AssistantMessage({content:aiMessage}))
  }

  // async converse(input: OllamaChatParams) {
  //   const userMessage = new UserMessage(input.message)
  //   const messages: Message[] = [...this.memory.messagesWithPrompt, userMessage]
  //   const response = await this.chat(messages);
  //
  //   // if (response.message.tool_calls) {
  //   //   const toolMessages =  await this.runTools({ response, toolCalls: response.message.tool_calls });
  //   //   return this.chat(toolMessages);
  //   // }
  //
  //   this.memory.add(userMessage);
  //   this.memory.add(new AssistantMessage(response.message.content));
  //   return response;
  // }

}
