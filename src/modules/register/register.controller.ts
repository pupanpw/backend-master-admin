import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { JwtAuthGuard } from '@/security/auth/jwt-auth.guard';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { CommonRequest } from '@/common/types/common-request.type';
import { CacheManager } from '@/common/decorators/cache.decorator';

@Controller('v1')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/register')
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.registerUser(createRegisterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  @CacheManager('User', 86400, 'key')
  findAll() {
    return this.registerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/users/:id')
  update(
    @Body() user: UpdateRegisterDto,
    @Param('id') id: number,
    @Request() request: CommonRequest,
  ) {
    return this.registerService.update(user, id, request);
  }
}
