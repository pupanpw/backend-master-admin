import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';
import { UserDto } from '../user/dto/user.dto';
import { UserInfo } from 'src/types/common-request.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  //verified callback
}
