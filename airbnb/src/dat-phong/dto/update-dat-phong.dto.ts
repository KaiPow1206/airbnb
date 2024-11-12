import { PartialType } from '@nestjs/mapped-types';
import { CreateDatPhongDto } from './create-dat-phong.dto';

export class UpdateDatPhongDto extends PartialType(CreateDatPhongDto) {}
