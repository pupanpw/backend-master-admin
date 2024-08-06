import { Inject, Injectable, Query } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CacheManager } from './cache.decorator';
import { Cache } from 'cache-manager';
import { TestingModule, Test } from '@nestjs/testing';

@Injectable()
class MockCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
  @CacheManager('prefix', 123, 'key')
  getName(): string {
    return 'mockCacheService';
  }
}

@Injectable()
class MockCacheService2 {
  constructor(@Inject(CACHE_MANAGER) private cacheService: Cache) {}
  @CacheManager('prefix', 123, 'key')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getName(@Query() query): string {
    return 'mockCacheService2';
  }
}

describe('CacheManagerDecorator', () => {
  let service: MockCacheService;
  let service2: MockCacheService2;
  let cacheService: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MockCacheService,
        MockCacheService2,
        {
          provide: 'CACHE_MANAGER',
          useValue: { get: jest.fn(), set: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<MockCacheService>(MockCacheService);
    service2 = module.get<MockCacheService2>(MockCacheService2);
    cacheService = module.get<Cache>('CACHE_MANAGER');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it(`should return cache prefix-123`, async () => {
    const mockCachedResult = { data: 'foo' };

    jest
      .spyOn(cacheService, 'get')
      .mockResolvedValue(JSON.stringify(mockCachedResult));

    const result = await service.getName();

    expect(result).toEqual(mockCachedResult);
  });

  it(`should return cache prefix-query`, async () => {
    jest.spyOn(cacheService, 'get').mockResolvedValue(null);

    const result = await service2.getName({ key: 'query' });

    expect(result).toEqual('mockCacheService2');
  });
});
