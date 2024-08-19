import { Module } from '@nestjs/common';
import { StagesService } from './stages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from './entities/stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stage])],
  providers: [StagesService],
})
export class StagesModule {}
