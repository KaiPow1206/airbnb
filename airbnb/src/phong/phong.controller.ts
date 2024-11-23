import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, Req, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PhongService } from './phong.service';
import { CreatePhongDto, FileUploadDto } from './dto/create-phong.dto';
import { UpdatePhongDto } from './dto/update-phong.dto';
import { Response } from 'express';
import { phongDto } from './dto/phong.dto';
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudUploadService } from 'src/shared/cloudUpload.service';

import { ApiTags } from '@nestjs/swagger';
@ApiTags('Phòng')
@Controller('phong')
export class PhongController {
  constructor(
    private readonly phongService: PhongService,
    private readonly cloudUploadService: CloudUploadService

  ) { }

  @Post("/create-room")
  async create(
    @Body() createPhongDto: CreatePhongDto,
    @Res() res: Response
  ): Promise<Response<phongDto>> {
    try {
      const newRoom = await this.phongService.create(createPhongDto);
      return res.status(HttpStatus.CREATED).json(newRoom);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get("/get-list-room")
  async findAll(
    @Res() res: Response
  ): Promise<Response<phongDto[]>> {
    try {
      const room = await this.phongService.findAll();
      return res.status(HttpStatus.OK).json(room);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get("get-room/lay-phong-theo-vi-tri/:MaViTri")
  async findOne(
    @Param('MaViTri') maViTri: string,
    @Res() res: Response
  ) {

    try {
      const room = await this.phongService.findOne(+maViTri);
      return res.status(HttpStatus.OK).json(room);
    } catch (error) {

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get("/room/phan-trang-tim-kiem")
  @ApiQuery({ name: "page", required: false, type: Number })
  @ApiQuery({ name: "size", required: false, type: Number })
  @ApiQuery({ name: "keyword", required: false, type: String })
  @ApiResponse({ status: HttpStatus.OK, description: "Get list room by page successfully" })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server" })

  async findAllPage(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
    @Req() req: Request
  ): Promise<Response<phongDto[]>> {
    try {
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;
      let users = await this.phongService.findAllPage(formatPage, formatSize, keyword);
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }

  }

  @Get("get-room/:id")
  async findOneRoom(
    @Param('id') id: string,
    @Res() res: Response
  ): Promise<Response<phongDto>> {
    if (isNaN(+id)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid room ID" });
    }
    try {
      const room = await this.phongService.findOneRoom(+id);
      if (!room) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Room not found" });
      }
      return res.status(HttpStatus.OK).json(room);
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Room not found" });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Put('room/:id')
  async update(
    @Param('id') id: string,
    @Body() UpdatePhongDto: UpdatePhongDto,
    @Res() res: Response
  ) {
    if (isNaN(+id)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid ID Format" });
    }
    try {
      const userId = Number(id);
      if (!userId) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Room not found" });
      }
      const updatedRoom = await this.phongService.update(userId, UpdatePhongDto)
      return res.status(HttpStatus.OK).json({
        message: "Room updated successfully",
        data: updatedRoom
      });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Room not found" });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Delete('/delete-room/:id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    if (isNaN(+id)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid room ID" });
    }

    try {
      const result = await this.phongService.remove(+id);

      if (!result) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Room not found" });
      }

      return res.status(HttpStatus.OK).json({ message: "Room deleted successfully" });
    } catch (error) {
      if (error.message === 'Room not found') {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "Room not found" });
      }

      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  @Post("/upload-img-room")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FileUploadDto,
    required: true,
    description: "File hình ảnh của phòng cần tải lên",
  })
  @UseInterceptors(FileInterceptor('hinhAnh'))
  async uploadImgsRoom(
    @UploadedFile() file: Express.Multer.File,
    @Query('roomId') roomId: string,
    @Res() res: Response
  ) {
    try {
      if (!file) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "File không được để trống" });
      }
      if (!roomId) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "roomId không được để trống" });
      }
      const result = await this.cloudUploadService.uploadImage2(file, roomId, 'room');
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
