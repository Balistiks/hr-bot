import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Position } from '../../positions/entities/position.entity';
import { Question } from '../../questions/entities/question.entity';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsBoolean()
  paid: boolean;

  @IsOptional()
  position: Position;

  @IsOptional()
  question: Question;
}
