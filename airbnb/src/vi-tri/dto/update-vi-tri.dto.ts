import { PartialType } from '@nestjs/mapped-types';
import { CreateViTriDto } from './create-vi-tri.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateViTriDto extends PartialType(CreateViTriDto) {
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

