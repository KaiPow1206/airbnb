import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';

@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) {}

  @Post()
  create(@Body() createViTriDto: CreateViTriDto) {
    return this.viTriService.create(createViTriDto);
  }

  @Get()
  findAll() {
    return this.viTriService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viTriService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViTriDto: UpdateViTriDto) {
    return this.viTriService.update(+id, updateViTriDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viTriService.remove(+id);
  }
}
