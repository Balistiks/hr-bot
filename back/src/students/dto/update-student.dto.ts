import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
