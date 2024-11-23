import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, UseGuards, Query, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ViTriService } from './vi-tri.service';
import { CreateViTriDto, FileUploadDto } from './dto/create-vi-tri.dto';
import { UpdateViTriDto } from './dto/update-vi-tri.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ViTriDto } from './dto/vi-tri.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudUploadService } from 'src/shared/cloudUpload.service';
@ApiTags('Vi Tri')
@Controller('vi-tri')
export class ViTriController {
  constructor(
    private readonly viTriService: ViTriService,
    private readonly cloudUploadService: CloudUploadService

  ) { }

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
  @ApiQuery({name: "page", required: true, type:Number})
  @ApiQuery({name: "size", required: true, type:Number})
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Get list ViTri by id Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @Get('/vi-tri/:MaViTri')
  async findOne(
    @Param('MaViTri') maViTri: string,
    @Res() res: Response
  ) {
    try {
      let findViTri = await this.viTriService.findOne(+maViTri);
      return res.status(HttpStatus.OK).json(findViTri);
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
  @Put('/vi-tri/:MaVitri')
  async update(
    @Param('MaVitri') maViTri: string,
    @Body() updateViTriDto: UpdateViTriDto,
    @Res() res: Response
  ) {
    try {
      let updateViTri = await this.viTriService.update(+maViTri, updateViTriDto);
      return res.status(HttpStatus.OK).json(updateViTri);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: "Delete ViTri Successful"
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "Internal Server"
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('/vi-tri/:MaVitri')
  async remove(
    @Param('MaVitri') maViTri: string,
    @Res() res : Response
  ) {
    try {
      let removeViTri = await this.viTriService.remove(+maViTri);
      return res.status(HttpStatus.OK).json(removeViTri);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @ApiResponse({status: HttpStatus.OK, description: "Upload image location successfully"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post("/upload-img-vitri")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FileUploadDto,
    required: true,
    description: "File hình ảnh của phòng cần tải lên",
  })
  @UseInterceptors(FileInterceptor('hinhAnh'))
  async uploadImgsRoom(
    @UploadedFile() file: Express.Multer.File,
    @Query('maViTri') viTriId: string,
    @Res() res: Response
  ) {
    try {
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "File không được để trống" });
      }
      if (!viTriId) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "Mã vị trí không được để trống" });
      }
      const result = await this.cloudUploadService.uploadImage3(file, viTriId, 'vitri');
      return res.status(HttpStatus.OK).json({
        message: "Upload thành công",
        data: result,
      });
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Upload ảnh thất bại",
        error: error.message || "Lỗi không xác định",
      });
    }
  }
}
