import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { Get } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
