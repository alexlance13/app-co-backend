import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import User from '../db/entities/User';
import UserStatistic from '../db/entities/UserStatistic';
import { USER_REGISTRATION_DATE } from '../constants';

async function getUsersWithStatistic(req: Request, res: Response): Promise<void> {
  try {
    const { page = 1, itemsPerPage = 50 } = req.query;
    const [, usersCount] = await getRepository(User).findAndCount();
    const users = await getRepository(User)
      .createQueryBuilder('user')
      .select('user')
      .addSelect('SUM(user_statistic.clicks)', 'total_clicks')
      .addSelect('SUM(user_statistic.page_views)', 'total_page_views')
      .leftJoin('user.user_statistic', 'user_statistic')
      .groupBy('user_id')
      .offset(+itemsPerPage * (+page - 1))
      .limit(+itemsPerPage)
      .getRawMany();
    res.send({ usersCount, users });
  } catch (error) {
    console.error(error);
  }
}

async function getStatisticByUserId(req: Request, res: Response): Promise<void> {
  try {
    const id = req.params?.id;
    const { fromDate, toDate } = req.query;
    const statistic = await getRepository(UserStatistic)
      .createQueryBuilder('user_statistic')
      .select('user_statistic')
      .where(`user_statistic.user_id = ${id}`)
      .andWhere(`date(user_statistic.date) >= date("${fromDate || USER_REGISTRATION_DATE}")`)
      .andWhere(`date(user_statistic.date) <= date("${toDate || 'now'}")`)
      .getRawMany();
    res.send(statistic);
  } catch (error) {
    console.error(error);
  }
}

export default {
  getUsersWithStatistic,
  getStatisticByUserId,
};
