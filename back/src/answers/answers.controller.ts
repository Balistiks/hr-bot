import { Body, Controller, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entitites/answer.entity';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  async save(@Body() answer: CreateAnswerDto): Promise<Answer> {
    return await this.answersService.save(answer);
  }
}
