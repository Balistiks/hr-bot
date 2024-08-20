import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stage } from '../../stages/entities/stage.entity';
import { Course } from '../../courses/entities/course.entity';

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

  @ManyToMany(() => Course, (course) => course.questionsAnswers)
  courses: Course[];

  @ManyToOne(() => Stage, (stage) => stage.questionAnswers)
  stage: Stage;
}
