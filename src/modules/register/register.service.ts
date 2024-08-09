import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@/modules/users/user.entity/user.entity';
import { CreateRegisterDto } from './dto/create-register.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user.response.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { CommonRequest } from '@/common/types/common-request.type';
import { PermissionService } from '../permission/permission.service';
import {
  MyFailStatusResponse,
  MyStatusResponse,
} from '@/common/types/mystatus-response.type';
import {
  ACTIVE_FLAG_Y,
  CREATE_SUCCESS,
} from '@/common/constants/common.constant';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private permissionService: PermissionService,
  ) {}

  async findOne(user: CreateRegisterDto) {
    const data = await this.usersRepository.findOne({
      where: { user_id: user.user_id },
    });

    return data;
  }

  async registerUser(
    user: CreateRegisterDto,
  ): Promise<MyStatusResponse<boolean>> {
    try {
      await this.ensureUserDoesNotExist(user);
      await this.hashUserPassword(user);
      await this.saveUser(user);
      return new MyStatusResponse(true, CREATE_SUCCESS);
    } catch (error) {
      return new MyFailStatusResponse(false, error.message);
    }
  }

  private async ensureUserDoesNotExist(user: CreateRegisterDto): Promise<void> {
    const existingUser = await this.findOne(user);
    if (existingUser) {
      throw new BadRequestException({
        status_code: 400,
        message: 'User Name Duplicate!',
        error: 'Bad Request',
      });
    }
  }

  private async hashUserPassword(user: CreateRegisterDto): Promise<void> {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }

  private async saveUser(user: CreateRegisterDto): Promise<void> {
    try {
      user.active_flag = ACTIVE_FLAG_Y;
      user.permission = 1;
      await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException({
        status_code: 500,
        message: error.message,
        error: 'Internal Server Error',
      });
    }
  }
}
