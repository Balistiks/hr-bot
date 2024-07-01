import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from '../../comments/entitites/comment.entity';
import { Answer } from '../../answers/entitites/answer.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('bigint', { nullable: false, unique: true })
  tgId: number;

  @Column({ nullable: false, default: false })
  hr: boolean;

  @OneToMany(() => User, (user) => user.employee)
  users: User[];

  @OneToMany(() => Comment, (comment) => comment.employee)
  comments: Comment;

  @OneToMany(() => Answer, (answer) => answer.employee)
  answers: Answer[];
}
