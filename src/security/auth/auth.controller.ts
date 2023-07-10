import { Controller, Post, Request, UseGuards, Get } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Role } from '../user/dto/user.dto';
import RoleGuard from './role.guard';
import { LocalAuthGuard } from './local-gurd';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard, RoleGuard(Role.Admin))
  @Post('login')
  login(@Request() req) {
    return lastValueFrom(this.authService.login(req.user));
  }
}
