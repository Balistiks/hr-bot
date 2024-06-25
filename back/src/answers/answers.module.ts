import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entitites/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), AnswersModule],
  providers: [AnswersService],
  controllers: [AnswersController],
})
export class AnswersModule {}
