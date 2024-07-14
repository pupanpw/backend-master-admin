import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  user_id: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  permission: string;
}
