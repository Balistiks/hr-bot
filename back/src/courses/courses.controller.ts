import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { QuestionAnswer } from '../questions-answers/entities/questionAnswer.entity';
import { QuestionsAnswersService } from '../questions-answers/questions-answers.service';
import { InformationService } from '../information/information.service';
import { Information } from '../information/entities/information.entity';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly questionsAnswersService: QuestionsAnswersService,
    private readonly informationService: InformationService
  ) {}

  @Get(':id/:stageId/information')
  async getInformationByIdStageId(
    @Param('id') id: number,
    @Param('stageId') stageId: number,
  ): Promise<Information[]> {
    return await this.informationService.findByOptions({
      where: {
        courses: { id },
        stage: {
          id: stageId,
        },
      },
    });
  }

  @Get(':id/:stageId/questionsAnswers')
  async getQuestionsAnswersByIdStageId(
    @Param('id') id: number,
    @Param('stageId') stageId: number,
  ): Promise<QuestionAnswer[]> {
    return await this.questionsAnswersService.findByOptions({
      where: {
        courses: { id },
        stage: {
          id: stageId,
        },
      },
    });
  }

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Course> {
    return await this.coursesService.findOne({
      where: { id },
      relations: [
        'questions',
        'stages',
        'stages.questionAnswers',
        'stages.information',
      ],
      order: {
        stages: {
          number: 'ASC',
        },
      },
    });
  }

  @Get()
  async find(@Query('request') request?: string): Promise<Course[]> {
    return await this.coursesService.find({
      where: request ? JSON.parse(request) : null,
      relations: [
        'questions',
        'stages',
        'stages.questionAnswers',
        'stages.information',
      ],
    });
  }
}
