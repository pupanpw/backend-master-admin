import { CacheManager } from '@/common/decorators/cache.decorator';
import { CommonRequest } from '@/common/types/common-request.type';
import { MyStatusResponse } from '@/common/types/mystatus-response.type';
import { JwtAuthGuard } from '@/security/auth/jwt-auth.guard';
import {
  Controller,
  Post,
  UseGuards,
  Get,
  Patch,
  Param,
  Body,
  Request,
} from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { RegisterService } from './register.service';

@Controller('v1')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/register')
  async create(
    @Body() createRegisterDto: CreateRegisterDto,
  ): Promise<MyStatusResponse<boolean>> {
    return await this.registerService.registerUser(createRegisterDto);
  }
}
