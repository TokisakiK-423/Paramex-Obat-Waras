import { Module } from '@nestjs/common';
import { GaleriController } from './galeri.controller';
import { GaleriService } from './galeri.service';

@Module({
  controllers: [GaleriController],
  providers: [GaleriService],
})
export class GaleriModule {}
