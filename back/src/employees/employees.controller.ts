import { Controller, Get, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get('byTgId')
  async findByTgId(@Query('tgId') tgId: number): Promise<Employee> {
    return await this.employeesService.find({
      where: { tgId },
    });
  }
}
