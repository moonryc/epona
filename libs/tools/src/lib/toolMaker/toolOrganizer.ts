import ToolMaker from './toolMaker';
import { ToolMakerParams } from './types';

export default class ToolOrganizer {
  private readonly toolMakerTools: ToolMaker[];
  constructor(tools:ToolMaker[]){
    this.toolMakerTools = tools;
  }

  get toolDictionary(){
    const toolMap = new Map()
    this.toolMakerTools.forEach(toolMaker => {
      toolMap.set(toolMaker.toolName, toolMaker.toolFunction);
    });
    return toolMap;
  }

  get definitions(){
    return this.toolMakerTools.map(tool => tool.toolInfo);
  }

  getFunctionByFunctionName(funcName:string):ToolMakerParams["toolFunction"]{
    return this.toolDictionary.get(funcName)
  }
}
