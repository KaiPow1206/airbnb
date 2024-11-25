import { Injectable } from '@nestjs/common';
import { CreateNguoiDungDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { PrismaClient } from '@prisma/client';
import { nguoiDungDto } from './dto/nguoi-dung.dto';
import { plainToClass } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class NguoiDungService {
  prisma = new PrismaClient();
  async create(createNguoiDungDto: CreateNguoiDungDto): Promise<nguoiDungDto> {
    try {
      const {name,email,pass_word,phone,birth_day,gender,role}=createNguoiDungDto;

      const hashPassword = await bcrypt.hash(createNguoiDungDto.pass_word, 10);
      let newUser = await this.prisma.nguoiDung.create({
        data: {
          name: name,
          email:email,
          pass_word:hashPassword,
          phone:phone,
          birth_day:birth_day,
          gender:gender,
          role:role
        },
      })
      return plainToClass(nguoiDungDto, newUser)
    } catch (error) {
      throw new Error (error)
    }
  }

  async findAll(): Promise<nguoiDungDto[]> {
    try {
      const user = await this.prisma.nguoiDung.findMany();
      return user.map(nguoiDung => plainToClass(nguoiDungDto, nguoiDung));
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAllPage(page: number,size: number,keyword:string):Promise<nguoiDungDto[]> {
    try {
      let users = await this.prisma.nguoiDung.findMany({
        where:keyword ? {
          name:{
            contains: keyword
          }
        }
        : {},
        skip: (page - 1) * size,
        take: size
      });
      return users.map(nguoiDung =>plainToClass(nguoiDungDto,nguoiDung));
    } catch (error) {
      throw new Error(error)
    }
  }
  
  async findOne(id: number): Promise<nguoiDungDto> {
    try {
      const user = await this.prisma.nguoiDung.findFirst({
        where: { id_nguoi_dung:id },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return plainToClass(nguoiDungDto, user);
    } catch (error) {
      if (error.message === 'User not found') {
        throw new Error('User not found');
      }
      throw new Error(
        `Error while retrieving user with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(id: number, updateNguoiDungDto: UpdateNguoiDungDto) {
    try {
      const user = await this.prisma.nguoiDung.findFirst({
        where: { id_nguoi_dung: id },
      });
  
      if (!user) {
        throw new Error('User not found');
      }
      const {name,email,pass_word,phone,birth_day,gender,role}=updateNguoiDungDto;

      const hashPassword = await bcrypt.hash(updateNguoiDungDto.pass_word, 10);
      const updatedUser = await this.prisma.nguoiDung.update({
        where: { id_nguoi_dung: id },
        data:{
          name: name,
          email:email,
          pass_word:hashPassword,
          phone:phone,
          birth_day:birth_day,
          gender:gender,
          role:role
        }
      });
  
      return {
        message: `User with ID ${id} has been successfully updated.`,
        updatedUser,
      };
    } catch (error) {
      if (error.message === 'User not found') {
        throw new Error('User not found');
      }
      throw new Error(
        `Error while updating user with ID ${id}: ${error.message}`
      );
    }
  }
  

  async remove(id: number): Promise<nguoiDungDto | null> {
    try {
      const user = await this.prisma.nguoiDung.findFirst({
        where: { id_nguoi_dung: id }
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const deletedUser = await this.prisma.nguoiDung.delete({
        where: { id_nguoi_dung: id }
      });
  
      return deletedUser;
    } catch (error) {
      if (error.message === 'User not found') {
        throw new Error('User not found');
      }
      
      throw new Error('An unexpected error occurred while deleting the user');
    }
  }
  async searchUser(tenNguoiDung: string) {
    return this.prisma.nguoiDung.findMany({
      where: {
        name: {
          contains: tenNguoiDung, // Tìm kiếm theo tên
        },
      },
    });
  }
}
