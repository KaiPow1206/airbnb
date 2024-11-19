import { Module } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungController } from './nguoi-dung.controller';
import { SharedModule } from 'src/shared/sharedModule';

@Module({
  controllers: [NguoiDungController],
  providers: [NguoiDungService],
  imports: [SharedModule]
})
export class NguoiDungModule {}
