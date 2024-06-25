import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Answer } from '../../answers/entitites/answer.entity';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  path: string;

  @OneToOne(() => Answer, (answer) => answer.file)
  answer: Answer;
}
