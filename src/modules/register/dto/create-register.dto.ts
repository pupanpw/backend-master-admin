import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  permission: number;
  active_flag: string;
}
