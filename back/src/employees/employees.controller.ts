import { Body, Controller, Get, Post, Patch, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployessDto } from './dto/update-employess.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(
    @Body() employee: CreateEmployeeDto | UpdateEmployessDto,
  ): Promise<Employee> {
    return await this.employeesService.save(employee);
  }

  @Get('byTgId')
  async findByTgId(@Query('tgId') tgId: number): Promise<Employee> {
    return await this.employeesService.find({
      where: { tgId },
      relations: [
        'users',
        'users.course',
        'users.question',
        'question',
        'position',
      ],
    });
  }

  @Patch()
  async update(@Body() employee: UpdateEmployessDto): Promise<Employee> {
    return await this.employeesService.save(employee);
  }
}
