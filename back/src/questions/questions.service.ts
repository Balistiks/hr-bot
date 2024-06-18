import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async findOne(options: FindOneOptions<Question>): Promise<Question> {
    return await this.questionRepository.findOne(options);
  }
}
