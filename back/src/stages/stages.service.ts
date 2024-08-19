import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private stageRepository: Repository<Stage>,
  ) {}

  async findOneByOptions(options: FindOneOptions<Stage>): Promise<Stage> {
    return await this.stageRepository.findOne(options);
  }
}
