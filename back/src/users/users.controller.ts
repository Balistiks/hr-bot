import { Body, Controller, Logger, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { EmployeesService } from '../employees/employees.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly employeesService: EmployeesService,
  ) {}

  @Post()
  async save(@Body() user: CreateUserDto): Promise<User> {
    user.employee = await this.employeesService.getWithMinimalUsers();
    return await this.usersService.save(user);
  }

  @Patch()
  async update(@Body() user: UpdateUserDto): Promise<User> {
    return await this.usersService.save(user);
  }
}
