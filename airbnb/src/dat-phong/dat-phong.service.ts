import { Injectable } from '@nestjs/common';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';

@Injectable()
export class DatPhongService {
  create(createDatPhongDto: CreateDatPhongDto) {
    return 'This action adds a new datPhong';
  }

  findAll() {
    return `This action returns all datPhong`;
  }

  findOne(id: number) {
    return `This action returns a #${id} datPhong`;
  }

  update(id: number, updateDatPhongDto: UpdateDatPhongDto) {
    return `This action updates a #${id} datPhong`;
  }

  remove(id: number) {
    return `This action removes a #${id} datPhong`;
  }
}
