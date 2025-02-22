import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ChatDto } from './epona.input';
import { EponaService } from './epona.service';
import { Response } from 'express';

@Controller('/epona')
export class EponaController {
  constructor(private readonly eponaService: EponaService) {}

  @Post("/streamChat")
  steamChat(@Body() body: ChatDto, @Res()res: Response){
    try{
      return this.eponaService.chat(body,res)
    }catch(error){
      //@ts-ignore
      return new SuccessResponse({success: false, message: error!.message as unknown as string})
    }
  }
}
