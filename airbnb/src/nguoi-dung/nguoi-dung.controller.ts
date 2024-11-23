import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, Req, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { NguoiDungService } from './nguoi-dung.service';
import { CreateNguoiDungDto, FileUploadDto } from './dto/create-nguoi-dung.dto';
import { UpdateNguoiDungDto } from './dto/update-nguoi-dung.dto';
import { ApiBody, ApiConsumes, ApiHeader, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { query, Request, Response } from 'express';
import { nguoiDungDto } from './dto/nguoi-dung.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudUploadService } from 'src/shared/cloudUpload.service';

@ApiTags('Người Dùng')
@Controller('nguoi-dung')
export class NguoiDungController {
  constructor(
    private readonly nguoiDungService: NguoiDungService,
    private readonly cloudUpLoadService: CloudUploadService

  ) {}

  @Post("/create-users")
  @ApiResponse({status: HttpStatus.CREATED, description: "create user successfully"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})
  async create(
    @Body() createNguoiDungDto: CreateNguoiDungDto,
    @Res() res: Response
  ):Promise <Response<nguoiDungDto>> {
    try {
      let newUser = await this.nguoiDungService.create(createNguoiDungDto);
      return res.status(HttpStatus.CREATED).json(newUser);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
  }

  @ApiResponse({status: HttpStatus.OK, description: "Get list users successfully"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})
  @Get("/get-users")
  async findAll(
    @Res() res:Response
  ): Promise<Response <nguoiDungDto[]>> {
    try {
      const user = await this.nguoiDungService.findAll();
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
  }

  @ApiResponse({status: HttpStatus.OK, description: "Get list users by page successfully"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})
  @Get("/users/phan-trang-tim-kiem")
  @ApiQuery({name: "page", required: false, type:Number})
  @ApiQuery({name: "size", required: false, type:Number})
  @ApiQuery({name: "keyword", required: false, type:String})
  @ApiResponse({status: HttpStatus.OK, description: "Get list users successfully"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})

  async findAllPage(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('keyword') keyword: string,
    @Res() res: Response,
    @Req() req:Request
  ): Promise<Response <nguoiDungDto[]>> {
    try {
      const formatPage = page ? Number(page) : 1;
      const formatSize = size ? Number(size) : 10;
      let users = await this.nguoiDungService.findAllPage(formatPage,formatSize,keyword);
      return res.status(HttpStatus.OK).json(users);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
   
  }
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: "Input wrong format"})
  @ApiResponse({status: HttpStatus.OK, description: "Get users by successfully"})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: "User not found"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})

  @Get('users/:id')
  async findOne(
    @Param('id') id: string,
    @Res() res:Response
  ): Promise<Response<nguoiDungDto>> {
    if (isNaN(+id)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid user ID" });
    }
    try {
      const user = await this.nguoiDungService.findOne(+id);
      if (!user) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
      }
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: error.message});
    }
  }

  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: "Input wrong format"})
  @ApiResponse({status: HttpStatus.OK, description: "User updated successfully"})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: "User not found"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})
  @Put('users/:id')
  async update(
    @Param('id') id: string,
    @Body() updateNguoiDungDto: UpdateNguoiDungDto,
    @Res() res:Response
  ) {
    if(isNaN(+id)){
      return res.status(HttpStatus.BAD_REQUEST).json({message:"Invalid ID Format"});
    }
    try {
      const userId= Number(id);
      if (!userId) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
      }
      const updatedUser = await this.nguoiDungService.update(userId,updateNguoiDungDto)
      return res.status(HttpStatus.OK).json({
        message: "User updated successfully",
        data: updatedUser
      });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:error.message});
    }
  }
  @ApiResponse({status: HttpStatus.BAD_REQUEST, description: "Input wrong format"})
  @ApiResponse({status: HttpStatus.OK, description: "User deleted successfully"})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: "User not found"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})

  @Delete('/delete-user/:id')
  async remove(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    if (isNaN(+id)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: "Invalid user ID" });
    }
  
    try {
      const result = await this.nguoiDungService.remove(+id);
  
      if (!result) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
      }
  
      return res.status(HttpStatus.OK).json({ message: "User deleted successfully" });
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(HttpStatus.NOT_FOUND).json({ message: "User not found" });
      }
  
      console.error(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  
  @ApiResponse({status: HttpStatus.OK, description: "Find user successfully"})
  @ApiResponse({status: HttpStatus.NOT_FOUND, description: "User not found"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})
  @Get('users/search/:TenNguoiDung')
  async searchuUser(
    @Param('TenNguoiDung') tenNguoiDung: string,
    @Res() res: Response
  ){
    try {
      const users = await this.nguoiDungService.searchUser(tenNguoiDung);
      if(users.length === 0){
        return res.status(HttpStatus.NOT_FOUND).json({message:"No users found for the provided name"})
      };
      return res.status(HttpStatus.OK).json({
        message:"find users successfully",
        data: users
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:error.message});
    }
  }

  @ApiResponse({status: HttpStatus.OK, description: "Upload avatar successfully"})
  @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server"})
  @Post("users/upload-avatar")
    @ApiConsumes("multipart/form-data")
    @ApiBody({
    type: FileUploadDto,
    required: true
  })
  @UseInterceptors(FileInterceptor('hinhAnh'))
  async uploadAvatarUser(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response
  ){
    try {
      const result = await this.cloudUpLoadService.upLoadImage(file,'nguoidung')
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"Upload failed"});
    }
  }
}
