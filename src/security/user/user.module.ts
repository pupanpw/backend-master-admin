import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // Import the module providing UserEntityRepository
  providers: [UserService], // Ensure UserService is listed as a provider
  exports: [UserService], // Optionally, if UserService needs to be used in other modules
})
export class UserModule {}
