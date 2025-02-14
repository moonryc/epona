import {Message} from 'ollama';

export type EponaChatParams = {
  message: string;
  images?: Message["images"];
}
