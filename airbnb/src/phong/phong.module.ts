import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { SharedModule } from 'src/shared/sharedModule';

@Module({
  controllers: [PhongController],
  providers: [PhongService],
  imports: [SharedModule]

})
export class PhongModule {}
