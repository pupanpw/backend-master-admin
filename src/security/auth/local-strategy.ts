import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { lastValueFrom } from 'rxjs';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  //verified callback
  async validate(
    username: string,
    password: string,
  ): Promise<Omit<UserDto, 'password'>> {
    const user = lastValueFrom(
      this.authService.retrieveUser(username, password),
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
