import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '@/modules/user/user.entity/user.entity';
import { CreateRegisterDto } from './dto/create-register.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
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
}
