import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { UpdateEmployessDto } from './dto/update-employess.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

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
