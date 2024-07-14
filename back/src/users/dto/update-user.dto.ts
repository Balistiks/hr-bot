import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Question } from '../../questions/entities/question.entity';
import { Course } from '../../courses/entities/course.entity';
import { Answer } from '../../answers/entitites/answer.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  question: Question;

  @IsOptional()
  course: Course;

  @IsOptional()
  @IsDate()
  selectedDate: Date;

  @IsEmpty()
  answers: Answer[];
}
