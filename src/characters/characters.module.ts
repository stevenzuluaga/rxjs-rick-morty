import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

@Module({
  controllers: [CharactersController],
  imports: [HttpModule],
  providers: [CharactersService],
})
export class CharactersModule {}
