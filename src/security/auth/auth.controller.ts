import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CommonRequest } from '@/common/types/common-request.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: any) {
    return this.authService.login(credentials);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req: CommonRequest) {
    const user = req.user;
    if (!user || !user.user_id) {
      throw new UnauthorizedException('User not authenticated');
    }

    await this.authService.invalidateTokens(user.user_id);

    return { message: 'Logout successful' };
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
