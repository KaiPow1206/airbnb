import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum,IsNotEmpty } from "class-validator";
export class CreateNguoiDungDto {
    
    @IsNotEmpty({message: "Tên người dùng không được để trống"})
    @ApiProperty()
    name: string;

    @IsEmail({},{message:"Email không đúng định dạng"})
    @ApiProperty()
    email: string;

    @IsNotEmpty({message: "Mật khẩu người dùng không được để trống"})
    @ApiProperty()
    pass_word: string;
    
    @IsNotEmpty({message: "Số điện thoại người dùng không được để trống"})
    @ApiProperty()
    phone: string;

    @IsNotEmpty({message: "Ngày sinh người dùng không được để trống"})
    @ApiProperty()
    birth_day: string;
    
    @IsNotEmpty({message: "Giới tính người dùng không được để trống"})
    @ApiProperty()
    gender: string;

    @IsNotEmpty({message: "Vai trò người dùng không được để trống"})
    @ApiProperty()
    role: string;
}
export class FileUploadDto{
    @ApiProperty({type: 'string',format: 'binary'})
    hinhAnh: any;
}
