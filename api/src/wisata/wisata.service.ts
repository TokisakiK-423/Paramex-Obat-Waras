import { Injectable } from '@nestjs/common';
import { CreateWisataDto } from './dto/create-wisata.dto';
import { UpdateWisataDto } from './dto/update-wisata.dto';

type Wisata = {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  lokasi: string;
  created_at: Date;
};

@Injectable()
export class WisataService {
  private wisata: Wisata[] = [];

  // 🔥 NORMALIZE FINAL (ANTI SPASI ANEH)
  private normalize(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '');
  }

  // ================= CREATE =================
  create(data: CreateWisataDto) {
    if (!data.nama || !data.lokasi) {
      return { status: false, message: 'Nama dan lokasi wajib diisi' };
    }

    if (data.harga <= 0) {
      return { status: false, message: 'Harga tidak valid' };
    }

    const namaBaru = this.normalize(data.nama);
    const lokasiBaru = this.normalize(data.lokasi);

    const exist = this.wisata.find(
      (w) =>
        this.normalize(w.nama) === namaBaru &&
        this.normalize(w.lokasi) === lokasiBaru,
    );

    if (exist) {
      return { status: false, message: 'Data sudah ada' };
    }

    this.wisata.push({
      id: this.wisata.length + 1,
      nama: data.nama.trim(),
      deskripsi: data.deskripsi,
      harga: data.harga,
      lokasi: data.lokasi.trim(),
      created_at: new Date(),
    });

    return { status: true, message: 'Wisata berhasil ditambahkan' };
  }

  // ================= GET ALL =================
  findAll() {
    return {
      status: true,
      message: 'Data wisata berhasil diambil',
      total: this.wisata.length,
      data: this.wisata,
    };
  }

  // ================= GET ONE =================
  findOne(id: number) {
    const item = this.wisata.find((w) => w.id === id);

    if (!item) {
      return { status: false, message: 'Wisata tidak ditemukan' };
    }

    return {
      status: true,
      message: 'Detail wisata ditemukan',
      data: item,
    };
  }

  // ================= UPDATE =================
  update(id: number, data: UpdateWisataDto) {
    const index = this.wisata.findIndex((w) => w.id === id);

    if (index === -1) {
      return { status: false, message: 'Wisata tidak ditemukan' };
    }

    const current = this.wisata[index];

    const nama = data.nama ?? current.nama;
    const lokasi = data.lokasi ?? current.lokasi;
    const harga = data.harga ?? current.harga;

    if (!nama || !lokasi) {
      return { status: false, message: 'Nama dan lokasi wajib diisi' };
    }

    if (harga <= 0) {
      return { status: false, message: 'Harga tidak valid' };
    }

    // 🔥 normalize dulu
    const namaBaru = this.normalize(nama);
    const lokasiBaru = this.normalize(lokasi);

    // 🔥 blok manipulasi nama (INI YANG KAMU MAU)
    if (this.normalize(current.nama) === namaBaru && current.nama !== nama) {
      return {
        status: false,
        message: 'Nama tidak boleh dimodifikasi aneh',
      };
    }

    // 🔥 cek duplikat antar data
    const duplicate = this.wisata.find((w, i) => {
      if (i === index) return false;

      return (
        this.normalize(w.nama) === namaBaru &&
        this.normalize(w.lokasi) === lokasiBaru
      );
    });

    if (duplicate) {
      return {
        status: false,
        message: 'Update gagal, data duplikat',
      };
    }

    this.wisata[index] = {
      ...current,
      ...data,
      nama,
      lokasi,
      harga,
    };

    return {
      status: true,
      message: 'Wisata berhasil diupdate',
    };
  }

  // ================= DELETE =================
  remove(id: number) {
    const index = this.wisata.findIndex((w) => w.id === id);

    if (index === -1) {
      return { status: false, message: 'Wisata tidak ditemukan' };
    }

    this.wisata.splice(index, 1);

    return {
      status: true,
      message: 'Wisata berhasil dihapus',
    };
  }
}
