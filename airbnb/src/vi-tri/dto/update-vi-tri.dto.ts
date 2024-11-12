import { PartialType } from '@nestjs/mapped-types';
import { CreateViTriDto } from './create-vi-tri.dto';

export class UpdateViTriDto extends PartialType(CreateViTriDto) {}
