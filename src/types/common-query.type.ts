import { IsOptional, IsString } from 'class-validator';

export class CommonQueryDto {
  @IsOptional()
  search?: string;

  @IsOptional()
  offset?: number;

  @IsOptional()
  limit?: number;

  @IsOptional()
  @IsString()
  sort?: string = '';
}
