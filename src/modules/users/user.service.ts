import { Injectable } from '@nestjs/common';
import { Role, UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { UserEntity } from './user.entity/user.entity';
import { ACTIVE_FLAG_Y } from '@/common/constants/common.constant';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../register/dto/user.response.dto';
import { FindUserQueryDto } from './dto/user.dto.request';
import { CommonRequest } from '@/common/types/common-request.type';
import { UpdateRegisterDto } from '../register/dto/update-register.dto';
import { PermissionService } from '../permission/permission.service';
import { searchCondition } from '@/common/helpers/common.helper';
import {
  mapPermissionToRole,
  mapRoleToNumber,
} from '@/common/convertPermission';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private permissionService: PermissionService,
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

  async findAll(
    query: FindUserQueryDto,
    commonRequest: CommonRequest,
  ): Promise<{ data: Record<string, any>; total: number }> {
    const { limit = 10, offset = 0, search, sort } = query;
    const userId = commonRequest.user.user_id;
    console.log(userId, 'userId');
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder.where(
      'user.active_flag = :active_flag AND user.user_id != :excluded_user_id',
      {
        active_flag: ACTIVE_FLAG_Y,
        excluded_user_id: userId,
      },
    );
    queryBuilder.orderBy('user.user_id', 'ASC');
    if (sort) {
      const [sortBy, orderBy] = sort.split(':');
      queryBuilder.orderBy(sortBy, orderBy.toUpperCase() as 'ASC' | 'DESC');
    }

    if (search) {
      const fields = ['user_id', 'first_name', 'last_name', 'email'];
      const searchConditionFn = searchCondition<UserEntity>(fields, search);
      queryBuilder.andWhere(new Brackets(searchConditionFn));
    }

    queryBuilder.take(limit);
    queryBuilder.skip(offset);

    const [data, total] = await queryBuilder.getManyAndCount();

    const usersResponse = data.map((user) => {
      const response = plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      });
      response.role = mapPermissionToRole(user.permission);
      return response;
    });

    return {
      data: usersResponse,
      total,
    };
  }

  async update(
    body: UpdateRegisterDto,
    id: number,
    commonRequest: CommonRequest,
  ) {
    this.permissionService.checkUserPermission(commonRequest.user);
    try {
      body.permission = mapRoleToNumber(body.role);
      delete body.role;
      delete body.id;

      const updateResult = await this.usersRepository.update(id, body);

      console.log('Update result:', updateResult);

      return updateResult;
    } catch (e) {
      throw new Error(`Error updating user with ID ${id}: ${e.message}`);
    }
  }
}
