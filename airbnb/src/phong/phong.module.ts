import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';

@Module({
  controllers: [PhongController],
  providers: [PhongService],
})
export class PhongModule {}
