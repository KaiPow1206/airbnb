import { PartialType } from '@nestjs/mapped-types';
import { CreatePhongDto } from './create-phong.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhongDto extends PartialType(CreatePhongDto) {

    @IsNotEmpty({message: "Tên phòng không được để trống"})
    @ApiProperty()
    @IsOptional()
    ten_phong: string;

    @IsNotEmpty({message: "Số khách không được để trống"})
    @ApiProperty()
    @IsOptional()
    khach: number;

    @IsNotEmpty({message: "Số phòng ngủ không được để trống"})
    @ApiProperty()
    @IsOptional()
    phong_ngu: number;

    @IsNotEmpty({message: "Số giường không được để trống"})
    @ApiProperty()
    @IsOptional()
    giuong: number;

    @IsNotEmpty({message: "Số phòng tắm không được để trống"})
    @ApiProperty()
    @IsOptional()
    phong_tam: number;

    @IsNotEmpty({message: "Mô tả không được để trống"})
    @ApiProperty()
    @IsOptional()
    mo_ta: string;

    @IsNotEmpty({message: "Giá tiền không được để trống"})
    @ApiProperty()
    @IsOptional()
    gia_tien: number;

    @IsNotEmpty({message: "Máy giặt không được để trống"})
    @ApiProperty()
    @IsOptional()
    may_giat: boolean;

    @IsNotEmpty({message: "Bàn là không được để trống"})
    @ApiProperty()
    @IsOptional()
    ban_la: boolean;

    @IsNotEmpty({message: "Tivi không được để trống"})
    @ApiProperty()
    @IsOptional()
    tivi: boolean;

    @IsNotEmpty({message: "Điều hòa không được để trống"})
    @ApiProperty()
    @IsOptional()
    dieu_hoa: boolean;

    @IsNotEmpty({message: "Wifi không được để trống"})
    @ApiProperty()
    @IsOptional()
    wifi: boolean;

    @IsNotEmpty({message: "Bếp không được để trống"})
    @ApiProperty()
    @IsOptional()
    bep:boolean;

    @IsNotEmpty({message: "Đỗ xe không được để trống"})
    @ApiProperty()
    @IsOptional()
    do_xe: boolean;

    @IsNotEmpty({message: "Hồ bơi không được để trống"})
    @ApiProperty()
    @IsOptional()
    ho_boi: boolean

    @IsNotEmpty({message: "Bàn ủi không được để trống"})
    @ApiProperty()
    @IsOptional()
    ban_ui: boolean;

    @IsNotEmpty({message: "Hình ảnh không được để trống"})
    @ApiProperty()
    @IsOptional()
    hinh_anh: string;

    @IsNotEmpty({message: "Vị trí không được để trống"})
    @ApiProperty()
    @IsOptional()
    id_vi_tri:number;
}
