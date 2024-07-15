import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@/modules/user/user.entity/user.entity';
import { CreateRegisterDto } from './dto/create-register.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user.response.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { CommonRequest } from '@/common/types/common-request.type';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private permissionService: PermissionService,
  ) {}

  async findAll() {
    const [data, total] = await this.usersRepository.findAndCount();
    return {
      data: instanceToPlain(plainToInstance(UserResponseDto, data), {
        strategy: 'excludeAll',
      }),
      total: total,
    };
  }

  async findOne(user: CreateRegisterDto) {
    const data = await this.usersRepository.findOne({
      where: { user_id: user.user_id },
    });

    return data;
  }

  async registerUser(user: CreateRegisterDto): Promise<UserEntity> {
    const validateUser = await this.findOne(user);
    if (!validateUser) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;

      console.log(user);
      return this.usersRepository.save(user);
    } else {
      throw new BadRequestException({
        status_code: 400,
        message: `User Name Dupplicate!.`,
        error: 'Bad Request',
      });
    }
  }

  async update(
    body: UpdateRegisterDto,
    id: number,
    commonRequest: CommonRequest,
  ) {
    this.permissionService.checkUserPermission(commonRequest.user);
    try {
      const findUser = await this.usersRepository.findOneOrFail({
        where: {
          id: id,
        },
      });

      if (!findUser) {
        throw new Error(`Error: ID ${id} is invalid`);
      }
      console.log(body.permission, 'body.permission');
      //  let    mapPermissionToRole()
      const updateUser = await this.usersRepository.update(id, body);

      return updateUser;
    } catch (e) {
      throw new Error(`Error: ID ${id} is invalid`);
    }
  }
}
