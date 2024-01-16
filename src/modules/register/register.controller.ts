import { Controller, Post, Body, Get } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';

@Controller('v1')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('/register')
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.registerUser(createRegisterDto);
  }

  @Get('/users')
  findAll() {
    return this.registerService.findAll();
  }
}
