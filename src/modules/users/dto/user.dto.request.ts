import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindUserQueryDto {
  @IsNotEmpty()
  limit: number;

  @IsNotEmpty()
  offset: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  @IsString()
  sort?: string = '';
}
