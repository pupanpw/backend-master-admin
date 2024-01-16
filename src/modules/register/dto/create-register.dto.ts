import { IsNotEmpty, Length } from 'class-validator';

export class CreateRegisterDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  permission: string;
}
