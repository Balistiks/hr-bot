import { IsNotEmpty, IsString } from 'class-validator';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  question: Question;

  @IsNotEmpty()
  user: User;
}
