import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';

@Controller('phong')
export class PhongController {
  constructor(private readonly phongService: PhongService) {}

  @Post()
  create(@Body() createPhongDto: CreatePhongDto) {
    return this.phongService.create(createPhongDto);
  }

  @Get()
  findAll() {
    return this.phongService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phongService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhongDto: UpdatePhongDto) {
    return this.phongService.update(+id, updatePhongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phongService.remove(+id);
  }
}
