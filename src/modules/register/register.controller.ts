import { MyStatusResponse } from '@/common/types/mystatus-response.type';
import { Controller, Post, Body } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
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
