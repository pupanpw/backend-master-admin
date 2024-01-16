import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role, UserInfo } from 'src/types/common-request.type';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(credentials: UserInfo): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: { user_name: credentials.username },
    });

    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      const role = this.mapPermissionToRole(user.permission);
      const payload: UserInfo = {
        username: user.user_name,
        user_id: user.id.toFixed(),
        role: role,
        first_name: user.first_name,
        last_name: user.last_name,
        iat: Math.floor(Date.now() / 1000),
      };

      const access_token = this.generateAccessToken(payload);

      return { access_token };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  private generateAccessToken(payload: UserInfo): string {
    return this.jwtService.sign(payload);
  }

  private mapPermissionToRole(permission: string): Role {
    switch (permission) {
      case '0':
        return Role.User;
      case '1':
        return Role.Admin;
      case '2':
        return Role.MasterAdmin;
      default:
        return Role.User;
    }
  }

  islogin(user: UserInfo): Observable<any> {
    const payload = {
      username: user.username,
      user_id: user.userId,
      role: user.role,
    };

    return of({
      access_token: this.jwtService.sign(payload),
    });
  }
}
