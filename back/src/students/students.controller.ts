import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Student> {
    return await this.studentsService.findOneByOptions({
      where: { id },
    });
  }

  @Get('byTgId')
  async getByTgId(@Query('tgId') tgId: number): Promise<Student> {
    return await this.studentsService.findOneByOptions({
      where: { tgId },
    });
  }

  @Post()
  async save(@Body() student: CreateStudentDto): Promise<Student> {
    return await this.studentsService.save(student);
  }

  @Patch()
  async update(@Body() student: UpdateStudentDto): Promise<Student> {
    return await this.studentsService.save(student);
  }
}
