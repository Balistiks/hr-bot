import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';
import { Student } from '../../students/entities/student.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Stage } from '../../stages/entities/stage.entity';

export class CreateAnswerDto {
  @IsOptional()
  @IsString()
  text: string;

  @IsNotEmpty()
  stage: Stage;

  @IsOptional()
  user: User;

  @IsOptional()
  student: Student;

  @IsOptional()
  employee: Employee;
}
