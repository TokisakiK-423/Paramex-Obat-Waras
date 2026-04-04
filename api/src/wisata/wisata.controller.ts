import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { WisataService } from './wisata.service';
import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata.dto';

@Controller('wisata')
export class WisataController {
  constructor(private readonly wisataService: WisataService) {}

  @Post()
  create(@Body() body: CreateWisataDto) {
    return this.wisataService.create(body);
  }

  @Get()
  findAll() {
    return this.wisataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wisataService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateWisataDto) {
    return this.wisataService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wisataService.remove(+id);
  }
}
