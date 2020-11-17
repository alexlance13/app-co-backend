import UserStatistic from './UserStatistic';
import { Gender } from '../../types';
export default class User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: Gender;
    ip_address: string;
    user_statistic: UserStatistic[];
}
