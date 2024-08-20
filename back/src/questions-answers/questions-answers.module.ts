import { Module } from '@nestjs/common';
import { QuestionsAnswersService } from './questions-answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAnswer } from './entities/questionAnswer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionAnswer])],
  providers: [QuestionsAnswersService],
  exports: [QuestionsAnswersService],
})
export class QuestionsAnswersModule {}
