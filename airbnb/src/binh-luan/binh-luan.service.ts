import { Injectable } from '@nestjs/common';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';
import { Prisma, PrismaClient } from '@prisma/client';
import { BinhLuanDto } from './dto/binh-luan-dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BinhLuanService {
  prisma = new PrismaClient();
  async create(createBinhLuanDto: CreateBinhLuanDto): Promise<BinhLuanDto> {
    try {
      let newBinhLuan = await this.prisma.binhLuan.create({
        data: createBinhLuanDto,
      })
      return plainToClass(BinhLuanDto,newBinhLuan);
    } catch (error) {
      throw new Error(error);
    } 
  }

  async findAll():Promise<BinhLuanDto[]> {
    try {
      let binhLuan = await this.prisma.binhLuan.findMany();
      return binhLuan.map(binhLuan =>plainToClass(BinhLuanDto,binhLuan));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(maPhong: number) {
   try {
    let findBinhLuan = await this.prisma.binhLuan.findMany({
      where:{
        id_phong:Number(maPhong)
      },
      include:{
        NguoiDung: true,
      }
    })
    if (findBinhLuan.length == 0) {
      throw new Error(`Không có bình luận nào cho mã phòng ${maPhong}`);
    }
    return findBinhLuan;
   } catch (error) {
    throw new Error(error);
   }
  }

  async update(maBinhLuan: number, updateBinhLuanDto: UpdateBinhLuanDto) {
    try {
      let checkBinhLuan =await this.prisma.binhLuan.findFirst({
        where:{
          id_binh_luan:Number(maBinhLuan)
        }
      })
      if(!checkBinhLuan){
        throw new Error(`Không có bình luận nào tương ứng với mã bình luận là ${maBinhLuan}`)
      }
      let updatedBinhLuan = await this.prisma.binhLuan.update({
        where: { id_binh_luan: maBinhLuan },
        data: updateBinhLuanDto,
      });
      return updatedBinhLuan;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(maBinhLuan: number) {
    try {
      let checkBinhLuan =await this.prisma.binhLuan.findFirst({
        where:{
          id_binh_luan:Number(maBinhLuan)
        }
      })
      if(!checkBinhLuan){
        throw new Error(`Không có bình luận nào tương ứng với mã bình luận là ${maBinhLuan}`)
      }
      let deleteBinhLuan = await this.prisma.binhLuan.delete({
        where:{
          id_binh_luan:Number(maBinhLuan)
        },
      })
      return {
        message: ` Đã xóa mã bình luận là ${maBinhLuan} thành công.`,
        data: deleteBinhLuan,
      };
     } catch (error) {
      throw new Error(error);
     }
  }
}
