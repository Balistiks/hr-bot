import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';
import { Student } from '../../students/entities/student.entity';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  question: Question;

  @IsOptional()
  user: User;

  @IsOptional()
  student: Student;
}
