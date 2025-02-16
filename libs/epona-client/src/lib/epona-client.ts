import { OllamaClient, OllammaModels } from '@epona/ollama';
import { Message } from 'ollama';
import * as fs from 'node:fs';
import { AnyTool } from 'bee-agent-framework/tools/base';
import { UnconstrainedMemory } from 'bee-agent-framework/memory/unconstrainedMemory';
import { BeeAgent } from 'bee-agent-framework/agents/bee/agent';

export default class EponaClient {
  private readonly model = OllammaModels.llama_3p2;
  private readonly llm = OllamaClient(this.model);
  private readonly tools: AnyTool[] = [];
  private memory = new UnconstrainedMemory();
  private agent: BeeAgent;

  private memoryFileName = 'eponaMemory.json';

  constructor() {
    this.agent = new BeeAgent({
      llm: this.llm,
      memory: this.memory,
      tools: this.tools,
    });
  }

  public saveMemory() {
    try {
      const serializedMemory = this.memory.createSnapshot();
      fs.writeFileSync(this.memoryFileName, JSON.stringify(serializedMemory));
      return {
        success: true,
        message: "Epona's Memory has been saved successfully.",
      };
    } catch (error) {
      return {
        success: true,
        message: "An ERROR occured saving Epona's Memory",
      };
    }
  }

  private loadMemory() {
    try {
      const eponasSavedMemory = fs.readFileSync(this.memoryFileName, 'utf-8');
      const serializedMemory = JSON.parse(eponasSavedMemory);
      this.memory.loadSnapshot(serializedMemory);
      return {
        success: true,
        message: "Epona's Memory has been loaded successfully.",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "An ERROR occurred loading Epona's Memory",
      };
    }
  }

  private async chat(messages: Message[]) {
    // return this.ollamaClient.chat({
    //   model: this.baseModel,
    //   tools: this.tools.definitions,
    //   messages,
    // });
  }

  // private async streamChat(messages: Message[]) {
  //   const a = await this.ollamaClient.chat({
  //     model: this.baseModel,
  //     tools: this.tools.definitions,
  //     messages,
  //     stream:true
  //   });
  // }

  // async runTools({response,toolCalls}:{response:ChatResponse,toolCalls:ToolCall[]}) {
  //   const messages: Message[] = [];
  //
  //   // Process tool calls from the response
  //   for (const tool of toolCalls) {
  //     const functionToCall = this.tools.getFunctionByFunctionName(tool.function.name);
  //     if (functionToCall) {
  //       console.log('Epona is calling function:', tool.function.name,' Arguments:', tool.function.arguments);
  //       console.log();
  //       const output:string = functionToCall(tool.function.arguments);
  //       console.log('Function output:', output);
  //
  //       // Add the function response to messages for the model to use
  //       messages.push(response.message);
  //       messages.push({
  //         role: 'tool',
  //         content: output,
  //       });
  //     } else {
  //       console.log('Function', tool.function.name, 'not found');
  //     }
  //   }
  //   return messages;
  // }

  // async converse(input: EponaChatParams) {
  //   const response = await this.chat([
  //       {
  //         role: 'user',
  //         content: input?.message,
  //         images: input?.images,
  //       },
  //     ],
  //   );
  //
  //   return response;
  //   // if (response.message.tool_calls) {
  //   //   const toolMessages =  await this.runTools({ response, toolCalls: response.message.tool_calls });
  //   //   return this.chat(toolMessages);
  //   // }
  //   // return response;
  // }
}
