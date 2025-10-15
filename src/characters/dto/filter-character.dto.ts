import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Gender, Status } from 'src/interfaces/character.interface';
import { PaginationDto } from './pagination.dto';

export class FilterCharacterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  @IsEnum(Status, {
    message: `Status must be ${Object.values(Status).join(', ')}`,
  })
  status?: Status;

  @IsOptional()
  @IsString()
  species?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  @IsEnum(Gender, {
    message: `Gender must be ${Object.values(Gender).join(', ')}`,
  })
  gender?: Gender;
}
