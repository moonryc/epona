import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SuccessResponse } from '../Responses';
import { EponaService } from './epona.service';
import { SaveMemoryInput } from './epona.input';

@Resolver(() => SuccessResponse)
export class EponaResolver {
  constructor(private readonly eponaService: EponaService) {}

  @Mutation(() => SuccessResponse)
  async saveMemory(@Args('input') input: SaveMemoryInput){
    return this.eponaService.saveMemory(input);
  }

  @Mutation(() => SuccessResponse)
  async loadMemory(){
    return this.eponaService.loadMemory();
  }
}
