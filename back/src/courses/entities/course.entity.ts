import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { User } from '../../users/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';
import { Stage } from '../../stages/entities/stage.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  address: string;

  @ManyToOne(() => City, (city) => city.courses)
  city: City;

  @OneToMany(() => User, (user) => user.course)
  users: User[];

  @OneToMany(() => Question, (question) => question.course)
  questions: Question[];

  @ManyToMany(() => Stage, (stage) => stage.course)
  @JoinTable()
  stages: Stage[];
}
