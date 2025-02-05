import { Controller, Post, Body, HttpStatus } from '@nestjs/common';

@Controller('v1')
export class WebhookController {
  @Post('webhook')
  handleWebhook(@Body() body: any) {
    const events = body.events;
    events.forEach((event: any) => {
      if (event.source.type === 'group') {
        const groupId = event.source.groupId;
        console.log('Received Group ID:', groupId);
        const replyToken = event.replyToken;
        this.replyToUser(replyToken);
      }
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  replyToUser(replyToken: string) {
    console.log('Replying to user with replyToken:', replyToken);
  }
}
