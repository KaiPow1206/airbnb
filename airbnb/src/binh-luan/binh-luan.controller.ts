import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { BinhLuanService } from './binh-luan.service';
import { CreateBinhLuanDto } from './dto/create-binh-luan.dto';
import { UpdateBinhLuanDto } from './dto/update-binh-luan.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BinhLuanDto } from './dto/binh-luan-dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';


@ApiTags('Binh Luan')
@Controller('binh-luan')
export class BinhLuanController {
  constructor(private readonly binhLuanService: BinhLuanService) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get list BinhLuan Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Get("/all-binh-luan")
  async findAll(
    @Res() res: Response,
  ): Promise<Response<BinhLuanDto[]>> {
    try {
      let binhLuan = await this.binhLuanService.findAll();
      return res.status(HttpStatus.OK).json(binhLuan);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Create BinhLuan Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  @Post("/binh-luan")
  async create(
    @Body() createBinhLuanDto: CreateBinhLuanDto,
    @Res() res: Response
  ): Promise<Response<BinhLuanDto>> {
    try {
      let newBinhLuan = await this.binhLuanService.create(createBinhLuanDto);
      return res.status(HttpStatus.CREATED).json(newBinhLuan);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Update BinhLuan Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Put('/binh-luan/:MaBinhLuan')
  async update(
    @Param('MaBinhLuan') maBinhLuan: string, @Body() updateBinhLuanDto: UpdateBinhLuanDto,
    @Res() res: Response
  ) {
    try {
      let updateBinhLuan = await this.binhLuanService.update(+maBinhLuan, updateBinhLuanDto);
      return res.status(HttpStatus.OK).json(updateBinhLuan);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete BinhLuan Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Delete('/binh-luan/:MaBinhLuan')
  async remove(
    @Param('MaBinhLuan') maBinhLuan: string,
    @Res() res: Response
  ) {
    try {
      let removeBinhLuan = await this.binhLuanService.remove(+maBinhLuan);
      return res.status(HttpStatus.OK).json(removeBinhLuan);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get BinhLuan By MaPhong Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Get('/binh-luan/lay-binh-luan-theo-phong/:MaPhong')
  async findOne(
    @Param('MaPhong') maPhong: string,
    @Res() res: Response
  ) {
    try {
      let findBinhLuan = await this.binhLuanService.findOne(+maPhong);
      return res.status(HttpStatus.OK).json(findBinhLuan);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
