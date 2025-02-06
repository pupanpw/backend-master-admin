import { WebhookController } from './external-webhook-line.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupDetail } from '../entity/group-detail.entity';
import { ExternalWebhookLineService } from './external-webhook-line.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([GroupDetail])],
  controllers: [WebhookController],
  providers: [ExternalWebhookLineService],
})
export class ExternalWebhookLineModule {}
