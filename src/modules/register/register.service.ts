import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/security/user/user.entity/user.entity';
import { CreateRegisterDto } from './dto/create-register.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const [data, total] = await this.usersRepository.findAndCount();

    return { data, total };
  }

  async findOne(user: CreateRegisterDto) {
    const data = await this.usersRepository.findOne({
      where: { user_name: user.user_name },
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
        statusCode: 400,
        message: `User Name Dupplicate!.`,
        error: 'Bad Request',
      });
    }
  }
}
