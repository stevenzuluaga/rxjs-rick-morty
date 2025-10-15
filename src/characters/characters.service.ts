import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { Observable, throwError, timer } from 'rxjs';
import {
  catchError,
  map,
  retry,
  shareReplay,
  tap,
  timeout,
} from 'rxjs/operators';
import { CharactersResponse } from 'src/interfaces/character.interface';
import { CharacterPagination } from 'src/interfaces/mapped-character.interface';
import { mapAxiosErrorToMessage } from 'src/utils/error';
import { FilterCharacterDto } from './dto/filter-character.dto';

@Injectable()
export class CharactersService {
  private readonly logger = new Logger(CharactersService.name);
  private readonly url = 'https://rickandmortyapi.com/api/characters/';
  private readonly httpService: HttpService;
  private readonly REQUEST_TIMEOUT = 10000; // 10 segundos
  private readonly MAX_RETRIES = 3;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  /**
   * Busca todos los personajes con paginación y filtros
   * Retorna un Observable en lugar de Promise para mejor composición
   */
  findAll(pagination: FilterCharacterDto): Observable<CharacterPagination> {
    const { page = 1, count: limit = 20, ...filters } = pagination;

    // Construir parámetros de consulta
    const params = {
      page: page.toString(),
      ...filters,
    };

    this.logger.log(
      `Fetching characters with params: ${JSON.stringify(params)}`,
    );

    return this.httpService
      .get<CharactersResponse>(`${this.url}`, { params })
      .pipe(
        // Agregar timeout para prevenir solicitudes colgadas
        timeout(this.REQUEST_TIMEOUT),

        // Registrar la respuesta para depuración
        tap((response) =>
          this.logger.debug(
            `Successfully fetched ${response.data.results.length} characters`,
          ),
        ),

        // Transformar los datos de respuesta
        map((response) => this.mapToCharacterPagination(response.data)),

        // Agregar lógica de reintento para solicitudes fallidas
        retry({
          count: this.MAX_RETRIES,
          delay: (error, retryIndex) => {
            this.logger.warn(
              `Request failed, retrying (${retryIndex}/${this.MAX_RETRIES}): ${error.message}`,
            );
            // Backoff exponencial: 1s, 2s, 4s
            return timer(Math.pow(2, retryIndex - 1) * 1000);
          },
        }),

        // Compartir el resultado para evitar múltiples llamadas HTTP para la misma solicitud
        shareReplay(1),

        // Manejo de errores mejorado
        catchError((error: AxiosError) => {
          this.logger.error(
            `Failed to fetch characters: ${error.message}`,
            error.stack,
          );
          mapAxiosErrorToMessage(error);
          return throwError(
            () => new Error(`Failed to fetch characters: ${error.message}`),
          );
        }),
      );
  }

  private mapToCharacterPagination(
    data: CharactersResponse,
  ): CharacterPagination {
    const { info, results } = data;

    // Mapear personajes a formato simplificado
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
