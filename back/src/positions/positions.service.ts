import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Position} from "./entities/position.entity";
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  async findAll(): Promise<Position[]> {
    return await this.positionRepository.find();
  }

  async findOneByOptions(options: FindOneOptions<Position>): Promise<Position> {
    return await this.positionRepository.findOne(options);
  }
}
