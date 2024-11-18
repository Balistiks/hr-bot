import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmployeesModule } from '../employees/employees.module';
import { HttpModule } from '@nestjs/axios';
import { AnswersModule } from '../answers/answers.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EmployeesModule, HttpModule, AnswersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
