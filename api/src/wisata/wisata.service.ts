import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WisataService {
  constructor(private prisma: PrismaService) {}

  mapWisata(w: any) {
    return {
      id: w.id,
      nama: w.nama,
      deskripsi: w.deskripsi,
      lokasi: w.lokasi,
      latitude: w.latitude,
      longitude: w.longitude,
      jamBuka: w.jamBuka,
      hargaTiket: w.hargaTiket,
      createdAt: w.createdAt,
      updatedAt: w.updatedAt,
      galeri: w.galeri,
      reviews: w.reviews,
      bookings: w.bookings,
      totalReview: w.reviews?.length || 0,
      rataRataRating:
        w.reviews?.length > 0
          ? Number(
              (w.reviews.reduce((sum: number, r: any) => sum + r.rating, 0) /
                w.reviews.length).toFixed(1),
            )
          : 0,
    };
  }

  async create(data: any) {
    const wisata = await this.prisma.wisata.create({ data });
    return this.mapWisata(wisata);
  }

  async findAll() {
    const data = await this.prisma.wisata.findMany({
      include: { galeri: true, reviews: true, bookings: true },
      orderBy: { id: 'desc' },
    });
    return data.map((w) => this.mapWisata(w));
  }

  async findOne(id: number) {
    const wisata = await this.prisma.wisata.findUnique({
      where: { id },
      include: { galeri: true, reviews: true, bookings: true },
    });
    if (!wisata) throw new NotFoundException('Wisata tidak ditemukan');
    return this.mapWisata(wisata);
  }
}
