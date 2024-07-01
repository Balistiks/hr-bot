import { Controller, Get, Param } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { Position } from './entities/position.entity';

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Position> {
    return await this.positionsService.findOneByOptions({
      where: { id },
      relations: ['questions'],
    });
  }

  @Get()
  async getAll(): Promise<Position[]> {
    return await this.positionsService.findAll();
  }
}
