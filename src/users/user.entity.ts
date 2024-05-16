import Evaluation from '../evaluations/evaluation.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  public name: string;

  @Column({
    type: 'varchar',
    length: 30,
    unique: true,
  })
  @Index()
  public email: string;

  @Column('varchar')
  public password: string;

  @OneToMany(() => Evaluation, (evaluation: Evaluation) => evaluation.user)
  public evaluations: Evaluation[];
}

export default User;
