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

  async login(
    credentials: UserInfo,
  ): Promise<{ access_token: string; refresh_token: string }> {
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
    const refresh_token = this.generateRefreshToken(payload);

    await this.cacheManager.set(
      payload.user_id,
      { access_token, refresh_token },
      86400,
    );

    return { access_token, refresh_token };
  }

  private generateAccessToken(payload: UserInfo): string {
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  private generateRefreshToken(payload: UserInfo): string {
    return this.jwtService.sign(payload, { expiresIn: '7d' });
  }

  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ access_token: string }> {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const userId = decoded.user_id;

      const cachedTokens = await this.cacheManager.get<{
        access_token: string;
        refresh_token: string;
      }>(userId);

      if (!cachedTokens || cachedTokens.refresh_token !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const payload: UserInfo = {
        user_id: decoded.user_id,
        id: decoded.id,
        role: decoded.role,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        email: decoded.email,
        iat: Math.floor(Date.now() / 1000),
      };

      const newAccessToken = this.generateAccessToken(payload);
      cachedTokens.access_token = newAccessToken;

      await this.cacheManager.set(userId, cachedTokens, 86400);

      return { access_token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  async getToken(userId: string): Promise<string | null> {
    if (!userId) {
      throw new BadRequestException('User ID must be provided');
    }

    const token = await this.cacheManager.get<string>(userId);
    return token || null;
  }

  async invalidateTokens(userId: string): Promise<void> {
    if (!userId) {
      throw new BadRequestException('User ID must be provided');
    }

    await this.cacheManager.del(userId);
  }
}
