import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ChatDto } from './epona.input';
import { EponaService } from './epona.service';
import { Response } from 'express';
import { SuccessResponse } from '../Responses';

@Controller('/epona')
export class EponaController {
  constructor(private readonly eponaService: EponaService) {}

  @Post("/streamChat")
  streamChat(@Body() body: ChatDto, @Res()res: Response){
    try{
      return this.eponaService.chat(body,res)
    }catch(error){
      console.error(error)
      return new SuccessResponse({success: false, message: "Error in streamChat, is OLLAMA running?"})
    }
  }
}
