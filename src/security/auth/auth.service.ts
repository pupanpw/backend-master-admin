import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../modules/user/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserInfo } from '@/common/types/common-request.type';
import { Observable, of } from 'rxjs';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { mapPermissionToRole } from '@/common/convertPermission';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async login(credentials: UserInfo): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: {
        user_id: ILike(`%${credentials.username}%`),
      },
    });

    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      const role = mapPermissionToRole(user.permission);
      const payload: UserInfo = {
        user_id: user.user_id,
        id: user.id,
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
