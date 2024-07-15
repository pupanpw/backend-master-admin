import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './security/auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { RegisterModule } from './modules/register/register.module';
import { RedisModule } from './config/redis.module';

@Module({
  imports: [AuthModule, DatabaseModule, RegisterModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
