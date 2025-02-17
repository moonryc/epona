import {Message} from 'ollama';

export type OllamaChatParams = {
  message: string;
  images?: Message["images"];
}
