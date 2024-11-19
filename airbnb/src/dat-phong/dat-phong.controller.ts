import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { DatPhongService } from './dat-phong.service';
import { CreateDatPhongDto } from './dto/create-dat-phong.dto';
import { UpdateDatPhongDto } from './dto/update-dat-phong.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DatPhongDto } from './dto/dat-phong.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Dat Phong')
@Controller('dat-phong')
export class DatPhongController {
  constructor(private readonly datPhongService: DatPhongService) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get list DatPhong Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Get("/all-dat-phong")
  async findAll(
    @Res() res: Response,
  ): Promise<any> {
    try {
      let datPhong = await this.datPhongService.findAll();
      return res.status(HttpStatus.OK).json(datPhong);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Create DatPhong Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post("/dat-phong")
  async create(
    @Body() createDatPhongDto: CreateDatPhongDto,
    @Res() res: Response
  ):Promise<Response<DatPhongDto>> {
    try {
      let newDatPhong = await this.datPhongService.create(createDatPhongDto);
      return res.status(HttpStatus.CREATED).json(newDatPhong);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get list DatPhong by id Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Get("/dat-phong/:MaDatPhong")
  async findOne(
    @Param('MaDatPhong') maDatPhong: string,
    @Res() res: Response
  ) {
    try {
      let findDatPhong= await this.datPhongService.findOne(+maDatPhong);
      return res.status(HttpStatus.OK).json(findDatPhong);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update DatPhong Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Put(':MaDatPhong')
  async update(
    @Param('MaDatPhong') maDatPhong: string, 
    @Body() updateDatPhongDto: UpdateDatPhongDto,
    @Res() res: Response
  ) {
    try {
      let updateDatPhong = await this.datPhongService.update(+maDatPhong, updateDatPhongDto);
      return res.status(HttpStatus.OK).json(updateDatPhong);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete DatPhong Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':MaDatPhong')
  async remove(
    @Param('MaDatPhong') maDatPhong: string,
    @Res() res: Response
  ) {
    try {
      let removeDatPhong = await this.datPhongService.remove(+maDatPhong);
      return res.status(HttpStatus.OK).json(removeDatPhong);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get list DatPhong by NguoiDung Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Get("/dat-phong/lay-theo-nguoi-dung/:MaNguoiDung")
  async findOneById(
    @Param('MaNguoiDung') maNguoiDung: string,
    @Res() res: Response
  ) {
    try {
      let findDatPhongByNguoiDung= await this.datPhongService.findOneById(+maNguoiDung);
      return res.status(HttpStatus.OK).json(findDatPhongByNguoiDung);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
