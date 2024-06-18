import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async find(): Promise<City[]> {
    return await this.cityRepository.find();
  }
}
