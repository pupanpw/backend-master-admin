import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserInfo } from 'src/types/common-request.type';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard, RoleGuard(Role.Admin))
  // @Post('login')
  // login(@Request() req: CommonRequest) {
  //   return lastValueFrom(this.authService.login(req.user));
  // }

  @Post('login')
  async login(@Body() credentials: UserInfo) {
    return this.authService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('login-doh')
  async test() {
    return true;
  }
}
