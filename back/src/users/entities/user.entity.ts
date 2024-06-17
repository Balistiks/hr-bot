import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';

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

  @ManyToOne(() => Course, (course) => course.users)
  course: Course;
}
