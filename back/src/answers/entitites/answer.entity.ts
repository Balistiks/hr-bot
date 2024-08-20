import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';
import { File } from '../../files/entities/file.entity';
import { Student } from '../../students/entities/student.entity';
import { Employee } from '../../employees/entities/employee.entity';
import { Stage } from '../../stages/entities/stage.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  text: string;

  @ManyToOne(() => Stage, (stage) => stage.answers)
  stage: Stage;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ManyToOne(() => User, (user) => user.answers)
  user: User;

  @ManyToOne(() => Student, (student) => student.answers)
  student: Student;

  @ManyToOne(() => Employee, (employee) => employee.answers)
  employee: Employee;

  @OneToOne(() => File, (file) => file.answer)
  @JoinColumn()
  file: File;
}
