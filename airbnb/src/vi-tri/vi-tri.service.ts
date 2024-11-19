import { Injectable } from '@nestjs/common';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { ViTriDto } from './dto/vi-tri.dto';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ViTriService {
  prisma = new PrismaClient();
  async findAll():Promise<ViTriDto[]> {
    try {
      let viTri = await this.prisma.viTri.findMany();
      return viTri.map(viTri =>plainToClass(ViTriDto,viTri));
    } catch (error) {
      throw new Error(error);
    }
  }

  async phanTrang(page: number,size: number,keyword:string):Promise<ViTriDto[]>{
    try {
      let timKiem = await this.prisma.viTri.findMany({
        where:keyword ? {
          ten_vi_tri:{
            contains: keyword
          }
        }
        : {},
        skip: (page - 1) * size,
        take: size
      });
      return timKiem.map( viTri=>plainToClass(ViTriDto,viTri));
    } catch (error) {
      throw new Error(error)
    }
  }
  
  async create(createViTriDto: CreateViTriDto): Promise<ViTriDto> {
    try {
      let newViTri = await this.prisma.viTri.create({
        data:createViTriDto,
      })
      return plainToClass(ViTriDto,newViTri);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      let findViTri = await this.prisma.viTri.findMany({
        where:{
          id_vi_tri:Number(id)
        },
        include:{
          Phong: true,
        }
      })
      if (findViTri.length == 0) {
        throw new Error(`Không có bình luận nào cho mã phòng ${id}`);
      }
      return findViTri;
     } catch (error) {
      throw new Error(error);
     }
  }

  update(id: number, updateViTriDto: UpdateViTriDto) {
    return `This action updates a #${id} viTri`;
  }

  remove(id: number) {
    return `This action removes a #${id} viTri`;
  }
}
