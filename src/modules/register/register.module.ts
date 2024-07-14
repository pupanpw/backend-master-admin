import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/modules/user/user.entity/user.entity';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), PermissionModule],
  controllers: [RegisterController],
  providers: [RegisterService],
  exports: [RegisterService],
})
export class RegisterModule {}
