import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './security/auth/auth.module';
import { DatabaseModule } from './config/database.module';
import { RegisterModule } from './modules/register/register.module';
import { RedisModule } from './config/redis.module';
import { UserModule } from './modules/users/user.module';
import { ExternalLineLoginModule } from './modules/external/line-login/external-line-login.module';
import { ExternalWebhookLineModule } from './modules/external/webhook-line/external-webhook-line.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    RegisterModule,
    RedisModule,
    UserModule,
    ExternalLineLoginModule,
    ExternalWebhookLineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
