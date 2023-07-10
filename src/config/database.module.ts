import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './typeorm.config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      ...typeOrmModuleOptions,
      autoLoadEntities: true,
    }),
  ],
  providers: [], // Add the appropriate providers for the database connection
  exports: [], // Add the appropriate exports for the database connection
})
export class DatabaseModule {}
