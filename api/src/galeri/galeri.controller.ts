import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GaleriService } from './galeri.service';
import { CreateGaleriDto } from './dto/create-galeri.dto';
import { UpdateGaleriDto } from './dto/update-galeri.dto';

@Controller('galeri')
export class GaleriController {
  constructor(private readonly galeriService: GaleriService) {}

  @Post()
  create(@Body() createGaleriDto: CreateGaleriDto) {
    return this.galeriService.create(createGaleriDto);
  }

  @Get()
  findAll() {
    return this.galeriService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galeriService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGaleriDto: UpdateGaleriDto) {
    return this.galeriService.update(+id, updateGaleriDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galeriService.remove(+id);
  }
}
