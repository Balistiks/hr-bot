import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stage } from '../../stages/entities/stage.entity';
import { Course } from '../../courses/entities/course.entity';

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

  @ManyToOne(() => Course, (course) => course.information)
  course: Course;

  @ManyToOne(() => Stage, (stage) => stage.information)
  stage: Stage;
}
