import { Injectable } from '@nestjs/common';
import { CreateGaleriDto } from './dto/create-galeri.dto';
import { UpdateGaleriDto } from './dto/update-galeri.dto';

@Injectable()
export class GaleriService {
  create(createGaleriDto: CreateGaleriDto) {
    return 'This action adds a new galeri';
  }

  findAll() {
    return `This action returns all galeri`;
  }

  findOne(id: number) {
    return `This action returns a #${id} galeri`;
  }

  update(id: number, updateGaleriDto: UpdateGaleriDto) {
    return `This action updates a #${id} galeri`;
  }

  remove(id: number) {
    return `This action removes a #${id} galeri`;
  }
}
