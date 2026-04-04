import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    if (!username || !password) {
      throw new BadRequestException('username dan password wajib diisi');
    }

    const admin = await this.prisma.admin.findUnique({
      where: { username },
    });

    if (!admin || admin.password !== password) {
      throw new UnauthorizedException('Username atau password salah');
    }

    const payload = { sub: admin.id, username: admin.username };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login berhasil',
      access_token: token,
      admin: {
        id: admin.id,
        username: admin.username,
      },
    };
  }
}