import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entitites/answer.entity';
import { FilesService } from '../files/files.service';

@Controller('answers')
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  async save(@Body() answer: CreateAnswerDto): Promise<Answer> {
    return await this.answersService.save(answer);
  }

  @Get('byTgId')
  async findByTgId(@Query('tgId') tgId: number): Promise<Answer[]> {
    return await this.answersService.findMany({
      where: [
        { user: { tgId } },
        { student: { tgId } },
        { employee: { tgId } },
      ],
      order: {
        stage: {
          number: 'ASC',
        },
      },
      select: {
        stage: {
          id: true,
          number: true,
          name: true
        },
      },
      relations: {
        stage: true,
      },
    });
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Answer> {
    return await this.answersService.find({
      where: {
        id,
      },
      relations: ['stage'],
    });
  }
}
