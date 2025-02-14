import { OllamaClient, OllammaModels } from '@epona/ollama';
import { EponaChatParams } from './types';
import eponaTools, { ToolOrganizer } from './eponaTools';
import { ChatResponse, Message, ToolCall } from 'ollama';

export default class EponaClient {
  private readonly ollamaClient = OllamaClient;
  private readonly baseModel = OllammaModels.llama_3p2;
  private readonly tools: ToolOrganizer = eponaTools;

  private async chat(messages: Message[]) {
    return this.ollamaClient.chat({
      model: this.baseModel,
      tools: this.tools.definitions,
      messages,
    });
  }

  async runTools({response,toolCalls}:{response:ChatResponse,toolCalls:ToolCall[]}) {
    const messages: Message[] = [];

    // Process tool calls from the response
    for (const tool of toolCalls) {
      const functionToCall = this.tools.getFunctionByFunctionName(tool.function.name);
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

  async converse(input: EponaChatParams) {
    const response = await this.chat([
        {
          role: 'user',
          content: input?.message,
          images: input?.images,
        },
      ],
    );

    if (response.message.tool_calls) {
      const toolMessages =  await this.runTools({ response, toolCalls: response.message.tool_calls });
      return this.chat(toolMessages);
    }
    return response;
  }
}
