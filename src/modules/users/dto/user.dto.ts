export class UserDto {
  userId: number;
  username: string;
  password: string;
  role: Role;
}
export enum Role {
  User = 'User',
  Admin = 'Admin',
  MasterAdmin = 'master_admin',
}
