import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Information } from './entities/information.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class InformationService {
  constructor(
    @InjectRepository(Information)
    private informationRepository: Repository<Information>,
  ) {}

  async findByOptions(
    options?: FindManyOptions<Information>,
  ): Promise<Information[]> {
    return await this.informationRepository.find(options);
  }
}
