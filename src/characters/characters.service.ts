import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { firstValueFrom, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CharactersResponse } from 'src/interfaces/character.interface';
import { CharacterPagination } from 'src/interfaces/mapped-character.interface';
import { mapAxiosErrorToMessage } from 'src/utils/error';
import { FilterCharacterDto } from './dto/filter-character.dto';

@Injectable()
export class CharactersService {
  private readonly url = 'https://rickandmortyapi.com/api/character/';
  constructor(private readonly httpService: HttpService) {}

  async findAll(pagination: FilterCharacterDto): Promise<CharacterPagination> {
    const { page, count: limit, ...filters } = pagination;
    const response = await firstValueFrom(
      this.httpService
        .get<CharactersResponse>(`${this.url}?page=${page}&limit=${limit}`, {
          params: filters,
        })
        .pipe(
          map((response) => this.mapToCharacterPagination(response.data)),
          catchError((error: AxiosError) => {
            mapAxiosErrorToMessage(error);
            return throwError(() => error);
          }),
        ),
    );
    return response;
  }

  private mapToCharacterPagination(
    data: CharactersResponse,
  ): CharacterPagination {
    const { info, results } = data;
    const characters = results.map(
      ({ id, name, status, species, type, image, gender }) => ({
        id,
        name,
        status,
        species,
        type,
        image,
        gender,
      }),
    );
    return { info, results: characters };
  }
}
