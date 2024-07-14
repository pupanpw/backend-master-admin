import { Role } from '@/types/common-request.type';

export function mapPermissionToRole(permission: number): Role {
  switch (permission) {
    case 1:
      return Role.User;
    case 2:
      return Role.Admin;
    case 3:
      return Role.MasterAdmin;
    default:
      console.warn(
        `Unknown permission value: ${permission}. Defaulting to Role.User.`,
      );
      return Role.User;
  }
}
