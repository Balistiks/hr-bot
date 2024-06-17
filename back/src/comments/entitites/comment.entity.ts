import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../../employees/entities/employee.entity';
import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @ManyToOne(() => Employee, (employee) => employee.comments)
  employee: Employee;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Question, (question) => question.comments)
  question: Question;
}
