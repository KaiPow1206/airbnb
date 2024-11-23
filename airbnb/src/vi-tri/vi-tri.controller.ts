import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards, Query, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { CreateViTriDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ViTriDto } from './dto/vi-tri.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('Vi Tri')
@Controller('vi-tri')
export class ViTriController {
  constructor(private readonly viTriService: ViTriService) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get list ViTri Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Get("/all-vi-tri")
  async findAll(
    @Res() res: Response,
  ): Promise<Response<ViTriDto[]>> {
    try {
      let viTri = await this.viTriService.findAll();
      return res.status(HttpStatus.OK).json(viTri);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }


  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Create ViTri Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post("/vi-tri")
  async create(
    @Body() createViTriDto: CreateViTriDto,
    @Res() res: Response
  ): Promise<Response<ViTriDto>> {
    try {
      let newViTri = await this.viTriService.create(createViTriDto);
      return res.status(HttpStatus.CREATED).json(newViTri);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Find ViTri by keyword Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Get("/vi-tri/phan-trang-tim-kiem")
  @ApiQuery({name: "page", required: false, type:Number})
  @ApiQuery({name: "size", required: false, type:Number})
  @ApiQuery({name: "keyword", required: false, type:String})
  async phanTrang(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
  ): Promise<Response<ViTriDto[]>>{
    try {
      // return res.status(HttpStatus.OK).json({page,size,keyword,token});
      // return this.videoService.findAll();
      // Format datatype cho page và size
      // toán tử 3 ngôi
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;
      let timKiem = await this.viTriService.phanTrang(formatPage,formatSize,keyword);
      return res.status(HttpStatus.OK).json(timKiem);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    try {
      let findViTri = await this.viTriService.findOne(+id);
      return res.status(HttpStatus.OK).json(findViTri);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Put('users/:id')
  async update(
    @Param('id') id: string,
    @Body() UpdateViTriDto: UpdateViTriDto,
    @Res() res:Response
  ) {
    try {
      const locId= Number(id);
      const updatedLoc = await this.viTriService.update(locId,UpdateViTriDto)
      return res.status(HttpStatus.OK).json({
        message: "Location updated successfully",
        data: updatedLoc
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:error.message});
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viTriService.remove(+id);
  }

  
}
