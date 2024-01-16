import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  user_name: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  permission: string;
}
