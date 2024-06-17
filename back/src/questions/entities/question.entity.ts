import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';

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
}
