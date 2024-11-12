import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';

@Controller('dat-phong')
export class DatPhongController {
  constructor(private readonly datPhongService: DatPhongService) {}

  @Post()
  create(@Body() createDatPhongDto: CreateDatPhongDto) {
    return this.datPhongService.create(createDatPhongDto);
  }

  @Get()
  findAll() {
    return this.datPhongService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.datPhongService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDatPhongDto: UpdateDatPhongDto) {
    return this.datPhongService.update(+id, updateDatPhongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.datPhongService.remove(+id);
  }
}
