// role-mapping.test.ts

import { Role } from '../types/common-request.type';
import { mapPermissionToRole, mapRoleToNumber } from './convertPermission';

describe('Role Mapping Functions', () => {
  describe('mapPermissionToRole', () => {
    it('should map permission 1 to Role.User', () => {
      expect(mapPermissionToRole(1)).toBe(Role.User);
    });

    it('should map permission 2 to Role.Admin', () => {
      expect(mapPermissionToRole(2)).toBe(Role.Admin);
    });

    it('should map permission 3 to Role.MasterAdmin', () => {
      expect(mapPermissionToRole(3)).toBe(Role.MasterAdmin);
    });

    it('should default to Role.User for unknown permissions', () => {
      expect(mapPermissionToRole(999)).toBe(Role.User);
    });
  });

  describe('mapRoleToNumber', () => {
    it('should map Role.User to number 1', () => {
      expect(mapRoleToNumber(Role.User)).toBe(1);
    });

    it('should map Role.Admin to number 2', () => {
      expect(mapRoleToNumber(Role.Admin)).toBe(2);
    });

    it('should map Role.MasterAdmin to number 3', () => {
      expect(mapRoleToNumber(Role.MasterAdmin)).toBe(3);
    });

    it('should default to 1 for unknown roles', () => {
      expect(mapRoleToNumber('UnknownRole')).toBe(1);
    });
  });
});
