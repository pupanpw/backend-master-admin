import { Role, UserInfo } from '@/common/types/common-request.type';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class PermissionService {
  checkUserPermission(user: UserInfo) {
    if (user.role === Role.User || user.role === Role.Admin) {
      throw new BadRequestException(
        'BAD_REQUEST',
        "User's permission is not a Permission",
      );
    }
  }
  checkPermissionRole(user: UserInfo) {
    if (user.role !== Role.MasterAdmin) {
      throw new BadRequestException(
        'BAD_REQUEST',
        'Unable to update  Please check your permissions or try again later.',
      );
    }
  }
}
