import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';
import { IsDate } from 'class-validator';
import User from './User';

@Entity()
export default class UserStatistic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column('text')
  @IsDate()
  date: string;

  @Column()
  page_views: number;

  @Column()
  clicks: number;

  @ManyToOne((type) => User, (user) => user.user_statistic, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
