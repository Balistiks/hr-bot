import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entitites/answer.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async save(answer: CreateAnswerDto): Promise<Answer> {
    return await this.answerRepository.save(answer);
  }

  async find(options: FindOneOptions<Answer>): Promise<Answer> {
    return await this.answerRepository.findOne(options);
  }

  async findMany(options: FindManyOptions<Answer>): Promise<Answer[]> {
    return await this.answerRepository.find(options);
  }
}
