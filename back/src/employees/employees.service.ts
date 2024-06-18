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
    const employees = await this.employeeRepository.find({
      relations: ['users'],
    });
    let minimalUsers = employees[0].users.length;
    let employeeWithMinimalUsers = employees[0];
    for (const employee of employees) {
      if (employee.users.length < minimalUsers) {
        minimalUsers = employee.users.length;
        employeeWithMinimalUsers = employee;
      }
    }
    return employeeWithMinimalUsers;
  }
}
