import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Employee } from '../../employees/entities/employee.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsNumber()
  tgId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsEmpty()
  employee: Employee;

  @IsNotEmpty()
  @IsString()
  city: string;
}
