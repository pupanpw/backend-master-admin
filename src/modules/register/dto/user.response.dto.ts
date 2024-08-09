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
  email: string;

  @Expose()
  role: string;

  @Expose()
  active_flag: string;
}
