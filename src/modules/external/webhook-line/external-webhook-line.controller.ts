import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ExternalWebhookLineService } from './external-webhook-line.service';

@Controller('v1')
export class WebhookController {
  constructor(
    private readonly externalWebhookLineService: ExternalWebhookLineService,
  ) {}

  @Post('webhook')
  async handleWebhook(@Body() body: any) {
    try {
      await this.externalWebhookLineService.webHook(body);
      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error processing webhook',
        error: error.message,
      };
    }
  }
}
