import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission.service';
import { BadRequestException } from '@nestjs/common';
import { Role } from '@/common/types/common-request.type';

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionService],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkUserPermission', () => {
    it('should throw a BadRequestException for a user with role "user"', () => {
      const mockUser: any = {
        role: Role.User || Role.Admin,
      };

      expect(() => service.checkUserPermission(mockUser)).toThrow(
        new BadRequestException(
          'BAD_REQUEST',
          "User's permission is not a {{permission}}",
        ),
      );
    });

    it('should not throw an exception for a user with role "admin"', () => {
      const mockUser: any = {
        role: Role.MasterAdmin,
      };

      expect(() => service.checkUserPermission(mockUser)).not.toThrow();
    });
  });

  describe('checkPermissionRole', () => {
    it('should throw a BadRequestException for a user without the "MasterAdmin" role', () => {
      const mockUser: any = {
        role: Role.User,
      };

      expect(() => service.checkPermissionRole(mockUser)).toThrow(
        new BadRequestException(
          'BAD_REQUEST',
          'Unable to update. Please check your permissions or try again later.',
        ),
      );
    });

    it('should not throw an exception for a user with the "MasterAdmin" role', () => {
      const mockUser: any = {
        role: Role.MasterAdmin,
      };

      expect(() => service.checkPermissionRole(mockUser)).not.toThrow();
    });
  });
});
