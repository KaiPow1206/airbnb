import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';

@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) {}

  @Post()
  create(@Body() createBinhLuanDto: CreateBinhLuanDto) {
    return this.binhLuanService.create(createBinhLuanDto);
  }

  @Get()
  findAll() {
    return this.binhLuanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.binhLuanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBinhLuanDto: UpdateBinhLuanDto) {
    return this.binhLuanService.update(+id, updateBinhLuanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.binhLuanService.remove(+id);
  }
}
