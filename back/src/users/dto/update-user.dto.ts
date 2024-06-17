import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Question } from '../../questions/entities/question.entity';
import { Course } from '../../courses/entities/course.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  question: Question;

  @IsOptional()
  course: Course;
}
