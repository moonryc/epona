import { Tool } from 'ollama';

type ToolDefinition = Omit<Tool["function"], "parameters"> & {
  parameters: {
    type:'object',
    required: Tool["function"]["parameters"]["required"],
    properties: Tool["function"]["parameters"]["properties"]
  }
}
type ToolFunction = (input: Record<string, unknown>)=> string;

export type ToolMakerParams = {
  toolDefinition: ToolDefinition;
  toolFunction: ToolFunction;
}

