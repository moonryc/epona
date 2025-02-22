import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SuccessResponse } from '../Responses';
import { LoadEponaMemoryInput, SaveEponaMemoryInput } from './epona.input';
import { EponaService } from './epona.service';

@Resolver(() => SuccessResponse)
export class EponaResolver {
  constructor(private readonly eponaService: EponaService) {}

  @Mutation(() => SuccessResponse)
  async saveEponaMemory(@Args('input') input: SaveEponaMemoryInput){
    return this.eponaService.saveEponaMemory(input);
  }

  @Mutation(() => SuccessResponse)
  async loadEponaMemory(@Args('input') input: LoadEponaMemoryInput){
    return this.eponaService.loadEponaMemory(input);
  }
}
