import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { QuestionsAnswersModule } from '../questions-answers/questions-answers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), QuestionsAnswersModule],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
