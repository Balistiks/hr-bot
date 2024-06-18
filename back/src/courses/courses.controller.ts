import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<Course> {
    return await this.coursesService.findOne({
      where: { id },
      relations: ['questions'],
    });
  }

  @Get()
  async find(@Query('request') request?: string): Promise<Course[]> {
    return await this.coursesService.find({
      where: request ? JSON.parse(request) : null,
    });
  }
}
