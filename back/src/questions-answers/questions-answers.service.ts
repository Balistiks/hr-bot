import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { QuestionAnswer } from './entities/questionAnswer.entity';

@Injectable()
export class QuestionsAnswersService {
  constructor(
    @InjectRepository(QuestionAnswer)
    private questionAnswerRepository: Repository<QuestionAnswer>,
  ) {}

  async findByOptions(
    options?: FindManyOptions<QuestionAnswer>,
  ): Promise<QuestionAnswer[]> {
    return await this.questionAnswerRepository.find(options);
  }
}
