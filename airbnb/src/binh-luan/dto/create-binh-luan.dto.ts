import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBinhLuanDto {
   @IsNotEmpty({ message: "Id phòng không được để trống" })
   @ApiProperty()
   id_phong: number;

   @IsNotEmpty({ message: "Id người dùng không được để trống" })
   @ApiProperty()
   id_nguoi_binh_luan: number;

   @ApiProperty({ default: new Date() }) // Mặc định là ngày hiện tại
   @IsOptional()
   ngay_binh_luan?: Date;

   @IsNotEmpty({ message: "Nội dung không được để trống" })
   @ApiProperty()
   noi_dung: string;

   @IsNotEmpty({ message: "Sao đánh giá không được để trống" })
   @ApiProperty()
   sao_binh_luan: number;
}
