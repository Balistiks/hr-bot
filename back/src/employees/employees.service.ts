import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async getWithMinimalUsers(): Promise<Employee> {
    return (
      await this.employeeRepository.find({
        relations: ['users'],
        order: {
          users: 'DESC',
        },
      })
    )[0];
  }
}
