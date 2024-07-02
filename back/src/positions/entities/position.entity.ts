import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';
import { Student } from '../../students/entities/student.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Question, (question) => question.position)
  questions: Question[];

  @OneToMany(() => Student, (student) => student.position)
  students: Student[];

  @OneToMany(() => Employee, (employee) => employee.position)
  employees: Employee[];
}
