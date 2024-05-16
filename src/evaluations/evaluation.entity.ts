import Lesson from '../lessons/lesson.entity';
import User from '../users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Evaluation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public score: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Lesson, (lesson: Lesson) => lesson.evaluations, {
    nullable: false,
  })
  public lesson: Lesson;

  @ManyToOne(() => User, (user: User) => user.evaluations, {
    nullable: false,
  })
  public user: User;
}

export default Evaluation;
