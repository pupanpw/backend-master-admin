export type UserInfo = {
  user_id: string;
  id: number;
  first_name: string;
  last_name: string;
  role: Role;
  email: string;
  iat: any;
  exp?: any;
  [key: string]: any;
};
export type Headers = {
  authorization?: string;
  [key: string]: any;
};
export enum Role {
  User = 'user',
  Admin = 'admin',
  MasterAdmin = 'master_admin',
}
type AppRequest = {
  user: UserInfo;
  headers: Headers;
  [key: string]: any;
};

export type CommonRequest = Request & AppRequest;
