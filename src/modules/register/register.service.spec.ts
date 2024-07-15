import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { UserEntity } from '../user/user.entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { PermissionService } from '../permission/permission.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let permissionService: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],

      providers: [
        RegisterService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: jest.fn(() => ({
            findOne: jest.fn(),
            countBy: jest.fn(),
            findOneBy: jest.fn(),
          })),
        },
        {
          provide: PermissionService,
          useValue: {
            checkUserPermission: jest.fn(),
            checkPermissionRole: jest.fn(),
          },
        },
      ],
    })
      .overrideProvider(DataSource)
      .useValue({})
      .compile();

    service = module.get<RegisterService>(RegisterService);
    permissionService = module.get<PermissionService>(PermissionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add more tests here
});
