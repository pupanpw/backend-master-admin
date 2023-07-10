import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
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

  findOne(username: string): Observable<UserDto | undefined> {
    return of(this.users.find((user) => user.username === username));
  }
}
