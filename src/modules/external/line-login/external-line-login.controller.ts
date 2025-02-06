// src/auth/line-auth.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ExternalLineLoginService } from './external-line-login.service';

@Controller('v1')
export class LineAuthController {
  constructor(private readonly lineAuthService: ExternalLineLoginService) {}

  @Get('callback')
  async callback(@Query('code') code: string) {
    if (!code) {
      throw new Error('No authorization code received');
    }

    const tokenResponse = await this.lineAuthService.getAccessToken(code);
    const accessToken = tokenResponse.access_token;

    const profile = await this.lineAuthService.getUserProfile(accessToken);
    return profile;
  }
}
