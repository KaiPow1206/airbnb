import { Module } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { BinhLuanController } from './binh-luan.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';

@Module({
  controllers: [BinhLuanController],
  providers: [BinhLuanService,JwtStrategy],
})
export class BinhLuanModule {}
