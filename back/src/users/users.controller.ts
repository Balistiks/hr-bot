import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { EmployeesService } from '../employees/employees.service';

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
}
