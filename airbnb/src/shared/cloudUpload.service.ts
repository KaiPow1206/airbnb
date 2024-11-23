import { Inject, Injectable } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";
import { PrismaClient } from '@prisma/client';

@Injectable()
export class CloudUploadService {
    prisma = new PrismaClient();

    constructor(@Inject('CLOUDINARY') private cloudinary) { }
    async upLoadImage(file: Express.Multer.File, folder: string):Promise<UploadApiResponse>{
      return new Promise((resolve,reject)=>{
          const uploadStream = this.cloudinary.uploader.upload_stream(
              // define folder trên cloudinary để lưu hình
              {folder},
              // param 2: tiến hành upload hình lên cloudinary
              (error: any, result: UploadApiResponse)=>{
                  if(error){
                      reject(error)
                  } else{
                      resolve(result);
                  }
              }
          );
          uploadStream.end(file.buffer);
      })
    }
    async uploadImage2(file: Express.Multer.File, roomId: string, folder: string): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
          const uploadStream = this.cloudinary.uploader.upload_stream(
            { folder },
            async (error: any, result: UploadApiResponse) => {
              if (error) {
                reject(error);
              } else {
                try {
                  const imageUrl = result.secure_url;
      
                  await this.prisma.phong.update({
                    where: { id_phong: Number(roomId) }, // Sử dụng ID phòng
                    data: {
                      hinh_anh: imageUrl, // Cập nhật cột `image` hoặc tên tương tự trong DB
                    },
                  });
      
                  resolve(result); // Trả về kết quả từ Cloudinary
                } catch (dbError) {
                  reject(dbError); // Báo lỗi nếu lưu vào DB thất bại
                }
              }
            }
          );
          uploadStream.end(file.buffer); // Kết thúc upload
        });
    }
    async uploadImage3(file: Express.Multer.File, viTriId: string, folder: string): Promise<UploadApiResponse> {
      return new Promise((resolve, reject) => {
        const uploadStream = this.cloudinary.uploader.upload_stream(
          { folder },
          async (error: any, result: UploadApiResponse) => {
            if (error) {
              reject(error);
            } else {
              try {
                const imageUrl = result.secure_url;
    
                await this.prisma.viTri.update({
                  where: { id_vi_tri: Number(viTriId) }, // Sử dụng ID phòng
                  data: {
                    hinh_anh: imageUrl, // Cập nhật cột `image` hoặc tên tương tự trong DB
                  },
                });
    
                resolve(result); // Trả về kết quả từ Cloudinary
              } catch (dbError) {
                reject(dbError); // Báo lỗi nếu lưu vào DB thất bại
              }
            }
          }
        );
        uploadStream.end(file.buffer); // Kết thúc upload
      });
  }
      
}