import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stage } from '../../stages/entities/stage.entity';

@Entity()
export class Information {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: true })
  nameDependencyParameter: string;

  @Column({ nullable: true })
  dependencyParameter: string;

  @ManyToOne(() => Stage, (stage) => stage.information)
  stage: Stage;
}
