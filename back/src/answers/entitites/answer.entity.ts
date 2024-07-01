import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { User } from '../../users/entities/user.entity';
import { File } from '../../files/entities/file.entity';
import { Student } from '../../students/entities/student.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;

  @ManyToOne(() => User, (user) => user.answers)
  user: User;

  @ManyToOne(() => Student, (student) => student.answers)
  student: Student;

  @ManyToOne(() => Employee, (employee) => employee.answers)
  employee: Employee;

  @OneToOne(() => File, (file) => file.answer)
  file: File;
}
