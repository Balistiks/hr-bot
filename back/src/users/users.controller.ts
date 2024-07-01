import { Body, Controller, Get, Logger, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { EmployeesService } from '../employees/employees.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Not } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly employeesService: EmployeesService,
  ) {}

  @Get('byTgId')
  async findByTgId(@Query('tgId') tgId: number): Promise<User> {
    return await this.usersService.findOne({
      where: { tgId },
      relations: ['question'],
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOne({
      where: { id },
      relations: ['course', 'question'],
    });
  }

  @Get()
  async find(@Query('request') request?: string): Promise<User[]> {
    return await this.usersService.find({
      where: request ? JSON.parse(request) : null,
    });
  }

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
