import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './entitites/answer.entity';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import e from 'express';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';

@Controller('answers')
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(
    AnyFilesInterceptor({
      limits: {
        fileSize: 53248,
      },
      storage: multer.diskStorage({
        destination: 'upload/',
        filename(req: e.Request, file: Express.Multer.File, callback) {
          callback(
            null,
            `${file.fieldname}-${Date.now()}.${file.originalname
              .split('.')
              .pop()}`,
          );
        },
      }),
    }),
  )
  async save(
    @Body() answer: CreateAnswerDto,
    @UploadedFile()
    file: any,
  ): Promise<Answer> {
    const newAnswer = await this.answersService.save(answer);
    if (file) {
      const newFile = new File();
      newFile.path = file.filename;
      newFile.answer = newAnswer;
      await this.filesService.save(newFile);
    }
    return newAnswer;
  }

  @Get('byTgId')
  async findByTgId(@Query('tgId') tgId: number): Promise<Answer[]> {
    return await this.answersService.findMany({
      where: {
        user: { tgId },
      },
      select: {
        question: {
          id: true,
          number: true,
        },
      },
      relations: {
        question: true,
      },
    });
  }
}
