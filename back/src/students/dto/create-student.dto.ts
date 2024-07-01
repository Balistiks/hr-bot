import { IsNotEmpty, IsNumber } from 'class-validator';
import { Position } from '../../positions/entities/position.entity';
import { Question } from '../../questions/entities/question.entity';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsNumber()
  tgId: number;

  @IsNotEmpty()
  position: Position;

  @IsNotEmpty()
  question: Question;
}
