import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Role } from '../user/dto/user.dto';

export function RoleGuard(role: Role): Type<CanActivate> {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      if (user && user.role) {
        return user.role === role;
      }
      return false;
    }
  }

  return RoleGuardMixin;
}

export default RoleGuard;
