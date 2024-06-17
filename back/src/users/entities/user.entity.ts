import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  userName: string;

  @Column('bigint', { nullable: false, unique: true })
  tgId: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @ManyToOne(() => Question, (question) => question.users)
  question: Question;

  @ManyToOne(() => Course, (course) => course.users)
  course: Course;
}
