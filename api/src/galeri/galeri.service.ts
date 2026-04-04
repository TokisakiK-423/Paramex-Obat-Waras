import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGaleriDto } from './dto/create-galeri.dto';

@Injectable()
export class GaleriService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateGaleriDto) {
    return this.prisma.galeri.create({ data });
  }

  findAll() {
    return this.prisma.galeri.findMany({
      include: { wisata: true },
      orderBy: { id: 'desc' },
    });
  }

  async remove(id: number) {
    const data = await this.prisma.galeri.findUnique({ where: { id } });
    if (!data) throw new NotFoundException('Galeri tidak ditemukan');
    return this.prisma.galeri.delete({ where: { id } });
  }
}
