import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CommonRequest, UserInfo } from '@/common/types/common-request.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: UserInfo) {
    return this.authService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/check/login')
  update(@Request() request: CommonRequest) {
    console.log(request.user, 'testDOH');
    console.log(request.headers, 'testDOH');
    return request.user;
  }
  @UseGuards(JwtAuthGuard)
  @Get('validate-login')
  async checkLogin(@Request() request: CommonRequest) {
    const userId = request.user.username;
    const token = await this.authService.getToken(userId);
    if (token) {
      return true;
    } else {
      throw new HttpException(
        'Token is invalid or expired',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
