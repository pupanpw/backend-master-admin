import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionModule } from '../permission/permission.module';
import { UserEntity } from '../users/user.entity/user.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { RegisterController } from './register.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PermissionModule,
    CacheModule.register(),
  ],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
