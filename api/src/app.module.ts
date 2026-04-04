import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { WisataModule } from './wisata/wisata.module';

@Module({
  imports: [PrismaModule, WisataModule],
})
export class AppModule {}
