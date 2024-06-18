import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async findOne(options: FindOneOptions<Course>): Promise<Course> {
    return await this.courseRepository.findOne(options);
  }

  async find(options: FindManyOptions<Course>): Promise<Course[]> {
    return await this.courseRepository.find(options);
  }
}
