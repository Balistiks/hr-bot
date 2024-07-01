import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Position } from '../../positions/entities/position.entity';
import { Question } from '../../questions/entities/question.entity';
import { Answer } from '../../answers/entitites/answer.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint', { nullable: false, unique: true })
  tgId: number;

  @ManyToOne(() => Position, (position) => position.students)
  position: Position;

  @ManyToOne(() => Question, (question) => question.students)
  question: Question;

  @OneToMany(() => Answer, (answer) => answer.student)
  answers: Answer[];
}
