import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stage } from '../../stages/entities/stage.entity';

@Entity()
export class QuestionAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: true })
  nameDependencyParameter: string;

  @Column({ nullable: true })
  dependencyParameter: string;

  @ManyToMany(() => Stage, (stage) => stage.questionAnswers)
  @JoinTable()
  stage: Stage[];
}
