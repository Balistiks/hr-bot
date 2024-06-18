import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { Question } from '../../questions/entities/question.entity';
import { Answer } from '../../answers/entitites/answer.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Comment } from '../../comments/entitites/comment.entity';

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

  @Column({
    nullable: false,
    default: 'studying',
    enum: ['missedCall', 'willCallBack', 'thinks', 'probation', 'goesToWork'],
  })
  status: string;

  @ManyToOne(() => Question, (question) => question.users)
  question: Question;

  @ManyToOne(() => Course, (course) => course.users)
  course: Course;

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @ManyToOne(() => Employee, (employee) => employee.users)
  employee: Employee;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
