import { Controller, Get, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async find(@Query('request') request?: string): Promise<Course[]> {
    return await this.coursesService.find({
      where: request ? JSON.parse(request) : null,
    });
  }
}
