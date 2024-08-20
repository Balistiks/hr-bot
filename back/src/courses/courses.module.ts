import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { QuestionsAnswersModule } from '../questions-answers/questions-answers.module';
import { InformationModule } from '../information/information.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course]),
    QuestionsAnswersModule,
    InformationModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
