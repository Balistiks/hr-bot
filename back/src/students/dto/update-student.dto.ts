import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsBoolean()
  paid: boolean;
}
