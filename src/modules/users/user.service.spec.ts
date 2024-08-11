import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

const mockUserService = {
  id: 23,
  first_name: 'pupan',
  last_name: 'test-1',
  email: 'pupan-test@pw.com',
  role: 'user',
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
