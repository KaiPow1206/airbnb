import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePhongDto {
    @IsNotEmpty({message: "Tên phòng không được để trống"})
    @ApiProperty()
    ten_phong: string;

    @IsNotEmpty({message: "Số khách không được để trống"})
    @ApiProperty()
    khach: number;

    @IsNotEmpty({message: "Số phòng ngủ không được để trống"})
    @ApiProperty()
    phong_ngu: number;

    @IsNotEmpty({message: "Số giường không được để trống"})
    @ApiProperty()
    giuong: number;

    @IsNotEmpty({message: "Số phòng tắm không được để trống"})
    @ApiProperty()
    phong_tam: number;

    @IsNotEmpty({message: "Mô tả không được để trống"})
    @ApiProperty()
    mo_ta: string;

    @IsNotEmpty({message: "Giá tiền không được để trống"})
    @ApiProperty()
    gia_tien: number;

    @IsNotEmpty({message: "Máy giặt không được để trống"})
    @ApiProperty()
    may_giat: boolean;

    @IsNotEmpty({message: "Bàn là không được để trống"})
    @ApiProperty()
    ban_la: boolean;

    @IsNotEmpty({message: "Tivi không được để trống"})
    @ApiProperty()
    tivi: boolean;

    @IsNotEmpty({message: "Điều hòa không được để trống"})
    @ApiProperty()
    dieu_hoa: boolean;

    @IsNotEmpty({message: "Wifi không được để trống"})
    @ApiProperty()
    wifi: boolean;

    @IsNotEmpty({message: "Bếp không được để trống"})
    @ApiProperty()
    bep:boolean;

    @IsNotEmpty({message: "Đỗ xe không được để trống"})
    @ApiProperty()
    do_xe: boolean;

    @IsNotEmpty({message: "Hồ bơi không được để trống"})
    @ApiProperty()
    ho_boi: boolean

    @IsNotEmpty({message: "Bàn ủi không được để trống"})
    @ApiProperty()
    ban_ui: boolean;

    @IsNotEmpty({message: "Hình ảnh không được để trống"})
    @ApiProperty()
    hinh_anh: string;

    @IsNotEmpty({message: "Vị trí không được để trống"})
    @ApiProperty()
    id_vi_tri:number;

    @IsNotEmpty({message: "Người dùng không được để trống"})
    @ApiProperty()
    id_nguoi_dung:number;
}
export class FileUploadDto{
    @ApiProperty({type: 'string',format: 'binary'})
    hinhAnh: any;
}