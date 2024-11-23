import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateDatPhongDto {
   @IsNotEmpty({ message: "Id phòng không được để trống" })
   @ApiProperty()
   id_phong: number;

   @IsNotEmpty({ message: "Id người đặt không được để trống" })
   @ApiProperty()
   id_nguoi_dat: number;

   @ApiProperty({ default: new Date() })
   @IsOptional()
   ngay_den?: Date;

   @ApiProperty({ default: new Date() })
   @IsOptional()
   ngay_di?: Date;

   @IsNotEmpty({ message: "Sao đánh giá không được để trống" })
   @ApiProperty()
   so_luong_khach: number;
}
