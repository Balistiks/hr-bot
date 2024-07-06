import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SetDateDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  date: string;
}
