import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { JwtAuthGuard } from '@/security/auth/jwt-auth.guard';

@Controller('v1')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.registerUser(createRegisterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  findAll() {
    return this.registerService.findAll();
  }
}
