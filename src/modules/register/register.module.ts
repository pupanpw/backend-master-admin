import { Module } from '@nestjs/common';
import { RegisterService } from './register.service';
import { RegisterController } from './register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/security/user/user.entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // Import the module providing UserEntityRepository
  controllers: [RegisterController],
  providers: [RegisterService],
})
export class RegisterModule {}
