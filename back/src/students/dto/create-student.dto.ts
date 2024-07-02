import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsNumber()
  tgId: number;
}
