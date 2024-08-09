import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../modules/users/user.entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserInfo } from '@/common/types/common-request.type';
import { mapPermissionToRole } from '@/common/convertPermission';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async login(credentials: UserInfo): Promise<{ access_token: string }> {
    const user = await this.userRepository.findOne({
      where: {
        user_id: ILike(`%${credentials.username}%`),
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!(await bcrypt.compare(credentials.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const role = mapPermissionToRole(user.permission);
    const payload: UserInfo = {
      user_id: user.user_id,
      id: user.id,
      role: role,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
    };

    const access_token = this.generateAccessToken(payload);

    await this.cacheManager.set(payload.user_id, access_token, 3600);

    return { access_token };
  }

  private generateAccessToken(payload: UserInfo): string {
    return this.jwtService.sign(payload);
  }

  async getToken(userId: string): Promise<any> {
    if (!userId) {
      throw new BadRequestException('User ID must be provided');
    }

    const token = await this.cacheManager.get(userId);
    return token;
  }

  async invalidateToken(userId: string): Promise<void> {
    if (!userId) {
      throw new BadRequestException('User ID must be provided');
    }

    await this.cacheManager.del(userId);
  }
}
