import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BinhLuanModule } from './binh-luan/binh-luan.module';
import { DatPhongModule } from './dat-phong/dat-phong.module';
import { NguoiDungModule } from './nguoi-dung/nguoi-dung.module';
import { PhongModule } from './phong/phong.module';
import { ViTriModule } from './vi-tri/vi-tri.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    AuthModule,
    BinhLuanModule, 
    DatPhongModule, 
    NguoiDungModule, 
    PhongModule, 
    ViTriModule],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
