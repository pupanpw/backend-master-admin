import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Module({
  imports: [],
  providers: [PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
