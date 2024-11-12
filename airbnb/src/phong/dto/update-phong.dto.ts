import { PartialType } from '@nestjs/mapped-types';
import { CreatePhongDto } from './create-phong.dto';

export class UpdatePhongDto extends PartialType(CreatePhongDto) {}
