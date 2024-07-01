import { Controller, Get, Param } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './entities/question.entity';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Question> {
    return await this.questionsService.findOne({
      where: { id },
      order: {
        number: 'ASC',
      },
    });
  }
}
