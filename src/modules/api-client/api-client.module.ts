import { Logger, Module } from '@nestjs/common';
import { ApiClientService } from './api-client.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [ApiClientService, Logger],
  exports: [ApiClientService],
})
export class ApiClientModule {}
