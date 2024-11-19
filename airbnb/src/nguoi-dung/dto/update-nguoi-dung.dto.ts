import { PartialType } from '@nestjs/mapped-types';
import { CreateNguoiDungDto } from './create-nguoi-dung.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNguoiDungDto extends PartialType(CreateNguoiDungDto) {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    email: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    birth_day: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    gender: string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    role: string;
}
