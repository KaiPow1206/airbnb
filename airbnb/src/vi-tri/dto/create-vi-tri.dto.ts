import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";
export class CreateViTriDto {

   @IsNotEmpty({ message: "Tên vị trí không được để trống" })
   @ApiProperty()
   ten_vi_tri: string;

   @IsNotEmpty({ message: "Tỉnh thành không được để trống" })
   @ApiProperty()
   tinh_thanh: string;

   @IsNotEmpty({ message: "Quốc gia không được để trống" })
   @ApiProperty()
   quoc_gia: number;

   @IsNotEmpty({ message: "Sao đánh giá không được để trống" })
   @ApiProperty()
   hinh_anh: string;
}
export class FileUploadDto{
   @ApiProperty({type: 'string',format: 'binary'})
   hinhAnh: any;
}