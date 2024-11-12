import { Injectable } from '@nestjs/common';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';

@Injectable()
export class ViTriService {
  create(createViTriDto: CreateViTriDto) {
    return 'This action adds a new viTri';
  }

  findAll() {
    return `This action returns all viTri`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viTri`;
  }

  update(id: number, updateViTriDto: UpdateViTriDto) {
    return `This action updates a #${id} viTri`;
  }

  remove(id: number) {
    return `This action removes a #${id} viTri`;
  }
}
