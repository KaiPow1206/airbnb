import { Module } from '@nestjs/common';
import { PhongService } from './phong.service';
import { PhongController } from './phong.controller';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { SharedModule } from 'src/shared/sharedModule';

@Module({
  imports: [SharedModule],
  controllers: [PhongController],
  providers: [PhongService,JwtStrategy]
})
export class PhongModule {}
