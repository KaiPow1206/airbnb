import { Module } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { ViTriController } from './vi-tri.controller';
import { SharedModule } from 'src/shared/sharedModule';

@Module({
  imports: [SharedModule],
  controllers: [ViTriController],
  providers: [ViTriService]
})
export class ViTriModule {}
