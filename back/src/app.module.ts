import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { CitiesModule } from './cities/cities.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { EmployeesModule } from './employees/employees.module';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return dataSourceOptions;
      },
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    CitiesModule,
    QuestionsModule,
    AnswersModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
