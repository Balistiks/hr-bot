import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() employee: CreateEmployeeDto): Promise<Employee> {
    return await this.employeesService.save(employee);
  }

  @Get('byTgId')
  async findByTgId(@Query('tgId') tgId: number): Promise<Employee> {
    return await this.employeesService.find({
      where: { tgId },
      relations: ['users', 'users.course', 'users.question'],
    });
  }
}
