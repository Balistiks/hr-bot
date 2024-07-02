import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber} from 'class-validator';
import { CreateEmployessDto } from './create-employess.dto';

export class UpdateEmployessDto extends PartialType(CreateEmployessDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
