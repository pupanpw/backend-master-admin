import { Module } from '@nestjs/common';
import { WebhookController } from './external-webhook-line.controller';

@Module({
  controllers: [WebhookController],
})
export class ExternalWebhookLineModule {}
