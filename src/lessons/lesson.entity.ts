import Evaluation from '../evaluations/evaluation.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class Lesson {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  @Index()
  public code: string;

  @OneToMany(() => Evaluation, (evaluation: Evaluation) => evaluation.lesson)
  public evaluations: Evaluation[];
}

export default Lesson;
