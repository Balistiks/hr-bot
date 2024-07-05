import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber} from 'class-validator';
import { CreateEmployeeDto } from './create-employee.dto';

export class UpdateEmployessDto extends PartialType(CreateEmployeeDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
