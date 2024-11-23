import { Injectable } from '@nestjs/common';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { DatPhongDto } from './dto/dat-phong.dto';

@Injectable()
export class DatPhongService {
  prisma = new PrismaClient();

  async create(createDatPhongDto: CreateDatPhongDto): Promise<DatPhongDto> {
    try {
      let newDatPhong = await this.prisma.datPhong.create({
        data: createDatPhongDto,
      })
      return plainToClass(DatPhongDto, newDatPhong);
    } catch (error) {
      throw new Error(error)
    }
  }

  async findAll(): Promise<DatPhongDto[]> {
    try {
      let datPhong = await this.prisma.datPhong.findMany();
      return datPhong.map(datPhong => plainToClass(DatPhongDto, datPhong))
    } catch (error) {
      throw new Error(error)
    }
  }

  async findOne(maDatPhong: number) {
    try {
      let findDatPhong = await this.prisma.datPhong.findMany({
        where: {
          id_dat_phong: maDatPhong
        },
        include: {
          NguoiDung: true
        }
      })
      if (findDatPhong.length == 0) {
        throw new Error(`Không có mã đặt phòng nào tương ứng với ${maDatPhong}`)
      }
      return findDatPhong;
    } catch (error) {
      throw new Error(error)
    }
  }

  async update(maDatPhong: number, updateDatPhongDto: UpdateDatPhongDto) {
    try {
      let checkDatPhong = await this.prisma.datPhong.findFirst({
        where: {
          id_dat_phong: Number(maDatPhong)
        }
      })
      if (!checkDatPhong) {
        throw new Error(`Không có mã đặt phòng nào tương ứng với ${maDatPhong}`)
      }
      let updatedDatPhong = await this.prisma.datPhong.update({
        where: { id_dat_phong: maDatPhong },
        data: updateDatPhongDto,
      });
      return updatedDatPhong;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(maDatPhong: number) {
    try {
      let checkBinhLuan = await this.prisma.datPhong.findFirst({
        where: {
          id_dat_phong: Number(maDatPhong)
        }
      })
      if (!checkBinhLuan) {
        throw new Error(`Không có mã đặt phòng tương ứng với ${maDatPhong}`)
      }
      let deleteBinhLuan = await this.prisma.datPhong.delete({
        where: {
          id_dat_phong: Number(maDatPhong)
        },
      })
      return {
        message: ` Đã xóa mã đặt phòng là ${maDatPhong} thành công.`,
        data: deleteBinhLuan,
      };
    } catch (error) {
      throw new Error(error);
    }
  }


  async findOneById(maNguoiDung:number){
    try {
      let findDatPhongByNguoiDung = await this.prisma.nguoiDung.findMany({
        where: {
          id_nguoi_dung: maNguoiDung
        },
        include: {
          DatPhong: true
        }
      })
      if (findDatPhongByNguoiDung.length == 0) {
        throw new Error(`Không có mã đặt phòng nào thuộc về với mã người dùng ${maNguoiDung}`)
      }
      return findDatPhongByNguoiDung;
    } catch (error) {
      throw new Error(error)
    }
  }
}
