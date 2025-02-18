import { Body, Controller, Post } from '@nestjs/common';
import { ChatDto } from './epona.input';
import { EponaService } from './epona.service';

@Controller('/epona')
export class EponaController {
  constructor(private readonly eponaService: EponaService) {}

  @Post("/chat")
  chat(@Body() body: ChatDto) {
    return this.eponaService.chat(body);
  }
}
