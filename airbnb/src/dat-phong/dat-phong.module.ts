import { Module } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { DatPhongController } from './dat-phong.controller';

@Module({
  controllers: [DatPhongController],
  providers: [DatPhongService],
})
export class DatPhongModule {}
