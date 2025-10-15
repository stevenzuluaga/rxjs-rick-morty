import { Controller, Get, Query } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { FilterCharacterDto } from './dto/filter-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  findAll(@Query() pagination: FilterCharacterDto) {
    return this.charactersService.findAll(pagination);
  }
}
