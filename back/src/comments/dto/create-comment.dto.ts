import { IsNotEmpty } from 'class-validator';
import { Employee } from '../../employees/entities/employee.entity';
import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  employee: Employee;

  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  question: Question;
}
