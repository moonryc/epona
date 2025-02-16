import { Ollama } from 'ollama';
import { OllamaChatModel } from "bee-agent-framework/adapters/ollama/backend/chat";
import { OllammaModels } from './models';

const OLLAMA_SERVER = 'http://10.1.2.38:11434';

export default (model:OllammaModels)=> {
  return new OllamaChatModel({
    modelId: model,
    client: new Ollama({
      host: OLLAMA_SERVER,
      // fetch: noTimeoutFetch
    }),
  });
}

