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

  async findOne(maViTri: number) {
    try {
      let findViTri = await this.prisma.viTri.findMany({
        where:{
          id_vi_tri:Number(maViTri)
        },
        include:{
          Phong: true,
        }
      })
      if (findViTri.length == 0) {
        throw new Error(`Không có mã vị trí nào tương ứng với ${maViTri}`);
      }
      return findViTri;
     } catch (error) {
      throw new Error(error);
     }
  }

<<<<<<< HEAD
  async update(id: number, UpdateViTriDto: UpdateViTriDto) {
    try {
      const user = await this.prisma.viTri.findUnique({
        where: { id_vi_tri: id },
      });
  
      const updatedLoc = await this.prisma.viTri.update({
        where: { id_vi_tri: id },
        data: UpdateViTriDto,
      });
  
      return {
        message: "Location updated successfully",
        updatedLoc,
      };
=======
  async update(maViTri: number, updateViTriDto: UpdateViTriDto) {
    try {
      let checkViTri = await this.prisma.viTri.findFirst({
        where: {
          id_vi_tri: Number(maViTri)
        }
      })
      if (!checkViTri) {
        throw new Error(`Không có mã vị trí nào tương ứng với ${maViTri}`)
      }
      let updatedViTri = await this.prisma.viTri.update({
        where: { id_vi_tri: maViTri },
        data: updateViTriDto,
      });
      return updatedViTri;
>>>>>>> 3e656f5c90080feec1e2bb1f7e16a79e76cb3af2
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(maViTri: number) {
    try {
      let checkViTri = await this.prisma.viTri.findFirst({
        where: {
          id_vi_tri: Number(maViTri)
        }
      })
      if (!checkViTri) {
        throw new Error(`Không có mã vị trí tương ứng với ${maViTri}`)
      }
      let deleteViTri = await this.prisma.viTri.delete({
        where: {
          id_vi_tri: Number(maViTri)
        },
      })
      return {
        message: ` Đã xóa mã đặt phòng là ${maViTri} thành công.`,
        data: deleteViTri,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
