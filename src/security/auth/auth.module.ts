import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../../modules/users/user.module';
import { UserService } from '../../modules/users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../modules/users/user.entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { PermissionModule } from '@/modules/permission/permission.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PassportModule,
    PermissionModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: Buffer.from(
          configService.get<string>('JWT_SECRET_KEY'),
          'base64',
        ),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([UserEntity]),
    CacheModule.register({
      store: redisStore,
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      auth_pass: process.env.REDIS_PASSWORD,
      tls: process.env.REDIS_TLS === 'true' ? {} : undefined,
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
