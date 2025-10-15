import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CharacterPagination } from 'src/interfaces/mapped-character.interface';
import { CharactersService } from './characters.service';
import { FilterCharacterDto } from './dto/filter-character.dto';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  findAll(
    @Query() pagination: FilterCharacterDto,
  ): Observable<CharacterPagination> {
    return this.charactersService.findAll(pagination);
  }
}
