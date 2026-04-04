import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata.dto';

@Injectable()
export class WisataService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateWisataDto) {
    return this.prisma.wisata.create({ data });
  }

  findAll() {
    return this.prisma.wisata.findMany({
      include: { galeri: true, reviews: true, bookings: true },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const wisata = await this.prisma.wisata.findUnique({
      where: { id },
      include: { galeri: true, reviews: true, bookings: true },
    });

    if (!wisata) throw new NotFoundException('Wisata tidak ditemukan');
    return wisata;
  }

  async update(id: number, data: UpdateWisataDto) {
    await this.findOne(id);
    return this.prisma.wisata.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.wisata.delete({ where: { id } });
  }
}
