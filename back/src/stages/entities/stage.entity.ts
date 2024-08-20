import {
  Column,
  Entity, ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';
import { Answer } from '../../answers/entitites/answer.entity';
import { QuestionAnswer } from '../../questions-answers/entities/questionAnswer.entity';
import { Information } from '../../information/entities/information.entity';

@Entity()
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  text: string;

  @Column({ nullable: false })
  number: number;

  @Column({ nullable: false, enum: ['choice', 'multipleChoice', 'info'] })
  type: string;

  @Column({ nullable: true })
  dependence: string;

  @ManyToMany(() => Course, (course) => course.stages)
  course: Course[];

  @OneToMany(() => User, (user) => user.stage)
  users: User[];

  @OneToMany(() => Answer, (answer) => answer.stage)
  answers: Answer[];

  @Column({ nullable: true })
  nameDependencyParameter: string;

  @OneToMany(() => QuestionAnswer, (questionAnswer) => questionAnswer.stage)
  questionAnswers: QuestionAnswer[];

  @OneToMany(() => Information, (information) => information.stage)
  information: Information[];
}
