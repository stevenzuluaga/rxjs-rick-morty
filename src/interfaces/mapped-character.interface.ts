import { Gender, PaginationInfo } from './character.interface';

export interface CharacterPagination {
  info: PaginationInfo;
  results: SimplifiedCharacter[];
}

export interface SimplifiedCharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  image: string;
  gender: Gender;
}
