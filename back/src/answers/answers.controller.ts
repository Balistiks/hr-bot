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
import {AnyFilesInterceptor, FileInterceptor} from '@nestjs/platform-express';
import * as multer from 'multer';
import e from 'express';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';
import {diskStorage} from "multer";

@Controller('answers')
export class AnswersController {
  constructor(
    private readonly answersService: AnswersService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(
      FileInterceptor('file', {
        limits: {
          fileSize: 50000000,
        },
        storage: diskStorage({
          destination: './files',
          filename(req, file, callback) {
            const filename = `${file.fieldname}-${Date.now()}.${file.originalname.split('.').pop()}`;
            callback(null, filename);
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
      where: [
        { user: { tgId } },
        { student: { tgId } },
        { employee: { tgId } },
      ],
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
