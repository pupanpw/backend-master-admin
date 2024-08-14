import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity/user.entity';
import { PermissionModule } from '../permission/permission.module';
import { CacheModule } from '@nestjs/cache-manager';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PermissionModule,
    CacheModule.register(),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
