import { Injectable } from '@nestjs/common';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';

@Injectable()
export class PhongService {
  create(createPhongDto: CreatePhongDto) {
    return 'This action adds a new phong';
  }

  findAll() {
    return `This action returns all phong`;
  }

  findOne(id: number) {
    return `This action returns a #${id} phong`;
  }

  update(id: number, updatePhongDto: UpdatePhongDto) {
    return `This action updates a #${id} phong`;
  }

  remove(id: number) {
    return `This action removes a #${id} phong`;
  }
}
