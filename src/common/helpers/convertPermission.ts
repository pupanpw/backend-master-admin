import { Role } from '../types/common-request.type';

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

export function mapRoleToNumber(role: string): number {
  switch (role) {
    case Role.User:
      return 1;
    case Role.Admin:
      return 2;
    case Role.MasterAdmin:
      return 3;
    default:
      console.warn(`Unknown role value: ${role}. Defaulting to 1.`);
      return 1;
  }
}
