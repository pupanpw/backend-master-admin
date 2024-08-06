import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { UserEntity } from '../user/user.entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { PermissionService } from '../permission/permission.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

describe('RegisterService', () => {
  let service: RegisterService;
  let permissionService: PermissionService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule,
        CacheModule.register(), // Register CacheModule if CACHE_MANAGER is used
      ],
      providers: [
        RegisterService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
            countBy: jest.fn(),
            findOneBy: jest.fn(),
            save: jest.fn(),
            findAndCount: jest.fn(),
            update: jest.fn(),
            findOneOrFail: jest.fn(),
          },
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
      .overrideProvider(CACHE_MANAGER)
      .useValue({}) // Mock CACHE_MANAGER if needed
      .compile();

    service = module.get<RegisterService>(RegisterService);
    permissionService = module.get<PermissionService>(PermissionService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
