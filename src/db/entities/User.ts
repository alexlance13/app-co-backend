import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany,
} from 'typeorm';
import { IsEmail, Max, Min } from 'class-validator';
import UserStatistic from './UserStatistic';
import { Gender } from '../../types';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  first_name: string;

  @Column('varchar')
  last_name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  gender: Gender;

  @Column()
  @Min(6)
  @Max(15)
  ip_address: string;

  @OneToMany((type) => UserStatistic, (user_statistic) => user_statistic.user, { cascade: true })
  user_statistic: UserStatistic[];
}
