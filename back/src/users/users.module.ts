import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmployeesModule } from '../employees/employees.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmployeesModule, HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
