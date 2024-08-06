import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { UserInfo } from '@/common/types/common-request.type';

config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(configService.get<string>('JWT_SECRET_KEY')),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: UserInfo) {
    return {
      username: payload.user_id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      role: payload.role,
    };
  }
}
