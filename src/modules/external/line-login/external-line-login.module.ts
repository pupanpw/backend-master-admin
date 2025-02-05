// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ExternalLineLoginService } from './external-line-login.service';
import { LineAuthController } from './external-line-login.controller';
import { ApiClientModule } from '../../api-client/api-client.module';

@Module({
  imports: [ApiClientModule],
  providers: [ExternalLineLoginService],
  controllers: [LineAuthController],
})
export class ExternalLineLoginModule {}
