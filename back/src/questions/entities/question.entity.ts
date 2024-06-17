import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';
import { Answer } from '../../answers/entitites/answer.entity';
import { Comment } from '../../comments/entitites/comment.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  number: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  text: string;

  @OneToMany(() => User, (user) => user.question)
  users: User[];

  @ManyToOne(() => Course, (course) => course.questions)
  course: Course;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @OneToMany(() => Comment, (comment) => comment.question)
  comments: Comment[];
}
