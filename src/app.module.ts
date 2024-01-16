import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './security/auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { RegisterModule } from './modules/register/register.module';

@Module({
  imports: [AuthModule, DatabaseModule, RegisterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
