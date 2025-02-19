import {
  OllamaClientProps,
  OllamaModels,
  UnconstrainedMemory,
} from '@epona/ollama';
import { ToolMaker } from '@epona/tools';
import EponaEmotions from './EponaEmotions';
import { Options as ChatModelOptions } from 'ollama';
import EponaPrompt from './EponaPrompt';

export default class EponaBrain implements OllamaClientProps {
  //Keeps context until you save the model
  public keepAlive = true as const;
  public host = 'http://127.0.0.1:11434';
  public model = OllamaModels.llama_3p2;
  //Memory of the current coversation
  public prompt = EponaPrompt;
  public memory: UnconstrainedMemory = new UnconstrainedMemory(this.prompt);
  public tools: ToolMaker[] = []; //[addTwoNumberTool];
  public emotions: EponaEmotions = new EponaEmotions(this.memory);

  public conversationalOptions: ChatModelOptions | undefined;
}
