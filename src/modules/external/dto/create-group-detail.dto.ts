import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class CreateGroupDto {
  @Expose()
  created_at: Date;

  @Expose()
  @IsString()
  type: string;

  @Expose()
  @IsString()
  groupId: string;

  @Expose()
  @IsString()
  userId: string;
}
