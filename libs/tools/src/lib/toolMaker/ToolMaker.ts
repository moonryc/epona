import { Tool } from 'ollama';
import { ToolMakerParams } from './types';

export default class ToolMaker {

  private readonly toolDefinition: ToolMakerParams["toolDefinition"];
  public readonly toolFunction: ToolMakerParams["toolFunction"];

  constructor(input:ToolMakerParams) {
    this.toolDefinition = input.toolDefinition;
    this.toolFunction = input.toolFunction;
  }

  get toolName(){
    return this.toolDefinition.name;
  }

  get toolInfo():Tool{
    return { type:"function", function:{ ...this.toolDefinition, } }
  }

}
