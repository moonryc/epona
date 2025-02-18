import { OllamaClientProps, OllamaModels, UnconstrainedMemory } from '@epona/ollama';
import { addTwoNumberTool, ToolMaker } from '@epona/tools';
import EponaEmotions from './EponaEmotions';
import { Options as ChatModelOptions } from 'ollama';

export default class EponaBrain implements OllamaClientProps {
  //Keeps context until you save the model
  public keepAlive = true as const;
  public host = 'http://127.0.0.1:11434'
  public model = OllamaModels.llama_3p2
  //Memory of the current coversation
  public memory: UnconstrainedMemory = new UnconstrainedMemory();
  public tools: ToolMaker[] = []//[addTwoNumberTool];
  public emotions: EponaEmotions = new EponaEmotions(this.memory);

  public conversationalOptions:ChatModelOptions | undefined;
}
