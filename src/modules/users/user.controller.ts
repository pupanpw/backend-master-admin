import { CacheManager } from '@/common/decorators/cache.decorator';
import { JwtAuthGuard } from '@/security/auth/jwt-auth.guard';
import {
  Controller,
  UseGuards,
  Get,
  Query,
  Body,
  Param,
  Patch,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { FindUserQueryDto } from './dto/user.dto.request';
import { CommonRequest } from '@/common/types/common-request.type';
import { UpdateRegisterDto } from '../register/dto/update-register.dto';

@Controller('v1')
export class UserController {
  constructor(private readonly registerService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  findAll(
    @Query() param: FindUserQueryDto,
    @Request() commonRequest: CommonRequest,
  ) {
    return this.registerService.findAll(param, commonRequest);
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
