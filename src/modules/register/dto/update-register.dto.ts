import { PartialType } from '@nestjs/mapped-types';
import { CreateRegisterDto } from './create-register.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRegisterDto extends PartialType(CreateRegisterDto) {
  @IsNotEmpty()
  @IsString()
  permission: number;
}
