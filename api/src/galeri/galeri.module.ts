import { Module } from '@nestjs/common';
import { GaleriService } from './galeri.service';
import { GaleriController } from './galeri.controller';

@Module({
  controllers: [GaleriController],
  providers: [GaleriService],
})
export class GaleriModule {}
