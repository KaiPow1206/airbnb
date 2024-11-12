import { Injectable } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';

@Injectable()
export class BinhLuanService {
  create(createBinhLuanDto: CreateBinhLuanDto) {
    return 'This action adds a new binhLuan';
  }

  findAll() {
    return `This action returns all binhLuan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} binhLuan`;
  }

  update(id: number, updateBinhLuanDto: UpdateBinhLuanDto) {
    return `This action updates a #${id} binhLuan`;
  }

  remove(id: number) {
    return `This action removes a #${id} binhLuan`;
  }
}
