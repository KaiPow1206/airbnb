import { Injectable } from '@nestjs/common';
import { CreatePhongDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { phongDto } from './dto/phong.dto';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PhongService {
  prisma = new PrismaClient();
  async create(createPhongDto: CreatePhongDto):Promise<phongDto> {
    try {
      let newRoom = await this.prisma.phong.create({
        data: createPhongDto
      })
      return plainToClass(phongDto,newRoom)
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll():Promise<phongDto[]> {
    try {
      const room = await this.prisma.phong.findMany(); 
      return room.map(phong => plainToClass(phongDto, phong));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(maViTri: number){
    try {
      const room = await this.prisma.phong.findMany({
        where: {
           id_vi_tri: maViTri 
          },
          include:{
            ViTri: true
          }
      });

      if (room.length==0) {
        throw new Error('Room not found');
      }

      return room;
    } catch (error) {
     
      throw new Error(error);
    }
  }

  async findOneRoom(id: number): Promise<phongDto> {
    try {
      const room = await this.prisma.phong.findFirst({
        where: { id_phong:id },
      });

      if (!room) {
        throw new Error('Room not found');
      }

      return plainToClass(phongDto, room);
    } catch (error) {
      if (error.message === 'Room not found') {
        throw new Error('Room not found');
      }
      throw new Error(error);
    }
  }

  async update(id: number, UpdatePhongDto: UpdatePhongDto) {
    try {
      const room = await this.prisma.phong.findFirst({
        where: { id_phong: id },
      });
  
      if (!room) {
        throw new Error('Room not found');
      }
  
      const updatedRoom = await this.prisma.phong.update({
        where: { id_phong: id },
        data: UpdatePhongDto,
      });
  
      return {
        message: `Room with ID ${id} has been successfully updated.`,
        updatedRoom,
      };
    } catch (error) {
      if (error.message === 'Room not found') {
        throw new Error('Room not found');
      }
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<phongDto> {
    try {
      const room = await this.prisma.phong.findFirst({
        where: { id_phong: id }
      });
  
      if (!room) {
        throw new Error('Room not found');
      }
  
      const deletedRoom = await this.prisma.phong.delete({
        where: { id_phong: id }
      });
  
      return deletedRoom;
    } catch (error) {
      if (error.message === 'Room not found') {
        throw new Error('Room not found');
      }
      
      throw new Error(error);
    }
  }

  async findAllPage(page: number,size: number,keyword:string):Promise<phongDto[]> {
    try {
      let users = await this.prisma.phong.findMany({
        where:keyword ? {
          ten_phong:{
            contains: keyword
          }
        }
        : {},
        skip: (page - 1) * size,
        take: size
      });
      return users.map(phong =>plainToClass(phongDto,phong));
    } catch (error) {
      throw new Error(error)
    }
  }
}
