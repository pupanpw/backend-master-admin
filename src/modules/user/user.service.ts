import { Injectable } from '@nestjs/common';
import { Role, UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  private readonly users = [
    Object.assign(new UserDto(), {
      userId: 1,
      username: 'username',
      password: 'password',
      role: Role.Admin,
    }),
  ];

  // async findOne(username: string): Promise<Observable<UserDto | any>> {
  //   const user = await this.usersRepository.find();
  //   console.log('loops', user);
  //   return of(this.users.find((user) => user.username === username));
  // }
}
