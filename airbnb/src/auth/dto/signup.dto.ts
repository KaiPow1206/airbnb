import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";



export class SignUpDto {
 
   @IsNotEmpty({message:"Tên người dùng không được để trống"})
   @ApiProperty()
   name: string;
 
   @IsEmail({},{message:"Email không đúng định dạng"})
   @ApiProperty()
   email: string;
 
   @IsNotEmpty({message:"Password không được để trống"})
   @ApiProperty()
   password: string;
 
   @IsNotEmpty({message:"Điện thoại không được để trống"})
   @ApiProperty()
   phone: string;
 
   @IsNotEmpty({message:"Ngày sinh không được để trống"})
   @ApiProperty()
   birthday: string;
 
   @IsNotEmpty({message:"Giới tính không được để trống"})
   @ApiProperty()
   gender: string;
 
   @IsNotEmpty({message:"Chức vụ không được để trống"})
   @ApiProperty()
   role: string;
}